import React, { useState, useEffect } from "react";
import { app } from "../Base";

const db = app.firestore().collection("securityUser");

function DispalyComent({ postedBy, com }) {
  const [getUserData, setGetUserData] = useState([]);

  const getData = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await db
        .doc(postedBy)
        .get()
        .then((doc) => {
          setGetUserData(doc.data());
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{
        width: "50%",
        height: "50px",
        display: "flex",
        justifyContent: "space-around",
        marginRight: "140px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "40px",
          width: "50px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "30px",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          src={getUserData && getUserData.avatar}
        />
      </div>
      <div
        style={{
          marginRight: "50px",
          fontSize: "13px",
          // color: "white",
          // marginLeft: "10PX",
        }}
      >
        {getUserData && getUserData.name}
        <div style={{ width: "50%" }}>{getUserData && getUserData.comment}</div>
      </div>
    </div>
  );
}

export default DispalyComent;
