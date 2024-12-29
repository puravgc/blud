"use client";

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

const SignupPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hospital Signup Submitted");
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <Card className="w-full max-w-lg shadow-lg py-8">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Hospital Signup</CardTitle>
            <p className="text-gray-500">
              Create your account to start helping save lives.
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Hospital Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your hospital name"
                  className="mt-1"
                  required
                />
              </div>
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
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-6">
              <Button type="submit" className="w-full">
                Signup as Hospital
              </Button>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:underline"
                >
                  Log in here
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
        <Image
          src="/loginbanner.png"
          alt="Signup Illustration"
          width={700}
          height={700}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default SignupPage;
