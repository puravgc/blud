"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
} from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="border w-screen shadow-xl rounded-2xl top-0 left-0 z-50 fixed">
      <div className="flex justify-around items-center mt-2 mb-2 w-full">
        <Link href={"/"}>
          <div className="w-1/2 flex justify-center items-center">
            <Image src="/logo.png" width={40} height={30} alt="Logo" />
            <h1 className="text-3xl font-bold">
              <span className="text-red-500">B</span>LUD
            </h1>
          </div>
        </Link>

        <div className="text-sm w-1/2">
          <ul className="flex justify-evenly gap-4">
            <div className="flex justify-center items-center">
              <Link href="/">
                <li>Home</li>
              </Link>
            </div>

            <SignedIn>
              <div className="flex items-center relative">
                <Link href="/emergency">
                  <li>Emergency Donation</li>
                </Link>
                <div className="bg-red-500 h-5 w-5 rounded-full font-bold text-white absolute -right-5 top-0 flex justify-center text-center">
                  <p>5</p>
                </div>
              </div>
            </SignedIn>

            {/* Show links based on login status */}
            {isLoggedIn ? (
              <div className="flex justify-between w-1/3">
                <Link href="/details">
                  <li>Details</li>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild className="cursor-pointer">
                    <li>Sign Out</li>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you want to sign out?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOut}>
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
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
            )}

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
                  <Link href="/details">
                    <DropdownMenuItem>
                      <button className="w-full text-left">Details</button>
                    </DropdownMenuItem>
                  </Link>
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
