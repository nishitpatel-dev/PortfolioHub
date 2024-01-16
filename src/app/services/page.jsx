"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import servicesImg from "/public/images/design.png";

const Services = () => {
  const [serviceData, setserviceData] = useState([]);

  const hanldeServices = async () => {
    const servicesData = await fetch("api/serviceRoute", {
      method: "GET",
    });

    const sData = await servicesData.json();
    // console.log(sData.serviceData);

    setserviceData(sData.serviceData);
  };

  useEffect(() => {
    hanldeServices();
  }, []);

  // console.log(serviceData);

  return (
    <>
      <div className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <div className="container grid grid-three-cols">
          {serviceData.map((data) => {
            return (
              <div className="card">
                <div className="card-img">
                  <Image
                    src={servicesImg}
                    alt="Service Section"
                    width={"400"}
                    height={"500"}
                  />
                </div>

                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{data.provider}</p>
                    <p>{data.price}</p>
                  </div>

                  <h2>{data.service}</h2>
                  <p>{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
