/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TimeSlots from "@/components/custom/time-slots/time-slots";
import { DatePicker } from "@/components/custom/date-picker/date-picker";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { docterList } from "@/contants/docter-list";
import { countryCodes } from "@/contants/country-code";
import Logo from "@/components/icons/logo";
import { appointmentSchema } from "@/schema/appointment-schema";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";

export default function AppointmentPage() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      docterName: "",
      date: new Date(),
      timeSlot: "",
    },
    mode: "onSubmit",
  });

  // Booked slots and custom business hours
  const bookedSlots = ["10:00", "14:30"]; // Times that are already booked
  const customBusinessHours = {
    startHour: 8, // 8 AM
    endHour: 18, // 6 PM
    intervalMinutes: 30,
  };

  /* Form Submit */
  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    setBookingSuccess(data);
  };

  // Get form state
  const isFormValid = form.formState.isValid;
  // const isSubmitting = form.formState.isSubmitting;

  if (bookingSuccess) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Card className="w-full md:w-1/2 mx-auto p-6 shadow-none">
          <h4 className="text-xl text-center text-orange-600 font-bold mb-2">
            Booking Successful
          </h4>
          <Image
            src="/3d-docter.png"
            alt="3d-docter"
            width={100}
            height={150}
            className="mx-auto border-b-[1px] border-zinc-600 mb-4"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl  mb-1">
              Hey,{" "}
              <span className="text-orange-600 font-semibold">
                {bookingSuccess?.name}
              </span>
            </h1>
            <p className="text-lg text-center">
              Your appointment has been booked successfully for{" "}
              <span className="font-semibold">{bookingSuccess?.timeSlot}</span>{" "}
              on{" "}
              <span className="font-semibold">
                {format(bookingSuccess?.date, "dd/MM/yyyy")}
              </span>
            </p>
            <div className="flex flex-row gap-3">
              <Link href="/">
                <Button className="mt-2">Go to home</Button>
              </Link>
              <Link href="/admin">
                <Button className="mt-2 bg-orange-600">Admin Panel</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <section id="booking-section" className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <Logo classname="w-10 h-10 mx-auto mb-2" />
          </Link>
          <h2 className="text-3xl font-bold text-center mb-10">
            Book Your Appointment
          </h2>
          <Card className="max-w-[500px] p-6 mx-auto">
            <div className="">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="w-[120px]">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Code" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countryCodes.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.code}
                                  >
                                    {country.code} {country.country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="docterName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Choose Docter</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Docter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {docterList.map((docter) => (
                              <SelectItem key={docter.id} value={docter.name}>
                                {docter.name} - {docter.field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            calendarOpen={calendarOpen}
                            setCalendarOpen={setCalendarOpen}
                            selectedDate={value}
                            setSelectedDate={onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Time Slot</FormLabel>
                        <FormControl>
                          <TimeSlots
                            date={form.watch("date") ?? new Date()}
                            selectedTime={value}
                            onTimeSelect={onChange}
                            businessHours={customBusinessHours}
                            bookedSlots={bookedSlots}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={!isFormValid}>
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="h-5" />
              <span className="text-sm text-red-500">
                ● 👉{" "}
                <span className="text-blue-500">
                  indicates time slot is already booked
                </span>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
