import { NextRequest, NextResponse } from "next/server";
import Hospital from "@/model/HostpitalModel";
import connectToDatabase from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    if (!id) {
      const requests = await Hospital.find({});
      return NextResponse.json(requests);
    }
    const hospital = await Hospital.findOne({ _id: id });
    if (!hospital) {
      return NextResponse.json({ message: "hospital not found" });
    }
    return NextResponse.json(hospital);
  } catch (error: any) {
    console.error("Error in GET /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
