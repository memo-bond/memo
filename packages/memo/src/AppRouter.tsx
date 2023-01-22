import React, { lazy, Suspense, useEffect } from "react";
import {
  Switch,
  Route,
  RouteProps,
  Redirect,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga";

import Spin from "ui/Spin";

const AppRouter = () => {
  const { pathname, search } = useLocation();
  const pageView = pathname + search;
  useEffect(() => {
    ReactGA.pageview(pageView);
    // eslint-disable-next-line
  }, [pathname, search]);

  return (
    <Suspense fallback={<Spin loading />}>
      <Switch>
        <Route exact path="/" component={lazy(() => import("pages/Home"))} />
        <Route
          exact
          path="/code"
          component={lazy(() => import("pages/Coding"))}
        />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
