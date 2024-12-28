import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border w-screen shadow-xl rounded-2xl top-0 left-0 z-50 fixed">
      <div className="flex justify-around items-center mt-2 mb-2 w-full">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <h1 className="text-4xl font-bold">
            <span className="text-red-500">B</span>LUD
          </h1>
        </div>

        <div className=" text-lg w-1/2">
          <ul className="flex justify-evenly gap-4">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
