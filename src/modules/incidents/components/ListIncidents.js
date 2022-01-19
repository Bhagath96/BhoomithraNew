import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchIncidents } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS, BASE64_APPEND } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getIncidentsList } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import isBase64 from 'is-base64';
import { convertToLocal } from '../../../utils/DateUtils';

const { MUIDataTable, PickySelect, Typography, Dialog } = Components;
const { lodashUtils: _ } = utils;

function ListIncidents(props) {
    const dispatch = useDispatch();
    const { listIncidents: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setIncidentsFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadIncidents } = props;
    const { tableProps: { [TABLE_IDS.LIST_INCIDENTS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const [selectedValue, setSelectedValueForPopup] = useState('');

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'customer_name', columnName: 'customerName', apiParam: 'customerNames', searchKey: 'incident.customerName', filterBy: 'name' },
        { columnLabel: 'comment', columnName: 'comment', apiParam: '', filterBy: 'name' },
        { columnLabel: 'photo', columnName: 'photo', apiParam: '', filterBy: 'name' },
        { columnLabel: 'incident_config', columnName: 'incidentConfig', apiParam: 'incidentConfigs', searchKey: 'incident.customerName', filterBy: 'name' },
        { columnLabel: 'reported_by', columnName: 'reportedBy', apiParam: 'users', searchKey: 'incident.reportedBy', filterBy: 'name' },
        { columnLabel: 'location', columnName: 'location', apiParam: '', filterBy: 'name' },
        { columnLabel: 'reported_date', columnName: 'reportedDate', apiParam: '', filterBy: 'name' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadIncidents();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_INCIDENTS }));
        setChips({});
        loadIncidents();
    }, []);

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t([passedColumns[0].columnLabel]),
            options: {
                display: 'excluded',
                filter: false
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
                                <Typography variant='h7'>{I18n.t([passedColumns[1].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setIncidentsFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, [passedColumns[1].searchKey]), [passedColumns[1].columnName]);
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
                filter: false,
                customBodyRender: (value) => {
                    return <div style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedValueForPopup(value)}
                    >
                        {value.substring(0, 10) + '...'}
                    </div >;
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div style={{ cursor: 'pointer' }}>
                        {isBase64(value) ? <img
                            style={{ width: '50px', height: 100 }}
                            src={`${BASE64_APPEND}${value}`} alt=''
                            onClick={() => setSelectedValueForPopup(`${BASE64_APPEND}${value}`)}
                        /> : <p></p>}
                    </div>;
                }
            }

        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t([passedColumns[4].columnLabel]),
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[4].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setIncidentsFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, [passedColumns[4].searchKey]), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[5].columnName,
            label: I18n.t([passedColumns[5].columnLabel]),
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[5].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setIncidentsFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, [passedColumns[5].searchKey]), [passedColumns[5].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[6].columnName,
            label: I18n.t([passedColumns[6].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div style={{ cursor: 'pointer' }} onClick={() => setSelectedValueForPopup(value)}>
                        {
                            <p>{value.formattedAddress}</p>
                        }
                    </div>;
                }
            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t([passedColumns[7].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        }
    ];
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setIncidentsFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);


        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENTS }));
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
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENTS })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_INCIDENTS }));
                    break;
                default:
                    break;
            }
        }
    };

    const SelectedView = ({ valueToShow }) => {
        if (typeof valueToShow === 'string' && valueToShow.toString().includes(BASE64_APPEND)) {
            return <div style={{ textAlign: 'center' }}>
                <img
                    style={{ width: 360, maxWidth: 360, height: 640 }}
                    src={valueToShow} alt={''}
                    onClick={() => setSelectedValueForPopup(true)}
                />
            </div>;
        } else if (typeof valueToShow === 'object') {
            return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <iframe style={{ margin: 'auto' }} src={`https://maps.google.com/maps?q=${_.get(valueToShow, 'latitude', 0)},${_.get(valueToShow, 'longitude', 0)}&hl=es;z=14&output=embed`} />
            </div>;
        } else {
            return <p>{valueToShow}</p>;
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
            <Dialog
                title={selectedValue.toString().includes(BASE64_APPEND) ? I18n.t('screenshot') : typeof selectedValue === 'object' ? I18n.t('location') : I18n.t('comment')}
                body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                    <SelectedView valueToShow={selectedValue} />
                </div>}
                onCancel={() => setSelectedValueForPopup(false)}
                cancelText={I18n.t('ok')}
                isOPen={selectedValue}
            />
        </div >
    );
}
const mapStateToProps = createStructuredSelector({
    listIncidents: getIncidentsList,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_INCIDENTS, url: URL.LIST_INCIDENTS }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_INCIDENTS }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_INCIDENTS, passedColumns: data })),
    setIncidentsFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_INCIDENTS, filterState: data }));
    },
    loadIncidents: (data) => dispatch(fetchIncidents(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_INCIDENTS }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_INCIDENTS, pagination: data }));
        dispatch(fetchIncidents());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_INCIDENTS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_INCIDENTS, pagination: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListIncidents);

