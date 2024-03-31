import Image from "next/image";
import desginer from "../../public/meditate-logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
    <div className="container flex flex-col items-center space-y-4">
      <div className="w-full p-4 flex flex-col items-center space-y-2 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl/none">Insight Journal</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Unlock Your Potential with AI-Powered Journaling
          </p>
        </div>
        <div className="mt-6">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Image
        alt="Hero"
        className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
        height="300"
        src={desginer}
        width="1270"
      />
    </div>
  </section>
  );
}
