import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import TopMenu from "@/components/TopMenu";
import ToastProvider from "@/providers/ToastProvider";

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RentHub",
  description: "เช่าอุปกรณ์ที่ต้องการ ได้ในไม่กี่คลิก",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="th" className={plexThai.variable}>
      <body className="min-h-screen bg-page font-sans text-ink">
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <ToastProvider>
              <TopMenu />
              {children}
            </ToastProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
