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
import { CityChhattisgarhFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img23.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img23.jpg";

const CityChhattisgarh = ({ Seo }) => {
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
        heading="VIP Mobile Number in Chhattisgarh"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Lakshman Temple, Chhatarpur"
        title1="Introducing Chhattisgarh's Premier Destination for VIP Mobile Numbers"
        para1="Welcome to the first choice for VIP mobile numbers in Chhattisgarh, where elegance and functionality merge seamlessly. We have emerged as the ultimate destination for individuals seeking fancy mobile numbers that not only stand out but also represent their unique identity, status, and character."
        para2="In today's digital landscape, your mobile number is more than mere digits – it is a reflection of your persona. That's why we are dedicated to offering our clients VIP mobile numbers that are not only distinctive and easy to remember but also convey an aura of exclusivity that sets you apart in a crowded world."
      />
      <CityFavouriteNumber
        title1="Sign up with us to Get a VIP Mobile Number in Chhattisgarh"
        title2="Open the doors to style and exclusivity by registering with us to acquire VIP mobile numbers in Chhattisgarh. Don't miss out on the opportunity to possess a number that mirrors your individuality and distinguishes you from the crowd."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Chhattisgarh"
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
        heading="Exclusive Offers and Rewards Await"
        subHeading="Experience the finest of both realms in Chhattisgarh – buy not just an exclusive VIP number, but also exclusive rewards and savings upon purchasing. Enhance your communication journey and seize unique advantages today."
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
        heading="Explore Our Exquisite Collection of VIP Mobile Numbers in Chhattisgarh"
        text1="As the premier source of VIP mobile numbers in Chhattisgarh, we invite you to discover our exceptional collection and experience the prestige of owning a one-of-a-kind mobile number. Peruse our website or, even better, visit our store to understand why we are the top VIP mobile number provider in the region."
        text2="We guarantee a shopping experience that mirrors the uniqueness of the numbers we present. Step into the VIP lifestyle – make your mark with our VIP mobile numbers in Chhattisgarh today."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Chhattisgarh"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us as Your Preferred VIP Mobile Number Provider?"
        heading1="Unrivaled Collection"
        text11="We take immense pride in our extensive collection of VIP mobile numbers in Chhattisgarh. Whether you desire a number showing a significant date, a sequence of repeating digits, or the sought-after last six digits that match your business landline, our selection likely includes the perfect number for you."
        text12="Our database is consistently updated with new numbers, ensuring a continuous supply of VIP mobile numbers in Chhattisgarh for your choosing."
        heading2="Customized to Your Preferences"
        text21="We believe that your VIP mobile number should echo your individuality. As such, we offer a wide range of customization options. If you have a specific number sequence in mind, we'll strive to secure it for you. If not, our skilled team can suggest options based on your preferences."
        text22="We understand the nuances of number patterns, enabling us to create the most remarkable, unique, and unforgettable mobile numbers."
        heading3="Seamless and Secure Experience"
        text31="Transparency, security, and customer satisfaction are our cornerstones. We've streamlined the process to ensure that acquiring your VIP mobile number in Chhattisgarh is effortless and secure."
        text32="Our knowledgeable staff will guide you through each step, ensuring full compliance with legal requirements."
        heading4="Accessible Luxury"
        text41="Despite the exclusive nature of our VIP mobile numbers in Chhattisgarh, we ensure they are priced competitively. Our pricing strategy caters to the diverse budgetary needs of our extensive clientele."
        text42="We firmly believe that owning a VIP number in Chhattisgarh should be an attainable luxury, not merely a distant aspiration."
        heading5="Customer-Centric Approach"
        text51="We aim to forge enduring relationships with our customers. Our team is always ready to provide assistance, address your inquiries, and offer post-sales service, ensuring a seamless and gratifying experience with us"
        text52="Our high rate of customer loyalty speaks volumes about our commitment and service quality."
      />
      <CityFaqs cityPunjabFaqs={CityChhattisgarhFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityChhattisgarh;
