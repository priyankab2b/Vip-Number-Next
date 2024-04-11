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
import { CityHaryanaFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img6.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img6.png";

const CityHaryana = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-haryana" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP Mobile Number in Haryana"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Haryana man"
        title1="One-stop destination for VIP mobile numbers in Haryana!"
        para1="We understand the desire to have a unique and exclusive mobile number that reflects your personality and makes a lasting impression."
        para2="Our collection of VIP mobile numbers is specifically tailored for customers in Haryana who seek a touch of luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Sign up with us and acquire your chosen phone number"
        title2="Register to explore a diverse range of VIP mobile numbers in Haryana. Our expert team can also recommend a number that mirrors your style and status."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Haryana"
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
        heading="Get Exclusive Deals on Fancy Mobile Numbers in Haryana"
        subHeading="Take advantage of exclusive deals on fancy mobile numbers in Haryana and get a unique and memorable number that reflects your personality or business."
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
        heading="Reach out to us Today to Get Your VIP Number"
        text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Haryana. We look forward to serving you and helping you find the perfect VIP mobile number in Haryana which matches your unique style and preference."
        text2="Your satisfaction is our priority. Whether you have questions or suggestions, don't hesitate to connect with us. We're devoted to ensuring your journey to find the perfect VIP mobile number in Haryana is exceptional."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Haryana"
      />
      <CityDifferentFromOthers
        heading="Why Choose Our VIP Mobile Numbers?"
        heading1="Wide Range of Premium Numbers"
        text11="We offer a wide range of premium VIP mobile numbers that cater to various preferences. Whether you're looking for a specific pattern, repeated digits, or a memorable combination, our collection has something for everyone."
        text12="Our inventory is regularly updated to ensure you have access to the latest and most sought-after numbers in Haryana."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our fancy mobile numbers in Haryana. These numbers are carefully selected to provide a sense of exclusivity to our customers in Haryana."
        text22="With a VIP mobile number in Haryana, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We understand the importance of privacy and security in today's digital world. Our VIP mobile number in Haryana comes with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about your privacy being compromised."
        heading4="Easy to Remember"
        text41="Our fancy mobile numbers in Haryana are designed to be easy to remember, allowing you to share your number effortlessly with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can make a significant difference in establishing connections and building relationships."
        heading5="Excellent Customer Service"
        text51="We prioritize customer satisfaction above all else. Our dedicated team is committed to providing excellent customer service and ensuring that your experience with us is smooth and enjoyable."
        text52="We are always available to answer your questions, provide guidance, and assist you throughout the process of selecting and activating your VIP mobile number in Haryana."
      />
      <CityFaqs cityPunjabFaqs={CityHaryanaFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityHaryana;
