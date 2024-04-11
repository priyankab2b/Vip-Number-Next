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
import { NetworkIdeaFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../Assets/PunjabLeading-img28.jpg";
import CityHowGetVipNumberImg1 from "../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../Assets/CityExclusiveCollection-img28.jpg";

const NetworkIdea = ({ Seo }) => {
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
        heading="Idea Fancy Numbers"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="IDEA Logo"
        title1="India's Premier Destination for Genuine  Idea Fancy Numbers"
        para1="Explore a collection of exclusive Idea VIP Numbers featuring unforgettable combinations for both Prepaid and Postpaid packages, all offered at highly competitive rates."
        para2="Secure your order today and enjoy complimentary doorstep delivery."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying an"
        headingPart2="Idea Choice Number"
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
        heading="Unlock Exclusive Benefits with Your Idea VIP Mobile Number"
        subHeading="When you choose an Idea fancy number, you gain access to special discounts on future acquisitions and exclusive privileges for limited edition numbers."
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
        heading="Purchase Your Preferred Idea Choice Number Online Nationwide"
        text1="Secure your preferred Idea VIP number with unmatched discounts, only at VIP Number Shop, your reliable source for 100% authentic VIP mobile numbers throughout India."
        text2=""
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers IDEA"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Rajesh"
        text11="I recently purchased an Idea VIP number from VIP Number Shop, and I must say I'm thoroughly impressed."
        text12="The process was seamless, and the discounts offered were fantastic. VIP Number Shop truly lives up to its reputation as a trusted provider of VIP mobile numbers."
        heading2="Preeti"
        text21="VIP Number Shop exceeded my expectations! I had been searching for the perfect Idea VIP number, and this shop had exactly what I was looking for."
        text22="I highly recommend VIP Number Shop to anyone in search of their dream mobile number."
        heading3="Ankit"
        text31="I couldn't be happier with my experience at VIP Number Shop. I found the ideal Idea VIP number I wanted, and the prices were unbeatable."
        text32="VIP number delivered to my doorstep made it a breeze. VIP Number Shop is definitely the go-to place for VIP mobile numbers."
        heading4="Sneha"
        text41="VIP Number Shop made my search for an Idea VIP number easy. Their website was user-friendly, and I quickly found a number with a unique combination."
        text42=" I'm delighted with my purchase and grateful for the excellent service provided by VIP Number Shop."
        heading5="Arjun"
        text51="My experience with VIP Number Shop was outstanding. I found a great Idea VIP number at a competitive price. The buying process was smooth and customer service was exceptional."
        text52="Highly recommended!"
      />
      <CityFaqs cityPunjabFaqs={NetworkIdeaFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default NetworkIdea;
