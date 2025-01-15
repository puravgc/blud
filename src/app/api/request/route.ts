import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import jwt from "jsonwebtoken";
import HospitalModel from "@/model/HostpitalModel";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { donationRequests, urgency } = await req.json();
    const flatDonationRequests = donationRequests.flat();
    console.log(flatDonationRequests);
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    let decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken || typeof decodedToken.userId !== "string") {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
    const hospital = await HospitalModel.findByIdAndUpdate(
      decodedToken.userId,
      {
        bloodGroupRequested: donationRequests,
        urgency: urgency,
      }
    );
    if (!hospital) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid hospital" },
        { status: 401 }
      );
    }
    if (hospital.bloodGroupRequested.length > 0) {
      hospital.bloodRequested = true;
    } else {
      hospital.bloodRequested = false;
    }

    return NextResponse.json({ hospitalData: hospital, success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
