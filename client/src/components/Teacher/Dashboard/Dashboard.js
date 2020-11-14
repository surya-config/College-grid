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
import TeacherRoom from "../Room/TeacherRoom";

import MainNotes from "../Notes/MainNotes/MainNotes";

function TDashboard() {
  return (
    <Router>
      <Switch>
        <div className="dashboard">
          <div className="dashboardLeftContainer">
            <Navbar />
          </div>
          <div className="dashboardRightContainer">
            <Route exact path="/teacher/dashboard/" component={Home} />
            <Route exact path="/teacher/dashboard/notes" component={Notes} />
            <Route
              exact
              path="/teacher/dashboard/class/:roomID"
              component={TeacherRoom}
            />
            <Route exact path="/teacher/dashboard/class" component={Room} />

            <Route
              exact
              path="/teacher/dashboard/assessment"
              component={Assessment}
            />
            <Route
              exact
              path="/teacher/dashboard/notes/:noteId"
              component={MainNotes}
            />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default withRouter(TDashboard);
