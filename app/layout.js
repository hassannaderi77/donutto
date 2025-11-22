import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import StoreWrapper from "@/components/storeWrapper/StoreWrapper";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata = {
  title: "Donutto",
  icons: {
    icon: "https://saas-behtarino.hs3.ir/media/business_icons/img_1503882.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={vazirmatn.className}>
        <StoreWrapper>
          <Navbar />
          {children}
          <Footer />
        </StoreWrapper>
      </body>
    </html>
  );
}
