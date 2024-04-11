"use client"
import React from "react";
import MainHeading from "../Shared/MainHeading/MainHeading";
import Crown from "../Assets/crown-icon1.svg";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import PrivacyPolicyAccordion from "./PrivacyPolicyAccordion/PrivacyPolicyAccordion";
import "./PrivacyPolicy.css";
import PurpleBgColor from "../Shared/PurpleBgColor/PurpleBgColor";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="PrivacyPolicy-page-os">
      <Header />
      <MobileHeader />
      <div className="container-os">
        <div className="PrivacyPolicy-heading">
          <MainHeading MainHeading="PRIVACY POLICY" rightImage={Crown} />
          <p>
            It is VIP NUMBER SHOP's policy to respect your privacy regarding any
            information we may collect while operating our website. This Privacy
            Policy applies to{""}
            <Link href="https://vipnumbershop.com" target="_blank">
              https://vipnumbershop.com
            </Link>
            {""}
            (hereinafter, "us", "we", or "
            <Link href="https://vipnumbershop.com" target="_blank">
              https://vipnumbershop.com
            </Link>
            "). We respect your privacy and are committed to protecting
            personally identifiable information you may provide us through the
            Website. We have adopted this privacy policy ("Privacy Policy") to
            explain what information may be collected on our Website, how we use
            this information, and under what circumstances we may disclose the
            information to third parties. This Privacy Policy applies only to
            information we collect through the Website and does not apply to our
            collection of information from other sources. This Privacy Policy,
            together with the Terms and conditions posted on our Website, set
            forth the general rules and policies governing your use of our
            Website. Depending on your activities when visiting our Website, you
            may be required to agree to additional terms and conditions.
          </p>
        </div>
        <PrivacyPolicyAccordion />
      </div>
      <PurpleBgColor />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;