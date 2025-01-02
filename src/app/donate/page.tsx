"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

const Page = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [data, setdata] = useState([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Check the error code to identify the issue
          if (error.code === error.PERMISSION_DENIED) {
            alert("Permission denied. Please enable location services.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location unavailable. Try again later.");
          } else if (error.code === error.TIMEOUT) {
            alert("Request timed out. Please try again.");
          } else {
            alert("An unknown error occurred while retrieving location.");
          }

          // Fallback to a default location (Kathmandu)
          setUserLocation([27.7172, 85.324]);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      // Fallback to a default location (Kathmandu)
      setUserLocation([27.7172, 85.324]);
    }
  }, []);

  useEffect(() => {
    const getRequests = async () => {
      const fetchedData = await fetch("/api/get-request");
      const data = await fetchedData.json();
      setdata(data);
    };
    getRequests();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const map = L.map("map").setView(userLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Use a custom marker from the public folder
      const customIcon = L.icon({
        iconUrl: "/marker.png", // Custom marker image located in the public folder
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Position of the icon
        popupAnchor: [1, -34], // Adjust popup position
      });

      L.marker(userLocation, { icon: customIcon })
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();

      return () => {
        map.remove();
      };
    }
  }, [userLocation]);

  const bloodRequests = [
    {
      sn: 1,
      bloodGroup: "A+",
      address: "Kathmandu, Nepal",
      hospitalName: "Grande Hospital",
    },
    {
      sn: 2,
      bloodGroup: "O-",
      address: "Pokhara, Nepal",
      hospitalName: "Manipal Hospital",
    },
    {
      sn: 3,
      bloodGroup: "B+",
      address: "Biratnagar, Nepal",
      hospitalName: "Birat Nursing Home",
    },
    {
      sn: 4,
      bloodGroup: "AB-",
      address: "Lalitpur, Nepal",
      hospitalName: "Patan Hospital",
    },
  ];

  return (
    <div className="p-5 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Blood Donation Requests
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table Section */}
        <div className="lg:w-1/2">
          <table className="table-auto w-full border-collapse border-spacing-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700 rounded-lg">
                <th className="py-3 px-4 text-left rounded-tl-lg">S.N</th>
                <th className="py-3 px-4 text-left">Blood Group</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Hospital</th>
                <th className="py-3 px-4 text-center rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request, index) => (
                <tr key={index} className="bg-white shadow-md rounded-lg my-2">
                  <td className="py-3 px-4 rounded-l-lg">{index + 1}</td>
                  <td className="py-3 px-4">{request.bloodGroup}</td>
                  <td className="py-3 px-4">{request.address}</td>
                  <td className="py-3 px-4">{request.hospitalName}</td>
                  <td className="py-3 px-4 text-center rounded-r-lg">
                    <Link href={`/donate/${request._id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-full shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Donate
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Map Section */}
        <div className="lg:w-1/2">
          <div
            id="map"
            className="h-80 w-full rounded-lg shadow-lg overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
