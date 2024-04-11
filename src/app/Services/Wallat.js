import React, { useState, useContext } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { NotificationManager } from "react-notifications";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { updateProfile } from "../Services/Services";

const createOrderInDB = async (Token, payload) => {
  try {
    const response = await axios.post(
      "https://admin.leafymango.com/web/razorpay/order",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useInitiatePaymentByRazorPay = () => {
  const { user = {} } = useContext(AppStateContext);
  const { cartItems } = useContext(AppStateContext);
  const Razorpay = useRazorpay();
  const [orderId, setOrderId] = useState();
  const navigate = useRouter();

  const initiate = (Token, payload, setWBalance) => {
    createOrderInDB(Token, payload)?.then((res) => {
      const userInfo = res?.data?.data?.user;
      setOrderId(res?.data?.data?.order_id);
      // const updatedProfile = {
      //   wallet_balance: payload?.amount,
      //   orderId
      // };

      // Check if the cart amount is more than 5000/-
      const isCartAmountGreaterThan5000 = payload?.amount > 5000;

      // Set the "upi" method based on the condition
      const method = {
        upi: !isCartAmountGreaterThan5000, // Set "upi" to false if amount > 5000
      };

      const options = {
        key: "rzp_live_mMfqxRhCpzrpog",
        name: "VIP NUMBER SHOP",
        description: "Transaction",
        image: "https://example.com/your_logo",
        order_id: res?.data?.data?.order_id,
        handler: function (response) {
          const paymentId = response.razorpay_payment_id;
          const updatedProfile = {
            wallet_balance: payload?.amount,
            paymentId,
          };
          updateProfile(updatedProfile, user?.token)
            .then((res) => {
              setWBalance(payload?.amount || "1023-Failed");
            })
            .catch((error) => {
              console.error("Error adding balancce:", error);
            });
          fetch(
            "https://upc.vipnumbershop.com/get_contact_data.php?mobile=" +
              user?.user?.mobile,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`, // use the user's token data
              },
              body: JSON.stringify({
                cf_2038: payload?.amount,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              NotificationManager.success("Added successfully!", "", {
                timeOut: 3000,
              });
              localStorage.setItem("vipthankyou", true);
              navigate.push("/thank-you?count=" + cartItems?.length);
            })
            .catch((error) => console.error(error));
        },
        prefill: {
          name: userInfo?.firstname + " " + userInfo?.lastname,
          email: userInfo?.email,
          contact: userInfo?.mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: method,
      };
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        NotificationManager.error(response.error.code);
        NotificationManager.error(response.error.description);
        NotificationManager.error(response.error.source);
        NotificationManager.error(response.error.step);
        NotificationManager.error(response.error.reason);
        NotificationManager.error(response.error.metadata.order_id);
        NotificationManager.error(response.error.metadata.payment_id);
      });
      rzp1.open();
    });
  };

  return { initiate, orderId };
};

export const WithDrawMoney = async (payload, token) => {
  try {
    const response = await axios.post(
      "https://admin.leafymango.com/web/profile/update",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
