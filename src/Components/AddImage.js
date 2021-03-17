import React, { useContext, useState, useEffect } from "react";
import { app } from "../Base";
import { GlobalContext } from "../AuthState/GlobalContext";
import moment from "moment";

const db = app.firestore().collection("securityUser");
function AddImage({ createdBy, createdAt }) {
  const { current, currentData } = useContext(GlobalContext);
  const [name, setName] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      db.doc(createdBy)
        .get()
        .then((doc) => {
          setName(doc.data());
        });
    }
  };
  useEffect(() => {
    getName();
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
          height: "50px",
          width: "50px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          src={name && name.avatar}
        />
      </div>
      <div
        style={{
          marginRight: "px",
          fontSize: "13px",
          // color: "white",
        }}
      >
        {name && name.name}
        <div>{moment(createdAt).fromNow()}</div>
      </div>
    </div>
  );
}

export default AddImage;
