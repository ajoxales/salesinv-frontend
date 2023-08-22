"use client";
import React from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const Transactions = () => {
  const token = Cookies.get("token");
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState("");
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setId(decodedToken.username);

      fetch(`${serverURL}/user/transactions?username=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTransactions(data);
        })
        .catch((error) => {
          console.error("Error fetching Transactions:", error);
        });
    }
  }, [token, id]);

  return (
    <div>
      {transactions.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <p>No transactions yet.</p>
        </div>
      ) : (
        <Container>
          <Table striped bordered hover responsive className="my-4 text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="fw-bold">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>
                    {transaction.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        <p>{product.productName}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {transaction.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        <p>{product.quantity}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {transaction.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        <p>{product.price}</p>
                      </div>
                    ))}
                  </td>
                  <td className="fs-5 fw-bold">{transaction.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default Transactions;
