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
import { CityDelhiFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img14.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img14.png";

const CityDelhi = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-delhi" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP Mobile Number in Delhi"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Qutub Minar"
        title1="Enhance your status with a VIP mobile number"
        para1="Boost your standing and make an impact with a VIP mobile number in Delhi. Step into an exclusive world of distinction and reputation, communicating through a number that mirrors your individuality."
        para2="Differentiate yourself from the masses and create a lasting impression with a distinctive VIP mobile number. Improve your personal and professional persona, experiencing a newfound level of connectivity and prominence."
      />
      <CityFavouriteNumber
        title1="Register with us Today and Get Your Exclusive VIP Mobile Number in Delhi"
        title2="Sign up with us today to secure your premium VIP mobile number in Delhi. Make a lasting impression with a distinctive and unforgettable number that mirrors your individuality and personal brand."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Delhi"
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
        heading="Unlock exclusive offers and rewards with every purchase"
        subHeading="Experience the benefits of being a valued customer and enjoy special benefits with every transaction."
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
        heading="Reach out to us for any queries"
        text1="Don’t hesitate to contact us if you have any queries or doubts regarding VIP mobile numbers. We are here to provide you with the necessary information and guidance to help you make an informed decision."
        text2="Your satisfaction is our priority, and we are committed to addressing any concerns you may have."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Delhi"
      />
      <CityDifferentFromOthers
        heading="Why Should You Choose Us for a VIP Mobile Number in Delhi?"
        heading1="Wide Variety"
        text11="Our extensive assortment of VIP mobile numbers in Delhi ensures you have numerous options to choose from. Whether you prefer numbers with repetitive digits, particular sequences, or unique patterns, we have an assorted selection catering to various preferences and tastes."
        text12="With such wide-ranging choices, you can find a VIP mobile number that aligns with your style and personality."
        heading2="Distinct Numbers"
        text21="Differentiate yourself from the crowd with our distinct VIP mobile numbers. We have a range of unique and rare numbers not easily available elsewhere."
        text22="Owning one of these distinctive numbers allows you to leave a memorable impression and showcase your individuality and standing in Delhi. Our collection comprises highly desired numbers, adding a touch of luxury to your mobile communication."
        heading3="Options for Personalization"
        text31="We believe in delivering a custom experience to our clients. Hence, we offer personalization options for VIP mobile numbers in Delhi. You can choose specific patterns, sequences, or digits of significance to you."
        text32="This level of personalization enables you to craft a VIP mobile number that truly reflects your identity and preferences."
        heading4="Reasonable Pricing"
        text41="Our pricing is designed to offer excellent value for your investment. We appreciate the importance of affordability without compromising on the quality or exclusivity of the VIP mobile numbers."
        text42="With reasonable pricing, you can indulge in the luxury of owning a VIP mobile number in Delhi without overstepping your budget."
        heading5="Committed Customer Service"
        text51="We prioritize customer satisfaction and provide committed customer service throughout the process. Our team of professionals is available to assist you with any queries or concerns you may have."
        text52="We strive to ensure a smooth and seamless experience, addressing your needs promptly and professionally. Your satisfaction is our utmost priority."
      />
      <CityFaqs cityPunjabFaqs={CityDelhiFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityDelhi;
