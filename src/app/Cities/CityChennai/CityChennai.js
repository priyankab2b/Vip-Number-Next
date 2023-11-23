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
import { CityChennaiFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img8.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img8.png";

const CityChennai = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/fancy-mobile-numbers-in-chennai" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Fancy mobile numbers in Chennai"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Bharatanatyam"
        title1="Get VIP Mobile Numbers in Chennai"
        para1="Our online store is the one-stop destination for fancy mobile numbers in Chennai! We understand the desire to have a unique and exclusive mobile number that reflects your personality and makes a lasting impression."
        para2="Our collection of VIP mobile numbers is specifically tailored for customers in Chennai who seek a touch of luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Register with Us to Acquire Fancy Mobile Numbers in Chennai"
        title2="Before securing your VIP or fancy mobile numbers in Chennai, registration is essential. Our experts can guide you towards the optimal VIP mobile number, considering factors like your business type, religious affiliations, and social standing."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Chennai"
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
        heading="Don't pass up the chance for exclusive deals"
        subHeading="You can get exclusive rewards and offers when you purchase a VIP mobile number in Chennai. Stand out from the crowd with a VIP mobile number."
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
        heading="Feel Free to Take Suggestion from Us"
        text1="Please feel free to reach out to us with any queries or feedback. We are dedicated to ensuring a smooth and enjoyable experience for our customers in Chennai. We look forward to serving you and helping you find the perfect fancy mobile numbers in Chennai which match your unique style and preference."
        text2="Fancy Mobile Numbers Chennai brings you a wide range of exclusive and memorable mobile numbers to enhance your personal and business branding. Our collection of fancy mobile numbers in Chennai is carefully curated to offer you a variety of options to choose from."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Chennai"
      />
      <CityDifferentFromOthers
        heading="Why choose our fancy mobile number service?"
        heading1="Wide Range of Premium Numbers"
        text11="Discover a wide range of premium mobile numbers that cater to various preferences. Whether you desire a specific pattern, repeated digits, or a memorable combination, our collection of fancy mobile numbers in Chennai has something to suit everyone."
        text12="We consistently update our inventory to ensure you have access to the latest and most sought-after numbers in Chennai."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our exclusive VIP mobile numbers in Chennai. Each number is carefully chosen to provide a sense of exclusivity to our esteemed customers in Chennai."
        text22="With a VIP mobile number, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We prioritize your privacy and security in today's digital world. Our fancy mobile numbers in Chennai come with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about compromising your privacy."
        heading4="Easy to Remember"
        text41="Our fancy mobile numbers in Chennai are designed to be effortlessly memorable, making it easier for you to share your number with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can significantly impact your ability to establish connections and build relationships."
        heading5="Effortless, Secure Process"
        text51="Our service is built on three pillars: security, transparency, and client satisfaction. To make getting your VIP mobile number quick and secure, we have streamlined the process."
        text52="Our experienced staff will assist you at every turn and make sure that all legal requirements are fulfilled with the utmost care."
      />
      <CityFaqs cityPunjabFaqs={CityChennaiFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityChennai;
