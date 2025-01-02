import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/UserModel";
import connectToDatabase from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    await connectToDatabase();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.status(404).json({ message: "User not found" });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
