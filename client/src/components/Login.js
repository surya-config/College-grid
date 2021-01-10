import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import { connect, useDispatch } from "react-redux";
import {
  registerStudent,
  registerTeacher,
  loginStudent,
  loginTeacher,
  
} from "../actions/authActions";
import classnames from "classnames";
import { useHistory, withRouter } from "react-router-dom";

import "./Login.css";

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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  registerStudent,
  registerTeacher,
  loginStudent,
  loginTeacher,
};

function Login({ auth, errors }) {
  const [switchBar, setSwitchBar] = useState(false);
  const [teacher, setTeacher] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setTeacher(!teacher);
  };

  const signIn = (usn, email, password, e) => {
    e.preventDefault();

    if (teacher === true) {
      const userData = {
        email: email,
        password: password,
      };

      dispatch(loginTeacher(userData, history));
    } else {
      const userData = {
        usn: usn,
        password: password,
      };

      dispatch(loginStudent(userData, history));
    }
  };

  const signUp = (name, usn, email, password, e) => {
    e.preventDefault();

    if (teacher === true) {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      dispatch(registerTeacher(userData, history));
    } else {
      const userData = {
        name: name,
        usn: usn,
        email: email,
        password: password,
      };

      dispatch(registerStudent(userData, history));
    }
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
              <p>if you have an account,</p>
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
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
              </div>
              {teacher === false ? (
                <div className="login__input">
                  <PermIdentityIcon />
                  <input
                    type="text"
                    placeholder="USN"
                    error={errors.usn}
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    className={classnames("", {
                      invalid: errors.usn,
                    })}
                  />
                </div>
              ) : null}

              <div className="login__input">
                <MailOutlinedIcon />
                <input
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
              </div>
              <div className="login__input">
                <LockOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
              </div>
              <span className="red__text">{errors.name}</span>
              <span className="red__text">{errors.usn}</span>
              <span className="red__text">{errors.email}</span>
              <span className="red__text">{errors.password}</span>
              <Button
                type="submit"
                onClick={(e) => signUp(username, usn, email, password, e)}
              >
                Sign up
              </Button>
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
                    error={errors.usn}
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    className={classnames("", {
                      invalid: errors.usn,
                    })}
                  />
                </div>
              ) : (
                <div className="login__input">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    error={errors.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound,
                    })}
                  />
                </div>
              )}
              <div className="login__input">
                <LockOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
              </div>
              <a>Forgot password?</a>
              <span className="red__text">{errors.usn}</span>
              <span className="red__text">
                {errors.email} {errors.emailnotfound}
              </span>
              <span className="red__text">
                {errors.password} {errors.passwordincorrect}
              </span>

              <Button
                type="submit"
                onClick={(e) => signIn(usn, email, password, e)}
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="signup__rightContainer">
            <div className="signup__imageOverlay"></div>
            <div className="signup__rightContainerContent">
              <h1>Hello Friend!</h1>
              <p>if you dont have an account,</p>
              <button onClick={() => setSwitchBar(false)}>Sign up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
