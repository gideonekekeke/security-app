import React, { useState, useEffect } from "react";
import { app } from "../Base";

const db = app.firestore().collection("securityUser");
function ShowLike() {
  const [getLikes, setGetLikes] = useState([]);

  const getTheLikes = async () => {
    const gotTheLikes = await app.auth().currentUser;

    if (gotTheLikes) {
      db.doc()
        .get()
        .then((doc) => {
          setGetLikes(doc.data());
        });
    }
  };

  useEffect(() => {
    getTheLikes();
  }, []);

  return <div>{getLikes && getLikes.like}</div>;
}

export default ShowLike;
