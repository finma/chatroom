import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { auth } from "../config/firebase";
import firebase from "firebase";
import "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>ChatRoom</h2>

        <div
          class="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.EmailAuthProvider())
          }
        >
          Sign In With Email
        </div>
        <br />
        <br />
        <div
          class="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In With Google
        </div>
      </div>
    </div>
  );
};

export default Login;
