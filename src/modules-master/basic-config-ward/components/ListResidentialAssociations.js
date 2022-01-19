import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { clearSelectedRA, deleteRAData, fetchAllRA } from '../actions';
import { Components, I18n, Icons } from '../../../common/components';
import utils from '../../../utils';
import Swal from 'sweetalert2';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { PATH } from '../../../routes';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getResidentialAssociations } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { AddIcon } = Icons;
const { lodashUtils: _ } = utils;
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;


const ListResidentialAsscociations = (props) => {
    const history = useHistory();
    const { id: wardId } = useParams();
    const dispatch = useDispatch();
    const optInValue = [{ id: 'true', name: 'true' }, { id: 'false', name: 'false' }];

    const { listAllResidentialAssociations: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setRAFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadResidentialAssociations } = props;
    const { tableProps: { [TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'raId', columnName: 'raId', apiParam: 'raIds', filterBy: 'name' },
        { columnLabel: 'completed', columnName: 'completed', apiParam: 'completed', filterBy: 'name' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadResidentialAssociations({ wardId });
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_DISTRICT }));
        setChips({});
        loadResidentialAssociations({ wardId });
    }, []);


    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/${id}/details`);
    };
    const deletePressed = (rowData) => {
        let id = rowData[0];
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteRAData(id, wardId));
            }
        });
    };
    const handleClick = () => {
        dispatch(clearSelectedRA());
        history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/create`);
    };
    const columns = [
        {
            name: 'id',
            label: I18n.t('id'),
            options: {
                display: 'excluded',
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
                                        setRAFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_residence_association.name'), [passedColumns[1].columnName], wardId);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'raId',
            label: I18n.t('registration_number'),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('raId')]}</Typography>
                                <PickySelect
                                    id='raId'
                                    name='raId'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    multiple={true}
                                    onChange={value => {
                                        setRAFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value?.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_residence_association.raId'), [passedColumns[2].columnName], wardId);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'completed',
            label: I18n.t('completed'),
            options: {
                filter: true,
                filterType: 'custom',
                customBodyRender: (val) => {
                    return val === true ? 'true' : 'false';
                },
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('completed')]}</Typography>
                                <PickySelect
                                    id='completed'
                                    name='completed'
                                    options={optInValue || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    includeFilter={false}
                                    onChange={value => {
                                        let selectedItems = [value];
                                        setRAFilter({ [passedColumns[3].apiParam]: { value: selectedItems, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = selectedItems.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}

                                    dropdownHeight={600}
                                />
                            </>
                        );

                    }
                }
            }

        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.RESIDENTIAL_ASSOCIATION, ACTION_MAPPING.RESIDENTIAL_ASSOCIATION.EDIT_RESIDENTIAL_ASSOCIATION) || hasAccessPermission(RESOURCE_MAPPING.RESIDENTIAL_ASSOCIATION, ACTION_MAPPING.RESIDENTIAL_ASSOCIATION.DELETE_RESIDENTIAL_ASSOCIATION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.RESIDENTIAL_ASSOCIATION, ACTION_MAPPING.RESIDENTIAL_ASSOCIATION.ADD_RESIDENTIAL_ASSOCIATION);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.RESIDENTIAL_ASSOCIATION, ACTION_MAPPING.RESIDENTIAL_ASSOCIATION.EDIT_RESIDENTIAL_ASSOCIATION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.RESIDENTIAL_ASSOCIATION, ACTION_MAPPING.RESIDENTIAL_ASSOCIATION.DELETE_RESIDENTIAL_ASSOCIATION)) {
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
        setRAFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);


        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION }));
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
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page, wardId });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage, wardId });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION }));
                    break;
                default:
                    break;
            }
        }
    };
    return (
        <div>
            <MUIDataTable
                title={I18n.t('residential_association')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    listAllResidentialAssociations: getResidentialAssociations,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, wardId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, url: URL.WARD.LIST_RESIDENTIAL_ASSOCIATIONS, wardId }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, passedColumns: data })),
    setRAFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, filterState: data }));
    },
    loadResidentialAssociations: (data) => dispatch(fetchAllRA(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, pagination: data }));
        dispatch(fetchAllRA());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListResidentialAsscociations);
