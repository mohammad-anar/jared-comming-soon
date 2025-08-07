/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import logo from "@/assets/logojetX.png";
import banner from "@/assets/banner.png";

export default function JetXClubLanding() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success(
          "Thank you for registering! We'll notify you about early access."
        );
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative max-h-screen w-full h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner}
          alt="Jet skis on water"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center text-white">
        {/* Logo */}
        <div className="mb-8 md:mb-12">
          <Image
            src={logo}
            alt="JetXClub"
            className="object-cover max-w-[540px] w-[300px] sm:w-full"
            priority
          />
        </div>

        {/* Coming Soon */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-6xl font-bold tracking-wide">
            COMING SOON
          </h2>
        </div>

        {/* Description */}
        <div className="mb-8 md:mb-12 max-w-4xl">
          <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-4">
            Endless fun without the headaches. With a fleet of jetskis&apos; at
            your fingertips, the only question you&apos;ll have is &quot;where
            are we going this weekend?&quot;
          </p>
        </div>

        {/* Registration Text */}
        <div className="mb-8 md:mb-12 max-w-3xl">
          <p className="text-base md:text-lg lg:text-xl italic leading-relaxed">
            <span className="font-medium">Register your details below</span> to
            secure our early access spots.
            <br />
            <span className="font-medium">Launching Summer 2025.</span>
          </p>
        </div>

        {/* Email Form */}
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <Input
              type="email"
              placeholder="Type your email...."
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="flex-1 h-12 p-4 bg-white text-gray-900 placeholder:text-gray-500 border-0 rounded-none text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 rounded-none border-0 text-base"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
