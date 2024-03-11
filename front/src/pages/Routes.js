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
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/login" component={UserLoginPage} />
      <Route path="/register" component={UserRegisterPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
    </Switch>
  )
};
