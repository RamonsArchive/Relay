import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "easymde/dist/easymde.min.css";

const plexSans = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "Relay",
  description: "A clothing store for the 21st century",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ variables: { colorPrimary: "#004BFE" } }}>
        <body className={`${plexSans.variable} antialiased`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
