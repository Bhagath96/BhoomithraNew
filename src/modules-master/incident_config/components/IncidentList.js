import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
// import swlt from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getIncidents } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { PATH } from '../../../routes';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { MUIDataTable, DottedMenu, PickySelect } = Components;
const { AddIcon } = Icons;

function IncidentList(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { listIncident: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setIncidentFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadIncidents } = props;
    const { tableProps: { [TABLE_IDS.LIST_INCIDENT]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' }
    ];

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadIncidents();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_INCIDENT }));
        setChips({});
        loadIncidents();
    }, []);


    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(Actions.resetIncidentForm());
        history.push(PATH.INCIDENT_CONFIG + '/create');
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.INCIDENT_CONFIG}/${id}`);
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
                                name={I18n.t(passedColumns[1].columnLabel)}
                                options={filterOptions[passedColumns[1].columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setIncidentFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, _.get(searchKeys, 'incident_config.configLabelName'), [passedColumns[1].columnName]);
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
        let currentFilters = filterState[passedColumns[chipIndex]?.apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setIncidentFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);

        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENT }));
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.EDIT_INCIDENT_CONFIG) || hasAccessPermission(RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.EDIT_INCIDENT_CONFIG) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.ADD_INCIDENT_CONFIG);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.EDIT_INCIDENT_CONFIG)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.DELETE_INCIDENT_CONFIG)) {
                        menuActions.push({ name: I18n.t('delete') });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENT })),

        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_INCIDENT }));
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <MUIDataTable
                title={I18n.t('incidents')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    listIncident: getIncidents,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_INCIDENT, url: URL.INCIDENT.LIST_INCIDENT_CONFIG }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENT }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_INCIDENT, passedColumns: data })),
    setIncidentFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_INCIDENT, filterState: data }));
    },
    loadIncidents: (data) => dispatch(Actions.listIncident(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_INCIDENT }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_INCIDENT, pagination: data }));
        dispatch(Actions.listIncident());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_INCIDENT, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_INCIDENT, pagination: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(IncidentList);
