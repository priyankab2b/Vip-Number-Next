"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import "../SignInWithPassword/SignInForm/SignInForm.css";
import RegisterLoginInputField from "../RegisterLoginInputField/RegisterLoginInputField";
import SubmitButton from "../SubmitButton/SubmitButton";
// import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { NotificationManager } from "react-notifications";
import Country from "../../api/Country.json";
import CountrySelector from "../CountrySelector/CountrySelector";

const SignInWithOtp = () => {
  const ref = useRef();
  const otpRef = useRef();
  const Router = useRouter();
  const {
    activeSignInWithPassword,
    setActiveSignInWithPassword,
    activeSignInWithOtp,
    setActiveSignInWithOtp,
    activeRegisterForm,
    setActiveRegisterForm,
  } = useContext(MyRegisterSignInContext);
  const {
    setUserDetails,
    redirectTo,
    setRedirectTo,
    cartCache,
    addToCart,
    user,
  } = useContext(AppStateContext);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [session, setSession] = useState("");
  const [timer, setTimer] = useState(0);
  const [shouldSendOtp, setShouldSendOtp] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState();

  const [selectedCountry, setSelectedCountry] = useState({
    value: "India",
    label: "India",
  });

  const countryOptions = Country.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const isIndiaSelected = selectedCountry.value === "India";

  const handleVerifyNumber = async (showTimer) => {
    if (!isIndiaSelected) {
      return false;
    }
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }
    try {
      if (currMobile.toString()?.length < 10) {
        NotificationManager.error("Mobile number should be 10 digits");
        return;
      }

      let apiEndpoint = "";
      if (isIndiaSelected) {
        apiEndpoint = "https://admin.leafymango.com/web/otp/send";
      }

      const response = await axios.post(apiEndpoint, {
        number: parseInt(currMobile),
      });

      if (response.data.status === "success") {
        setOtpSent(response.data.data.Details);
        setSession(response.data.data.Details);
        NotificationManager.success("OTP sent on mobile number");
        otpRef.current.focus();
      } else if (response.data.status === "error") {
        NotificationManager.error(
          response?.data?.message || "Incorrect otp or mobile number"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendOTP = () => {
    handleVerifyNumber();
  };
  const handleConfirmPassword = (e) => {
    if (e?.code === "Enter") {
      return;
    }
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }
    if (currMobile?.length >= 10) {
      handleVerifyNumber();
    }
  };
  useEffect(() => {
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }

    if (currMobile?.length === 10 && isIndiaSelected) {
      handleVerifyNumber();
    }
  }, [mobile, isIndiaSelected]);

  // counry handle change
  const handleCountrySelect = (val) => {
    setSelectedCountry({
      value: val.value,
      label: val.label,
    });
    console.log("val :", val);
    console.log("selectedCountry :", selectedCountry);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }
    if (currMobile === "") {
      setMobileError("Mobile number is required");
    } else if (!/^[0-9]+$/.test(currMobile)) {
      // setMobileError("Mobile number should only contain numbers");
    } else {
      setMobileError("");
    }

    if (otp === "") {
      setPasswordError("otp is required");
    } else {
      setPasswordError("");
    }

    if (currMobile !== "" && otp !== "") {
      try {
        const response = await axios.post(
          "https://admin.leafymango.com/web/login",
          {
            mobile: currMobile.toString(),

            otp,
            countryValue: selectedCountry,
            session_id: session,
          }
        );

        if (response.data.status === "success") {
          setUserDetails(response?.data?.data);
          setActiveSignInWithOtp(false);
          localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
          localStorage.setItem("mobileNumber", currMobile);
          if (redirectTo) {
            if (cartCache) {
              addToCart(
                cartCache,
                () => {
                  Router.push(redirectTo);
                  setRedirectTo(null);
                },
                response?.data?.data?.token
              );
            } else {
              Router.push(redirectTo);
              setRedirectTo(null);
            }
          }
          NotificationManager.success("Login successful");

          // Create lead api after login
          const consoleData = localStorage.getItem("vipcre");
          const parsedData = JSON.parse(consoleData);
          // Extracting the token
          const token = parsedData.token;
          // Logging the token
          // console.log("Token:", token);
          axios.post(
            "https://admin.leafymango.com/web/lead/create",
            {
              mobile_number: mobile,
              first_name: "Loged-In",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (response.data.status === "error") {
          NotificationManager.error(
            response?.data?.message || "Incorrect otp or mobile number"
          );
        }
      } catch (error) {
        setError(error.message);
        NotificationManager.error(
          "Login failed No account registered with this number"
        );
        console.log("Error:", error.message);
      }
    }

    // except india and without otp login
    if (currMobile !== "" && selectedCountry?.value !== "India") {
      console.log("Login with country except india");
      try {
        const response = await axios.post(
          "https://admin.leafymango.com/web/login",
          {
            mobile: currMobile.toString(),
            countryValue: selectedCountry,
            // session_id: session,
          }
        );

        if (response.data.status === "success") {
          setUserDetails(response?.data?.data);
          setActiveSignInWithOtp(false);
          console.log("Login with country except india1");
          localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
          localStorage.setItem("mobileNumber", currMobile);
          if (redirectTo) {
            if (cartCache) {
              addToCart(
                cartCache,
                () => {
                  Router.push(redirectTo);
                  setRedirectTo(null);
                },
                response?.data?.data?.token
              );
            } else {
              Router.push(redirectTo);
              setRedirectTo(null);
            }
          }
          NotificationManager.success("Login successful");

          // Create lead api after login
          const consoleData = localStorage.getItem("vipcre");
          const parsedData = JSON.parse(consoleData);
          // Extracting the token
          const token = parsedData.token;
          // Logging the token
          // console.log("Token:", token);
          axios.post(
            "https://admin.leafymango.com/web/lead/create",
            {
              mobile_number: mobile,
              first_name: "Loged-In",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (response.data.status === "error") {
          NotificationManager.error(
            response?.data?.message || "Incorrect otp or mobile number"
          );
        }
      } catch (error) {
        setError(error.message);
        NotificationManager.error(
          "Login failed No account registered with this number"
        );
        console.log("Error:", error.message);
      }
    }
  };

  // Click on SignInWithPassword show otp popup
  const handleActivePassword = () => {
    if (activeSignInWithOtp === true && activeSignInWithPassword === false) {
      setActiveSignInWithPassword(true);
      setActiveSignInWithOtp(false);
    }
  };

  // Click on Register popup show register popup
  const handleRegisterPopup = () => {
    if (activeSignInWithOtp === true && activeRegisterForm === false) {
      setActiveSignInWithOtp(false);
      setActiveRegisterForm(true);
    }
  };

  return (
    <>
      <section className="register-section-os signIn-page-os signInWithOtp-os">
        <div className="container-os">
          <div className="register-row-os signIn-page-row-os">
            <button
              type="button"
              onClick={() => {
                setActiveSignInWithOtp(false);
              }}
              className="register-cross-button-os"
            >
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027"></circle>
                <path
                  d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                  fill="#EFEFEF"
                ></path>
              </svg>
            </button>
            <div className="register-main-heading-os signIn-page-main-heading-os">
              {/* {props.mainHeading} */}Sign in or register to checkout
            </div>
            <div className="register-form-os">
              <div className="register-heading-os signIn-page-heading-os">
                {/* {props.subHeading} */}Please enter your information
              </div>
              <form className="register-form-data-os" onSubmit={handleSubmit}>
                <div className="register-input-os signIn-page-country-selector-os">
                  <CountrySelector
                    options={countryOptions}
                    value={selectedCountry}
                    // onChange={setSelectedCountry}
                    onChange={handleCountrySelect}
                  />
                </div>

                <div className="register-input-os signIn-page-country-selector-os">
                  <RegisterLoginInputField
                    inputType="text"
                    inputPlaceholder="Mobile No."
                    value={mobile}
                    onChange={(e) => {
                      const filteredValue = e.target.value.replace(
                        /[^+0-9,]/g,
                        ""
                      );
                      setMobile(filteredValue || "");
                    }}
                    //onBlur={handleConfirmPassword}
                    ref={ref}
                  />

                  {mobileError && (
                    <div className="error-message">{mobileError}</div>
                  )}
                </div>

                {isIndiaSelected && (
                  <div className="register-input-os">
                    <RegisterLoginInputField
                      inputType="text"
                      inputPlaceholder="OTP"
                      value={otp}
                      onChange={(e) => {
                        const enteredValue = e.target.value;
                        if (/^[0-9]*$/.test(enteredValue)) {
                          setOtp(enteredValue);
                        }
                      }}
                      ref={otpRef}
                    />
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
                  </div>
                )}

                <div className="">
                  <RegisterLoginInputField
                    inputType="hidden"
                    value={session}
                    onChange={(event) => setSession(event.target.value)}
                  />
                </div>
                {isIndiaSelected && (
                  <div className="resendOtp-loginWithPass-btn-os">
                    <button
                      type="button"
                      className="resendOtp-btn-os"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </button>
                    <div
                      className="loginWith-passwd-opt-os"
                      onClick={handleActivePassword}
                    >
                      Login with Password
                    </div>
                  </div>
                )}

                {!isIndiaSelected && (
                  <div
                    className="loginWith-passwd-opt-os"
                    onClick={handleActivePassword}
                  >
                    Login with Password
                  </div>
                )}

                <div className="signIn-submitBtn-os">
                  <SubmitButton buttonTitle="Submit" />
                </div>
              </form>
              <div className="already-have-account-os signIn-new-customer-register-os">
                New Customer?
                <div onClick={handleRegisterPopup}>Register!</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInWithOtp;
