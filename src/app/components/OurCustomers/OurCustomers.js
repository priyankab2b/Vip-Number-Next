import React from "react";
import "./OurCustomers.css";
import MainHeading from "../../components/MainHeading/MainHeading";
import MainSubHeading from "../../components/MainSubHeading/MainSubHeading";
import CustomerSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OurCustomerCard from "../../components/OurCustomerCard/OurCustomerCard";

// Image
import crown from "../../assets/heading-crown-icon.svg";
// import faqsIcon from '../../../Assets/faqs-icon.svg';
import quoteIcon from "../../assets/quotes.png";

const OurCustomers = () => {
    // slider
    const CustomerSliderSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <section className="OurCustomers-section-os">
            <div className="container-os">
                <div className="FAQs-headings">
                    <div className="OurCustomers-heading-os">
                        <MainHeading
                            MainHeading="Our Happy Customer Reviews"
                            rightImage={crown}
                        />
                    </div>
                    {/* <div className='OurCustomers-subHeading-os'>
                        <MainSubHeading MainSubHeadingText='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has' />
                    </div> */}
                </div>

                <div className="OurCustomers-slider-row-os">
                    <CustomerSlider {...CustomerSliderSettings}>
                        <OurCustomerCard
                            Image={quoteIcon}
                            text="I recently purchased a VIP mobile number from VIP Number Shop. I am very happy by the level of service provided. The process was smooth and easy, and I was able to choose the perfect number for me!"
                            name="Sneha Patel"
                        />
                        <OurCustomerCard
                            Image={quoteIcon}
                            text="I highly recommend VIP Number Shop to anyone in search of a unique and personalized VIP mobile number. The website offers a vast selection of options to choose from, and the customer service is exceptional."
                            name="Vikram Khanna"
                        />
                        <OurCustomerCard
                            Image={quoteIcon}
                            text="I was hesitant to spend money on a VIP mobile number, but the quality of service and attention to detail I received from VIP Number Shop made it worth every penny. My new number has become a conversation starter among my friends."
                            name="Rohini Chakraborty"
                        />
                        <OurCustomerCard
                            Image={quoteIcon}
                            text="I had a fantastic experience purchasing a VIP mobile number from this website. The website was easy to navigate, and the support team was quick to respond to any questions I had. I couldn't be happier with my new number."
                            name="Ravi Kumar Reddy"
                        />
                    </CustomerSlider>
                </div>
            </div>
        </section>
    );
};

export default OurCustomers;