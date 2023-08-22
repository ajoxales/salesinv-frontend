"use client";
import React from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const Products = () => {
  const token = Cookies.get("token");
  const [products, setProducts] = useState([]);
  const [decoded, setDecoded] = useState({});
  const [message, setMessage] = useState("");
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    }
  }, []);

  useEffect(() => {
    fetch(`${serverURL}/products`)
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    fetch(`${serverURL}/user/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: decoded.username,
        productName: product.productName,
        price: product.price,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  return (
    <div>
      <Container>
        <Table striped bordered hover responsive className="my-4 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>
                  <Button
                    variant="dark"
                    className="bg-transparent border-0"
                    onClick={() => addToCart(product)}>
                    <i className="bi bi-cart-plus fs-5"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>{message}</p>
      </Container>
    </div>
  );
};

export default Products;
