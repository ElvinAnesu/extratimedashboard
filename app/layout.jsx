import { Inter, Lusitana } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Extratime",
  description: "Extratime dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
