import React from "react";
import { connect } from "react-redux";
import "./Room.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Room() {
  return (
    <div className="room">
      <h1>Room</h1>
    </div>
  );
}

export default connect(mapStateToProps)(Room);
