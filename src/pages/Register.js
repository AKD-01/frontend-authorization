import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import { setupWorker, rest } from "msw";
import "./Form.css";
import Phone from "../assets/phone.png";
import saly from "../assets/Saly.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };


  const worker = setupWorker(
    rest.post("http://localhost:5000/api/register", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          username: username,
          email: email,
          password: password,
        })
      );
    })
  );
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Please enter correct password.");
    } else {
      console.log({ username, email, password, confirmPassword });
      worker.start();
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Card className="formCard">
      <div className="cont1">
        <h3>Your Logo</h3>
        <div className="login__form">
          <h2>Sign up</h2>
          <p>If you already have an account register</p>
          <p>
            You can{" "}
            <span className="bold">
              <Link to="/">Login here !</Link>
            </span>
          </p>

          <form onSubmit={submitFormHandler}>
            <p className="reg__input-title">Email</p>
            <input
              value={email}
              onChange={emailChangeHandler}
              className="formInput"
              type="email"
              placeholder="&#xF0e0; Enter your email address"
            />
            <p className="reg__input-title">Username</p>
            <input
              value={username}
              onChange={usernameChangeHandler}
              className="formInput"
              type="text"
              placeholder=" &#xF007; Enter your User name"
            />
            <p className="reg__input-title">Password</p>
            <input
              value={password}
              onChange={passwordChangeHandler}
              className="formInput"
              type="password"
              placeholder="&#xF023; Enter your Password"
            />
            <p className="reg__input-title">Confirm Password</p>
            <input
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              className="formInput"
              type="password"
              placeholder="&#xf023; Confirm your Password"
            />

            <button className="form-button" type="submit">
              Register
            </button>
            <br />
          </form>
        </div>
      </div>
      <div className="cont2">
        <p className="formLogin">
          <img src={Phone} alt="Call" className="phone" />
           +88 596 782 483
        </p>
        <img src={saly} alt="" className="login__image" />
        <div className="login__signin">
          <h1>Sign up to name</h1>
          <p className="login__lorem">Lorem Ipsum is simply</p>
        </div>
      </div>
    </Card>
  );
};

export default Register;
