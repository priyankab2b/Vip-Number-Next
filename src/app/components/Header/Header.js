"use client"
import { useContext, useState, useEffect } from "react";
import "./Header.css";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import axios from "axios";
import { getProfile } from "../../Services/Services";
// Images
import BrandImg from "../../Assets/VIP-logo-1.svg";
import CallUsPopup from "../../components/CallUsPopup/CallUsPopup";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import OutsideClickHandler from "react-outside-click-handler";
import Avatar from "react-avatar";
import { NotificationManager } from "react-notifications";
import LogoutModal from "../LogoutModal/LogoutModal";
// import { Modal, Button } from "antd";

const Header = () => {
    const [wBalance, setWBalance] = useState(0);
    const navigate = useRouter();
    // register popup context
    const { setActiveRegisterForm, setActiveSignInWithOtp } = useContext(
        MyRegisterSignInContext
    );
    const {
        cartItems,
        wishListItem,
        user,
        logout,
        categoriesData,
        cartAnimation,
        userProfile,
    } = useContext(AppStateContext);
    const [category, setCategory] = useState();
    const { email, firstname, lastname, mobile } = user?.user || {};
    const [data, setData] = useState([]);
    const [fetchData, setFetchData] = useState(false);
    // Logout popup show
    const [activeUserAccount, setActiveUserAccount] = useState(false);
    // Wallet menu show
    const [activeWalletMenu, setActiveWalletMenu] = useState(false);
    // Categories menu show
    const [categorySubMenu, setCategorySubMenu] = useState(false);
    //Contact menu show
    const [desktopContactPopup, setDesktopContactPopup] = useState(false);
    const [total, setTotal] = useState(0);
    const [activeCategoryLink, setActiveCategoryLink] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        if (!fetchData) {
            axios
                .get("https://admin.leafymango.com/web/call/us")
                .then((response) => {

                    setFetchData(true);
                    setData(response?.data?.data || []);
                    // console.log("dataaaaaaaaaaaaa", data)
                })
                .catch((error) => {
                    console.log(error);
                    setFetchData(true);
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

    useEffect(() => {
        let count = 0;
        cartItems?.forEach((res) => {
            count = count + parseInt(res?.unit_price);
        });

        setTotal(count);
    }, [cartItems]);

    useEffect(() => {
        if (categoriesData) {
            setCategory(categoriesData);
        }
    }, [categoriesData]);

    const handleCategoryLink = (value) => {
        setActiveCategoryLink(value);
    };

    const chunkSize = 6;
    const arrayOfArrays = [];

    if (category) {
        for (let i = 0; i < category.length; i += chunkSize) {
            const chunk = category.slice(i, i + chunkSize);
            arrayOfArrays.push(chunk);
        }
    }

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




    useEffect(() => {
        getProfile(user?.token)?.then((res) => {
            setWBalance(parseInt(res?.contact_cf?.with_drawn_balance));
        });
    }, []);


    return (
        <>
            <div className="header-custom-os"></div>
            <header className="header-section-os">
                <div className="container-os">
                    <div className="header-row-os">
                        <div className="header-brand-os">
                            <Link href="/">
                                <Image src={BrandImg} alt="brand" />
                            </Link>
                        </div>
                        <ul className="header-link-list-os">
                            <li>
                                <Link className="header-main-link-os" href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setCategorySubMenu(false);
                                    }}
                                >
                                    <div
                                        onClick={() => {
                                            setCategorySubMenu(!categorySubMenu);
                                        }}
                                        className={`categories-manu-os ${categorySubMenu}`}
                                    >
                                        Categories<span></span>
                                    </div>
                                    {categorySubMenu && (
                                        <section
                                            className={`desktop-catetories-section-os ${categorySubMenu}`}
                                        >
                                            <div className={`desktop-catetories-sub-menus-row-os`}>
                                                <div className="desktop-catetories-sub-menus-col-os-1">
                                                    <div className="desktop-catetories-sub-menus-col-os-11">
                                                        {arrayOfArrays.length > 0 &&
                                                            arrayOfArrays.map((subArray, subArrayIndex) => {
                                                                return (
                                                                    <div
                                                                        className="array-col-os"
                                                                        key={`subArray-${subArrayIndex}`}
                                                                    >
                                                                        {subArray.map((element, elementIndex) => {
                                                                            return (
                                                                                <Link
                                                                                    key={element?.id}
                                                                                    onClick={() => {
                                                                                        handleCategoryLink(element?.id);
                                                                                        setCategorySubMenu(false);
                                                                                    }}
                                                                                    className={
                                                                                        activeCategoryLink === element?.id
                                                                                            ? "desktop-catetories-active"
                                                                                            : ""
                                                                                    }
                                                                                    href={`/category/${element?.detail?.slug?.replace(
                                                                                        /[\s/]+/g,
                                                                                        "-"
                                                                                    ) || "slugVIP"
                                                                                        }`}

                                                                                    // href={`/category`}
                                                                                >
                                                                                    {element.name}
                                                                                </Link>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                </OutsideClickHandler>
                            </li>
                            <li>
                                <Link className="header-main-link-os" href="/about">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link className="header-main-link-os" href="/why-choose-us">
                                    Why Choose Us
                                </Link>
                            </li>
                            <li>
                                <Link className="header-main-link-os" href="/faq">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link className="header-main-link-os" href="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                        <div className="header-login-links-os">
                            <div className="login-account-login-data-os">
                                <div className="login-account-name-os">
                                    {getName() ? (
                                        <div
                                            className="loggedIn-data-os"
                                            onClick={() => {
                                                if (getName()) {
                                                    navigate.push("/profile");
                                                }
                                            }}
                                        >
                                            <div className="loggedIn-name-os">
                                                <span>My Account,</span>
                                                <span>{getName()}</span>
                                            </div>
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
                                        </div>
                                    ) : (
                                        <div className="loggedOut-name-os">
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
                                </div>
                                {getName() && (
                                    <div className="GoogleHeader-login-account-os">
                                        <OutsideClickHandler
                                            onOutsideClick={() => {
                                                setActiveUserAccount(false);
                                            }}
                                        >
                                            <div
                                                onClick={() => {
                                                    setActiveUserAccount(!activeUserAccount);
                                                }}
                                                className="header-login-logout-arrow-os"
                                            ></div>
                                            {activeUserAccount && (
                                                <div className="header-login-logout-popup-section-os">
                                                    <div className="header-login-logout-popup-row-os">
                                                        <div
                                                            className="header-login-logout-popup-col-os"
                                                            onClick={() => {
                                                                if (getName()) {
                                                                    navigate.push("/profile");
                                                                }
                                                            }}
                                                        >
                                                            Your Account
                                                        </div>
                                                        <div
                                                            className="header-login-logout-popup-col-os"
                                                            onClick={handleLogout} // Modify the onClick event to show the confirmation modal.
                                                        >
                                                            Log Out
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <LogoutModal
                                                showConfirmationModal={showConfirmationModal}
                                                handleCancelLogout={handleCancelLogout}
                                                handleConfirmLogout={handleConfirmLogout}
                                            />
                                        </OutsideClickHandler>
                                    </div>
                                )}
                            </div>

                            <div className="header-call-us-button-os">
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setDesktopContactPopup(false);
                                    }}
                                >
                                    <button className="call-us-button-os"
                                        onClick={() => {
                                            setDesktopContactPopup(!desktopContactPopup);
                                            if (!desktopContactPopup) {
                                                setFetchData(true);
                                            }
                                        }}
                                    >
                                        Call Us
                                        <span></span>
                                    </button>
                                    {desktopContactPopup && (
                                        <div
                                            className={`MobileHeader-contact-us-pop-os ${desktopContactPopup}`}
                                        >
                                            {data && <CallUsPopup contactData={data} />}
                                        </div>
                                    )}
                                </OutsideClickHandler>
                            </div>

                            <button
                                type="button"
                                className={`header-cart-os animation ${cartAnimation === "buyNow-os" ? "shake" : ""}`}
                                onClick={() => {
                                    if (getName()) {
                                        navigate.push("/cart");
                                    } else {
                                        setActiveSignInWithOtp(true);
                                    }
                                }}
                            >
                                <span className="cart-tooltip-os">Cart</span>
                                <span className="cart-wishlist-count-os">
                                    {cartItems?.length}
                                </span>
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
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className={`header-login-add-favourite-os animation ${cartAnimation === "wishlist-os" ? "shake" : ""}`}
                                onClick={() => {
                                    if (getName()) {
                                        navigate.push("/wishlist");
                                    } else {
                                        setActiveSignInWithOtp(true);
                                    }
                                }}
                            >
                                <span className="cart-wishlist-os">Wishlist</span>
                                <span className="cart-wishlist-count-os">
                                    {wishListItem?.length}
                                </span>
                                <svg
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                                        fill="#8547FE"
                                    />
                                </svg>
                            </button>

                            <OutsideClickHandler
                                onOutsideClick={() => {
                                    setActiveWalletMenu(false);
                                }}
                            >
                                <div
                                    onClick={() => {
                                        if (getName()) {
                                            setActiveWalletMenu(!activeWalletMenu);
                                        } else {
                                            setActiveSignInWithOtp(true);
                                        }
                                    }}
                                    className="header-login-wallet-os"
                                >
                                    Wallet
                                    <span>
                                        <svg
                                            width="14"
                                            height="13"
                                            viewBox="0 0 14 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.05602 7.31448C9.35788 7.31448 9.60751 7.21579 9.80488 7.01841C10.0023 6.82104 10.1009 6.57142 10.1009 6.26955C10.1009 5.96768 10.0023 5.71806 9.80488 5.52069C9.60751 5.32331 9.35788 5.22463 9.05602 5.22463C8.75415 5.22463 8.50453 5.32331 8.30715 5.52069C8.10978 5.71806 8.01109 5.96768 8.01109 6.26955C8.01109 6.57142 8.10978 6.82104 8.30715 7.01841C8.50453 7.21579 8.75415 7.31448 9.05602 7.31448ZM1.39323 12.5391C1.01009 12.5391 0.681988 12.4028 0.408914 12.1302C0.136305 11.8571 0 11.529 0 11.1459V1.39323C0 1.01009 0.136305 0.681988 0.408914 0.408914C0.681988 0.136305 1.01009 0 1.39323 0H11.1459C11.529 0 11.8571 0.136305 12.1302 0.408914C12.4028 0.681988 12.5391 1.01009 12.5391 1.39323V3.13478H11.1459V1.39323H1.39323V11.1459H11.1459V9.40433H12.5391V11.1459C12.5391 11.529 12.4028 11.8571 12.1302 12.1302C11.8571 12.4028 11.529 12.5391 11.1459 12.5391H1.39323ZM6.96617 9.75264C6.58303 9.75264 6.25515 9.61633 5.98254 9.34372C5.70947 9.07065 5.57293 8.74254 5.57293 8.3594V4.1797C5.57293 3.79656 5.70947 3.46845 5.98254 3.19538C6.25515 2.92277 6.58303 2.78647 6.96617 2.78647H11.8425C12.2256 2.78647 12.5537 2.92277 12.8268 3.19538C13.0994 3.46845 13.2357 3.79656 13.2357 4.1797V8.3594C13.2357 8.74254 13.0994 9.07065 12.8268 9.34372C12.5537 9.61633 12.2256 9.75264 11.8425 9.75264H6.96617ZM11.8425 8.3594V4.1797H6.96617V8.3594H11.8425Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                {/* Wallet dropdown */}
                                {activeWalletMenu && (
                                    <div
                                        className={`header-login-wallet-dropdown-os ${activeWalletMenu}`}
                                    >
                                        <div className="remaining-balance-os">
                                            <h4>
                                                <span>
                                                    <svg
                                                        width="14"
                                                        height="13"
                                                        viewBox="0 0 14 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.05602 7.31448C9.35788 7.31448 9.60751 7.21579 9.80488 7.01841C10.0023 6.82104 10.1009 6.57142 10.1009 6.26955C10.1009 5.96768 10.0023 5.71806 9.80488 5.52069C9.60751 5.32331 9.35788 5.22463 9.05602 5.22463C8.75415 5.22463 8.50453 5.32331 8.30715 5.52069C8.10978 5.71806 8.01109 5.96768 8.01109 6.26955C8.01109 6.57142 8.10978 6.82104 8.30715 7.01841C8.50453 7.21579 8.75415 7.31448 9.05602 7.31448ZM1.39323 12.5391C1.01009 12.5391 0.681988 12.4028 0.408914 12.1302C0.136305 11.8571 0 11.529 0 11.1459V1.39323C0 1.01009 0.136305 0.681988 0.408914 0.408914C0.681988 0.136305 1.01009 0 1.39323 0H11.1459C11.529 0 11.8571 0.136305 12.1302 0.408914C12.4028 0.681988 12.5391 1.01009 12.5391 1.39323V3.13478H11.1459V1.39323H1.39323V11.1459H11.1459V9.40433H12.5391V11.1459C12.5391 11.529 12.4028 11.8571 12.1302 12.1302C11.8571 12.4028 11.529 12.5391 11.1459 12.5391H1.39323ZM6.96617 9.75264C6.58303 9.75264 6.25515 9.61633 5.98254 9.34372C5.70947 9.07065 5.57293 8.74254 5.57293 8.3594V4.1797C5.57293 3.79656 5.70947 3.46845 5.98254 3.19538C6.25515 2.92277 6.58303 2.78647 6.96617 2.78647H11.8425C12.2256 2.78647 12.5537 2.92277 12.8268 3.19538C13.0994 3.46845 13.2357 3.79656 13.2357 4.1797V8.3594C13.2357 8.74254 13.0994 9.07065 12.8268 9.34372C12.5537 9.61633 12.2256 9.75264 11.8425 9.75264H6.96617ZM11.8425 8.3594V4.1797H6.96617V8.3594H11.8425Z"
                                                            fill="#333333"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                WITHDRAWN ABLE BALANCE
                                            </h4>
                                            <h2>Rs {wBalance || 0}</h2>
                                        </div>
                                        <div className="cart-balance-os">
                                            <h4>
                                                <span>
                                                    <svg
                                                        width="14"
                                                        height="13"
                                                        viewBox="0 0 14 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.05602 7.31448C9.35788 7.31448 9.60751 7.21579 9.80488 7.01841C10.0023 6.82104 10.1009 6.57142 10.1009 6.26955C10.1009 5.96768 10.0023 5.71806 9.80488 5.52069C9.60751 5.32331 9.35788 5.22463 9.05602 5.22463C8.75415 5.22463 8.50453 5.32331 8.30715 5.52069C8.10978 5.71806 8.01109 5.96768 8.01109 6.26955C8.01109 6.57142 8.10978 6.82104 8.30715 7.01841C8.50453 7.21579 8.75415 7.31448 9.05602 7.31448ZM1.39323 12.5391C1.01009 12.5391 0.681988 12.4028 0.408914 12.1302C0.136305 11.8571 0 11.529 0 11.1459V1.39323C0 1.01009 0.136305 0.681988 0.408914 0.408914C0.681988 0.136305 1.01009 0 1.39323 0H11.1459C11.529 0 11.8571 0.136305 12.1302 0.408914C12.4028 0.681988 12.5391 1.01009 12.5391 1.39323V3.13478H11.1459V1.39323H1.39323V11.1459H11.1459V9.40433H12.5391V11.1459C12.5391 11.529 12.4028 11.8571 12.1302 12.1302C11.8571 12.4028 11.529 12.5391 11.1459 12.5391H1.39323ZM6.96617 9.75264C6.58303 9.75264 6.25515 9.61633 5.98254 9.34372C5.70947 9.07065 5.57293 8.74254 5.57293 8.3594V4.1797C5.57293 3.79656 5.70947 3.46845 5.98254 3.19538C6.25515 2.92277 6.58303 2.78647 6.96617 2.78647H11.8425C12.2256 2.78647 12.5537 2.92277 12.8268 3.19538C13.0994 3.46845 13.2357 3.79656 13.2357 4.1797V8.3594C13.2357 8.74254 13.0994 9.07065 12.8268 9.34372C12.5537 9.61633 12.2256 9.75264 11.8425 9.75264H6.96617ZM11.8425 8.3594V4.1797H6.96617V8.3594H11.8425Z"
                                                            fill="#333333"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                CART TOTAL BALANCE
                                            </h4>
                                            <h2>Rs {parseFloat(total).toLocaleString("en-IN")}</h2>
                                        </div>
                                        <div className="add-withdrawal-money-row">
                                            <Link href="/wallet" className="">
                                                <span>
                                                    <svg
                                                        width="12"
                                                        height="13"
                                                        viewBox="0 0 12 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M2.46609 3.0525C1.98027 3.0525 1.58644 3.44634 1.58644 3.93216V10.9694C1.58644 11.4552 1.98027 11.8491 2.46609 11.8491H9.50334C9.98916 11.8491 10.383 11.4552 10.383 10.9694V5.33961H10.9694V10.9694C10.9694 11.7791 10.313 12.4355 9.50334 12.4355H2.46609C1.65639 12.4355 1 11.7791 1 10.9694V3.93216C1 3.12246 1.65639 2.46606 2.46609 2.46606H7.15759V3.0525H2.46609Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M9.50342 1H10.0899V5.10506H9.50342V1Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M11.8491 2.75928L11.8491 3.34571L7.74406 3.34571L7.74406 2.75928L11.8491 2.75928Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M3.42041 5.79736H4.54459C4.78617 5.79736 4.99208 5.83374 5.16235 5.90651C5.33261 5.97927 5.46286 6.08696 5.55309 6.22957C5.64477 6.37073 5.69061 6.54536 5.69061 6.75347C5.69061 6.91209 5.6615 7.05179 5.60329 7.17258C5.54508 7.29336 5.46286 7.39523 5.35663 7.47818C5.25039 7.55968 5.12379 7.62298 4.9768 7.66809L4.81091 7.74886H3.80023L3.79587 7.31447H4.55333C4.6843 7.31447 4.79344 7.29118 4.88076 7.24461C4.96807 7.19805 5.03356 7.13474 5.07722 7.0547C5.12233 6.97321 5.14489 6.88153 5.14489 6.77966C5.14489 6.66906 5.12306 6.57301 5.0794 6.49152C5.0372 6.40857 4.97171 6.34527 4.88294 6.30161C4.79417 6.2565 4.68139 6.23394 4.54459 6.23394H3.96831V8.97564H3.42041V5.79736ZM5.23438 8.97564L4.48784 7.54803L5.06194 7.54585L5.8194 8.94726V8.97564H5.23438Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M7.50895 8.33605C7.50895 8.28367 7.49585 8.23637 7.46966 8.19417C7.44346 8.15051 7.39325 8.11122 7.31904 8.07629C7.24627 8.04137 7.13859 8.00935 6.99597 7.98024C6.87082 7.95259 6.75585 7.91985 6.65107 7.88202C6.54775 7.84272 6.45898 7.79543 6.38476 7.74013C6.31055 7.68483 6.25306 7.61934 6.21232 7.54367C6.17157 7.468 6.1512 7.38068 6.1512 7.28172C6.1512 7.18568 6.1723 7.09472 6.2145 7.00886C6.2567 6.923 6.31709 6.84733 6.39568 6.78184C6.47426 6.71636 6.56958 6.66469 6.68164 6.62686C6.79515 6.58902 6.92175 6.5701 7.06146 6.5701C7.25937 6.5701 7.42891 6.60357 7.57007 6.67052C7.71268 6.736 7.82183 6.8255 7.8975 6.93901C7.97317 7.05106 8.01101 7.17767 8.01101 7.31883H7.48494C7.48494 7.25626 7.46893 7.19805 7.43691 7.1442C7.40635 7.0889 7.35978 7.04452 7.29721 7.01105C7.23463 6.97612 7.15605 6.95866 7.06146 6.95866C6.97123 6.95866 6.89629 6.97321 6.83662 7.00231C6.77841 7.02996 6.73475 7.06635 6.70565 7.11146C6.678 7.15657 6.66417 7.20605 6.66417 7.25989C6.66417 7.29919 6.67145 7.33484 6.686 7.36686C6.70201 7.39742 6.7282 7.42579 6.76458 7.45199C6.80097 7.47673 6.85044 7.50001 6.91302 7.52184C6.97705 7.54367 7.05709 7.56477 7.15314 7.58514C7.33359 7.62298 7.48857 7.67173 7.61809 7.7314C7.74906 7.78961 7.84948 7.86528 7.91933 7.95842C7.98918 8.0501 8.02411 8.16652 8.02411 8.30768C8.02411 8.41246 8.00155 8.5085 7.95644 8.59582C7.91278 8.68168 7.84875 8.75662 7.76434 8.82065C7.67994 8.88323 7.5788 8.93198 7.46092 8.96691C7.3445 9.00183 7.21353 9.0193 7.06801 9.0193C6.85408 9.0193 6.6729 8.98146 6.52447 8.90579C6.37603 8.82866 6.26325 8.73043 6.18612 8.6111C6.11045 8.49031 6.07261 8.36516 6.07261 8.23564H6.58122C6.58704 8.33314 6.61397 8.411 6.66199 8.46921C6.71147 8.52597 6.77259 8.56744 6.84535 8.59363C6.91957 8.61837 6.99597 8.63074 7.07455 8.63074C7.16915 8.63074 7.24846 8.61837 7.31249 8.59363C7.37652 8.56744 7.42527 8.53251 7.45874 8.48886C7.49221 8.44374 7.50895 8.39281 7.50895 8.33605Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M8.50652 8.71369C8.50652 8.6322 8.53417 8.5638 8.58947 8.5085C8.64477 8.45175 8.71972 8.42337 8.81431 8.42337C8.91036 8.42337 8.9853 8.45175 9.03915 8.5085C9.09445 8.5638 9.1221 8.6322 9.1221 8.71369C9.1221 8.79519 9.09445 8.86358 9.03915 8.91888C8.9853 8.97418 8.91036 9.00183 8.81431 9.00183C8.71972 9.00183 8.64477 8.97418 8.58947 8.91888C8.53417 8.86358 8.50652 8.79519 8.50652 8.71369Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M3.42041 5.79736H4.54459C4.78617 5.79736 4.99208 5.83374 5.16235 5.90651C5.33261 5.97927 5.46286 6.08696 5.55309 6.22957C5.64477 6.37073 5.69061 6.54536 5.69061 6.75347C5.69061 6.91209 5.6615 7.05179 5.60329 7.17258C5.54508 7.29336 5.46286 7.39523 5.35663 7.47818C5.25039 7.55968 5.12379 7.62298 4.9768 7.66809L4.81091 7.74886H3.80023L3.79587 7.31447H4.55333C4.6843 7.31447 4.79344 7.29118 4.88076 7.24461C4.96807 7.19805 5.03356 7.13474 5.07722 7.0547C5.12233 6.97321 5.14489 6.88153 5.14489 6.77966C5.14489 6.66906 5.12306 6.57301 5.0794 6.49152C5.0372 6.40857 4.97171 6.34527 4.88294 6.30161C4.79417 6.2565 4.68139 6.23394 4.54459 6.23394H3.96831V8.97564H3.42041V5.79736ZM5.23438 8.97564L4.48784 7.54803L5.06194 7.54585L5.8194 8.94726V8.97564H5.23438Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                        <path
                                                            d="M7.50895 8.33605C7.50895 8.28367 7.49585 8.23637 7.46966 8.19417C7.44346 8.15051 7.39325 8.11122 7.31904 8.07629C7.24627 8.04137 7.13859 8.00935 6.99597 7.98024C6.87082 7.95259 6.75585 7.91985 6.65107 7.88202C6.54775 7.84272 6.45898 7.79543 6.38476 7.74013C6.31055 7.68483 6.25306 7.61934 6.21232 7.54367C6.17157 7.468 6.1512 7.38068 6.1512 7.28172C6.1512 7.18568 6.1723 7.09472 6.2145 7.00886C6.2567 6.923 6.31709 6.84733 6.39568 6.78184C6.47426 6.71636 6.56958 6.66469 6.68164 6.62686C6.79515 6.58902 6.92175 6.5701 7.06146 6.5701C7.25937 6.5701 7.42891 6.60357 7.57007 6.67052C7.71268 6.736 7.82183 6.8255 7.8975 6.93901C7.97317 7.05106 8.01101 7.17767 8.01101 7.31883H7.48494C7.48494 7.25626 7.46893 7.19805 7.43691 7.1442C7.40635 7.0889 7.35978 7.04452 7.29721 7.01105C7.23463 6.97612 7.15605 6.95866 7.06146 6.95866C6.97123 6.95866 6.89629 6.97321 6.83662 7.00231C6.77841 7.02996 6.73475 7.06635 6.70565 7.11146C6.678 7.15657 6.66417 7.20605 6.66417 7.25989C6.66417 7.29919 6.67145 7.33484 6.686 7.36686C6.70201 7.39742 6.7282 7.42579 6.76458 7.45199C6.80097 7.47673 6.85044 7.50001 6.91302 7.52184C6.97705 7.54367 7.05709 7.56477 7.15314 7.58514C7.33359 7.62298 7.48857 7.67173 7.61809 7.7314C7.74906 7.78961 7.84948 7.86528 7.91933 7.95842C7.98918 8.0501 8.02411 8.16652 8.02411 8.30768C8.02411 8.41246 8.00155 8.5085 7.95644 8.59582C7.91278 8.68168 7.84875 8.75662 7.76434 8.82065C7.67994 8.88323 7.5788 8.93198 7.46092 8.96691C7.3445 9.00183 7.21353 9.0193 7.06801 9.0193C6.85408 9.0193 6.6729 8.98146 6.52447 8.90579C6.37603 8.82866 6.26325 8.73043 6.18612 8.6111C6.11045 8.49031 6.07261 8.36516 6.07261 8.23564H6.58122C6.58704 8.33314 6.61397 8.411 6.66199 8.46921C6.71147 8.52597 6.77259 8.56744 6.84535 8.59363C6.91957 8.61837 6.99597 8.63074 7.07455 8.63074C7.16915 8.63074 7.24846 8.61837 7.31249 8.59363C7.37652 8.56744 7.42527 8.53251 7.45874 8.48886C7.49221 8.44374 7.50895 8.39281 7.50895 8.33605Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                        <path
                                                            d="M8.50652 8.71369C8.50652 8.6322 8.53417 8.5638 8.58947 8.5085C8.64477 8.45175 8.71972 8.42337 8.81431 8.42337C8.91036 8.42337 8.9853 8.45175 9.03915 8.5085C9.09445 8.5638 9.1221 8.6322 9.1221 8.71369C9.1221 8.79519 9.09445 8.86358 9.03915 8.91888C8.9853 8.97418 8.91036 9.00183 8.81431 9.00183C8.71972 9.00183 8.64477 8.97418 8.58947 8.91888C8.53417 8.86358 8.50652 8.79519 8.50652 8.71369Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                    </svg>
                                                </span>
                                                Add Money
                                            </Link>
                                            <Link href="/wallet" className="">
                                                <span>
                                                    <svg
                                                        width="12"
                                                        height="13"
                                                        viewBox="0 0 12 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M2.46609 3.0525C1.98027 3.0525 1.58644 3.44634 1.58644 3.93216V10.9694C1.58644 11.4552 1.98027 11.8491 2.46609 11.8491H9.50334C9.98916 11.8491 10.383 11.4552 10.383 10.9694V5.33961H10.9694V10.9694C10.9694 11.7791 10.313 12.4355 9.50334 12.4355H2.46609C1.65639 12.4355 1 11.7791 1 10.9694V3.93216C1 3.12246 1.65639 2.46606 2.46609 2.46606H7.15759V3.0525H2.46609Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M9.50342 1H10.0899V5.10506H9.50342V1Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M11.8491 2.75928L11.8491 3.34571L7.74406 3.34571L7.74406 2.75928L11.8491 2.75928Z"
                                                            fill="#6019EB"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.25"
                                                        />
                                                        <path
                                                            d="M3.42041 5.79736H4.54459C4.78617 5.79736 4.99208 5.83374 5.16235 5.90651C5.33261 5.97927 5.46286 6.08696 5.55309 6.22957C5.64477 6.37073 5.69061 6.54536 5.69061 6.75347C5.69061 6.91209 5.6615 7.05179 5.60329 7.17258C5.54508 7.29336 5.46286 7.39523 5.35663 7.47818C5.25039 7.55968 5.12379 7.62298 4.9768 7.66809L4.81091 7.74886H3.80023L3.79587 7.31447H4.55333C4.6843 7.31447 4.79344 7.29118 4.88076 7.24461C4.96807 7.19805 5.03356 7.13474 5.07722 7.0547C5.12233 6.97321 5.14489 6.88153 5.14489 6.77966C5.14489 6.66906 5.12306 6.57301 5.0794 6.49152C5.0372 6.40857 4.97171 6.34527 4.88294 6.30161C4.79417 6.2565 4.68139 6.23394 4.54459 6.23394H3.96831V8.97564H3.42041V5.79736ZM5.23438 8.97564L4.48784 7.54803L5.06194 7.54585L5.8194 8.94726V8.97564H5.23438Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M7.50895 8.33605C7.50895 8.28367 7.49585 8.23637 7.46966 8.19417C7.44346 8.15051 7.39325 8.11122 7.31904 8.07629C7.24627 8.04137 7.13859 8.00935 6.99597 7.98024C6.87082 7.95259 6.75585 7.91985 6.65107 7.88202C6.54775 7.84272 6.45898 7.79543 6.38476 7.74013C6.31055 7.68483 6.25306 7.61934 6.21232 7.54367C6.17157 7.468 6.1512 7.38068 6.1512 7.28172C6.1512 7.18568 6.1723 7.09472 6.2145 7.00886C6.2567 6.923 6.31709 6.84733 6.39568 6.78184C6.47426 6.71636 6.56958 6.66469 6.68164 6.62686C6.79515 6.58902 6.92175 6.5701 7.06146 6.5701C7.25937 6.5701 7.42891 6.60357 7.57007 6.67052C7.71268 6.736 7.82183 6.8255 7.8975 6.93901C7.97317 7.05106 8.01101 7.17767 8.01101 7.31883H7.48494C7.48494 7.25626 7.46893 7.19805 7.43691 7.1442C7.40635 7.0889 7.35978 7.04452 7.29721 7.01105C7.23463 6.97612 7.15605 6.95866 7.06146 6.95866C6.97123 6.95866 6.89629 6.97321 6.83662 7.00231C6.77841 7.02996 6.73475 7.06635 6.70565 7.11146C6.678 7.15657 6.66417 7.20605 6.66417 7.25989C6.66417 7.29919 6.67145 7.33484 6.686 7.36686C6.70201 7.39742 6.7282 7.42579 6.76458 7.45199C6.80097 7.47673 6.85044 7.50001 6.91302 7.52184C6.97705 7.54367 7.05709 7.56477 7.15314 7.58514C7.33359 7.62298 7.48857 7.67173 7.61809 7.7314C7.74906 7.78961 7.84948 7.86528 7.91933 7.95842C7.98918 8.0501 8.02411 8.16652 8.02411 8.30768C8.02411 8.41246 8.00155 8.5085 7.95644 8.59582C7.91278 8.68168 7.84875 8.75662 7.76434 8.82065C7.67994 8.88323 7.5788 8.93198 7.46092 8.96691C7.3445 9.00183 7.21353 9.0193 7.06801 9.0193C6.85408 9.0193 6.6729 8.98146 6.52447 8.90579C6.37603 8.82866 6.26325 8.73043 6.18612 8.6111C6.11045 8.49031 6.07261 8.36516 6.07261 8.23564H6.58122C6.58704 8.33314 6.61397 8.411 6.66199 8.46921C6.71147 8.52597 6.77259 8.56744 6.84535 8.59363C6.91957 8.61837 6.99597 8.63074 7.07455 8.63074C7.16915 8.63074 7.24846 8.61837 7.31249 8.59363C7.37652 8.56744 7.42527 8.53251 7.45874 8.48886C7.49221 8.44374 7.50895 8.39281 7.50895 8.33605Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M8.50652 8.71369C8.50652 8.6322 8.53417 8.5638 8.58947 8.5085C8.64477 8.45175 8.71972 8.42337 8.81431 8.42337C8.91036 8.42337 8.9853 8.45175 9.03915 8.5085C9.09445 8.5638 9.1221 8.6322 9.1221 8.71369C9.1221 8.79519 9.09445 8.86358 9.03915 8.91888C8.9853 8.97418 8.91036 9.00183 8.81431 9.00183C8.71972 9.00183 8.64477 8.97418 8.58947 8.91888C8.53417 8.86358 8.50652 8.79519 8.50652 8.71369Z"
                                                            fill="#6019EB"
                                                        />
                                                        <path
                                                            d="M3.42041 5.79736H4.54459C4.78617 5.79736 4.99208 5.83374 5.16235 5.90651C5.33261 5.97927 5.46286 6.08696 5.55309 6.22957C5.64477 6.37073 5.69061 6.54536 5.69061 6.75347C5.69061 6.91209 5.6615 7.05179 5.60329 7.17258C5.54508 7.29336 5.46286 7.39523 5.35663 7.47818C5.25039 7.55968 5.12379 7.62298 4.9768 7.66809L4.81091 7.74886H3.80023L3.79587 7.31447H4.55333C4.6843 7.31447 4.79344 7.29118 4.88076 7.24461C4.96807 7.19805 5.03356 7.13474 5.07722 7.0547C5.12233 6.97321 5.14489 6.88153 5.14489 6.77966C5.14489 6.66906 5.12306 6.57301 5.0794 6.49152C5.0372 6.40857 4.97171 6.34527 4.88294 6.30161C4.79417 6.2565 4.68139 6.23394 4.54459 6.23394H3.96831V8.97564H3.42041V5.79736ZM5.23438 8.97564L4.48784 7.54803L5.06194 7.54585L5.8194 8.94726V8.97564H5.23438Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                        <path
                                                            d="M7.50895 8.33605C7.50895 8.28367 7.49585 8.23637 7.46966 8.19417C7.44346 8.15051 7.39325 8.11122 7.31904 8.07629C7.24627 8.04137 7.13859 8.00935 6.99597 7.98024C6.87082 7.95259 6.75585 7.91985 6.65107 7.88202C6.54775 7.84272 6.45898 7.79543 6.38476 7.74013C6.31055 7.68483 6.25306 7.61934 6.21232 7.54367C6.17157 7.468 6.1512 7.38068 6.1512 7.28172C6.1512 7.18568 6.1723 7.09472 6.2145 7.00886C6.2567 6.923 6.31709 6.84733 6.39568 6.78184C6.47426 6.71636 6.56958 6.66469 6.68164 6.62686C6.79515 6.58902 6.92175 6.5701 7.06146 6.5701C7.25937 6.5701 7.42891 6.60357 7.57007 6.67052C7.71268 6.736 7.82183 6.8255 7.8975 6.93901C7.97317 7.05106 8.01101 7.17767 8.01101 7.31883H7.48494C7.48494 7.25626 7.46893 7.19805 7.43691 7.1442C7.40635 7.0889 7.35978 7.04452 7.29721 7.01105C7.23463 6.97612 7.15605 6.95866 7.06146 6.95866C6.97123 6.95866 6.89629 6.97321 6.83662 7.00231C6.77841 7.02996 6.73475 7.06635 6.70565 7.11146C6.678 7.15657 6.66417 7.20605 6.66417 7.25989C6.66417 7.29919 6.67145 7.33484 6.686 7.36686C6.70201 7.39742 6.7282 7.42579 6.76458 7.45199C6.80097 7.47673 6.85044 7.50001 6.91302 7.52184C6.97705 7.54367 7.05709 7.56477 7.15314 7.58514C7.33359 7.62298 7.48857 7.67173 7.61809 7.7314C7.74906 7.78961 7.84948 7.86528 7.91933 7.95842C7.98918 8.0501 8.02411 8.16652 8.02411 8.30768C8.02411 8.41246 8.00155 8.5085 7.95644 8.59582C7.91278 8.68168 7.84875 8.75662 7.76434 8.82065C7.67994 8.88323 7.5788 8.93198 7.46092 8.96691C7.3445 9.00183 7.21353 9.0193 7.06801 9.0193C6.85408 9.0193 6.6729 8.98146 6.52447 8.90579C6.37603 8.82866 6.26325 8.73043 6.18612 8.6111C6.11045 8.49031 6.07261 8.36516 6.07261 8.23564H6.58122C6.58704 8.33314 6.61397 8.411 6.66199 8.46921C6.71147 8.52597 6.77259 8.56744 6.84535 8.59363C6.91957 8.61837 6.99597 8.63074 7.07455 8.63074C7.16915 8.63074 7.24846 8.61837 7.31249 8.59363C7.37652 8.56744 7.42527 8.53251 7.45874 8.48886C7.49221 8.44374 7.50895 8.39281 7.50895 8.33605Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                        <path
                                                            d="M8.50652 8.71369C8.50652 8.6322 8.53417 8.5638 8.58947 8.5085C8.64477 8.45175 8.71972 8.42337 8.81431 8.42337C8.91036 8.42337 8.9853 8.45175 9.03915 8.5085C9.09445 8.5638 9.1221 8.6322 9.1221 8.71369C9.1221 8.79519 9.09445 8.86358 9.03915 8.91888C8.9853 8.97418 8.91036 9.00183 8.81431 9.00183C8.71972 9.00183 8.64477 8.97418 8.58947 8.91888C8.53417 8.86358 8.50652 8.79519 8.50652 8.71369Z"
                                                            stroke="#6019EB"
                                                            strokeWidth="0.23"
                                                        />
                                                    </svg>
                                                </span>
                                                Withdrawn
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </OutsideClickHandler>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;