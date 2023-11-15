import { Metadata } from "next";

//Themes
import ThemeProvider from "@components/ThemeProvider";

//CSS
import "@styles/globals.css";

//Custom
import Menu from "@components/Menu";
import { AuthContextProvider } from "../context/AuthContext";

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
      <body className="flex flex-col h-screen">
        <AuthContextProvider>
          <ThemeProvider>
            <Menu />
            <div className="flex-1 max-h-full overflow-y-auto">{children}</div>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
