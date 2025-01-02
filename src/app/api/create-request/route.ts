import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import RequestModel from "@/model/RequestModel";

export async function POST(req: NextRequest) {
  try {
    const { bloodGroup, address, hospital } = await req.json();

    await connectToDatabase();

    const newRequest = await RequestModel.create({
      bloodGroup,
      address,
      hospital,
    });

    return NextResponse.json({ newRequest, status: 201, success: true });
  } catch (error: any) {
    console.error("Error in POST /api/route:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
