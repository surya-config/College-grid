import React from "react";
import "./SNotesDescription.css";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

function NotesDescription() {
  return (
    <div className="notesDescription">
      <div className="notesDescription__container">
        <div className="notesDescription__banner">
          <div className="notesDescription__assignmentIcon">
            <AssignmentOutlinedIcon />
          </div>
          <div className="notesDescription__assignmentHeading">
            <h2>Assignment No 2</h2>
            <p>Nagaraj A • Jun 6</p>
            <h6>100 points</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesDescription;
