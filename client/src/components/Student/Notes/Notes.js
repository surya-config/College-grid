import React from "react";
import { connect } from "react-redux";
import "./Notes.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Notes() {
  return (
    <div className="notes">
      <h1>Notes</h1>
    </div>
  );
}

export default connect(mapStateToProps)(Notes);
