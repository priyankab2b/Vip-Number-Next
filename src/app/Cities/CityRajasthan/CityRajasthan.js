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
import { CityRajasthanFaqs } from "../CityFaqsArray/CityFaqsArray";
import { Helmet } from "react-helmet";

// Image
import RegisterImg from "../../../Assets/vip-number-register-img.svg";
import punjabLeadingImg from "../../../Assets/PunjabLeading-img15.png";
import CityHowGetVipNumberImg1 from "../../../Assets/CityHowGetVipNumber-img-1.png";
import CityHowGetVipNumberImg2 from "../../../Assets/CityHowGetVipNumber-img-2.png";
import CityHowGetVipNumberImg3 from "../../../Assets/CityHowGetVipNumber-img-3.png";
import CityHowGetVipNumberImg4 from "../../../Assets/CityHowGetVipNumber-img-4.png";
import CityHowGetVipNumberImg5 from "../../../Assets/CityHowGetVipNumber-img-5.png";
import CityExclusiveCollectionImg from "../../../Assets/CityExclusiveCollection-img15.png";

const CityRajasthan = ({ Seo }) => {
  const navigate = useNavigate();

  return (
    <div className="city-page-os">
      <Helmet>
        <title>{Seo?.meta_title}</title>
        <meta name="description" content={Seo?.meta_description} />
        <link rel="canonical" href="https:// https://vipnumbershop.com/vip-mobile-number-in-rajasthan" />
      </Helmet>
      <Header />
      <MobileHeader />
      <CityBanner
        heading="VIP Mobile Number in Rajasthan"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={punjabLeadingImg}
        imageAlt="Rajasthani Dance"
        title1="Your Preferred VIP Mobile Number Provider in Rajasthan"
        para1="Step into Rajasthan's leading hub for VIP mobile numbers, where prestige meets practicality. We are the preferred choice for those in search of VIP mobile number in Rajasthan that echo their distinctive flair, stature, and character."
        para2="In this digital era, a mobile number is more than just a sequence of numbers – it's a reflection of your persona. Hence, we strive to offer our clients VIP mobile numbers that are exceptional, easy to recall, and radiate a unique charm in a world bustling with numbers."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Acquire Your Desired Phone Number"
        title2="Register with us to explore our vast array of VIP mobile number in Rajasthan. Our team can also recommend a mobile number that complements your taste and status."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Rajasthan"
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
        heading="Enjoy Exclusive Offers and Rewards on Your Purchase"
        subHeading="Our perks and offers for purchasing a VIP mobile number in Rajasthan include discounts on future acquisitions and exclusive access to limited edition numbers."
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
        heading="Rated as the Best for VIP Mobile Numbers in Rajasthan"
        text1="As the trusted provider of fancy mobile numbers in Rajasthan, we encourage you to delve into our unique collection and embrace the prestige of owning a unique mobile number. Visit our website or our physical store to understand why we are the foremost destination for VIP mobile numbers in the area."
        text2="We assure an unmatched shopping experience that equals the uniqueness of the numbers we provide. Step into the VIP lifestyle and make your mark with our VIP mobile numbers today!"
        link="/"
        image={CityExclusiveCollectionImg}
        imageAlt="Phone Screen with VIP Numbers Rajasthan"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us as Your VIP Mobile Number Provider in Rajasthan?"
        heading1="Unparalleled Collection"
        text11="Our expansive collection of VIP mobile number in Rajasthan is our pride. Whether you seek a number reflecting a memorable date, containing an attractive repeating digits pattern, or syncing with your business landline's last six digits, our collection has the perfect number for you."
        text12="Our database is regularly refreshed to ensure a constant supply of unique VIP numbers."
        heading2="Tailored to Your Needs"
        text21="We believe that your VIP number should mirror your style, and hence, we offer an array of customization options. If you have a specific number sequence in mind, we'll strive to secure it for you."
        text22="Our proficient team can also provide recommendations based on your preferences. Using our deep understanding of number sequences, we create notable, prestigious, and memorable mobile numbers that truly resonate with you."
        heading3="Seamless, Secure Process"
        text31="Transparency, safety, and customer satisfaction form the backbone of our service. We've simplified our process to ensure your VIP mobile number procurement is effortless and secure."
        text32="Our expert staff guides you through each step, ensuring all legal requisites are diligently met."
        heading4="Accessible Luxury"
        text41="Despite the exclusivity of our fancy mobile numbers in Rajasthan, we ensure they're competitively priced. Our pricing model caters to the diverse financial capabilities of our esteemed customers."
        text42="We staunchly believe that owning a VIP number should be an affordable luxury, accessible to anyone wishing to stand out."
        heading5="Customer-Focused Approach"
        text51="We prioritize establishing enduring relationships with our customers. Our devoted team is always available to assist you, answer your queries, and provide excellent post-sales service, ensuring a seamless and gratifying experience with us."
        text52="Our high customer loyalty rate testifies to our unwavering commitment and service quality."
      />
      <CityFaqs cityPunjabFaqs={CityRajasthanFaqs} />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default CityRajasthan;
