import { MongoClient, ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URL);

export async function GET() {
  const headersList = headers();
  const headData = headersList.get("Authorization");
  // console.log(headData);

  try {
    const jwtToken = headData.replace("Bearer", "").trim();

    const isverified = Jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (isverified) {
      const dbName = client.db("mernweb");
      const collection = dbName.collection("users");
      const collection2 = dbName.collection("contacts");

      const adminUser = await collection.findOne(
        { email: isverified.email },
        { password: 0 }
      );

      // console.log(adminUser);

      if (adminUser.isAdmin) {
        const contactData = await collection2.find({}).toArray();

        console.log(contactData);

        return NextResponse.json(
          {
            message: "Data Fetched Successfully",
            contactData: contactData,
            dataReceived: true,
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "Invallid, User Is Not An Admin.",
            validUser: false,
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
        message: error,
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(request) {
  const { uid } = await request.json();

  try {
    const dbName = client.db("mernweb");
    const collection = dbName.collection("contacts");

    const objectId = new ObjectId(uid);
    console.log(objectId);

    const userData = await collection.deleteOne({ _id: objectId });
    console.log(userData);

    return NextResponse.json(
      {
        message: userData,
        extraMessage: "Data Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 400,
      }
    );
  }
}
