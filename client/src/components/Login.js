import React, { useState } from "react";
import Header from "./Header";
import { Input, Button } from "react-bootstrap";

import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //   const signIn = (event) => {
  //     event.preventDefault();
  //     auth
  //       .signInWithEmailAndPassword(email, password)
  //       .catch((error) => alert(error.message));
  //     setOpen(false);
  //   };
  return (
    <div>
      <form className="app__signup">
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
      </form>
    </div>
  );
}

export default Login;
