import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { fname, lname, rego_number, car_year, car_make, car_model, code } = await req.json();

    if (!code || code.length !== 6) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.upsert({
      where: { code },
      update: {
        fname,
        lname,
        rego_number,
        car_year: parseInt(car_year),
        car_make,
        car_model,
        status: "Parked",
      },
      create: {
        code,
        fname,
        lname,
        rego_number,
        car_year: parseInt(car_year),
        car_make,
        car_model,
        status: "Parked",
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