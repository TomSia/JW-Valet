"use client";

import Image from "next/image";
import jwlogo from "../images/jw-logo.jpeg";
import { useState } from "react";

// Split into a client component for the overlay
export default function VehicleClient({ vehicle }: { vehicle: any }) {
  const [overlay, setOverlay] = useState<"now" | "later" | null>(null);

  return (
    <main className="flex justify-center text-center">
      <form key={vehicle.id}>
        <Image src={jwlogo} alt="JW Logo" />
        <h1 className="text-3xl mb-6">{vehicle.fname} {vehicle.lname}</h1>
        <h1 className="text-xl mb-2">Vehicle Details</h1>
        <h2>{vehicle.rego_number}</h2>
        <h2 className="mb-2">{vehicle.car_year} {vehicle.car_make} {vehicle.car_model}</h2>
        <label>Request Car</label><br />
        <button type="button" onClick={() => setOverlay("now")}>Now</button>
        <p>OR</p>
        <button type="button" onClick={() => setOverlay("later")}>Later</button>
      </form>

      {overlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-grey p-8 rounded text-center">
            {overlay === "now" ? (
              <>
                <h2>Car has been requested.</h2>
                <p>Your car will be ready in 5 minutes</p>
              </>
            ) : (
              <>
                <h2>Schedule your car for later.</h2>
                <select className="w-30">
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                </select><br></br>
                <select className="w-30">
                    <option value="930">9:30AM</option>
                    <option value="1000">10:00AM</option>
                </select><br></br>
                <button className="p-2 bg-white text-black mt-2" type="button">Confirm</button><br></br>

              </>
            )}
            <button className="p-2 bg-white text-black mt-2" type="button" onClick={() => setOverlay(null)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}