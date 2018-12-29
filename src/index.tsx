import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "mobx-react";

import App from "./components/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import store from "./stores";

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
