import * as React from "react";
import { Link } from "react-router-dom";

import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import * as routes from "../../constants/routes";
import SessionStore from "../../stores/sessionStore";
import SignOutLink from "../SignOut";

interface IProps {
  sessionStore: SessionStore;
}

const NavigationAuth: React.SFC = () => (
  <div className="container">
    <Link className="navbar-brand" to={routes.DASHBOARD}>
      TSchievo
    </Link>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={routes.ACCOUNT}>
          Account
        </Link>
      </li>
      <li className="nav-item">
        <SignOutLink />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth: React.SFC = () => (
  <div className="container">
    <Link className="navbar-brand" to={routes.LANDING}>
      TSchievo
    </Link>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={routes.SIGN_IN}>
          Sign in
        </Link>
      </li>
    </ul>
  </div>
);

const Navigation: React.SFC<IProps> = ({ sessionStore }) => (
  <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
    {sessionStore.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </nav>
);

export default compose(
  inject("sessionStore"),
  observer
)(Navigation);
