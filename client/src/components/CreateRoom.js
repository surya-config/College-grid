import React from "react";
import { v1 as uuid } from "uuid";

import "../css/CreateRoom.css";
import Header from "./Header";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/${id}`);
  }

  return (
    <div>
      <Header />

      <div className="create-room">
        <h3>Host a Video Chat</h3>
        <button className="create-room-btn" onClick={create}>
          Create room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
