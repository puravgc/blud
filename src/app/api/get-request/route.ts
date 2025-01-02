import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import RequestModel from "@/model/RequestModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const request = await RequestModel.find({});
    return NextResponse.json(request);
  } catch (error) {
    console.error("Error in GET /api/route/:id:", error);
  }
}
