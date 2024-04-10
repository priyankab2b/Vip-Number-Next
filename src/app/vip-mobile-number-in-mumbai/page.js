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
import { CityMumbaiFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img5.png";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img5.png";

const CityMumbai = ({ Seo }) => {
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
        heading="Vip Mobile Number In Mumbai"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Gateway Of India Mumbai"
        title1="Well-Approached VIP Phone Number Shop in Mumbai"
        para1="Welcome to our exclusive VIP mobile number shop in Mumbai, where we offer a wide range of prestigious and unique mobile numbers. With a deep understanding of the significance of a mobile number in today's world, we bring you an unparalleled collection of VIP numbers that reflect your individuality, style, and status."
        para2="Step into our premium VIP mobile number emporium in Mumbai, where an exquisite array of exclusive mobile numbers awaits. Discover numbers that resonate with your personality, elevating your style and status in a digitally connected era."
      />
      <CityFavouriteNumber
        title1="Register with us today and secure your preferred mobile number in Mumbai"
        title2="Unlock a vast selection of VIP mobile numbers that resonate with your persona. Our experts can even recommend a number that mirrors your status and taste."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Mumbai"
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
        heading="Get Exclusive Rewards and Offers By Shopping with Us"
        subHeading="Take advantage of exclusive rewards and offers when you shop for a VIP mobile number with us."
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
        heading="Buy a VIP mobile number to discover the essence of personal identity"
        text1="Our VIP mobile number shop is dedicated to helping you discover the essence of personal identity and distinction through our exclusive collection."
        text2="Explore our extraordinary inventory, unleash your creativity through personalization, and enjoy a seamless acquisition process with transparent pricing."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Mumbai"
      />
      <CityDifferentFromOthers
        heading="Why Choose VIP Number Shop for Buying VIP numbers?"
        heading1="The Essence of VIP Mobile Numbers"
        text11="In today's digital era, your mobile number has evolved into a powerful statement of your personal identity. It goes beyond being a mere combination of digits and transforms into a symbol of distinction, representing your unique persona and adding a touch of sophistication to your communication. "
        text12="At our VIP mobile number shop, we understand the significance of this extension of your identity and strive to provide you with exclusive numbers that truly reflect your individuality."
        heading2="Unveiling our Extraordinary Collection"
        text21="Prepare to be captivated by our extensive inventory of VIP mobile number in Mumbai, meticulously curated to cater to diverse preferences."
        text22="Our collection boasts a wide array of numbers with remarkable features, such as unique sequences, auspicious combinations, repeating digits, and other visually appealing patterns. We take pride in regularly refreshing our inventory, ensuring a continuous supply of exclusive numbers for you to choose from."
        heading3="Personalization Options"
        text31="We believe that personalization is key when it comes to selecting your fancy mobile number in Mumbai. That's why we offer a range of customization options, allowing you to create a truly personalized number that reflects your personality and preferences."
        text32="Whether you envision a specific sequence that holds sentimental value or a number that aligns with a special date in your life, our dedicated team is here to assist you every step of the way."
        heading4="Seamless Acquisition Process"
        text41="Acquiring your VIP mobile number should be a seamless and hassle-free experience. Our streamlined acquisition process is designed to provide you with clarity, convenience, and peace of mind."
        text42="From clear guidelines to transparent pricing, we prioritize your satisfaction and ensure that every aspect of the acquisition journey is handled with utmost professionalism."
        heading5="Competitive Pricing and Value"
        text51="We understand that owning a VIP mobile number should be an accessible luxury. That's why we are committed to offering competitive pricing that caters to different budgets."
        text52="We believe that exclusivity should not come at an exorbitant cost. Our aim is to provide exceptional value, delivering a unique combination of prestige, quality, and affordability."
      />
      <CityFaqs cityPunjabFaqs={CityMumbaiFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityMumbai;
