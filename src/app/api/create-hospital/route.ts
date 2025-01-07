import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import Hospital from "@/model/HostpitalModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, hospitalCode, location } = body;

    if (!name || !email || !password || !hospitalCode || !location) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the hospital already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return NextResponse.json(
        { error: "A hospital with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new hospital
    const newHospital = new Hospital({
      name,
      email,
      password: hashedPassword,
      hospitalCode,
      location: {
        type: "Point",
        coordinates: location, // [longitude, latitude]
      },
    });

    await newHospital.save();

    return NextResponse.json(
      {
        message: "Hospital registered successfully.",
        hospital: {
          id: newHospital._id,
          name: newHospital.name,
          email: newHospital.email,
          location: newHospital.location,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hospital:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the hospital." },
      { status: 500 }
    );
  }
}
