import React from "react";
import "./AnnouncementBar.css";

// slick slider
import AnnouncementSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import sliderImg1 from "../../Assets/announcement-icon1.svg";
import sliderImg2 from "../../Assets/announcement-icon2.svg";
import sliderImg3 from "../../Assets/announcement-icon3.svg";
import sliderImg4 from "../../Assets/announcement-icon4.svg";
import sliderImg5 from "../../Assets/announcement-icon5.svg";
import sliderImg6 from "../../Assets/announcement-icon6.svg";
import Image from "next/image";

const AnnouncementBar = () => {
  const imageArray = [
    {
      image: sliderImg1,
    },
    {
      image: sliderImg2,
    },
    {
      image: sliderImg3,
    },
    {
      image: sliderImg4,
    },
    {
      image: sliderImg5,
    },
    {
      image: sliderImg6,
    },

    // repeat
    {
      image: sliderImg1,
    },
    {
      image: sliderImg2,
    },
    {
      image: sliderImg3,
    },
    {
      image: sliderImg4,
    },
    {
      image: sliderImg5,
    },
    {
      image: sliderImg6,
    },
  ];

  //   slider
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="AnnouncementBar-section-os">
      <div className="AnnouncementBar-slider-content-os">
        <AnnouncementSlider className="AnnouncementBar-slider-os" {...settings}>
          {imageArray.map((items, index) => {
            return (
              <div key={index} className="AnnouncementBar-col-os">
                <Image src={items.image} alt={items.image} />
              </div>
            );
          })}
        </AnnouncementSlider>
      </div>
    </section>
  );
};

export default AnnouncementBar;