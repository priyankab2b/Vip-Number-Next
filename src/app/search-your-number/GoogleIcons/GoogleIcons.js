import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../../Home/VipNumberShopSlider/VipNumberShopSlider.css";
import "../GoogleReference.css";
import VipSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import brandIcon from "../../Assets/VIP-icon-2.svg";
import Link from "next/link";

const GoogleIcons = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://admin.leafymango.com/web/images");
        const data = await response.json();
        setImages(data.data.icon); // Update this line
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 4,
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
            <MainHeading MainHeading="Enjoy  Exclusive Offers with VIP Number Shop" />
          </div>

          <div className="VipNumberSlider-slider-row-os">
            {isLoading ? (
              <div className="loader-os">
                <img src={brandIcon} alt="" />
              </div>
            ) : (
              <VipSlider
                className="vipNumber-slider-row-os"
                {...sliderSettings}
              >
                {images && images.length > 0 ? (
                  images?.map((img, index) => {
                    return (
                      <Link
                        href={img.link}
                        className="googleReference-icon-os"
                        key={index}
                      >
                        <img src={img.path} alt={img.alt_tag} />
                      </Link>
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
export default GoogleIcons;
