"use client"
import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import TermsConditionAccordion from "./TermsConditionAccordion/TermsConditionAccordion";
import "./TermsConditions.css";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import PurpleBgColor from "../Shared/PurpleBgColor/PurpleBgColor";

// Images
import RegisterImg1 from "../Assets/assurance-register-img.svg";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";

const TermsConditions = () => {
  return (
    <div className="TermsConditions-page-os">
      <Header />
      <MobileHeader />
      <section className="TermsConditions-section-os">
        <div className="main-terms-condition-ud">
          <div className="container-os">
            <div className="terms-text-heading-ud">
              <span>
                <h1>Terms & Conditions</h1>
                <img src="/assets/img/vector.png" alt="" />
              </span>
              <p>Terms & Conditions</p>
            </div>
            <TermsConditionAccordion />
          </div>
        </div>
      </section>
      <PurpleBgColor />
      <RegisterVipNumber
        image={RegisterImg1}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText="Login"
        buttonText1="Login"
        buttonUrl="/register"
        buttonUrl1="/register"
      />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default TermsConditions;