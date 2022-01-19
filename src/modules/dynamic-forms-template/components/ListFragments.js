import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { deleteAssignedFragment } from '../actions';
import swlt from 'sweetalert2';
import { Components, Icons, I18n } from '../../../common/components';
import { PATH } from '../../../routes';
import { useParams } from 'react-router-dom';
import { history, URL } from '../../../common';
import utils from '../../../utils';
import { onFilterChangeFn } from '../../../utils/ApiUtils';

import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
// import { tableFilterDestructuringArray } from '../../../utils/ApiUtils';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';

import * as Actions from '../actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
const { lodashUtils: _ } = utils;


function ListFragments(props) {
    const dispatch = useDispatch();
    const { id: templateId = null } = useParams();
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadTemplatefragment } = props;
    const { tableProps: { [TABLE_IDS.LIST_TEMPLATE_FRAGMENT]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = props;
    const { listFragments = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { requestInProgress = false, data: { content = [] } = {}, searchKeys = [] } = listFragments;

    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.DYNAMIC_TEMPLATE}/${templateId}/fragment/${id}`);
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
                dispatch(deleteAssignedFragment({ id, templateId }));
            }
        });
    };

    //triggered when add button is pressed
    const handleClick = () => {
        history.push(`${PATH.DYNAMIC_TEMPLATE}/${templateId}/fragment/create`);
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'fragmentNames', filterBy: 'name' },
        { columnLabel: 'label', columnName: 'label', apiParam: 'fragmentLabels', filterBy: 'name' },
        { columnLabel: 'routes', columnName: 'routes', apiParam: 'fragmentroutes', filterBy: 'name' },
        { columnLabel: 'fragmentJson', columnName: 'fragmentJson', apiParam: 'fragmentJson', filterBy: 'name' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadTemplatefragment({ templateId });
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT }));
        setChips({});
        loadTemplatefragment({ templateId });

    }, []);


    const columns = [
        {
            name: 'id',
            label: I18n.t('id'),
            options: {
                filter: false
            }
        },
        {
            name: 'name',
            label: I18n.t('name'),
            options: {

                filter: true,
                filterType: 'custom',

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
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'fragment.name'), [passedColumns[1].columnName], templateId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
            name: 'label',
            label: I18n.t('label'),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('label')]}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'fragment.fragmentLabel'), [passedColumns[2].columnName], templateId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'routes',
            label: I18n.t('routes'),
            options: {
                filter: false
            }
        }, {
            name: 'fragmentJson',
            label: I18n.t('fragment_json'),
            options: {
                filter: false
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.DELETE_IN_ACTION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.ADD);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                setCellProps: () => ({
                    style: {
                        whiteSpace: 'nowrap',
                        position: 'sticky',
                        right: '0',
                        background: 'white',
                        zIndex: 100
                    }
                }),
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.VIEW_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.DELETE_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }

    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setStateFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);
        if (!chipExists) {
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
        serverSide: true,
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ templateId, pagination: { page: tableState.page } });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ templateId, pagination: { page: 0, size: tableState.rowsPerPage } });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT }));
                    break;
                default:
                    break;
            }
        }
    };
    return (
        <div>
            <MUIDataTable
                title={I18n.t('fragments')}
                data={content}
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
    getDropdownFilterList: (searchValue, searchKey, columnName, templateId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_FRAGMENTS_BY_TEMPLATE.replace(':templateId', templateId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, passedColumns: data })),
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, filterState: data }));
    },
    loadTemplatefragment: (data) => dispatch(Actions.fetchFragmentsByTemplate(data)),
    setPageProps: ({ templateId, pagination }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, pagination }));
        dispatch(Actions.fetchFragmentsByTemplate({ templateId }));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListTemplateFragmentsView',
    enableReinitialize: true
})(ListFragments));

