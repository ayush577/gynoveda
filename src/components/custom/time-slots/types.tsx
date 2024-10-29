// Enhanced types
export type TimeSlot = {
  time: string;
  datetime: Date;
  available: boolean;
  isBooked: boolean;
};

export interface BusinessHours {
  startHour: number;
  endHour: number;
  intervalMinutes: number;
}

// Default business hours
export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  startHour: 9, // Starting at 9 AM
  endHour: 17, // Ending at 5 PM
  intervalMinutes: 30,
};


export interface TimeSlotsProps {
  date: Date;
  selectedTime?: string;
  onTimeSelect: (time: string, datetime: Date) => void;
  businessHours?: BusinessHours;
  bookedSlots?: string[];
}