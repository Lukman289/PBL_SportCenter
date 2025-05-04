import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Navbar from "@/shared/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith("/auth");

  return (
    <>
      {!(isAuthPage) && <Navbar />}
      <div
        className={
          isAuthPage
            ? "bg-skye min-h-screen"
            : "bg-background min-h-screen"
        }
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
