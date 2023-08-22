"use client";
import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    fetch(`${serverURL}/users`)
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }, []);

  const deleteUser = (id) => {
    fetch(`${serverURL}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <div>
      <Container>
        <Table striped bordered hover responsive className="my-4 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.emailAddress}</td>
                <td>
                  <Button
                    variant="dark"
                    className="bg-transparent border-0"
                    onClick={() => deleteUser(user._id)}>
                    <i className="bi bi-person-dash fs-5"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Users;
