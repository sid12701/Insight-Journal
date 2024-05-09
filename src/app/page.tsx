"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { aiCloudflare } from "@/utilities/actions";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/navigation";
import { TypewriterEffect } from "@/components/ui/typewriter";
import { HammerIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../components/ui/text-generate";



export default function Home() {
  const router = useRouter();
  const token = Cookies.get("token");
  const textClass = "text-gray-500 md:text-xl dark:text-gray-400 text-sm";

  const words = "Insight Journal"

  const handleGetStartedClick = (e: any) => {
    e.preventDefault();
    if (token) {
      router.push("/journal");
    } else {
      router.push("/login");
    }
  };

  return (
    //     <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-[url('/meditate.jpg')] bg-cover bg-fixed bg-center bg-blur-xl h-[621px] overflow-hidden">
    //     <div className="container flex flex-col items-center space-y-4">
    //       <div className="w-full  flex flex-col items-center space-y-2 text-center">
    //         <div className="space-y-2">
    //           <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl/none">
    //             Insight Journal
    //           </h1>
    //           {/* <Typewriter
    //   onInit={(typewriter) => {
    //     typewriter.typeString('<span class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">Unlock Your Potential with AI-Powered Journalling</span>')
    //       .pauseFor(2500)
    //       .deleteAll()
    //       .start();
    //   }}
    //   options={{
    //             wrapperClassName: "typewriter-wrapper",
    //             cursorClassName: "typewriter-cursor",
    //             autoStart: true,
    //             loop:true
    //           }}
    // /> */}
    // <TypewriterEffect words={words} className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 p-[-20px]" />
    //         </div>
    //         <div className="mt-6">
    //           <Link
    //             className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
    //             href="#"
    //             onClick={handleGetStartedClick}
    //           >
    //             Get Started
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    <main className="flex flex-col items-center justify-center min-h-100% bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-3xl text-center space-y-4">
        <TextGenerateEffect words={words}   className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-50"/>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Unlock the power of AI-driven journaling to enhance your
          self-reflection and personal growth.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#"
          onClick={handleGetStartedClick}
        >
          Start Journaling
        </Link>
      </div>
      <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <motion.div
          className="flex flex-col items-center text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <PenToolIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Effortless Journaling
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seamlessly capture your thoughts and experiences with our intuitive
            interface.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <LightbulbIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Insightful Analytics
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover patterns and trends in your journaling with our powerful
            AI-driven analytics.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <HammerIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Build Healthy Habits
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Establish and maintain healthy habits for long-term well-being.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

// export default function Home() {
//   <main className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-12 md:py-24">
//     <div className="max-w-3xl text-center space-y-4">
//       <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
//         Mindful Journaling
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
//         Unlock the power of AI-driven journaling to enhance your self-reflection
//         and personal growth.
//       </p>
//       <Link
//         className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//         href="#"
//       >
//         Start Journaling
//       </Link>
//     </div>
//     <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
//       <div className="flex flex-col items-center text-center space-y-2">
//         <PenToolIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
//           Effortless Journaling
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Seamlessly capture your thoughts and experiences with our intuitive
//           interface.
//         </p>
//       </div>
//       <div className="flex flex-col items-center text-center space-y-2">
//         <LightbulbIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
//           Insightful Analytics
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Discover patterns and trends in your journaling with our powerful
//           AI-driven analytics.
//         </p>
//       </div>
//       <div className="flex flex-col items-center text-center space-y-2">
//         <AccessibilityIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
//           Personalized Guidance
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Receive tailored recommendations to enhance your self-reflection and
//           growth.
//         </p>
//       </div>
//     </div>
//   </main>;
// }

function AccessibilityIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function LightbulbIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function PenToolIcon(props:any) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-hammer"
    >
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4" />
      <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
    </svg>
  );
}
