import React, { useEffect, useState } from 'react';
import { makeStyles, Components } from '../../../common/components';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderSelect, renderSimpleSelect } from '../../../utils/FormUtils';
import { I18n } from '../../../common/components';
import { useSelector, connect, useDispatch } from 'react-redux';
import { QR_CONFIG, PAGE_SIZE, STATE_REDUCER_KEY } from '../constants';
import _ from 'lodash';
import * as Actions from '../actions';
import validate from './validate';
import * as CommonConstants from '../../../modules/common/constants';
import * as userConstant from '../../user/constants';
import { isSuperAdmin } from '../../../utils/UserUtils';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import { createStructuredSelector } from 'reselect';
import { getDefaultLanguage } from '../../common/selectors';
import { PdfMake } from '../../../common/components/handleExport/Pdf-export';
import { getReportInfo } from '../../../utils/PdfMakeUtils';

const { Grid, Button, CardComponent, Typography, Colors } = Components;
const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center',
        margin: '10px'
    },
    '.MuiButton-label': {
        '&:hover': {
            color: 'black'
        }
    }
}));

const GenerateQRCode = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit, change } = props;
    const classes = useStyles();
    const [OrgStatus, SetOrgStatus] = useState(false);
    const [DownloadButtonStatus, SetDownloadButtonStatus] = useState(false);
    const [size, setSize] = useState(PAGE_SIZE.A3);
    const { allLanguages: languages } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);
    const { fetchOrganizationList = {}, generatedQRCodeData: { data: QRCodes = [], requestInProgress = false } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { info } = useSelector(state => state[userConstant.STATE_REDUCER_KEY]);
    const { organizations, roles = [] } = info;
    const orgSelectList = {
        id: organizations[0]?.id,
        name: organizations[0]?.name
    };
    useEffect(() => {
        if (_.isEmpty(organizations) || isSuperAdmin(roles)) {
            dispatch(Actions.fetchOrganizationDetails());
            SetOrgStatus(false);
        } else {
            SetOrgStatus(true);
            change('organization', [orgSelectList]);
        }
        change('langId', 1);
        change('pageSize', PAGE_SIZE.A3);
        return () => {
            dispatch(Actions.clearGeneratedQRCodeData());
        };
    }, []);
    useEffect(() => {
        if (QRCodes.length !== 0) {
            SetDownloadButtonStatus(true);
        } else {
            SetDownloadButtonStatus(false);
        }

    }, [QRCodes]);

    const pageSizeChange = (data) => {
        setSize(data.target.value);
    };

    const submit = (values) => {
        let object = {
            startNo: 0,
            noQRCode: 0,
            organization: [],
            langId: ''
        };
        object.startNo = values.startNo;
        object.noQRCode = values.noQRCode;
        object.organization = values.organization[0]?.id || values.organization?.id;
        object.langId = values.langId;
        dispatch(Actions.generateQRCodeData(object));
    };

    const generateQRCodes = () => {
        let allResponses = QRCodes.map(code => ({
            stack: [
                {
                    text: code.label,
                    style: ['qrCodeText', 'bold']
                },
                { qr: code.code, fit: QR_CONFIG[size].FIT || 120, foreground: QR_CONFIG[size].FOREGROUND || null, background: QR_CONFIG[size].BACKGROUND || null },
                { text: code.code, style: ['qrCodeText', 'bold'] }
            ],
            unbreakable: true // for prevent breaking details in to separate pages
        }));
        let response = _.chunk(allResponses, QR_CONFIG[size].COUNT_PER_ROW);
        let length = response.length;
        let lastResponse = _.last(response) || [];
        let lastResponseLength = lastResponse.length;
        if (length > 1 && (lastResponseLength !== QR_CONFIG[size].COUNT_PER_ROW)) {
            let index = lastResponseLength;
            while (index < QR_CONFIG[size].COUNT_PER_ROW) {
                lastResponse.push('');
                index++;
            }
        }
        response.pop();
        response.push(lastResponse);
        return {
            table: {
                body: response
            }
        };
    };

    return (
        <CardComponent>
            <LoadingCustomOverlay active={requestInProgress}>
                <Form autoComplete='off' onSubmit={handleSubmit(submit)}>
                    <Grid container>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='startNo' label={I18n.t('start')} type='number' component={renderTextField} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='noQRCode' label={I18n.t('no_of_QR_codes')} type='number' component={renderTextField} />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name='organization' label={I18n.t('organization')} type='text' disabled={OrgStatus} component={renderSelect} style={{ position: 'absolute' }}
                                onChange={() => {
                                }}
                            >
                                {
                                    fetchOrganizationList?.data.length > 0 ? _.get(fetchOrganizationList, 'data', []) : []

                                }
                            </Field>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} className={classes.item}>
                            <Field name='langId' label={I18n.t('language')} component={renderSimpleSelect}>
                                {
                                    _.get(languages, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} className={classes.item}>
                            <Field name='pageSize' label={I18n.t('paper_size')} component={renderSimpleSelect} onChange={pageSizeChange}>
                                {
                                    Object.keys(PAGE_SIZE).map(item => {
                                        return { id: item, name: PAGE_SIZE[item] };
                                    })
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid className={classes.submit}>
                                <Button type="submit">{I18n.t('generate')}</Button>
                            </Grid>
                            {
                                DownloadButtonStatus &&
                                <Grid className={classes.submit}>
                                    <PdfMake data={
                                        {
                                            config: {
                                                size
                                                // showHeader: false,
                                                // showTitle: false
                                            },
                                            head: getReportInfo('qr_code'),
                                            pdf: generateQRCodes()
                                        }
                                    } />
                                </Grid>
                            }
                        </Grid>


                        <Grid item xs={1} sm={1} md={1}> </Grid>

                        <Grid container style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            {
                                QRCodes.map((item, i) => {
                                    return <Grid item xs={2} sm={2} md={2} key={i} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundColor: Colors['color-basic-transparent-100'], margin: '2px', borderRadius: '5px' }}>
                                        {item.label !== null ? <Typography wrap={true} style={{ textAlign: 'center' }}>{item?.label}</Typography> : ''}
                                        <img src={'data:image/*;base64,' + item?.base64} style={{ width: '75px', height: '75px', alignItems: 'center' }} />
                                        {item.code !== null ? <Typography >{item?.code}</Typography> : ''}
                                    </Grid>;
                                }
                                )
                            }
                        </Grid >
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>);
};
const mapStateToProps = createStructuredSelector({
    defLang: getDefaultLanguage
});
export default connect(mapStateToProps)(reduxForm({
    form: 'GenerateQRCode',
    enableReinitialize: true,
    validate
})(GenerateQRCode));
