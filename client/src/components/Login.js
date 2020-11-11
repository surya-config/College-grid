import React, { useState } from "react";
import Header from "./Header";
import { Input, Button } from "react-bootstrap";

import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import TextFormatOutlinedIcon from "@material-ui/icons/TextFormatOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import "../css/Login.css";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function Login() {
  const [switchBar, setSwitchBar] = useState(false);
  const [teacher, setTeacher] = useState(false);

  const [username, setUsername] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setTeacher(!teacher);
  };

  const signIn = (event) => {
    event.preventDefault();
  };

  const signUp = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      {switchBar === false ? (
        <div className="login__container">
          <img
            className="login__logo"
            src="https://theactingcenterla.com/wp-content/uploads/2020/03/facetime-transparent-17.png"
            alt="FaceTime"
          />
          <div className="login__leftContainer">
            <div className="login__imageOverlay"></div>
            <div className="login__leftContainerContent">
              <h1>Welcome Back!</h1>
              <button onClick={() => setSwitchBar(true)}>Sign in</button>
            </div>
          </div>
          <div className="login__rightContainer">
            <div className="login__rightContainerContent">
              <h2>Create Account</h2>
              <div className="login__option">
                <h6>Teacher?</h6>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={teacher}
                      onChange={handleChange}
                      name="Teacher?"
                    />
                  }
                />
              </div>
              <div className="login__input">
                <AccountCircleOutlinedIcon />
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {teacher === false ? (
                <div className="login__input">
                  <PermIdentityIcon />
                  <input
                    type="text"
                    placeholder="USN"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="login__input">
                <MailOutlinedIcon />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input">
                <LockOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit">Sign up</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="signup__container">
          <img
            className="signup__logo"
            src="https://theactingcenterla.com/wp-content/uploads/2020/03/facetime-transparent-17.png"
            alt="FaceTime"
          />
          <div className="signup__leftContainer">
            <div className="signup__leftContainerContent">
              <h2>Login</h2>
              <div className="signup__option">
                <h6>Teacher?</h6>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={teacher}
                      onChange={handleChange}
                      name="Teacher?"
                    />
                  }
                />
              </div>
              {teacher === false ? (
                <div className="login__input">
                  <PermIdentityIcon />
                  <input
                    type="text"
                    placeholder="USN"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                  />
                </div>
              ) : (
                <div className="login__input">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <div className="login__input">
                <LockOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Sign In</Button>
            </div>
          </div>

          <div className="signup__rightContainer">
            <div className="signup__imageOverlay"></div>
            <div className="signup__rightContainerContent">
              <h1>Hello Friend!</h1>
              <button onClick={() => setSwitchBar(false)}>Sign up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
