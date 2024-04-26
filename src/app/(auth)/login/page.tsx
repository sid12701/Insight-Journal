"use client"
import { useEffect, useState } from "react";
import Head from "next/head";
import loginForm from "../../../../public/login-form.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from 'react-hot-toast';
import { loginSchema } from "@/utilities/validation"; // Adjust the path as necessary

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = () => {
    const result = loginSchema.safeParse(user);
    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : ""
      });
      return false;
    }
    setErrors({ email: "", password: "" });
    return true;
  };

  const onLogin = async () => {
    if (!validateInput()) return; // Stop the login if validation fails
    setLoading(true);
    try {
      const response = await axios.post("/api/login", user);
      console.log(response);
      if (response.data.success) {
        toast.success("Successfully logged in");
        router.push("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error(err.response?.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <>
      <Head>
        <title>Login | Insight Journal</title>
      </Head>

      <div className="flex justify-center items-center h-screen bg-blue-100 text-black">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-row-reverse">
          <div className="w-1/2 bg-[#6AB4E4] flex justify-center items-center p-8 lg:flex">
            <Image src={loginForm} alt="Login form" />
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-700">{loading ? "Processing..." : "Log in to your account"}</h2>

              <div className="w-full mt-8">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`py-2 px-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                  <input
                    type="password"
                    id="password"
                    className={`py-2 px-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className={`py-2 px-4 ${buttonDisabled ? "bg-gray-500" : "bg-gray-700"} text-white rounded-lg w-full`}
                  disabled={buttonDisabled}
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
