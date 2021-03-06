import React, { useState, useEffect } from "react";
import "./home.css";
import { Container, Input, Label, Button } from "reactstrap";
import DataManager from "../../data_module/DataManager";

function Home(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const loginUser = () => {
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    };
    if (loginData.email === "") {
      alert("Please Enter an Email Address");
    } else if (loginData.password === "") {
      alert("Please Enter a Password");
    } else {
      DataManager.loginUser(loginData).then((data) => {
        if (!data.id) {
          alert("Email or Password is not correct. Please Try again.");
        } else {
          sessionStorage.setItem("session_id", data.id);
          sessionStorage.setItem("logged_in_user", data.user_id);
          props.history.push("/deadlines_and_Requirements");
        }
      });
    }
  };

  const checkForUser = () => {
    const user_id = sessionStorage.getItem(`logged_in_user`);
    props.setHasUser(user_id);
    if (user_id) {
      props.history.push("/deadlines_and_Requirements");
    }
  };

  useEffect(() => {
    checkForUser();
  }, []);

  return (
    <>
      <section className="home_container">
        <Container className="text-center p-4">
          <h1>VCS Speaker Portal</h1>
        </Container>
        <Container className="p-4 login_container">
          <h3>Log in</h3>

          <div className="form-group">
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleFieldChange}
            />
          </div>

          <div className="form-group">
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleFieldChange}
            />
          </div>

          <Button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            onClick={loginUser}
          >
            Sign in
          </Button>
          <p className="forgot-password text-right">
            <a href="/sign_up">Create VCS Speaker Account</a>
          </p>
        </Container>
      </section>
    </>
  );
}

export default Home;
