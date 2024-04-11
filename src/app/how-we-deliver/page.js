"use client";
import React from "react";

// Images
import mainImage from "../Assets/image-with-text-img.svg";
import mainImage1 from "../Assets/image-with-text-img1.svg";
import mainImage2 from "../Assets/image-with-text-img2.svg";
import mainImage3 from "../Assets/image-with-text-img3.svg";
import mainImage4 from "../Assets/image-with-text-img4.svg";
import lineImg from "../Assets/image-with-text-separate-line-img.svg";
import lineImg1 from "../Assets/image-with-text-separate-line-img1.svg";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import HowWeDeliverBanner from "./HowWeDeliverBanner/HowWeDeliverBanner";
import HowWeDeliverCard from "./HowWeDeliverCard/HowWeDeliverCard";
import ImageWithText from "./ImageWithText/ImageWithText";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";

const HowWeDeliver = () => {
  const row_style = {
    flexDirection: "row-reverse",
  };
  return (
    <div className="HowWeDeliver-page-os">
      <Header />
      <MobileHeader />
      <HowWeDeliverBanner
        headingText="How we deliver"
        buttonLink="/contact"
        buttonTitle="Contact Us"
      />
      <HowWeDeliverCard />
      <ImageWithText
        lineImg={lineImg}
        mainImage={mainImage}
        heading="Select Your Favourite VIP Number At Our Store"
        subHeading="First, you need to visit our store, which is www.vipnumbershop.com . Then, select your Favourite VIP number that you want to order/buy. We have an eye-catching collection of VIP numbers on our website to help you choose the best for your purposes."
      />

      <ImageWithText
        lineImg={lineImg1}
        mainImage={mainImage1}
        heading="Pay The Amount With Zero Risk And Zero Hassle"
        subHeading="Once you select your favourite VIP number, proceed with the payment and pay following the available options. Our payment system is 100%  .There’s no risk and no hassle. Considering the comfort of our customers, we also accept COD and UPI payments."
        row_style={row_style}
      />

      <ImageWithText
        lineImg={lineImg}
        mainImage={mainImage2}
        heading="Wait For UPC"
        subHeading="Once the amount is paid, and the order is successfully placed, UPC (Unique Porting Code) will be provided from our end within the 24 hours of ordering time by Sms or Email (or on both)."
      />

      <ImageWithText
        lineImg={lineImg1}
        mainImage={mainImage3}
        heading="Visit Any Nearest Retailer Shop For Activation"
        subHeading="Right after you receive the UPC, you can visit any nearest operator retailer store or shop for MNP (Mobile Number Portability) and activation of your VIP Number in your desired network/operator. The retailer may charge you up to Rs. 50 for the MNP services & will provide you sim."
        row_style={row_style}
      />

      <ImageWithText
        lineImg={""}
        mainImage={mainImage4}
        heading="Your VIP Number Will Get Activated Within 2 to 4 days."
        subHeading="That’s all. Now you might have to wait for about 2 to 4 days for activation, and then you are all set to go with the activated VIP number provided from VNS.Don’t you find the whole process hassle-free and comfortable? Place your VIP number order today at our VNS store and experience it yourself!!"
      />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default HowWeDeliver;
