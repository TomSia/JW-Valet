"use client";

import Image from "next/image";
import jwlogo from "../images/jw-logo.jpeg";
import { useState } from "react";

export default function VehicleClient({ vehicle }: { vehicle: any }) {
  const [overlay, setOverlay] = useState<"now" | "later" | null>(null);
  const [requested, setRequested] = useState(false);

  const handleRequestNow = async () => {
    await fetch("/api/vehicles/status", {
      method: "POST",
      body: JSON.stringify({ id: vehicle.id, status: "Requested" }),
      headers: { "Content-Type": "application/json" },
    });
    setRequested(true);
    setOverlay("now");
  };

  return (
    <main className="min-h-screen flex flex-col items-center text-center px-8 pt-10 text-white">

      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Image src={jwlogo} alt="JW Logo" width={160} height={80} className="object-contain" />
      </div>

      {/* Guest name */}
      <h1 className="text-4xl font-light tracking-wide mb-8">
        {vehicle.fname} {vehicle.lname}
      </h1>

      {/* Divider */}
      <div className="w-16 border-t border-white/30 mb-8" />

      {/* Vehicle details card */}
      <div className="w-full max-w-xs bg-white/10 rounded-lg px-6 py-5 mb-10 backdrop-blur-sm">
        <p className="text-xs tracking-widest uppercase text-white/60 mb-3">Vehicle Details</p>
        <p className="text-lg font-semibold tracking-wider">{vehicle.rego_number}</p>
        <p className="text-white/80 mt-1">
          {vehicle.car_year} {vehicle.car_make} {vehicle.car_model}
        </p>
      </div>

      {/* Request buttons */}
      <p className="text-xs tracking-widest uppercase text-white/60 mb-4">Request Car</p>
      <div className="flex items-center gap-4 w-full max-w-xs">
        <button
          onClick={handleRequestNow}
          disabled={requested}
          className="flex-1 py-3 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all
            bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {requested ? "Requested ✓" : "Now"}
        </button>
        <span className="text-white/40 text-sm">or</span>
        <button
          onClick={() => setOverlay("later")}
          className="flex-1 py-3 rounded-sm font-semibold tracking-widest uppercase text-sm transition-all
            border border-white/50 text-white hover:bg-white/10"
        >
          Later
        </button>
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-8 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-lg px-8 py-8 text-center text-white"
            style={{ backgroundColor: "#6b6560" }}>

            {overlay === "now" ? (
              <>
                <div className="text-4xl mb-4">🚗</div>
                <h2 className="text-xl font-semibold mb-2">Car Requested</h2>
                <p className="text-white/70 text-sm mb-6">Your car will be ready in approximately 5 minutes.</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-1">Schedule for Later</h2>
                <p className="text-white/60 text-sm mb-5">Choose a time and we'll have your car ready.</p>
                <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm mb-3 outline-none">
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                </select>
                <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm mb-6 outline-none">
                  <option value="930">9:30 AM</option>
                  <option value="1000">10:00 AM</option>
                </select>
                <button
                  className="w-full py-3 bg-white text-gray-800 font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-gray-100 transition-colors mb-3"
                  type="button"
                >
                  Confirm
                </button>
              </>
            )}

            <button
              className="w-full py-2 border border-white/30 text-white/70 text-sm rounded-sm hover:bg-white/10 transition-colors"
              type="button"
              onClick={() => setOverlay(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}