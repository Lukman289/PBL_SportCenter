import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname.startsWith("/login");
  const isRegisterPage = router.pathname.startsWith("/register");

  return (
    <>
      {!(isLoginPage || isRegisterPage) && <Navbar />}
      <div
        className={
          isLoginPage || isRegisterPage
            ? "bg-skye min-h-screen"
            : "bg-background min-h-screen"
        }
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
