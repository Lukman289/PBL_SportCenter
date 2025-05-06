import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/auth.context";
import { Role } from "../../types/auth.type";

export default function Register() {
  const { isAuthenticated, user, loading, error, register, clearError } = useAuth();
  const router = useRouter();

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
    
    // Clear error saat komponen dimount
    return () => {
      clearError();
    };
  }, [isAuthenticated, user]);

  const redirectBasedOnRole = (role: Role) => {
    switch (role) {
      case Role.SUPER_ADMIN:
        router.replace("/admin/dashboard");
        break;
      case Role.ADMIN_CABANG:
        router.replace("/admin/cabang/dashboard");
        break;
      case Role.OWNER_CABANG:
        router.replace("/owner/dashboard");
        break;
      case Role.USER:
        router.replace("/");
        break;
      default:
        router.replace("/");
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      role: Role.USER
    };

    try {
      await register(userData);
      alert("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-skye flex items-center justify-center min-h-screen py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-10 w-full max-w-lg h-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-black">Sport</span>{" "}
          <span className="text-blue-300">Center</span>
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form
          className="flex flex-col space-y-4 justify-around"
          onSubmit={handleRegister}
          method="post"
        >
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="name"
            >
              Nama<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="name"
                required
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
                required
              />
            </label>
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="phone"
            >
              No. Telepon<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="tel"
                name="phone"
                placeholder="08xxxxxxxxxx"
                required
              />
            </label>
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-black mb-1"
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
              />
            </label>
          </div>
          <button
            className="w-full py-2 rounded-md bg-blue-300 hover:bg-blue-400 text-black font-semibold transition-colors mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Register"}
          </button>
          <p className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
