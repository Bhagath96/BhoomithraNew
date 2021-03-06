import { action } from '../../common';
export const types = {
    FETCH_ITEM_SUBCATEGORY: 'BasicConfig/FETCH_ITEM_SUBCATEGORY',
    FETCH_ITEM_SUBCATEGORY_REQUEST: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_REQUEST',
    FETCH_ITEM_SUBCATEGORY_SUCCESS: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_SUCCESS',
    FETCH_ITEM_SUBCATEGORY_FAILURE: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_FAILURE',

    FETCH_ITEM_SUBCATEGORY_BY_ID: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_BY_ID',
    FETCH_ITEM_SUBCATEGORY_BY_ID_REQUEST: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_BY_ID_REQUEST',
    FETCH_ITEM_SUBCATEGORY_BY_ID_SUCCESS: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_BY_ID_SUCCESS',
    FETCH_ITEM_SUBCATEGORY_BY_ID_FAILURE: 'BasicConfig/FETCH_ITEM_SUBCATEGORY_BY_ID_FAILURE',

    SAVE_ITEM_SUBCATEGORY: 'BasicConfig/SAVE_ITEM_SUBCATEGORY',
    SAVE_ITEM_SUBCATEGORY_REQUEST: 'BasicConfig/SAVE_ITEM_SUBCATEGORY_REQUEST',
    SAVE_ITEM_SUBCATEGORY_SUCCESS: 'BasicConfig/SAVE_ITEM_SUBCATEGORY_SUCCESS',
    SAVE_ITEM_SUBCATEGORY_FAILURE: 'BasicConfig/SAVE_ITEM_SUBCATEGORY_FAILURE',

    UPDATE_ITEM_SUBCATEGORY: 'BasicConfig/UPDATE_ITEM_SUBCATEGORY',
    UPDATE_ITEM_SUBCATEGORY_REQUEST: 'BasicConfig/UPDATE_ITEM_SUBCATEGORY_REQUEST',
    UPDATE_ITEM_SUBCATEGORY_SUCCESS: 'BasicConfig/UPDATE_ITEM_SUBCATEGORY_SUCCESS',
    UPDATE_ITEM_SUBCATEGORY_FAILURE: 'BasicConfig/UPDATE_ITEM_SUBCATEGORY_FAILURE',

    DELETE_ITEM_SUBCATEGORY: 'BasicConfig/DELETE_ITEM_SUBCATEGORY',
    DELETE_ITEM_SUBCATEGORY_REQUEST: 'BasicConfig/DELETE_ITEM_SUBCATEGORY_REQUEST',
    DELETE_ITEM_SUBCATEGORY_SUCCESS: 'BasicConfig/DELETE_ITEM_SUBCATEGORY_SUCCESS',
    DELETE_ITEM_SUBCATEGORY_FAILURE: 'BasicConfig/DELETE_ITEM_SUBCATEGORY_FAILURE',

    CLEAR_ITEM_SUBCATEGORY_REDUCER: 'BasicConfig/CLEAR_ITEM_SUBCATEGORY_REDUCER'

};
export const fetchItemSubcategory = (data) => action(types.FETCH_ITEM_SUBCATEGORY, { data });
export const saveItemSubcategory = (data) => action(types.SAVE_ITEM_SUBCATEGORY, { data });
export const updatesItemSubcategory = (id, data) => action(types.UPDATE_ITEM_SUBCATEGORY, { id, data });
export const deleteItemSubcategory = (data, size, page) => action(types.DELETE_ITEM_SUBCATEGORY, { data, size, page });
export const fetchItemSubcategoryById = (data) => action(types.FETCH_ITEM_SUBCATEGORY_BY_ID, { data });
export const clearItemReducer = () => action(types.CLEAR_ITEM_SUBCATEGORY_REDUCER);
