import React from "react";
import { connect } from "react-redux";
import "./Assessment.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Assessment() {
  return (
    <div className="assessment">
      <h1>Assessment</h1>
    </div>
  );
}

export default connect(mapStateToProps)(Assessment);
