import * as React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";
import { auth } from "../../firebase";

interface IState {
  email: string;
  error: { message: string } | null;
}

const INIT_STATE: IState = {
  email: "",
  error: null
};

const PasswordResetLink: React.SFC = () => (
  <p>
    Having trouble signing in?{" "}
    <Link to={routes.PASSWORD_RESET}>Reset password</Link>
  </p>
);

class PasswordResetForm extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { ...INIT_STATE };

    this.onEmailInputChange = this.onEmailInputChange.bind(this);
  }

  public onEmailInputChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  public onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INIT_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  public render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={this.onEmailInputChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordResetPage: React.SFC = () => (
  <div>
    <h1>Reset Password</h1>
    <p>
      Enter your email address that you used to register. We'll send you an
      email with a link to reset your password.
    </p>
    <PasswordResetForm />
  </div>
);

export default PasswordResetPage;

export { PasswordResetForm, PasswordResetLink };
