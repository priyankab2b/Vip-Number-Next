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
import { CityLucknowFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img11.png";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img11.png";

const CityLucknow = ({ Seo }) => {
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
        heading="VIP Mobile Number in Lucknow"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Bara Imambara"
        title1="Feel free to shop online for VIP mobile numbers at our store"
        para1="Indulge in the convenience of online shopping as you explore our exclusive store for VIP mobile numbers. With just a few clicks, discover a captivating collection of unique and sought-after numbers that resonate with your individuality."
        para2="From the comfort of your home, embrace the luxury of choosing a VIP mobile number in Lucknow that elevates your communication experience. Shop online today and unlock a world of personalized connectivity."
      />
      <CityFavouriteNumber
        title1="Register with us Today for Your Fancy Mobile Number in Lucknow"
        title2="Join us now to secure your distinctive premium mobile number in Lucknow. Stand out with a unique and unforgettable number that resonates with your identity and personal style."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Lucknow"
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
        heading="Exclusive Deals are Here! Don't Miss Out"
        subHeading="When you purchase a VIP mobile number in Lucknow, you will receive exclusive rewards and offers. Become a VIP by getting a VIP mobile number."
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
        heading="Feel Free to Ask Us any Query"
        text1="Feel free to reach out to us with any queries you may have regarding VIP mobile numbers in Lucknow. We are here to provide you with the information and assistance you need to make an informed decision."
        text2="Your satisfaction is our priority, and we are committed to addressing all your questions promptly and professionally."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Lucknow"
      />
      <CityDifferentFromOthers
        heading="Why Choose us for Fancy Mobile Number in Lucknow"
        heading1="Extensive Collection"
        text11="Our vast collection of fancy mobile numbers in Lucknow ensures that you have a wide range of options to choose from."
        text12="Whether you prefer numbers with repeated digits, specific sequences, or unique patterns, we have a diverse selection that caters to various preferences and tastes."
        heading2="Exclusive Numbers"
        text21="Stand out from the crowd with our exclusive fancy mobile numbers. We curate a range of rare and distinctive numbers that are not easily found elsewhere."
        text22="Owning one of these exclusive numbers allows you to make a memorable impression and showcase your individuality and style."
        heading3="Easy Selection Process"
        text31="We have designed our website to provide a seamless and user-friendly experience. Browsing through our collection is effortless, and you can easily filter and sort the numbers based on your preferences."
        text32="Each number comes with detailed information, enabling you to make an informed decision."
        heading4="Competitive Pricing"
        text41="Our goal is to offer competitive pricing for our fancy mobile numbers in Lucknow. We understand the importance of value for money, and we strive to provide affordable options without compromising on the quality or exclusivity of the numbers."
        text42="Our pricing is designed to ensure that you can find the perfect fancy mobile number within your budget."
        heading5="Reliable Service"
        text51="We take pride in delivering reliable and efficient service to our customers. Our dedicated team is available to assist you throughout the process, from browsing and selecting a number to the final purchase."
        text52="We promptly address any queries or concerns you may have, ensuring a smooth and satisfactory experience."
      />
      <CityFaqs cityPunjabFaqs={CityLucknowFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityLucknow;
