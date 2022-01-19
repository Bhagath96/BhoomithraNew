import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { renderSimpleSelect } from '../../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY } from '../../constants';
import { Components, makeStyles, I18n } from '../../../../common/components';
import * as Actions from '../../actions';
import { fetchSelectedTemplatesForList } from '../../actions';

import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../../common/constants';
import { organizationTypeChecking } from '../../../../utils/ApiUtils';
import { history } from '../../../../common';
import { TABLE_IDS } from '../../constants';
import { URL } from '../../../../common';
import { onFilterChangeFn } from '../../../../utils/ApiUtils';
import utils from '../../../../utils';


import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../../modules/common/actions';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';

const { lodashUtils: _ } = utils;
const { MUIDataTable } = Components;

const { Grid, Card, Button, PickySelect, Typography } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'right'
    },
    gridStyle: {
        backgroundColor: '#fafafa'
    }
}));
const AssignTemplate = (props) => {
    const classes = useStyles();
    const { change, handleSubmit } = props;
    const dispatch = useDispatch();
    const { id = null } = useParams();
    const orgId = Number(id);
    // const pagination = useSelector(state => state.common.assignTemplateModule);
    // const { size, page } = pagination;
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { listTemplates, saveTemplatesInList: { requestInProgress: saveRequestInProgress, isSaved }, listSelectedTemplated: { data: tempData, searchKeys, requestInProgress }, templateTypes, templateByTypeId } = initialValues;
    const { getDropdownFilterList, setTemplateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadTemplates } = props;
    const { tableProps: { [TABLE_IDS.ASSIGN_TEMPLATE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { data: templateTypesForOrg } = templateTypes;
    const [disableFlag, setDisableFlag] = React.useState(true);

    const ActiveValue = [{ id: 'true', name: 'true' }, { id: 'false', name: 'false' }];

    let organizationType = organizationTypeChecking(id);
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'template_name', columnName: 'name', apiParam: 'templateNames', filterBy: 'name' },
        { columnLabel: 'template_type', columnName: 'templateType.name', apiParam: 'templateTypes', filterBy: 'code' },
        { columnLabel: 'version', columnName: 'version', apiParam: 'versions', filterBy: 'name' },
        { columnLabel: 'active', columnName: 'active', apiParam: 'actives', filterBy: 'name' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadTemplates(orgId);
    };
    useEffect(() => {
        dispatch(Actions.fetchOrganizationDetails(id));

        if (organizationType) {
            dispatch(Actions.getTemplateTypes());
            dispatch(Actions.fetchTemplatesForList());
            // dispatch(Actions.fetchSelectedTemplatesForList({ orgId: id }));
            setPassedColumnsForTable(passedColumns);
            setPagination(DEFAULT_TABLE_PROPS);
            dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_TEMPLATE }));
            setChips({});
            loadTemplates(orgId);

        } else {
            history.push(`/admin/index/organization/${id}/basic`);
            window.location.reload();
        }
    }, []);
    const clearForm = () => {
        props.change('templateTypesForOrg', 0);
        props.change('listTemplate', 0);
        props.change('templateTypeId', 0);
        props.change('listTemplateId', 0);
        props.change('assignTemplate', {});
    };
    useEffect(() => {
        if (isSaved) {
            clearForm();
        }
    }, [isSaved]);
    const submit = async (values) => {
        const { templateTypeId, listTemplateId } = values;
        await dispatch(Actions.saveTemplatesInList({ templateTypeId: templateTypeId, organizationId: id, templateId: listTemplateId }));
    };

    const columns = [
        {
            name: 'id',
            label: I18n.t('id'),
            options: {
                filter: false,
                display: 'excluded'
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[1].columnLabel])]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.name'), [passedColumns[1].columnName], orgId);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: passedColumns[2].columnName,
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[2].columnLabel])]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_template_type.label'), [passedColumns[2].columnName], orgId);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[3].columnLabel])]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.version'), [passedColumns[3].columnName], orgId);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'active',
            label: I18n.t([passedColumns[4].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[4].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[4].columnName}
                                    name={passedColumns[4].columnName}
                                    options={ActiveValue || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.active'), [passedColumns[4].columnName], orgId);

                                    }}
                                />
                            </>
                        );

                    }
                },
                customBodyRender: (value) => {
                    return JSON.stringify(value);
                }
            }

        }
    ];

    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setTemplateFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);

        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_TEMPLATE }));
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };
    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_TEMPLATE })),
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page }, orgId);
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage }, orgId);
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_TEMPLATE }));
                    break;
                default:
                    break;
            }
        }
    };

    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE, ACTION_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE.READ_ONLY);

    return (
        <Form onSubmit={handleSubmit(submit)}>
            {!readOnlyPermission && <FormSection name="assignTemplate">
                <LoadingOverlay active={requestInProgress || listTemplates.requestInProgress || saveRequestInProgress}>
                    <Grid container className={classes.gridStyletemplates}>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Card className={classes.gridStyle}>
                                <Field name="templateTypesForOrg" label={I18n.t('template_type')} component={renderSimpleSelect} onChange={(value) => {
                                    change('templateTypeId', value.target.value);
                                    if (value.target.value) {
                                        dispatch(Actions.getTemplatesBasedOnTempTypeId(value.target.value));
                                    }
                                }}
                                >
                                    {
                                        templateTypesForOrg?.map(item => ({ id: item.id, name: item.name }))
                                    }
                                </Field>
                                <Field name="listTemplate" label={I18n.t('templates')} component={renderSimpleSelect} onChange={(value) => {

                                    change('listTemplateId', value.target.value);
                                    setDisableFlag(false);

                                }
                                } >
                                    {
                                        templateByTypeId.data?.map(item => ({ id: item.id, name: item.name }))
                                    }
                                </Field>
                                <Grid item xs={12} className={classes.submit}>
                                    <Button disabled={disableFlag} type="submit">{I18n.t('add')} </Button>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}></Grid>
                    </Grid>
                </LoadingOverlay>

            </FormSection>}
            <div>
                <MUIDataTable
                    title={I18n.t('templates')}
                    data={tempData || []}
                    columns={columns}
                    options={options}
                />
            </div>
        </Form>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, orgId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.ASSIGN_TEMPLATE, url: URL.ORG_TEMPLATE.LIST_SELECTED_TEMPLATE.replace(':organizationId', orgId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_TEMPLATE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.ASSIGN_TEMPLATE, passedColumns: data })),
    setTemplateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.ASSIGN_TEMPLATE, filterState: data }));
    },
    loadTemplates: (data) => dispatch(fetchSelectedTemplatesForList(data)),
    setPageProps: (data, orgId) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_TEMPLATE }));
        dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_TEMPLATE, pagination: data }));
        dispatch(fetchSelectedTemplatesForList(orgId));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.ASSIGN_TEMPLATE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_TEMPLATE, pagination: data }))
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'assignTemplate'
})(AssignTemplate));


