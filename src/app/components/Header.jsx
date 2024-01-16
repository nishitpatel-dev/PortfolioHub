"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {

  const pathname = usePathname();
  // console.log(pathname);
  const router = useRouter();

  return (
    <>
      <header>
        <div className="containerHeader">
          <div className="logo-brand">
            <Link href={"/"}>Your Company Logo</Link>
          </div>

          <nav>
            <ul className="flex gap-3 mr-8">
              <li>
                <Link href={"/"} className={pathname == "/" ? "active" : ""}>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href={"/about"}
                  className={pathname == "/about" ? "active" : ""}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href={"/services"}
                  className={pathname == "/services" ? "active" : ""}
                >
                  Services
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <>
                  <li>
                    <Link
                      href={"/contact"}
                      className={pathname == "/contact" ? "active" : ""}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/login"}
                      className={pathname == "/login" ? "active" : ""}
                      onClick={() => {
                        localStorage.clear()
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={"/signup"}
                      className={pathname == "/signup" ? "active" : ""}
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/login"}
                      className={pathname == "/login" ? "active" : ""}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
