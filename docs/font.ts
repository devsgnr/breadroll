import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const GeistSans = localFont({
  src: "./public/fonts/geist-1.3.0/variable-woff/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
