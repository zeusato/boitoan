import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Bói Chỉ Tay AI - Khám Phá Vận Mệnh",
  description:
    "Ứng dụng bói chỉ tay bằng trí tuệ nhân tạo. Khám phá vận mệnh, tình duyên, sự nghiệp qua đường chỉ tay của bạn.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bói Chỉ Tay AI",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0b2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="mystic-bg antialiased min-h-dvh">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
