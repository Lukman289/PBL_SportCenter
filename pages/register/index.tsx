import { useState } from "react";
import Link from "next/link";
import { register } from "../api/post/auth";

export default function Register() {
  const [confirmPassword, setConfirmPassword] = useState(true);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await register({ name, phone, email, password });
      console.log("Registration successful!!!", data);
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = (
      document.querySelector('input[name="password"]') as HTMLInputElement
    )?.value;
    setConfirmPassword(event.target.value === password);
  };

  return (
    <div className="bg-skye flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-10 w-full max-w-lg h-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-black">Sport</span>{" "}
          <span className="text-blue-300">Center</span>
        </h1>
        <form
          className="flex flex-col space-y-4 justify-around"
          method="post"
          onSubmit={handleRegister}
        >
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="email"
            >
              Nama<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="name"
              />
            </label>
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              No HP<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                name="phone"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Password<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Konfirmasi Password<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="confirm_password"
                onChange={handleConfirmPassword}
              />
            </label>
            {!confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Password tidak sama</p>
            )}
          </div>
          <button
            className="w-full py-2 rounded-md bg-blue-300 hover:bg-blue-400 text-black font-semibold transition-colors mt-2"
            type="submit"
          >
            Register
          </button>

          <p className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
