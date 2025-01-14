import React, { useEffect } from "react";
import L from "leaflet";

const LeafletMap = ({ userLocation, data }: any) => {
  useEffect(() => {
    if (userLocation) {
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

      L.marker(userLocation, { icon: customIcon })
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();

      data.forEach((request: any) => {
        if (request.location.coordinates) {
          const [lat, lng] = request.location.coordinates;

          const hospitalIcon = L.icon({
            iconUrl: "/hospital-marker.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          });
          const bloodGroups = Array.isArray(request.bloodGroupRequested)
            ? request.bloodGroupRequested.join(", ")
            : "N/A";

          L.marker([lat, lng], { icon: hospitalIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${request.name}</strong><br>Blood Group: ${bloodGroups}<br>Address: ${request.address}`
            );
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [userLocation, data]);

  return <div id="map" className="w-full h-64" />;
};

export default LeafletMap;
