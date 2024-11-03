import React from "react";
import { Payment } from "./columns";
import { ScheduledMeetingsClient } from "./ScheduleMeetingsClient";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "a3b6e5f4",
      docterName: "Dr. John Doe",
      status: "pending",
      email: "rihanna.k@outlook.com",
      code: "+91",
      phone: "7014921368",
      name: "Rihanna Kapoor",
      date: "10-11-2024",
      timeSlot: "9:00 AM",
    },
    {
      id: "d7f4c839",
      docterName: "Dr. Jane Smith",
      status: "confirmed",
      email: "nikhil.sharma@example.com",
      name: "Nikhil Sharma",
      code: "+91",
      phone: "7014967542",
      date: "10-11-2024",
      timeSlot: "3:00 PM",
    },
    {
      id: "b5c8f763",
      docterName: "Dr. John Doe",
      status: "canceled",
      email: "deepika.p@gmail.com",
      code: "+91",
      phone: "7014890142",
      name: "Deepika Patel",
      date: "10-12-2024",
      timeSlot: "11:30 AM",
    },
    {
      id: "e4c1b2d3",
      docterName: "Dr. Alice Lee",
      status: "confirmed",
      email: "pranav.rai@yahoo.com",
      code: "+91",
      phone: "7014905823",
      name: "Pranav Rai",
      date: "10-13-2024",
      timeSlot: "2:15 PM",
    },
    {
      id: "c2d5f948",
      docterName: "Dr. Alice Lee",
      status: "pending",
      email: "zara.khan@gmail.com",
      code: "+91",
      phone: "7014932671",
      name: "Zara Khan",
      date: "10-14-2024",
      timeSlot: "1:45 PM",
    },
  ];
}

export default async function scheduledMeetings() {
  const serverData = await getData();

  return (
    <div className="container mx-auto p-5">
      <ScheduledMeetingsClient initialData={serverData} />
    </div>
  );
}
