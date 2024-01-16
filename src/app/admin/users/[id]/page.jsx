"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const editUser = ({ params }) => {
  const userid = params.id;
  //   console.log(userid);

  const router = useRouter();

  const [updateddata, setupdateddata] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const getData = async (id) => {
    const getres = await fetch("/api/adminUsers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: id,
      }),
    });

    const resData = await getres.json();

    setupdateddata({
      username: resData.userData.username,
      email: resData.userData.email,
      phone: resData.userData.phone,
    });
  };

  useEffect(() => {
    getData(userid);
  }, []);

  const handleUpdatedData = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setupdateddata({ ...updateddata, [name]: value });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const updatedRes = await fetch("/api/adminUsers", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: updateddata.username,
        email: updateddata.email,
        phone: updateddata.phone,
        uid: id,
      }),
    });

    const jsonRes = await updatedRes.json();

    if (jsonRes.updatedData.acknowledged) {
      router.push("/admin/users");

      toast.success("Data Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    console.log(jsonRes);
  };

  return (
    <>
      <div className="section-registration">
        <div className="container grid grid-one-cols">
          <div className="registration-form">
            <h1 className="main-heading">Data Updation</h1>

            <form
              onSubmit={(e) => {
                handleSubmit(e, userid);
              }}
            >
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                autoComplete="off"
                value={updateddata.username}
                onChange={handleUpdatedData}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                value={updateddata.email}
                onChange={handleUpdatedData}
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                autoComplete="off"
                value={updateddata.phone}
                onChange={handleUpdatedData}
              />
              <br />
              <button type="submit">Update</button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default editUser;
