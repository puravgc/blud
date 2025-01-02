"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const userName = user?.fullName || user?.firstName || "User";

  return (
    <div className="border w-screen shadow-xl rounded-2xl top-0 left-0 z-50 fixed">
      <div className="flex justify-around items-center mt-2 mb-2 w-full">
        <Link href={"/"}>
          <div className="w-1/2 flex justify-center items-center">
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
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
            {/* Signed-out users */}
            <SignedOut>
              <DropdownMenu>
                <DropdownMenuTrigger>Login</DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <Link href="/login">
                    <DropdownMenuItem>Login as hospital</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <SignInButton>Login as donor</SignInButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedOut>

            {/* Signed-in users */}
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: { userButtonTrigger: "w-8 h-8 rounded-full" },
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <DropdownMenuItem>
                    <Link href="/details">
                      <button className="w-full text-left">Details</button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>
                      <button className="w-full text-left">Sign Out</button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
