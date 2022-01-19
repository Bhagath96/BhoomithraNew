import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { Components, I18n } from '../../../common/components';
import { PATH } from '../../../routes';
import { useParams, useHistory } from 'react-router-dom';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../common/constants';
const { MUIDataTable } = Components;
//import ActionButtons from '../../../common/components/custom/mui-data-table/ActionButtons';
import i18n from '../../../i18n';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import * as Actions from '../actions';
import utils from '../../../utils';
import { URL } from '../../../common';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { lodashUtils: _ } = utils;

function ListRoutes(props) {
    const { PickySelect, Typography } = Components;

    const dispatch = useDispatch();
    const history = useHistory();
    const { id: templateId = null } = useParams();

    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadTemplateRoutes } = props;
    const { tableProps: { [TABLE_IDS.LIST_TEMPLATE_ROUTE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = props;
    const { listRoutesByTemplate = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { requestInProgress = false, data: { content = [] } = {}, searchKeys = [] } = listRoutesByTemplate;


    const editPressed = (item) => {
        let id = item[0];
        history.push(`${PATH.DYNAMIC_TEMPLATE}/${templateId}/routes/${id}`);
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
        loadTemplateRoutes({ templateId });
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE }));
        setChips({});
        loadTemplateRoutes({ templateId });

    }, []);

    const columns = [
        {
            name: 'id',
            label: i18n.t('id'),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: 'name',
            label: i18n.t('name'),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[i18n.t('name')]}</Typography>
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
            label: i18n.t('label'),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[i18n.t('label')]}</Typography>
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
            label: i18n.t('routes'),
            options: {
                filter: false
            }
        }, {
            name: 'fragmentJson',
            label: i18n.t('fragment_json'),
            options: {
                filter: false
            }
        },
        {
            name: 'Actions',
            options: {
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
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_ROUTE, ACTION_MAPPING.TEMPLATE_ROUTE.VIEW_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_ROUTE, ACTION_MAPPING.TEMPLATE_ROUTE.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    return (
                        <DottedMenu
                            options={menuActions} />
                    );
                }
            }
        }
    ];


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
        customActions: [],
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ templateId, pagination: { page: tableState.page } });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ templateId, pagination: { page: 0, size: tableState.rowsPerPage } });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE }));
                    break;

                default:
                    break;
            }
        }
    };
    return (
        <div>
            <MUIDataTable
                title='Routes'
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />

        </div>
    );
}

// export default ListRoutes;

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({

    getDropdownFilterList: (searchValue, searchKey, columnName, templateId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_TEMPLATE_ROUTE, url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_FRAGMENTS_BY_TEMPLATE.replace(':templateId', templateId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, passedColumns: data })),
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, filterState: data }));
    },
    loadTemplateRoutes: (data) => dispatch(Actions.fetchRoutesByTemplate(data)),
    setPageProps: ({ templateId, pagination }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, pagination }));
        dispatch(Actions.fetchRoutesByTemplate({ templateId }));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, pagination: data }))


});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListRoutesView',
    enableReinitialize: true
})(ListRoutes));
