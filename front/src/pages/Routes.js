import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardPage from "./DashboardPage";
import Home from "./index";
import  UserLoginPage  from "./UserLoginPage";
import  UserRegisterPage  from "./UserRegisterPage";
import  ResetPasswordPage  from "./ResetPasswordPage";
import  ForgotPasswordPage  from "./ForgotPasswordPage";

export default function Routes () {

  return (
    <Switch>
      <Route path="/index" component={Home} />
      <Route path="/DashboardPage" component={DashboardPage} />
      <Route path="/UserLoginPage" component={UserLoginPage} />
      <Route path="/UserRegisterPage" component={UserRegisterPage} />
      <Route path="/ResetPasswordPage" component={ResetPasswordPage} />
      <Route path="/ForgotPasswordPage" component={ForgotPasswordPage} />
    </Switch>
  )
};
