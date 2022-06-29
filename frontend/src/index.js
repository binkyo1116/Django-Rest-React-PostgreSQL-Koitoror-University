import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AuthReduxProvider } from './redux/store';
import { AuthContextProvider } from './context/AuthContext'

const app = (

  <AuthReduxProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </AuthReduxProvider>

);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
