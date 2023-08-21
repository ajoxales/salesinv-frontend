"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import jwtDecode from "jwt-decode";

const User = () => {
  const pathName = usePathname();
  const userId = pathName.split("/")[2];
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId !== "") {
      fetch(`http://localhost:4000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setAge(data.age);
          setCys(data.cys);
        });
    }
  }, [pathName]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    }
  }, []);

  return <div>Hello {userData.firstName}</div>;
};

export default User;
