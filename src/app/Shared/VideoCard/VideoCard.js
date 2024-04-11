import React, { useState } from "react";
import "./VideoCard.css";
import Image from "next/image";

const VideoCard = ({ videoLink, videoThumbnail }) => {
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <div className="VideoCard-os">
      <div className="VideoTestimonial-col-os-1">
        <div
          className="videoThumbnail-os"
          style={{ position: "relative", width: "100%", height: "auto" }}
        >
          <Image
            src={videoThumbnail}
            alt="Thumbnail Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {videoVisible ? (
            <iframe
              width="100%"
              height="100%"
              src={videoLink}
              allowFullScreen
              autoPlay // Add autoPlay attribute
              style={{ position: "absolute", top: 0, left: 0 }}
            ></iframe>
          ) : (
            <div className="playIcon-os" onClick={() => setVideoVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
