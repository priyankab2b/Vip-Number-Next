"use client"
import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import OrderDeclinedBanner from "./OrderDeclinedBanner/OrderDeclinedBanner";
import OrderDeclinedData from "./OrderDeclinedData/OrderDeclinedData";

const OrderDeclined = () => {
  return (
    <div className="OrderDecline-page-os">
      <Header />
      <MobileHeader />
      <OrderDeclinedBanner />
      <OrderDeclinedData />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default OrderDeclined;
