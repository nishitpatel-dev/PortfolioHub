import { headers } from "next/headers";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/model/User";

export async function GET(request) {
  const headersList = headers();
  const headData = headersList.get("Authorization");
  console.log(headData);

  try {
    const jwtToken = headData.replace("Bearer", "").trim();

    const isverified = Jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // console.log(jwtToken);
    // console.log(isverified);

    if (isverified) {
      const userData = await User.findOne({ email: isverified.email }).select({
        password: 0,
      });
      console.log(userData);

      if (userData.isAdmin) {
        return NextResponse.json(
          {
            userData: userData,
            message: "Valid JWT",
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "Invallid, User Is Not An Admin."
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Unauthorized Token",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unauthorized Token",
      },
      {
        status: 400,
      }
    );
  }
}
