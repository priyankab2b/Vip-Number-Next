"use client"
import React, { useContext } from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import HowWeDeliverBanner from "../how-we-deliver/HowWeDeliverBanner/HowWeDeliverBanner";
import AboutImageWithText from "../about/AboutImageWithText/AboutImageWithText";
import NeedMoreReasons from "./NeedMoreReasons/NeedMoreReasons";
import WhyChooseBlueBgText from "./WhyChooseBlueBgText/WhyChooseBlueBgText";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import PurpleBgColor from "../Shared/PurpleBgColor/PurpleBgColor";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import WhyTrustUs from "./WhyTrustUs/WhyTrustUs";
import WhyChooseVipNumberShop from "./WhyChooseVipNumberShop/WhyChooseVipNumberShop";
import WhyChooseImageWithText from "./WhyChooseImageWithText/WhyChooseImageWithText";
import { useRouter } from "next/navigation";

// Images
import MainImg from "../Assets/choose-1.png";
import MainImg1 from "../Assets/choose-2.png";
import MainImg2 from "../Assets/choose-3.png";
import MainImg3 from "../Assets/choose-4.png";
import MainImg4 from "../Assets/choose-5.png";
import MainImg5 from "../Assets/choose-6.png";
import MainImg6 from "../Assets/choose-7.png";
import MainImg7 from "../Assets/choose-8.png";
import RegisterImg1 from "../Assets/assurance-register-img.svg";
import Award from "../Shared/Award/Award";
// import { Helmet } from "react-helmet";
import {
  capitalizeFirstLetter,
  removeHyphenWithSpaces,
} from "../utils";

const WhyChooseUs = () => {
  const { user, setRedirectTo } = useContext(AppStateContext);
  const Router = useRouter();
  // register popup context
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);

  const columnDirection = {
    flexDirection: "row-reverse",
  };

  const startYear = 2007;
  const startMonth = 3; // January is 0, so April is 3
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let yearsOfExperience;
  if (currentMonth >= startMonth) {
    yearsOfExperience = currentYear - startYear;
  } else {
    yearsOfExperience = currentYear - startYear - 1;
  }

//   const Pathname = usePathname();
//   let meteTitle =
//     removeHyphenWithSpaces(
//       capitalizeFirstLetter(Pathname?.pathname?.split("/")[1])
//     ) + ` : Buy Fancy & VIP Mobile Numbers Online`;
//   let description = `Discover an exclusive range of VIP mobile numbers and fancy mobile numbers at VIP Number Shop. Select your choice mobile number and stand out from the crowd!`;

  return (
    <div className="WhyCHooseUs-page-os">
      {/* <Helmet>
        <title>{meteTitle}</title>
        <meta name="description" content={description} />
      </Helmet> */}
      <Header />
      <MobileHeader />
      <HowWeDeliverBanner
        headingText="Why Choose Us"
        buttonLink="/contact"
        buttonTitle="Contact Us"
      />
      <AboutImageWithText
        image={MainImg}
        heading="VNS’s Indian VIP Phone Number Services"
        subHeading="Just search for VIP Fancy numbers in India or VIP numbers in India on Google. We are sure that you will end up with dozens of such companies and online stores that deal with VIP Indian numbers and provide services for the same."
        subHeading1=""
        subHeading12=""
        subHeading2="No Doubt, Internet Is Flooded With Variety Of VIP Phone Number Sellers, Stores, And Companies! But, here comes a question..."
      />
      <div className="AboutImageWithText-all-section-os">
        <AboutImageWithText
          image={MainImg1}
          heading="Are They Authentic VIP Indian Number Sellers? Is Your Money Safe?"
          subHeading="Well, unfortunately, about 80 to 90% of those stores and companies selling VIP numbers for Indian customers are not real, and most are fake. In other words, you pay for your VIP Indian phone number, and the story ends there. Neither you ever hear from them, nor you receive your ordered VIP phone number. In other words, such companies and stores are fake, and they are running the scams.  "
          subHeading1=""
          subHeading12=""
          subHeading2=""
          style={columnDirection}
        />

        <AboutImageWithText
          image={MainImg2}
          heading="Here Comes The VIP Number Shop For Rescue And Provide Legit And Real VIP Phone Number Services."
          subHeading="Established and running since 2007, we are continuously offering the best class VIP phone numbers services in India. We have been fighting against all such fake and scammy VIP number service providers by providing buyers 100% legit, authentic, and value for money VIP phone number services all over India. Not only this, but we are also certified and registered VIP number sellers having our head office in Chandigarh."
          subHeading1=""
          subHeading12=""
          subHeading2=""
        />

        <AboutImageWithText
          image={MainImg3}
          heading="We Are The Biggest, Oldest (Since 2007) And Number #1 VIP Phone Number Across India!!"
          subHeading="With a collection of over 300+ VIP number subcategories, VNS is the only Indian VIP number seller capable of fulfilling all kinds of VIP number demands for the Indian users. Other than this, 100% of our customers are happy and satisfied with our services. If you don’t believe, feel free to explore our Facebook and Google Business page reviews and verify yourself. We are proud to say that you will find no negative comments or reviews about us or our VIP phone number services."
          subHeading1=""
          subHeading12=""
          subHeading2=""
          style={columnDirection}
        />

        <AboutImageWithText
          image={MainImg4}
          heading="Value For Money Services"
          subHeading={`Yes, from the last  ${yearsOfExperience} years, we have been doing our best to ensure that our customers get the best value for their money. You will find dozens of websites and stores on the internet that sell VIP numbers. However, when it comes to offering value for money, none of them are able to satisfy their customers. That's where the VIP Number Shop comes in, with over one lakh happy and satisfied customers served. None of them have been disappointed in any aspect. Don't just take our word for it, feel free to check our online reviews on Google and Facebook for yourself!`}
        />

        <AboutImageWithText
          image={MainImg5}
          heading="Wide, Huge And Best In Market VIP Number Collection With Competitive Price Tags"
          subHeading="Most of our customers have appreciated that our collection of VIP numbers is outstanding and eye-catching. We guess if you explore our collection, you will agree with this fact too! Above all, we challenge and offer a 99.9% lowest price guarantee on every number you buy."
          subHeading1=""
          subHeading12=""
          subHeading2=""
          style={columnDirection}
        />

        <AboutImageWithText
          image={MainImg6}
          heading="Unbeatable, Competitive And 99.9% Lowest Price Guarantee"
          subHeading="What matters the most when buying something is the “PRICE Tag”. It’s not about selling something at extremely high or budget price, but it’s all about selling something at the right price considering the quality. Whether you talk *786 combinational numbers, *0000, *00000, or any other patterned number, you will find a wide collection with the very right price tag at our store. Whatever number you choose to buy, we promise that in 99.9% cases, the price will remain the lowest compared to any other stores or websites."
          subHeading1=""
          subHeading12=""
          subHeading2=""
        />

        <AboutImageWithText
          image={MainImg7}
          heading="Easy, Safe, And Secured Payment"
          subHeading="We strictly don’t compromise on anything when it comes to customer’s payment safety. We have implemented a very robust and secure payment system in our store. All payments are processed via secured bank servers and are 100% safe. Also, we have multiple payment options available for you, including UPI, bank transfer, credit/debit card, GooglePay etc. In short, your payments are 100% safe and secured. Also, you can pay whatever way you find best and convenient for yourself."
          subHeading1=""
          subHeading12=""
          subHeading2=""
          style={columnDirection}
        />
      </div>
      <Award />
      <WhyTrustUs />
      <NeedMoreReasons />
      <WhyChooseVipNumberShop />
      <WhyChooseBlueBgText />
      <WhyChooseImageWithText />
      <PurpleBgColor />
      <RegisterVipNumber
        image={RegisterImg1}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText={user?.token ? "Suggestions" : "Login"}
        buttonText1={user?.token ? "Suggestions" : "Login"}
        // buttonUrl='/register' buttonUrl1='/register'
        onClick={() => {
          !user?.token && setRedirectTo("/suggestion-for-you");
          !user?.token && setActiveSignInWithOtp(true);
          user?.token && Router.push("/suggestion-for-you");
        }}
      />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default WhyChooseUs;
