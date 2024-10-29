import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const DatePicker = ({
  calendarOpen,
  setCalendarOpen,
  selectedDate,
  setSelectedDate,
}: {
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}) => {
  /* Today's date */
  const today = new Date();

  /* Calculate the date three months from now */
  let threeMonthsFromNow = new Date();
  threeMonthsFromNow = new Date(
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
  );

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setCalendarOpen(!calendarOpen);
          }}
          initialFocus
          disabled={[{ before: today }, { after: threeMonthsFromNow }]}
        />
      </PopoverContent>
    </Popover>
  );
};
