import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  if (authType == "login") {
    return (
      <>
        <LoginForm setAuthType={setAuthType} />
      </>
    );
  } else {
    return (
      <>
        <RegisterForm setAuthType={setAuthType} />
      </>
    );
  }
};

export default Auth;
