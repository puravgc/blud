"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hospitalCode, sethospitalCode] = useState();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      } else {
        return;
      }
    };
    checkLogin();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    try {
      const fetchedData = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, hospitalCode }),
      });
      const responseData = await fetchedData.json();
      if (responseData.success === true) {
        const token = responseData.token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        router.push("/");
        toast.success(responseData.message);
      } else {
        toast.error(responseData.error || "Failed to login.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
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
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
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
                  onChange={(event) => {
                    sethospitalCode(event.target.value);
                  }}
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login as Hospital"}
              </Button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
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
