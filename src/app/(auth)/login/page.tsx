import Head from "next/head";
import Image from "next/image";
import loginForm from "../../../../public/login-form.jpg";
import Link from "next/link";
import { login } from "@/utilities/actions";

const LoginPage = () => {

  const handleLogin = async(e) => {
    "use server"
    const username = e.get("username");
    const password = e.get("password");
    await login({username, password});
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-green-100">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex">
        <div className="w-1/2 bg-green-200 p-8 flex justify-center items-center lg:flex">
            <div className="flex justify-center items-center h-3/4">
              <Image src={loginForm} alt="login form" className="object-contain h-full" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                Insight Journal
              </h2>
              <p className="text-xl text-gray-600">Sign in to your account</p>

              <div className="w-full mt-8">
                <form action={handleLogin}>
                  <div className="mb-4">
                    <label className="block mb-1 text-gray-600" htmlFor="username">Username or email</label>
                    <input type="text" id="username" name="username" className="py-2 px-3 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500" required />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="py-2 px-3 border text-black rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <a href="#" className="text-xs text-gray-500 mt-2 inline-block">Forgot password?</a>
                  </div>

                  <div className="mb-6">
                    <button type="submit" className="py-2 px-4 bg-gray-700 text-white rounded-lg w-full">Sign in</button>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600">Or sign in with</p>
                    <button type="button" className="py-2 px-4 bg-white text-gray-500 rounded-lg border border-gray-300 w-full mt-4">Sign in with Google</button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <Link href="#" className="text-green-500">Create an Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
