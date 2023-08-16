"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const AdminPortal = () => {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token === undefined) router.push("/login");
  }, [token, router]);

  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <>
      <div>Welcome Admin</div>
      <Button onClick={logout}>Logout</Button>;
    </>
  );
};

export default AdminPortal;
