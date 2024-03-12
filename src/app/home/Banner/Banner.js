"use client";
import React from "react";
import "./Banner.css";
import BannerSlider from "react-slick";
// import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const Banner = ({ bannerText }) => {
  // const navigate = useRouter();

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
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
  // const handleTest = () => {
  //   navigate.push("/search-results");
  // }

  return (
    <div className="homepage-banner-section-os">
      <div className="container-os">
        <div className="banner-slider-os">
          <BannerSlider className="banner-row-os" {...settings}>
            <div className="banner-col-2-os"></div>
            <div className="banner-col-1-os">
              <h2>{bannerText || "VIP NUMBER SHOP"}</h2>
              <p>Apka Number, Apki Pehchaan</p>
              <Link href="/">
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
            </div>
          </BannerSlider>
        </div>
      </div>
    </div>
  );
};

export default Banner;
