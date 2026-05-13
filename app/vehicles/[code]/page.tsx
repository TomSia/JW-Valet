import Image from "next/image";
import jwlogo from "../../images/jw-logo.jpeg"
import { prisma } from "@/src/lib/prisma";

export default async function Vehicle({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const vehicle = await prisma.vehicle.findFirst({
    where: { code }
  });
  
   if (!vehicle) return <h1>Vehicle not found</h1>;

  return (
    <main className="flex justify-center text-center">
      <form key={vehicle.id}>
        <Image src={jwlogo} alt="JW Logo"/>
        <h1 className="text-3xl mb-6">{vehicle.fname} {vehicle.lname}</h1>
        <h1 className="text-xl mb-2">Vehicle Details</h1>
        <h2>{vehicle.rego_number}</h2>
        <h2 className="mb-2">{vehicle.car_year} {vehicle.car_make} {vehicle.car_model}</h2>
        <label>Request Car</label><br></br>
        <button>Now</button>
        <button>Later</button>
      </form>
    </main>
  );
}