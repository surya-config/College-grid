import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CreateRoom from "./components/Teacher/Room/CreateRoom";
import TeacherRoom from "./components/Teacher/Room/TeacherRoom";
import TeacherNotes from "./components/TeacherNotes";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Student/Dashboard/Dashboard";
import Home from "./components/Student/Home/Home";
import Notes from "./components/Student/Notes/Notes";

import Assessment from "./components/Student/Assessment/Assessment";
import Room from "./components/Student/Room/Room";

import TDashboard from "./components/Teacher/Dashboard/Dashboard";
import THome from "./components/Teacher/Home/Home";
import TNotes from "./components/Teacher/Notes/Notes";
import TRoom from "./components/Teacher/Room/Room";
import TAssessment from "./components/Teacher/Assessment/Assessment";
import MainNotes from "./components/Teacher/Notes/MainNotes/MainNotes";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./PrivateRoute";

import store from "./store";
import { Provider } from "react-redux";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <TDashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute
              exact
              path="/student/dashboard"
              component={Dashboard}
            />
            <Route exact path="/student/dashboard/">
              <Home />
              <Dashboard />
            </Route>
            <Route exact path="/student/dashboard/notes">
              <Dashboard />
              <Notes />
            </Route>
            <Route exact path="/student/dashboard/room">
              <Dashboard />
              <Room />
            </Route>
            <Route exact path="/student/dashboard/assessment">
              <Dashboard />
              <Assessment />
            </Route>
            <PrivateRoute
              exact
              path="/teacher/dashboard"
              component={TDashboard}
            />
            {/* <Route exact path="/teacher/dashboard/">
              <THome />
              <TDashboard />
            </Route> */}
            {/* <Route exact path="/teacher/dashboard/notes">
              <TDashboard />
              <TNotes />
            </Route> */}
            {/* <Route exact path="/teacher/dashboard/class">
              <TDashboard />
              <TRoom />
            </Route> */}
            {/* <Route exact path="/teacher/dashboard/assessment">
              <TDashboard />
              <TAssessment />
            </Route> */}
            {/* <Route path="/notes" component={TeacherNotes} /> */}

            <Route
              exact
              path="/teacher/dashboard/class/:roomID"
              component={TeacherRoom}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
