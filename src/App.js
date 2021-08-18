import { Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

import PrivateRoute from "./screen/api/PrivateRoutes";
import {AuthRoute, Routes} from './routes';

import Loader from './Loader';


const menu = Routes.map((route, index) => {
  return (route.component) ? (
      <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => (
              <route.component {...props} />
          )} />
  ) : (null);
});

const AuthMenu = AuthRoute.map((prop, key)=>{
  return (
    <Route
    path={prop.path}
    key={key}
    exact={prop.exact}
    name={prop.name}
    component={prop.component}
    />
  )
});


const histo = createBrowserHistory();



function App() {
  return (
    <Suspense fallback={<Loader />} >
      <Router history={histo}>
        <Switch>
          {menu}
          {AuthMenu}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
