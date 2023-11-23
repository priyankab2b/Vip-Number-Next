'use client'
import React, { useState, useContext, useEffect, useCallback } from "react";
import "./Profile.css";
import Header from "../components/Header/Header";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { getProfile, updateProfile } from "../Services/Services";
import LogoutModal from "../components/LogoutModal/LogoutModal";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// Add these imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";

registerLocale("en-US", en);

const Profile = () => {
    //Address
    const [zipCode, setZipCode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [cities, setCities] = useState([]);
    //Changes Password State
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useRouter();
    const { logout, user, setUserProfile } = useContext(AppStateContext);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showConfirmationModalss, setShowConfirmationModalss] = useState(false);
    //profile
    const [data, setData] = useState(null);
    const [profileActive, setProfileActive] = useState("tab1");
    const [profile, setProfile] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [useOtp, setUseOtp] = useState(false);
    const [otpDetails, setOtpDetails] = useState();
    const [mobile, setMobile] = useState();
    const [otp, setOtp] = useState();
    const handleProfile = (profileTab) => {
        setProfileActive(profileTab);
    };

    const sendOtp = (mob) => {
        axios
            .post("https://admin.leafymango.com/web/otp/send", {
                number: parseInt(mob),
            })
            .then((response) => {
                if (response.data.status === "success") {
                    setOtpDetails(response.data.data.Details);
                    NotificationManager.success("OTP sent on mobile number");
                }
            });
    };

    //Address
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1000);
        };
    };

    const optimizedFn = useCallback(debounce(sendOtp), []);

    const handleZipCodeChange = async (event) => {
        const zipCode = event.target.value;
        if (zipCode.length === 6) {
            // Only try to look up location if pin code is complete
            try {
                const response = await axios.get(
                    `https://api.postalpincode.in/pincode/${zipCode}`
                );
                const { PostOffice } = response.data[0];
                const { District, State } = PostOffice[0];
                setCity(District);
                setState(State);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        }
        setZipCode(zipCode); // Always update zip code input value
    };

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axios.get(
                    `https://api.postalpincode.in/pincode/${zipCode}`
                );
                const { PostOffice } = response.data[0];
                const cityNames = PostOffice?.map((office) => office.Name);
                setCities(cityNames);
            } catch (error) {
                console.error(error);
            }
        };
        getCities();
    }, [zipCode]);

    //Address
    const handleSaveAddress = () => {
        const authToken = user.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`; // Set Authorization header with token
        axios
            .post("https://admin.leafymango.com/web/address/update", {
                zip_code: zipCode,
                address: address,
                city: city,
                state: state,
            })
            .then((response) => {
                // Handle successful response
                NotificationManager.success("Profile updated successfully.");
            })
            .catch((error) => {
                NotificationManager.error("Failed to update profile.");
                console.error(error);
            });
    };

    useEffect(() => {
        if (user?.token) {
            getProfile(user?.token)?.then((res) => {
                setData(res);
                const fullName =
                    `${res?.firstname.trim()} ${res?.lastname.trim()}`.trim(); // Remove leading/trailing spaces from firstname and lastname and trim the resulting full name
                setProfile({
                    ...profile,
                    full_name: fullName,
                    mobile: res?.mobile || "",
                    primary_number: res?.phone || "",
                    email: res?.email || "",
                    date_of_anniversary: res?.contact_cf?.date_of_anniversary || "",
                    bike_number: res?.contact_cf?.bike_number || "",
                    car_number: res?.contact_cf?.car_number || "",
                    house_number: res?.contact_cf?.house_number || "",
                    lucky_number: res?.contact_cf?.lucky_number || "",
                    zip_code: res?.address?.zipCode || "",
                    address: res?.address?.address || "",
                    city: res?.address?.city || "",
                    state: res?.address?.state || "",
                });
                setZipCode(res?.address?.zip_code || "");
                setCity(res?.address?.city || "");
                setState(res?.address?.state || "");
                setAddress(res?.address?.address || "");
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profile, user?.token)?.then((res) => {
                if (res?.status === "error") {
                    NotificationManager.error(Object.values(res?.data)?.[0]);
                } else {
                    setUserProfile(res?.data?.user);

                    NotificationManager.success("Profile updated successfully.");
                }
            });
            setIsSubmitted(true);
        } catch (error) {
            NotificationManager.error("Failed to update profile.");
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Remove the leading '+91', '00', or '0' from the mobile number.
        const cleanedValue = value.replace(/^(\+91|00|0)/, "");

        setProfile((prevState) => ({
            ...prevState,
            [name]: cleanedValue,
        }));
    };
    const handleDateChange = (field, date) => {
        setProfile((prevState) => ({
            ...prevState,
            [field]: date,
        }));
    };

    //Changes Password Api And Function
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        if (useOtp) {
            if (otp === "") {
                NotificationManager.error("OTP is required");
                return;
            }
            let curr = mobile;
            if (curr?.length >= 13 && curr?.startsWith("+91")) {
                curr = curr?.slice(3, 13);
            } else if (curr?.length >= 10 && !curr?.startsWith("+91")) {
                curr = curr;
            } else {
                return;
            }
            axios
                .post("https://admin.leafymango.com/web/password/reset", {
                    otp: otp,
                    password: newPassword,
                    password_confirmation: confirmPassword,
                    number: curr,
                    session_id: otpDetails,
                })
                .then((res) => {
                    if (res.data.status === "error") {
                        NotificationManager.error(res.data?.data?.Details);
                    } else {
                        NotificationManager.success("Password changed successfully!");
                    }
                });

            return;
        }
        if (
            oldPassword.trim() === "" ||
            newPassword.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            NotificationManager.error("All fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            NotificationManager.error(
                "New password and confirm password fields do not match."
            );
            return;
        }
        // Make API call with currentPassword, newPassword, and confirmPassword
        const token = user.token;
        fetch(" https://admin.leafymango.com/web/password/change", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    NotificationManager.success(data.message);
                } else if (data.status === "error") {
                    NotificationManager.error(data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                NotificationManager.error("An error occurred. Please try again later.");
            });
    };

    //Logout Pop up menu
    const handleLogout = () => {
        setShowConfirmationModal(true);
    };
    const handleConfirmLogout = () => {
        logout();
        setShowConfirmationModal(false);
    };
    const handleCancelLogout = () => {
        setShowConfirmationModal(false);
    };

    //Delete Account and modal handle
    const handleDelete = () => {
        setShowConfirmationModalss(true);
    };
    const handleConfirmDelete = async () => {
        const token = user?.token;
        try {
            const response = await axios.post(
                "https://admin.leafymango.com/web/profile/delete",
                [],
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.status) {
                if (response.data.status === "success") {
                    NotificationManager.success(
                        response.data.message ||
                        "Your profile has been deleted successfully",
                        "Success"
                    );
                    navigate.push("/");
                } else if (response.data.status === "error") {
                    NotificationManager.error(
                        response.data.message ||
                        "An error occurred while deleting your profile",
                        "Error"
                    );
                }
            } else {
                NotificationManager.error(
                    "Invalid response from the server:",
                    response
                );
            }
        } catch (error) {
            NotificationManager.error("Error deleting profile:");
        }
        setShowConfirmationModalss(false);
    };
    const handleCancelDelete = () => {
        setShowConfirmationModalss(false);
    };

    function parseDateString(dateString) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
            const [day, month, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day); // Note: Month is 0-indexed in JavaScript
            }
        }
        return null; // Return null for invalid date strings
    }

    return (
        <>
            <Header />
            <MobileHeader />
            <section className="profile-section-os">
                <div className="container-os">
                    <div className="profile-bradcrumbs-os">
                        <Link href="/">
                            Home<span></span>
                        </Link>
                        <Link href="/profile">
                            My Account<span></span>
                        </Link>
                        <Link href="/profile">Profile</Link>
                    </div>
                    <div className="profile-row-os">
                        <div className="profile-col-1-os">
                            <button
                                onClick={() => handleProfile("tab1")}
                                className={
                                    profileActive === "tab1"
                                        ? "profile-tab-os active"
                                        : "profile-tab-os"
                                }
                            >
                                Profile
                                <span>
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.7854 0C9.60034 0 8.44187 0.332923 7.4565 0.956669C6.47114 1.58042 5.70314 2.46697 5.24963 3.50422C4.79612 4.54147 4.67746 5.68284 4.90866 6.78398C5.13985 7.88512 5.71053 8.89658 6.54851 9.69046C7.38649 10.4843 8.45415 11.025 9.61646 11.244C10.7788 11.463 11.9835 11.3506 13.0784 10.921C14.1733 10.4913 15.1091 9.76376 15.7675 8.83026C16.4259 7.89675 16.7773 6.79925 16.7773 5.67654C16.7773 4.17103 16.146 2.72718 15.0223 1.66262C13.8986 0.598062 12.3746 0 10.7854 0V0ZM10.7854 9.08246C10.0744 9.08246 9.37929 8.88271 8.78807 8.50846C8.19685 8.13421 7.73605 7.60228 7.46395 6.97993C7.19184 6.35758 7.12064 5.67276 7.25936 5.01208C7.39808 4.35139 7.74049 3.74451 8.24328 3.26819C8.74607 2.79186 9.38666 2.46748 10.084 2.33606C10.7814 2.20464 11.5043 2.27209 12.1612 2.52988C12.8182 2.78766 13.3796 3.22421 13.7747 3.78431C14.1697 4.34441 14.3806 5.00291 14.3806 5.67654C14.3806 6.57985 14.0018 7.44616 13.3276 8.08489C12.6534 8.72363 11.7389 9.08246 10.7854 9.08246V9.08246ZM21.5709 21.5709V20.4355C21.5709 18.3278 20.687 16.3064 19.1139 14.8161C17.5407 13.3257 15.407 12.4884 13.1822 12.4884H8.38866C6.16385 12.4884 4.03016 13.3257 2.45698 14.8161C0.883803 16.3064 0 18.3278 0 20.4355V21.5709H2.39676V20.4355C2.39676 18.93 3.02805 17.4862 4.15175 16.4216C5.27545 15.3571 6.79951 14.759 8.38866 14.759H13.1822C14.7713 14.759 16.2954 15.3571 17.4191 16.4216C18.5428 17.4862 19.1741 18.93 19.1741 20.4355V21.5709H21.5709Z"
                                            fill="#1D1D1D"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={() => handleProfile("tab2")}
                                className={
                                    profileActive === "tab2"
                                        ? "profile-tab-os active"
                                        : "profile-tab-os"
                                }
                            >
                                Change/Set Password
                                <span>
                                    <svg
                                        width="22"
                                        height="21"
                                        viewBox="0 0 22 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.76146 0.0980171C7.83743 0.144517 7.90368 0.205859 7.95645 0.27854C8.00922 0.351221 8.04746 0.433817 8.069 0.52161C8.09053 0.609402 8.09493 0.700671 8.08195 0.790203C8.06897 0.879736 8.03886 0.965776 7.99335 1.04341L4.56089 6.8908H17.01L13.5762 1.04341C13.4843 0.886611 13.4571 0.698918 13.5006 0.521622C13.544 0.344326 13.6546 0.191951 13.808 0.0980171C13.9614 0.00408312 14.145 -0.0237148 14.3185 0.0207384C14.4919 0.0651916 14.641 0.178255 14.7329 0.335055L18.5819 6.8908H20.2227C20.5802 6.8908 20.9231 7.036 21.176 7.29445C21.4288 7.55289 21.5709 7.90343 21.5709 8.26893V9.64705C21.5709 10.0126 21.4288 10.3631 21.176 10.6215C20.9231 10.88 20.5802 11.0252 20.2227 11.0252V17.2267C20.2227 18.1405 19.8676 19.0168 19.2355 19.663C18.6034 20.3091 17.7461 20.6721 16.8522 20.6721H4.71862C3.82473 20.6721 2.96744 20.3091 2.33536 19.663C1.70328 19.0168 1.34818 18.1405 1.34818 17.2267V11.0252C0.990619 11.0252 0.647705 10.88 0.394872 10.6215C0.14204 10.3631 0 10.0126 0 9.64705V8.26893C0 7.90343 0.14204 7.55289 0.394872 7.29445C0.647705 7.036 0.990619 6.8908 1.34818 6.8908H2.98891L6.83526 0.335055C6.88075 0.257403 6.94076 0.189673 7.01186 0.135733C7.08296 0.0817931 7.16377 0.0427005 7.24965 0.0206884C7.33554 -0.00132369 7.42482 -0.00582403 7.51241 0.00744422C7.59999 0.0207125 7.68417 0.0514894 7.76011 0.0980171H7.76146ZM2.69636 11.0252V17.2267C2.69636 17.775 2.90942 18.3008 3.28866 18.6885C3.66791 19.0761 4.18228 19.2939 4.71862 19.2939H16.8522C17.3886 19.2939 17.9029 19.0761 18.2822 18.6885C18.6614 18.3008 18.8745 17.775 18.8745 17.2267V11.0252H2.69636ZM1.34818 8.26893V9.64705H20.2227V8.26893H1.34818ZM5.39271 12.4033C5.57149 12.4033 5.74295 12.4759 5.86937 12.6051C5.99578 12.7344 6.0668 12.9096 6.0668 13.0924V17.2267C6.0668 17.4095 5.99578 17.5848 5.86937 17.714C5.74295 17.8432 5.57149 17.9158 5.39271 17.9158C5.21393 17.9158 5.04248 17.8432 4.91606 17.714C4.78964 17.5848 4.71862 17.4095 4.71862 17.2267V13.0924C4.71862 12.9096 4.78964 12.7344 4.91606 12.6051C5.04248 12.4759 5.21393 12.4033 5.39271 12.4033ZM8.08907 12.4033C8.26785 12.4033 8.43931 12.4759 8.56572 12.6051C8.69214 12.7344 8.76316 12.9096 8.76316 13.0924V17.2267C8.76316 17.4095 8.69214 17.5848 8.56572 17.714C8.43931 17.8432 8.26785 17.9158 8.08907 17.9158C7.91029 17.9158 7.73883 17.8432 7.61242 17.714C7.486 17.5848 7.41498 17.4095 7.41498 17.2267V13.0924C7.41498 12.9096 7.486 12.7344 7.61242 12.6051C7.73883 12.4759 7.91029 12.4033 8.08907 12.4033V12.4033ZM10.7854 12.4033C10.9642 12.4033 11.1357 12.4759 11.2621 12.6051C11.3885 12.7344 11.4595 12.9096 11.4595 13.0924V17.2267C11.4595 17.4095 11.3885 17.5848 11.2621 17.714C11.1357 17.8432 10.9642 17.9158 10.7854 17.9158C10.6066 17.9158 10.4352 17.8432 10.3088 17.714C10.1824 17.5848 10.1113 17.4095 10.1113 17.2267V13.0924C10.1113 12.9096 10.1824 12.7344 10.3088 12.6051C10.4352 12.4759 10.6066 12.4033 10.7854 12.4033V12.4033ZM13.4818 12.4033C13.6606 12.4033 13.832 12.4759 13.9584 12.6051C14.0849 12.7344 14.1559 12.9096 14.1559 13.0924V17.2267C14.1559 17.4095 14.0849 17.5848 13.9584 17.714C13.832 17.8432 13.6606 17.9158 13.4818 17.9158C13.303 17.9158 13.1315 17.8432 13.0051 17.714C12.8787 17.5848 12.8077 17.4095 12.8077 17.2267V13.0924C12.8077 12.9096 12.8787 12.7344 13.0051 12.6051C13.1315 12.4759 13.303 12.4033 13.4818 12.4033ZM16.1781 12.4033C16.3569 12.4033 16.5284 12.4759 16.6548 12.6051C16.7812 12.7344 16.8522 12.9096 16.8522 13.0924V17.2267C16.8522 17.4095 16.7812 17.5848 16.6548 17.714C16.5284 17.8432 16.3569 17.9158 16.1781 17.9158C15.9994 17.9158 15.8279 17.8432 15.7015 17.714C15.5751 17.5848 15.504 17.4095 15.504 17.2267V13.0924C15.504 12.9096 15.5751 12.7344 15.7015 12.6051C15.8279 12.4759 15.9994 12.4033 16.1781 12.4033Z"
                                            fill="#7B7B7B"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={() => handleProfile("tab3")}
                                className={
                                    profileActive === "tab3"
                                        ? "profile-tab-os active"
                                        : "profile-tab-os"
                                }
                            >
                                Addresses
                                <span>
                                    <svg
                                        width="20"
                                        height="15"
                                        viewBox="0 0 20 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.4176 10.0664C13.2303 10.0664 13.0507 10.1422 12.9182 10.277C12.7858 10.4118 12.7114 10.5947 12.7114 10.7854C12.7114 10.9761 12.7858 11.159 12.9182 11.2939C13.0507 11.4287 13.2303 11.5045 13.4176 11.5045H16.2423C16.4296 11.5045 16.6093 11.4287 16.7417 11.2939C16.8741 11.159 16.9485 10.9761 16.9485 10.7854C16.9485 10.5947 16.8741 10.4118 16.7417 10.277C16.6093 10.1422 16.4296 10.0664 16.2423 10.0664H13.4176ZM0 2.87611C0 2.11332 0.297607 1.38177 0.827351 0.842394C1.3571 0.303018 2.07558 0 2.82475 0H16.9485C17.6977 0 18.4162 0.303018 18.9459 0.842394C19.4757 1.38177 19.7733 2.11332 19.7733 2.87611V11.5045C19.7733 12.2672 19.4757 12.9988 18.9459 13.5382C18.4162 14.0775 17.6977 14.3806 16.9485 14.3806H2.82475C2.07558 14.3806 1.3571 14.0775 0.827351 13.5382C0.297607 12.9988 0 12.2672 0 11.5045V2.87611ZM18.3609 2.87611C18.3609 2.49472 18.2121 2.12894 17.9472 1.85925C17.6824 1.58957 17.3231 1.43806 16.9485 1.43806H2.82475C2.45017 1.43806 2.09092 1.58957 1.82605 1.85925C1.56118 2.12894 1.41238 2.49472 1.41238 2.87611V4.31417H18.3609V2.87611ZM1.41238 11.5045C1.41238 11.8859 1.56118 12.2516 1.82605 12.5213C2.09092 12.791 2.45017 12.9425 2.82475 12.9425H16.9485C17.3231 12.9425 17.6824 12.791 17.9472 12.5213C18.2121 12.2516 18.3609 11.8859 18.3609 11.5045V5.75223H1.41238V11.5045Z"
                                            fill="#7B7B7B"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className={
                                    profileActive === "tab5"
                                        ? "profile-tab-os active"
                                        : "profile-tab-os"
                                }
                            >
                                Logout
                                <span>
                                    <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.4987 11.9897H13.202C13.1134 11.9897 13.0304 12.0285 12.9751 12.0967C12.846 12.2535 12.7076 12.4048 12.5619 12.5486C11.9659 13.1452 11.26 13.6207 10.4831 13.9487C9.67823 14.2886 8.81315 14.463 7.93943 14.4615C7.05589 14.4615 6.20001 14.2881 5.39577 13.9487C4.61889 13.6207 3.91294 13.1452 3.31694 12.5486C2.71989 11.9541 2.24381 11.2493 1.91507 10.4735C1.57383 9.66926 1.40228 8.81523 1.40228 7.93168C1.40228 7.04813 1.57567 6.19409 1.91507 5.38986C2.24341 4.6133 2.71562 3.91421 3.31694 3.31472C3.91827 2.71523 4.61737 2.24302 5.39577 1.91469C6.20001 1.57529 7.05589 1.4019 7.93943 1.4019C8.82298 1.4019 9.67886 1.57345 10.4831 1.91469C11.2615 2.24302 11.9606 2.71523 12.5619 3.31472C12.7076 3.46044 12.8441 3.6117 12.9751 3.76664C13.0304 3.83489 13.1153 3.87362 13.202 3.87362H14.4987C14.6149 3.87362 14.6869 3.7445 14.6223 3.64674C13.2075 1.44802 10.7321 -0.00735036 7.91914 2.79243e-05C3.49956 0.0110953 -0.0438593 3.59878 0.000410333 8.01284C0.04468 12.3568 3.58256 15.8633 7.93943 15.8633C10.745 15.8633 13.2094 14.4098 14.6223 12.2166C14.685 12.1189 14.6149 11.9897 14.4987 11.9897ZM16.1385 7.81547L13.5211 5.74955C13.4233 5.67208 13.2813 5.74217 13.2813 5.86576V7.26763H7.48936C7.4082 7.26763 7.34179 7.33404 7.34179 7.4152V8.44816C7.34179 8.52932 7.4082 8.59572 7.48936 8.59572H13.2813V9.9976C13.2813 10.1212 13.4252 10.1913 13.5211 10.1138L16.1385 8.04789C16.1562 8.03408 16.1704 8.01645 16.1803 7.99631C16.1901 7.97618 16.1952 7.95408 16.1952 7.93168C16.1952 7.90928 16.1901 7.88718 16.1803 7.86704C16.1704 7.84691 16.1562 7.82927 16.1385 7.81547V7.81547Z"
                                            fill="#7B7B7B"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <LogoutModal
                                showConfirmationModal={showConfirmationModal}
                                handleCancelLogout={handleCancelLogout}
                                handleConfirmLogout={handleConfirmLogout}
                            />
                            <button
                                type="button"
                                onClick={handleDelete}
                                className={
                                    profileActive === "tab6"
                                        ? "profile-tab-os active"
                                        : "profile-tab-os"
                                }
                            >
                                Delete
                                <span>
                                    {/* <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4987 11.9897H13.202C13.1134 11.9897 13.0304 12.0285 12.9751 12.0967C12.846 12.2535 12.7076 12.4048 12.5619 12.5486C11.9659 13.1452 11.26 13.6207 10.4831 13.9487C9.67823 14.2886 8.81315 14.463 7.93943 14.4615C7.05589 14.4615 6.20001 14.2881 5.39577 13.9487C4.61889 13.6207 3.91294 13.1452 3.31694 12.5486C2.71989 11.9541 2.24381 11.2493 1.91507 10.4735C1.57383 9.66926 1.40228 8.81523 1.40228 7.93168C1.40228 7.04813 1.57567 6.19409 1.91507 5.38986C2.24341 4.6133 2.71562 3.91421 3.31694 3.31472C3.91827 2.71523 4.61737 2.24302 5.39577 1.91469C6.20001 1.57529 7.05589 1.4019 7.93943 1.4019C8.82298 1.4019 9.67886 1.57345 10.4831 1.91469C11.2615 2.24302 11.9606 2.71523 12.5619 3.31472C12.7076 3.46044 12.8441 3.6117 12.9751 3.76664C13.0304 3.83489 13.1153 3.87362 13.202 3.87362H14.4987C14.6149 3.87362 14.6869 3.7445 14.6223 3.64674C13.2075 1.44802 10.7321 -0.00735036 7.91914 2.79243e-05C3.49956 0.0110953 -0.0438593 3.59878 0.000410333 8.01284C0.04468 12.3568 3.58256 15.8633 7.93943 15.8633C10.745 15.8633 13.2094 14.4098 14.6223 12.2166C14.685 12.1189 14.6149 11.9897 14.4987 11.9897ZM16.1385 7.81547L13.5211 5.74955C13.4233 5.67208 13.2813 5.74217 13.2813 5.86576V7.26763H7.48936C7.4082 7.26763 7.34179 7.33404 7.34179 7.4152V8.44816C7.34179 8.52932 7.4082 8.59572 7.48936 8.59572H13.2813V9.9976C13.2813 10.1212 13.4252 10.1913 13.5211 10.1138L16.1385 8.04789C16.1562 8.03408 16.1704 8.01645 16.1803 7.99631C16.1901 7.97618 16.1952 7.95408 16.1952 7.93168C16.1952 7.90928 16.1901 7.88718 16.1803 7.86704C16.1704 7.84691 16.1562 7.82927 16.1385 7.81547V7.81547Z"
                      fill="#7B7B7B"
                    />
                  </svg> */}
                                    <DeleteOutlinedIcon />
                                </span>
                            </button>
                            <DeleteModal
                                showConfirmationModalss={showConfirmationModalss}
                                handleConfirmDelete={handleConfirmDelete}
                                handleCancelDelete={handleCancelDelete}
                            />
                        </div>

                        <div
                            className={`profile-col-2-os ${profileActive === "tab1"
                                    ? "profile-content-os active"
                                    : "profile-content-os"
                                }`}
                        >
                            <div className="profile-heading-os">Profile</div>

                            <div className="profile-row-21-os">
                                <form className="profile-col-21-os" onSubmit={handleSubmit}>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="text"
                                            placeholder="Your Full Name"
                                            name="full_name"
                                            value={profile?.full_name || ""}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mobile No."
                                            autoFocus
                                            value={profile?.mobile || ""}
                                            name="mobile"
                                            onChange={handleInputChange}
                                            disabled={profile?.mobile !== "" && isSubmitted}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="number"
                                            placeholder="Primary No."
                                            name="primary_number"
                                            value={profile?.primary_number || ""}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={profile?.email || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        {/* <input
                      type="text"
                      placeholder="Date of Anniversary"
                      name="date_of_anniversary"
                      value={profile?.date_of_anniversary || ""}
                      // onFocus={(e) => (e.target.type = "date")}
                      onFocus={(e) => {
                        if (!e.target.value) {
                          e.target.type = "date";
                        }
                      }}
                      
                      onChange={handleInputChange}
                    /> */}
                                        <DatePicker
                                            className="date-picker-npm-os"
                                            placeholderText="Date of Anniversary"
                                            selected={
                                                profile?.date_of_anniversary
                                                    ? parseDateString(profile.date_of_anniversary || "")
                                                    : null
                                            }
                                            dateFormat="dd/MM/yyyy" // Use "dd/MM/yyyy" format for display
                                            onChange={(date) => {
                                                if (date) {
                                                    const formattedDate = `${date
                                                        .getDate()
                                                        .toString()
                                                        .padStart(2, "0")}/${(date.getMonth() + 1)
                                                            .toString()
                                                            .padStart(2, "0")}/${date.getFullYear()}`;
                                                    setProfile((prevState) => ({
                                                        ...prevState,
                                                        date_of_anniversary: formattedDate,
                                                    }));
                                                } else {
                                                    setProfile((prevState) => ({
                                                        ...prevState,
                                                        date_of_anniversary: "",
                                                    }));
                                                }
                                            }}
                                            locale="en-US"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Date of Birth"
                                            name="date_of_birth"
                                            onFocus={(e) => (e.target.type = "date")}
                                            value={profile?.date_of_birth || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="number"
                                            placeholder="House No."
                                            name="house_number"
                                            value={profile?.house_number || ""}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Bike No."
                                            name="bike_number"
                                            value={profile?.bike_number || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="number"
                                            placeholder="Vehical No."
                                            name="car_number"
                                            value={profile?.car_number || ""}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Lucky No."
                                            name="lucky_number"
                                            value={profile?.lucky_number || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="profile-input-submit-button-os">
                                        <button type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div
                            className={`profile-col-2-os ${profileActive === "tab2"
                                    ? "profile-content-os active"
                                    : "profile-content-os"
                                }`}
                        >
                            <div className="profile-heading-os">
                                {useOtp ? "Set " : "Change "} Password
                            </div>
                            <div className="profile-row-21-os">
                                <form
                                    className="profile-col-21-os"
                                    onSubmit={handleSubmitChangePassword}
                                >
                                    <div className="checkbox-mobile-input-os search-section-os-1">
                                        <label className="multiple-filters-checkbox-os">
                                            Change password by Mobile
                                            <input
                                                type="checkbox"
                                                value={useOtp}
                                                onChange={(e) => setUseOtp(e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    {useOtp ? (
                                        <>
                                            <div className="profile-input-field-os">
                                                <input
                                                    type="text"
                                                    placeholder="Mobile No"
                                                    value={mobile}
                                                    onChange={(e) => {
                                                        const filteredValue = e.target.value.replace(
                                                            /[^+0-9,]/g,
                                                            ""
                                                        );
                                                        setMobile(filteredValue || "");
                                                        if (
                                                            filteredValue?.length >= 13 &&
                                                            filteredValue?.startsWith("+91")
                                                        ) {
                                                            sendOtp(filteredValue?.slice(3, 13));
                                                        } else if (
                                                            filteredValue?.length >= 10 &&
                                                            !filteredValue?.startsWith("+91")
                                                        ) {
                                                            sendOtp(filteredValue);
                                                        } else {
                                                            setOtpDetails(); // reset otp details
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {otpDetails && (
                                                <div className="profile-input-field-os">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter OTP"
                                                        value={otp}
                                                        onChange={(e) => {
                                                            setOtp(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="profile-input-field-os">
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="profile-input-field-os">
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="profile-input-submit-button-os">
                                        <button type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div
                            className={`profile-col-2-os ${profileActive === "tab3"
                                    ? "profile-content-os active"
                                    : "profile-content-os"
                                }`}
                        >
                            <div className="profile-heading-os">Addresses</div>
                            <div className="profile-row-21-os">
                                <form className="profile-col-21-os">
                                    <div className="profile-input-field-os">
                                        <input
                                            type="number"
                                            placeholder="Postal Code"
                                            value={zipCode}
                                            onChange={handleZipCodeChange}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </div>
                                    <div className="profile-input-field-os">
                                        <select
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                        >
                                            <option value="">Select City</option>
                                            {cities?.map((cityName) => (
                                                <option key={cityName} value={cityName}>
                                                    {cityName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="profile-input-field-os">
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={state}
                                            onChange={(event) => setState(event.target.value)}
                                        />
                                    </div>
                                    <div className="profile-input-submit-button-os">
                                        <button type="button" onClick={handleSaveAddress}>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className={`profile-col-2-os ${profileActive === "tab4"
                                    ? "profile-content-os active"
                                    : "profile-content-os"
                                }`}
                        >
                            <div className="profile-heading-os">Addresses</div>
                            <div className="profile-row-21-os">
                                <form className="profile-col-21-os">
                                    <div className="profile-address-not-set-text-os">
                                        You have not set up this type of address yet.
                                    </div>
                                    <div className="profile-input-submit-button-os">
                                        <button type="password">Add new address</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;