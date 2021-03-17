import React, { useState } from "react";
import { Button, Input } from "antd";
import { app } from "../Base";

const db = app.firestore().collection("securityUser");
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <div>
      <br />
      <br />
      <br />

      <center>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "300px",
          }}
        >
          <Input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
          />

          <Button
            onClick={loginUser}
            style={{
              width: "100%",
              marginBottom: "10px",
              height: "30px",
            }}
          >
            Log In
          </Button>
        </div>
      </center>
    </div>
  );
}

export default Login;
