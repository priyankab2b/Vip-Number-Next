"use client"
import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import ThankYouData from "./ThankYouData/ThankYouData";

const ThankYou = () => {
  return (
    <div className="OrderSubmit-page-os">
      <Header />
      <MobileHeader />
      <ThankYouData />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default ThankYou;
