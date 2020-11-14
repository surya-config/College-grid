import React from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import "./Navbar.css";
import { connect, useDispatch } from "react-redux";

import { logoutUser } from "../../../actions/authActions";

import AirplayOutlinedIcon from "@material-ui/icons/AirplayOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  logoutUser,
};

const Navbar = ({ auth }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history));
  };

  return (
    <nav className="navbar">
      <div className="navbar__teachercontainer">
        {/* <NavLink
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/teacher/dashboard/"
      >
        Dashboard
      </NavLink> */}
        {/* <img
          className="teacherDashboard__logo"
          src="https://theactingcenterla.com/wp-content/uploads/2020/03/facetime-transparent-17.png"
          alt="FaceTime"
        /> */}

        <h4>{auth.user.name}</h4>
        <h5>{auth.user.email}</h5>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/teacher/dashboard/class"
        >
          <div className="navitem">
            <AirplayOutlinedIcon />
            <h6>Classes</h6>
          </div>
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/teacher/dashboard/notes"
        >
          <div className="navitem">
            <AssignmentOutlinedIcon />
            <h6>Notes</h6>
          </div>
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/teacher/dashboard/assessment"
        >
          <div className="navitem">
            <CreateOutlinedIcon />
            <h6>Assessment</h6>
          </div>
        </NavLink>

        <NavLink className="navbar__link" to="/">
          <div className="navitem" onClick={(e) => handleLogout(e)}>
            <PowerSettingsNewOutlinedIcon />
            <h6>Logout</h6>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
