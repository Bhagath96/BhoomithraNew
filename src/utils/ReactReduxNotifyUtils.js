import React from 'react';
import { put, call } from 'redux-saga/effects';
import { createNotification, removeNotification, NOTIFICATION_TYPE_INFO, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING } from 'react-redux-notify';

const notificationIds = [1, 2, 3, 4];

const clearNotification = function* (id) {
    yield put(removeNotification(id));
};

const clearNotifications = function* () {
    for (let id of notificationIds) {
        yield call(clearNotification, id);
    }
};

const infoNotify = function* (message, duration = 1000) {
    let notify = {
        message,
        type: NOTIFICATION_TYPE_INFO,
        duration,
        canDismiss: true,
        icon: <i className="fa fa-info" />
    };
    yield put(createNotification(notify));
};

const successNotify = function* (message, duration = 1000) {
    let notify = {
        message,
        type: NOTIFICATION_TYPE_SUCCESS,
        duration,
        canDismiss: true,
        icon: <i className="fa fa-check" />
    };
    yield put(createNotification(notify));
};

const warningNotify = function* (message, duration = 1000) {
    let notify = {
        message,
        type: NOTIFICATION_TYPE_WARNING,
        duration,
        canDismiss: true,
        icon: <i className="fa fa-warning" />
    };
    yield put(createNotification(notify));
};

const errorNotify = function* (message, duration = 1000) {
    let notify = {
        message,
        type: NOTIFICATION_TYPE_ERROR,
        duration,
        canDismiss: true,
        icon: <i className="fa fa-fire" />
    };
    yield put(createNotification(notify));
};

export { infoNotify, successNotify, warningNotify, errorNotify, clearNotifications };
