import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../../constants/routes";
import AccountPage from "../Account";
import DashboardPage from "../Dashboard";
import LandingPage from "../Landing";
import Navigation from "../Navigation";
import PasswordResetPage from "../PasswordReset";
import withAuthentication from "../Session/withAuthentication";
import SignInPage from "../SignIn";
import SignUpPage from "../SignUp";

const App: React.SFC = () => (
  <Router>
    <>
      <Navigation />

      <div className="container">
        <Route exact={true} path={routes.LANDING} component={LandingPage} />
        <Route exact={true} path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact={true} path={routes.SIGN_IN} component={SignInPage} />
        <Route
          exact={true}
          path={routes.PASSWORD_RESET}
          component={PasswordResetPage}
        />
        <Route exact={true} path={routes.DASHBOARD} component={DashboardPage} />
        <Route exact={true} path={routes.ACCOUNT} component={AccountPage} />
      </div>
    </>
  </Router>
);

export default withAuthentication(App);
