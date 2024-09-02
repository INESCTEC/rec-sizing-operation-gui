import { TextInput, Form, Stack, Button, PasswordInput } from "@carbon/react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeat: "",
    firstName: "",
    lastName: "",
    organization: "INESCTEC",
  });

  const auth = useAuth();
  const handleSubmitEvent = () => {
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.repeat === input.password &&
      input.firstName !== "" &&
      input.lastName !== ""
    ) {
      auth.signUp(input);
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
    <div className="signup-page">
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
            <p>Create New Account</p>
          </div>
          
          <div className="card-body" style={{paddingLeft: "2rem", paddingRight: "2rem", paddingBottom: "2rem"}}>
            <Stack gap={5}>
              <TextInput
                labelText={"Email"}
                type="email"
                id="user-email"
                name="email"
                placeholder="Email"
                aria-describedby="user-email"
                aria-invalid="false"
                invalid={input.email !== "" && !/^\S+@\S+\.\S+$/.test(input.email)}
                invalidText="Invalid email."
                onChange={handleInput}
              />
              <TextInput
                labelText={"First Name"}
                type="name"
                id="user-first-name"
                name="firstName"
                placeholder="First Name"
                aria-describedby="user-first-name"
                aria-invalid="false"
                onChange={handleInput}
              />
              <TextInput
                labelText={"Last Name"}
                type="name"
                id="user-last-name"
                name="lastName"
                placeholder="Last Name"
                aria-describedby="user-last-name"
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
              <PasswordInput
                labelText={"Repeat Password"}
                type="password"
                id="repeat-password"
                placeholder="Repeat Password"
                name="repeat"
                aria-describedby="user-repeat-password"
                aria-invalid={input.password !== input.repeat}
                invalid={input.password !== input.repeat}
                invalidText="Passwords do not match."
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
                Create Account
              </Button>
            </Stack>
            <div className="row mt-1 flex-align-center flex-just-center">
              <div style={{ paddingRight: "3px" }}>
                Already have an account?
              </div>
              <Link
                to="/login"
                className="normal-text"
                style={{ color: "black" }}
              >
                <div className="bold" style={{textDecoration: "underline"}}>Login</div>
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
