"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
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
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  return (
    <div className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <Image src="/logo.png" width={40} height={30} alt="Logo" />
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-red-500">B</span>LUD
          </h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden relative z-50 focus:outline-none"
        >
          <div
            className={`w-6 h-1 bg-gray-600 rounded-full transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-gray-600 rounded-full my-1 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-gray-600 rounded-full transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0"
          } absolute top-full left-0 w-full bg-white md:static md:block md:w-auto z-40 transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0 px-6 md:px-0">
            <li>
              <Link href="/" className="text-gray-600 hover:text-red-500">
                Home
              </Link>
            </li>

            <SignedIn>
              <li className="relative">
                <Link
                  href="/emergency"
                  className="text-gray-600 hover:text-red-500"
                >
                  Emergency Donation
                </Link>
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  5
                </span>
              </li>
            </SignedIn>

            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/details"
                    className="text-gray-600 hover:text-red-500"
                  >
                    Details
                  </Link>
                </li>
                <li>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-gray-600 hover:text-red-500">
                        Sign Out
                      </button>
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
                </li>
              </>
            ) : (
              <SignedOut>
                <li>
                  <Link href="/login" className="text-gray-600 hover:text-red-500">
                    Login
                  </Link>
                </li>
              </SignedOut>
            )}

            <SignedIn>
              <li>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: { userButtonTrigger: "w-8 h-8 rounded-full" },
                  }}
                />
              </li>
            </SignedIn>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
