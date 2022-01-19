
import { RESOURCE_MAPPING, ACTION_MAPPING } from '../common/Permissions';


export const mapping = {
    //service provider tab parents
    ORGANIZATION_SERVICE_PROVIDER_DETAILS_READ_ONLY: [
        {
            actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
            resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

        },
        {
            actionId: 'ORGANIZATION_READ_ONLY',
            resourceName: 'in.trois.common.model.entity.Organization'
        }
    ],
    ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION_READ_ONLY: [
        {
            actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
            resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

        },
        {
            actionId: 'ORGANIZATION_READ_ONLY',
            resourceName: 'in.trois.common.model.entity.Organization'
        }
    ],
    ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    ORGANIZATION_SERVICE_PROVIDER_SERVICE_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    SERVICE_PROVIDER_READ_ONLY_COMMON_ARRAY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],
    ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER_READ_ONLY: [{
        actionId: 'ORGANIZATION_SERVICE_PROVIDER_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization.ServiceProvider'

    },
    {
        actionId: 'ORGANIZATION_READ_ONLY',
        resourceName: 'in.trois.common.model.entity.Organization'
    }],

    //organization tab parents
    ORGANIZATION_DETAILS_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_ASSIGN_USER_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_ASSIGN_ROLE_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_ASSIGN_MODULE_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_SERVICE_PROVIDER_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_API_PROVIDER_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_ASSIGN_TEMPLATE_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }],
    ORGANIZATION_COMPLAINT_ESCALATION_MATRIX_READ_ONLY: [{
        actionId: ACTION_MAPPING.ORGANIZATION.READ_ONLY,
        resourceName: RESOURCE_MAPPING.ORGANIZATION
    }]


};


