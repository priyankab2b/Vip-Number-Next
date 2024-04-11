"use client";
import React from "react";
import "./Banner.css";
import BannerSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// Images
// import bannerImg from "../../../Assets/VIP-number-shop-award-banner.png";
import bannerImg from "../../Assets/homepage-new-banner-280324.png";
// import bannerImg2 from "../../Assets/banner_1.jpg";
import bannerImg1 from "../../Assets/postpre.png";
import Image from "next/image";
// import bannerImg3 from "../../../Assets/banner-bg11.png";

const Banner = ({ bannerText }) => {
  const bannerImageArray = [
    {
      image: bannerImg,
    },
    {
      image: bannerImg1,
    },
    // {
    //   image: bannerImg2,
    // },
    // {
    //   image: bannerImg3,
    // },
  ];

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="homepage-banner-section-os">
      <div className="container-os">
        <div className="banner-slider-os">
          <BannerSlider className="banner-row-os" {...settings}>
            {/* <div className="banner-col-2-os"></div>
            <div className="banner-col-1-os">
              <h2>{bannerText || "VIP NUMBER SHOP"}</h2>
              <p>Apka Number, Apki Pehchaan</p>
              <Link to="/contact">
                Contact Us
                <span>
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L6.9823 5.75513L1 10.5103" stroke="white" />
                    <path
                      d="M6.06195 1L12.0443 5.75513L6.06195 10.5103"
                      stroke="white"
                    />
                  </svg>
                </span>
              </Link>
            </div> */}
            {bannerImageArray.map((items, index) => {
              return (
                <div className="banner-col-os" key={index}>
                  {/* <img src={items?.image} alt={items?.image} /> */}
                  <Image src={items?.image} alt={items?.image} />
                </div>
              );
            })}
          </BannerSlider>
        </div>
      </div>
    </section>
  );
};

export default Banner;
