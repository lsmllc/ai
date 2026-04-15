import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charlevoix Chalet Evaluator",
  description: "Manual intake and scoring dashboard for Charlevoix chalet listings"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
