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
import { CityKeralaFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img3.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img3.png";

const CityKerala = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/fancy-mobile-number-in-kerala" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Fancy Mobile Number in Kerala"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Kathakali"
        title1="We are Kerala's top choice for VIP phone numbers"
        para1="We're thrilled to welcome you to Kerala's top-tier choice for VIP mobile numbers, a unique blend of prestige and practicality. We have evolved into the go-to option for those looking for a fancy mobile number that not only stands out but also captures their unique essence, status, and personality."
        para2="In the digital world of today, your mobile number is more than a set of numbers - it’s an extension of your identity. That's why we are dedicated to providing our customers with VIP mobile numbers that are unique, easy-to-remember, and oozing with a sense of exclusivity that sets you apart in a crowded world."
      />
      <CityFavouriteNumber
        title1="Register with us to Buy Fancy Mobile Numbers in Kerala"
        title2="Unlock the world of style and exclusivity by registering with us to buy fancy mobile numbers in Kerala. Don't miss out on the chance to own a number that reflects your individuality and sets you apart from the crowd."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Kerala"
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
        heading="Don’t Miss the Exclusive Offers and Rewards"
        subHeading="Enjoy exclusive offers during festivals, special days and occasions, you can save up to 30% on the real price."
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
        heading="We Invite You to Explore Our Exclusive Collection of VIP Mobile Numbers in Kerala"
        text1="As Kerala's reliable provider of VIP mobile numbers, we welcome you to explore our exclusive collection and feel the prestige that comes with owning a distinct mobile number. Browse our website, or better yet, drop by our shop to find out why we are the leading VIP mobile number shop in the region."
        text2="We ensure to provide a shopping experience that's as unique as the numbers we present. Step into the VIP lifestyle. Make your mark with our VIP mobile numbers today!"
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Kerala"
      />
      <CityDifferentFromOthers
        heading="Why is the VIP Number Shop a Top Provider?"
        heading1="An Unmatched Collection"
        text11="We are immensely proud of our wide-ranging collection of VIP mobile numbers. Whether you seek a number that reflects a significant date, a pattern of repeating digits, or the much-desired last six digits matching your business landline, our selection likely has the perfect number waiting for you."
        text12="Our database is constantly refreshed with new numbers, guaranteeing a continuous supply of distinct VIP mobile numbers in Kerala to choose from."
        heading2="Tailored to Your Taste"
        text21="We believe your VIP number should echo your personal touch, and hence we offer a broad spectrum of customization options. If you have a particular number sequence in your mind, we will strive to procure it for you."
        text22=" If not, our expert team is here to suggest options based on your preferences. We grasp the fine details of number patterns, which empowers us to create the most standout, distinguished, and unforgettable mobile numbers."
        heading3="A Smooth, Secure Journey"
        text31="We hold transparency, security, and customer satisfaction as our foundational pillars. We've simplified our process to make the acquisition of your VIP mobile number in Kerala as effortless and secure as possible."
        text32="Our skilled staff assists customers through each step, ensuring that all legal requirements are strictly met."
        heading4="Affordable Exclusivity"
        text41="Despite the exclusive nature of our VIP mobile numbers in Kerala, we ensure they are available at competitive prices. Our pricing strategy is designed considering the diverse budgetary needs of our vast clientele."
        text42="We firmly believe that owning a VIP number should be an accessible luxury, not just a mere luxury."
        heading5="Superior Customer Support"
        text51="We strive to establish enduring relationships with our customers. Our team is always ready to provide assistance, answer your questions, and offer after-sales service, guaranteeing a smooth and satisfying experience with us."
        text52="Our high customer loyalty rate speaks volumes about our commitment and the quality of our services."
      />
      <CityFaqs cityPunjabFaqs={CityKeralaFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityKerala;
