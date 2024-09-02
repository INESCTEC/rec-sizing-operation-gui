import { TextInput, Form, Stack, Button, PasswordInput } from "@carbon/react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = () => {
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("Please provide a valid input.");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <Form
        style={{ width: "28rem" }}
        aria-label="login form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitEvent();
        }}
      >
        <div className="card-wrapper">
          <div className="card-header mt-2" style={{paddingLeft: "1.5rem"}}>
            <p>Sign in to your account</p>
          </div>
          <div className="card-body" style={{paddingLeft: "2rem", paddingRight: "2rem", paddingBottom: "2rem"}}>
            <Stack gap={4}>
              <TextInput
                labelText={"Email"}
                type="email"
                id="user-email"
                name="email"
                placeholder="Email"
                aria-describedby="user-email"
                aria-invalid="false"
                onChange={handleInput}
              />
              <PasswordInput
                labelText={"Password"}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                aria-describedby="user-password"
                aria-invalid="false"
                onChange={handleInput}
              />
              <Button
                className="primary-button mt-1"
                style={{
                  justifyContent: "center",
                  maxInlineSize: "100%",
                  width: "100%",
                }}
                type="submit"
              >
                Login
              </Button>
            </Stack>
            <div className="column flex-center mt-1">
              <div>
                <span style={{ paddingRight: "3px" }}>
                  Don't have an account?
                </span>
                <Link
                  to="/sign-up"
                  className="normal-text"
                  style={{ color: "black" }}
                >
                  <span
                    className="bold"
                    style={{ textDecoration: "underline" }}
                  >
                    Sign Up
                  </span>
                </Link>
              </div>
              <div style={{ paddingTop: "8px" }}>
                <span style={{ paddingRight: "3px" }}>Forgot Password?</span>
                <Link
                  to="/recover-password"
                  className="normal-text"
                  style={{ color: "black" }}
                >
                  <span
                    className="bold"
                    style={{ textDecoration: "underline" }}
                  >
                    Recover Password
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
