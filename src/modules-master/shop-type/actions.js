import { action } from '../../common';

export const types = {
    LIST_SHOP_TYPE: 'ServiceCategory/LIST_SHOP_TYPE',
    LIST_SHOP_TYPE_REQUEST: 'ServiceCategory/LIST_SHOP_TYPE_REQUEST',
    LIST_SHOP_TYPE_SUCCESS: 'ServiceCategory/LIST_SHOP_TYPE_SUCCESS',
    LIST_SHOP_TYPE_FAILURE: 'ServiceCategory/LIST_SHOP_TYPE_FAILURE',

    SENT_SHOP_TYPE: 'ServiceCategory/SENT_SHOP_TYPE',
    SENT_SHOP_TYPE_REQUEST: 'ServiceCategory/SENT_SHOP_TYPE_REQUEST',
    SENT_SHOP_TYPE_SUCCESS: 'ServiceCategory/SENT_SHOP_TYPE_SUCCESS',
    SENT_SHOP_TYPE_FAILURE: 'ServiceCategory/SENT_SHOP_TYPE_FAILURE',

    EDIT_SHOP_TYPE: 'ServiceCategory/EDIT_SHOP_TYPE',
    EDIT_SHOP_TYPE_REQUEST: 'ServiceCategory/EDIT_SHOP_TYPE_REQUEST',
    EDIT_SHOP_TYPE_SUCCESS: 'ServiceCategory/EDIT_SHOP_TYPE_SUCCESS',
    EDIT_SHOP_TYPE_FAILURE: 'ServiceCategory/EDIT_SHOP_TYPE_FAILURE',

    GET_SHOP_TYPE_BY_ID: 'ServiceCategory/GET_SHOP_TYPE_BY_ID',
    GET_SHOP_TYPE_BY_ID_REQUEST: 'ServiceCategory/GET_SHOP_TYPE_BY_ID_REQUEST',
    GET_SHOP_TYPE_BY_ID_SUCCESS: 'ServiceCategory/GET_SHOP_TYPE_BY_ID_SUCCESS',
    GET_SHOP_TYPE_BY_ID_FAILURE: 'ServiceCategory/GET_SHOP_TYPE_BY_ID_FAILRUE',
    DELETE_SHOP_TYPE: 'ServiceCategory/DELETE_SHOP_TYPE',
    DELETE_SHOP_TYPE_REQUEST: 'ServiceCategory/DELETE_SHOP_TYPE_REQUEST',
    DELETE_SHOP_TYPE_SUCCESS: 'ServiceCategory/DELETE_SHOP_TYPE_SUCCESS',
    DELETE_SHOP_TYPE_FAILURE: 'ServiceCategory/DELETE_SHOP_TYPE_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM'

};

export const listShopType = (data) => action(types.LIST_SHOP_TYPE, { data });

export const sentShopType = (data) => action(types.SENT_SHOP_TYPE, { data });
export const editShopType = (id, data) => action(types.EDIT_SHOP_TYPE, { id, data });


export const getShopTypeById = (id) => action(types.GET_SHOP_TYPE_BY_ID, { id });

export const deleteShopType = (data, page, size, count) => action(types.DELETE_SHOP_TYPE, { data, page, size, count });

export const resetShopTypeForm = () => action(types.RESET_SERVICE_FORM);

