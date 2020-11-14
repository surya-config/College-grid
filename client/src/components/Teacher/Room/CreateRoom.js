import React from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

import "./CreateRoom.css";

const CreateRoom = () => {
  const history = useHistory();

  function create() {
    const id = uuid();
    history.push(`/teacher/dashboard/class/${id}`);
  }

  return (
    <div>
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
