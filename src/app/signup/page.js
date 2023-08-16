"use client";
import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/app/signup/assets/style.css";

//images
import img from "../assets/signup.jpg";
import { Darumadrop_One } from "next/font/google";

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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="form rounded bg-white">
        <header>
          <h1 className="sign-up fw-bold">Sign Up</h1>
          <h2 className="subtitle">Create your account</h2>
        </header>
        <div className="row mt-4">
          <Form.Group
            className="col mb-3"
            controlId="exampleForm.ControlInput1">
            <Form.Label className="label">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Juan"
              value={values.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="col mb-3"
            controlId="exampleForm.ControlInput2">
            <Form.Label className="label">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Dela Cruz"
              value={values.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label className="label">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="juandelacruz"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label className="label">Email address</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder="juandelacruz@gmail.com"
            value={values.emailAddress}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
        <span style={{ color: "red" }}>{error}</span>
      </Form>
    </div>
  );
};

export default SignUp;
