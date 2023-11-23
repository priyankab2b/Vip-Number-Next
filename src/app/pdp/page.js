'use client'
import React from "react";
import PdpProduct from "./PdpProduct/PdpProduct";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MobileFooter from "../components/MobileFooter/MobileFooter";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import RelatedNumber from "./RelatedNumber/RelatedNumber";
import FAQs from "../components/FAQs/FAQs";
import OurCustomers from "../components/OurCustomers/OurCustomers";
import VideoTestimonial from "../components/VideoTestimonial/VideoTestimonial";
import PurpleBgColor from "../components/PurpleBgColor/PurpleBgColor";
import QRVipApp from "../components/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";

// Image
import RegisterImg1 from "../assets/assurance-register-img.svg";

const ProductDetails = () => {
    return (
        <div className="PDP-page-os">
            PDP Page
            <Header />
            <MobileHeader />
            <PdpProduct />
            <RelatedNumber />
            <FAQs />
            <OurCustomers />
            <VideoTestimonial />
            <PurpleBgColor />
            <RegisterVipNumber
                image={RegisterImg1}
                heading="Assurance of a refund"
                subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
                buttonText="Register"
                buttonText1="Register"
                buttonUrl="/register"
                buttonUrl1="/register"
            />
            <QRVipApp />
            <MobileFooter />
            <Footer />
        </div>
    );
};

export default ProductDetails;