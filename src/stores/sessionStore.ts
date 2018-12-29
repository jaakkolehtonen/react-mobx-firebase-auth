import { User } from "firebase";
import { action, observable } from "mobx";

import { RootStore } from "./index";

class SessionStore {
  public rootStore: RootStore;

  @observable public authUser: User | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public setAuthUser = (authUser: User): void => {
    this.authUser = authUser;
  };
}

export default SessionStore;
