"use client";

import Image from "next/image";
import jwlogo from "../images/jw-logo.jpeg";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="flex justify-center text-center">
      <div>
        <Image src={jwlogo} alt="JW Logo" />
        <label>Username</label><br />
        <input value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
}