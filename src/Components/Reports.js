import React, { useState, useEffect } from "react";

import { app } from "../Base";
import AddImage from "./AddImage";
import Comment from "./Comment";
import Like from "./Like";
const post = app.firestore().collection("posts");
function Reports() {
  const [crime, setCrime] = useState("");
  const [location, setLocation] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [getPost, setGetPost] = useState([]);

  const uploadFiles = async (e) => {
    const File = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(File.name);

    await fileRef.put(File);

    setFileUrl(await fileRef.getDownloadURL());
  };

  //to make a post now or to make a report

  const reportCase = async () => {
    const newReport = await app.auth().currentUser;

    if (newReport) {
      await post.doc().set({
        location,
        crime,
        createdBy: newReport.uid,
        fileUrl,
        createdAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
      });
    }
    setCrime("");
    setLocation("");
    setFileUrl("");
  };

  const getReports = async () => {
    const reporting = await app.auth().currentUser;

    if (reporting) {
      await post.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setGetPost(i);
      });
    }
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <div>
        <center>
          <br />
          <br />

          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <input type="file" onChange={uploadFiles} />
            <input
              type={crime}
              onChange={(e) => {
                setCrime(e.target.value);
              }}
              style={{ height: "30px", margin: "10px" }}
              type="text"
              placeholder="describe the location"
            />
            <input
              type={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              style={{ height: "100px", margin: "10px" }}
              type="text"
              placeholder="describe your case..."
            />
            <button
              onClick={() => {
                reportCase();
              }}
              style={{ height: "40px", width: "50%" }}
            >
              Report Now
            </button>
          </div>
        </center>
      </div>
      <br />
      <br />
      <br />
      {getPost.map(({ id, createdBy, crime, location, fileUrl, createdAt }) => (
        <div
          style={{
            width: "50%",
            backgroundColor: "silver",
            margin: "10px 30px",
            padding: "20px 10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              // backgroundColor: "red",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <AddImage createdBy={createdBy} createdAt={createdAt} />
            </div>
            <div
              style={{
                width: "80%",
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {" "}
              {location}
            </div>

            {fileUrl ? (
              <div
                style={{
                  height: "200px",
                  width: "80%",
                  backgroundColor: "blue",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={fileUrl}
                />
              </div>
            ) : null}
            <br />
            <br />

            <Comment id={id} />
            {/* <div>
              <input placeholder="type..." style={{ height: "40px" }} />
              <button style={{ height: "40px", margin: "10px" }}>
                Comment
              </button>
            </div> */}
            <br />

            {/* <div
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
                <img />
              </div>
              <div
                style={{
                  marginRight: "50px",
                  fontSize: "13px",
                  // color: "white",
                }}
              >
                Name
                <div style={{ width: "50%" }}>comments...</div>
              </div>
            </div> */}
            <Like id={id} />
          </div>
        </div>
      ))}
    </>
  );
}

export default Reports;
