import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Room() {
  return (
    <div className="room">
      <Link to={`/room/945b9760-4e9b-11eb-945a-634679264573`}>
      <h1>ACA</h1>
      </Link>
    </div>
  );
}

export default connect(mapStateToProps)(Room);


