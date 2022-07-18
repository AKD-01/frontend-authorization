import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import "./Form.css";
import saly from "../assets/Saly.png";
import fb from "../assets/fb.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import { setupWorker, rest } from "msw";
import Phone from '../assets/phone.png'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const worker = setupWorker(
    rest.post("http://localhost:3000/api/login", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          email: email,
          password: password,
        })
      );
    })
  );
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log({ email, password });
    worker.start();
    setEmail("");
    setPassword("");
  };

  return (
    <Card className="formCard">
      <div className="cont1">
        <h3>Your Logo</h3>
        <div className="login__form">
          <h2>Sign in</h2>
          <p>If you don’t have an account register</p>
          <p>
            You can{" "}
            <span className="bold">
              <Link to="/register">Register here !</Link>
            </span>
          </p>

          <form method='post' onSubmit={submitFormHandler}>
            <p className="formInput-title">Email</p>
            <input
              value={email}
              onChange={emailChangeHandler}
              className="formInput FontAwesome"
              type="email"
              placeholder="&#xF0e0; Enter your email address"
            />
            <p className="formInput-title">Password</p>
            <input
              value={password}
              onChange={passwordChangeHandler}
              className="formInput"
              type="password"
              placeholder="&#xf023; Enter your Password"
            />
            <div className="flex">
              <div>
                <span className="checkbox">
                  <input type="checkbox" />
                </span>
                <span className="formInput-title">Remember me</span>
              </div>
              <div>
                <p className="formInput-rempass">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
              </div>
            </div>
            <button className="form-button" type="submit">
              Login
            </button>
            <div className="text-center">
              <p className="formInput-rempass">or continue with</p>
            </div>
            <br />
            <div className="text-center">
              <span>
                <img src={fb} alt="" />
              </span>
              <span>
                <img src={apple} alt="" />
              </span>
              <span>
                <img src={google} alt="" />
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="cont2">
        <p className="formLogin"><img src={Phone} alt="Call" className="phone" /> +88 596 782 483</p>
        <img src={saly} alt="" className="login__image" />
        <div className="login__signin">
          <h1>Sign in to name</h1>
          <p className="login__lorem">Lorem Ipsum is simply</p>
        </div>
      </div>
    </Card>
  );
};

export default Login;
