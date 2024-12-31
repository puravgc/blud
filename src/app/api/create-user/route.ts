import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import UserModel from "@/model/UserModel";
export async function POST(req: NextRequest) {
  try {
    const { name, email, bloodGroup, medicalConditions, additionalInfo } =
      await req.json();

    if (!name || !email || !bloodGroup) {
      return NextResponse.json(
        { error: "Name, email, and blood group are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newUser = await UserModel.create({
      name,
      email,
      bloodGroup,
      medicalConditions,
      additionalInfo,
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error in POST /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
