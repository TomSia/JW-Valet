import Image from "next/image";
import jwlogo from "../images/jw-logo.jpeg"


export default function LogIn() {
  return (
    <main className="flex justify-center text-center">
      <form>
        <Image src={jwlogo} alt="JW Logo"/>
        <label>Username</label><br></br>
        <input/><br></br>
        <label>Password</label><br></br>
        <input/><br></br>
        <button>Login</button>
      </form>
    </main>
  );
}