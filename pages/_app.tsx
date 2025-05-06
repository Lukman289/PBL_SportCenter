import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { AuthProvider } from '../context/auth.context';
import Navbar from "../shared/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith("/auth");

  return (
    <AuthProvider>
      {!isAuthPage && <Navbar />}
      <div
        className={
          isAuthPage
            ? "bg-skye min-h-screen"
            : "bg-background min-h-screen"
        }
      >
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
