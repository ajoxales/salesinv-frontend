"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserPortal = () => {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token === undefined) router.push("/login");
  }, [token, router]);

  return;
};

export default UserPortal;
