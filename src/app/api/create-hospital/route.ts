import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import Hospital from "@/model/HostpitalModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let {
      name,
      email,
      password,
      hospitalCode,
      address,
      location,
      bloodRequested,
      bloodGroupRequested,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !hospitalCode ||
      !location ||
      !address
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Ensure location is an array of latitude and longitude
    if (!Array.isArray(location) || location.length !== 2) {
      return NextResponse.json(
        { error: "Location must be an array with latitude and longitude." },
        { status: 400 }
      );
    }

    // Ensure bloodGroupRequested is an array of strings
    if (Array.isArray(bloodGroupRequested)) {
      // No need to map to an object, just keep as an array of strings
      bloodGroupRequested = bloodGroupRequested.map((group) => group);
    }

    await connectToDatabase();

    // Check if a hospital with this email already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return NextResponse.json(
        { error: "A hospital with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new hospital
    const newHospital = new Hospital({
      name,
      email,
      password: hashedPassword,
      hospitalCode,
      address,
      location: {
        type: "Point",
        coordinates: location,
      },
      bloodRequested,
      bloodGroupRequested, // Store as an array of strings
    });

    await newHospital.save();

    return NextResponse.json(
      {
        message: "Hospital registered successfully.",
        hospital: newHospital,
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
