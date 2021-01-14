import React from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";

import "./CreateRoom.css";

const CreateRoom = () => {
  const history = useHistory();

  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  return (
    <div>
    <img src="https://image.freepik.com/free-vector/online-courses-illustration-concept_23-2148525395.jpg" alt="" />
      <div className="create-room">
        
        <button className="create-room-btn" onClick={create}>
          Create room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
