import dbConn from "@/utils/dbConn";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { username, email, phone, password } = await request.json();

    dbConn();

    // console.log({ username, email, phone, password });

    const userExist = await User.findOne({ email });

    // console.log(userExist);

    if (userExist) {
      return NextResponse.json(
        {
          message: "Email Already Exist!",
        },
        {
          status: 400,
        }
      );
    } else {
      //Hashing a password

      const salt = await bcrypt.genSalt(10);

      const hash_password = await bcrypt.hash(password, salt);

      await User.create({ username, email, phone, password: hash_password });

      const dataForJWT = await User.findOne({ email });

      // console.log(dataForJWT);

      // Generating a JWT

      const user = {
        userid: dataForJWT._id.toString(),
        email: dataForJWT.email,
        nameForFrontend: dataForJWT.username,
      };

      // console.log(user);
      // console.log(user.userid);

      const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY);

      return NextResponse.json(
        {
          message: "Data Saved Successfully",
          authToken: authToken,
          userid: user.userid,
          nameForFrontend: user.nameForFrontend,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
