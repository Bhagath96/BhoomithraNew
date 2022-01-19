import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { deleteQuestion } from '../actions';
import swlt from 'sweetalert2';
import { Components, Icons, I18n } from '../../../common/components';
import { history } from '../../../common';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import utils from '../../../utils';
import { getTableProps } from '../../common/selectors';
import * as Actions from '../actions';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, setFilterValuesFromInitialStates, resetFilter } from '../../common/actions';
import { URL } from '../../../common';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
const { lodashUtils: _ } = utils;

function ListQuestionsView(props) {
    const dispatch = useDispatch();
    const { setPassedColumnsForTable, getDropdownFilterList, setQuestionFilter, setPagination, setChips, setPageProps, loadQuestions } = props;
    const { tableProps: { [TABLE_IDS.LIST_QUESTIONS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { listQuestions = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { data: { content = [] } = {}, requestInProgress = false, searchKeys = [] } = listQuestions;

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'type', columnName: 'type', apiParam: 'types', filterBy: 'name' }
    ];
    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadQuestions();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_QUESTIONS }));
        setChips({});
        loadQuestions();

    }, []);

    const handleClick = () => {
        history.push('/admin/index/dynamic-forms/create');
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/dynamic-forms/${id}/details`);
    };
    //function for delete
    const deletePressed = (rowData) => {
        let id = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            text: I18n.t('removing_warning'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteQuestion(id || 0, size, page));
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
                            <div>
                                <Typography variant='h7'>{[I18n.t('name')]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setQuestionFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        // if (val.length > 1) {
                                        getDropdownFilterList(val, _.get(searchKeys, 'question.name'), [passedColumns[1].columnName]);
                                        // }
                                    }}
                                />
                            </div>
                        );

                    }
                }
            }

        },
        {
            name: 'type.name',
            label: I18n.t(passedColumns[2].columnLabel),
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
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setQuestionFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_question_type.name'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];

    const showViewMenu = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.VIEW_IN_ACTION);
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.DELETE_IN_ACTION) || showViewMenu || false;
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.READ_ONLY);
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.ADD) && !readOnlyPermission;
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
                    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.DELETE_IN_ACTION)) {
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
        setQuestionFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_QUESTIONS }));
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_QUESTIONS }));
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
                title={I18n.t('questions')}
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
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_QUESTIONS, url: URL.DYNAMIC_FORM.LIST_QUESTIONS }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_QUESTIONS }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_QUESTIONS, passedColumns: data })),
    loadQuestions: (data) => dispatch(Actions.fetchQuestions(data)),
    setQuestionFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_QUESTIONS, filterState: data }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_QUESTIONS, pagination: { page: 0 } }));

    },

    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_QUESTIONS }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_QUESTIONS, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_QUESTIONS }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_QUESTIONS, pagination: data }));
        dispatch(Actions.fetchQuestions());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_QUESTIONS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_QUESTIONS, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListQuestionsViewView',
    enableReinitialize: true
})(ListQuestionsView));


