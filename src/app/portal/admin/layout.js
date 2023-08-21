"use client";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { Container } from "react-bootstrap";
import { Styledh1 } from "@/app/assets/styles";
import jwtDecode from "jwt-decode";

export default function AdminLayout({ children }) {
  const token = Cookies.get("token");
  const router = useRouter();
  const pathname = usePathname();
  const [decoded, setDecoded] = useState({});

  useEffect(() => {
    if (token === undefined) router.push("/login");
  }, [token, router]);

  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    }
  }, []);

  return (
    <div className="p-4">
      <Container>
        <div className="d-flex justify-content-between">
          <Styledh1>Dashboard</Styledh1>
          <Navbar variant="light" bg="white" expand="lg">
            <Container fluid>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav>
                  <Navbar.Brand>
                    <i class="bi bi-person-circle text-dark fs-4 d-none d-lg-block"></i>
                  </Navbar.Brand>
                  <NavDropdown title={decoded.name} menuVariant="light">
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Nav variant="underline">
            <Nav.Item>
              <Nav.Link
                className="me-1"
                href="/portal/admin/users"
                active={pathname.startsWith("/portal/admin/users")}>
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="me-1"
                href="/portal/admin/products"
                active={pathname.startsWith("/portal/admin/products")}>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="me-1"
                href="/portal/admin/transactions"
                active={pathname.startsWith("/portal/admin/transactions")}>
                Transactions
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {children}
      </Container>
    </div>
  );
}
