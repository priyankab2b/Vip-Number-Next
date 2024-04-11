import React from "react";
import "../CityPunjab/CityPunjab/CityPunjab.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import MobileHeader from "../../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../../Shared/MobileFooter/MobileFooter";
import Footer from "../../Shared/Footer/Footer";
import CityBanner from "../CityPunjab/CityBanner/CityBanner";
import QRVipApp from "../../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../../Home/RegisterVipNumber/RegisterVipNumber";
import PunjabLeading from "../CityPunjab/PunjabLeading/PunjabLeading";
import CityFavouriteNumber from "../CityPunjab/CityFavouriteNumber/CityFavouriteNumber";
import CityDifferentFromOthers from "../CityPunjab/CityDifferentFromOthers/CityDifferentFromOthers";
import CityExclusiveCollection from "../CityPunjab/CityExclusiveCollection/CityExclusiveCollection";
import CityTestimonials from "../CityPunjab/CityTestimonials/CityTestimonials";
import CityHowGetVipNumber from "../CityPunjab/CityHowGetVipNumber/CityHowGetVipNumber";
import CityFaqs from "../CityPunjab/CityFaqs/CityFaqs";
import { CityPunjabTestimonials } from "../CityFaqsArray/CityFaqsArray";
import { CityHimachalPradeshFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img10.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img10.png";

const CityHimachalPradesh = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-himachal-pradesh" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Vip Mobile Number in Himachal Pradesh"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Himachali man"
        title1="VIP mobile number of different operators are available in Himachal Pradesh"
        para1="Discover the allure of exclusive VIP mobile numbers in Himachal Pradesh. Elevate your style and make a statement with personalized numbers from top operators."
        para2="Whether it's Airtel, Vodafone, Jio, or others, indulge in the luxury of a unique mobile number that reflects your personality. Stand out from the crowd and embrace the prestige of a VIP mobile number in Himachal Pradesh."
      />
      <CityFavouriteNumber
        title1="Register Now and Receive Your VIP Mobile Number in Himachal Pradesh"
        title2="Register with us today to reserve your exclusive fancy mobile number in Himachal Pradesh. Make a statement with a one-of-a-kind and memorable number that reflects your personality and personal branding."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Tamil Nadu"
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
        heading="Benefit From Our Exclusive Offers And Rewarding Incentives Today!"
        subHeading="With the purchase of a VIP mobile number in Himachal Pradesh, unlock a realm of rewards and benefits including discounts, exclusive access to limited edition numbers, and more."
        buttonText={"Buy Your VIP Number"}
        buttonText1={"Buy Your VIP Number"}
        onClick={() => {
          navigate("/search-your-number");
        }}
      />
      <CityTestimonials
        heading="Celebrity Testimonials"
        CityPunjabTestimonials={CityPunjabTestimonials}
      />
      <CityExclusiveCollection
        heading="Feel Free to Ask Us any Query"
        text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Tamilnadu"
        text2="Thank you for choosing our online store for VIP mobile numbers in Tamilnadu. We look forward to serving you and helping you find the perfect VIP mobile number that matches your unique style and preference."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Himachal Pradesh"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Number in Himachal Pradesh?"
        heading1="Wide Selection"
        text11="Explore our extensive range of VIP mobile numbers in Himachal Pradesh, encompassing various operators, allowing you to find the perfect number that aligns with your preferences, be it Airtel, Vodafone, Jio, or others."
        heading2="Exclusive Numbers"
        text21="Experience the privilege of owning a truly exceptional VIP number that sets you apart from the rest. Our carefully curated collection features exclusive numbers that exude elegance and sophistication, allowing you to make a lasting impression."
        text22="Embrace the opportunity to showcase your individuality and style with a rare VIP number that speaks volumes about your distinctive persona."
        heading3="Seamless Process"
        text31="With our user-friendly interface and expert guidance, securing your desired VIP mobile number in Himachal Pradesh is a breeze. From browsing our extensive inventory to completing the necessary paperwork, our streamlined process ensures a stress-free journey."
        text32="Sit back and relax as we handle the details, providing you with a seamless and efficient experience that saves you valuable time and effort."
        heading4="Competitive Pricing"
        text41="Attracting affordability and luxury, our competitively priced VIP mobile numbers offer unbeatable value for your investment. Experience the joy of owning a personalized number that reflects your unique identity without straining your budget."
        text42="We believe that exclusivity shouldn't come at a premium, allowing you to enjoy the perfect balance of quality and cost-effectiveness when selecting your VIP mobile number."
        heading5="Reliable Service"
        text51="Our team of experts is committed to delivering exceptional customer service, ensuring a smooth and satisfying VIP number acquisition process. Rest assured, we are here to promptly address any inquiries or concerns you may have, providing professional assistance every step of the way."
        text52="Trust in our reliability and dedication as we guide you towards acquiring your dream VIP mobile number in Himachal Pradesh with confidence and peace of mind."
      />
      <CityFaqs cityPunjabFaqs={CityHimachalPradeshFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityHimachalPradesh;
