import Image from "next/image";
import jwlogo from "../../images/jw-logo.jpeg"

export default function Vehicle() {
  return (
    <main className="flex justify-center text-center">
      <form>
        <Image src={jwlogo} alt="JW Logo"/>
        <h1>Vehicle Details</h1>
        <h2>Jamie Pirie</h2>
        <h2>PWG769</h2>
        <h2>2006 Lexus LFA</h2>
        <label>Request Car</label><br></br>
        <button>Now</button>
        <button>Later</button>
      </form>
    </main>
  );
}