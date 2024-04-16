import React, { useState, useRef } from "react";
import "./OrderPlacementTabs.css";
import Image from "next/image";
// Images
import Payment2 from "../../Assets/payment2.svg";
import Payment3 from "../../Assets/payment3.svg";
import Payment4 from "../../Assets/payment4.svg";
import Payment5 from "../../Assets/payment5.svg";
import Payment6 from "../../Assets/payment6.svg";
import { useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useEffect } from "react";
// import QRImg1 from "../../../Assets/QR-code1.jpg";
// import QRImg2 from "../../../Assets/QR-code2.png";
import QRImg from "../../Assets/QR-code.png";
import QRImg1 from "../../Assets/paytm-updated-qr-29-01-24.png";
import QRImg2 from "../../Assets/phone-pe-updated-020424.png";
import QRImg3 from "../../Assets/QR-code3.png";
import QRImg4 from "../../Assets/QR-code4.png";
import brandIcon from "../../Assets/VIP-icon-2.svg";

//
import paymentNew1 from "../../Assets/new-payment-icon-1.svg";
import paymentNew2 from "../../Assets/new-payment-icon-2.svg";
import paymentNew3 from "../../Assets/new-payment-icon-3.svg";
import paymentNew4 from "../../Assets/new-payment-icon-4.svg";
import paymentNew5 from "../../Assets/new-payment-icon-5.svg";

import axios from "axios";
import {
  getOrderId,
  getProfile,
  updateProfile,
} from "../../Services/Services";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useGetQueryParams } from "../../utils";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import DeliveryProcess from "../../Shared/DeliveryProcess/DeliveryProcess/DeliveryProcess";
import AwardWinner from "../../Shared/AwardWinner/AwardWinner/AwardWinner";
import OrderPlacementOurCustomers from "../../Shared/OrderPlacementOurCustomers/OrderPlacementOurCustomers";
import MainHeading from "../../Shared/MainHeading/MainHeading";

const OrderPlacementTabs = (props) => {
  const { queryParams } = useGetQueryParams();
  const {
    cartItems,
    setCartItems,
    addToWishList,
    // user = {},
    addToCart,
    checkUser,
    removeFromCart,
    setRelatedNumbers: setNumber,

    setUserDetails,
    redirectTo,
    setRedirectTo,
    cartCache,
    setCartCache,
    user,
  } = useContext(AppStateContext);
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [activePayRadio, setActivePayRadio] = useState("");
  const [activeRadioBtn, setActiveRadioBtn] = useState("");
  const [activePaymentQr, setActivePaymentQr] = useState("");
  const reff = useRef(false);
  const Router = useRouter();
  const [activeTransactionPopup, setActiveTransactionPopup] = useState(false);
  const [activeCashOnDelivery, setActiveCashOnDelivery] = useState(false);
  const [orderId, setOrderId] = useState();
  const [transactionId, setTransactionId] = useState("");
  const [showInputField, setShowInputField] = useState(false);
  const [data, setData] = useState();
  const [isTransactionSaved, setIsTransactionSaved] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("order-tab-1");
  const [postOffices, setPostOffices] = useState([]);
  // const [productRtpDate, setProductRtpDate] = useState("");
  const [comingsoon, setComingsoon] = useState("");
  const [isTotalAmountZero, setIsTotalAmountZero] = useState(0);
  const [activeAddOnNumbers, setActiveAddOnNumbers] = useState(true);
  // otp states starts
  const [otp, setOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState({
    full_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
    billing_address: "",
    city: "",
    district: "",
    state: "",
    allFields: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [session, setSession] = useState("");
  const [timer, setTimer] = useState(0);
  const [shouldSendOtp, setShouldSendOtp] = useState(false);
  const [logData, setLogData] = useState("");
  const [isOtpSucess, setIsOtpSucess] = useState(false);
  const ref = useRef();
  const otpRef = useRef();
  // otp states ends
  const [profile, setProfile] = useState({
    first_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
    billing_address: "",
    city: "",
    district: "",
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
    otp: "",
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
  const myDataString = localStorage.getItem("vipcre");
  const [totalSaved, setTotalSaved] = useState(0);
  const [payNowLoading, setPayNowLoading] = useState(false);
  let contactid = "";
  if (myDataString) {
    const myData = JSON.parse(myDataString);
    contactid = myData.user.contact_cf.contactid;
  }

  // calculate saved price os
  useEffect(() => {
    const newTotalSaved = cartItems.reduce((total, item) => {
      if (item.compare_at_price && item.unit_price) {
        const comparePrice = Number(item.compare_at_price);
        const unitPrice = Number(item.unit_price);

        if (!isNaN(comparePrice) && !isNaN(unitPrice)) {
          const savedAmount = comparePrice - unitPrice;
          return total + savedAmount;
        }
      }
      return total;
    }, 0);

    setTotalSaved(newTotalSaved);
  }, [cartItems]);

  // Comingsoon coming soon condition os
  useEffect(() => {
    if (
      cartItems[0]?.comingsoon === "NO" &&
      cartItems[0]?.seller_type === "PREMIUM" &&
      cartItems[0].comingsoon_date
    ) {
      setComingsoon(cartItems[0]?.comingsoon);
    }
  }, [cartItems]);

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
      // setActiveOrderTab("order-tab-3");
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
      Router.push("/signinwithpassword");
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
        setDiscountValue(response.data.data.discount_value);
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

  //wallet amount code os
  // useEffect(() => {
  //   console.log("wBalance ::", wBalance);
  //   console.log("walletInput ::", walletInput);
  // }, [walletInput, wBalance]);

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

  // product total zero condition os
  useEffect(() => {
    setIsTotalAmountZero(newTotal);
  }, [newTotal]);
  // console.log("isTotalAmountZero :::", isTotalAmountZero);

  //user profile code
  useEffect(() => {
    if (user?.token) {
      getProfile(user?.token)?.then((res) => {
        setProfile(res);
        const address = res?.address || {};
        const fullName = `${res?.firstname || ""} ${
          res?.lastname || ""
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
          district: res?.contact_cf?.district || "",
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
            // handleOrderTabs("order-tab-2");
          }
        }
      });
    }
  }, [user, cartItems, addToWishList]);

  //create lead  rendom data for ORDERID
  useEffect(() => {
    if (!orderIds && profile?.contactid) {
      let randomDigits = "";
      for (let i = 0; i < 8; i++) {
        randomDigits += Math.floor(Math.random() * 10);
      }
      setOrderIds(`ORD_${profile?.contactid}_${randomDigits}`);
    }

    // const interval = setInterval(() => {
    //   const timestamp = Math.floor(new Date().getTime() / 1000);
    //   if (profile?.contactid) {
    //     setOrderIds(
    //       `ORD_${profile.contactid.toString()}_${timestamp.toString()}`
    //     );
    //   }
    // }, 1000);
    // return () => clearInterval(interval);
  }, [orderIds, formData, profile?.contactid]);
  // console.log("orderIds ::::::", orderIds);

  // otp useEffect
  useEffect(() => {
    let currMobile = formData.mobile_number;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }

    if (!user?.token) {
      // console.log("if no token is there");
      if (currMobile?.length === 10) {
        // console.log("currMobile?.length === 10");
        handleVerifyNumber();
      } else {
        // console.log("currMobile?.length not === 10");
      }
    } else {
      // console.log("else token is there");
    }
  }, [formData.mobile_number]);

  let testedAmount = parseFloat(formData?.original_amount) - discountValue;

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
    amount: testedAmount,
    billing_address: formData?.billing_address,
    original_amount: formData?.original_amount,
    city: formData?.city,
    district: formData?.district,
    state: formData?.state,
    payment_status: isTotalAmountZero === 0 ? "Payment Received" : "",
    number_for_display: formData?.number_for_display,
    coupon_code: couponCode,
    discount_value: discountValue,
    discount_type: "Amount",
    total_discount: totalDiscount,
    // lead_page: productRtpDate ? "coming soon" : "",
    lead_page: comingsoon ? "coming soon" : "",
    lead_action: isTotalAmountZero === 0 ? "Payment Received" : "",
    wallet_money_used: walletInput > 0 ? walletInput : "",
    contactid: contactid,
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
          // filled_by_customer: "success",
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
            transaction_id: transactionId,
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
              Router.push("/payment-declined?orderId=" + orderId);
            } else {
              NotificationManager.success("Transaction successful");
              localStorage.setItem("vipthankyou", true);
              Router.push(
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
            Router.push("/payment-declined");
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
    const { name } = e.target;
    if (name === "full_name") {
      setError((prevState) => ({
        ...prevState,
        first_name: "",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [name]: "",
        allFields: "",
      }));
    }

    // setError("");
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
    script.onload = async () => {};
    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  // Payment Integration code
  function handleRzpClick(e) {
    // e.preventDefault();
    if (e) {
      e.preventDefault();
    }
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
                lead_action: "Payment Received",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (orderdeclined) {
              localStorage.setItem("vipDeclined", true);
              Router.push("/payment-declined?orderId=" + orderId);
            } else {
              NotificationManager.success("Transaction successful");
              NotificationManager.success("Your Order Placed is  successfully");
              localStorage.setItem("vipthankyou", true);
              Router.push("/thank-you?count=" + cartItems?.length);
              setCartItems([]);
            }
          });
        } else {
          // Response is not successful
          response.json().then((data) => {
            NotificationManager.error(data.message);
            localStorage.setItem("vipDeclined", true);
            Router.push("/payment-declined");
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

  //If Product is already sold, then  remove it from cart
  const isProductnameAvailable = cartItems.every(
    (item) => item.productname !== undefined
  );
  if (!isProductnameAvailable) {
    const itemsToRemove = cartItems.filter(
      (item) => item.productname === undefined
    );
    itemsToRemove.forEach((item) => removeFromCart(item.id));
    return null;
  }

  // Otp code starts
  const handleResendOTP = () => {
    handleVerifyNumber();
  };

  const handleVerifyNumber = async (showTimer) => {
    let currMobile = formData.mobile_number;
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
      // if (currMobile.toString()?.length < 10) {
      //   NotificationManager.error("Mobile number should be 10 digits");
      //   return;
      // }

      let apiEndpoint = "";
      if (currMobile.length === 10 && !user?.token) {
        apiEndpoint = "https://admin.leafymango.com/web/otp/send";
      }

      const response = await axios.post(apiEndpoint, {
        number: parseInt(currMobile),
      });

      if (response.data.status === "success") {
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

  // const handleNext = async (e) => {
  //   let currMobile = formData.mobile_number;
  //   // if (currMobile?.startsWith("+91")) {
  //   //   currMobile = currMobile.slice(3, 13);
  //   // }
  //   // if (currMobile?.startsWith("00")) {
  //   //   currMobile = currMobile.slice(2, 12);
  //   // }
  //   // if (currMobile?.startsWith("0")) {
  //   //   currMobile = currMobile.slice(1, 11);
  //   // }
  //   if (currMobile === "") {
  //     setMobileError("Mobile number is required");
  //   } else if (!/^[0-9]+$/.test(currMobile)) {
  //     // setMobileError("Mobile number should only contain numbers");
  //   } else {
  //     setMobileError("");
  //   }
  //   if (otp === "") {
  //     setPasswordError("otp is required");
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (currMobile !== "" && otp !== "") {
  //     console.log("runnign");
  //     try {
  //       const response = await axios.post(
  //         "https://admin.leafymango.com/web/login",
  //         {
  //           mobile: currMobile.toString(),
  //           otp,
  //           countryValue: "India",
  //           session_id: session,
  //         }
  //       );
  //       setLogData(response.data.status);
  //       if (response?.data?.status === "success") {
  //         console.log("otp status success");
  //         console.log("response?.data?.data :::", response?.data?.data);
  //         setUserDetails(response?.data?.data);
  //         localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
  //         localStorage.setItem("mobileNumber", currMobile);
  //         handleOrderTabs("order-tab-2");
  //         if (redirectTo) {
  //           if (cartCache) {
  //             addToCart(
  //               cartCache,
  //               () => {
  //                 Router.push(redirectTo);
  //                 setRedirectTo(null);
  //               },
  //               response?.data?.data?.token
  //             );
  //           } else {
  //             Router.push(redirectTo);
  //             setRedirectTo(null);
  //           }
  //         }

  //         if (redirectTo) {
  //           console.log("redirectTo", redirectTo);
  //           if (cartCache) {
  //             addToCart(
  //               cartCache,
  //               () => {
  //                 Router.push(redirectTo);
  //                 setRedirectTo(null);
  //               },
  //               response?.data?.data?.token
  //             );
  //           } else {
  //             Router.push(redirectTo);
  //             setRedirectTo(null);
  //           }
  //         }
  //         NotificationManager.success("Login successful");

  //         // Create lead api after login
  //         const consoleData = localStorage.getItem("vipcre");
  //         const parsedData = JSON.parse(consoleData);
  //         // Extracting the token
  //         const token = parsedData.token;
  //         console.log("addToCart ::", addToCart)
  //       } else if (response.data.status === "error") {
  //         console.log("otp status false");

  //         NotificationManager.error(
  //           response?.data?.message || "Incorrect otp or mobile number"
  //         );
  //       }
  //     } catch (error) {
  //       NotificationManager.error(
  //         "Login failed No account registered with this number"
  //       );
  //       console.log("Error:", error.message);
  //     }
  //   }

  //   // except india and without otp login
  //   // if (currMobile !== "" && selectedCountry?.value !== "India") {
  //   // if (currMobile !== "" && otp !== "") {
  //   //   console.log("Login with country except india");
  //   //   try {
  //   //     const response = await axios.post(
  //   //       "https://admin.leafymango.com/web/login",
  //   //       {
  //   //         mobile: currMobile.toString(),
  //   //         countryValue: "India",
  //   //         session_id: session,
  //   //       }
  //   //     );

  //   //     if (response.data.status === "success") {
  //   //       setUserDetails(response?.data?.data);
  //   //       console.log("Login with country except india1");
  //   //       localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
  //   //       localStorage.setItem("mobileNumber", currMobile);
  //   //       handleOrderTabs("order-tab-2");
  //   //       if (redirectTo) {
  //   //         console.log("redirectTo", redirectTo);
  //   //         if (cartCache) {
  //   //           addToCart(
  //   //             cartCache,
  //   //             () => {
  //   //               Router.push(redirectTo);
  //   //               setRedirectTo(null);
  //   //             },
  //   //             response?.data?.data?.token
  //   //           );
  //   //         } else {
  //   //           Router.push(redirectTo);
  //   //           setRedirectTo(null);
  //   //         }
  //   //       }
  //   //       NotificationManager.success("Login successful");

  //   //       // Create lead api after login
  //   //       const consoleData = localStorage.getItem("vipcre");
  //   //       const parsedData = JSON.parse(consoleData);
  //   //       // Extracting the token
  //   //       const token = parsedData.token;
  //   //       // Logging the token
  //   //       // console.log("Token:", token);
  //   //       axios.post(
  //   //         "https://admin.leafymango.com/web/lead/create",
  //   //         {
  //   //           mobile_number: formData.mobile_number,
  //   //           first_name: "Loged-In",
  //   //         },
  //   //         {
  //   //           headers: {
  //   //             "Content-Type": "application/json",
  //   //             Authorization: `Bearer ${token}`,
  //   //           },
  //   //         }
  //   //       );
  //   //     } else if (response.data.status === "error") {
  //   //       NotificationManager.error(
  //   //         response?.data?.message || "Incorrect otp or mobile number"
  //   //       );
  //   //     }
  //   //   } catch (error) {
  //   //     NotificationManager.error(
  //   //       "Login failed No account registered with this number"
  //   //     );
  //   //     console.log("Error:", error.message);
  //   //   }
  //   // }
  // };
  // Otp code ends

  const handleInputOtp = async (e) => {
    // console.log("handleInputOtp ::", e.target.value)
    const enteredOtpValue = e.target.value;
    let currMobile = formData.mobile_number;
    if (/^[0-9]*$/.test(enteredOtpValue)) {
      setOtp(enteredOtpValue);

      // console.log("otp.length::", enteredOtpValue.length);
      // console.log("phone.length::", currMobile.length);
      // console.log("session ::", session);
      if (currMobile.length == 10 && session && enteredOtpValue.length == 6) {
        console.log("verify otp");
        try {
          const response = await axios.post(
            "https://admin.leafymango.com/web/login",
            {
              mobile: currMobile.toString(),
              otp: enteredOtpValue,
              countryValue: "India",
              session_id: session,
            }
          );
          setLogData(response.data.status);
          if (response?.data?.status === "success") {
            console.log("otp status success");
            // console.log("response?.data?.data :::", response?.data?.data);
            setUserDetails(response?.data?.data);
            localStorage.setItem(
              "vipcre",
              JSON.stringify(response?.data?.data)
            );
            localStorage.setItem("mobileNumber", currMobile);
            localStorage.setItem("userToken", response?.data?.data?.token);
            // handleOrderTabs("order-tab-2");
            if (redirectTo) {
              // console.log("if redirectTo", redirectTo)
              // console.log("if cartCache", cartCache)
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
                // console.log("else redirectTo", redirectTo)
                // console.log("else cartCache", cartCache)
                Router.push(redirectTo);
                setRedirectTo(null);
              }
            }
            NotificationManager.success("Login successful");

            // Create lead api after login
            // Extracting the token
            setIsOtpSucess(true);
            setCartCache("");
            // console.log("addToCart ::", addToCart);
          } else if (response.data.status === "error") {
            // console.log("otp status false");

            NotificationManager.error(
              response?.data?.message || "Incorrect otp or mobile number"
            );
          }
        } catch (error) {
          NotificationManager.error(
            "Login failed No account registered with this number"
          );
          console.log("Error:", error.message);
        }
      }
    }
  };

  // console.log("cartCache ::", cartCache);
  // console.log("isOtpSucess ::", isOtpSucess);

  const checkValidations = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.first_name === "") {
      setError((prevState) => ({
        ...prevState,
        first_name: "First name is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        first_name: "",
      }));
    }

    if (formData.mobile_number.length < 10) {
      setError((prevState) => ({
        ...prevState,
        mobile_number: "Mobile number should be at least 10 characters",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        mobile_number: "",
      }));
    }

    if (formData.primary_email === "") {
      setError((prevState) => ({
        ...prevState,
        primary_email: "Email address is required",
      }));
      isValid = false;
    } else if (!emailRegex.test(formData.primary_email)) {
      setError((prevState) => ({
        ...prevState,
        primary_email: "Invalid email address",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        primary_email: "",
      }));
    }

    if (formData.postal_code.length === 0) {
      setError((prevState) => ({
        ...prevState,
        postal_code: "Postal code is required",
      }));
      isValid = false;
    } else if (formData.postal_code.length < 6) {
      setError((prevState) => ({
        ...prevState,
        postal_code: "Postal code should be 6 digits",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        postal_code: "",
      }));
    }

    if (formData.billing_address === "") {
      setError((prevState) => ({
        ...prevState,
        billing_address: "Billing address is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        billing_address: "",
      }));
    }

    if (formData.city === "") {
      setError((prevState) => ({
        ...prevState,
        city: "City is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        city: "",
      }));
    }

    if (formData.district === "") {
      setError((prevState) => ({
        ...prevState,
        district: "District is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        district: "",
      }));
    }

    if (formData.state === "") {
      setError((prevState) => ({
        ...prevState,
        state: "State is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        state: "",
      }));
    }

    if (
      !formData.first_name ||
      !formData.mobile_number ||
      !formData.primary_email ||
      !formData.postal_code ||
      !formData.billing_address ||
      !formData.city ||
      !formData.district ||
      !formData.state
    ) {
      setError((prevState) => ({
        ...prevState,
        allFields: "Complete the fields above",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        allFields: "",
      }));
    }

    return { isValid };
  };

  // handle paynow button
  const handlePayNow = async () => {
    const { isValid } = checkValidations();
    // console.log("handlePayNow isValid ::", isValid);

    const element = document.querySelector(".OrderPlacement-section-os");
    if (!isValid) {
      // Scroll to the element with id "OrderPlacement-section-os"
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    setPayNowLoading(true);
    // profile update api
    const profileResponse = await axios.post(
      "https://admin.leafymango.com/web/profile/update",
      {
        full_name: payload?.first_name + " " + payload?.last_name,
        mobile: payload?.mobile_number,
        email: payload?.primary_email,
        zip_code: payload?.postal_code,
        address: payload?.billing_address,
        city: payload?.city,
        district: payload?.district,
        state: payload?.state,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (profileResponse.data.status === "success") {
      setPayNowLoading(false);
      handleOrderTabs("order-tab-3");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // console.log("profile api success");
      // If the API response is successful, show success message
      NotificationManager.success("Profile updated successfully");
      const leadResponse = await axios.post(
        "https://admin.leafymango.com/web/lead/custom_create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log("leadResponse?.data?.status :::", leadResponse?.data?.status);
    } else {
      // If the API response is not successful, show error message
      NotificationManager.error(
        "Oops! There's been some error, please try again after sometime."
      );
    }
  };

  const headingStyle = {
    color: "#6019EB",
  };

  return (
    <>
      <section className="OrderPlacement-section-os">
        <div className="container-os">
          <div className="OrderPlacement-badge-content-os default-heading-os">
            {/* <h2>VIP NUMBER SHOP</h2>
            <h2>Since 2007</h2> */}
            <MainHeading MainHeading="VIP NUMBER SHOP" style={headingStyle} />
            <MainHeading MainHeading="Since 2007" />
          </div>
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

            {/* <button
            type="button"
            className={
              activeOrderTab === "order-tab-2"
                ? "OrderPlacement-tab-os active"
                : "OrderPlacement-tab-os"
            }
          >
            Order Summary
          </button> */}

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
            onSubmit={() => {}}
            className="OrderPlacement-tab-all-contents-row-os"
          >
            <div
              className={`OrderPlacement-ShippingAddress-content-main-row-os ${
                activeOrderTab === "order-tab-1"
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
                  {error.first_name && (
                    <div className="error-message">{error.first_name}</div>
                  )}
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
                    // disabled={formData.mobile_number !== ""}
                    ref={ref}
                  />
                  {error.mobile_number && (
                    <div className="error-message">{error.mobile_number}</div>
                  )}
                </div>

                <div className="OrderPlacement-input-os">
                  <input
                    type="email"
                    placeholder="Email Id"
                    name="primary_email"
                    value={formData.primary_email}
                    onChange={handleChange}
                  />
                  {error.primary_email && (
                    <div className="error-message">{error.primary_email}</div>
                  )}
                </div>

                {!user?.token && (
                  <div className="OrderPlacement-input-os">
                    <input
                      inputType="text"
                      placeholder="OTP"
                      name="otp"
                      // onChange={(e) => {
                      //   const enteredValue = e.target.value;
                      //   if (/^[0-9]*$/.test(enteredValue)) {
                      //     setOtp(enteredValue);
                      //   }
                      //   handleOtp
                      // }}
                      value={otp}
                      onChange={handleInputOtp}
                      ref={otpRef}
                    />
                    <button
                      type="button"
                      className="resendOtp-btn-os"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </button>
                  </div>
                )}

                {(isOtpSucess || user?.token) && (
                  <div className="OrderPlacement-input-os">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => {
                        // setFormData((prevState) => ({
                        //   ...prevState,
                        //   city: "",
                        //   district: "",
                        //   state: "",
                        //   postal_code: e.target.value,
                        // }));
                        // optimizedFn(e.target.value);
                        // const { name } = e.target;
                        // setError((prevState) => ({
                        //   ...prevState,
                        //   [name]: "",
                        // }));
                        const { name, value } = e.target;
                        const numbersOnly = /^[0-9]{0,6}$/;

                        // Check if the input value matches the regular expression for numbers only
                        if (value === "" || numbersOnly.test(value)) {
                          // Update the form data
                          setFormData((prevState) => ({
                            ...prevState,
                            city: "",
                            district: "",
                            state: "",
                            postal_code: value, // Update only if input is valid
                          }));

                          // Call the optimized function
                          optimizedFn(value);

                          // Clear the error message for postal_code
                          setError((prevState) => ({
                            ...prevState,
                            [name]: "",
                          }));
                        }
                      }}
                    />
                    {error.postal_code && (
                      <div className="error-message">{error.postal_code}</div>
                    )}
                  </div>
                )}
                {(isOtpSucess || user?.token) && (
                  <div className="OrderPlacement-input-os">
                    <input
                      type="text"
                      placeholder="Address"
                      name="billing_address"
                      value={formData.billing_address}
                      onChange={handleChange}
                    />
                    {error.billing_address && (
                      <div className="error-message">
                        {error.billing_address}
                      </div>
                    )}
                  </div>
                )}

                {(isOtpSucess || user?.token) && (
                  <div className="OrderPlacement-input-os">
                    <input
                      type="text"
                      placeholder="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {error.city && (
                      <div className="error-message">{error.city}</div>
                    )}
                  </div>
                )}

                {(isOtpSucess || user?.token) && (
                  <div className="OrderPlacement-input-os">
                    <input
                      type="text"
                      placeholder="District"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                    />
                    {error.district && (
                      <div className="error-message">{error.district}</div>
                    )}
                  </div>
                )}
                {(isOtpSucess || user?.token) && (
                  <div className="OrderPlacement-input-os">
                    <input
                      type="text"
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {error.state && (
                      <div className="error-message">{error.state}</div>
                    )}
                  </div>
                )}
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

              {/* nextButton */}
              {/* <div className="OrderPlacement-next-button-os">
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
                  // const updatedProfile = {
                  //   ...(profile || {}),
                  //   full_name:
                  //     formData?.first_name +
                  //       (formData?.last_name ? " " + formData.last_name : "") ||
                  //     formData?.first_name ||
                  //     profile?.full_name ||
                  //     "",
                  //   mobile: formData?.mobile_number || profile?.mobile || "",
                  //   primary_number:
                  //     formData?.mobile_number || profile?.primary_number || "",
                  //   email: formData?.primary_email || profile?.email || "",
                  //   address: {
                  //     ...(profile?.address || {}),
                  //     city: formData?.city || profile?.address?.city || "",
                  //     address:
                  //       formData?.billing_address ||
                  //       profile?.address?.address ||
                  //       "",
                  //     district: formData.district,
                  //     state: formData?.state || profile?.address?.state || "",
                  //     zip_code:
                  //       formData?.postal_code ||
                  //       profile?.address?.zip_code ||
                  //       "",
                  //   },
                  // };
                  // updateProfile(updatedProfile, user.token)
                  //   .then((response) => {
                  //     // Proceed with the address update API call
                  //     axios
                  //       .post(
                  //         "https://admin.leafymango.com/web/address/update",
                  //         updatedProfile.address,
                  //         {
                  //           headers: {
                  //             "Content-Type": "application/json",
                  //             Authorization: `Bearer ${user?.token}`,
                  //           },
                  //         }
                  //       )
                  //       .then((addressResponse) => {})
                  //       .catch((addressError) => {
                  //         console.error(addressError);
                  //         // Handle any errors during the address update
                  //       });
                  //   })
                  //   .catch((profileError) => {
                  //     console.error(profileError);
                  //     // Handle any errors during the profile update
                  //   });
                  // handleOrderTabs("order-tab-2");
                  // handleNext();
                }}
              >
                Next
              </button>
            </div> */}
            </div>

            <div
              className={`OrderPlacement-orderSummary-content-main-row-os ${
                activeOrderTab === "order-tab-1"
                  ? "OrderPlacement-content-os active"
                  : "OrderPlacement-content-os"
              }`}
            >
              <div className="OrderPlacement-orderSummary-content-row-os">
                {relatedNumbers && (
                  <div
                    onClick={() => setActiveAddOnNumbers(!activeAddOnNumbers)}
                    className="OrderPlacement-orderSummary-content-col-2-os"
                  >
                    <div
                      className={
                        activeAddOnNumbers
                          ? "OrderPlacement-add-on-heading-text-os active"
                          : "OrderPlacement-add-on-heading-text-os"
                      }
                    >
                      Addon VIP Numbers for Family
                      <span></span>
                    </div>
                    {relatedNumbers.length !== 0 ? (
                      <div
                        className={
                          activeAddOnNumbers
                            ? "OrderPlacement-add-on-number-content-row-os active"
                            : "OrderPlacement-add-on-number-content-row-os"
                        }
                      >
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
                                {`₹ ${parseFloat(
                                  items.unit_price
                                ).toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })}`}
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

                <div className="mobile-content-os">
                  {error.allFields && (
                    <div
                      className="error-message pt-4"
                      style={{ textAlign: "right" }}
                    >
                      {error.allFields}
                    </div>
                  )}
                  <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
                    <button
                      type="button"
                      onClick={() => Router.push("/")}
                      className="OrderPlacement-paymentInfo-previous-os"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      className="OrderPlacement-paymentInfo-submit-button-os"
                      // onClick={handlePayNow}
                      onClick={() => {
                        if (isTotalAmountZero > 0) {
                          handlePayNow();
                        } else if (isTotalAmountZero === 0 && !user) {
                          setError((prevState) => ({
                            ...prevState,
                            allFields: "Please fill your details.",
                          }));
                        } else if (isTotalAmountZero === 0) {
                          setError((prevState) => ({
                            ...prevState,
                            allFields:
                              "Cart is empty! Please add a product into cart",
                          }));
                        }
                      }}
                      // disabled={isTotalAmountZero === 0}
                      disabled={payNowLoading}
                    >
                      {isTotalAmountZero > 0 && !payNowLoading
                        ? "Pay now"
                        : isTotalAmountZero === 0 && !payNowLoading
                        ? "Pay now"
                        : "Loading..."}
                    </button>
                  </div>
                </div>

                <div className="OrderPlacement-orderSummary-content-col-1-os">
                  <div className="OrderPlacement-orderSummary-content-summary-col-os">
                    {cartItems.length > 0 ? (
                      Array.isArray(cartItems) &&
                      cartItems.map((res, index) => (
                        <div
                          key={index}
                          className="OrderPlacement-added-number-os"
                        >
                          <span>{res?.productname}</span>
                          <div className="OrderPlacement-price-delete-os">
                            <span>
                              &#8377;{" "}
                              {parseFloat(res?.unit_price).toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                }
                              )}
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
                      ))
                    ) : (
                      <>
                        {Array.isArray(cartCache) ? (
                          cartCache.map((item) => (
                            <div className="OrderPlacement-added-number-os array-os">
                              <div
                                className="OrderPlacement-price-cartcache-number"
                                key={item?.product_id}
                              >
                                {item?.number}
                              </div>
                              <div className="OrderPlacement-price-delete-os">
                                {/* <span>&#8377;{item?.unit_price}</span> */}
                                <span>
                                  &#8377;
                                  {parseFloat(item?.unit_price).toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="OrderPlacement-added-number-os object-os">
                            <div
                              className="OrderPlacement-price-cartcache-number"
                              key={cartCache?.product_id}
                            >
                              {cartCache?.number}
                            </div>
                            <div className="OrderPlacement-price-delete-os">
                              <span>
                                {cartCache?.unit_price ? `₹` : ""}
                                {cartCache?.unit_price}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="coupan-code-col-os">
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
                    </div>

                    {/* <div>
                  <h2>Cart Items</h2>
                  <ul>
                    {cartItems.map((item) => {
                      const savedAmount =
                        parseFloat(item.compare_at_price) -
                        parseFloat(item.unit_price);
                      return (
                        <li key={item.id}>
                          <div>Product Name: {item.productname}</div>
                          <div>Compare at Price: {item.compare_at_price}</div>
                          <div>Unit Price: {item.unit_price}</div>
                          <div>Saved Amount: {savedAmount.toFixed(2)}</div>,
                        </li>
                      );
                    })}
                  </ul>
                  <div>Total Saved Amount: {totalSaved.toFixed(2)}</div>
                </div> */}

                    <div className="OrderPlacement-order-summary-heading-os">
                      Order Summary
                    </div>

                    <div className="OrderPlacement-saved-price-os">
                      <span>You saved</span>
                      <span>
                        &#8377; {parseInt(totalSaved).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="OrderPlacement-product-price-os">
                      <span>Sub Total</span>
                      <span>
                        {/* &#8377; {parseFloat(total).toLocaleString("en-IN")} */}
                        {cartItems.length > 0
                          ? parseFloat(total).toLocaleString("en-IN")
                          : cartCache?.unit_price}
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
                      {/* <span>&#8377; {newTotal.toLocaleString("en-IN")}</span> */}
                      <span>
                        &#8377;
                        {cartItems.length > 0
                          ? newTotal.toLocaleString("en-IN")
                          : cartCache?.unit_price}
                      </span>
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
              </div>

              {/* error message for not filled all inputs */}

              {error.allFields && (
                <div
                  className="error-message pt-4"
                  style={{ textAlign: "right" }}
                >
                  {error.allFields}
                </div>
              )}

              <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
                <button
                  type="button"
                  onClick={() => Router.push("/")}
                  className="OrderPlacement-paymentInfo-previous-os"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="OrderPlacement-paymentInfo-submit-button-os"
                  // onClick={handlePayNow}
                  onClick={() => {
                    if (isTotalAmountZero > 0) {
                      handlePayNow();
                    } else if (isTotalAmountZero === 0 && !user) {
                      setError((prevState) => ({
                        ...prevState,
                        allFields: "Please fill your details.",
                      }));
                    } else if (isTotalAmountZero === 0) {
                      setError((prevState) => ({
                        ...prevState,
                        allFields:
                          "Cart is empty! Please add a product into cart",
                      }));
                    }
                  }}
                  // disabled={isTotalAmountZero === 0}
                  disabled={payNowLoading}
                >
                  {isTotalAmountZero > 0 && !payNowLoading
                    ? "Pay now"
                    : isTotalAmountZero === 0 && !payNowLoading
                    ? "Pay now"
                    : "Loading..."}
                </button>
              </div>
            </div>

            <div
              className={`OrderPlacement-paymentInfo-content-main-row-os payment-radio-buttons-os ${
                activeOrderTab === "order-tab-3"
                  ? "OrderPlacement-content-os active"
                  : "OrderPlacement-content-os"
              }`}
            >
              <div className="OrderPlacement-paymentInfo-content-row-os">
                <div className="OrderPlacement-paymentInfo-method-row-os">
                  <div
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
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
                            Pay via card
                          </span>
                        </div>
                      </span>
                    </label>
                  </div>

                  <div
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
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
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
                        onChange={() => {
                          setActivePayRadio(true);
                          setActiveRadioBtn("radio2-os");
                        }}
                        // onClick={handleRzpClick}
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
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
                        onChange={() => {
                          setActivePayRadio(true);
                          setActiveRadioBtn("radio1-os");
                        }}
                        // onClick={handleRzpClick}
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
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
                        onChange={() => {
                          setActivePayRadio(true);
                          setActiveRadioBtn("radio4-os");
                        }}
                        // onClick={handleRzpClick}
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
                    // disabled={total > 500000}
                    className="OrderPlacement-paymentInfo-method-col-1-os"
                  >
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value=""
                        // disabled={total > 500000}
                        onClick={handleRzpClick}
                        // onChange={() => {
                        //   setActivePayRadio(true);
                        //   setActiveRadioBtn("radio5-os");
                        // }}
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
                        handleOrderTabs("order-tab-1");
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
        {activeRadioBtn === "radio1-os" && (
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
                      setActivePayRadio("");
                      setActiveRadioBtn("");
                    }}
                    className="QR-code-popup-cancel-btn-os"
                  >
                    Cancel
                  </button>
                  <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* payment popup paytm */}
        {activeRadioBtn === "radio2-os" && (
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
                <div className="QR-code-upi-id-os">
                  <span>Total Amount {""}</span>
                  <span>&#8377; {newTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="QR-code-upi-id-os">9026590265@ybl</div>
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
                      setActivePayRadio("");
                      setActiveRadioBtn("");
                    }}
                    className="QR-code-popup-cancel-btn-os"
                  >
                    Cancel
                  </button>
                  <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
                      <span>{`${minutes}:${
                        seconds < 10 ? "0" : ""
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
                {/* <div className="QR-code-upi-id-os">7528986020@ybl</div> */}
                <div className="QR-code-upi-id-os">7998991996@ybl</div>
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
                      setActivePayRadio("");
                      setActiveRadioBtn("");
                    }}
                    className="QR-code-popup-cancel-btn-os"
                  >
                    Cancel
                  </button>
                  <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* payment popup upi */}
        {activeRadioBtn === "radio4-os" && (
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
                      setActivePayRadio("");
                      setActiveRadioBtn("");
                    }}
                    className="QR-code-popup-cancel-btn-os"
                  >
                    Cancel
                  </button>
                  <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* payment popup gpay */}
        {activeRadioBtn === "radio5-os" && (
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
                  <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
                  {/* <div className="QR-code-popup-clickHere-text-os">
                    <span
                      onClick={() => {
                        setActiveRadioBtn("");
                        handleRzpClick();
                      }}
                    >
                      Click here,
                    </span>
                    &nbsp; if transaction limits are posing a problem for you.
                  </div> */}
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
                  <p>
                    You selected cash on delivery (COD) as a payment option.
                  </p>
                  <p>
                    Please make sure to have the exact amount of cash ready when
                    our delivery agent arrives.
                  </p>
                  <p>
                    Thank you for choosing our service, and we hope you enjoy
                    your purchase!
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

      {/* Page other components */}
      <DeliveryProcess />
      <AwardWinner />
      <OrderPlacementOurCustomers />

      {activeOrderTab === "order-tab-1" && (
        <div className="mobile-content-os">
          <div className="container-os">
            {error.allFields && (
              <div
                className="error-message pt-4"
                style={{ textAlign: "right" }}
              >
                {error.allFields}
              </div>
            )}
            <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
              <button
                type="button"
                onClick={() => Router.push("/")}
                className="OrderPlacement-paymentInfo-previous-os"
              >
                Back
              </button>

              <button
                type="button"
                className="OrderPlacement-paymentInfo-submit-button-os"
                // onClick={handlePayNow}
                onClick={() => {
                  if (isTotalAmountZero > 0) {
                    handlePayNow();
                  } else if (isTotalAmountZero === 0 && !user) {
                    setError((prevState) => ({
                      ...prevState,
                      allFields: "Please fill your details.",
                    }));
                  } else if (isTotalAmountZero === 0) {
                    setError((prevState) => ({
                      ...prevState,
                      allFields:
                        "Cart is empty! Please add a product into cart",
                    }));
                  }
                }}
                // disabled={isTotalAmountZero === 0}
                disabled={payNowLoading}
              >
                {isTotalAmountZero > 0 && !payNowLoading
                  ? "Pay now"
                  : isTotalAmountZero === 0 && !payNowLoading
                  ? "Pay now"
                  : "Loading..."}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPlacementTabs;
