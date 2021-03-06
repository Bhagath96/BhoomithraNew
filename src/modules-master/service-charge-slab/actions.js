import { action } from '../../common';

export const types = {
    LIST_SERVICE_CHARGE_SLAB: 'ServiceCategory/LIST_SERVICE_CHARGE_SLAB',
    LIST_SERVICE_CHARGE_SLAB_REQUEST: 'ServiceCategory/LIST_SERVICE_CHARGE_SLAB_REQUEST',
    LIST_SERVICE_CHARGE_SLAB_SUCCESS: 'ServiceCategory/LIST_SERVICE_CHARGE_SLAB_SUCCESS',
    LIST_SERVICE_CHARGE_SLAB_FAILURE: 'ServiceCategory/LIST_SERVICE_CHARGE_SLAB_FAILURE',

    SENT_SERVICE_CHARGE_SLAB: 'ServiceCategory/SENT_SERVICE_CHARGE_SLAB',
    SENT_SERVICE_CHARGE_SLAB_REQUEST: 'ServiceCategory/SENT_SERVICE_CHARGE_SLAB_REQUEST',
    SENT_SERVICE_CHARGE_SLAB_SUCCESS: 'ServiceCategory/SENT_SERVICE_CHARGE_SLAB_SUCCESS',
    SENT_SERVICE_CHARGE_SLAB_FAILURE: 'ServiceCategory/SENT_SERVICE_CHARGE_SLAB_FAILURE',

    EDIT_SERVICE_CHARGE_SLAB: 'ServiceCategory/EDIT_SERVICE_CHARGE_SLAB',
    EDIT_SERVICE_CHARGE_SLAB_REQUEST: 'ServiceCategory/EDIT_SERVICE_CHARGE_SLAB_REQUEST',
    EDIT_SERVICE_CHARGE_SLAB_SUCCESS: 'ServiceCategory/EDIT_SERVICE_CHARGE_SLAB_SUCCESS',
    EDIT_SERVICE_CHARGE_SLAB_FAILURE: 'ServiceCategory/EDIT_SERVICE_CHARGE_SLAB_FAILURE',

    GET_SERVICE_CHARGE_SLAB_BY_ID: 'ServiceCategory/GET_SERVICE_CHARGE_SLAB_BY_ID',
    GET_SERVICE_CHARGE_SLAB_BY_ID_REQUEST: 'ServiceCategory/GET_SERVICE_CHARGE_SLAB_BY_ID_REQUEST',
    GET_SERVICE_CHARGE_SLAB_BY_ID_SUCCESS: 'ServiceCategory/GET_SERVICE_CHARGE_SLAB_BY_ID_SUCCESS',
    GET_SERVICE_CHARGE_SLAB_BY_ID_FAILURE: 'ServiceCategory/GET_SERVICE_CHARGE_SLAB_BY_ID_FAILRUE',
    DELETE_SERVICE_CHARGE_SLAB: 'ServiceCategory/DELETE_SERVICE_CHARGE_SLAB',
    DELETE_SERVICE_CHARGE_SLAB_REQUEST: 'ServiceCategory/DELETE_SERVICE_CHARGE_SLAB_REQUEST',
    DELETE_SERVICE_CHARGE_SLAB_SUCCESS: 'ServiceCategory/DELETE_SERVICE_CHARGE_SLAB_SUCCESS',
    DELETE_SERVICE_CHARGE_SLAB_FAILURE: 'ServiceCategory/DELETE_SERVICE_CHARGE_SLAB_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM'

};

export const listServiceChargeSlab = (data) => action(types.LIST_SERVICE_CHARGE_SLAB, { data });

export const sentServiceChargeSlab = (data) => action(types.SENT_SERVICE_CHARGE_SLAB, { data });
export const editServiceChargeSlab = (id, data) => action(types.EDIT_SERVICE_CHARGE_SLAB, { id, data });


export const getServiceChargeSlabById = (id) => action(types.GET_SERVICE_CHARGE_SLAB_BY_ID, { id });

export const deleteServiceChargeSlab = (data, page, size, count) => action(types.DELETE_SERVICE_CHARGE_SLAB, { data, page, size, count });

export const resetServiceChargeSlabForm = () => action(types.RESET_SERVICE_FORM);

