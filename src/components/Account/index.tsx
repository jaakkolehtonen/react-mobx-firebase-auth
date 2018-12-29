import * as React from "react";

import { User } from "firebase";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import SessionStore from "../../stores/sessionStore";
import PasswordChangeForm from "../PasswordChange";
import { PasswordResetForm } from "../PasswordReset";
import withAuthorization from "../Session/withAuthorization";

interface IProps {
  sessionStore: SessionStore;
}

const AccountPage: React.SFC<IProps> = ({ sessionStore }: IProps) => (
  <div>
    <h1>Account: {sessionStore.authUser && sessionStore.authUser.email}</h1>
    <PasswordResetForm />
    <PasswordChangeForm />
  </div>
);

const authCondition = (authUser: User): boolean => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject("sessionStore"),
  observer
)(AccountPage);
