"use client"
import Image from "next/image";
import logo from "../../public/meditate-logo.png"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';



const Navbar =  () => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = () => {
      const storedToken = Cookies.get("token");
      setToken(storedToken!);
    };

    fetchToken();
  }, [token]);


  // useEffect(() => {
  //   const userToken = Cookies.get("token");
  //   if (userToken !== token) {
  //     setToken(userToken);
  //   }
  // }, []);
  

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.data.success) {
        Cookies.remove("token");  
        setToken("");     
        toast.success("Successfully logged out");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navbarTextClass = `hover:scale-110 transition transform duration-200 ease-in-out px-3 py-2 rounded`;
  
  return (
    <nav className="bg-transparent text-[#5A5A5A] py-4 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/"><Image src={logo} height={50} width={50} alt="logo" className="rounded-full hover:scale-110 "/></Link>
          <Link href="/" className={navbarTextClass}>Home</Link>
          <Link href="/journal" className={navbarTextClass}>Create Journal</Link>
          <Link href="/viewjournal" className={navbarTextClass}>View My Journals</Link>
        </div>
        <div className="flex space-x-4">
          {!token ? (
            <Link href="/login" className={navbarTextClass}>Login</Link>
          ) : (
            <Link href="#" className={navbarTextClass} onClick={handleLogout}>Logout</Link>
          )}
          <Link href="/register" className={navbarTextClass}>Register</Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;