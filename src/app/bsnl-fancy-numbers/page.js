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
import { NetworkBsnlFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img27.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img27.jpg";

const NetworkBsnl = ({ Seo }) => {
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
        heading="Buy BSNL Fancy Numbers"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Bsnl Logo"
        title1="Buy BSNL Prepaid Numbers of Your Choice from VIP Number Shop"
        para1="We are a well-known platform for buying VIP Numbers of different patterns all over India."
        para2="You can find your preferred BSNL fancy mobile number to grow your status and let people or customers remember your number."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying a"
        headingPart2="BSNL VIP Number"
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
        heading="Unlock Exclusive Benefits with Your BSNL Fancy Mobile Number"
        subHeading="With BSNL fancy numbers, you can enjoy discounts on future purchases as well as exclusive access to limited edition numbers."
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
        heading="Purchase Your Preferred BSNL VIP Number Online from Anywhere in India"
        text1="Get your desired BSNL VIP number at unbeatable rates, exclusively from VIP Number Shop, a reputable platform for 100% authentic VIP mobile numbers throughout India."
        text2=""
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers BSNL"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Aarav Gupta"
        text11="Outstanding service! The VIP Number Shop provided me with a fantastic BSNL fancy number at an unbeatable price."
        text12="Highly recommended for hassle-free purchases!"
        heading2="Nisha Verma"
        text21="I was doubtful at first, but VIP Number Shop delivered as promised."
        text22="My BSNL VIP number came with great discounts, making it a truly VIP experience. Five stars!"
        heading3="Ramesh Kumar"
        text31="Impressed with the range of exclusive BSNL fancy numbers available online. I found my ideal VIP number effortlessly and saved money."
        text32="A convenient and reliable service."
        heading4="Anika Dasgupta"
        text41="VIP Number Shop made acquiring my BSNL fancy number a breeze. The discounts and limited edition options exceeded my expectations."
        text42="Definitely the go-to platform for BSNL fancy numbers!"
        heading5="Aditya Singh"
        text51="Shopping for a BSNL VIP number from VIP Number Shop was a fantastic experience. Their exclusive collection and affordable pricing made it easy to find the perfect number."
        text52="Highly satisfied!"
      />
      <CityFaqs cityPunjabFaqs={NetworkBsnlFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default NetworkBsnl;
