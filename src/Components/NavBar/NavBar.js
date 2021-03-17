import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import "./nav.css";

import { Link, useHistory } from "react-router-dom";

function NavBar() {
  const hist = useHistory();

  const [moveNav, setMoveNav] = useState(false);

  const onMoveNav = () => {
    if (window.scrollY >= 70) {
      setMoveNav(true);
    } else {
      setMoveNav(false);
    }
  };
  window.addEventListener("scroll", onMoveNav);

  return (
    <>
      <Header
        className={moveNav ? "your_nav" : "my_nav"}
        style={{
          height: "70px",
          top: 0,
          position: "sticky",
          // backgroundColor: "red",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            top: 0,
            position: "sticky",

            // backgroundColor: "white",

            cursor: "pointer",
          }}
        >
          <div
            className="image_move"
            style={{ height: "60px", width: "80px" }}
          ></div>

          <div
            className="navtext"
            style={{
              width: "50%",
              // background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
              fontFamily: "poppins",
              fontSize: "15px",
            }}
          >
            {/* <Link to="/" style={{ textDecoration: "none", color: "white" }}> */}
            <div
              onClick={() => {
                hist.push("/");
              }}
              className="navtext"
            >
              HOME
            </div>
            <Link
              to="/report"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="navtext">REPORT</div>
            </Link>
            <div className="navtext">CALL</div>
          </div>
          {/* <div className="sidebar">Menu</div> */}
          <Link to="/signup">
            <Button
              className="press"
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "20px",
                backgroundColor: "#DE6316",
                color: "white",
                border: "1px solid gray",
                fontFamily: "poppins",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Sign up
            </Button>
          </Link>
        </div>
      </Header>
    </>
  );
}

export default NavBar;
