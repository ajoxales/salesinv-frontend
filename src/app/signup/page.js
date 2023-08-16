"use client";
import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Styledh1, StyledForm, StyledLabel, Styledh2 } from "../assets/styles";

const SignUp = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const signup = () => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) setError(data.message);
        else {
          setError("");
          router.push("login");
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
        className="form rounded bg-white">
        <header>
          <Styledh1 className="sign-up">Sign Up</Styledh1>
          <Styledh2 className="subtitle">Create your account</Styledh2>
        </header>
        <Row className="mt-4">
          <Col>
            <Form.Group className="mb-3" controlId="firstnameInput">
              <StyledLabel className="label">First Name</StyledLabel>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Juan"
                value={values.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastnameInput">
              <Form.Label className="label">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Dela Cruz"
                value={values.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="usernameInput">
          <Form.Label className="label">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="juandelacruz"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailInput">
          <Form.Label className="label">Email address</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder="juandelacruz@gmail.com"
            value={values.emailAddress}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordInput">
          <Form.Label className="label">Password</Form.Label>
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
            <Link href="/login">Login</Link>
          </span>
        </div>
        <Button variant="primary" disabled={isValid} onClick={signup}>
          Sign Up
        </Button>
        <span className="text-danger ms-2">{error}</span>
      </StyledForm>
    </div>
  );
};

export default SignUp;
