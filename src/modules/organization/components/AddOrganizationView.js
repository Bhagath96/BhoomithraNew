import React, { useEffect } from 'react';
import { Field, Form, FormSection, FieldArray } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { Components, I18n, makeStyles, Icons } from '../../../common/components';
import { CommonHierarchy, HIERARCHY_LABEL } from '../../common';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { renderCard, liteBoxShadow } from '../../../assets/css/bhoom';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import * as CommonConstants from '../../../modules/common/constants';
import { organizationTypeChecking } from '../../../utils/ApiUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Grid, Button, CardComponent, Card, CardHeader, IconButton, CardContent, Typography, Colors } = Components;

const { AddBoxTwoTone, DeleteForeverIcon, ExpandMoreIcon } = Icons;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    }
}));


const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
        },
        borderBottom: 0,
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-primary-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);
const renderLabels = ({ fields, disabled,
    change, languages, title = 'Label' }) => {
    fields.length < 1 && fields.push({});
    return (


        < Card style={renderCard.options} >
            <CardHeader
                action={
                    <IconButton className='addButton' aria-label="Options" onClick={() => !disabled && fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card key={index} style={renderCard.accordion}>
                        <Accordion defaultExpanded={true} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{`${title} ${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton aria-label="Options" onClick={() => !disabled && fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={6} >
                                    <Field disabled={disabled} name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={6} >
                                    <Field disabled={disabled} name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    );
};

export const AddOrganizationView = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { id = null } = useParams();
    useEffect(() => {
        if (id) {
            let organizationType = organizationTypeChecking(id);
            if (!organizationType) {
                dispatch(Actions.fetchOrganizationDetails(id));
            }
        } else {
            dispatch(Actions.clearReducer());
        }
    }, []);


    const { change, handleSubmit, organization: {
        // parentOrganizations = {},
        organizationTypes = {},
        commonHierarchy: {
            state = {},
            district = {},
            blockPanchayath = {},
            districtPanchayath = {},
            lsgi = {}
        } = {},
        addOrUpdateOrganization = {}
    }
    } = props;
    const { allLanguages: languages } = useSelector(languageState => languageState[CommonConstants.STATE_REDUCER_KEY]);
    const submit = (values) => {
        dispatch(Actions.saveOrganization({ ..._.get(values, 'organization', {}), organizationId: id }));
    };

    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_DETAILS, ACTION_MAPPING.ORGANIZATION_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>

                    <LoadingOverlay active={addOrUpdateOrganization.requestInProgress}>
                        <FormSection name="organization">
                            <Grid container className={classes.item}>
                                <Grid item xs={4} sm={4} md={4} className={classes.item}>
                                    <Field disabled={readOnlyPermission} name="code" label={I18n.t('organization_code')} component={renderTextField} />
                                </Grid>
                                <Grid item xs={8} sm={8} md={8} className={classes.item}>
                                    <Field disabled={readOnlyPermission} name="name" label={I18n.t('organization_name')} component={renderTextField} />
                                </Grid>
                                <Grid item style={liteBoxShadow} xs={12} sm={12} md={12} >
                                    <FieldArray disabled={readOnlyPermission} name='labels' component={renderLabels} languages={languages} change={change} title={I18n.t('label')} />
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field  disabled={readOnlyPermission} name="parentOrganization" label={I18n.t('parent_organization')} component={renderSimpleSelect} onChange={(value) =>
                                        change('organization.parentOrganization', value)} >
                                        {
                                            _.get(parentOrganizations, 'data', [])
                                        }
                                    </Field>
                                </Grid> */}

                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field disabled={readOnlyPermission} name="organizationType" label={I18n.t('organization_type')} component={renderSimpleSelect} onChange={(event, index, value) => {
                                        change('organization.organizationType', value);
                                    }
                                    }>
                                        {
                                            _.get(organizationTypes, 'data', [])
                                        }
                                    </Field>
                                </Grid>

                                <CommonHierarchy
                                    formName='AddOrganizationForm' // redux for name
                                    formPath='organization' // Current FormSection to identify the components
                                    identifier="Organization" // Component Identifier, used for Dynamic Event creation
                                    change={change}
                                    disabled={readOnlyPermission}
                                    data={{
                                        [HIERARCHY_LABEL.STATE]: _.get(state, 'data', []),
                                        [HIERARCHY_LABEL.DISTRICT]: _.get(district, 'data', []),
                                        [HIERARCHY_LABEL.BLOCK_PANCHAYATH]: _.get(blockPanchayath, 'data', []),
                                        [HIERARCHY_LABEL.DISTRICT_PANCHAYATH]: _.get(districtPanchayath, 'data', []),
                                        [HIERARCHY_LABEL.LSGI]: _.get(lsgi, 'data', [])
                                    }} />
                                <Grid item xs={4} sm={4} md={4} className={classes.item}>
                                    <Field disabled={readOnlyPermission} name="sort" label={I18n.t('sort_order')} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </FormSection>

                        {!readOnlyPermission && <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{id !== null ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>}
                    </LoadingOverlay>
                </Form >
            </div>
        </CardComponent>
    );
};

export default AddOrganizationView;
