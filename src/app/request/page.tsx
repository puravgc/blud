"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RequestDonationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [donationRequests, setDonationRequests] = useState<string[][]>([""]);
  const [urgency, setUrgency] = useState<string>("Normal");

  const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

  const handleAddBloodGroup = () => {
    setDonationRequests((prevRequests) => [...prevRequests, []]);
  };

  const handleBloodTypeChange = (index: number, value: string) => {
    const updatedRequests = [...donationRequests];
    updatedRequests[index] = [value];
    setDonationRequests(updatedRequests);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const flatDonationRequests = donationRequests.map((request) => request[0]);
    try {
      const fetchData = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          donationRequests: flatDonationRequests,
          urgency,
        }),
      });
      const responseData = await fetchData.json();
      setLoading(false);
      console.log(responseData);
    } catch (error) {
      toast.error("Failed to request blood donation.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-8">
      <Card className="w-full max-w-lg shadow-lg py-8">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">
            Request Blood Donation
          </CardTitle>
          <p className="text-gray-500">
            Fill out the form below to request a blood donation.
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Blood Type Dropdowns */}
            <div className="space-y-4">
              {donationRequests.map((request, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Select
                    value={request[0] || ""}
                    onValueChange={(value) =>
                      handleBloodTypeChange(index, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((bloodType) => (
                        <SelectItem key={bloodType} value={bloodType}>
                          {bloodType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {/* Add another blood group dropdown */}
            <div className="text-center mt-4">
              <Button
                type="button"
                onClick={handleAddBloodGroup}
                className="bg-blue-500 text-white w-full"
              >
                + Add Another Blood Group
              </Button>
            </div>

            {/* Urgency Dropdown */}
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium">
                Urgency
              </label>
              <select
                id="urgency"
                className="mt-1"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                required
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-6">
            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Donation Requests"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RequestDonationPage;
