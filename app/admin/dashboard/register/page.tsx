"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import Image from "next/image";
import jwlogo from "../../../images/jw-logo.jpeg";

function CodeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = value.padEnd(6, "").split("").slice(0, 6);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (index: number, char: string) => {
    const sanitized = char.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(-1);
    const next = [...digits];
    next[index] = sanitized;
    onChange(next.join("").trimEnd());
    if (sanitized && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        onChange(next.join("").trimEnd());
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text")
      .replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center my-3">
      {Array(6).fill(null).map((_, i) => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el; }}
          type="text"
          inputMode="text"
          maxLength={1}
          value={digits[i] || ""}
          onChange={e => update(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-10 h-14 text-center text-xl font-bold bg-transparent text-white
            border-b-2 outline-none caret-transparent transition-colors duration-150
            border-white/30 focus:border-amber-400"
        />
      ))}
    </div>
  );
}

const inputClass = `
  w-full bg-transparent border-b border-white/30 text-white text-center py-2 outline-none
  focus:border-amber-400 transition-colors placeholder-white/30 text-sm tracking-wide
`;

export default function Dashboard() {
  const [form, setForm] = useState({
    fname: "", lname: "", rego_number: "", car_year: "", car_make: "", car_model: "", code: ""
  });
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.code.length !== 6) {
      setMessage({ text: "Please enter the full 6-digit QR code.", ok: false });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage({ text: "Vehicle registered successfully!", ok: true });
      setForm({ fname: "", lname: "", rego_number: "", car_year: "", car_make: "", car_model: "", code: "" });
    } else {
      setMessage({ text: "Something went wrong. Please try again.", ok: false });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center text-center px-8 pt-10 pb-16 text-white">

      <div className="flex justify-center mb-8">
        <Image src={jwlogo} alt="JW Logo" width={160} height={80} className="object-contain" />
      </div>

      <h1 className="text-2xl font-light tracking-wide mb-1">Register a Vehicle</h1>
      <p className="text-white/50 text-xs tracking-widest uppercase mb-8">Valet Registration</p>

      <div className="w-full max-w-xs space-y-8">

        {/* QR Code */}
        <section>
          <p className="text-xs tracking-widest uppercase text-white/50 mb-1">QR Card Code</p>
          <p className="text-white/40 text-xs mb-2">Enter the 6-digit code from the customer's QR card</p>
          <CodeInput value={form.code} onChange={code => setForm({ ...form, code })} />
        </section>

        <div className="w-16 border-t border-white/20 mx-auto" />

        {/* Customer */}
        <section>
          <p className="text-xs tracking-widest uppercase text-white/50 mb-4">Customer Details</p>
          <div className="space-y-4">
            <input name="fname" placeholder="First Name" value={form.fname}
              onChange={handleChange} className={inputClass} />
            <input name="lname" placeholder="Last Name" value={form.lname}
              onChange={handleChange} className={inputClass} />
          </div>
        </section>

        <div className="w-16 border-t border-white/20 mx-auto" />

        {/* Vehicle */}
        <section>
          <p className="text-xs tracking-widest uppercase text-white/50 mb-4">Vehicle Details</p>
          <div className="space-y-4">
            <input name="rego_number" placeholder="Number Plate" value={form.rego_number}
              onChange={handleChange} className={`${inputClass} uppercase`} />
            <input name="car_year" placeholder="Year" value={form.car_year}
              onChange={handleChange} className={inputClass} inputMode="numeric" />
            <input name="car_make" placeholder="Make" value={form.car_make}
              onChange={handleChange} className={inputClass} />
            <input name="car_model" placeholder="Model" value={form.car_model}
              onChange={handleChange} className={inputClass} />
          </div>
        </section>

        {message && (
          <p className={`text-sm ${message.ok ? "text-emerald-400" : "text-red-400"}`}>
            {message.text}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-white text-gray-800 font-semibold tracking-widest uppercase
            text-sm rounded-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Vehicle"}
        </button>
      </div>
    </main>
  );
}