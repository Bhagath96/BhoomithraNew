import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
// import _ from '../../../utils/LodashUtils';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { deleteTemplate } from '../actions';
import swlt from 'sweetalert2';
import { Components, Icons, I18n } from '../../../common/components';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import utils from '../../../utils';
import { getTableProps } from '../../common/selectors';
import * as Actions from '../actions';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { lodashUtils: _ } = utils;
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
function ListTemplates(props) {

    const dispatch = useDispatch();
    const { getDropdownFilterList, setTemplateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadTemplates } = props;
    const { tableProps: { [TABLE_IDS.LIST_TEMPLATE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { listTemplates = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { data = {}, requestInProgress = false, searchKeys } = listTemplates;

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'version', columnName: 'version', apiParam: 'versions', filterBy: 'name' },
        { columnLabel: 'key', columnName: 'key', apiParam: 'keys', filterBy: 'name' },
        { columnLabel: 'type', columnName: 'templateType.label', apiParam: 'types', filterBy: 'name' }
    ];
    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadTemplates();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE }));
        setChips({});
        loadTemplates();
    }, []);

    // //triggered when add button is pressed
    const handleClick = () => {
        history.push(`${PATH.DYNAMIC_TEMPLATE}/create`);
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}`);
    };
    //function for delete
    const deletePressed = (rowData) => {
        let id = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteTemplate(id || 0, page, size, count));
            }
        });
    };

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('name')]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.name'), [passedColumns[1].columnName]);
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
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('version')]}</Typography>
                                <PickySelect
                                    id='version'
                                    name='version'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.version'), [passedColumns[2].columnName]);
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
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('key')]}</Typography>
                                <PickySelect
                                    id='key'
                                    name='key'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'template.key'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'templateType.label',
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('type')]}</Typography>
                                <PickySelect
                                    id='type'
                                    name='type'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setTemplateFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_template_type.label'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.DELETE_IN_ACTION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.ADD);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.VIEW_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.DELETE_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }

    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setTemplateFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE }));
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
        page: page,
        rowsPerPage: size,
        count: count,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE }));
                    setFilterItems({});
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <MUIDataTable
                title={I18n.t('templates')}
                data={data.content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_TEMPLATE, url: URL.DYNAMIC_FORM_TEMPLATE.LIST_ALL_TEMPLATES }));
        }
        if (searchValue === '') {
            // dispatch(setFiltersToInitialValues({ key: TABLE_IDS.LIST_TITLE }));
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE }));

        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_TEMPLATE, passedColumns: data })),
    setTemplateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_TEMPLATE, filterState: data }));
    },
    loadTemplates: (data) => dispatch(Actions.fetchTemplates(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE, pagination: data }));
        dispatch(Actions.fetchTemplates());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_TEMPLATE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListTemplatesView',
    enableReinitialize: true
})(ListTemplates));
