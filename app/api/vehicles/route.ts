import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { fname, lname, rego_number, car_year, car_make, car_model } = await req.json();

    const vehicle = await prisma.vehicle.create({
      data: {
        fname,
        lname,
        rego_number,
        car_year: parseInt(car_year),
        car_make,
        car_model,
      },
    });

    return NextResponse.json({
  ...vehicle,
  id: vehicle.id.toString(),
});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}