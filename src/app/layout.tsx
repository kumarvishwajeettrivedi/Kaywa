import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import QueueButton from "./components/queueButton";
import Footer from "./components/footer";
import ChattingNow from "./startchatingnow/videoscreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaywa",
  description: "Meet, Chat, Discover",
  icons: {
    icon: "/kaywalogo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isChatting = true; // replace this with your actual condition later

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {isChatting ? (
          <>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </>
        ) : (
          <ChattingNow />
        )}
      </body>
    </html>
  );
}
