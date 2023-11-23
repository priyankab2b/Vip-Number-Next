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
import { CitySuratFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img13.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img13.png";

const CitySurat = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-surat" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP Mobile Number in Surat"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Sneh Rashmi Botanical Garden"
        title1="VIP mobile numbers help in Growing your social status"
        para1="Unlock a new level of social status with VIP mobile numbers. Make a lasting impression and stand out from the crowd with a unique and prestigious mobile number."
        para2="Whether for personal or professional use, owning a VIP mobile number in Surat adds an air of exclusivity and sophistication, elevating your social status and leaving a remarkable impact on those around you."
      />
      <CityFavouriteNumber
        title1="Register Now to Have Your Selected VIP Mobile Delivered to Your Door"
        title2="Don't pass up this fantastic opportunity! Register today to reserve your VIP mobile number in Surat and have it delivered to you."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Surat"
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
        heading="Many Offers and Rewards Awaits Your First Order"
        subHeading="Step into a realm of exclusive deals and enticing rewards with each purchase. Relish the privileges of our esteemed customers and savour special benefits with every transaction."
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
        heading="Talk to One of Our Expert for help and support"
        text1="Talk to one of our experts today and discover the perfect fancy mobile number that matches your preferences and requirements in Surat."
        text2="Our knowledgeable team is ready to provide personalized assistance, answer your questions, and guide you towards making the right choice. Experience exceptional customer service and find your ideal fancy mobile number with confidence."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Surat"
      />
      <CityDifferentFromOthers
        heading="Why choose our fancy mobile number service?"
        heading1="Extensive Collection"
        text11="We offer a vast collection of fancy mobile numbers in Surat, providing you with a wide range of options to choose from."
        text12="Whether you prefer numbers with repeated digits, specific sequences, or unique patterns, our collection caters to various preferences and tastes."
        heading2="Exclusive Numbers"
        text21="Our fancy mobile number service includes exclusive numbers that are rare and distinctive, ensuring you stand out from the crowd."
        text22="Owning one of these VIP mobile number in Surat allows you to make a memorable impression and showcase your individuality and style in Surat."
        heading3="Customization Options"
        text31="We understand the importance of personalization. That's why we offer customization options for fancy mobile numbers in Surat."
        text32="You can select specific patterns, sequences, or digits that hold significance to you, creating a number that reflects your identity and preferences."
        heading4="Competitive Pricing"
        text41="Our fancy mobile number service is competitively priced, offering excellent value for your investment."
        text42="We believe in providing affordability without compromising on the quality or exclusivity of the numbers, making it accessible for customers with different budget ranges."
        heading5="Reliable Service"
        text51="We are committed to delivering reliable and professional service to our customers in Surat."
        text52="Our dedicated team is available to assist you throughout the process, addressing any queries or concerns promptly and ensuring a smooth and satisfactory experience."
      />
      <CityFaqs cityPunjabFaqs={CitySuratFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CitySurat;
