"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const session = localStorage.getItem("token");
    if (!user || !session) {
      router.push('/login');
    }
  }, [router]);

  return <div>Journals</div>;
};


export default Page;
