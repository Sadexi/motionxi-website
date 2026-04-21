import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotionXI — Film Production",
  description: "MotionXI — Independent film production company based in Scottsdale, Arizona.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
