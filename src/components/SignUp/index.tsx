import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import * as routes from "../../constants/routes";
import { auth, db } from "../../firebase";
import { SignInLink } from "../SignIn";

interface IState {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: { message: string } | null;
}

const INIT_STATE: IState = {
  email: "",
  error: null,
  password: "",
  passwordConfirm: "",
  username: ""
};

const SignUpPageContent = styled.div`
  min-height: calc(100vh - 56px);
`;

const SignUpWithGoogle = styled.button`
  background-color: #ea4335;
  border-color: #ea4335;
  transition: filter 0.15s ease-in-out;

  &:hover {
    background-color: #ea4335;
    border-color: #ea4335;
    filter: brightness(90%);
  }
`;

const SignUpLink: React.SFC = () => (
  <p className="lead">
    Don't have an account? <Link to={routes.SIGN_UP}>Sign up</Link>
  </p>
);

class SignUpForm extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INIT_STATE };

    this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onPasswordConfirmInputChange = this.onPasswordConfirmInputChange.bind(
      this
    );
  }

  public onUsernameInputChange = event => {
    this.setState({ username: event.target.value });
  };

  public onEmailInputChange = event => {
    this.setState({ email: event.target.value });
  };

  public onPasswordInputChange = event => {
    this.setState({ password: event.target.value });
  };

  public onPasswordConfirmInputChange = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  public onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, email, password } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INIT_STATE }));
            history.push(routes.DASHBOARD);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  public onGoogleSignUp = () => {
    const { history } = this.props;

    auth.doSignInWithGoogle().then(authUser => {
      db.checkIfUserExist(authUser.user.uid).then(() => {
        db.doCreateUser(
          authUser.user.uid,
          authUser.user.displayName,
          authUser.user.email
        ).then(() => {
          this.setState(() => ({ ...INIT_STATE }));
          history.push(routes.DASHBOARD);
        });
      });
    });
  };

  public render() {
    const { username, email, password, passwordConfirm, error } = this.state;

    const isInvalid =
      password !== passwordConfirm ||
      password === "" ||
      username === "" ||
      email === "";

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              value={this.state.username}
              onChange={this.onUsernameInputChange}
              className="form-control form-control-lg"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.email}
              onChange={this.onEmailInputChange}
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.password}
              onChange={this.onPasswordInputChange}
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              value={this.state.passwordConfirm}
              onChange={this.onPasswordConfirmInputChange}
              className="form-control form-control-lg"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <button
            className="btn btn-primary btn-lg btn-block"
            disabled={isInvalid}
            type="submit"
          >
            Sign up
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <p className="mt-3">OR</p>
        <SignUpWithGoogle
          className="btn btn-primary btn-lg btn-block"
          onClick={this.onGoogleSignUp}
        >
          Sign up with Google
        </SignUpWithGoogle>
      </div>
    );
  }
}

const SignUpPage: React.SFC<{}> = ({ history }: any) => (
  <SignUpPageContent className="row align-items-center justify-content-center py-3">
    <main className="col-12 col-md-6 col-lg-4 text-center" role="main">
      <h1>Sign up</h1>
      <SignInLink />
      <SignUpForm history={history} />
    </main>
  </SignUpPageContent>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
