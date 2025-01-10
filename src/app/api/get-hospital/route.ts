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
    return NextResponse.json(hospital);
  } catch (error: any) {
    console.error("Error in GET /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
