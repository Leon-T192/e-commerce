import React, { useState } from "react";
import FormErrors from "./FormErrors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInput((rest) => ({ ...rest, [nameInput]: valueInput }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (input.email == "") {
      errorsSubmit.email = "Please enter your email!";
      flag = false;
    } else {
      const regEx =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regEx.test(input.email)) {
        errorsSubmit.email = "Invalid email!";
        flag = false;
      }
    }
    if (input.pass == "") {
      errorsSubmit.pass = "Please enter your password!";
      flag = false;
    }
    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      setErrors("");

      const data = {
        email: input.email,
        password: input.pass,
        level: 0,
      };
      axios
        .post("http://localhost/laravel/public/api/login", data)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            const appState = res;
            localStorage.setItem("appState", JSON.stringify(appState));
            navigate("/");
          }
        });
    }
  }

  return (
    <div className="login-form">
      {/*login form*/}
      <h2>Login to your account</h2>
      <form action="#" onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={handleInput}
        />
        <input
          name="pass"
          type="text"
          placeholder="Password"
          onChange={handleInput}
        />
        <span>
          <input type="checkbox" className="checkbox" />
          Keep me signed in
        </span>
        <button type="submit" className="btn btn-default">
          Login
        </button>
        <FormErrors errors={errors} />
      </form>
    </div>
  );
};

export default Login;
