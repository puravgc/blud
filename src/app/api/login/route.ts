import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import HospitalModel from "@/model/HostpitalModel";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, hospitalCode } = body;
    if (!email || !password || !hospitalCode) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const user = await HospitalModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, hospitalCode },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      {
        message: "Login successful.",
        token: token,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/login:", error);
    return NextResponse.json(
      { error: "An error occurred while logging in.", success: false },
      { status: 500 }
    );
  }
}
