"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const LoginPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hospital Login Submitted");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <Card className="w-full max-w-lg shadow-lg py-8">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Hospital Login</CardTitle>
            <p className="text-gray-500">
              Log in to your account to explore more features.
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="hospitalCode"
                  className="block text-sm font-medium"
                >
                  Hospital Code
                </label>
                <Input
                  id="hospitalCode"
                  type="text"
                  placeholder="Enter your hospital code"
                  className="mt-1"
                />
              </div>
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-6">
              <Button type="submit" className="w-full">
                Login as Hospital
              </Button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign up now
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
        <Image
          src="/loginbanner.png"
          alt="Login Illustration"
          width={700}
          height={700}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LoginPage;
