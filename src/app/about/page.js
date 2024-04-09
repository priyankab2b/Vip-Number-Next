"use client";
import React from "react";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import AboutBanner from "./AboutBanner/AboutBanner";
import AboutImageWithText from "./AboutImageWithText/AboutImageWithText";
import YearsOfExperience from "./YearsOfExperience/YearsOfExperience";
import MainImg1 from "../Assets/about-boy.png";
import AboutVideo from "./AboutVideo/AboutVideo";
import OurValues from "./OurValues/OurValues";
import AboutReviews from "./AboutReviews/AboutReviews";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
// import { useRouter } from "next/navigation";
// import { capitalizeFirstLetter } from "../utils/comman";

// Images
import MainImg from "../Assets/girl-about.png";

const page = () => {
  const columnDirection = {
    flexDirection: "row-reverse",
  };

  
  // const location = useRouter();
  // let meteTitle =
  // capitalizeFirstLetter(location?.pathname?.split("/")[1]) +
  // ` : Buy Fancy & VIP Mobile Numbers Online`;
  // let description = `Discover an exclusive range of VIP mobile numbers and fancy mobile numbers at VIP Number Shop. Select your choice mobile number and stand out from the crowd!`;
  
  // console.log("meteTitle ::", meteTitle);
  return (
    <div>
      <Header />
      <MobileHeader />
      <AboutBanner />
      <AboutImageWithText
        image={MainImg}
        heading="About Us and Our Values"
        subHeading="Are you looking for the best VIP phone numbers or VIP fancy numbers in India or its states? You have arrived here on the right webpage. That's where the VIP Number Shop comes into the picture with top-notch and best-in-market services with the very competitive and affordable price tag."
        subHeading1="VIP Number Shop (VNS) is the nation’s leading #1"
        subHeading12="VIP Number Shop (VNS) is the nation’s leading #1 VIP and fancy number provider since 2007 with over 70k+ happy customers. We feel proud to say that our VIP and fancy numbers attract thousands of eyes in the market, bring conversions, and boost engagement."
        subHeading2=""
        style={columnDirection}
      />
      <YearsOfExperience />
      <AboutImageWithText
        image={MainImg1}
        heading="They Deliver Numbers... We Deliver Numbers With Real Value And Experience"
        subHeading="Whether you talk about pricing or our services, we prefer to remain transparent and honest in every aspect. As we said earlier, you get what you pay for. There are no hidden games and charges at all."
        subHeading1=""
        subHeading12="Being a reputed VIP and Fancy phone number provider in India, we promise you the best-in-market experience every time you choose us. No hidden games, no hidden terms, you get what you pay for. Customer satisfaction is one of our top tier priorities, and we never compromise on it."
        subHeading2="Whenever It Comes To VIP Phone Phone Numbers, VIP Number Shop Should Be On Top Of Your List"
      />
      <AboutVideo />
      <OurValues />
      <AboutReviews />
      <OurCustomers />
      <VideoTestimonial />

      <MobileFooter />
      <Footer />
    </div>
  );
};

export default page;
