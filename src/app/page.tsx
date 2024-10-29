import Link from "next/link";
import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Calendar, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <Logo classname="w-20 h-20 mb-8" />
      <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full mb-3">
        <Heart className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Your Health, Our Priority</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        Healthcare Appointments Made Simple
      </h1>
      <p className="text-lg text-muted-foreground mb-5 text-center max-w-3xl">
        Book your medical consultation with our expert doctors. Quick, easy, and
        secure scheduling at your convenience.
      </p>
      <Link href="/appointment">
        <Button size="lg">
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Button>
      </Link>
      <p className="absolute bottom-5 left-0 right-0 text-center text-[0.8rem] text-muted-foreground">
        Crafted by{" "}
        <Link
          href="http://www.ayushgandhi.com"
          className="text-blue-600 underline"
        >
          Ayush Gandhi
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
}
