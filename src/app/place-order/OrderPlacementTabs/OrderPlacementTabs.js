import React, { useState, useRef } from "react";
import "./OrderPlacementTabs.css";
import { useEffect, useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import Image from "next/image";

// Images
import Payment2 from "../../Assets/payment2.svg";
import Payment3 from "../../Assets/payment3.svg";
import Payment4 from "../../Assets/payment4.svg";
import Payment5 from "../../Assets/payment5.svg";
import Payment6 from "../../Assets/payment6.svg";
import QRImg from "../../Assets/QR-code.png";
import QRImg1 from "../../Assets/QR-code1.jpg";
import QRImg2 from "../../Assets/QR-code2.png";
import QRImg3 from "../../Assets/QR-code3.png";
import QRImg4 from "../../Assets/QR-code4.png";
import brandIcon from "../../Assets/VIP-icon-2.svg";

import axios from "axios";
import {
    getOrderId,
    getProfile,
    updateProfile,
} from "../../Services/Services";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useGetQueryParams } from "../../utils";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const OrderPlacementTabs = (props) => {
    const { queryParams } = useGetQueryParams();
    const {
        cartItems,
        setCartItems,
        addToWishList,
        user = {},
        addToCart,
        checkUser,
        removeFromCart,
        setRelatedNumbers: setNumber,
    } = useContext(AppStateContext);
    const [relatedNumbers, setRelatedNumbers] = useState([]);
    const [total, setTotal] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [activePayRadio, setActivePayRadio] = useState(null);
    const [activeRadioBtn, setActiveRadioBtn] = useState(null);
    const reff = useRef(false);
    const Navigate = useRouter();
    const [activeTransactionPopup, setActiveTransactionPopup] = useState(false);
    const [activeCashOnDelivery, setActiveCashOnDelivery] = useState(false);
    const [orderId, setOrderId] = useState();
    const [transactionId, setTransactionId] = useState("");
    const [showInputField, setShowInputField] = useState(false);
    const [data, setData] = useState();
    const [isTransactionSaved, setIsTransactionSaved] = useState(false);
    const [activeOrderTab, setActiveOrderTab] = useState("order-tab-1");
    const [postOffices, setPostOffices] = useState([]);
    const [profile, setProfile] = useState({
        full_name: "",
        mobile: "",
        primary_number: "",
        email: "",
        zip_code: "",
        address: "",
        city: "",
        state: "",
    });
    const [formData, setFormData] = useState({
        first_name: profile?.full_name?.split(" ")[0] || "",
        last_name: profile?.full_name?.split(" ")[1] || "",
        mobile_number: profile?.mobile || "",
        primary_email: profile?.email || "",
        postal_code: profile?.zip_code || "",
        amount: "",
        billing_address: profile?.address || "",
        original_amount: "",
        city: profile?.city || "",
        post_office: "",
        district: "",
        state: profile?.state || "",
        seller_id: "2",
    });
    const [wBalance, setWBalance] = useState(null);
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [orderIds, setOrderIds] = useState("");
    const [walletInput, setWalletInput] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);


    //wallet input
    function handleCheckboxChange(e) {
        // setShowInputField(!showInputField);
        setShowInputField(e.target.checked);
        if (!e.target.checked) {
            // If checkbox is unchecked, reset the wallet input.
            setWalletInput(0);
        }
    }

    //delete  product
    const handleDeleteItem = (productid) => {
        removeFromCart(productid);
        setCartItems(cartItems.filter((item) => item.id !== productid));
    };

    //redirect to tab
    useEffect(() => {
        if (queryParams?.isRetry) {
            reff.current = true;
            setActiveOrderTab("order-tab-3");
        }
    }, [queryParams]);

    //tab change
    const handleOrderTabs = (value) => {
        setActiveOrderTab(value);
    };

    // product related data
    useEffect(() => {
        const productid = cartItems?.map((item) => item?.productid);
        if (!productid?.length) {
            return;
        }
        const fetchRelatedNumbers = async () => {
            try {
                const response = await fetch(
                    `https://admin.leafymango.com/web/related/numbers?ids=${productid?.join(
                        ","
                    )}`
                );
                const data = await response.json();
                setRelatedNumbers(data.data);
                setNumber(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRelatedNumbers();
    }, [cartItems]);

    // add products in cart items
    const handleAddToCart = (item, index) => {
        if (!checkUser()) {
            Navigate.push("/signinwithpassword");
        } else {
            if (!item.alreadyInCart) {
                addToCart({ ...item, product_id: item?.productid });
                const updatedItem = { ...item, alreadyInCart: true };
                const updatedNumbers = [...relatedNumbers];
                updatedNumbers[index] = updatedItem;
                setRelatedNumbers(updatedNumbers);
            } else {
                NotificationManager.warning("Already moved to cart!", "Warning");
            }
        }
    };

    // check products in cart items
    useEffect(() => {
        const updatedNumbers = relatedNumbers.map((item) => ({
            ...item,
            alreadyInCart: false,
        }));
        setRelatedNumbers(updatedNumbers);
    }, []);

    //timer function
    const timerRef = useRef();
    useEffect(() => {
        if (!activePayRadio) {
            setTimeLeft(60 * 1); // Adjust to the time you want to reset.
            clearInterval(timerRef.current);
        }

        if (activePayRadio) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    // When timeLeft is 0, clear interval and close popup
                    if (prevTime === 1) {
                        setActivePayRadio(null);
                        clearInterval(timerRef.current);
                    }
                    if (prevTime === 1) setActiveRadioBtn(null);
                    return prevTime - 1;
                });
            }, 1000);
        }

        // Clear interval when unmounting component
        return () => clearInterval(timerRef.current);
    }, [activePayRadio]);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    //cash on delivery
    const handleCashOnDelivery = (value) => {
        setActiveCashOnDelivery(value);
    };

    //wallet api code
    useEffect(() => {
        getProfile(user?.token)?.then((res) => {
            setWBalance(parseInt(res?.contact_cf?.wallet_balance));
        });
    }, []);

    // Make the API request to check the coupon code
    const handleApplyCoupon = async () => {
        try {
            const response = await axios.post(
                "https://admin.leafymango.com/web/discount/coupon",
                {
                    coupon_code: couponCode,
                    detail: cartItems.map((item) => ({
                        number: item.productname,
                        amount: item?.unit_price,
                    })),
                }
            );
            if (response.data.status === "success") {
                // Coupon is valid
                NotificationManager.success(response.data.message);
                setTotalDiscount(response.data.data.total_discount || 0);
                setDiscountValue(response.data.data.discount_value)
            } else {
                // Coupon is invalid
                NotificationManager.error(response.data.message);
            }
        } catch (error) {
            console.error("Error applying coupon:", error);
            NotificationManager.error(
                "Error applying coupon. Please try again later."
            );
        }
    };

    //wallet price calculation
    const handleWalletInputChange = (e) => {
        let inputValue = parseFloat(e.target.value);
        if (inputValue > wBalance) {
            inputValue = wBalance;
        }
        setWalletInput(inputValue);
    };

    // all price calculation
    // const newTotal = parseFloat(total) - (Number.isFinite(walletInput) ? walletInput : 0);

    // Calculate newTotal based on user selections
    const calculateNewTotal = () => {
        let updatedTotal = parseFloat(total);
        if (Number.isFinite(totalDiscount) && totalDiscount > 0) {
            updatedTotal -= totalDiscount;
        }
        if (Number.isFinite(walletInput) && walletInput > 0) {
            updatedTotal -= walletInput;
        }
        return updatedTotal;
    };
    // Calculate newTotal
    const newTotal = calculateNewTotal();

    //user profile code
    useEffect(() => {
        if (user?.token) {
            getProfile(user?.token)?.then((res) => {
                setProfile(res);
                const address = res?.address || {};
                const fullName = `${res?.firstname || ""} ${res?.lastname || ""
                    }`.trim(); // Remove leading/trailing spaces from the full name
                setFormData((prevState) => ({
                    ...prevState,
                    first_name: res?.firstname || "",
                    last_name: res?.lastname || "",
                    mobile_number: res?.mobile || "",
                    primary_email: res?.email || "",
                    postal_code: address?.zip_code || "",
                    amount: cartItems
                        ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
                        .toString(),
                    billing_address: address?.address || "",
                    original_amount: cartItems
                        ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
                        .toString(),
                    city: address?.city || "",
                    district: address?.district || "",
                    state: address?.state || "",
                    seller_id: "2",
                    number_for_display: cartItems
                        ?.map((item) => item.productname)
                        .join(","),
                    requested_number: cartItems?.map((item) => item.number).join(","),
                    full_name: fullName,
                }));
                setZipCode(address?.postal_code || "");
                setCity(address?.city || "");
                setState(address?.state || "");
                setAddress(address?.address || "");
                if (
                    res?.firstname &&
                    res?.lastname &&
                    res?.mobile &&
                    res?.email &&
                    address?.state &&
                    address?.zip_code &&
                    address?.city
                ) {
                    if (!reff.current) {
                        handleOrderTabs("order-tab-2");
                    }
                }
            });
        }
    }, [user, cartItems, addToWishList]);

    //create lead  rendom data for ORDERID
    useEffect(() => {
        if (!orderIds) {
            let randomDigits = "";
            for (let i = 0; i < 5; i++) {
                randomDigits += Math.floor(Math.random() * 10);
            }
            setOrderIds(`ORD_${formData?.mobile_number}_${randomDigits}`);
        }
    }, [orderIds, formData]);

    //payload data for create and update leads
    const payload = {
        requested_numbers: formData?.requested_number,
        order_status: "Created",
        seller_id: "",
        order_id: orderIds,
        success: false,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        mobile_number: formData?.mobile_number,
        primary_email: formData?.primary_email,
        postal_code: formData?.postal_code,
        amount: newTotal,
        billing_address: formData?.billing_address,
        original_amount: formData?.original_amount,
        city: formData?.city,
        district: formData?.district,
        state: formData?.state,
        payment_status: "",
        number_for_display: formData?.number_for_display,
        coupon_code: couponCode,
        discount_value: discountValue,
        discount_type: "Amount",
        total_discount: totalDiscount
    };

    //  transaction api with lead action
    const handleSubmitTansation = async (event, orderdeclined) => {
        event.preventDefault();
        if (transactionId.length !== 6) {
            // Display an error message to the user
            NotificationManager.error(
                "The transaction ID must be 6 characters long",
                "Error"
            );
            return;
        }
        try {
            const response = await axios.post(
                "https://admin.leafymango.com/web/transaction/id/save",
                {
                    transaction_id: transactionId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            NotificationManager.success("Transaction ID saved successfully");
            NotificationManager.success("Your Order Placed is  successfully");
            setIsTransactionSaved(true);
            // Additional API code
            axios
                .post(
                    "https://admin.leafymango.com/web/lead/update",
                    {
                        order_id: orderIds,
                        success: false,
                        payment_status: "qrcode",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        // Response is successful
                        const data = response.data;
                        if (orderdeclined) {
                            localStorage.setItem("vipDeclined", true);
                            Navigate.push("/payment-declined?orderId=" + orderId);
                        } else {
                            NotificationManager.success("Transaction successful");
                            localStorage.setItem("vipthankyou", true);
                            Navigate.push(
                                `/thank-you?status=${response?.data?.status}&count=` +
                                cartItems?.length
                            );
                            setCartItems([]);
                        }
                    } else {
                        // Response is not successful
                        const data = response.data;
                        NotificationManager.error(data.message);
                        localStorage.setItem("vipDeclined", true);
                        Navigate.push("/payment-declined");
                        console.error(data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    NotificationManager.error("Failed to save transaction ID", "Error");
                    // handle the error accordingly
                });
        } catch (error) {
            console.error(error); // log the error to the console
            NotificationManager.error("Failed to save transaction ID", "Error");
            // handle the error accordingly
        }
    };

    //pin code for user profile
    const handleZipCodeChange = async (event) => {
        const zipCode = event;
        if (zipCode.length === 6) {
            try {
                const response = await axios.get(
                    `https://api.postalpincode.in/pincode/${zipCode}`
                );
                const { PostOffice } = response.data[0];
                const postOffices = PostOffice.map((postOffice) => postOffice.Name);
                const district = PostOffice[0].District;
                const state = PostOffice[0].State;
                setPostOffices(postOffices);
                setFormData((prevState) => ({
                    ...prevState,
                    city: postOffices[0] || "",
                    district: district || "",
                    state: state || "",
                    postal_code: zipCode,
                }));
            } catch (error) {
                console.error(error);
            }
        } else {
            setPostOffices([]);
            setFormData((prevState) => ({
                ...prevState,
                city: "",
                district: "",
                state: "",
                postal_code: zipCode,
            }));
        }
    };

    //input data changed for user profile
    const handleChange = (e) => {
        if (e.target.name === "full_name") {
            const fullName = e.target.value;
            const [firstName, lastName] = fullName?.trim()?.split(" ");
            setFormData((prevState) => ({
                ...prevState,
                first_name: firstName,
                last_name: lastName,
                full_name: fullName,
            }));
        } else if (e.target.name === "mobile_number") {
            const phoneNumber = e.target.value;
            // Remove the starting values "+91", "00", and "0" from the phone number
            const cleanedPhoneNumber = phoneNumber.replace(/^(\+91|00|0)/, "");
            setFormData((prevState) => ({
                ...prevState,
                mobile_number: cleanedPhoneNumber,
            }));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    //send data in payload to server  profile
    useEffect(() => {
        let count = 0;
        const productnames = [];
        const number_for_display = [];
        cartItems?.forEach((res) => {
            count = count + parseFloat(res?.unit_price) || 0;
            productnames.push(res?.productname);
            number_for_display.push(res?.number_for_display);
        });
        setTotal(count);
        setFormData((prevState) => ({
            ...prevState,
            amount: count.toString(),
            original_amount: count.toString(),
            number_for_display: productnames.join(","),
            requested_number: productnames.join(","),
        }));
    }, [cartItems, addToWishList]);

    // Payment Integration code
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = async () => { };
        return () => {
            document.body.removeChild(script);
        };
    }, [user]);

    // Payment Integration code
    function handleRzpClick(e) {
        e.preventDefault();
        const token = user?.token; // get the user's token data
        const orderData = {
            amount: newTotal,
            currency: "INR",
        };
        // Check if the cart amount is more than 5000/-
        const isCartAmountGreaterThan5000 = newTotal > 5000;

        // Set the "upi" method based on the condition
        const method = {
            upi: !isCartAmountGreaterThan5000, // Set "upi" to false if amount > 5000
        };


        getOrderId(orderData, token).then((res) => {
            setOrderId(res?.data?.data?.order_id);
            // Create Razorpay options for the payment form
            const options = {
                key: "rzp_live_mMfqxRhCpzrpog",
                name: "VIP NUMBER SHOP",
                description: "Payment for VIP Mobile Number",
                image: brandIcon,
                order_id: res?.data?.data?.order_id,
                handler: function (response) {
                    ajaxRequest(response, false);
                },
                prefill: {
                    name: formData.first_name + " " + formData.last_name,
                    email: formData.primary_email,
                    contact: formData.mobile_number,
                },
                notes: {
                    address: formData.billing_address,
                },
                theme: {
                    color: "#3399cc",
                },
                method: method,
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                ajaxRequest(response, true);
            });
            rzp1 && rzp1.open();
        });
    }
    // Payment Integration code
    function ajaxRequest(response, orderdeclined) {
        let data;
        let leadPayload = {};
        if (response.error) {
            data = {
                payment_status: 0,
                amount: newTotal,
                user_id: 613,
                razorpay_payment_id: response.error.metadata.payment_id,
                razorpay_order_id: response.error.metadata.order_id,
                error_code: response.error.code,
                error_description: response.error.description,
                error_source: response.error.source,
                error_step: response.error.step,
                error_reason: response.error.reason,
            };
            leadPayload.payment_status = "failed";
            leadPayload.payment_id = response.error.metadata.payment_id; // Add payment_id to leadPayload
        } else {
            data = {
                payment_status: 1,
                amount: newTotal,
                user_id: 613,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                card_id: cartItems?.map((cart) => cart?.cart_id)?.join(),
            };
            leadPayload.payment_status = "success";
            leadPayload.payment_id = response.razorpay_payment_id; // Add payment_id to leadPayload
        }
        const token = user?.token; // get the user's token data
        const orderId =
            response.razorpay_order_id || response.error.metadata.order_id;
        fetch("https://admin.leafymango.com/web/transaction/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // use the user's token data
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    // Response is successful
                    response.json().then((data) => {
                        axios.post(
                            "https://admin.leafymango.com/web/lead/update",
                            {
                                order_id: orderIds,
                                ...leadPayload,
                                success: orderdeclined,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        if (orderdeclined) {
                            localStorage.setItem("vipDeclined", true);
                            Navigate.push("/payment-declined?orderId=" + orderId);
                        } else {
                            NotificationManager.success("Transaction successful");
                            NotificationManager.success("Your Order Placed is  successfully");
                            localStorage.setItem("vipthankyou", true);
                            Navigate.push("/thank-you?count=" + cartItems?.length);
                            setCartItems([]);
                        }
                    });
                } else {
                    // Response is not successful
                    response.json().then((data) => {
                        NotificationManager.error(data.message);
                        localStorage.setItem("vipDeclined", true);
                        Navigate.push("/payment-declined");
                        console.error(data);
                    });
                }
            })
            .catch((error) => console.error(error));
    }

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };
    const optimizedFn = useCallback(debounce(handleZipCodeChange), []);

    //upi payment methods  and scanners
    const QRImages = [QRImg, QRImg1, QRImg2, QRImg3, QRImg4];
    const handleDownloadQRCode = (index) => {
        const link = document.createElement("a");
        link.href = QRImages[index];
        link.download = "qrcode.png"; // You can customize the file name here
        link.click();
    };

    return (
        <section className="OrderPlacement-section-os">
            <div className="container-os">
                <div className="OrderPlacement-tabs-row-os">
                    <button
                        type="button"
                        className={
                            activeOrderTab === "order-tab-1"
                                ? "OrderPlacement-tab-os active"
                                : "OrderPlacement-tab-os"
                        }
                    >
                        Shipping Address
                    </button>
                    <button
                        type="button"
                        className={
                            activeOrderTab === "order-tab-2"
                                ? "OrderPlacement-tab-os active"
                                : "OrderPlacement-tab-os"
                        }
                    >
                        Order Summary
                    </button>
                    <button
                        type="button"
                        className={
                            activeOrderTab === "order-tab-3"
                                ? "OrderPlacement-tab-os active"
                                : "OrderPlacement-tab-os"
                        }
                    >
                        Payment Information
                    </button>
                </div>
                <form
                    onSubmit={() => { }}
                    className="OrderPlacement-tab-all-contents-row-os"
                >
                    <div
                        className={`OrderPlacement-ShippingAddress-content-main-row-os ${activeOrderTab === "order-tab-1"
                                ? "OrderPlacement-content-os active"
                                : "OrderPlacement-content-os"
                            }`}
                    >
                        <div className="OrderPlacement-ShippingAddress-content-row-os">
                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <div className="OrderPlacement-input-os">
                <input
                  type="text"
                  placeholder="Your last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div> */}
                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    disabled={formData.mobile_number !== ""}
                                />
                            </div>
                            <div className="OrderPlacement-input-os">
                                <input
                                    type="email"
                                    placeholder="Email Id"
                                    name="primary_email"
                                    value={formData.primary_email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            city: "",
                                            district: "",
                                            state: "",
                                            postal_code: e.target.value,
                                        }));
                                        optimizedFn(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    name="billing_address"
                                    value={formData.billing_address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="OrderPlacement-input-os">
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => {
                                        const selectedCity = e.target.value;
                                        if (selectedCity !== "postoffice") {
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                city: selectedCity,
                                            }));
                                        } else {
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                city: "",
                                            }));
                                        }
                                    }}
                                >
                                    <option value="" disabled>
                                        Select city
                                    </option>
                                    {formData.city && (
                                        <option value={formData.city}>{formData.city}</option>
                                    )}
                                    {postOffices.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                    {/* <option value="postoffice">Post Office</option> */}
                                </select>
                            </div>

                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="District"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="OrderPlacement-input-os">
                                <input
                                    type="text"
                                    placeholder="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="original_amount"
                                name="original_amount"
                                value={formData.original_amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="requested_number"
                                name="requested_number"
                                value={formData.requested_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="billing_address"
                                name="billing_address"
                                value={formData.billing_address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="number_for_display"
                                name="number_for_display"
                                value={formData.number_for_display}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <input
                                type="hidden"
                                placeholder="seller_id"
                                name="seller_id"
                                value={formData.seller_id}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="OrderPlacement-next-button-os">
                            <button
                                type="button"
                                className={
                                    formData.mobile_number &&
                                        formData.primary_email &&
                                        formData.postal_code &&
                                        formData.billing_address &&
                                        formData.city &&
                                        formData.district &&
                                        formData.state
                                        ? ""
                                        : "disabled"
                                }
                                onClick={() => {
                                    const updatedProfile = {
                                        ...(profile || {}),
                                        full_name:
                                            formData?.first_name +
                                            (formData?.last_name ? " " + formData.last_name : "") ||
                                            formData?.first_name ||
                                            profile?.full_name ||
                                            "",
                                        mobile: formData?.mobile_number || profile?.mobile || "",
                                        primary_number:
                                            formData?.mobile_number || profile?.primary_number || "",
                                        email: formData?.primary_email || profile?.email || "",
                                        address: {
                                            ...(profile?.address || {}),
                                            city: formData?.city || profile?.address?.city || "",
                                            address:
                                                formData?.billing_address ||
                                                profile?.address?.address ||
                                                "",
                                            district: formData.district,
                                            state: formData?.state || profile?.address?.state || "",
                                            zip_code:
                                                formData?.postal_code ||
                                                profile?.address?.zip_code ||
                                                "",
                                        },
                                    };
                                    updateProfile(updatedProfile, user.token)
                                        .then((response) => {
                                            // Proceed with the address update API call
                                            axios
                                                .post(
                                                    "https://admin.leafymango.com/web/address/update",
                                                    updatedProfile.address,
                                                    {
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            Authorization: `Bearer ${user?.token}`,
                                                        },
                                                    }
                                                )
                                                .then((addressResponse) => { })
                                                .catch((addressError) => {
                                                    console.error(addressError);
                                                    // Handle any errors during the address update
                                                });
                                        })
                                        .catch((profileError) => {
                                            console.error(profileError);
                                            // Handle any errors during the profile update
                                        });
                                    handleOrderTabs("order-tab-2");
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div
                        className={`OrderPlacement-orderSummary-content-main-row-os ${activeOrderTab === "order-tab-2"
                                ? "OrderPlacement-content-os active"
                                : "OrderPlacement-content-os"
                            }`}
                    >
                        <div className="OrderPlacement-orderSummary-content-row-os">
                            {relatedNumbers && (
                                <div className="OrderPlacement-orderSummary-content-col-2-os">
                                    <div className="OrderPlacement-add-on-heading-text-os">
                                        Addon VIP Numbers for Family
                                    </div>
                                    {relatedNumbers.length !== 0 ? (
                                        <div>
                                            {relatedNumbers?.map((items, index) => (
                                                <div
                                                    key={index}
                                                    className="OrderPlacement-add-on-number-row-os"
                                                >
                                                    <div className="OrderPlacement-add-on-number-col-1-os">
                                                        <div className="">
                                                            <span></span>
                                                        </div>
                                                        {items.productname}
                                                    </div>

                                                    <div className="OrderPlacement-add-on-number-price-atc-os">
                                                        <div className="OrderPlacement-addOn-price-os">
                                                            {`₹ ${parseFloat(items.unit_price).toLocaleString(
                                                                "en-IN",
                                                                {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}`}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="OrderPlacement-add-on-number-cart-btn"
                                                            onClick={() => handleAddToCart(items, index)}
                                                        >
                                                            {items.alreadyInCart
                                                                ? "moved to Cart"
                                                                : "Add to Cart"}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p
                                            className="data-not-found-os"
                                            style={{
                                                opacity: "0.85",
                                            }}
                                        >
                                            Oops! No similar number found.
                                        </p>
                                    )}
                                </div>
                            )}
                            <div className="OrderPlacement-orderSummary-content-col-1-os">
                                {Array.isArray(cartItems) &&
                                    cartItems.map((res, index) => (
                                        <div key={index} className="OrderPlacement-added-number-os">
                                            <span>{res?.productname}</span>
                                            <div className="OrderPlacement-price-delete-os">
                                                <span>
                                                    &#8377;{" "}
                                                    {parseFloat(res?.unit_price).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="WishListNumber-addToCart-btn-os"
                                                    onClick={() => handleDeleteItem(res.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                <div className="OrderPlacement-order-summary-heading-os">
                                    Apply Coupon Code
                                </div>
                                <div className="OrderPlacement-discount-coupan-field-os">
                                    <input
                                        type="text"
                                        placeholder="coupon code hare"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button type="button" onClick={handleApplyCoupon}>
                                        Apply
                                    </button>
                                </div>

                                <div className="OrderPlacement-order-summary-heading-os">
                                    Order Summary
                                </div>
                                <div className="OrderPlacement-product-price-os">
                                    <span>Sub Total</span>
                                    <span>
                                        &#8377; {parseFloat(total).toLocaleString("en-IN")}
                                    </span>
                                </div>
                                {totalDiscount > 0 && (
                                    <div className="OrderPlacement-product-price-os">
                                        <span className="OrderPlacement-saved-text">
                                            Total Discount
                                        </span>
                                        <span className="OrderPlacement-saved-amount">
                                            &#8377;
                                            {parseFloat(totalDiscount).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                )}

                                <div className="OrderPlacement-product-total-price-os">
                                    <span>Grand Total</span>
                                    <span>&#8377; {newTotal.toLocaleString("en-IN")}</span>
                                </div>

                                {wBalance > 0 && (
                                    <div className="OrderPlacement-product-wallet-balance-row-os">
                                        <label className="">
                                            Wallet Balance
                                            <input
                                                type="checkbox"
                                                checked={showInputField}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <div className="OrderPlacement-product-wallet-balance-added">
                                            &#8377; {wBalance}/-
                                        </div>
                                    </div>
                                )}
                                {showInputField ? (
                                    <div className="OrderPlacement-product-wallet-input-filed-os">
                                        <input
                                            type="number"
                                            placeholder="e.g Rs.1000"
                                            value={walletInput}
                                            onChange={handleWalletInputChange}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
                            <button
                                type="button"
                                onClick={() => handleOrderTabs("order-tab-1")}
                                className="OrderPlacement-paymentInfo-previous-os"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    axios.post(
                                        "https://admin.leafymango.com/web/lead/custom_create",
                                        payload,
                                        {
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${user.token}`,
                                            },
                                        }
                                    );
                                    handleOrderTabs("order-tab-3");
                                }}
                                className="OrderPlacement-paymentInfo-submit-button-os"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div
                        className={`OrderPlacement-paymentInfo-content-main-row-os payment-radio-buttons-os ${activeOrderTab === "order-tab-3"
                                ? "OrderPlacement-content-os active"
                                : "OrderPlacement-content-os"
                            }`}
                    >
                        <div className="OrderPlacement-paymentInfo-content-row-os">
                            <div className="OrderPlacement-paymentInfo-method-row-os">
                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onClick={handleRzpClick}
                                            onChange={() => {
                                                setActiveRadioBtn("radio6-os");
                                            }}
                                            checked={activeRadioBtn === "radio6-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-6 -os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="credit-debit-image-os">
                                                    {/* <Image src={Payment6} alt="" /> */}
                                                    Pay via card
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onChange={() => {
                                                setActivePayRadio(true);
                                                setActiveRadioBtn("radio1-os");
                                            }}
                                            onClick={handleRzpClick}
                                            checked={activeRadioBtn === "radio1-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-1-os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="credit-debit-image-os">
                                                    <Image src={Payment6} alt="" />
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onChange={() => {
                                                setActivePayRadio(true);
                                                setActiveRadioBtn("radio2-os");
                                            }}
                                            onClick={handleRzpClick}
                                            checked={activeRadioBtn === "radio2-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-3-os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="upi-payment-img-os">
                                                    <Image src={Payment2} alt="" />
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onChange={() => {
                                                setActivePayRadio(true);
                                                setActiveRadioBtn("radio3-os");
                                            }}
                                            checked={activeRadioBtn === "radio3-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-4-os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="upi-payment-img-os">
                                                    <Image src={Payment3} alt="" />
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onChange={() => {
                                                setActivePayRadio(true);
                                                setActiveRadioBtn("radio4-os");
                                            }}
                                            onClick={handleRzpClick}
                                            checked={activeRadioBtn === "radio4-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-5-os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="upi-payment-img-os">
                                                    <Image src={Payment4} alt="" />
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div
                                    disabled={total > 500000}
                                    className="OrderPlacement-paymentInfo-method-col-1-os"
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value=""
                                            disabled={total > 500000}
                                            onClick={handleRzpClick}
                                            onChange={() => {
                                                setActivePayRadio(true);
                                                setActiveRadioBtn("radio5-os");
                                            }}
                                            checked={activeRadioBtn === "radio5-os"}
                                        />
                                        <span className="custom-radio">
                                            <span className="dot"></span>
                                            <div
                                                className={
                                                    activePayRadio === "payRadio-6-os"
                                                        ? "credit-debit-os active"
                                                        : "credit-debit-os"
                                                }
                                            >
                                                <span className="upi-payment-img-os">
                                                    <Image src={Payment5} alt="" />
                                                </span>
                                            </div>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="OrderPlacement-paymentInfo-debit-card-details-row-os">
                                {/* <div className="OrderPlacement-rzp-btn-os">
                  <button
                    type="button"
                    id="rzp-button1"
                    onClick={handleRzpClick}
                  >
                    Pay Via Card
                  </button>
                </div> */}
                                <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleOrderTabs("order-tab-2");
                                            getProfile(user?.token);
                                        }}
                                        className="OrderPlacement-paymentInfo-submit-button-os"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* payment popup airtel */}
            {/* {activeRadioBtn === "radio1-os" && (
        <section
          className={
            activePayRadio
              ? "QR-code-popup-section-os active"
              : "QR-code-popup-section-os"
          }
        >
          <div className="QR-code-popup-all-data-row-os">
            <div className="QR-code-popup-row-os">
              <div className="QR-code-image-os">
                <Image src={QRImg} alt="" />

                {activePayRadio && (
                  <div className="left-time-countdown-os">
                    <span>{`${minutes}:${
                      seconds < 10 ? "0" : ""
                    }${seconds}`}</span>
                  </div>
                )}
              </div>
              <div className="download-icon-os">
                <Button onClick={() => handleDownloadQRCode(0)}>
                  <GetAppIcon />
                </Button>
              </div>
              <div className="QR-code-upi-id-os">9056320563@ybl</div>
              <div className="QR-code-upiId-owner-os">VIP NUMBER SHOP</div>
              <div className="QR-code-popup-done-cancel-btn-row-os">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTransactionPopup(true);
                    setActivePayRadio(null);
                  }}
                  className="QR-code-popup-done-btn-os"
                >
                  Payment Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePayRadio(null);
                    setActiveRadioBtn(null);
                  }}
                  className="QR-code-popup-cancel-btn-os"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )} */}

            {/* payment popup paytm */}
            {/* {activeRadioBtn === "radio2-os" && (
        <section
          className={
            activePayRadio
              ? "QR-code-popup-section-os active"
              : "QR-code-popup-section-os"
          }
        >
          <div className="QR-code-popup-all-data-row-os">
            <div className="QR-code-popup-row-os">
              <div className="QR-code-image-os">
                <Image src={QRImg1} alt="" />

                {activePayRadio && (
                  <div className="left-time-countdown-os">
                    <span>{`${minutes}:${
                      seconds < 10 ? "0" : ""
                    }${seconds}`}</span>
                  </div>
                )}
              </div>
              <div className="download-icon-os">
                <Button onClick={() => handleDownloadQRCode(1)}>
                  <GetAppIcon />
                </Button>
              </div>
              <div className="QR-code-upi-id-os">9056320563@ybl</div>
              <div className="QR-code-upiId-owner-os">VIP NUMBER SHOP</div>
              <div className="QR-code-popup-done-cancel-btn-row-os">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTransactionPopup(true);
                    setActivePayRadio(null);
                  }}
                  className="QR-code-popup-done-btn-os"
                >
                  Payment Done
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActivePayRadio(null);
                    setActiveRadioBtn(null);
                  }}
                  className="QR-code-popup-cancel-btn-os"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )} */}

            {/* payment popup phonepay */}
            {activeRadioBtn === "radio3-os" && (
                <section
                    className={
                        activePayRadio
                            ? "QR-code-popup-section-os active"
                            : "QR-code-popup-section-os"
                    }
                >
                    <div className="QR-code-popup-all-data-row-os">
                        <div className="QR-code-popup-row-os">
                            <div className="QR-code-image-os">
                                <Image src={QRImg2} alt="" />

                                {activePayRadio && (
                                    <div className="left-time-countdown-os">
                                        <span>{`${minutes}:${seconds < 10 ? "0" : ""
                                            }${seconds}`}</span>
                                    </div>
                                )}
                            </div>
                            <div className="download-icon-os">
                                <Button onClick={() => handleDownloadQRCode(2)}>
                                    <GetAppIcon />
                                </Button>
                            </div>
                            <div className="QR-code-upi-id-os">
                                <span>Total Amount {""}</span>
                                <span>&#8377; {newTotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="QR-code-upi-id-os">9056320563@ybl</div>
                            <div className="QR-code-upiId-owner-os">VIP NUMBER SHOP</div>
                            <div className="QR-code-popup-done-cancel-btn-row-os">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTransactionPopup(true);
                                        setActivePayRadio(null);
                                    }}
                                    className="QR-code-popup-done-btn-os"
                                >
                                    Payment Done
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActivePayRadio(null);
                                        setActiveRadioBtn(null);
                                    }}
                                    className="QR-code-popup-cancel-btn-os"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* payment popup upi */}
            {/* {activeRadioBtn === "radio4-os" && (
        <section
          className={
            activePayRadio
              ? "QR-code-popup-section-os active"
              : "QR-code-popup-section-os"
          }
        >
          <div className="QR-code-popup-all-data-row-os">
            <div className="QR-code-popup-row-os">
              <div className="QR-code-image-os">
                <Image src={QRImg3} alt="" />

                {activePayRadio && (
                  <div className="left-time-countdown-os">
                    <span>{`${minutes}:${
                      seconds < 10 ? "0" : ""
                    }${seconds}`}</span>
                  </div>
                )}
              </div>
              <div className="download-icon-os">
                <Button onClick={() => handleDownloadQRCode(3)}>
                  <GetAppIcon />
                </Button>
              </div>
              <div className="QR-code-upi-id-os">9056320563@ybl</div>
              <div className="QR-code-upiId-owner-os">VIP NUMBER SHOP</div>
              <div className="QR-code-popup-done-cancel-btn-row-os">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTransactionPopup(true);
                    setActivePayRadio(null);
                  }}
                  className="QR-code-popup-done-btn-os"
                >
                  Payment Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePayRadio(null);
                    setActiveRadioBtn(null);
                  }}
                  className="QR-code-popup-cancel-btn-os"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )} */}

            {/* payment popup gpay */}
            {/* {activeRadioBtn === "radio5-os" && (
        <section
          className={
            activePayRadio
              ? "QR-code-popup-section-os active"
              : "QR-code-popup-section-os"
          }
        >
          <div className="QR-code-popup-all-data-row-os">
            <div className="QR-code-popup-row-os">
              <div className="QR-code-image-os">
                <Image src={QRImg4} alt="" />

                {activePayRadio && (
                  <div className="left-time-countdown-os">
                    <span>{`${minutes}:${
                      seconds < 10 ? "0" : ""
                    }${seconds}`}</span>
                  </div>
                )}
              </div>
              <div className="download-icon-os">
                <Button onClick={() => handleDownloadQRCode(4)}>
                  <GetAppIcon />
                </Button>
              </div>
              <div className="QR-code-upi-id-os">9056320563@ybl</div>
              <div className="QR-code-upiId-owner-os">VIP NUMBER SHOP</div>
              <div className="QR-code-popup-done-cancel-btn-row-os">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTransactionPopup(true);
                    setActivePayRadio(null);
                  }}
                  className="QR-code-popup-done-btn-os"
                >
                  Payment Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePayRadio(null);
                    setActiveRadioBtn(null);
                  }}
                  className="QR-code-popup-cancel-btn-os"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )} */}

            {activeTransactionPopup && (
                <section
                    className={`transaction-id-popup-section-os ${activeTransactionPopup}`}
                >
                    <div className="transaction-id-popup-all-data-row-os">
                        <div className="transaction-id-popup-row-os">
                            <button
                                type="button"
                                onClick={() => setActiveTransactionPopup(false)}
                                className="transaction-id-popup-cross-btn-os"
                            >
                                <svg
                                    width="53"
                                    height="53"
                                    viewBox="0 0 53 53"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
                                    <path
                                        d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                                        fill="#EFEFEF"
                                    />
                                </svg>
                            </button>
                            <div className="transaction-id-popup-heading-os">
                                Transaction ID
                            </div>
                            <div className="transaction-id-popup-heading-1-os">
                                Enter Trans ID (Last 6 Digits only)
                            </div>
                            <form
                                className="transaction-id-form-os"
                                onSubmit={handleSubmitTansation}
                            >
                                <div className="transaction-id-input-os">
                                    <input
                                        type="text"
                                        placeholder="Trans ID"
                                        value={transactionId}
                                        onChange={(event) => setTransactionId(event.target.value)}
                                    />
                                </div>
                                <button type="submit" disabled={isTransactionSaved}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {activeCashOnDelivery && (
                <section
                    className={`cashOnDelivery-section-os ${activeCashOnDelivery}`}
                >
                    <div className="cashOnDelivery-popup-main-row-os">
                        <div className="cashOnDelivery-popup-row-os">
                            <button
                                type="button"
                                onClick={() => setActiveCashOnDelivery(false)}
                                className="transaction-id-popup-cross-btn-os"
                            >
                                <svg
                                    width="53"
                                    height="53"
                                    viewBox="0 0 53 53"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
                                    <path
                                        d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                                        fill="#EFEFEF"
                                    />
                                </svg>
                            </button>
                            <div className="cashOnDelivery-heading-os">
                                Pay 299 INR Cash On Delivery
                            </div>
                            <div className="cashOnDelivery-content-os">
                                <p>You selected cash on delivery (COD) as a payment option.</p>
                                <p>
                                    Please make sure to have the exact amount of cash ready when
                                    our delivery agent arrives.
                                </p>
                                <p>
                                    Thank you for choosing our service, and we hope you enjoy your
                                    purchase!
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        alert("Success");
                                    }}
                                    className="cashOnDelivery-pay-btn-os"
                                >
                                    Proceed to Pay INR 299/ -
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
};

export default OrderPlacementTabs;