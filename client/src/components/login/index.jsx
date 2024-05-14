import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginCard.scss";
import { login } from "../../repository/auth";

const LoginCard = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(inputs).then((result) => {
        localStorage.setItem("token", result);
        setErr("")
        navigate("/");
    }).catch((err) => {
        setErr(err)
    });
  };

  return (
    <>
      <div className="cetroid_loginWrapper">
        <div className="centroid_loginContainer">
          <div className="centroid_loginContainerLeft">
            <h1>Rejection Analysis</h1>
            <img src="/assets/logo.png" alt="" />
          </div>
          <div className="centroid_loginContainerRight">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <input type="text" placeholder="username" name="username" onChange={handleChange}/>

              <input type="password" placeholder="password" name="password" onChange={handleChange}/>
              <button type="submit">Login</button>
              {err && err}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
