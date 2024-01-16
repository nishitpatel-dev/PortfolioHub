"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import supportImg from "/public/images/support.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();

  const [contactData, setcontactData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const validToken = localStorage.getItem("authToken");

  useEffect(() => {
    const handleAuth = async () => {
      const authRes = await fetch("api/userAuth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${validToken}`,
        },
      });

      const userData = await authRes.json();
      // console.log(userData.userData.email);

      if (userData) {
        setcontactData({
          username: userData.userData.username,
          email: userData.userData.email,
          message: "",
        });
      }
    };

    handleAuth();
  }, []);

  const handleContactData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setcontactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        contactData.username == "" ||
        contactData.email == "" ||
        contactData.message == ""
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
        const response = await fetch("api/contact", {
          method: "POST",
          headers: { Content_type: "application/json" },
          body: JSON.stringify({
            username: contactData.username,
            email: contactData.email,
            message: contactData.message,
          }),
        });

        const data = await response.json();

        if (response.status == 200) {
          setcontactData({
            username: "",
            email: "",
            message: "",
          });

          toast.success("Your Message Has Been Delivered!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          console.log("toast");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("Some Error Occured While Submitting, Try Again!", {
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
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>

        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <Image
              src={supportImg}
              alt="Contact Us"
              width={"400"}
              height={"500"}
            />
          </div>

          <div className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  autoComplete="off"
                  value={contactData.username}
                  onChange={handleContactData}
                />
                <br />
                <br />
                <br />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={contactData.email}
                  onChange={handleContactData}
                />
                <br />
                <br />
                <br />
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="Enter Your Message"
                  onChange={handleContactData}
                  autoComplete="off"
                  value={contactData.message}
                />
                <br />
                <br />
                <br />
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14883.858836743972!2d72.7978952971661!3d21.153802688428684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051ffd68cfdfd%3A0x50eef593fa09ce97!2sAlthan%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1703601238991!5m2!1sen!2sin"
          width={"100%"}
          height={"450"}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
