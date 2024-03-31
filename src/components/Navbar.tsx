import Image from "next/image";
import logo from "../../public/meditate-logo.png"
import Link from "next/link";
const Navbar = () => {
    const navbarTextClass = `hover:scale-110 transition transform duration-200 ease-in-out px-3 py-2 rounded`
    return (
        <nav className="bg-transparent text-[#5A5A5A] py-4 w-screen">
        <div className="container mx-auto flex justify-between items-center ">
          {/* Left Side Links */}
          <div className="flex items-center space-x-4 ">
            <Link href="/"><Image src={logo} height={50} width={50} alt="logo" className="rounded-full hover:scale-110 "/></Link>
            <Link href="#" className={navbarTextClass}>Home</Link>
            <Link href="#" className={navbarTextClass}>Our Services</Link>
            <Link href="#" className={navbarTextClass}>Contact</Link>
            <Link href="/journal" className={navbarTextClass}>Create Journal</Link>
            <Link href="/viewjournal" className={navbarTextClass}>View My Journals</Link>
          </div>
  
          {/* Right Side Links */}
          <div className="flex space-x-4">
            <Link href="/sign-in" className={navbarTextClass}>Login</Link>
            <Link href="#" className={navbarTextClass}>Register</Link>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;