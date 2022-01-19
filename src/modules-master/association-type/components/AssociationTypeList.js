import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import swlt from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getAssociationTypes } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { MUIDataTable, DottedMenu, PickySelect } = Components;
const { AddIcon } = Icons;

function AssociationTypeList(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { listAssocationType: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setAssocTypeFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadAssociationTypes } = props;
    const { tableProps: { [TABLE_IDS.LIST_ASSOCIATION_TYPE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadAssociationTypes();
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' }
    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE }));
        setChips({});
        loadAssociationTypes();
    }, []);

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(Actions.resetAssociationTypeForm());
        history.push('/admin/index/association-type/create');
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/association-type/${id}`);
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
                dispatch(Actions.deleteAssociationType(id || 0, page, size, count));
            }
        });
    };

    const columns = [
        {
            name: 'id',
            label: 'id',
            options: {
                display: 'excluded',
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

                            <PickySelect
                                label={I18n.t(passedColumns[1].columnLabel)}
                                id='nameId'
                                name={I18n.t(passedColumns[0]?.columnLabel)}
                                options={filterOptions[passedColumns[1]?.columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setAssocTypeFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, _.get(searchKeys, 'm_association_type.name'), [passedColumns[1].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        }

    ];
    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setAssocTypeFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'name' } });
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
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.EDIT_ASSOCIATION_TYPE) || hasAccessPermission(RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.DELETE_ASSOCIATION_TYPE) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.ADD_ASSOCIATION_TYPE);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.EDIT_ASSOCIATION_TYPE)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.DELETE_ASSOCIATION_TYPE)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE }));
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <MUIDataTable
                title={I18n.t('association_type')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listAssocationType: getAssociationTypes,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ASSOCIATION_TYPE, url: URL.ASSOCIATION_TYPE.LIST_ASSOCIATION_TYPE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, passedColumns: data })),
    setAssocTypeFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, filterState: data }));
    },
    loadAssociationTypes: (data) => dispatch(Actions.listAssociationType(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, pagination: data }));
        dispatch(Actions.listAssociationType());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(AssociationTypeList);
