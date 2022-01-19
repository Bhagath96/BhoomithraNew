import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
import { ORG_TYPES } from '../common/constants';

export function fetchOrganization() {

    let payload = {
        types: [ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST, ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE],
        params: { type: 'dropdown', ...ORG_TYPES }

    };
    return {
        url: URL.ORGANIZATION.LIST_ORGANISATION,
        api: restAPI.get,
        payload
    };
}
export function generateQRCode({ data, organizationId }) {
    let payload = {
        types: [ActionTypes.GENERATE_QR_CODE_DATA_REQUEST, ActionTypes.GENERATE_QR_CODE_DATA_SUCCESS, ActionTypes.GENERATE_QR_CODE_DATA_FAILURE],
        params: data
    };
    return {
        url: URL.QRCODE.GENERATE_QR_CODE.replace(':organizationId', organizationId),
        api: restAPI.get,
        payload
    };
}
