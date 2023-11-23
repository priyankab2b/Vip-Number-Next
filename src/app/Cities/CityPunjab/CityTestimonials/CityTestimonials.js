import React from "react";
import VideoCard from "../../../Shared/VideoCard/VideoCard";
import VideoSlider from "react-slick";
import MainHeading from "../../../Shared/MainHeading/MainHeading";
import crown from "../../../../Assets/heading-crown-icon.svg";


const CityTestimonials = ({ heading, CityPunjabTestimonials }) => {
  // slider
  const videoSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

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
    <section className="VideoTestimonial-section-os CityTestimonials-section-os">
      <div className="container-os">
        <div className="VideoTestimonial-heading-os">
          <MainHeading
            MainHeading={heading}
            rightImage={crown}
          />
        </div>
        <div className="VideoTestimonial-slider-row-os">
          <VideoSlider {...videoSliderSettings}>
            {CityPunjabTestimonials.map((items) => {
              return (
                <VideoCard
                  key={items.id}
                  videoThumbnail={items.videoThumbnail}
                  videoLink={items.videoLink}
                />
              );
            })}
          </VideoSlider>
        </div>
      </div>
    </section>
  );
};

export default CityTestimonials;
