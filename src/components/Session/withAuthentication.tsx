import * as React from "react";

import { inject } from "mobx-react";

import { firebase } from "../../firebase";
import SessionStore from "../../stores/sessionStore";

interface IProps {
  sessionStore: SessionStore;
}

const withAuthentication = (Component: any): React.ComponentClass => {
  class WithAuthentication extends React.Component<IProps, {}> {
    constructor(props: IProps) {
      super(props);
    }

    public componentDidMount() {
      const { sessionStore } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? sessionStore.setAuthUser(authUser)
          : sessionStore.setAuthUser(null);
      });
    }

    public render() {
      return <Component />;
    }
  }

  return inject("sessionStore")(WithAuthentication);
};

export default withAuthentication;
