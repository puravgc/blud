"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet (only on the client side)
const Leaflet = dynamic(() => import("leaflet"), { ssr: false });

interface LocationPickerProps {
  setSelectedLocation: (location: [number, number]) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ setSelectedLocation }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation([27.7172, 85.324]); // Default to Kathmandu
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setUserLocation([27.7172, 85.324]);
    }
  }, []);

  useEffect(() => {
    if (userLocation && isOpen) {
      import("leaflet").then((L) => {
        const map = L.map("map").setView(userLocation, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: "/marker.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        const marker = L.marker(userLocation, { icon: customIcon }).addTo(map);

        map.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          setPickedLocation([lat, lng]);
          marker.setLatLng([lat, lng]);
          marker
            .bindPopup(`Picked Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
        });

        return () => {
          map.remove();
        };
      });
    }
  }, [userLocation, isOpen]);

  const handleConfirm = () => {
    if (pickedLocation) {
      setSelectedLocation(pickedLocation);
      setIsOpen(false);
    } else {
      alert("Please pick a location on the map.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
      >
        Pick your location
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <div className="mt-5">
              <div
                id="map"
                className="h-80 w-full rounded-lg shadow-lg overflow-hidden"
              />
            </div>
            {pickedLocation && (
              <div className="mt-4 text-center">
                <p>
                  <strong>Picked Location:</strong>{" "}
                  {pickedLocation[0].toFixed(4)}, {pickedLocation[1].toFixed(4)}
                </p>
              </div>
            )}
            <div className="mt-4 text-center">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
