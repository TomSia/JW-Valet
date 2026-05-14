import { prisma } from "@/src/lib/prisma";
import DashboardClient from "../../components/dashboardClient";

export default async function Dashboard() {
  const requestedVehicles = await prisma.vehicle.findMany({
    where: { status: "Requested" }
  });

  const serialized = requestedVehicles.map((v) => ({
    ...v,
    id: v.id.toString(),
  }));

  return (
    <main className="p-4">
        <DashboardClient requestedVehicles={serialized} />
    </main>
);
}