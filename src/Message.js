import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function Message() {
  const history = useHistory();
  return (
    <div>
      <div>
        <h1> THANK FOR YOUR SUPPORT</h1>
      </div>
      <div>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          GO BACK HOME
        </button>
      </div>
    </div>
  );
}

export default Message;
