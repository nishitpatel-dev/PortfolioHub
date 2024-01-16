import Image from "next/image";
import React from "react";
import HeroImage from "/public/images/home.png";
import DesignImage from "/public/images/design.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We Are One Of The Best IT Company</p>
              <h1>Your Company Title</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At *Your Company
                Name*, we specialize in providing innovative IT services and
                solutions tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <Link href="/contact">
                  <button className="btn">connect now</button>
                </Link>
                <Link href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </Link>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <Image
                src={HeroImage}
                width={"400"}
                height={"500"}
                alt="MainSection Image"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>

          <div className="div1">
            <h2>100,00+</h2>
            <p>Happy Clients</p>
          </div>

          <div className="div1">
            <h2>500+</h2>
            <p>Well Known Developers</p>
          </div>

          <div className="div1">
            <h2>24/7</h2>
            <p>Service</p>
          </div>
        </div>
      </section>

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <Image
              src={DesignImage}
              width={"400"}
              height={"500"}
              alt="Design Image"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how *Your Comapny Name* can help your business
              thrive in the digital age.
            </p>
            <div className="btn btn-group">
              <Link href={"/contact"}>
                <button className="btn">connect now</button>
              </Link>

              <Link href={"/services"}>
                <button className="btn secondary-btn">learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
