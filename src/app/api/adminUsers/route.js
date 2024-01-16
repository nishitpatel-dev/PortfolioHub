import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
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

      const adminUser = await collection.findOne(
        { email: isverified.email },
        { password: 0 }
      );

      // console.log(adminUser);

      if (adminUser.isAdmin) {
        const userData = await collection.find({}, { password: 0 }).toArray();

        return NextResponse.json(
          {
            message: "Data Fetched Successfully",
            userData: userData,
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
  const { uid, id } = await request.json();

  try {
    const dbName = client.db("mernweb");
    const collection = dbName.collection("users");

    // console.log(uid);
    // console.log(id);

    if (uid == id) {
      return NextResponse.json(
        {
          message: "You Can't Delete Yourself!",
          invalidUser: true,
        },
        {
          status: 400,
        }
      );
    } else {
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

export async function POST(request) {
  const { uid } = await request.json();

  try {
    const dbName = client.db("mernweb");
    const collection = dbName.collection("users");

    const oid = new ObjectId(uid);

    const userData = await collection.findOne({ _id: oid });

    // console.log(userData);

    return NextResponse.json(
      {
        message: "Data Fetched Successfully",
        userData: userData,
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

export async function PATCH(request) {
  const { username, email, phone, uid } = await request.json();

  try {
    const dbName = client.db("mernweb");
    const collection = dbName.collection("users");

    const oid = new ObjectId(uid);

    const updatedData = await collection.updateMany(
      { _id: oid },
      {
        $set: { username: username, email: email, phone: phone },
      }
    );

    console.log(updatedData);

    return NextResponse.json(
      {
        message: "Data Updated Successfully",
        updatedData: updatedData,
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
