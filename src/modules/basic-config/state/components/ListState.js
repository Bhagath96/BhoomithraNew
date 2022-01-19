import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import utils from '../../../utils';
import { fetchStateDetails, deleteStateData, clearStateReducer } from '../actions';
import { STATE_REDUCER_KEY } from '../constant';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';


const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;
const { AddIcon } = Icons;


function ListStates() {

    const dispatch = useDispatch();
    const { listStateDetails = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { data: { content = [] } = {}, totalCount: count, requestInProgress = false } = listStateDetails;
    const [customFilter, setCustomFilter] = React.useState({});
    const [page, setPage] = React.useState(DEFAULT_TABLE_PROPS.pageNo);
    const [size, setrowsPerPageState] = React.useState(DEFAULT_TABLE_PROPS.pageSize);

    useEffect(() => {
        // if (count > 0) {
        dispatch(fetchStateDetails({ size, page }));
        // }
    }, [page, size]);
    const changePage = (pagess) => {
        setPage(pagess);
    };
    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearStateReducer());
        history.push('/admin/index/state/create');
    };

    //triggerd when perPage is clicked
    const changeRowsPerPage = (rowsPerPage) => {
        setrowsPerPageState(rowsPerPage);
    };
    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/state/${id}`);
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
                dispatch(deleteStateData(id || 0, size, page));
            }
        });
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
                                    options={[]}
                                    value={customFilter.name}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                        let currentState = _.cloneDeep(customFilter);
                                        currentState.type = value;
                                        setCustomFilter(currentState);
                                    }}
                                    dropdownHeight={600}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'code',
            label: I18n.t('code'),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('code')]}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={[]}
                                    value={customFilter.type}
                                    multiple={true}
                                    onChange={value => {
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                        let currentState = _.cloneDeep(customFilter);
                                        currentState.type = value;
                                        setCustomFilter(currentState);
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

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.EDIT_QUESTION) || hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.DELETE_QUESTION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.ADD_QUESTION);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.EDIT_QUESTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.DELETE_QUESTION)) {
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
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    changePage(tableState.page);
                    break;
                case 'changeRowsPerPage':
                    changeRowsPerPage(tableState.rowsPerPage);
                    break;

                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('state')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
export default ListStates;

