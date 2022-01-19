import { PROJECT } from './project';

import * as Bhoomitra from './project/Bhoomitra';
import * as Harithamithram from './project/Harithamithram';
import * as NagpurSmartCity from './project/NagpurSmartCity';
import * as KELGMS from './project/KELGMS';

export default {
    [PROJECT.BHOOMITRA]: Bhoomitra,
    [PROJECT.HARITHAMITHRAM]: Harithamithram,
    [PROJECT.NAGPUR_SMART_CITY]: NagpurSmartCity,
    [PROJECT.KELGMS]: KELGMS
};
