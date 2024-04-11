"use client";
import React from "react";
import "../vip-mobile-number-in-punjab/CityPunjab.css";
import { useRouter } from "next/navigation";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import CityBanner from "../Shared/City/CityBanner/CityBanner";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import PunjabLeading from "../Shared/City/PunjabLeading/PunjabLeading";
import CityFavouriteNumber from "../Shared/City/CityFavouriteNumber/CityFavouriteNumber";
import CityDifferentFromOthers from "../Shared/City/CityDifferentFromOthers/CityDifferentFromOthers";
import CityExclusiveCollection from "../Shared/City/CityExclusiveCollection/CityExclusiveCollection";
import CityTestimonials from "../Shared/City/CityTestimonials/CityTestimonials";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import CityFaqs from "../Shared/City/CityFaqs/CityFaqs";
import { CityPunjabTestimonials } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { NetworkJioFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img26.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img26.jpg";

const NetworkJio = ({ Seo }) => {
  const Router = useRouter();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Buy Jio VIP Number"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Jio Logo"
        title1="India's Most Reputable Platform for Authentic Jio Fancy Numbers"
        para1="Discover Jio VIP Numbers available in unique, memorable combinations for both Prepaid and Postpaid plans, all at the most competitive prices."
        para2="Place your order now and enjoy complimentary delivery."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying a"
        headingPart2="Jio Choice Number"
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
      <RegisterVipNumber
        image={RegisterImg}
        heading="Experience Exclusive Benefits with Your Jio VIP Mobile Number Purchase"
        subHeading="With Jio fancy numbers, you can enjoy discounts on future purchases as well as exclusive access to limited edition numbers."
        buttonText={"Buy Your VIP Number"}
        buttonText1={"Buy Your VIP Number"}
        onClick={() => {
          Router.push("/search-your-number");
        }}
      />
      <CityTestimonials
        heading="Celebrity Testimonials"
        CityPunjabTestimonials={CityPunjabTestimonials}
      />
      <CityExclusiveCollection
        heading="Buy Your Desired Jio VIP Number Online Anywhere in India"
        text1="Get your ideal Jio choice number with unbeatable discounts exclusively from VIP Number Shop, a trusted provider of 100% genuine VIP mobile numbers across India."
        text2=""
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Jio"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Alok Gupta"
        text11="VIP Number Shop is fantastic! I bought a unique Jio VIP number, and their service was top-notch. Smooth process, and I got exclusive deals."
        text12="Highly recommend it!"
        heading2="Nisha Mehra"
        text21="VIP Number Shop exceeded my expectations. I got a fantastic Jio VIP number at a great price."
        text22="Quick delivery and helpful customer service. Very satisfied!"
        heading3="Vikram Singhania"
        text31="I'm impressed with VIP Number Shop's selection of Jio fancy numbers. I found the perfect one, and they provided excellent discounts and service."
        text32="Highly recommended!"
        heading4="Swati Joshi"
        text41="VIP Number Shop made getting my Jio VIP number hassle-free. Their extensive collection, attractive offers, and responsive support team make them the go-to choice."
        text42="Very pleased with my purchase!"
        heading5="Rohan Desai"
        text51="I recently purchased a Jio VIP number from VIP Number Shop and the experience was superb. The variety of numbers was impressive and I easily found one that resonated with me."
        text52="The transaction was smooth, and the customer service was outstanding."
      />
      <CityFaqs cityPunjabFaqs={NetworkJioFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default NetworkJio;
