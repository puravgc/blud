"use client";

import { useUser } from "@clerk/nextjs";
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
import { useRouter } from "next/navigation";

const DetailsPage = () => {
  const { user, isSignedIn } = useUser();
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setloading] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      user.primaryEmailAddress &&
      user.primaryEmailAddress.emailAddress
    ) {
      const getDetails = async () => {
        try {
          const response = await fetch(
            `/api/get-user?email=${user.primaryEmailAddress.emailAddress}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch details");
          }

          const data = await response.json();
          setBloodGroup(data.bloodGroup);
          setMedicalConditions(data.medicalConditions);
          setAdditionalInfo(data.additionalInfo);
          console.log(data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };

      getDetails();
    } else {
      console.log("Waiting for user object to load");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      console.log({
        name: user.firstName + " " + user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        bloodGroup: bloodGroup,
        medicalConditions: medicalConditions,
        additionalInfo: additionalInfo,
      });
      const fetchedData = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.firstName + " " + user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          bloodGroup,
          medicalConditions,
          additionalInfo,
        }),
      });
      const data = await fetchedData.json();
      setloading(false);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
      setloading(false);
    }
  };

  if (!isSignedIn || !user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg py-8">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">User Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={user.firstName + " " + user.lastName}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={user.primaryEmailAddress?.emailAddress || ""}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium">
                Blood Group
              </label>
              <Input
                id="bloodGroup"
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="Enter your blood group"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label
                htmlFor="medicalConditions"
                className="block text-sm font-medium"
              >
                Medical Conditions
              </label>
              <Input
                id="medicalConditions"
                type="text"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                placeholder="Enter any medical conditions"
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium"
              >
                Additional Information
              </label>
              <Input
                id="additionalInfo"
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter any additional info"
                className="mt-1"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-6">
            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Submit Details"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DetailsPage;
