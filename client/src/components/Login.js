import React, { useState } from "react";
import Header from "./Header";
import { Input, Button } from "react-bootstrap";

import PersonIcon from "@material-ui/icons/Person";

import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [switchBar, setSwitchBar] = useState(false);

  //   const signIn = (event) => {
  //     event.preventDefault();
  //     auth
  //       .signInWithEmailAndPassword(email, password)
  //       .catch((error) => alert(error.message));
  //     setOpen(false);
  //   };
  return (
    <div className="login">
      {/* <form className="app__signup">
        <img
          className="app__logo"
          src="https://pngimage.net/wp-content/uploads/2019/05/video-call-logo-png-2.png"
          alt="Face Time"
        />
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Sign In</Button>
      </form> */}
      {switchBar === false ? (
        <div className="login__container">
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
              <input
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder="USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit">Sign up</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="signup__container">
          <div className="signup__leftContainer">
            <div className="signup__leftContainerContent">
              <h2>Login</h2>
              <input
                placeholder="Usn"
                value={usn}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

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
