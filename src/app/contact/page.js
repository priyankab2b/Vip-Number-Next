"use client"
import React from "react";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import ContactMap from "./ContactMap/ContactMap";
import ContactForm from "./ContactForm/ContactForm";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
// import { useLocation } from "react-router-dom";
// import { capitalizeFirstLetter } from "../../../utils/comman";
// import { Helmet } from "react-helmet";

const ContactUs = () => {

//   const location = useLocation()
//   let meteTitle = capitalizeFirstLetter(location?.pathname?.split("/")[1]) + ` : Buy Fancy & VIP Mobile Numbers Online`;
//   let description = `Discover an exclusive range of VIP mobile numbers and fancy mobile numbers at VIP Number Shop. Select your choice mobile number and stand out from the crowd!`;


  return (
    <div className="ContactUs-page-os">
      {/* <Helmet>
        <title>{meteTitle}</title>
        <meta name="description" content={description} />
      </Helmet> */}
      <Header />
      <MobileHeader />
      <ContactMap />
      <ContactForm />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default ContactUs;
