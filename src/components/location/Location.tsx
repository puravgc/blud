"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPickerProps {
  setSelectedLocation: (location: [number, number]) => void; // Callback to return the selected location
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  setSelectedLocation,
}) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
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
    if (userLocation && isOpen) {
      const map = L.map("map").setView(userLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Use a custom marker
      const customIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const marker = L.marker(userLocation, { icon: customIcon }).addTo(map);

      // Update the marker position on map click
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setPickedLocation([lat, lng]); // Set the picked location
        marker.setLatLng([lat, lng]); // Move the marker to the picked location
        marker
          .bindPopup(`Picked Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
          .openPopup();
      });

      return () => {
        map.remove();
      };
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
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
      >
        Pick your location
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-5 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Map Section */}
            <div className="mt-5">
              <div
                id="map"
                className="h-80 w-full rounded-lg shadow-lg overflow-hidden"
              />
            </div>

            {/* Display picked location */}
            {pickedLocation && (
              <div className="mt-4 text-center">
                <p>
                  <strong>Picked Location:</strong>{" "}
                  {pickedLocation[0].toFixed(4)}, {pickedLocation[1].toFixed(4)}
                </p>
              </div>
            )}

            {/* Confirm Button */}
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
