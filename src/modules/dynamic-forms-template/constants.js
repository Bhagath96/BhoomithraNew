export const STATE_REDUCER_KEY = 'question-templates';
import { I18n } from '../../common/components';

export const REQUEST_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};
export const TABLE_IDS = {
    LIST_TEMPLATE: 'LIST_TEMPLATE',
    LIST_TEMPLATE_FRAGMENT: 'LIST_TEMPLATE_FRAGMENT',
    LIST_TEMPLATE_ROUTE: 'LIST_TEMPLATE_ROUTE'

};

export const EMPTY_NEXT_PREVIOUS = { id: 0, name: I18n.t('drop_down_select'), gid: 0 };

export const DEFAULT_NEXT_PREVIOUS = [EMPTY_NEXT_PREVIOUS, { id: -1, name: 'Dynamic Fragment', gid: -1 }];

export const getEmptyNextPrevious = () => ({ id: 0, name: I18n.t('drop_down_select'), gid: 0 });

export const getDefaultNextPrevious = () => ([getEmptyNextPrevious(), { id: -1, name: 'Dynamic Fragment', gid: -1 }]);
