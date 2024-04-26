"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { aiCloudflare } from "@/utilities/actions";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Typewriter from 'typewriter-effect';
import {useRouter} from "next/navigation"

export default function Home() {
  const router = useRouter();
  const token = Cookies.get("token");

  const handleGetStartedClick = (e:any) => {
    e.preventDefault();
    if (token) {
      router.push('/journal');
    } else {
      router.push('/login');
    }
  };
  
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-[url('/meditate.jpg')] bg-cover bg-fixed bg-center bg-blur-xl h-[621px] overflow-hidden">
    <div className="container flex flex-col items-center space-y-4">
      <div className="w-full  flex flex-col items-center space-y-2 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl/none">
            Insight Journal
          </h1>
          <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('<span class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">Unlock Your Potential with AI-Powered Journalling</span>')
      .pauseFor(2500)
      .deleteAll()
      .start();
  }}
  options={{
            wrapperClassName: "typewriter-wrapper", 
            cursorClassName: "typewriter-cursor",
            autoStart: true,
            loop:true 
          }}
/>
        </div>
        <div className="mt-6">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </section>
  );
}
