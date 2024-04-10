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
import { CityMadhyaPradeshFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img22.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img22.jpg";

const CityMadhyaPradesh = ({ Seo }) => {
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
        heading="VIP Mobile Number in Madhya Pradesh"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Sanchi Stupa, Raisen District"
        title1="Your Trusted Provider of VIP Mobile Numbers in Madhya Pradesh"
        para1="Discover the epitome of VIP mobile numbers in Madhya Pradesh through our well-established and reliable services. Elevate your communication style with personalized digits that reflect your unique identity. Our extensive range ensures a thorough selection process, ensuring you discover the perfect mobile number that resonates with your status."
        para2="Experience uninterrupted connectivity and make a statement with an exclusive VIP mobile number that exudes exclusivity. Embrace the zenith of telecommunication luxury with us, your premier VIP mobile number provider in Madhya Pradesh."
      />
      <CityFavouriteNumber
        title1="RegisterToday to Secure Your VIP Mobile Number"
        title2="Register today to secure your VIP mobile number in Madhya Pradesh. Enhance your communication with an eye-catching fancy number. Enroll now to acquire an extraordinary and memorable mobile number connection."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Madhya Pradesh"
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
        heading="Exclusive Rewards and Savings Await Your Purchase"
        subHeading="Indulge in the best of both worlds in Madhya Pradesh – not only an exclusive VIP number but also exclusive rewards and savings with your acquisition. Elevate your communication experience and partake in special benefits today."
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
        heading="Leading Provider of VIP Mobile Numbers in Madhya Pradesh"
        text1="At VIP Number Shop, we take immense pride in our distinguished position as the leading VIP mobile number provider in Madhya Pradesh. Explore a meticulously curated collection of sophisticated mobile numbers that redefine communication."
        text2="Rely on our expertise to uncover your ideal VIP number, a reflection of your stature. Experience seamless connectivity with a touch of sophistication."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Madhya Pradesh"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Numbers in Madhya Pradesh?"
        heading1="Unique Collection"
        text11="Elevate your communication with our unparalleled selection of VIP mobile numbers in Madhya Pradesh."
        text12="Our thoughtfully assembled collection showcases an array of unique and unforgettable number combinations, allowing you to stand out with unparalleled elegance and style. Each number is a masterpiece, embodying sought-after exclusivity."
        heading2="Proven Expertise"
        text21="With a proven track record spanning years, we stand as your unparalleled choice for VIP mobile number in Madhya Pradesh."
        text22="Our extensive experience ensures that each number we provide is authentic and legally valid. Trust in our seamless and secure acquisition process, ensuring your journey towards owning a VIP mobile number in Madhya Pradesh is reliable and smooth."
        heading3="Personalized Service"
        text31="Acknowledging that your stature warrants a number that resonates, our personalized service is tailored to your preferences. Our team of experts is committed to assisting you in discovering the VIP mobile number that aligns seamlessly with your identity."
        text32="Your communication experience will transcend the ordinary, embracing a level of individuality that sets you distinctly apart."
        heading4="Competitive Pricing"
        text41="Our commitment to offering opulence without burdening your budget sets us apart. Experience the epitome of exclusivity with competitive pricing on our VIP mobile numbers in Madhya Pradesh."
        text42="We believe that luxury should be accessible, enabling you to embrace the extraordinary without compromising your financial ease."
        heading5="Client Satisfaction"
        text51="Our proven history of customer satisfaction speaks volumes about the excellence we provide. Join the ranks of numerous individuals who have elevated their communication with our exceptional VIP mobile numbers in Madhya Pradesh."
        text52="By choosing us, you're selecting a partner that values a seamless process, premium choices, and a communication experience defined by prestige and sophistication."
      />
      <CityFaqs cityPunjabFaqs={CityMadhyaPradeshFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};
export default CityMadhyaPradesh;
