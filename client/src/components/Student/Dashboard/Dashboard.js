import React from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Notes from "../Notes/Notes";
import Room from "../Room/Room";
import Home from "../Home/Home";
import Assessment from "../Assessment/Assessment";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Dashboard({ auth }) {
  return (
    <div>
      {auth.user.usn ? (
        <Router>
          <div className="dashboard">
            <div className="dashboardLeftContainer">
              <Navbar />
            </div>
            <div className="dashboardRightContainer">
              <Switch>
                <Route exact path="/student/dashboard/" component={Home} />
                <Route
                  exact
                  path="/student/dashboard/notes"
                  component={Notes}
                />
                <Route exact path="/student/dashboard/room" component={Room} />
                <Route
                  exact
                  path="/student/dashboard/assessment"
                  component={Assessment}
                />
              </Switch>
            </div>
          </div>
        </Router>
      ) : (
        (window.location.href = "/login")
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Dashboard);
