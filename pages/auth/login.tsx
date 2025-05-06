import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/auth.context";
import { Role } from "../../types/auth.type";

export default function Login() {
  const { isAuthenticated, user, loading, error, login, clearError } = useAuth();
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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-skye flex items-center justify-center min-h-screen">
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
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
          <p className="text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
