import React from "react";
import "./SMainNotes.css";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { useHistory } from "react-router-dom";

function Main() {
  const history = useHistory();
  return (
    <div className="mainNotes">
      <div className="mainNotes__container">
        <div className="mainNotes__banner">
          <h2>Python - 17CS664 - 2020</h2>
          <small>6 Sem</small>
          <p>Nagraj A</p>
        </div>
      </div>
      <div className="mainNotes__body">
        <div
          className="mainNotes__assignment"
          onClick={() =>
            history.push(`/student/dashboard/notes/${2}/${3541554}`)
          }
        >
          <div className="mainNotes__assignmentIcon">
            <AssignmentOutlinedIcon />
          </div>
          <div className="mainNotes__assignmentHeading">
            <h6>Nagaraj A posted a new assignment: Assignment No 2</h6>
            <p>Jun 6</p>
          </div>
        </div>

        <div className="mainNotes__assignment">
          <div className="mainNotes__assignmentIcon">
            <AssignmentOutlinedIcon />
          </div>
          <div className="mainNotes__assignmentHeading">
            <h6>Nagaraj A posted a new assignment: Assignment No 1</h6>
            <p>Jun 10</p>
          </div>
        </div>

        <div className="mainNotes__assignment">
          <div className="mainNotes__assignmentIcon">
            <AssignmentOutlinedIcon />
          </div>
          <div className="mainNotes__assignmentHeading">
            <h6>Nagaraj A posted a new assignment: Assignment No 1</h6>
            <p>Jun 10</p>
          </div>
        </div>
      </div>
      <div className="mainNotes__footer"></div>
    </div>
  );
}

export default Main;
