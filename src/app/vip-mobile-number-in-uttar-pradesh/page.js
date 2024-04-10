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
import { CityUttarPradeshFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img21.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img21.jpg";

const CityUttarPradesh = ({ Seo }) => {
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
        heading="VIP Mobile Number in Uttar Pradesh"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Taj Mahal, Agra"
        title1="Your Trusted VIP Mobile Number Provider in Uttar Pradesh"
        para1="Discover the pinnacle of VIP mobile numbers in Uttar Pradesh through our reputable and well-established services. Elevate your communication style with personalized digits that mirror your distinct identity. Our extensive range ensures a meticulous selection process, ensuring you find the perfect mobile number that resonates with your status."
        para2="Experience seamless connectivity and make a statement with an exclusive VIP mobile number that radiates exclusivity. Embrace the height of telecommunication luxury with us, your premier VIP mobile number provider in Uttar Pradesh."
      />
      <CityFavouriteNumber
        title1="Register Today to Secure Your Exclusive Mobile Number"
        title2="Enroll now to secure your unique mobile number in Uttar Pradesh. Enhance your communication with an eye-catching fancy number. Register today to attain an extraordinary and unforgettable mobile number connection."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Uttar Pradesh"
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
        heading="Get Exclusive Rewards and Savings on Your Purchase"
        subHeading="Experience the best of both worlds in Uttar Pradesh – not only an exclusive VIP number, but also relish exclusive rewards and savings with your acquisition. Elevate your communication and enjoy special benefits today."
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
        heading="Top-Rated VIP Mobile Number for Uttar Pradesh"
        text1="At VIP Number Shop, we take pride in our distinguished position as a VIP mobile number provider in Uttar Pradesh. Explore a curated range of sophisticated mobile numbers that redefine communication."
        text2="Rely on our expertise to discover your ideal VIP number, reflecting your stature. Experience seamless connectivity with a touch of sophistication."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Uttar Pradesh"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Numbers in Uttar Pradesh?"
        heading1="Unique Collection"
        text11="Elevate your communication with our unparalleled selection of VIP mobile numbers in Uttar Pradesh. Our thoughtfully curated collection features an array of unique and unforgettable number combinations, allowing you to stand out with undeniable elegance and style."
        text12="Each number is a masterpiece, embodying sought-after exclusivity."
        heading2="Reliable Expertise"
        text21="With a proven track record spanning years, we stand as your unrivaled choice for VIP mobile numbers in Uttar Pradesh. Our extensive experience ensures that every number we provide is genuine and legally valid."
        text22="Trust in our seamless and secure acquisition process, ensuring your journey to owning a VIP number is dependable and smooth."
        heading3="Tailored Service"
        text31="Recognizing that your stature deserves a number that resonates, our personalized service takes your preferences to heart. Our team of experts is dedicated to helping you discover the VIP mobile number that perfectly aligns with your identity."
        text32="Your communication experience will transcend the ordinary, embracing individuality that sets you distinctly apart."
        heading4="Competitive Pricing"
        text41="Our commitment to offering opulence without straining your budget sets us apart. Experience the height of exclusivity with competitive pricing on our VIP mobile numbers in Uttar Pradesh."
        text42="We believe that luxury should be accessible, allowing you to embrace the extraordinary without compromising your financial comfort."
        heading5="Client Satisfaction"
        text51="Our proven history of customer satisfaction speaks volumes about the excellence we provide. Join the ranks of numerous individuals who have elevated their communication with our exceptional VIP mobile numbers in Uttar Pradesh."
        text52="By choosing us, you're selecting a partner that values a seamless process, premium choices, and a communication experience defined by prestige and sophistication."
      />
      <CityFaqs cityPunjabFaqs={CityUttarPradeshFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityUttarPradesh;
