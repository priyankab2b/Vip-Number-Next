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
import { NetworkViFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img28.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img28.jpg";

const NetworkVi = ({ Seo }) => {
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
        heading="Buy VI Fancy Number"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="VI Logo"
        title1="Your VI experience just got a VIP upgrade. Grab your exclusive VI Fancy number now"
        para1="Purchase VI VIP Numbers featuring unique and memorable combinations, available for both Prepaid and Postpaid plans, all at the best prices."
        para2="Order now and enjoy free delivery."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying an"
        headingPart2="VI Choice Number"
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
        heading="Experience the Exclusive Offers and Rewards with Your VI Fancy Number Purchase"
        subHeading="Our special benefits and rewards for buying VI fancy numbers include discounts for future acquisitions and exclusive access to limited edition numbers."
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
        heading="Purchase Any VI Choice Number Online Across India"
        text1="Select your desired Idea - Vodafone VIP number with the highest discounts available, exclusively from VIP Fancy Numbers. We provide 100% authentic VIP mobile number services all over India."
        text2=""
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers VI"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Rajesh Kumar"
        text11="I just got my VI fancy number, and I'm thrilled with my choice! The process was seamless, and the discounts were fantastic."
        text12="Thanks to VIP Number Shop for making it so easy to own a unique VI number."
        heading2="Sneha Gupta"
        text21="Got a cool VI fancy number through VIP Fancy Numbers. The variety of numbers to choose from was impressive, and the service was prompt."
        text22="Looking forward to more exclusive offers in the future!"
        heading3="Amit Singh"
        text31="I can't believe how hassle-free it was to buy my VI VIP Number. The discounts on future purchases are a bonus!"
        text32="VIP Number Shop truly delivers on their promise of quality and authenticity."
        heading4="Preeti Sharma"
        text41="I highly recommend VIP Number Shop for anyone looking to get a VI fancy number. The range of options is vast, the prices are competitive, and their customer support is top-notch."
        text42="A satisfied customer!"
        heading5="Manish Patel"
        text51="Purchasing my VI fancy number from VIP Number Shop was a great decision. The selection was extensive, the process straightforward, and the customer service excellent."
        text52="Very happy with my unique number!"
      />
      <CityFaqs cityPunjabFaqs={NetworkViFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default NetworkVi;
