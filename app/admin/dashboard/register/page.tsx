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
    <main className="text-center p-4">
    <form>
        <h1 className="text-xl mt-5 mb-4">Register a valet vehicle.</h1>
        <h2 className="text-lg">Enter Customer Details</h2>
      <label>First Name</label><br />
      <input name="fname" value={form.fname} onChange={handleChange} /><br />
      <label>Last Name</label><br />
      <input name="lname" value={form.lname} onChange={handleChange} required/><br />
      <h2 className="text-lg">Enter Vehicle Details</h2>
      <label>Number Plate</label><br />
      <input name="rego_number" value={form.rego_number} onChange={handleChange} required/><br />
      <label>Year</label><br />
      <input name="car_year" value={form.car_year} onChange={handleChange} /><br />
      <label>Make</label><br />
      <input name="car_make" value={form.car_make} onChange={handleChange} required/><br />
      <label>Model</label><br />
      <input name="car_model" value={form.car_model} onChange={handleChange} /><br />
      {message && <p>{message}</p>}
      <button className="p-4 bg-black mt-5" onSubmit={handleSubmit}>Register Vehicle</button>
      </form>
    </main>
  );
}