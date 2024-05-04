"use client"
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import registerForm from "../../../../public/register-form.jpg";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { signUpSchema } from "@/utilities/validation"; 

// const RegisterPage = () => {
//   const router = useRouter();
//   const [user, setUser] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [buttonDisabled, setButtonDisabled] = useState(true);

//   const validateInput = () => {
//     const result = signUpSchema.safeParse(user);
//     if (!result.success) {
//       const errorMessages = result.error.flatten().fieldErrors;
//       setErrors({
//         email: errorMessages.email ? errorMessages.email[0] : "",
//         password: errorMessages.password ? errorMessages.password[0] : ""
//       });
//       return false;
//     }
//     setErrors({ email: "", password: "" });
//     return true;
//   };

//   const onRegister = async () => {
//     if (!validateInput()) return; // Stop the registration if validation fails
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/register", user);
//       console.log("Registration success", response.data);
//       router.push("/login");
//     } catch (err:any) {
//       console.error("Registration failed", err);
//       toast.error(err.response?.data.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setButtonDisabled(!(user.email && user.password));
//   }, [user]);

//   return (
//     <>
//       <Head>
//         <title>Register | Insight Journal</title>
//       </Head>

//       <div className="flex justify-center items-center h-screen bg-blue-100 text-black">
//         <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-row-reverse">
//           <div className="w-1/2 bg-[#6AB4E4] flex justify-center items-center p-8 lg:flex">
//             <Image src={registerForm} alt="Register form" />
//           </div>

//           <div className="w-full lg:w-1/2 p-8">
//             <div className="flex flex-col items-center">
//               <h2 className="text-2xl font-semibold text-gray-700">{loading ? "Processing..." : "Insight Journal"}</h2>
//               <p className="text-xl text-gray-600">Create your account</p>

//               <div className="w-full mt-8">
//                 <div className="mb-4">
//                   <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className={`py-2 px-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                     required
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     className={`py-2 px-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     value={user.password}
//                     onChange={(e) => setUser({ ...user, password: e.target.value })}
//                     required
//                   />
//                   {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//                 </div>

//                 <button
//                   type="submit"
//                   className={`py-2 px-4 ${buttonDisabled ? "bg-gray-500" : "bg-gray-700"} text-white rounded-lg w-full`}
//                   disabled={buttonDisabled}
//                   onClick={onRegister}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterPage;


"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import registerForm from "../../../../public/register-form.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { signUpSchema } from "@/utilities/validation";

const RegisterPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = () => {
    const result = signUpSchema.safeParse(user);
    if (!result.success) {
      const { email, password } = result.error.flatten().fieldErrors;
      setErrors({
        email: email ? email[0] : "",
        password: password ? password[0] : "",
      });
      return false;
    }
    setErrors({ email: "", password: "" });
    return true;
  };

  const onRegister = async () => {
    if (!validateInput()) return; // Stop the registration if validation fails
    setLoading(true);
    try {
      const response = await axios.post("/api/register", user);
      console.log("Registration success", response.data);
      router.push("/login");
    } catch (err:any) {
      console.error("Registration failed", err);
      toast.error(err.response?.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const handleChange = (key:any, value:any) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <>
      <Head>
        <title>Register | Insight Journal</title>
      </Head>

      <div className="flex justify-center items-center h-screen bg-blue-100 text-black">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-row-reverse">
          <div className="w-1/2 bg-[#6AB4E4] flex justify-center items-center p-8 lg:flex">
            <Image src={registerForm} alt="Register form" />
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                {loading ? "Processing..." : "Insight Journal"}
              </h2>
              <p className="text-xl text-gray-600">Create your account</p>

              <div className="w-full mt-8">
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`py-2 px-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-600" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`py-2 px-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`py-2 px-4 ${
                    buttonDisabled ? "bg-gray-500" : "bg-gray-700"
                  } text-white rounded-lg w-full`}
                  disabled={buttonDisabled}
                  onClick={onRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
