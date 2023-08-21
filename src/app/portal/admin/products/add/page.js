"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Col, Row, Button, Container, Nav } from "react-bootstrap";
import Link from "next/link";

const AddProduct = () => {
  const [isValid, setIsValid] = useState(true);
  const [values, setValues] = useState({
    productName: "",
    quantity: 0,
    price: 0.0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setValues((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validatePrice = () => {
    const priceValue = parseFloat(values.price);
    return priceValue >= 1.0;
  };

  const validateQuantity = () => {
    const validQuantity = values.quantity;
    return validQuantity >= 1;
  };

  //to backend
  const addNewProduct = () => {
    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: values.productName,
        quantity: values.quantity,
        price: values.price,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  return (
    <div>
      <div className="my-4">
        <Container>
          <Link href="/portal/admin/products">
            <i class="bi bi-arrow-left-short text-primary"></i>Products
          </Link>
          <h2 className="mt-3">Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm="2">
                Product Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formQuantity">
              <Form.Label column sm="2">
                Quantity
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  min="0"
                  isInvalid={!validateQuantity()}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPrice">
              <Form.Label column sm="2">
                Price (₱)
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter Price"
                  name="price"
                  min="0.00"
                  value={values.price}
                  onChange={handleChange}
                  required
                  isInvalid={!validatePrice()}
                />
              </Col>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end">
            <div className="text-end">
              <Button
                variant="primary"
                disabled={isValid}
                onClick={addNewProduct}>
                Add Product +
              </Button>
              <p className="text-success">{message}</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddProduct;
