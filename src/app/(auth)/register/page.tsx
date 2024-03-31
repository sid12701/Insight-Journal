"use client"
import { useState } from 'react';
import Head from 'next/head';
import registerForm from "../../../../public/register-form.jpg"
import Image from 'next/image';
import { register } from '@/utilities/actions';
// import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; // Ensure you have @heroicons/react installed

export default function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handleSubmit = async (e)=>{
    const email = e.get("email");
    const password = e.get("password");
    await register({email, password});
  }



  return (

    <>
      <Head>
        <title>Register | Insight Journal</title>
      </Head>

      <div className="flex justify-center items-center h-screen bg-blue-100 text-black">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-row-reverse">
          
          <div className="w-1/2 bg-[#6AB4E4] flex justify-center items-center p-8 lg:flex">
            <div className="h-3/4 w-full flex justify-center items-center">
              <Image src={registerForm} alt='register form' />
             </div>
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-700">Insight Journal</h2>
              <p className="text-xl text-gray-600">Create your account</p>

              <div className="w-full mt-8">
                <form action={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="py-2 px-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>

                  <div className="mb-4 relative">
                    <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
                    <input 
                      type={passwordShown ? "text" : "password"} 
                      id="password" 
                      name="password"
                      className="py-2 px-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" 
                      required 
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="text-gray-700"
                      >
                        {/* {passwordShown ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />} */}
                      </button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button type="submit" className="py-2 px-4 bg-gray-700 text-white rounded-lg w-full">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
