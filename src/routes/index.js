import { PATH } from './url-path';
import { getMenuItems } from './menu-item';
import { getRoutePaths, getExceptionalPaths } from './route-path';

// import { getMenuItems as oldMenuItems, getRoutePaths as oldRoutePaths } from '../oldRoutes';

// let getMenuItems = () => [...oldMenuItems(), ...newMenuItems()];
// let getRoutePaths = () => [...oldRoutePaths(), ...newRoutePaths()];

export { PATH, getExceptionalPaths, getMenuItems, getRoutePaths };
