"use client";
import React, { useState, createContext, useContext } from "react";
import "./Home.css";
import Banner from "./Banner/Banner";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import Header from "../components/Header/Header";
import MobileFooter from "../components/MobileFooter/MobileFooter";
import Footer from "../components/Footer/Footer";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import Search from "../components/Search/Search";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Recommendations from "./Recommendations/Recommendations";
import Award from "../components/Award/Award";
import VipNumberShopSlider from "./VipNumberShopSlider/VipNumberShopSlider";
import VIPNumberSlider from "./VIPNumberSlider/VIPNumberSlider";
import Benefits from "./Benefits/Benefits";
import VipNumberShopSliderImages1 from "./VipNumberShopSliderImages1/VipNumberShopSliderImages1";
import FeaturedNumber from "./FeaturedNumber/FeaturedNumber";
import RegisterVipNumber from "./RegisterVipNumber/RegisterVipNumber";
import Categories from "./Categories/Categories";
import FamilyPack from "./FamilyPack/FamilyPack";
import CityHowGetVipNumber from "../Cities/CityPunjab/CityHowGetVipNumber/CityHowGetVipNumber";
import FAQs from "../components/FAQs/FAQs";
import OurCustomers from "../components/OurCustomers/OurCustomers";
import VideoTestimonial from "../components/VideoTestimonial/VideoTestimonial";
import PurpleBgColor from "../components/PurpleBgColor/PurpleBgColor";
import QRVipApp from "../components/QRVipApp/QRVipApp";
import Head from "next/head";
// import { useRouter } from "next/router";

// search context
export const SearchContext = createContext(null);

// Image
import RegisterImg from "../assets/vip-number-register-img.svg";
import RegisterImg1 from "../assets/assurance-register-img.svg";
import CityHowGetVipNumberImg1 from "../assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../assets/CityHowGetVipNumber-img-5.png";

const Homepage = () => {
  const { user, setRedirectTo, currentUrl } = useContext(AppStateContext);
  const navigate = useRouter();
  // register popup context
  const { activeSignInWithOtp, setActiveSignInWithOtp } = useContext(
    MyRegisterSignInContext
  );
  const [searchResults] = useState([]);
  const [seracPrice] = useState([]);
  const [besSeach] = useState([]);
  const [digit] = useState([]);
  const [most] = useState([]);
  const [getAdvance] = useState([]);

  const handleShowRegister = () => {
    if (activeSignInWithOtp === "") {
      setActiveSignInWithOtp("active");
    }
  };

  // const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  // console.log("navigate.asPath ::", navigate.asPath)
  // console.log("currentUrl ::", currentUrl)


  return (
    <div className="homepage-os">
      <head>
        <title>My Page Title Homepage</title>
        <meta name="description" content="Home page description" />
        {/* <link rel="canonical" href={currentUrl} /> */}
      </head>
      <Header />
      <MobileHeader />
      <Banner />
      <SearchContext.Provider
        value={{ searchResults, seracPrice, besSeach, digit, most, getAdvance }}
      >
        <div className="defaultPage-search-section-os">
          <Search />
          <Recommendations />
        </div>
        <Award />
        <VipNumberShopSlider />
        <VIPNumberSlider />
        <Benefits />
        {/* <VipNumberApp /> */}
        <VipNumberShopSliderImages1 />
        <FeaturedNumber />
        <RegisterVipNumber
          image={RegisterImg}
          heading="Suggestion for VIP Number"
          subHeading="For better VIP Number suggestions. Register with us."
          buttonText={user?.token ? "Suggestions" : "Register"}
          buttonText1={user?.token ? "Suggestions" : "Register"}
          onClick={() => {
            !user?.token && setRedirectTo("/suggestion-for-you");
            !user?.token && setActiveSignInWithOtp(true);
            user?.token && navigate.push("/suggestion-for-you");
          }}
        />
        <Categories />
        <FamilyPack />
        {/* <PurchaseVipNumber /> */}
        <CityHowGetVipNumber
          headingPart1="Delivery Process for"
          headingPart2="VIP Number"
          headingPart3="?"
          image1={CityHowGetVipNumberImg1}
          image2={CityHowGetVipNumberImg2}
          image3={CityHowGetVipNumberImg3}
          image4={CityHowGetVipNumberImg4}
          image5={CityHowGetVipNumberImg5}
          heading1="Pay"
          heading2="Get UPC"
          heading3="Do MNP"
          heading4="Activation"
          heading5="Money Back Assurity"
          text1="to place an Order."
          text2="UPC will be delivered through SMS, Whatsapp & Email."
          text3="Start the MNP process at the nearest retail shop to get the SIM."
          text4="Get your SIM activated in 4-5 days"
          text5="if you face any problem with the UPC."
          boldText="100% Money Back"
          smallText="(18-25 days for Assam and J&K)."
        />
        <FAQs />
        <OurCustomers />
        <VideoTestimonial />
        <PurpleBgColor />
        <RegisterVipNumber
          image={RegisterImg1}
          heading="Assurance of a refund"
          subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
          buttonText={user?.token ? "Suggestions" : "Register"}
          buttonText1={user?.token ? "Suggestions" : "Register"}
          onClick={() => {
            !user?.token && setRedirectTo("/suggestion-for-you");
            !user?.token && setActiveSignInWithOtp(true);
            user?.token && navigate.push("/suggestion-for-you");
          }}
        />
        <QRVipApp />
      </SearchContext.Provider>
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default Homepage;
