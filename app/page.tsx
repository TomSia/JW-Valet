import Image from "next/image";
import jwlogo from "./images/jw-logo.jpeg"

export default function Home() {
  return (
    <main className="flex justify-center text-center">
      <div>
        <Image src={jwlogo} alt="JW Logo"/>
        <h1>JW Narriot</h1>
        <h2>Car Request</h2>
        <h3>Please enter your 6-digit code,</h3>
        <div>
        <input className="long-dash-border" maxLength={6}/>
        <br></br>
        <button>Enter</button>
      </div>
      </div>
    </main>
  );
}
