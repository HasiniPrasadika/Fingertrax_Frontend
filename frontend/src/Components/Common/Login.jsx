import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import videoBg from "../../assets/videoBg.mp4";
import ErrorMessage from "../ErrorMessage";
import "./Common_Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case "admin":
          navigate("/dashboard/admin_dashboard");
          break;
        case "student":
          navigate("/dashboard/student_dashboard");
          break;
        case "lecturer":
          navigate("/dashboard/lecturer_dashboard");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <img src="/Images/logo2.png" alt="Logo" className="img" />
      </div>
      <div className="content-bar">
        <video src={videoBg} autoPlay loop muted className="bg-video" />
        <div className="text-content">
          <p>Touch for </p>
          <p>Effortless </p>
          <p>Attendance Tracking</p>
          <h1 >
            Experience a new era in attendance management with our cutting-edge
            fingerprint technology. Our system eliminates the hassle of
            traditional methods, allowing users to effortlessly mark their
            presence with a simple touch.</h1>
          
        </div>

        <div className="form_container">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={userName}
                placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
