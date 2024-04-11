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
import { CityUttarakhandFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img20.jpg";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img20.jpg";

const CityUttarakhand = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-uttarakhand" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP Mobile Number in Uttarakhand"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Trimbakeshwar Temple, Rishikesh"
        title1="Your Reliable VIP Mobile Number Provider in Uttarakhand"
        para1="Experience the epitome of VIP mobile numbers in Uttarakhand through our trusted and well-established services. Elevate your communication style with personalized digits that mirror your unique identity. Our extensive collection ensures a well-approached selection process, guaranteeing the ideal number that resonates with your status."
        para2="Embrace seamless connectivity and make a statement with an exclusive VIP mobile number that exudes exclusivity. Revel in the zenith of telecommunication luxury with us, your leading VIP mobile number provider in Uttarakhand."
      />
      <CityFavouriteNumber
        title1="Register Now to Secure Your Exclusive Mobile Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Uttarakhand"
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
        heading="Indulge in Exclusive Rewards and Savings on Your Purchase"
        subHeading="Revel in the best of both worlds in Uttarakhand – not only an exclusive VIP number but also relish exclusive rewards and savings with your acquisition. Elevate your communication and partake in special benefits today."
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
        heading="Top-Ranked VIP Number Shop for Uttarakhand"
        text1="At VIP Number Shop, we take pride in our distinguished standing as a VIP mobile number provider in Uttarakhand. Explore a curated assortment of sophisticated mobile numbers that redefine communication."
        text2="Rely on our expertise to discover your ideal VIP number, mirroring your stature. Experience seamless connectivity with a touch of refinement."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Pune"
      />
      <CityDifferentFromOthers
        heading="Why Opt for Us for VIP Mobile Numbers in Uttarakhand?"
        heading1="Distinctive Collection"
        text11="Elevate your communication with our unmatched assortment of VIP mobile numbers in Uttarakhand."
        text12="Our carefully curated collection features an array of unique and unforgettable number combinations, enabling you to stand out with undeniable elegance and style. Each number is a masterpiece in itself, reflecting the sought-after exclusivity."
        heading2="Reliable Expertise"
        text21="With a proven track record spanning years, we stand as your unparalleled choice for VIP numbers in Uttarakhand. Our extensive experience ensures that every number we offer is genuine and legally valid."
        text22="Rest assured, our seamless and secure acquisition process is rooted in trust, ensuring your journey toward owning a VIP number is smooth and dependable."
        heading3="Tailored Service"
        text31="Recognizing that your stature deserves a number that resonates, our personalized service takes your preferences to heart. Our team of experts is committed to assisting you in discovering the VIP mobile number that perfectly aligns with your identity."
        text32="Your communication experience will transcend the ordinary, embracing a level of individuality that sets you apart distinctly."
        heading4="Competitive Pricing"
        text41="Our dedication to offering opulence without straining your budget sets us apart. Experience the peak of exclusivity with competitive pricing on our VIP mobile numbers in Uttarakhand."
        text42="We believe that luxury should be accessible, enabling you to embrace the extraordinary without compromising your financial ease.
        "
        heading5="Client Satisfaction"
        text51="Our proven history of customer satisfaction speaks volumes about the excellence we provide. Join the ranks of numerous individuals who have elevated their communication with our exceptional VIP numbers."
        text52="By choosing us, you're selecting a partner that values a seamless process, premium choices, and a communication experience defined by prestige and refinement."
      />
      <CityFaqs cityPunjabFaqs={CityUttarakhandFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityUttarakhand;