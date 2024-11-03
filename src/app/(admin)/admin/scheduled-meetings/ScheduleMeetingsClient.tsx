// scheduled-meetings-client.tsx
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

interface ScheduledMeetingsClientProps {
  initialData: Payment[];
}

export function ScheduledMeetingsClient({
  initialData,
}: ScheduledMeetingsClientProps) {
  const [combinedData, setCombinedData] = useState<Payment[]>(initialData);

  useEffect(() => {
    const storedAppointment = localStorage.getItem("appointment");
    if (storedAppointment) {
      try {
        const parsedAppointment = JSON.parse(storedAppointment) as Payment;
        const appointmentWithId: Payment = {
          ...parsedAppointment,
          id: "c2d5f948",
          status: "pending",
        };
        setCombinedData([appointmentWithId, ...initialData]);
      } catch (error) {
        console.error("Error parsing stored appointment:", error);
      }
    }
  }, [initialData]);

  return <DataTable columns={columns} data={combinedData} />;
}
