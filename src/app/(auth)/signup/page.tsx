"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocationPicker from "@/components/location/Location";

const SignupPage = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalCode, setHospitalCode] = useState("");
  const [address, setAddress] = useState("");

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

  const handleSubmit = async () => {
    if (!selectedLocation) {
      toast.error("Please select your hospital's location.");
      return;
    }

    const data = {
      name,
      email,
      password,
      hospitalCode,
      address,
      location: selectedLocation,
    };

    try {
      const fetchedData = await fetch("/api/create-hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await fetchedData.json();

      if (responseData.success) {
        toast.success("Hospital created successfully. You can now log in.");
        router.push("/login");
      } else {
        toast.error(responseData.error || "Failed to create hospital.");
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
      toast.error("An error occurred while creating the hospital.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center min-h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">
              Hospital Signup
            </CardTitle>
            <p className="text-gray-500">
              Create your account to start helping save lives.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Hospital Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={hospitalCode}
                onChange={(e) => setHospitalCode(e.target.value)}
                type="text"
                placeholder="Enter your hospital code"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter your address"
                className="mt-1"
                required
              />
            </div>
            <LocationPicker setSelectedLocation={setSelectedLocation} />
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="button" onClick={handleSubmit} className="w-full">
              Signup as Hospital
            </Button>
          </CardFooter>
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
