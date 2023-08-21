"use client";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const UserCart = () => {
  const token = Cookies.get("token");
  const [id, setId] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      setId(decodedToken.username);

      fetch(`http://localhost:4000/user/cart?username=${id}`, {
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
          console.log("Fetched Cart Data:", data);
          setItems(data);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, [token, id]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      for (const item of items) {
        total += item.totalAmount;
      }
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [items]);

  const deleteItem = (id, productName, quantity, username) => {
    fetch("http://localhost:4000/user/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        productName: productName,
        quantity: parseInt(quantity),
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const checkOut = () => {
    if (items.length === 0) {
      setMessage("No items in the cart to checkout.");
      return;
    }

    const transactionData = {
      username: id,
      products: items.map((item) => ({
        productName: item.productName,
        quantity: parseInt(item.quantity),
        price: item.price,
      })),
      totalPrice: totalAmount,
      datePurchased: new Date(),
    };

    fetch("http://localhost:4000/user/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(
            "Transaction successful. Items transferred to transactions."
          );

          fetch(`http://localhost:4000/user/cart/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              setItems([]);
            })
            .catch((error) => {
              console.error("Error deleting cart items:", error);
            });
        } else {
          setMessage("Transaction failed.");
        }
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <p>No items in the cart.</p>
        </div>
      ) : (
        <Container>
          <Table striped bordered hover responsive className="my-4 text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalAmount}</td>
                  <td>
                    <Button
                      variant="dark"
                      className="bg-transparent border-0"
                      onClick={() =>
                        deleteItem(
                          item._id,
                          item.productName,
                          item.quantity,
                          item.username
                        )
                      }>
                      <i className="bi bi-dash-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>{message}</p>

          <div className="d-flex justify-content-end">
            <div className="text-end">
              <p className="fw-bold fs-5">Total Amount: {totalAmount}</p>
              <Button variant="primary" onClick={checkOut}>
                Checkout
              </Button>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default UserCart;
