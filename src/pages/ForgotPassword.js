import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setupWorker, rest } from "msw";
import Card from "../components/Card/Card";
import saly from "../assets/Saly.png";
import Phone from "../assets/phone.png";
import "./Form.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const worker = setupWorker(
    rest.post("http://localhost:5000/api/login", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          email: email,
        })
      );
    })
  );
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log({email});
    worker.start();
    setEmail("");
  };

  return (
    <Card className="formCard">
      <div className="cont1">
        <h3>Your Logo</h3>
        <div className="login__form">
          <h2>Forgot Your Password</h2>
          <p style={{width:'70%', lineHeight:'1rem'}}>Please enter the email address you'd like your password reset information sent to</p>

          <form onSubmit={submitFormHandler}>
            <p className="formInput-title">Email</p>
            <input
              value={email}
              onChange={emailChangeHandler}
              className="formInput"
              type="email"
              placeholder="&#xF0e0; Enter your email address"
            />
            <button className="form-button" type="submit">
              Reset Password
            </button>
            <br />
          </form>
          <br />
          <div>
            <p className="formInput-rempass text-center bold">
              <Link to="/">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="cont2">
        <p className="formLogin">
          <img src={Phone} alt="Call" className="phone" />
          +88 596 782 483
        </p>
        <img src={saly} alt="" className="login__image" />
        <div className="login__signin">
          <h1 style={{lineHeight:'2rem', fontSize:'1.5rem'}}>Don't remember your Password?!</h1>
          <p className="login__lorem">We'll help in resetting that.</p>
        </div>
      </div>
    </Card>
  );
};

export default ForgotPassword;
