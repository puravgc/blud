import { NextRequest, NextResponse } from "next/server";
import Hospital from "@/model/HostpitalModel";
import connectToDatabase from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const hospital = await Hospital.find({});
    if (!hospital) {
      return NextResponse.json({ message: "hospital not found" });
    }
    const sortedHospitals = hospital.sort((a, b) => {
      const urgencyOrder = { Urgent: 1, Normal: 2, undefined: 3 };
      const urgencyA = urgencyOrder[a.urgency] || 3;
      const urgencyB = urgencyOrder[b.urgency] || 3;

      return urgencyA - urgencyB;
    });

    return NextResponse.json(sortedHospitals);
  } catch (error: any) {
    console.error("Error in GET /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
