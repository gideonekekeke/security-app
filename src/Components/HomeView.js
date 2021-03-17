import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../AuthState/GlobalContext";
import pix from "../Components/img/se.jpeg";
import { app } from "../Base";
import AddImage from "./AddImage";
import TotalView from "./TotalView";
import Comment from "./Comment";
import ReadMore from "read-more-react";

const post = app.firestore().collection("posts");
const db = app.firestore().collection("securityUser");

function HomeView({ com, createdBy }) {
  const { currentData, current } = useContext(GlobalContext);
  const [total, setTotal] = useState([]);
  const [name, setName] = useState([]);

  const getTotal = async () => {
    const allGet = await app.auth().currentUser;

    if (allGet) {
      await post.orderBy("createdAt", "desc").onSnapshot((snap) => {
        const items = [];
        snap.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id });
        });
        setTotal(items);
      });
    }
  };

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
    getTotal();
    getName();
  }, []);

  return (
    <div style={{ height: "400px" }}>
      <img
        src={pix}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <div
          style={{
            height: "200px",
            width: "200px",
            background: "coral",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <div style={{ fontSize: "20px", color: "white" }}>ROBERY</div>
        </div>
        <div
          style={{
            height: "200px",
            width: "200px",
            background: "coral",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <div style={{ fontSize: "20px", color: "white" }}>Fire</div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>RECENT CASES</div>
        <br />
        <br />
        <div>
          <div>{currentData && currentData.name}</div>
          {total.map(({ id, createdBy, location }) => (
            <div
              style={{
                height: "100px",
                width: "80%",
                // backgroundColor: "lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "90%",
                  width: "90%",
                  backgroundColor: "lightgray",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <TotalView createdBy={createdBy} />
                <div>
                  <ReadMore
                    style={{ fontSize: "5px" }}
                    text={location}
                    min={10}
                    ideal={10}
                    max={10}
                    readMoreText={"..."}
                  />
                  <div>comments : {location.length}</div>
                </div>

                <button style={{ height: "50px", width: "100px" }}>VIEW</button>
              </div>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default HomeView;
