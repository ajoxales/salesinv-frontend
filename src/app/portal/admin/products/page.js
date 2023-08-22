"use client";
import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    fetch(`${serverURL}/products`)
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    fetch(`${serverURL}/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  return (
    <div>
      <div className="m-4 d-flex justify-content-end">
        <Link href="/portal/admin/products/add">
          <Button variant="primary">Add Product +</Button>
        </Link>
      </div>
      <Container>
        <Table striped bordered hover responsive className="my-4 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <Button
                    variant="dark"
                    className="bg-transparent border-0"
                    onClick={() => deleteProduct(product._id)}>
                    <i className="bi bi-x-diamond fs-5"></i>
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

export default Products;
