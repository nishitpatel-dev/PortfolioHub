import User from "@/model/User";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {

  try {
    const { email, password } = await request.json();

    dbConn();

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return NextResponse.json(
        {
          message: "Try To Login With Diffrent Credentials",
        },
        {
          status: 400,
        }
      );
    } else {
      const securePassword = await bcrypt.compare(password, userExist.password);

      //   console.log(securePassword);

      if (!securePassword) {
        return NextResponse.json(
          {
            message: "Try To Login With Diffrent Credentials",
          },
          {
            status: 400,
          }
        );
      } else {
        const user = {
          userid: userExist._id.toString(),
          email: userExist.email,
          nameForFrontend: userExist.username,
        };

        const jsonWebToken = jwt.sign(user, process.env.JWT_SECRET_KEY);

        return NextResponse.json(
          {
            message: "Login Success",
            authToken: jsonWebToken,
            userid: user.userid,
            nameForFrontend: user.nameForFrontend,
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
