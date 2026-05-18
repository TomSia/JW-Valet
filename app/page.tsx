"use client";

import Image from "next/image";
import jwlogo from "./images/jw-logo.jpeg";
import { useRouter } from "next/navigation";
import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

export default function Home() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleEnter = () => {
    const code = digits.join("");
    if (code.length === 6) {
      router.push(`/vehicles/${code}`);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Only allow alphanumeric
    const char = value.replace(/[^a-zA-Z0-9]/g, "").slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto-advance
    if (char && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 6)
      .split("");

    const updated = Array(6).fill("");
    pasted.forEach((char, i) => (updated[i] = char));
    setDigits(updated);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <main className="flex justify-center text-center">
      <div>
        <div className="flex justify-center mb-6">
          <Image src={jwlogo} alt="JW Logo" width={160} height={80} className="object-contain" />
        </div>
        <h2 className="text-3xl font-semibold">Car Request</h2>
        <h3>Please enter your 6-digit code</h3>

        <div className="flex gap-3 justify-center my-6">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`
                w-10 h-14 text-center text-2xl font-semibold bg-transparent
                border-b-2 outline-none caret-transparent
                transition-colors duration-150
                ${digit ? "border-black" : "border-gray-300"}
                focus:border-black
              `}
            />
          ))}
        </div>

        <button
          onClick={handleEnter}
          className="mt-4 w-full py-3 bg-white text-gray-800 font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-gray-100 transition-colors"
        >
          Enter
        </button>
      </div>
    </main>
  );
}