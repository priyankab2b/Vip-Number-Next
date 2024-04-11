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
import { cityKarnatakaFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img2.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img2.png";

const CityKarnataka = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/fancy-mobile-numbers-in-karnataka" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="Fancy mobile numbers in Karnataka"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Kannada man with VIP Number"
        title1="You Personal Shop for Buying Fancy Mobile Numbers in Karnataka"
        para1="Welcome to our online store, your ultimate destination for VIP mobile numbers in Karnataka! We understand your desire to have a unique and exclusive mobile number that reflects your personality and leaves a lasting impression. "
        para2="Our carefully curated collection of VIP mobile numbers is specifically tailored for customers in Karnataka who appreciate luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Register with us to Buy Fancy Mobile Numbers in Karnataka"
        title2="Unlock the world of style and exclusivity by registering with us to buy fancy mobile numbers in Karnataka. Don't miss out on the chance to own a number that reflects your individuality and sets you apart from the crowd."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Karnataka"
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
        heading="Don't miss the opportunity for exclusive deals"
        subHeading="Buying a VIP mobile number in Karnataka comes with exclusive rewards and offers. Get a VIP mobile number now and stand out from the crowd."
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
        heading="Talk Freely with Us About Your needs"
        text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Karnataka."
        text2="Thank you for choosing our online store for VIP mobile numbers in Karnataka. We look forward to serving you and helping you find the perfect VIP mobile number that matches your unique style and preference."
        buttonTitle="Search your VIP Number."
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Karnataka"
      />
      <CityDifferentFromOthers
        heading="Why Choose us for Fancy Mobile Numbers in Karnataka"
        heading1="Extensive Range of Premium Numbers"
        text11="Explore our wide range of premium VIP mobile numbers in Karnataka which cater to various preferences. Whether you prefer a specific pattern, repeated digits, or a memorable combination, our collection has something for everyone."
        text12="We continually update our inventory to ensure that you have access to the latest and most fancy mobile numbers in Karnataka."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our exclusive fancy mobile numbers in Karnataka. Each number is carefully selected to provide a sense of exclusivity to our esteemed customers in Karnataka. "
        text22="With a VIP mobile number, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We understand the significance of privacy and security in today's digital world. Our VIP mobile numbers come with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about compromising your privacy."
        heading4="Easy to Remember"
        text41="Our VIP mobile numbers are designed to be effortlessly memorable, allowing you to share your number effortlessly with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can significantly impact your ability to establish connections and build relationships."
        heading5="Superior Customer Support"
        text51="At our online store, we place customer satisfaction at the forefront of our priorities. Our dedicated team is fully committed to providing exceptional customer support, ensuring that your experience with us is seamless and enjoyable."
        text52="We are readily available to address any inquiries, offer guidance, and assist you throughout the process of selecting and activating your VIP mobile number."
      />
      <CityFaqs cityPunjabFaqs={cityKarnatakaFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityKarnataka;
