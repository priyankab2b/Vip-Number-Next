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
import { CityOdishaFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img18.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img18.png";

const CityOdisha = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/fancy-mobile-number-in-odisha" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Fancy Mobile Number In Odisha"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Odissi Dance"
        title1="A VIP mobile number can help you elevate your position"
        para1="Get a fancy mobile number in Odisha to elevate your profile and make an impression. Enter the exclusive world of distinction and reputation while communicating with a number that reflects your unique personality."
        para2="With a unique VIP mobile number, you can stand out from the crowd and make a positive impression. Enhance both your personal and professional persona to reach a new level of prominence and connectivity."
      />
      <CityFavouriteNumber
        title1="Register with us to secure your VIP mobile number right away"
        title2="Do not let this unique opportunity pass you by! Register right away to reserve your exclusive fancy mobile number in Odisha and benefit from doorstep delivery, giving your communications a standout edge."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Odisha"
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
        subHeading="Enjoy exclusive perks as a valued customer, with special benefits accompanying every transaction. Experience the added advantages that come with choosing a fancy mobile number in Odisha."
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
        text1="For any queries or doubts about VIP mobile numbers, feel free to reach out. We're here to provide information and guidance, ensuring your satisfaction and addressing all concerns."
        text2="For any queries or doubts about VIP mobile numbers, feel free to reach out. We're here to provide information and guidance, ensuring your satisfaction and addressing all concerns."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Odisha"
      />
      <CityDifferentFromOthers
        heading="Why Should You Choose Us for a Fancy Mobile Number in Odisha?"
        heading1="Wide Variety"
        text11="Choose from our extensive range of VIP mobile numbers in Odisha, featuring a wide selection of options with repetitive digits, specific sequences, or unique patterns."
        text12="With such diverse choices, you can find a VIP mobile number that perfectly aligns with your style, personality, and preferences."
        heading2="Distinct Numbers"
        text21="Stand out from the crowd with our exclusive collection of rare and unique VIP mobile numbers. These numbers are carefully curated to ensure their rarity and desirability."
        text22="Owning one of these distinct numbers allows you to leave a memorable impression and showcases your individuality and standing in Odisha's mobile communication landscape."
        heading3="Options for Personalization"
        text31="At our institute, we believe in delivering a customized experience to our clients. Along with our extensive selection of VIP mobile numbers, we offer personalized options that allow you to choose specific patterns, sequences, or digits of personal significance."
        text32="This level of personalization empowers you to craft a VIP mobile number that truly reflects your unique identity, style, and preferences."
        heading4="Reasonable Pricing"
        text41="We understand the importance of affordability without compromising on the quality or exclusivity of the VIP mobile numbers."
        text42="That's why we have designed our pricing to offer excellent value for your investment. With our reasonable pricing, you can indulge in the luxury of owning a VIP mobile number in Odisha without straining your budget."
        heading5="Committed Customer Service"
        text51="Your satisfaction is our utmost priority. Our dedicated team of professionals is committed to providing exceptional customer service throughout the process."
        text52="We are here to assist you with any queries or concerns you may have, ensuring a smooth and seamless experience. From the moment you choose your fancy mobile number in Odisha until its delivery, we strive to address your needs promptly and professionally, ensuring your complete satisfaction with our service."
      />
      <CityFaqs cityPunjabFaqs={CityOdishaFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityOdisha;
