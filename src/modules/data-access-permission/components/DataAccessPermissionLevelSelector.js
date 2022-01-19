import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import { reactMultiSelect } from '../../../utils/FormUtils';
import { createStructuredSelector } from 'reselect';
import { Components, I18n } from '../../../common/components';
import { loadStates, loadDistricts, loadDistrictPanchayath, loadBlockPanchayath, loadLSGI } from '../../common/actions';
import { API_IDENTIFIER, DATA_ACCESS_LEVEL, DATA_ACCESS_LEVEL_KEY_MAPPING, DB_PB_MASTER, COMPONENT_ID_FIELD_NAME_MAPPING } from '../constants';
import { STATE_REDUCER_KEY } from '..';
import { validateDataAccessPermissionLevelSelector } from '../validate';
import _ from 'lodash';
import { fetchAllLocalBodies, fetchResidenceCategories, fetchWards } from '../actions';

const { Button, Grid, Colors } = Components;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '20px',
        gap: '10px'
    }
};

const DataAccessPermissionLevelSelector = (props) => {
    const dispatch = useDispatch();
    const descriptionElementRef = React.useRef(null);
    const { isOpenDialog, setIsOpenDialog, dialogSubmit, componentDetails, change } = props;
    const { componentId = 1, multiData = false, accordionId = 0, noOfData: noOfDataProp = 1, componentData = [] } = componentDetails;
    let noOfData = noOfDataProp;
    if (multiData && noOfDataProp !== 0) {
        noOfData = noOfDataProp - (componentData.length || 0);
        if (noOfData < 0) {
            noOfData = noOfDataProp;
        }
    }

    const [level, setLevel] = useState(0);
    const {
        states: { data: statesList = [], requestInProgress: statesRequestInProgress = false } = {},
        districts: { data: districtsList = [], requestInProgress: districtsRequestInProgress = false } = {},
        corporationMunicipalityPanchayath: { data: corporationMunicipalityPanchayathList = [], requestInProgress: corporationMunicipalityPanchayathRequestInProgress = false } = {},
        districtPanchayath: { data: districtPanchayathList = [], requestInProgress: districtPanchayathRequestInProgress = false } = {},
        blockPanchayath: { data: blockPanchayathList = [], requestInProgress: blockPanchayathRequestInProgress = false } = {},
        lsgi: { data: lsgiList = [], requestInProgress: lsgiRequestInProgress = false } = {},
        ward: { data: wardList = [], requestInProgress: wardRequestInProgress = false } = {},
        residenceCategory: { data: residenceCategoryList = [], requestInProgress: residenceCategoryRequestInProgress = false }
    } = useSelector(state => state[STATE_REDUCER_KEY]);


    // const { dataAccessGetById: { data: dataAccessData } } = useSelector(state => state.role);
    // let dataAccessDataArray = dataAccessData[1];
    // console.log({ dataAccessDataArray })
    // dataAccessDataArray = dataAccessDataArray?.filter((item) => item.multiData === true);

    const levelFields = {
        1: 'state',
        2: 'district',
        3: 'corMunPan',
        4: 'districtPanchayath',
        5: 'blockPanchayath'
    };

    const clearFields = (currentLevel = 0) => {
        for (let index = currentLevel + 1; index < 10; index++) {
            change(levelFields[index], null);
        }
    };

    useEffect(() => {
        dispatch(loadStates({ identifier: API_IDENTIFIER }));
    }, []);

    useEffect(() => {
        const accessDetails = DATA_ACCESS_LEVEL[DATA_ACCESS_LEVEL_KEY_MAPPING[componentId]];
        setLevel(accessDetails.level);
        clearFields();
        if (componentId === 9) {
            dispatch(fetchResidenceCategories());
        }
    }, [componentId]);

    const submit = (values) => {
        let response = _.get(values, `${COMPONENT_ID_FIELD_NAME_MAPPING[DATA_ACCESS_LEVEL_KEY_MAPPING[componentId]]}`, {});
        dialogSubmit({ response, componentId, accordionId, multiData, noOfData });
        setIsOpenDialog(false);
    };


    return (
        <Dialog
            open={isOpenDialog}
            onClose={() => setIsOpenDialog(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            TransitionComponent={Transition}
            fullWidth
            maxWidth="sm"
            PaperProps={{ style: { overflowY: 'visible' } }}
        >
            <Form onSubmit={props.handleSubmit(submit)}>
                <DialogTitle id="scroll-dialog-title" style={{ backgroundColor: Colors['color-basic-800'] }}>
                    <Typography style={{ color: 'white', fontWeight: 800 }} >{I18n.t('select_data_access_level')}</Typography></DialogTitle>
                <DialogContent dividers={true} style={{ overflowY: 'visible' }}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        style={styles.content}
                    >
                        {(componentId !== 9) && <Grid container direction="row"
                            justify="center"
                            alignItems="center" spacing={2}>
                            {level >= 1 && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={statesRequestInProgress} name='state' label={I18n.t('state')} option={statesList} component={reactMultiSelect} multiple={componentId === 1 && multiData}
                                    onChange={(item) => {
                                        clearFields(level);
                                        change('district', null);
                                        change('lsgi', null);
                                        change('ward', null);
                                        change('panchayath', null);
                                        change('districtPanchayath', null);
                                        change('blockPanchayath', null);
                                        change('municipality', null);
                                        change('corporation', null);
                                        dispatch(loadDistricts({ id: { stateId: item.id || '' }, identifier: API_IDENTIFIER }));
                                    }}>

                                </Field>
                            </Grid>
                            }
                            {level >= 2 && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={districtsRequestInProgress} name='district' label={I18n.t('district')} option={districtsList} limit={noOfData} component={reactMultiSelect} multiple={componentId === 2 && multiData}
                                    onChange={(item) => {
                                        clearFields(level);
                                        change('lsgi', null);
                                        change('ward', null);
                                        change('panchayath', null);
                                        change('districtPanchayath', null);
                                        change('blockPanchayath', null);
                                        change('municipality', null);
                                        change('corporation', null);
                                        let districtId = _.get(item, 'id', '');
                                        if (componentId === 3 || componentId === 4 || componentId === 7) {
                                            dispatch(loadLSGI({ identifier: API_IDENTIFIER, id: { districtId, lsgiTypeId: DB_PB_MASTER[DATA_ACCESS_LEVEL_KEY_MAPPING[componentId]] } }));
                                        }
                                        if (componentId === 6) {
                                            dispatch(loadBlockPanchayath({ identifier: API_IDENTIFIER, id: { districtId } }));
                                        }
                                        if (componentId === 5) {
                                            dispatch(loadDistrictPanchayath({ identifier: API_IDENTIFIER, id: { districtId } }));
                                        }
                                        if (componentId === 8) {
                                            dispatch(fetchAllLocalBodies({ districtId }));
                                        }
                                    }}>

                                </Field>
                            </Grid>

                            }
                            {(componentId === 3) && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={corporationMunicipalityPanchayathRequestInProgress} name='corporation' label={I18n.t('corporation')} option={corporationMunicipalityPanchayathList} limit={noOfData} component={reactMultiSelect} multiple={multiData}>

                                </Field>
                            </Grid>

                            }
                            {(componentId === 4) && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={corporationMunicipalityPanchayathRequestInProgress} name='municipality' label={I18n.t('municipality')} option={corporationMunicipalityPanchayathList} limit={noOfData} component={reactMultiSelect} multiple={multiData}>

                                </Field>
                            </Grid>

                            }
                            {(componentId === 7) && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={corporationMunicipalityPanchayathRequestInProgress} name='panchayath' label={I18n.t('grama_panchayath')} option={corporationMunicipalityPanchayathList} limit={noOfData} component={reactMultiSelect} multiple={multiData}>

                                </Field>
                            </Grid>

                            }
                            {(componentId === 5) && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={districtPanchayathRequestInProgress} name='districtPanchayath' label={I18n.t('district_panchayath')} option={districtPanchayathList} component={reactMultiSelect} multiple={multiData}>

                                </Field>
                            </Grid>
                            }
                            {(componentId === 6) && <Grid item xs={12} sm={12} md={12}>
                                <Field spinnerProps={blockPanchayathRequestInProgress} name='blockPanchayath' label={I18n.t('block_panchayath')} option={blockPanchayathList} limit={noOfData} component={reactMultiSelect} multiple={multiData}>

                                </Field>
                            </Grid>
                            }
                            {(componentId === 8) && <>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Field spinnerProps={lsgiRequestInProgress} name='lsgi' label={I18n.t('lsgi')} option={lsgiList} component={reactMultiSelect} multiple={false}
                                        onChange={(item) => {
                                            change('ward', null);
                                            let lsgiId = _.get(item, 'id', '');
                                            dispatch(fetchWards({ lsgiId }));
                                        }}
                                    >

                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Field spinnerProps={wardRequestInProgress} name='ward' label={I18n.t('ward')} option={wardList} limit={noOfData} component={reactMultiSelect} multiple={multiData}>

                                    </Field>
                                </Grid>

                            </>
                            }

                        </Grid>}
                        {(componentId === 9) && <Grid container direction="row"
                            justify="center"
                            alignItems="center" spacing={2}>
                            <Field spinnerProps={residenceCategoryRequestInProgress} name='residenceCategory' label={I18n.t('residence_category')} option={residenceCategoryList} limit={noOfData} component={reactMultiSelect}>

                            </Field>
                        </Grid>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={styles.content}><Button onClick={() => {
                    setIsOpenDialog(false);
                    // props.resetForm();
                }}>
                    {I18n.t('cancel')}
                </Button>
                    <Button type='submit' autoFocus disabled={false}>
                        {I18n.t('add')}
                    </Button>
                </DialogActions>
            </Form>
        </Dialog >
    );
};


const mapStateToProps = createStructuredSelector({
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(mapStateToProps, null)(reduxForm({
    form: 'DataAccessPermissionLevelSelector',
    validate: validateDataAccessPermissionLevelSelector
})(DataAccessPermissionLevelSelector));
