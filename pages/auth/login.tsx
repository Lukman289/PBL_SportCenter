import Link from "next/link";
import { login } from "../../api/auth.api";

export default function Login() {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await login({ email, password });
      console.log("Login successful!!!", data);
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

  return (
    <div className="bg-skye flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-10 w-full max-w-lg h-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-black">Sport</span>{" "}
          <span className="text-blue-300">Center</span>
        </h1>
        <form
          className="flex flex-col space-y-4 justify-around"
          onSubmit={handleLogin}
          method="post"
        >
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="email"
                required
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
                required
              />
            </label>
          </div>
          <button
            className="w-full py-2 rounded-md bg-blue-300 hover:bg-blue-400 text-black font-semibold transition-colors mt-2"
            type="submit"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
