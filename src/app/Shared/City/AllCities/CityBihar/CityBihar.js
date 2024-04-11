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
import { CityBiharFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img17.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img17.png";

const CityBihar = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-bihar" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP mobile number in Bihar"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Performing Chatth Puja"
        title1="Discover the Exclusive Collection of VIP Mobile Numbers in Bihar"
        para1="Unlock a world of exclusivity and prestige by browsing our extensive collection of fancy mobile numbers in Bihar. Our selection includes repeating digits, sequential digits, symmetry numbers, and numbers with cultural or religious meanings."
        para2="Choose the perfect VIP number that resonates with your personal preferences and enhances your overall image."
      />
      <CityFavouriteNumber
        title1="Register Now to Receive Your VIP Mobile Number"
        title2="Do not let the chance pass you by! Register right away to reserve your personal VIP mobile number in Bihar, which will give your communications a touch of distinction. Secure your exclusive VIP mobile number in Bihar today and make a lasting impression. Don't miss out on this opportunity to elevate your communication and stand out from the crowd. Register now!"
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Bihar"
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
        heading="Enjoy Exclusive Offers and Rewards with Your VIP Mobile Number"
        subHeading="As a valued customer, you'll unlock a world of exclusive offers and exciting rewards with your VIP mobile number purchase. Experience the perks of being a VIP customer and enjoy special benefits with every transaction."
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
        heading="Reach Out to Us for Any Queries"
        text1="If you have any doubts or questions regarding VIP mobile numbers, feel free to reach out to us."
        text2="Our knowledgeable team is here to provide you with the necessary information and guidance, ensuring you make an informed decision."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Bihar"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for Your VIP Mobile Number in Bihar?"
        heading1="Extensive Selection"
        text11="Our wide collection of VIP mobile numbers ensures you have diverse options to choose from, catering to various preferences and tastes."
        text12=" Find a VIP mobile number that resonates with your style and personality."
        heading2="Exclusive Numbers"
        text21="Stand out from the crowd with our exclusive VIP mobile numbers."
        text22="Our curated range includes rare and distinctive numbers that are highly sought after, adding prestige to your mobile communication."
        heading3="Customization Options"
        text31="We offer customization options for VIP mobile numbers in Bihar, allowing you to choose specific patterns, sequences, or digits that hold significance to you."
        text32="Create a VIP mobile number that truly reflects your identity and preferences."
        heading4="Competitive Pricing"
        text41="We understand the importance of affordability without compromising on quality or exclusivity."
        text42="Our pricing is designed to offer excellent value for your investment, allowing you to indulge in the luxury of owning a VIP mobile number without stretching your budget."
        heading5="Dedicated Customer Service"
        text51="Your satisfaction is our top priority. Our team provides dedicated customer service throughout the process, promptly addressing any queries or concerns you may have."
        text52="We strive to ensure a smooth and seamless experience."
      />
      <CityFaqs cityPunjabFaqs={CityBiharFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityBihar;
