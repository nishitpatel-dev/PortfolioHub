"use client";

import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./adminContact.css";
import Link from "next/link";

const AdminContacts = () => {
  const [adminContacts, setadminContacts] = useState([]);
  const [adminState, setadminState] = useState(false);

  const validToken = localStorage.getItem("authToken");
  const userid = localStorage.getItem("userid");

  const handleContacts = async () => {
    const authRes = await fetch("/api/adminContacts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });

    const contactData = await authRes.json();
    // console.log(contactData);

    if (contactData.dataReceived) {
      setadminContacts(contactData.contactData);
    } else if (!contactData.validUser) {
      setadminState(true);
    } else {
      console.log(contactData.message);
    }
  };

  useEffect(() => {
    handleContacts();
  }, []);

  const handleDeleteUser = async (userid) => {
    const deleteRes = await fetch("/api/adminContacts", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: userid,
      }),
    });

    const delRes = await deleteRes.json();

    console.log(delRes);

    if (delRes.message.deletedCount == 1) {
      handleContacts();
    }
  };

  return (
    <>
      <section>
        {adminState == true ? (
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
              <h1>All Contacts Data</h1>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {adminContacts.map((data) => {
                    return (
                      <>
                        <tr key={data._id}>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                          <td>{data.message}</td>
                          <td>
                            <button
                              className="adminbtn"
                              onClick={() => {
                                handleDeleteUser(data._id);
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

export default AdminContacts;
