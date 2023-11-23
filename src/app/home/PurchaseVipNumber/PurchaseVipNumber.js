import React from "react";
import "./PurchaseVipNumber.css";
import MainHeading from "../../components/MainHeading/MainHeading";
import PurchaseNumberCard from "../../components/PurchaseNumberCard/PurchaseNumberCard";
import VipSlider from "react-slick";

// images
import crown from "../../assets/heading-crown-icon.svg";
// import Purchase1 from "../../../Assets/purchase1.svg"

const PurchaseVipNumber = () => {
    const sliderSettings1 = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                    arrows: false,
                    centerMode: false,
                },
            },
        ],
    };
    return (
        <section className="PurchaseVipNumber-section-os">
            <div className="container-os">
                <div className="PurchaseVipNumber-heading-os">
                    <MainHeading
                        MainHeading="Delivery Process for VIP Number"
                        rightImage={crown}
                    />
                </div>
                <div className="PurchaseVipNumber-row-os">
                    <PurchaseNumberCard
                        // Image={Purchase1}
                        headingText="Pay"
                        subText="to place an Order"
                    />

                    <PurchaseNumberCard
                        // Image={Purchase2}
                        headingText="Get UPC"
                        subText="UPC will be delivered through SMS, Whatsapp and Email."
                    />

                    <PurchaseNumberCard
                        // Image={Purchase3}
                        headingText="Do MNP"
                        subText="Start MNP Process from any of your nearest retail shops and get the SIM."
                    />

                    <PurchaseNumberCard
                        // Image={Purchase4}
                        headingText="Activation"
                        subText="Get your number activated within 4-5 days. "
                        spanText="(18-25 days for Assam and J&K)"
                    />

                    <PurchaseNumberCard
                        // Image={Purchase5}
                        headingText="Money Back Assurity"
                        subText="100% Money back if any problem persists with the UPC code."
                        star="*"
                    />
                </div>
            </div>

            <div className="PurchaseVipNumber-mobile-slider-os">
                <VipSlider {...sliderSettings1}>
                    <PurchaseNumberCard
                        // Image={Purchase1}
                        headingText="Pay"
                        subText="to place an Order"
                    />

                    <PurchaseNumberCard
                        // Image={Purchase2}
                        headingText="Get UPC"
                        subText="UPC will be delivered through SMS, Whatsapp and Email."
                    />

                    <PurchaseNumberCard
                        // Image={Purchase3}
                        headingText="Do MNP"
                        subText="Start MNP Process from any of your nearest retail shops and get the SIM."
                    />

                    <PurchaseNumberCard
                        // Image={Purchase4}
                        headingText="Activation"
                        subText="Get your number activated within 4-5 days. (18-25 days for Assam and J&K)"
                    />

                    <PurchaseNumberCard
                        // Image={Purchase5}
                        headingText="Money Back Assurity"
                        subText="100% Money back if any problem persists with the UPC code."
                    />
                </VipSlider>
            </div>
        </section>
    );
};

export default PurchaseVipNumber;