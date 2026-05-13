import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  console.log("Looking for:", username, password);

  const user = await prisma.user.findFirst({
    where: { user_name: username, password: password },
  });

  console.log("Found user:", user);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}