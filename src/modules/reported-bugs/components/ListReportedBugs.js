import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchReportedBugsDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { BASE64_APPEND, TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getReportedBugsList } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import isBase64 from 'is-base64';

const { MUIDataTable, PickySelect, Typography, Dialog } = Components;
const { lodashUtils: _ } = utils;

function ListReportedBugs(props) {
    const dispatch = useDispatch();
    const { listReportedBugs: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setReportedBugFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadReportedBugs } = props;
    const { tableProps: { [TABLE_IDS.LIST_REPORTED_BUGS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const [selectedValue, setSelectedValueForPopup] = useState('');

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'reported_by', columnName: 'reportedBy', apiParam: 'users', filterBy: 'name' },
        { columnLabel: 'comment', columnName: 'comment', apiParam: '', filterBy: 'name' },
        { columnLabel: 'screenshot', columnName: 'screenshot', apiParam: '', filterBy: 'name' },
        { columnLabel: 'status', columnName: 'resolutionStatus', apiParam: 'resolutionStatuses', filterBy: 'name' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadReportedBugs();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_REPORTED_BUGS }));
        setChips({});
        loadReportedBugs();
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
                                        setReportedBugFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.name'), [passedColumns[1].columnName]);
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
                    return <div
                        style={{ cursor: 'pointer' }}
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
                    return <div>
                        {isBase64(value) ? <img
                            style={{ width: '50px', height: 100, cursor: 'pointer' }}
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
                                        setReportedBugFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_status_label.resolutionStatus'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setReportedBugFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);


        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_REPORTED_BUGS }));
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_REPORTED_BUGS })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_REPORTED_BUGS }));
                    break;
                default:
                    break;
            }
        }
    };
    return (
        <div>
            <MUIDataTable
                title={I18n.t('reported_bugs')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
            <Dialog
                title={selectedValue.toString().includes(BASE64_APPEND) ? I18n.t('screenshot') : I18n.t('comment')}
                body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                    {selectedValue.toString().includes(BASE64_APPEND) ? <div style={{ textAlign: 'center' }}>
                        <img
                            style={{ width: 360, maxWidth: 360, height: 640 }}
                            src={selectedValue} alt={''}
                            onClick={() => setSelectedValueForPopup(true)}
                        />
                    </div> : <p>{selectedValue}</p>
                    }
                </div>}
                onCancel={() => setSelectedValueForPopup(false)}
                cancelText={I18n.t('ok')}
                isOPen={selectedValue}
            />
        </div >
    );
}
const mapStateToProps = createStructuredSelector({
    listReportedBugs: getReportedBugsList,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_REPORTED_BUGS, url: URL.LIST_REPORTED_BUGS.LIST_REPORTED_BUGS }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_REPORTED_BUGS }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_REPORTED_BUGS, passedColumns: data })),
    setReportedBugFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_REPORTED_BUGS, filterState: data }));
    },
    loadReportedBugs: (data) => dispatch(fetchReportedBugsDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_REPORTED_BUGS }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_REPORTED_BUGS, pagination: data }));
        dispatch(fetchReportedBugsDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_REPORTED_BUGS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_REPORTED_BUGS, pagination: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListReportedBugs);

