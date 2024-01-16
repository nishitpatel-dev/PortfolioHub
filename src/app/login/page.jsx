"use client";

import React, { useEffect, useState } from "react";
import loginImage from "/public/images/login.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [loginuser, setloginuser] = useState({
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setloginuser({ ...loginuser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginuser.email == "" || loginuser.password == "") {
        toast.error("Please Fill In All The Required Info!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const response = await fetch("api/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: loginuser.email,
            password: loginuser.password,
          }),
        });

        const parsedData = await response.json();

        if (response.status == 400) {
          toast.error("Try To Login With Diffrent Credentials!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success("Login Success!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          router.push("/");

          localStorage.setItem("authToken", parsedData.authToken);
          localStorage.setItem("userid", parsedData.userid);
          localStorage.setItem("username", parsedData.nameForFrontend);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image">
            <Image
              src={loginImage}
              alt="Login Form"
              width={"450"}
              height={"450"}
              className=" ml-24"
            />
          </div>

          <div className="registration-form">
            <h1 className="main-heading">Login Form</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                onChange={handleUser}
                value={loginuser.email}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                onChange={handleUser}
                value={loginuser.password}
              />
              <br />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
