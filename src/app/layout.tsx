import "./globals.css";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";

const prettywise = localFont({
  src: [
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Fontspring-prettywise-heavy.otf",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-prettywise",
});

const neueHaas = localFont({
  src: [
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayXXThin.ttf",
      weight: "50",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayXXThinItalic.ttf",
      weight: "50",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayXThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayXThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayThin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayRoman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayRomanItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayMediu.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayBlack.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Neue Haas/NeueHaasDisplayBlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-neue-haas",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prettywise.variable} ${neueHaas.variable}`}>
        <Navigation />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
