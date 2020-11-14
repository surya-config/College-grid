import React from "react";
import MainCard from "./MainCard/MainCard";
import "./Notes.css";

function TNotes() {
  return (
    <div className="notes">
      <div className="notes__container">
        <div className="notes__list">
          <MainCard
            course="Python - 17CS664 - 2020"
            semester="6"
            name="Nagraj A"
          />
          <MainCard course="OR CLASS" semester="6" name="Harish K" />
          <MainCard course="Madhu - OS" semester="6" name="Madhu B.R" />
          <MainCard course="React " semester="6" name="Unknown" />
          <MainCard course="React " semester="6" name="Unknown" />
          <MainCard course="React " semester="6" name="Unknown" />
          <MainCard course="React " semester="6" name="Unknown" />
          <MainCard course="React " semester="6" name="Unknown" />
        </div>
      </div>
    </div>
  );
}

export default TNotes;
