import * as React from "react";

import { auth } from "../../firebase";

interface IState {
  password: string;
  passwordConfirm: string;
  error: { message: string } | null;
}

const INIT_STATE: IState = {
  error: null,
  password: "",
  passwordConfirm: ""
};

class PasswordChangeForm extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { ...INIT_STATE };

    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onPasswordConfirmInputChange = this.onPasswordConfirmInputChange.bind(
      this
    );
  }

  public onPasswordInputChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  public onPasswordConfirmInputChange = (event: any) => {
    this.setState({ passwordConfirm: event.target.value });
  };

  public onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { password } = this.state;

    auth
      .doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({ ...INIT_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  public render() {
    const { password, passwordConfirm, error } = this.state;

    const isInvalid = password !== passwordConfirm || password === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.password}
          onChange={this.onPasswordInputChange}
          type="password"
          placeholder="Password"
        />
        <input
          value={this.state.passwordConfirm}
          onChange={this.onPasswordConfirmInputChange}
          type="password"
          placeholder="Confirm password"
        />
        <button disabled={isInvalid} type="submit">
          Change password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
