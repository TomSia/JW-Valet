"use client";

import { useState } from "react";

export default function Dashboard() {
  const [form, setForm] = useState({
    fname: "", lname: "", rego_number: "", car_year: "", car_make: "", car_model: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Car registered successfully!");
      setForm({ fname: "", lname: "", rego_number: "", car_year: "", car_make: "", car_model: "" });
    } else {
      setMessage("Something went wrong.");
    }
  };

  return (
    <main>
      <label>Enter Customer firstname</label><br />
      <input name="fname" value={form.fname} onChange={handleChange} /><br />
      <label>Enter Customer lastname</label><br />
      <input name="lname" value={form.lname} onChange={handleChange} /><br />
      <label>Enter Car Rego</label><br />
      <input name="rego_number" value={form.rego_number} onChange={handleChange} /><br />
      <label>Enter Car Year</label><br />
      <input name="car_year" value={form.car_year} onChange={handleChange} /><br />
      <label>Enter Car Make</label><br />
      <input name="car_make" value={form.car_make} onChange={handleChange} /><br />
      <label>Enter Car Model</label><br />
      <input name="car_model" value={form.car_model} onChange={handleChange} /><br />
      {message && <p>{message}</p>}
      <button onClick={handleSubmit}>Register Car</button>
    </main>
  );
}