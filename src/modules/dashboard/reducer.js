import _ from 'lodash';
import { types as ActionTypes } from './actions';
import { CHART_IDS, GROUP_BY, GROUP_BY_INTERVAL, ISO_DATE, ORDER_BY, SORT_AND_LIMIT } from './constants';
import utils from '../../utils';
import moment from 'moment';

const { apiUtils: { getPayloadData } } = utils;


const initialState = {
    config: {},
    filters: {
        common: {
            startDate: new Date(moment().subtract(1, 'months').startOf('month').format(ISO_DATE)),
            endDate: new Date(moment().endOf('month').format(ISO_DATE))
        },
        [CHART_IDS.CHART_1]: {
            groupBy: {
                id: GROUP_BY_INTERVAL.DAILY,
                name: GROUP_BY[GROUP_BY_INTERVAL.DAILY]
            },
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        },
        [CHART_IDS.CHART_2]: {
            groupBy: {
                id: GROUP_BY_INTERVAL.DAILY,
                name: GROUP_BY[GROUP_BY_INTERVAL.DAILY]
            },
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        },
        [CHART_IDS.CHART_3]: {
            groupBy: {
                id: GROUP_BY_INTERVAL.MONTHLY,
                name: GROUP_BY[GROUP_BY_INTERVAL.MONTHLY]
            },
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        },
        [CHART_IDS.CHART_5]: {
            groupBy: {
                id: GROUP_BY_INTERVAL.DAILY,
                name: GROUP_BY[GROUP_BY_INTERVAL.DAILY]
            },
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        },
        [CHART_IDS.CHART_6]: {
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        },
        [CHART_IDS.CHART_7]: {
            sortWithLimit: {
                id: SORT_AND_LIMIT.RECENT_10,
                name: ORDER_BY[SORT_AND_LIMIT.RECENT_10]
            }
        }
    },
    chartData: {
        [CHART_IDS.CHART_1]: {
            labels: [],
            datasets: [
            ]
        },
        [CHART_IDS.CHART_2]: {
            labels: [],
            datasets: [
            ]
        },
        [CHART_IDS.CHART_3]: {
            labels: [],
            datasets: []
        },
        [CHART_IDS.CHART_4]: {
            datasets: []
        },
        [CHART_IDS.CHART_5]: {
            labels: [],
            datasets: []
        },
        [CHART_IDS.CHART_6]: {
            labels: [],
            datasets: []
        },
        [CHART_IDS.CHART_7]: {
            labels: [],
            datasets: []
        }
    },
    customerCount: {
        data: {}
    },
    serviceCount: {
        data: {}
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_CHART_CONFIGURATION: {
            let { chart, ...configData } = action.payload.data;
            return Object.assign({}, state, {
                config: {
                    ...state.config,
                    [chart]: {
                        ..._.get(state, `config.${chart}`, {}),
                        ...configData
                    }
                }
            });
        }

        case ActionTypes.SET_CHART_DATA: {
            let { chart, data } = action.payload.data;
            return Object.assign({}, state, {
                chartData: {
                    ...state.chartData,
                    [chart]: data
                }
            });
        }

        case ActionTypes.CHANGE_FILTER: {
            let { chart, filter } = action.payload.data;
            return Object.assign({}, state, {
                filters: {
                    ...state.filters,
                    [chart]: {
                        ..._.get(state, `filters.${chart}`, {}),
                        ...filter
                    }
                }
            });
        }

        case ActionTypes.CUSTOMER_CARD_COUNT_REQUEST:
            return Object.assign({}, state, {
                customerCount: {
                    ...state.customerCount,
                    data: {}
                }
            });
        case ActionTypes.CUSTOMER_CARD_COUNT_SUCCESS:
            return Object.assign({}, state, {
                customerCount: {
                    ...state.customerCount,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.CUSTOMER_CARD_COUNT_FAILURE:
            return Object.assign({}, state, {
                customerCount: {
                    ...state.customerCount,
                    data: {}
                }
            });

        case ActionTypes.SERVICE_CARD_COUNT_REQUEST:
            return Object.assign({}, state, {
                serviceCount: {
                    ...state.serviceCount,
                    data: {}
                }
            });
        case ActionTypes.SERVICE_CARD_COUNT_SUCCESS:
            return Object.assign({}, state, {
                serviceCount: {
                    ...state.serviceCount,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.SERVICE_CARD_COUNT_FAILURE:
            return Object.assign({}, state, {
                serviceCount: {
                    ...state.serviceCount,
                    data: {}
                }
            });
        case ActionTypes.RESET_DASHBOARD:
            return Object.assign({}, state, initialState);

        default:
            return state;
    }
};

export default reducer;
