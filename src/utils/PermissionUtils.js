import _ from './LodashUtils';
import { getKeyByValue } from './ApiUtils';
import { store } from '../redux/store';
import { RESOURCE_MAPPING } from '../common/Permissions';
import { mapping } from './PermissionMap';

export const formatPermission = (roles = []) => {
    let roleDetails = {};
    _.forEach(roles, (role) => {
        _.forEach(role.resourcePermissions, (permission) => {
            let { resource = {}, actionIds } = permission;
            if (!_.has(roleDetails, getKeyByValue(RESOURCE_MAPPING, resource.name))) {
                _.set(roleDetails, getKeyByValue(RESOURCE_MAPPING, resource.name), { resourceActions: _.get(resource, 'resourceActions', []), actionIds: [actionIds] });
            } else {
                _.set(roleDetails, `${getKeyByValue(RESOURCE_MAPPING, resource.name)}.actionIds`, [..._.get(roleDetails, `${getKeyByValue(RESOURCE_MAPPING, resource.name)}.actionIds`), actionIds]);
            }
        });
    });
    return roleDetails;
};

const checkPermissions = (user, resourceName, resourceActionId) => {
    let userRoles = _.get(user, 'user.userRoles', []);
    let { actionIds = [], resourceActions = [] } = _.get(userRoles, getKeyByValue(RESOURCE_MAPPING, resourceName), {});
    // console.log({ actionIds, resourceActions })
    let currentAction = _.find(resourceActions, ['actionId', resourceActionId]) || null;
    if (actionIds.length < 1 || resourceActions.length < 1 || currentAction === null) {
        return false;
    } else {
        return actionIds.some((action) => (action & currentAction.bitwiseValue) > 0);
    }
};

export const hasAccessPermission = (resourceName, resourceActionId) => {
    let user = store.getState();
    return checkPermissions(user, resourceName, resourceActionId);
};


export const menuAccessPermissions = (user, resourceName, resourceActionId) => {
    return checkPermissions(user, resourceName, resourceActionId);
};


export const formatResourceActionsCheckBox = (actions) => {
    let childResponse = {}, parentResponse = {};
    let { parents, child } = actions;
    let { actionIds, resource } = child;
    let childResourceId = _.get(resource, 'id', 0);
    _.forEach(_.get(resource, 'resourceActions', []), (action) => {
        childResponse[action.bitwiseValue] = (action.bitwiseValue & actionIds) > 0;
    });
    _.forEach(parents || [], (parent) => {
        let tempResponse = {};
        let { actionIds: parentActionIds, resource: parentResource } = parent;
        _.forEach(_.get(parentResource, 'resourceActions', []), (action) => {
            tempResponse[action.bitwiseValue] = (action.bitwiseValue & parentActionIds) > 0;
        });
        parentResponse[parentResource.id] = tempResponse;
    });
    return {
        child: {
            [childResourceId]: childResponse
        }, parent: parentResponse
    };
};


export const checkChildPermissions = (user, resourceName, readOnlyActionId) => {
    let tempActionId = [];
    let tempValue = 0;
    let userRoles = _.get(user, 'user.userRoles', []);
    let { actionIds = [], resourceActions = [] } = _.get(userRoles, getKeyByValue(RESOURCE_MAPPING, resourceName), {});
    if (actionIds?.length > 1) {
        actionIds.map((item) => {
            tempValue += item;
        });
        tempActionId = [tempValue];
    }
    tempActionId = [...new Set(actionIds)];
    let readOnlyActioneyyy = resourceActions.find((item) => item.actionId === readOnlyActionId);
    return tempActionId?.some((action) => (action & readOnlyActioneyyy?.bitwiseValue) > 0);

};


export const readOnlyPermissionCheck = (readOnlyActionId, resourceName) => {
    let emptyObject = {};

    let user = store.getState();
    let readOnlyChilFlag = checkChildPermissions(user, resourceName, readOnlyActionId);

    if (!readOnlyChilFlag) {
        let parentArray = mapping[readOnlyActionId];
        for (let i = 0; i <= parentArray.length; i++) {
            const element = parentArray[i];
            if (element) {
                let parentFlag = checkChildPermissions(user, element.resourceName, element.actionId);
                if (parentFlag) {
                    emptyObject.resourceName = element.resourceName;
                    emptyObject.isReadOlyFlag = true;
                    break;
                } else {
                    parentArray.splice(0, 1);
                }

            }


        }

    } else {
        emptyObject.resourceName = resourceName;
        emptyObject.isReadOlyFlag = true;
    }
    if (Object.keys(emptyObject).length > 0) {
        return emptyObject.isReadOlyFlag;
    } else {
        return false;
    }
    // console.log({ parentArray })/

};
