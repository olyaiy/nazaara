import "./globals.css";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const prettywise = localFont({
  src: [
    {
      path: "../../public/fonts/Prettywise/Prettywise-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Prettywise/Prettywise-Heavy.ttf",
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
        <main className="pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
