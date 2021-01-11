import React from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import TNotes from "../Notes/Notes";
import TMainNotes from "../Notes/MainNotes/MainNotes";
import TNotesDescription from "../Notes/NotesDescription/NotesDescription";
import TRoom from "../Room/Room";
import THome from "../Home/Home";
import Assessment from "../Assessment/Assessment";
import TeacherRoom from "../Room/TeacherRoom";

import Home from "../../Student/Home/Home";
import Room from "../../Student/Room/Room";
import SNotes from "../../Student/Notes/SNotes";
import SAssessment from "../../Student/Assessment/SAssessment";
import SMainAssessment from "../../Student/Assessment/SMainAssessment";

import { connect } from "react-redux";
import MainAssessmentPage from "../Assessment/MainAssessmentPage";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function TDashboard({ auth }) {
  const teacher = auth.user.email;
  const student = auth.user.usn;

  return (
    <Router>
      <Switch>
        {student !== undefined ? (
          <div className="dashboard">
            <div className="dashboardLeftContainer">
              <Navbar />
            </div>
            <div className="dashboardRightContainer">
              <Route exact path="/student/dashboard/" component={Home} />
              <Route exact path="/student/dashboard/notes" component={SNotes} />
              <Route
                exact
                path="/student/dashboard/class/:roomID"
                component={TeacherRoom}
              />
              <Route exact path="/student/dashboard/room" component={Room} />

              <Route
                exact
                path="/student/dashboard/assessment"
                component={SMainAssessment}
              />

              <Route
              exact
              path="/student/dashboard/assessment/:id"
              component={SAssessment}
            />
            </div>
          </div>
        ) : (
          <div className="dashboard">
            <div className="dashboardLeftContainer">
              <Navbar />
            </div>
            <div className="dashboardRightContainer">
              <Route exact path="/teacher/dashboard/" component={Home} />
              <Route exact path="/teacher/dashboard/notes" component={TNotes} />
              <Route
                exact
                path="/teacher/dashboard/class/:roomID"
                component={TeacherRoom}
              />
              <Route exact path="/teacher/dashboard/class" component={TRoom} />

              <Route
              exact
              path="/teacher/dashboard/assessment"
              component={MainAssessmentPage}
            />

              <Route
                exact
                path="/teacher/dashboard/assessment/quiz"
                component={Assessment}
              />
              <Route
                exact
                path="/teacher/dashboard/assessment/quiz/:id"
                component={Assessment}
              />
              <Route
                exact
                path="/teacher/dashboard/notes/:noteId"
                component={TMainNotes}
              />
              <Route
                exact
                path="/teacher/dashboard/notes/:noteId/:notedescId"
                component={TNotesDescription}
              />
            </div>
          </div>
        )}
      </Switch>
    </Router>
  );
}

export default connect(mapStateToProps)(TDashboard);
