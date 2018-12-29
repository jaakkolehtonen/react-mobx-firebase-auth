import * as React from "react";

import { auth } from "../../firebase";

const SignOutLink: React.SFC<{}> = () => (
  <a href="#" className="nav-link" onClick={auth.doSignOut}>
    Sign out
  </a>
);

export default SignOutLink;
