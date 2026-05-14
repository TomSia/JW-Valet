"use client";

import Link from "next/link";
import { useState } from "react";

type Vehicle = {
  id: string;
  fname: string | null;
  lname: string | null;
  car_year: number | null;
  car_make: string | null;
  car_model: string | null;
  rego_number: string | null;
};

export default function DashboardClient({ requestedVehicles }: { requestedVehicles: Vehicle[] }) {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState(requestedVehicles);

  const handleGone = async () => {
    if (!selected) return;

    await fetch("/api/vehicles/status", {
      method: "POST",
      body: JSON.stringify({ id: selected.id, status: "Gone" }),
      headers: { "Content-Type": "application/json" },
    });

    setVehicles(vehicles.filter((v) => v.id !== selected.id));
    setSelected(null);
  };

  return (
    <main className="text-center">
      <h1 className="text-xl mt-4 mb-6">Vehicles needing to be moved.</h1>

      {vehicles.length === 0 ? (
        <p>No vehicles currently requested.</p>
      ) : (
        vehicles.map((v) => (
          <div key={v.id} className="cursor-pointer p-4 border mb-2" onClick={() => setSelected(v)}>
            <p>{v.fname} {v.lname} — {v.car_year} {v.car_make} {v.car_model} ({v.rego_number})</p>
          </div>
        ))
      )}

      <Link href="/admin/dashboard/register">
        <button className="p-4 bg-black rounded-sm font-bold">Register a Vehicle.</button>
      </Link>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-grey p-8 rounded text-center">
            <h2 className="text-xl mb-4">Has this vehicle been taken?</h2>
            <p className="mb-4">{selected.fname} {selected.lname} — {selected.car_year} {selected.car_make} {selected.car_model}</p>
            <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleGone}>Yes, mark as Gone</button>
            <button className="bg-gray-300 p-2 rounded" onClick={() => setSelected(null)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}