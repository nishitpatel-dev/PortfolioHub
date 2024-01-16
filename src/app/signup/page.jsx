"use client";

import Image from "next/image";
import React, { useState } from "react";
import registrationImg from "/public/images/register.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const [data, setdata] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        data.username == "" ||
        data.email == "" ||
        data.phone == "" ||
        data.password == ""
      ) {
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
        const response = await fetch("api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
          }),
        });

        console.log(response);
        const parsedData = await response.json();
        console.log(parsedData);

        if (response.status == 400) {
          toast.error(parsedData.message, {
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
          toast.success("Registered Successfully", {
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

  if (localStorage.getItem("authToken")) {
    router.push("/");
  }

  return (
    <>
      <div className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image">
            <Image
              src={registrationImg}
              alt="Registration Form"
              width={"450"}
              height={"450"}
              className=" ml-24"
            />
          </div>

          <div className="registration-form">
            <h1 className="main-heading">Registration Form</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                autoComplete="off"
                onChange={handleData}
                value={data.username}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                onChange={handleData}
                value={data.email}
              />

              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                autoComplete="off"
                onChange={handleData}
                value={data.phone}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                onChange={handleData}
                value={data.password}
              />
              <br />

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
