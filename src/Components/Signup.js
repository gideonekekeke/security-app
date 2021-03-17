import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../Base";

const db = app.firestore().collection("securityUser");
const SignUp = () => {
  const hist = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [picture, setPicture] = useState(null);

  const imageUpload = async (e) => {
    const File = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(File.name);

    await fileRef.put(File);
    setPicture(await fileRef.getDownloadURL());
  };

  const signUpUser = async () => {
    const newSignUp = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (newSignUp) {
      await db.doc(newSignUp.user.uid).set({
        name,
        email,
        password,
        profile,
        avatar: await picture,
      });
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <center>
        <h2
          style={{
            cursor: "pointer",
          }}
        >
          <Link
            to="/"
            style={{
              color: "black",
            }}
          >
            {" "}
            Go Back Home
          </Link>
        </h2>
      </center>
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
            onChange={imageUpload}
            style={{
              width: "100%",
              marginBottom: "10px",
              height: "30px",
            }}
            type="file"
          />
          <Input
            type="text"
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Input
            style={{
              width: "100%",
              marginBottom: "20px",
              height: "30px",
            }}
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
            }}
            type="text"
            placeholder="profile"
          />

          <Button
            onClick={signUpUser}
            style={{
              width: "100%",
              marginBottom: "10px",
              height: "30px",
            }}
          >
            Sign Up
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>Already have an Account, </div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <div
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                Sign In Here
              </div>
            </Link>
          </div>
        </div>
      </center>
    </div>
  );
};

export default SignUp;
