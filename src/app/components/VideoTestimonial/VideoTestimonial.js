import React from "react";
import "./VideoTestimonial.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import MainHeading from "../../components/MainHeading/MainHeading";
// Slider
import VideoSlider from "react-slick";

// Images
import thumnailImg1 from "../../assets/VideoTestimonial-thumbanil-1.jpg";
import thumnailImg2 from "../../assets/VideoTestimonial-thumbanil-2.png";
import thumnailImg3 from "../../assets/VideoTestimonial-thumbanil-3.jpg";
import thumnailImg4 from "../../assets/VideoTestimonial-thumbanil-4.jpg";
import crown from "../../assets/heading-crown-icon.svg";

const VideoTestimonial = () => {
    // VideoCard Array
    const videoCard = [
      {
        id: 1,
        videoThumbnail: thumnailImg4,
         videoLink: "https://www.youtube.com/embed/9PWUxq0AVyI?si=Q2XtgrfkuLJiVnO6",
      },
      {
        id: 2,
        videoThumbnail: thumnailImg1,
        videoLink: "https://www.youtube.com/embed/YGq9KNE4O6E",
      },
      {
        id: 3,
        videoThumbnail: thumnailImg2,
        videoLink: "https://www.youtube.com/embed/v8ZsRgMtzwc",
      },
      {
        id: 4,
        videoThumbnail: thumnailImg3,
        videoLink: "https://www.youtube.com/embed/s4UH5i6zbX8",
      },
    ];
  
  
    // slider
    const videoSliderSettings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      adaptiveHeight: false,
      // autoplay: true,
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
      <section className="VideoTestimonial-section-os">
        <div className="container-os">
          <div className="VideoTestimonial-heading-os">
            <MainHeading MainHeading="Celebrity Testimonials" rightImage={crown} />
          </div>
          <div className="VideoTestimonial-slider-row-os">
            <VideoSlider {...videoSliderSettings}>
              {videoCard.map((items) => {
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
  
  export default VideoTestimonial;
  
  
  
  
  // import React, { useState, useEffect } from 'react';
  // import Slider from 'react-slick';
  
  // const RandomVideoSlider = () => {
  //   const [videos, setVideos] = useState([]);
    
  //   // Generate random YouTube video IDs
  //   const generateRandomVideoIds = () => {
  //     const videoIds = [];
  //     for (let i = 0; i < 5; i++) {
  //       const randomId = Math.random().toString(36).substring(7);
  //       videoIds.push(randomId);
  //     }
  //     return videoIds;
  //   };
  
  //   useEffect(() => {
  //     const randomVideoIds = generateRandomVideoIds();
  //     const videoURLs = randomVideoIds.map((videoId) => `https://www.youtube.com/embed/${videoId}`);
  //     setVideos(videoURLs);
  //   }, []);
  
  //   const settings = {
  //     infinite: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     speed: 1000,
  //   };
  
  //   return (
  //     <div>
  //       <h2>Random Video Slider</h2>
  //       <Slider {...settings}>
  //         {videos.map((videoUrl, index) => (
  //           <div key={index}>
  //             <iframe
  //               width="560"
  //               height="315"
  //               src={videoUrl}
  //               title={`Video ${index}`}
  //               frameBorder="0"
  //               allow="autoplay; encrypted-media"
  //               allowFullScreen
  //             ></iframe>
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //   );
  // };
  
  // export default RandomVideoSlider;