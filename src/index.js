import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AdminLayout from './layouts/AdminLaout';
import history from './common/history';
import { store, persistor, rootSaga } from './redux';
import { Notify } from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './common/theme';
import { Router, Switch, Route } from 'react-router-dom';
import { Login } from './modules/user/containers';
import { StepForm } from './modules/forgot-password/components';
import '../src/assets/css/common.css';
import '../public/fonts/index.css';
import './i18n';
import Home from './website/Home';
import Terms from './website/termsAndCondition';
import privacy from './website/privacyAndPolicy';

import { getPortal } from './utils/ConfigUtils';
import { PROJECT_CONFIG_PROPS } from './common/constants';
import { PORTALS } from './configs/project';


const portal = getPortal(PROJECT_CONFIG_PROPS.PORTAL) || {};
const routes = [];
if (portal.key === PORTALS.ADMIN) {
  routes.push(
    <Route path="/" exact component={Login} />,
    <Route path="/forgot-password" exact component={StepForm} />,
    <Route path="/admin" component={AdminLayout} />
  );
} else {
  routes.push(<Route path="/" exact component={Home} />);
  routes.push(<Route path="/terms-condition" exact component={Terms} />);
  routes.push(<Route path="/privacy" exact component={privacy} />);
}


store.runSaga(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              {routes}
            </Switch>
          </Router>
        </ThemeProvider>
        <Notify />
      </PersistGate>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);
