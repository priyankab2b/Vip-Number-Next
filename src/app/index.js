"use client"

import { useContext } from "react";
import './index.css';
import Register from "./components/Register/Register"
import { MyRegisterSignInContext } from "./contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import SignInWithPassword from "./components/SignInWithPassword/SignInWithPassword";
import SignInWithOtp from "./components/SignInWithOtp/SignInWithOtp";

export default function Index({ children }) {
    const { activeRegisterForm, activeSignInWithPassword, activeSignInWithOtp } = useContext(MyRegisterSignInContext);
    return (
        <div className='page-os'>
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
    )
}
