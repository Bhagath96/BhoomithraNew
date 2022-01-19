import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { AddUserGroupView } from '../components';
import _ from '../../../utils/LodashUtils';
import { getAddUserGroup } from '../selectors';
import { I18n } from '../../../common/components';

export const AddUserGroup = (props) => {
    return (
        <AddUserGroupView {...props} />
    );
};

const validate = values => {
    const errors = {};
    if (!_.has(values, 'addUserGroup.name') || _.get(values, 'addUserGroup.name', '').length < 1) {
        _.set(errors, 'addUserGroup.name', I18n.t('required', { type: I18n.t('group_name') }));
    }
    if (!_.has(values, 'addUserGroup.key') || _.get(values, 'addUserGroup.key', '').length < 1) {
        _.set(errors, 'addUserGroup.key', I18n.t('required', { type: I18n.t('group_key') }));
    }
    return errors;
};

const mapStateToProps = createStructuredSelector({
    initialValues: getAddUserGroup
});

export default connect(mapStateToProps)(reduxForm({
    form: 'AddUserGroupForm',
    enableReinitialize: true,
    validate
})(AddUserGroup));
