"use client";

import Image from "next/image";
import jwlogo from "./images/jw-logo.jpeg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleEnter = () => {
    if (code.length === 6) {
      router.push(`/vehicles/${code}`);
    }
  };

  return (
    <main className="flex justify-center text-center">
      <div>
        <Image src={jwlogo} alt="JW Logo"/>
        <h1>JW Narriot</h1>
        <h2>Car Request</h2>
        <h3>Please enter your 6-digit code,</h3>
        <div>
          <input
            className="long-dash-border"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          />
          <br />
          <button onClick={handleEnter}>Enter</button>
        </div>
      </div>
    </main>
  );
}