"use client";
// import { Roboto } from 'next/font/google'
// import head component
import Head from "next/head";
import "./globals.css";
import AppStateContextProvider from "./contexts/AppStateContext/AppStateContext";
import MyRegisterSignInContextProvider from "./contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Index from "./index";
// import { useRouter, usePathname } from "next/navigation";

// const roboto = Roboto({ subsets: ['latin'], variable: "--font-roboto", weight: ['300', '400', '500', '700', '900'] });

// export const metadata = {
//   title: 'Vip-Number Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  // const navigate = useRouter();
  // const pathname = usePathname();

  // const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  // console.log("navigate.asPath ::", navigate.asPath);
  // console.log("currentUrl ::", currentUrl);
  // console.log("pathname ::", pathname);
  return (
    <html lang="en">
      <Head>
        {/* <!-- Slick slider css cdn --> */}
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        {/* <!-- Raleway google font cdn --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* <!-- Roboto google font cdn --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Inter google font cdn --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Poppins google font cdn --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Rubic google font cdn --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className="pages-os">
          <AppStateContextProvider>
            <MyRegisterSignInContextProvider>
              <Index children={children} />
            </MyRegisterSignInContextProvider>
          </AppStateContextProvider>
        </div>
      </body>
    </html>
  );
}
