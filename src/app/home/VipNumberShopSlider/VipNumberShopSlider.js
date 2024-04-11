import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./VipNumberShopSlider.css";
import VipSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

// Images
import brandIcon from "../../Assets/VIP-icon-2.svg";

const VipNumberShopSlider = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://admin.leafymango.com/web/images");
        const data = await response.json();
        setImages(data.data.image.slice(0, 6)); // Update this line
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
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
    <section className="VipNumberSlider-section-os">
      <div className="container-os">
        <div className="VipNumberSlider-row-os">
          <div className="VipNumberSlider-heading-os">
            <MainHeading MainHeading="Enjoy Exclusive Offers with VIP Number Shop" />
          </div>

          <div className="VipNumberSlider-slider-row-os">
            {isLoading ? (
              <div className="loader-os">
                <Image src={brandIcon} alt="" />
              </div>
            ) : (
              <VipSlider
                className="vipNumber-slider-row-os"
                {...sliderSettings}
              >
                {images && images.length > 0 ? (
                  images?.map((img, index) => {
                    return (
                      <div
                        className="VipNumberSlider-slider-col-os"
                        key={index}
                      >
                        <Link
                          href={img.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={img.path} alt="" />
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ textAlign: "center" }}>Oops! data not found.</p>
                )}
              </VipSlider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipNumberShopSlider;
