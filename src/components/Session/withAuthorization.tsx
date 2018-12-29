import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { User } from "firebase";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import * as routes from "../../constants/routes";
import { firebase } from "../../firebase";
import SessionStore from "../../stores/sessionStore";

type ICond = (authUser: User | null) => boolean;

interface IProps {
  sessionStore: SessionStore;
}

const withAuthorization = (condition: ICond) => (Component: any) => {
  class WithAuthorization extends React.Component<
    RouteComponentProps<any> & IProps,
    {}
  > {
    constructor(props: RouteComponentProps<any> & IProps) {
      super(props);
    }

    public componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    public render() {
      return this.props.sessionStore.authUser ? <Component /> : null;
    }
  }

  return compose(
    withRouter,
    inject("sessionStore"),
    observer
  )(WithAuthorization);
};

export default withAuthorization;
