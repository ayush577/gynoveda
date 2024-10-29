"use client";

import React from "react";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import {
  BusinessHours,
  DEFAULT_BUSINESS_HOURS,
  TimeSlot,
  TimeSlotsProps,
} from "./types";

// Function to check if a time is within business hours
const isWithinBusinessHours = (
  date: Date,
  businessHours: BusinessHours
): boolean => {
  const hour = date.getHours();
  return hour >= businessHours.startHour && hour < businessHours.endHour;
};

// Enhanced time slots generator
const generateTimeSlots = (
  date: Date,
  businessHours: BusinessHours = DEFAULT_BUSINESS_HOURS,
  bookedSlots: string[] = []
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const baseDate = new Date(date);
  const currentDate = new Date();

  // Reset hours, minutes, seconds, and milliseconds
  baseDate.setHours(0, 0, 0, 0);

  const { startHour, endHour, intervalMinutes } = businessHours;

  // Generate slots
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const slotDate = new Date(baseDate);
      slotDate.setHours(hour, minute);

      // Skip slots in the past
      if (slotDate < currentDate) {
        continue;
      }

      // Format time for comparison with bookedSlots
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      // Check if slot is booked
      const isBooked = bookedSlots.includes(timeString);

      // A slot is available if:
      // 1. It's within business hours
      // 2. It's not booked
      // 3. It's not in the past
      const isAvailable =
        isWithinBusinessHours(slotDate, businessHours) && !isBooked;

      slots.push({
        time: timeString,
        datetime: slotDate,
        available: isAvailable,
        isBooked,
      });
    }
  }

  return slots;
};

export default function TimeSlots({
  date,
  selectedTime,
  onTimeSelect,
  businessHours = DEFAULT_BUSINESS_HOURS,
  bookedSlots = [],
}: TimeSlotsProps) {
  const availableSlots = generateTimeSlots(date, businessHours, bookedSlots);

  const getSlotStatus = (slot: TimeSlot): string => {
    if (slot.isBooked) return "Already booked";
    if (!slot.available) return "Unavailable";
    return "Available";
  };

  const handleTimeSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    time: string,
    datetime: Date
  ) => {
    e.preventDefault(); // Prevent form submission
    onTimeSelect(time, datetime);
  };

  return (
    <ScrollArea className="min-w-[280px] h-[400px] rounded-md border">
      <div className="p-4">
        <div className="mb-4 text-sm text-muted-foreground">
          Business hours: {businessHours.startHour}:00 - {businessHours.endHour}
          :00
        </div>
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <Button
              key={slot.time}
              variant={selectedTime === slot.time ? "default" : "outline"}
              onClick={(e) => handleTimeSelect(e, slot.time, slot.datetime)}
              disabled={!slot.available || slot.isBooked}
              className="w-full relative"
              title={getSlotStatus(slot)}
            >
              <span className={slot.isBooked ? "text-muted-foreground" : ""}>
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(slot.datetime)}
              </span>
              {slot.isBooked && (
                <span className="absolute top-0 right-2 text-xs text-red-500">
                  ●
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
