import React, { useState, useEffect } from "react";
import { app } from "../Base";
import DispalyComent from "./dispalyComent";
import ReadMore from "read-more-react";

const post = app.firestore().collection("posts");
function Comment({ id }) {
  const [com, setCom] = useState("");
  const [getCom, setGetCom] = useState([]);

  const comenting = async () => {
    const comentUser = await app.auth().currentUser;

    if (comentUser) {
      await post.doc(id).collection("comment").doc().set({
        postedBy: comentUser.uid,
        commentedAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
        com,
      });
    }
  };

  const gettingComent = async () => {
    const comentUser = await app.auth().currentUser;

    if (comentUser) {
      await post
        .doc(id)
        .collection("comment")
        .orderBy("dateTime", "desc")
        .onSnapshot((snap) => {
          const item = [];
          snap.forEach((doc) => {
            item.push({ ...doc.data(), id: doc.id });
          });
          setGetCom(item);
        });
    }
  };

  useEffect(() => {
    gettingComent();
  }, []);

  return (
    <div>
      <input
        value={com}
        onChange={(e) => {
          setCom(e.target.value);
        }}
        placeholder="type..."
        style={{ height: "40px" }}
      />
      <button onClick={comenting} style={{ height: "40px", margin: "10px" }}>
        Comment
      </button>
      <br />
      <br />
      {getCom.map(({ id, com, postedBy }) => (
        <div key={id}>
          <DispalyComent postedBy={postedBy} />
          <div
            style={{
              background: "white",
              width: "80%",
              paddingLeft: "10px",
              borderRadius: "5px",
              marginLeft: "50px",
            }}
          >
            {" "}
            {com}
          </div>
          {/* <div>
            <ReadMore
              text={com}
              min={10}
              ideal={10}
              max={10}
              readMoreText={"see more"}
            />
          </div>{" "} */}
        </div>
      ))}
    </div>
  );
}
export default Comment;
