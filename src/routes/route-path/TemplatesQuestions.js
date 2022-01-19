import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { GenerateQuestions, ListQuestions, CommonQuestionPage } from '../../modules/dynamic-forms/components';
import { CommonEditTitleView, ListTitleView, TitleAddView } from '../../modules/dynamic-forms-title/components';
import { ListFragment, AddFragmentView, CommonFragmentEditView } from '../../modules/dynamic-form-fragment/components';
import { AddTemplate, CommonTemplate, ListTemplates, FragmentDetailTabView, RouteDetailTabView } from '../../modules/dynamic-forms-template/components';
export const getTemplatesQuestions = (userDetails) => {
    let routes = [];
    //questions
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.LIST)) {
        routes.push({ path: PATH.DYNAMIC_QUESTION, component: ListQuestions });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.ADD)) {
        routes.push({ path: `${PATH.DYNAMIC_QUESTION}/create`, component: GenerateQuestions });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION_DETAILS, ACTION_MAPPING.QUESTION_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_QUESTION}/:id/details`, component: CommonQuestionPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION_CURRENT_ASSOCIATION, ACTION_MAPPING.QUESTION_CURRENT_ASSOCIATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_QUESTION}/:id/currentAssociation`, component: CommonQuestionPage });
    }

    //titles
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.LIST)) {
        routes.push({ path: PATH.DYNAMIC_TITLE, component: ListTitleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.ADD)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/create`, component: TitleAddView });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE_DETAILS, ACTION_MAPPING.TITLE_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/:id/details`, component: CommonEditTitleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE_QUESTION, ACTION_MAPPING.TITLE_QUESTION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/:id/questions`, component: CommonEditTitleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE_QUESTION_VALIDATION, ACTION_MAPPING.TITLE_QUESTION_VALIDATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/:id/questionsValidation`, component: CommonEditTitleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION, ACTION_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/:id/questionOptionAssociation`, component: CommonEditTitleView });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE_CURRENT_ASSOCIATION, ACTION_MAPPING.TITLE_CURRENT_ASSOCIATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TITLE}/:id/currentAssociation`, component: CommonEditTitleView });
    }
    //fragments
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.LIST)) {
        routes.push({ path: PATH.DYNAMIC_FRAGMENT, component: ListFragment });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.ADD)) {
        routes.push({ path: `${PATH.DYNAMIC_FRAGMENT}/create`, component: AddFragmentView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT_DETAILS, ACTION_MAPPING.FRAGMENT_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_FRAGMENT}/:id/details`, component: CommonFragmentEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT_ASSIGN_TITLE, ACTION_MAPPING.FRAGMENT_ASSIGN_TITLE.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_FRAGMENT}/:id/assignTitle`, component: CommonFragmentEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP, ACTION_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_FRAGMENT}/:id/fragmentQuestionLoop`, component: CommonFragmentEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT_CURRENT_ASSOCIATION, ACTION_MAPPING.FRAGMENT_CURRENT_ASSOCIATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_FRAGMENT}/:id/currentAssociation`, component: CommonFragmentEditView });
    }
    //templates
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.LIST)) {
        routes.push({ path: PATH.DYNAMIC_TEMPLATE, component: ListTemplates });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.ADD)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/create`, component: AddTemplate });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.EDIT_IN_ACTION)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id`, component: CommonTemplate });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_DETAILS, ACTION_MAPPING.TEMPLATE_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/basic`, component: CommonTemplate });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.LIST)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/fragment`, component: CommonTemplate });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.ADD)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/fragment/create`, component: FragmentDetailTabView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_FRAGMENT_DETAILS, ACTION_MAPPING.TEMPLATE_FRAGMENT_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/fragment/:fragmentId`, component: FragmentDetailTabView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_ROUTE, ACTION_MAPPING.TEMPLATE_ROUTE.LIST)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/routes`, component: CommonTemplate });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_ROUTE, ACTION_MAPPING.TEMPLATE_ROUTE.LIST)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/routes/create`, component: RouteDetailTabView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_ROUTE_DETAILS, ACTION_MAPPING.TEMPLATE_ROUTE_DETAILS.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/routes/:fragmentId`, component: RouteDetailTabView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE_CURRENT_ASSOCIATION, ACTION_MAPPING.TEMPLATE_CURRENT_ASSOCIATION.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.DYNAMIC_TEMPLATE}/:id/currentAssociation`, component: CommonTemplate });
    }

    return routes;
};
