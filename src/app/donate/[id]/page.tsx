"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  useEffect(() => {
    const getRequestDetails = async () => {
      const response = await fetch(`/api/get-request/${id}`);
      const data = await response.json();
      console.log(data);
    };
    getRequestDetails();
  }, []);

  return <div>page</div>;
};

export default page;
