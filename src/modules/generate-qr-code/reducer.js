import { types as ActionTypes } from './actions';
import utils from '../../utils';
import { REQUEST_STATUS } from './constants';
const { apiUtils: { getPayloadData } } = utils;

const initialState = {

    fetchOrganizationList: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    generatedQRCodeData: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }

};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchOrganizationList: {
                    ...initialState.fetchOrganizationList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchOrganizationList: {
                    ...state.fetchOrganizationList,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                ...initialState.fetchOrganizationList,
                requestStatus: REQUEST_STATUS?.FAILED,
                error: {
                    ...action.payload.error
                },
                fetchOrganizationList: {
                    requestInProgress: false
                }
            });

        case ActionTypes.GENERATE_QR_CODE_DATA_REQUEST:
            return Object.assign({}, state, {
                generatedQRCodeData: {
                    ...initialState.generatedQRCodeData,
                    requestInProgress: true
                }
            });
        case ActionTypes.GENERATE_QR_CODE_DATA_SUCCESS:
            return Object.assign({}, state, {
                generatedQRCodeData: {
                    ...state.generatedQRCodeData,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GENERATE_QR_CODE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...initialState.generatedQRCodeData,
                requestStatus: REQUEST_STATUS?.FAILED,
                error: {
                    ...action.payload.error
                },
                generatedQRCodeData: {
                    requestInProgress: false
                }
            });
        case ActionTypes.CLEAR_GENERATED_QR_CODE_DATA:
            return Object.assign({}, state, {
                generatedQRCodeData: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        default:
            return state;
    }
};
export default reducer;
