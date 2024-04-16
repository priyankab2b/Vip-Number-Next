"use client";
import React from "react";
// import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import SuggestionBanner from "../suggestion-for-you/SuggestionBanner/SuggestionBanner";
import Search from "../Shared/Search/Search";
import FamilyPack from "../home/FamilyPack/FamilyPack";
import FAQs from "../Shared/FAQs/FAQs";
import PurpleBgColor from "../Shared/PurpleBgColor/PurpleBgColor";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";

// Images
import RegisterImg1 from "../Assets/assurance-register-img.svg";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";

const FamilyNumbers = () => {
  return (
    <div className="FamilyNumbers-page-os">
      <Header />
      <MobileHeader />
      <SuggestionBanner
        headingText="Family & Business VIP Numbers"
        subHeading="You can Buy VIP numbers for 2 to 9 family or business members"
        buttonTitle="Family Number"
        buttonLink="/#"
      />
      <div className="defaultPage-search-section-os">
        <Search />
      </div>
      <FamilyPack />
      <FAQs />
      <OurCustomers />
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

export default FamilyNumbers;
