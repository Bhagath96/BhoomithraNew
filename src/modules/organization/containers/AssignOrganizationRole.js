// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';
// import * as Actions from '../actions';
// import { createStructuredSelector } from 'reselect';
// import { getOrganization } from '../selectors';
// import { AssignOrganizationRoleView } from '../components/AssignOrganizationRoleView.js';

// export const AssignOrganizationRole = (props) => {

//     const { loadOrganizationRoleTypes } = props;
//     useEffect(() => {
//         loadOrganizationRoleTypes();
//         // loadUserGroupAssignUsersList();
//     }, []);
//     return (

//         <AssignOrganizationRoleView {...props} />
//     );
// };

// const mapStateToProps = createStructuredSelector({
//     initialValues: getOrganization,
//     organization: getOrganization
// });
// const mapDispatchToProps = dispatch => ({
//     //  onClick: (values) => dispatch(Actions.loadUserGroupAssignUsersList( {}))),
//     loadOrganizationRoleTypes: () => dispatch(Actions.loadOrganizationRoleTypes()),
//     // loadUserGroupAssignUsersList: () => dispatch(Actions.loadUserGroupAssignUsersList())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
//     // form: 'AssignOrganizationRole',
//     // enableReinitialize: true
// })(AssignOrganizationRole));
