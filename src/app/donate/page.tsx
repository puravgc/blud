"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Dynamically import Leaflet to prevent SSR issues
const LeafletMap = dynamic(() => import("@/components/leafletmap/LeafletMap"), {
  ssr: false,
});

const Page = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setloading(false);
        },
        (error) => {
          console.error("Error getting location: ", error);

          if (error.code === error.PERMISSION_DENIED) {
            alert("Permission denied. Please enable location services.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location unavailable. Try again later.");
          } else if (error.code === error.TIMEOUT) {
            alert("Request timed out. Please try again.");
          } else {
            alert("An unknown error occurred while retrieving location.");
          }
          setloading(false);
          setUserLocation([27.7172, 85.324]);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");

      setUserLocation([27.7172, 85.324]);
    }
  }, []);

  useEffect(() => {
    const getRequests = async () => {
      const fetchedData = await fetch("/api/get-hospital");
      const data = await fetchedData.json();
      setdata(data);
      console.log(data);
      data.forEach((request: any) => {
        console.log(request.location.coordinates);
      });
    };
    getRequests();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Blood Donation Requests
      </h1>
      <div className="p-5 bg-gray-100 min-h-screen font-sans flex flex-col gap-8">
        {/* Table Section */}
        <div className="flex-grow overflow-hidden">
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[400px] border rounded-lg shadow">
              <table className="table-auto w-full border-collapse border-spacing-2 min-w-[700px]">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 rounded-lg sticky top-0 z-10">
                    <th className="py-3 px-4 text-left rounded-tl-lg">S.N</th>
                    <th className="py-3 px-4 text-left">Blood Group</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Hospital</th>
                    <th className="py-3 px-4 text-center rounded-tr-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((request, index) => (
                    <tr
                      key={index}
                      className="bg-white shadow-md rounded-lg my-2"
                    >
                      <td className="py-3 px-4 rounded-l-lg">{index + 1}</td>
                      <td className="py-3 px-4">
                        {request.bloodGroupRequested.map((grp, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-800 mr-1"
                          >
                            {grp}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 px-4">{request.address}</td>
                      <td className="py-3 px-4">{request.name}</td>
                      <td className="py-3 px-4 text-center rounded-r-lg">
                        <Link href={`/donate/${request._id}`}>
                          <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                            Donate
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-6">
          {loading ? (
            <div
              role="status"
              className="loader flex items-center justify-center min-h-[400px]"
            >
              <span>Loading...</span>
            </div>
          ) : (
            <div className="min-h-[400px] w-full rounded-lg shadow-lg">
              <LeafletMap userLocation={userLocation} data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
