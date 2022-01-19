import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
// import _ from '../../../utils/LodashUtils';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { deleteFragment } from '../actions';
import swlt from 'sweetalert2';
import { Components, Icons, I18n } from '../../../common/components';
import { useHistory } from 'react-router-dom';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import utils from '../../../utils';
import { getTableProps } from '../../common/selectors';
import * as Actions from '../actions';
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
const { lodashUtils: _ } = utils;
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, setFilterValuesFromInitialStates, resetFilter } from '../../common/actions';
import { URL } from '../../../common';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

function ListFragment(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const fragment = useSelector(state => state[STATE_REDUCER_KEY].fragment);
    const { setPassedColumnsForTable, getDropdownFilterList, setFragmentFilter, setPagination, setChips, setPageProps, loadFragment } = props;
    const { tableProps: { [TABLE_IDS.LIST_FRAGMENT]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { data = {}, requestInProgress = false, searchKeys } = fragment;
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' }
    ];

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadFragment();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_FRAGMENT }));
        setChips({});
        loadFragment();
    }, []);


    //triggered when add button is pressed
    const handleClick = () => {
        history.push('/admin/index/fragment/create');
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        // dispatch(setUserForEdit(id));
        history.push(`/admin/index/fragment/${id}/details`);
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
                dispatch(deleteFragment(id || 0, page, size, count));
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
                                        setFragmentFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        if (val.length > 1) {
                                            getDropdownFilterList(val, _.get(searchKeys, 'fragment.name'), [passedColumns[1].columnName]);
                                        }
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.DELETE_IN_ACTION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.ADD);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                filter: false,
                ...TABLE_STICKY_ACTIONS,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.VIEW_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.DELETE_IN_ACTION)) {
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
        setFragmentFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_FRAGMENT }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };
    const options = {
        ...MUI_COMMON_OPTIONS,
        page: page,
        rowsPerPage: size,
        count: count,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_FRAGMENT }));
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
                title={I18n.t('fragments')}
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
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_FRAGMENT, url: URL.DYNAMIC_FORM.LIST_FRAGMENT }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_FRAGMENT }));
        }
    },

    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_FRAGMENT, passedColumns: data })),
    loadFragment: (data) => dispatch(Actions.listFragment(data)),
    setFragmentFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_FRAGMENT, filterState: data })),
    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_FRAGMENT }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_FRAGMENT, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_FRAGMENT }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_FRAGMENT, pagination: data }));
        dispatch(Actions.listFragment());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_FRAGMENT, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_FRAGMENT, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListFragmentView',
    enableReinitialize: true
})(ListFragment));
