
import utils from '../../../utils';

export const { UserUtils: { getDefaultOrganization, hasGtRole }, notifyUtils: { errorNotify: errorToast, infoNotify: infoToast, successNotify: successToast } } = utils;

export const getPayloadData = (payloadData) => payloadData.data;
