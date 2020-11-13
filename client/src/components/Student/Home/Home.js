import React from "react";
import { connect } from "react-redux";
import "./Home.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
    </div>
  );
}

export default connect(mapStateToProps)(Home);
