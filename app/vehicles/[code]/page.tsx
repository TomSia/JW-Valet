import { prisma } from "@/src/lib/prisma";
import VehicleClient from "@/app/components/vehicleClient";

export default async function Vehicle({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const vehicle = await prisma.vehicle.findFirst({
    where: { code }
  });

  if (!vehicle) return <h1>Vehicle not found</h1>;

  return <VehicleClient vehicle={{ ...vehicle, id: vehicle.id.toString() }} />;
}