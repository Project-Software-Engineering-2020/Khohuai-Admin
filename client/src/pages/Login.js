import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux"
import "../stylesheets/login.css";
import { setloginWithUsername } from "../redux/action/authAction";

function Login() {

  const dispatch = useDispatch()

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [UserError, setUserErr] = useState("");

  function onUsernamelogin(e) {
    setUsernameErr("");
    setPasswordErr("");
    setUserErr("");
    e.preventDefault();

    try {
      Axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      }).then((res) => {
        if (res.status === 201) {
          if (res.data === "auth/invalid-username") {
            setUsernameErr("usernameไม่ถูกต้อง");
            setUserErr("usernameไม่ถูกต้อง");
          } else if (res.data === "auth/wrong-password") {
            setPasswordErr("รหัสผ่านไม่ถูกต้อง");
            setUserErr("รหัสผ่านไม่ถูกต้อง");
          } else if (res.data === "auth/user-not-found") {
            setUserErr("ไม่พบบัญชีผู้ใช้งาน");
          } else if (res.data === "auth/too-many-requests") {
            setUserErr("คุณใส่รหัสผ่านผิดเกิน 3 ครั้ง กรุณารอสักครู่");
          }
        } else if (res.status === 200) {
          dispatch(setloginWithUsername(res));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="log-in">
      <div className="main-form">
        <div class="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter Username"
            name=""
            value=""
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name=""
            value=""
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn-login" onClick="">
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
