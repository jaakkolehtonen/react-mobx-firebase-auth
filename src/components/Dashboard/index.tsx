import * as React from "react";

import { inject, observer } from "mobx-react";

import { compose } from "recompose";
import { db } from "../../firebase";
import UserStore from "../../stores/userStore";
import withAuthorization from "../Session/withAuthorization";

interface IProps {
  userStore: UserStore;
}

interface IUsers {
  users: {};
}

const UserList: React.SFC<IUsers> = ({ users }) => (
  <div className="card">
    <h5 className="card-header">List of users</h5>
    <ul className="list-group list-group-flush">
      {Object.keys(users).map(key => (
        <li key={key} className="list-group-item">
          {users[key].username}
        </li>
      ))}
    </ul>
  </div>
);

class DashboardPage extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    const { userStore } = this.props;
    db.onceGetUsers().then(snapshot => userStore.setUsers(snapshot.val()));
  }

  public render() {
    const { users } = this.props.userStore;

    return (
      <div className="row py-3 py-lg-4">
        <div className="col-12 col-lg-9">
          <h1>Dashboard</h1>
          <p>The Dashboard Page is allowed for logged in users.</p>
        </div>
        <div className="col-12 col-lg-3">
          {!!users && <UserList users={users} />}
        </div>
      </div>
    );
  }
}

const authCondition = (authUser: firebase.User): boolean => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject("userStore"),
  observer
)(DashboardPage);
