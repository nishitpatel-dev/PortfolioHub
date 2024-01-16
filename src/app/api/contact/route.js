import Contact from "@/model/Contact";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, message } = await request.json();

    await dbConn();

    await Contact.create({ username, email, message });

    return NextResponse.json(
      {
        message: "Data Send Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Some Error Occured",
        error,
      },
      {
        status: 400,
      }
    );
  }
}
