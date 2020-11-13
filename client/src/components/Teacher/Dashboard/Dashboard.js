import React from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Notes from "../Notes/Notes";
import Room from "../Room/Room";
import Home from "../Home/Home";
import Assessment from "../Assessment/Assessment";

function Dashboard() {
  return (
    <Router>
      <div className="dashboard">
        <div className="dashboardLeftContainer">
          <Navbar />
        </div>
        <div className="dashboardRightContainer">
          <Switch>
            <Route exact path="/teacher/dashboard/" component={Home} />
            <Route exact path="/teacher/dashboard/notes" component={Notes} />
            <Route exact path="/teacher/dashboard/room" component={Room} />
            <Route
              exact
              path="/teacher/dashboard/assessment"
              component={Assessment}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default withRouter(Dashboard);
