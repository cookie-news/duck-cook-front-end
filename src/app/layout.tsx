import { ToastContainer } from "react-toastify";

import { Metadata } from "next";

//Themes
import ThemeProvider from "@components/ThemeProvider";

import { AuthContextProvider } from "@context/AuthContext";
import { LoadingProvider } from "@context/LoadingContext";

//CSS
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Duck Cook",
  icons: {
    icon: "/assets/imgs/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pb-16">
        <AuthContextProvider>
          <LoadingProvider>
            <ThemeProvider>
              <div className="flex-1 max-h-full overflow-y-auto">
                {children}
              </div>
            </ThemeProvider>
          </LoadingProvider>
        </AuthContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}