"use client";

import { useContext, useEffect, useState } from "react";
import "./index.css";
import Register from "./components/Register/Register";
import { MyRegisterSignInContext } from "./contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import SignInWithPassword from "./components/SignInWithPassword/SignInWithPassword";
import SignInWithOtp from "./components/SignInWithOtp/SignInWithOtp";
import { useRouter, usePathname } from "next/navigation";
import { AppStateContext } from "./contexts/AppStateContext/AppStateContext";

export default function Index({ children }) {
  const pathname = usePathname();
  const { currentUrl, setCurrentUrl } = useContext(AppStateContext);
  const [loading, setLoading] = useState(true);
  const { activeRegisterForm, activeSignInWithPassword, activeSignInWithOtp } =
    useContext(MyRegisterSignInContext);

  // const currentUrlData =
  //   typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    setCurrentUrl(`${window.location.href}`);
    setLoading(false);
  }, [pathname]);

  console.log("currentUrl ::", currentUrl);
  console.log("pathname ::", pathname);

  return (
    <>
      <head>
        {loading ? (
          <link rel="canonical" href={pathname} />
        ) : (
          <link rel="canonical" href={currentUrl} />
        )}
        {/* <link
          rel="canonical"
          href={`https://www.vipnumbershop.com${pathname}`}
        /> */}
      </head>
      <div className="page-os">
        {activeRegisterForm && (
          <div className={`register-popup-os active`}>
            <Register />
          </div>
        )}
        {activeSignInWithPassword && (
          <div className={`signIn-password-popup-os active`}>
            <SignInWithPassword />
          </div>
        )}
        {activeSignInWithOtp && (
          <div className={`signIn-otp-popup-os active`}>
            <SignInWithOtp />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
