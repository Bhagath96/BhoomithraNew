import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { deleteTitle } from '../actions';
import swlt from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import utils from '../../../utils';
import { getTableProps } from '../../common/selectors';
import * as Actions from '../actions';
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

// import utils from '../../../utils';
const { lodashUtils: _ } = utils;

function ListTitleView(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { getDropdownFilterList, setTitleFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadQuestions } = props;

    const { tableProps: { [TABLE_IDS.LIST_TITLE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const title = useSelector(state => state[STATE_REDUCER_KEY].title);
    const { data = {}, requestInProgress = false, searchKeys } = title;
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' }
    ];

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadQuestions();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_TITLE }));
        setChips({});
        loadQuestions();
    }, []);


    const editPressed = (rowData) => {

        let id = rowData[0];
        // dispatch(setUserForEdit(id));
        history.push(`/admin/index/title/${id}/details`);
    };

    //triggered when add button is pressed
    const handleClick = () => {
        history.push('/admin/index/title/create');
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
                dispatch(deleteTitle(id || 0, page, size, count));
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
                                    id={passedColumns[1].columnName}
                                    name={passedColumns[1].columnName}
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setTitleFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'title.name'), [passedColumns[1].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const showViewMenu = hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.VIEW_IN_ACTION);
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.DELETE_IN_ACTION) || showViewMenu || false;
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.READ_ONLY);
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.ADD) && !readOnlyPermission;
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
                    if (showViewMenu) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.DELETE_IN_ACTION)) {
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
        setTitleFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TITLE }));
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
        page,
        rowsPerPage: size,
        count,
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_TITLE }));
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
                title={I18n.t('titles')}
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
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_TITLE, url: URL.DYNAMIC_FORM.LIST_TITLE }));
        }
        if (searchValue === '') {
            // dispatch(setFiltersToInitialValues({ key: TABLE_IDS.LIST_TITLE }));
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TITLE }));

        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_TITLE, passedColumns: data })),
    loadQuestions: (data) => dispatch(Actions.listTitle(data)),
    setTitleFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_TITLE, filterState: data }));
    },
    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_TITLE }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_TITLE, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_TITLE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_TITLE, pagination: data }));
        dispatch(Actions.listTitle());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_TITLE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_TITLE, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListTitleView',
    enableReinitialize: true
})(ListTitleView));

