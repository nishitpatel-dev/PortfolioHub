import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URL);

export async function GET() {
  try {
    const dbName = client.db("mernweb");
    const services = dbName.collection("services");

    const query = {};

    const serviceData = await services.find(query).toArray();

    console.log(serviceData);

    return NextResponse.json(
      {
        serviceData: serviceData,
        message: "Data Fetched Successfully",
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
