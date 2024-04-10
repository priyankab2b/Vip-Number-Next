import React from "react";
import "./CityPunjab.css";
import { useNavigate } from "react-router-dom";
import Header from "../../../Shared/Header/Header";
import MobileHeader from "../../../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../../../Shared/MobileFooter/MobileFooter";
import Footer from "../../../Shared/Footer/Footer";
import CityBanner from "../CityBanner/CityBanner";
import QRVipApp from "../../../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../../../Home/RegisterVipNumber/RegisterVipNumber";
import PunjabLeading from "../PunjabLeading/PunjabLeading";
import CityFavouriteNumber from "../CityFavouriteNumber/CityFavouriteNumber";
import CityDifferentFromOthers from "../CityDifferentFromOthers/CityDifferentFromOthers";
import CityExclusiveCollection from "../CityExclusiveCollection/CityExclusiveCollection";
import CityTestimonials from "../CityTestimonials/CityTestimonials";
import CityHowGetVipNumber from "../CityHowGetVipNumber/CityHowGetVipNumber";
import CityFaqs from "../CityFaqs/CityFaqs";
import { CityPunjabTestimonials } from "../../CityFaqsArray/CityFaqsArray";
import { cityPunjabFaqs } from "../../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../../Assets/PunjabLeading-img.png";
import CityHowGetVipNumberImg1 from "../../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../../Assets/CityExclusiveCollection-img.png";

const CityPunjab = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https://vipnumbershop.com/vip-mobile-number-in-punjab" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP mobile number in Punjab"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Phone Screen with VIP Numbers"
        title1="Punjab's leading VIP mobile numbers shop"
        para1="VIP Number Shop is the number one choice for those who want a
        standout mobile number that represents who they are. We know that
        a mobile number today is more than just numbers. It's a way to
        express who you are."
        para2="So, we make sure our customers get VIP mobile numbers that catch
        the eye, are easy to recall, and carry a touch of class. Our
        numbers help you stand out in the crowd."
      />
      <CityFavouriteNumber
        title1="Register with Us and Buy your Favorite Number"
        title2="Once you register with us, you gain access to a vast collection of VIP mobile numbers in Punjab. We can also suggest you a mobile number that suits your style and status best."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Punjab"
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
        heading="Enjoy Our Offers and Rewards"
        subHeading="An exclusive range of rewards and offers is waiting for you with your purchase of a VIP mobile number in Punjab."
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
        heading="We Invite You to Explore Our Exclusive Collection of VIP Mobile Numbers in Punjab"
        text1="As Punjab's trusted source for VIP mobile numbers, we invite you to explore our exclusive collection and experience the prestige associated with owning a distinctive mobile number."
        text2="Browse through our website, or better yet, visit us in person to discover why we are the leading VIP mobile number shop in the region. We promise to deliver a shopping experience that is as unique as the numbers we offer. Embrace the privilege of being a VIP. Make your mark with our VIP mobile number in Punjab today!"
        buttonTitle="Search your VIP Number"
        link="/"
        image={CityExclusiveCollectionImg}
      />
      <CityDifferentFromOthers
        heading="What makes VIP Number Shop different from others?"
        heading1="Unparalleled Collection"
        text11="We take immense pride in our extensive collection of VIP mobile number in Punjab. Whether you're looking for a number sequence that mirrors an important date, a repeating digit pattern, or the desired last six digits that match your business landline, our inventory is likely to have the perfect number for you."
        text12="Our rich database is regularly updated with new numbers to ensure an ongoing supply of unique, VIP numbers to choose from."
        heading2="Customization at its Best"
        text21="Your VIP number should reflect your individuality and that's why we offer a wide range of customization options. If you have a specific number sequence in mind, we will make every effort to secure it for you."
        text22="Alternatively, our team can provide suggestions based on your preferences. We understand the nuances of number sequences and their implications, helping us to curate the most appealing, prestigious, and memorable mobile numbers."
        heading3="Seamless, Secure Process"
        text31="Transparency, security, and customer satisfaction are our guiding principles. We have streamlined our process to make acquiring your VIP mobile number in Punjab as straightforward and secure as possible."
        text32="Our knowledgeable staff guides customers through every step, ensuring all legal formalities are strictly adhered to."
        heading4="Competitive Pricing"
        text41="Despite the exclusivity of our fancy mobile number in Punjab, we have made it a point to offer them at competitive rates."
        text42="Our pricing model has been designed keeping in mind the varying budget needs of our diverse clientele. We believe that owning a VIP number should not just be a luxury, but an affordable luxury."
        heading5="Customer-Centric Approach"
        text51="We believe in building long-term relationships with our clients. Our team is always available to assist, answer queries, and provide after-sales service to ensure that your experience with us is smooth and satisfactory."
        text52="Our high customer retention rate is a testament to our commitment and service quality."
      />
      <CityFaqs cityPunjabFaqs={cityPunjabFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityPunjab;
