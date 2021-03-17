import React, { useState } from "react";
import { app } from "../Base";
import ShowLike from "./ShowLike";

const db = app.firestore().collection("securityUser");
const post = app.firestore().collection("posts");

function Like({ id }) {
  const [like, setLike] = useState(0);
  const [likeToogle, setLikeToogle] = useState(true);

  const handleLike = () => {
    setLikeToogle(!likeToogle);
  };

  const handleLikeing = async () => {
    const likeUser = await app.auth().currentUser;

    if (likeUser) {
      await post.doc(id).collection("Like").doc().set({
        like,
        newCreate: likeUser.uid,
      });
      setLikeToogle(like + 1);
    }
  };

  return (
    <div>
      <button onClick={handleLikeing}>LIKE</button>
      <div>{like}</div>
      <br />
      <ShowLike />
    </div>
  );
}

export default Like;
