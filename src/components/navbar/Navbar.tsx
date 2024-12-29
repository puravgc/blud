"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const userName = user?.fullName || user?.firstName || "User";
  console.log(userName);
  return (
    <div className="border w-screen shadow-xl rounded-2xl top-0 left-0 z-50 fixed">
      <div className="flex justify-around items-center mt-2 mb-2 w-full">
        <Link href={"/"}>
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
        </Link>

        <div className="text-lg w-1/2">
          <ul className="flex justify-evenly gap-4">
            <Link href="/">
              <li>Home</li>
            </Link>
            <SignedOut>
              <DropdownMenu>
                <DropdownMenuTrigger>Login</DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <Link href="/login">
                    <DropdownMenuItem>Login as hospital</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <SignInButton>Login as donator</SignInButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: { userButtonTrigger: "w-8 h-8 rounded-full" },
                }}
              />
            </SignedIn>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
