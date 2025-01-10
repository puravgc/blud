"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Request {
  _id: string;
  hospital: string;
  address: string;
  bloodGroup: string;
  description: string;
}

const Page = () => {
  const params = useParams();
  const { id } = params;

  const [fetchedData, setFetchedData] = useState<Request | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [donorName, setDonorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const getRequestDetails = async () => {
      try {
        const response = await fetch(`/api/get-hospital/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setFetchedData(data); // Set the single object
      } catch (err: any) {
        setError(err.message);
      }
    };

    getRequestDetails();
  }, [id]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donor submission logic here
    console.log({
      donorName,
      phoneNumber,
      message,
    });
    alert("Thank you for your interest! Your details have been submitted.");
    // Reset the form
    setDonorName("");
    setPhoneNumber("");
    setMessage("");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 10px" }}>{fetchedData.name}</h2>
        <p>
          <strong>Address:</strong> {fetchedData.address}
        </p>
        <p>
          <strong>Blood Group Needed:</strong> {fetchedData.bloodGroup}
        </p>
        <p>
          <strong>Description:</strong> {fetchedData.description}
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Become a Donor</h3>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Your Name:
          </label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Phone Number:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Message (optional):
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
