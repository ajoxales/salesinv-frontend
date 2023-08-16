"use client";
import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { StyledLabel, Styledh2, Styledh1, StyledForm } from "../assets/styles";

const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const login = () => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.message);
        else {
          setError("");
          router.push(data.redirectUrl);
        }
      });
  };

  useEffect(() => {
    let incompleteInput = false;
    Object.values(values).forEach((value) => {
      if (value === "") {
        incompleteInput = true;
      }
    });
    if (!incompleteInput) setIsValid(false);
    else setIsValid(true);
  }, [values]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="rounded bg-white">
        <header className="mb-3">
          <Styledh1 className="sign-up fw-bold">Log In</Styledh1>
          <Styledh2>Login to your account</Styledh2>
        </header>
        <Form.Group className="mb-3" controlId="usernameInput">
          <StyledLabel>Username</StyledLabel>
          <Form.Control
            type="text"
            name="username"
            placeholder="juandelacruz"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordInput">
          <StyledLabel>Password</StyledLabel>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="d-flex">
          <p>Already have an account?</p>
          <span className="ms-2 fw-medium">
            <Link href="/signup">Sign Up</Link>
          </span>
        </div>
        <Button variant="primary" disabled={isValid} onClick={login}>
          Login
        </Button>
        <span className="text-danger ms-2">{error}</span>
      </StyledForm>
    </div>
  );
};

export default Login;
