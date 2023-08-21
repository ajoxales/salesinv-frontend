"use client";
import React from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/transactions")
      .then((data) => data.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <Container>
        <Table striped bordered hover responsive className="my-4 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
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
                <td>{transaction.username}</td>
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
                <td className="fs-6 fw-bold">{transaction.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Transactions;
