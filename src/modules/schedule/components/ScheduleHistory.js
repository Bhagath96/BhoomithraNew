import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import cronstrue from 'cronstrue';
import { getScheduleDetails, getHistory } from '../selectors';
import { loadScheduleHistory } from '../actions';
import { Components, I18n } from '../../../common/components';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import utils from '../../../utils';
const { dateUtils: { convertToLocal } } = utils;

const { MUIDataTable } = Components;

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'interval', columnName: 'serviceInterval', apiParam: 'serviceInterval', filterBy: 'id' },
    { columnLabel: 'cron_expression', columnName: 'cronExpression', apiParam: 'cronExpression', filterBy: 'name' },
    { columnLabel: 'execution_time', columnName: 'executionDate', apiParam: 'executionDate', filterBy: 'name' }
];

export const ScheduleHistory = (props) => {
    const { id: scheduleId } = useParams();
    const { history: { totalCount: count = DEFAULT_TABLE_PROPS.totalCount, requestInProgress: historyRequestInProgress = false, data: { content: historyList = [] } = {} } = {} } = props;
    const { loadHistory } = props;
    const [page, setPage] = React.useState(DEFAULT_TABLE_PROPS.pageNo);
    const [size, setPageSize] = React.useState(DEFAULT_TABLE_PROPS.pageSize);

    const changePageNo = (pageNo) => {
        setPage(pageNo);
    };

    const changePageSize = (pageSize) => {
        setPageSize(pageSize);
    };

    const columProps = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filter: false
            }
        },
        {
            name: passedColumns[2].columnName,
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filter: true,
                customBodyRender: (value) => {
                    let responseCron = '';
                    try {
                        responseCron = cronstrue.toString(value);
                    } catch (err) {
                        responseCron = 'unKnown Expression';
                    }
                    return responseCron;
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return convertToLocal(value);
                }
            }
        }
    ];

    const options = {
        ...MUI_COMMON_OPTIONS,
        page: page,
        rowsPerPage: size,
        count: count,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    changePageNo(tableState.page);
                    break;
                case 'changeRowsPerPage':
                    changePageSize(tableState.rowsPerPage);
                    break;
                default:
                    break;
            }
        }
    };
    useEffect(() => {
        loadHistory({ data: { page, size, count }, scheduleId });
    }, []);

    useEffect(() => {
        loadHistory({ data: { page, size, count }, scheduleId });
    }, [page, size]);

    return (
        <div>
            <MUIDataTable
                title={I18n.t('schedule_history')}
                data={historyList}
                columns={columProps}
                options={options}
                requestInProgress={historyRequestInProgress}
            />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    initialValues: getScheduleDetails,
    scheduleDetails: getScheduleDetails,
    history: getHistory
});

const mapDispatchToProps = dispatch => ({
    loadHistory: (scheduleId) => dispatch(loadScheduleHistory(scheduleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ScheduleHistory',
    enableReinitialize: true
})(ScheduleHistory));
