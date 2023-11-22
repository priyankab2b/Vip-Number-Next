"use client"
import React, { useState, useContext, useEffect } from "react";
import "./MobileHeader.css";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
// import { Link, useNavigate, useLocation } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import axios from "axios";
import Avatar from "react-avatar";
import ListIcon from "@mui/icons-material/Style";
import CallUsPopup from "../CallUsPopup/CallUsPopup";

// Images
import callIcon from "../../assets/mobile-header-call-icon.svg";
import brand1 from "../../assets/VIP-logo-1.svg";
import userIcon from "../../assets/mobile-user-icon.svg";
import backArrow from "../../assets/mobile-header-arrow.svg";
import blankIcon from "../../assets/profile-user-black.png";
import navLinkcon1 from "../../assets/mobile-navLink-icon1.svg";
import navLinkcon2 from "../../assets/mobile-navLink-icon2.svg";
import navLinkcon3 from "../../assets/mobile-navLink-icon3.svg";
import navLinkcon4 from "../../assets/mobile-navLink-icon4.svg";
import navLinkcon5 from "../../assets/mobile-navLink-icon5.svg";
import navLinkcon6 from "../../assets/mobile-navLink-icon6.svg";
import navLinkcon7 from "../../assets/mobile-navLink-icon7.svg";
import SearchIcon from "../../assets/search-icon-header.png";
import WhatsApp from "../../assets/whats-app-icon.svg";
// import

const MobileHeader = () => {
    const navigate = usePathname();
    const location = usePathname();
    const { setActiveRegisterForm, setActiveSignInWithOtp } = useContext(
        MyRegisterSignInContext
    );
    const { user, categoriesData, userProfile, cartItems, wishListItem } =
        useContext(AppStateContext);
    const [category, setCategory] = useState();
    const { email, firstname, lastname, mobile } = user?.user || {};
    const [data, setData] = useState([]);
    const [fetchData, setFetchData] = useState(false);
    const [activeNavbar, setActiveNavbar] = useState("");
    const [activeLink, setActiveLink] = useState("");
    const [contactPopup, setContactPopup] = useState(false);
    const [activeCategories, setActiveCategories] = useState("");
    const [activeCategory, setActiveCategory] = useState();
    const [activeCategoryLink, setActiveCategoryLink] = useState(null);
    const [headerOption, setHeaderOption] = useState(false);

    // whats app redirect
    const openWhatsApp = () => {
        window.open("https://api.whatsapp.com/send?phone=916009160092");
    };

    useEffect(() => {
        if (categoriesData) {
            setCategory(categoriesData);
        }
    }, [categoriesData]);

    const handleCategoryLink = (value) => {
        setActiveCategoryLink(value);
    };

    useEffect(() => {
        if (fetchData) {
            axios
                .get("https://admin.leafymango.com/web/call/us")
                .then((response) => {
                    setData(response?.data?.data);
                    setFetchData(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [fetchData]);

    const getName = () => {
        if (!user) {
            return false;
        }
        if (
            firstname ||
            lastname ||
            userProfile?.firstname ||
            userProfile?.lastname
        ) {
            return `${userProfile?.firstname || firstname} ${userProfile?.lastname || lastname
                }`;
        } else if (mobile || email) {
            return mobile || email;
        } else {
            return false;
        }
    };
    // Mobile navbar toogle
    const mobileToggleActive = () => {
        setActiveNavbar(true);
    };
    const mobileToggleInactive = () => {
        setActiveNavbar(false);
    };

    // Mobile Navbar edit profile button
    const handleProfileEdit = () => {
        navigate("/profile");
    };

    // NavLinks handle
    const handleMobileLinks = (value) => {
        if (activeLink === value) {
            setActiveLink("");
        } else {
            setActiveLink(value);
        }
    };

    // Show categories menu
    const handleMobileCategories = () => {
        if (activeCategories === "active") {
            setActiveCategories("");
        } else {
            setActiveCategories("active");
        }
    };

    // Show category menu
    const handleMobileCategory = (value) => {
        if (activeCategory === value) {
            setActiveCategory("");
        } else {
            setActiveCategory(value);
        }
    };

    const handleClick = () => {
        if (getName()) {
            navigate("/profile");
        } else {
            setActiveSignInWithOtp(true);
        }
    };

    function goBack() {
        window.history.back();
    }



    const HandleSearchIcon = () => {
        var secondElement = document.querySelector("#mobile-search-id-os");
        var secondElementOffset = secondElement?.offsetTop;
        if (window.location.pathname !== "/") {
            navigate("/");
            console.log("Current Path:", window.location.pathname);
        } else {
            window.scrollTo({
                top: secondElementOffset,
                behavior: "smooth",
            });
        }
    };








    return (
        <>
            <div className="MobileHeader-custom-os"></div>
            <header className="MobileHeader-main-os">
                <div className="container-os">
                    <div className="MobileHeader-row-os">
                        <div className="MobileHeader-header-os">
                            <section className="option-widgid-section-os">
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setHeaderOption(false);
                                    }}
                                >
                                    <div
                                        className={`option-widgid-content-os ${headerOption ? "active" : ""
                                            }`}
                                    >
                                        <button
                                            onClick={() => {
                                                setHeaderOption(!headerOption);
                                            }}
                                            className="option-widgid-os"
                                        >
                                            <ListIcon />
                                        </button>
                                        <div className="option-widgid-link-1-os">
                                            <div className="MobileHeader-user-os">
                                                {location.pathname === "/" ? (
                                                    <div
                                                        className="MobileHeader-user-icon-os"
                                                        onClick={() => {
                                                            if (getName()) {
                                                                navigate("/profile");
                                                            } else {
                                                                setActiveSignInWithOtp(true);
                                                            }
                                                        }}
                                                    >
                                                        <Image src={userIcon} alt="" />
                                                    </div>
                                                ) : (
                                                    <button onClick={goBack}>
                                                        <Image src={backArrow} alt="" />
                                                    </button>
                                                )}
                                            </div>
                                            {/* <span>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7854 0C9.60034 0 8.44187 0.332923 7.4565 0.956669C6.47114 1.58042 5.70314 2.46697 5.24963 3.50422C4.79612 4.54147 4.67746 5.68284 4.90866 6.78398C5.13985 7.88512 5.71053 8.89658 6.54851 9.69046C7.38649 10.4843 8.45415 11.025 9.61646 11.244C10.7788 11.463 11.9835 11.3506 13.0784 10.921C14.1733 10.4913 15.1091 9.76376 15.7675 8.83026C16.4259 7.89675 16.7773 6.79925 16.7773 5.67654C16.7773 4.17103 16.146 2.72718 15.0223 1.66262C13.8986 0.598062 12.3746 0 10.7854 0V0ZM10.7854 9.08246C10.0744 9.08246 9.37929 8.88271 8.78807 8.50846C8.19685 8.13421 7.73605 7.60228 7.46395 6.97993C7.19184 6.35758 7.12064 5.67276 7.25936 5.01208C7.39808 4.35139 7.74049 3.74451 8.24328 3.26819C8.74607 2.79186 9.38666 2.46748 10.084 2.33606C10.7814 2.20464 11.5043 2.27209 12.1612 2.52988C12.8182 2.78766 13.3796 3.22421 13.7747 3.78431C14.1697 4.34441 14.3806 5.00291 14.3806 5.67654C14.3806 6.57985 14.0018 7.44616 13.3276 8.08489C12.6534 8.72363 11.7389 9.08246 10.7854 9.08246V9.08246ZM21.5709 21.5709V20.4355C21.5709 18.3278 20.687 16.3064 19.1139 14.8161C17.5407 13.3257 15.407 12.4884 13.1822 12.4884H8.38866C6.16385 12.4884 4.03016 13.3257 2.45698 14.8161C0.883803 16.3064 0 18.3278 0 20.4355V21.5709H2.39676V20.4355C2.39676 18.93 3.02805 17.4862 4.15175 16.4216C5.27545 15.3571 6.79951 14.759 8.38866 14.759H13.1822C14.7713 14.759 16.2954 15.3571 17.4191 16.4216C18.5428 17.4862 19.1741 18.93 19.1741 20.4355V21.5709H21.5709Z"
                          fill="#8547FE"
                        ></path>
                      </svg>
                    </span> */}
                                        </div>
                                        <Link className="option-widgid-link-2-os" href="/wishlist">
                                            <span className="widgit-count-os">
                                                {wishListItem?.length}
                                            </span>
                                            <span>
                                                <svg
                                                    width="20"
                                                    height="19"
                                                    viewBox="0 0 20 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                                                        fill="#6019eb"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </Link>
                                        <Link className="option-widgid-link-3-os" href="/cart">
                                            <span className="widgit-count-os">
                                                {cartItems?.length}
                                            </span>
                                            <span>
                                                <svg
                                                    width="23"
                                                    height="22"
                                                    viewBox="0 0 23 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.27569 0.104314C8.35668 0.1538 8.42733 0.219083 8.4836 0.296433C8.53986 0.373783 8.58064 0.461685 8.6036 0.555117C8.62656 0.648549 8.63125 0.745681 8.61741 0.840965C8.60357 0.936248 8.57147 1.02782 8.52294 1.11044L4.86306 7.33345H18.1369L14.4756 1.11044C14.3776 0.943566 14.3486 0.743816 14.395 0.55513C14.4414 0.366445 14.5593 0.204282 14.7229 0.104314C14.8864 0.00434541 15.0822 -0.0252382 15.2671 0.0220706C15.4521 0.0693793 15.611 0.189705 15.709 0.356578L19.8131 7.33345H21.5625C21.9437 7.33345 22.3094 7.48798 22.579 7.76303C22.8485 8.03808 23 8.41113 23 8.80011V10.2668C23 10.6557 22.8485 11.0288 22.579 11.3038C22.3094 11.5789 21.9437 11.7334 21.5625 11.7334V18.3334C21.5625 19.3058 21.1839 20.2384 20.5099 20.9261C19.836 21.6137 18.9219 22 17.9688 22H5.03125C4.07813 22 3.16404 21.6137 2.49009 20.9261C1.81613 20.2384 1.4375 19.3058 1.4375 18.3334V11.7334C1.05625 11.7334 0.690618 11.5789 0.421034 11.3038C0.15145 11.0288 0 10.6557 0 10.2668V8.80011C0 8.41113 0.15145 8.03808 0.421034 7.76303C0.690618 7.48798 1.05625 7.33345 1.4375 7.33345H3.18694L7.28813 0.356578C7.33663 0.273938 7.40061 0.201857 7.47643 0.144452C7.55224 0.0870474 7.63839 0.0454435 7.72997 0.0220174C7.82154 -0.00140872 7.91674 -0.00619815 8.01013 0.00792242C8.10352 0.022043 8.19327 0.054797 8.27425 0.104314H8.27569ZM2.875 11.7334V18.3334C2.875 18.9168 3.10218 19.4764 3.50655 19.889C3.91093 20.3016 4.45938 20.5333 5.03125 20.5333H17.9688C18.5406 20.5333 19.0891 20.3016 19.4935 19.889C19.8978 19.4764 20.125 18.9168 20.125 18.3334V11.7334H2.875ZM1.4375 8.80011V10.2668H21.5625V8.80011H1.4375ZM5.75 13.2001C5.94062 13.2001 6.12344 13.2773 6.25823 13.4149C6.39302 13.5524 6.46875 13.7389 6.46875 13.9334V18.3334C6.46875 18.5279 6.39302 18.7144 6.25823 18.8519C6.12344 18.9894 5.94062 19.0667 5.75 19.0667C5.55938 19.0667 5.37656 18.9894 5.24177 18.8519C5.10698 18.7144 5.03125 18.5279 5.03125 18.3334V13.9334C5.03125 13.7389 5.10698 13.5524 5.24177 13.4149C5.37656 13.2773 5.55938 13.2001 5.75 13.2001ZM8.625 13.2001C8.81562 13.2001 8.99844 13.2773 9.13323 13.4149C9.26802 13.5524 9.34375 13.7389 9.34375 13.9334V18.3334C9.34375 18.5279 9.26802 18.7144 9.13323 18.8519C8.99844 18.9894 8.81562 19.0667 8.625 19.0667C8.43438 19.0667 8.25156 18.9894 8.11677 18.8519C7.98198 18.7144 7.90625 18.5279 7.90625 18.3334V13.9334C7.90625 13.7389 7.98198 13.5524 8.11677 13.4149C8.25156 13.2773 8.43438 13.2001 8.625 13.2001ZM11.5 13.2001C11.6906 13.2001 11.8734 13.2773 12.0082 13.4149C12.143 13.5524 12.2188 13.7389 12.2188 13.9334V18.3334C12.2188 18.5279 12.143 18.7144 12.0082 18.8519C11.8734 18.9894 11.6906 19.0667 11.5 19.0667C11.3094 19.0667 11.1266 18.9894 10.9918 18.8519C10.857 18.7144 10.7812 18.5279 10.7812 18.3334V13.9334C10.7812 13.7389 10.857 13.5524 10.9918 13.4149C11.1266 13.2773 11.3094 13.2001 11.5 13.2001ZM14.375 13.2001C14.5656 13.2001 14.7484 13.2773 14.8832 13.4149C15.018 13.5524 15.0938 13.7389 15.0938 13.9334V18.3334C15.0938 18.5279 15.018 18.7144 14.8832 18.8519C14.7484 18.9894 14.5656 19.0667 14.375 19.0667C14.1844 19.0667 14.0016 18.9894 13.8668 18.8519C13.732 18.7144 13.6562 18.5279 13.6562 18.3334V13.9334C13.6562 13.7389 13.732 13.5524 13.8668 13.4149C14.0016 13.2773 14.1844 13.2001 14.375 13.2001ZM17.25 13.2001C17.4406 13.2001 17.6234 13.2773 17.7582 13.4149C17.893 13.5524 17.9688 13.7389 17.9688 13.9334V18.3334C17.9688 18.5279 17.893 18.7144 17.7582 18.8519C17.6234 18.9894 17.4406 19.0667 17.25 19.0667C17.0594 19.0667 16.8766 18.9894 16.7418 18.8519C16.607 18.7144 16.5312 18.5279 16.5312 18.3334V13.9334C16.5312 13.7389 16.607 13.5524 16.7418 13.4149C16.8766 13.2773 17.0594 13.2001 17.25 13.2001Z"
                                                        fill="#6019EB"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </OutsideClickHandler>
                            </section>

                            {/*  */}
                            {/* <div className="MobileHeader-user-os">
                {location.pathname === "/" ? (
                  <div
                    className="MobileHeader-user-icon-os"
                    onClick={() => {
                      if (getName()) {
                        navigate("/profile");
                      } else {
                        setActiveSignInWithOtp(true);
                      }
                    }}
                  >
                    <Image src={userIcon} alt="" />
                  </div>
                ) : (
                  <Link onClick={goBack}>
                    <Image src={backArrow} alt="" />
                  </Link>
                )}
              </div> */}

                            <div className="MobileHeader-brand-os">
                                <Link href="/">
                                    <Image src={brand1} alt="" />
                                </Link>
                            </div>
                            <div className="MobileHeader-toggle-data-os">
                                <div onClick={HandleSearchIcon} className="search-icon-os">
                                    <span>
                                        <Image src={SearchIcon} alt="" />
                                    </span>
                                </div>

                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setContactPopup(false);
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setContactPopup(!contactPopup);
                                            if (!contactPopup) {
                                                setFetchData(true);
                                            }
                                        }}
                                        className="MobileHeader-contact-btn-os"
                                    >
                                        <Image src={callIcon} alt="" />
                                        <span></span>
                                    </button>

                                    {contactPopup && (
                                        <div className="MobileHeader-contact-us-pop-os">
                                            <CallUsPopup contactData={data} />
                                        </div>
                                    )}
                                </OutsideClickHandler>

                                <div
                                    onClick={mobileToggleActive}
                                    className="MobileHeader-toggle-button-os"
                                >
                                    <svg
                                        width="21"
                                        height="16"
                                        viewBox="0 0 21 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line
                                            x1="1"
                                            y1="1"
                                            x2="19.9942"
                                            y2="1"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="6.11743"
                                            y1="7.5459"
                                            x2="19.9942"
                                            y2="7.5459"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="3.88794"
                                            y1="14.0913"
                                            x2="19.9943"
                                            y2="14.0913"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="MobileHeader-sideNavbar-section-os">
                    <div
                        className={
                            activeNavbar
                                ? "MobileHeader-sideNavbar-main-row-os active"
                                : "MobileHeader-sideNavbar-main-row-os"
                        }
                    >
                        <div className="MobileHeader-sideNavbar-main-col-1-os">
                            <div className="MobileHeader-sideNavbar-profile-login-data-os">
                                {(firstname || lastname) && (
                                    <div className="login-account-image-os">
                                        <Avatar
                                            name={firstname ? firstname : lastname}
                                            size="36"
                                            round={true}
                                            className="avatar-image"
                                        />
                                    </div>
                                )}
                                <div
                                    className="MobileHeader-sideNavbar-profile-name-os"
                                    onClick={() => {
                                        if (getName()) {
                                            navigate("/profile");
                                        }
                                    }}
                                >
                                    {getName() ? (
                                        <div className="MobileHeader-myaccount-profilename-os">
                                            <span>My Account,</span>
                                            <span>{getName()}</span>
                                        </div>
                                    ) : (
                                        <div className="MobileHeader-login-register-os">
                                            <span
                                                onClick={() => {
                                                    setActiveSignInWithOtp(true);
                                                }}
                                            >
                                                Login &nbsp;
                                            </span>
                                            / &nbsp;
                                            <span
                                                onClick={() => {
                                                    setActiveRegisterForm(true);
                                                }}
                                            >
                                                Register
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div
                                    onClick={mobileToggleInactive}
                                    className="MobileHeader-sideNavbar-cross-button-os"
                                >
                                    <p>
                                        <span>X</span>
                                    </p>
                                </div>
                            </div>
                            <div className="MobileHeader-sideNavbar-links-main-row-os">
                                <div className="MobileHeader-sideNavbar-profile-location-data-os">
                                    <div className="MobileHeader-sideNavbar-profile-location-col-1-os">
                                        <span>
                                            <svg
                                                width="19"
                                                height="22"
                                                viewBox="0 0 19 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.62244 12.4299C10.0322 12.4299 10.4379 12.3492 10.8164 12.1924C11.1949 12.0357 11.5389 11.8058 11.8286 11.5161C12.1183 11.2264 12.3482 10.8824 12.5049 10.5039C12.6617 10.1254 12.7424 9.71967 12.7424 9.30994C12.7424 8.90022 12.6617 8.49451 12.5049 8.11597C12.3482 7.73743 12.1183 7.39349 11.8286 7.10377C11.5389 6.81405 11.1949 6.58423 10.8164 6.42744C10.4379 6.27064 10.0322 6.18994 9.62244 6.18994C8.79497 6.18994 8.00138 6.51865 7.41627 7.10377C6.83115 7.68888 6.50244 8.48247 6.50244 9.30994C6.50244 10.1374 6.83115 10.931 7.41627 11.5161C8.00138 12.1012 8.79497 12.4299 9.62244 12.4299Z"
                                                    stroke="black"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M1.24276 7.49C3.21276 -1.17 16.0428 -1.16 18.0028 7.5C19.1528 12.58 15.9928 16.88 13.2228 19.54C12.2548 20.4735 10.9625 20.9952 9.61776 20.9952C8.273 20.9952 6.98068 20.4735 6.01276 19.54C3.25276 16.88 0.0927559 12.57 1.24276 7.49Z"
                                                    stroke="black"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </span>
                                        <p>Home:</p>
                                        <p>
                                            {userProfile?.address?.address}
                                            {userProfile?.address?.city}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleProfileEdit}
                                        className="MobileHeader-sideNavbar-profile-location-col-2-os"
                                    >
                                        <span>
                                            <svg
                                                width="13"
                                                height="14"
                                                viewBox="0 0 13 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.04247 0.0161687C9.69743 -0.0736657 10.3842 0.207461 11.1143 0.944338L11.1148 0.944834C11.8477 1.68831 12.1508 2.40988 12.1047 3.11774C12.0596 3.8105 11.6832 4.41488 11.2202 4.9396M11.2202 4.9396L6.03591 10.8255C5.91082 10.972 5.73518 11.1029 5.56053 11.2031C5.38449 11.304 5.18696 11.3866 5.00938 11.4204L5.00761 11.4208L2.97415 11.7933C2.53654 11.8743 2.13243 11.7555 1.84937 11.4675C1.56658 11.1799 1.43394 10.7533 1.48287 10.2809L1.48296 10.28L1.71723 8.07954C1.74086 7.88949 1.80844 7.67448 1.8923 7.48161C1.97597 7.28916 2.08656 7.09418 2.21039 6.95278L2.21091 6.95219L7.39665 1.06462C7.85987 0.539761 8.40147 0.104089 9.04247 0.0161687M7.78386 1.4574C8.21751 0.966108 8.65209 0.646019 9.11007 0.583202C9.55409 0.522301 10.0894 0.695037 10.7488 1.36032C11.4116 2.03278 11.6043 2.59843 11.5731 3.07788C11.5408 3.57236 11.2667 4.05532 10.8329 4.54682L5.64702 10.4346L5.6438 10.4383C5.5732 10.5214 5.45278 10.6166 5.30925 10.699C5.16669 10.7807 5.02351 10.837 4.91693 10.8575C4.91665 10.8575 4.91638 10.8576 4.9161 10.8576L2.884 11.2299L2.8836 11.23C2.58851 11.2846 2.36098 11.2001 2.2161 11.0527C2.07102 10.9052 1.97945 10.6646 2.01251 10.3444C2.01252 10.3443 2.01254 10.3442 2.01255 10.344L2.24586 8.15265C2.26048 8.03804 2.30647 7.88152 2.3753 7.72322C2.44473 7.56351 2.52671 7.42661 2.59863 7.3444C2.59857 7.34448 2.5987 7.34433 2.59863 7.3444L7.78386 1.4574Z"
                                                    fill="black"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M6.37915 2.18541C6.53796 2.16151 6.68683 2.26607 6.71166 2.41896C6.84633 3.24819 7.26321 4.0109 7.89685 4.58735C8.5305 5.1638 9.34504 5.52136 10.2126 5.6039C10.3726 5.61912 10.4894 5.7563 10.4736 5.9103C10.4578 6.0643 10.3153 6.1768 10.1554 6.16158C9.15946 6.06683 8.22444 5.65638 7.49706 4.99466C6.76969 4.33294 6.29115 3.45742 6.13656 2.50553C6.11173 2.35264 6.22034 2.20931 6.37915 2.18541ZM0 13.72C0 13.5652 0.130305 13.4398 0.291045 13.4398H12.709C12.8697 13.4398 13 13.5652 13 13.72C13 13.8747 12.8697 14.0002 12.709 14.0002H0.291045C0.130305 14.0002 0 13.8747 0 13.72Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <ul className="MobileHeader-sideNavbar-link-list-os">
                                    <li>
                                        <Link href="/">
                                            <span>
                                                <Image src={navLinkcon1} alt="" />
                                            </span>
                                            Home
                                        </Link>
                                    </li>
                                    <div className="MobileHeader-sideNavbar-myAccount-links-data-row-os">
                                        <div
                                            onClick={() => handleMobileLinks("link-1")}
                                            className={
                                                activeLink === "link-1"
                                                    ? "MobileHeader-sideNavbar-myAccount-links-row-os open-links-os"
                                                    : "MobileHeader-sideNavbar-myAccount-links-row-os"
                                            }
                                        >
                                            {/* <div
                        className="MobileHeader-sideNavbar-profile-name-os"
                        onClick={() => {
                          if (getName()) {
                            navigate("/profile");
                          }
                        }}
                      >
                        {getName() ? (
                          <div className="">
                            <span>My Account,</span>
                            <span>{getName()}</span>
                          </div>
                        ) : (
                          <div className="">
                            <span
                              onClick={() => {
                                setActiveSignInWithOtp(true);
                              }}
                            >
                              Login
                            </span>
                            /
                            <span
                              onClick={() => {
                                setActiveRegisterForm(true);
                              }}
                            >
                              Register
                            </span>
                          </div>
                        )}
                      </div> */}

                                            <div
                                                className="MobileHeader-sideNavbar-myAccount-links-col-1-os"
                                                onClick={() => {
                                                    if (getName()) {
                                                        navigate("/my-account");
                                                    } else {
                                                        setActiveSignInWithOtp(true);
                                                    }
                                                }}
                                            >
                                                <span>
                                                    <Image src={navLinkcon2} alt="" />
                                                </span>
                                                My Account
                                            </div>
                                        </div>
                                    </div>
                                    <li>
                                        <Link href="/about">
                                            <span>
                                                <Image src={navLinkcon3} alt="" />
                                            </span>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="MobileHeader-sideNavbar-categories-data-row-os">
                                            <div
                                                className={`MobileHeader-sideNavbar-categories-data-col-os ${activeCategories}`}
                                            >
                                                <div
                                                    onClick={handleMobileCategories}
                                                    className={`MobileHeader-sideNavbar-category-heading-os`}
                                                >
                                                    <span>
                                                        <Image src={navLinkcon4} alt="" />
                                                    </span>
                                                    Categories
                                                </div>

                                                <div className="MobileHeader-sideNavbar-myAccount-links-col-2-os">
                                                    <span className="hamburger-line-1"></span>
                                                    <span className="hamburger-line-2"></span>
                                                </div>
                                            </div>

                                            <div
                                                className={`MobileHeader-sideNavbar-category-list-data-row-os ${activeCategories}`}
                                            >
                                                {category &&
                                                    category.map((e) => (
                                                        <Link
                                                            onClick={() => {
                                                                handleCategoryLink(e?.id);
                                                                if (activeNavbar === true) {
                                                                    setActiveNavbar(false);
                                                                }
                                                            }}
                                                            className={
                                                                activeCategoryLink === e?.id
                                                                    ? "MobileHeader-sideNavbar-category-list-data-col-1-heading-os"
                                                                    : "MobileHeader-sideNavbar-category-list-data-col-1-heading-os"
                                                            }
                                                            href={`/category/${e?.detail?.slug?.replace(/[\s/]+/g, "-") ||
                                                                "slugVIP"
                                                                }`}
                                                            key={e?.id}
                                                        >
                                                            {e.name}
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/why-choose-us">
                                            <span>
                                                <Image src={navLinkcon5} alt="" />
                                            </span>
                                            Why Choose Us
                                        </Link>
                                    </li>
                                    <div
                                        onClick={() => handleMobileLinks("link-2")}
                                        className={
                                            activeLink === "link-2"
                                                ? "MobileHeader-sideNavbar-myAccount-links-data-row-os open-links-os"
                                                : "MobileHeader-sideNavbar-myAccount-links-data-row-os"
                                        }
                                    >
                                        <div className="MobileHeader-sideNavbar-myAccount-links-row-os">
                                            <div className="MobileHeader-sideNavbar-myAccount-links-col-1-os">
                                                <span>
                                                    <Image src={navLinkcon6} alt="" />
                                                </span>
                                                FAQs
                                            </div>
                                            <div className="MobileHeader-sideNavbar-myAccount-links-col-2-os">
                                                <span className="hamburger-line-1"></span>
                                                <span className="hamburger-line-2"></span>
                                            </div>
                                        </div>
                                        <ul
                                            className={
                                                activeLink === "link-2"
                                                    ? "MobileHeader-sideNavbar-myAccount-subLinks-os active"
                                                    : "MobileHeader-sideNavbar-myAccount-subLinks-os"
                                            }
                                        >
                                            <li>
                                                <Link href="/faq">FAQs</Link>
                                            </li>
                                            <li>
                                                <Link href="/privacy-policy">Privacy Policy</Link>
                                            </li>
                                            <li>
                                                <Link href="/terms-and-conditions">
                                                    Terms & Conditions
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="MobileHeader-sideNavbar-main-col-2-os">
                            <span className="left-icon-os">
                                <Image src={navLinkcon7} alt="" />
                            </span>
                            <div className="footer-getInTouch-phone-whats-app-os">
                                <Link href="tel:+916009160092">+91-60091-60092</Link>
                                <div className="whats-app-icon-os" onClick={openWhatsApp}>
                                    <Image src={WhatsApp} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </>
    );
};

export default MobileHeader;
