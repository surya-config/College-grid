import React from "react";
import "./SMainCard.css";

import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function MainCard({ course, semester, name }) {
  const history = useHistory();
  return (
    <div
      className="mainCard"
      onClick={() => history.push(`/student/dashboard/notes/${2}`)}
    >
      <Avatar className="mainCard__logo" />

      <div className="mainCard__banner">
        <h2>{course}</h2>
        <small>{semester} Sem</small>
        <p>{name}</p>
      </div>
      <div className="mainCard__body"></div>
      <div className="mainCard__footer"></div>
    </div>
  );
}

export default MainCard;
