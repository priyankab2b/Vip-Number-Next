'use client'
import React from "react";
import PdpProduct from "./PdpProduct/PdpProduct";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import RelatedNumber from "./RelatedNumber/RelatedNumber";
import FAQs from "../Shared/FAQs/FAQs";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import PurpleBgColor from "../Shared/PurpleBgColor/PurpleBgColor";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";

// Image
import RegisterImg1 from "../Assets/assurance-register-img.svg";
import FamilyPack from "../home/FamilyPack/FamilyPack";

const ProductDetails = () => {
    return (
        <div className="PDP-page-os">
            PDP Page
            <Header />
            <MobileHeader />
            <PdpProduct />
            <FamilyPack />
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