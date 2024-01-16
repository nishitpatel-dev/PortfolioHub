"use client";

import React, { useEffect, useState } from "react";
import "./adminUser.css";
import { FaTrashAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { toast } from "react-toastify";
import Link from "next/link";

const AdminUsers = () => {
  const [adminusers, setadminusers] = useState([]);

  const validToken = localStorage.getItem("authToken");
  const userid = localStorage.getItem("userid");

  const handleAdminUsers = async () => {
    const authRes = await fetch("/api/adminUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });

    const userData = await authRes.json();
    // console.log(userData);

    if (userData.dataReceived) {
      setadminusers(userData.userData);
    } else {
      console.log(userData.message);
    }
  };

  useEffect(() => {
    handleAdminUsers();
  }, []);

  // console.log([adminusers]);

  const handleDeleteUser = async (userid, id) => {
    const deleteRes = await fetch("/api/adminUsers", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: userid,
        id: id,
      }),
    });

    const delRes = await deleteRes.json();

    // console.log(delRes);
    // console.log(delRes.message.deletedCount);

    if (delRes.message.deletedCount == 1) {
      handleAdminUsers();
    } else if (delRes.invalidUser) {
      toast.error("You Can't Delete Yourself!", {
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
      console.log("Some Error Occured");
    }
  };

  return (
    <>
      <section>
        {adminusers.length == 0 ? (
          <>
            <section id="error-page">
              <div className=" content">
                <h4>Sorry! You Can't Access This Page.</h4>
                <p>
                  Oops! you can't access this page beacuse you are not an admin.
                  If you believe there's an issue, feel free to report it, and
                  we'll look into it.
                </p>
                <div className="btns">
                  <Link href="/">return home</Link>
                  <Link href="/contact">report problem</Link>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div>
              <h1>All Users Data</h1>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {adminusers.map((data) => {
                    return (
                      <>
                        <tr key={data._id}>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>
                            <Link
                              className="adminbtn"
                              style={{
                                backgroundColor: "green",
                                width: "43px",
                                borderRadius: "8px",
                                color: "white",
                              }}
                              href={`/admin/users/${data._id}`}
                            >
                              <RxUpdate />
                            </Link>
                          </td>
                          <td>
                            <button
                              className="adminbtn"
                              onClick={() => {
                                handleDeleteUser(data._id, userid);
                              }}
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AdminUsers;
