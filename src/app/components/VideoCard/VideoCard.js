// import React from "react";
// import "./VideoCard.css";

// const VideoCard = ({ videoLink, videoThumbnail }) => {
//   return (
//     <div className="VideoCard-os">
//       <div className="VideoTestimonial-col-os-1">
//         {/* <video
//           width="100%"
//           height="100%"
//           controls
//           id="video"
//           preload="metadata"
//           poster={videoThumbnail}
//         >
//           <source src={videoLink} />
//         </video> */}
//         <div className="videoThumbnail-os" style={{ position: "relative", width: "100%", height: "auto" }}>
//           <img
//             src={videoThumbnail}
//             alt="Thumbnail Image"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <iframe
//             width="100%"
//             height="100%"
//             src={videoLink}
//             allowFullScreen
//             // allow="autoplay"
//             style={{ position: "absolute", top: 0, left: 0 }}
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VideoCard;


// import React, { useState } from "react";
// import "./VideoCard.css";

// const VideoCard = ({ videoLink, videoThumbnail }) => {
//   const [videoVisible, setVideoVisible] = useState(false);

//   const handlePlayClick = () => {
//     setVideoVisible(true);
//   };

//   return (
//     <div className="VideoCard-os">
//       <div className="VideoTestimonial-col-os-1">
//         <div
//           className="videoThumbnail-os"
//           style={{ position: "relative", width: "100%", height: "auto" }}
//         >
//           <img
//             src={videoThumbnail}
//             alt="Thumbnail Image"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           {!videoVisible && (
//             <div className="playIcon-os" onClick={handlePlayClick}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
//                 <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"></path>
//               </svg>
//             </div>
//           )}
//           {videoVisible && (
//             <iframe
//               width="100%"
//               height="100%"
//               src={videoLink}
//               allowFullScreen
//               style={{ position: "absolute", top: 0, left: 0 }}
//             ></iframe>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;



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

// import React, { useState } from "react";
// import "./VideoCard.css";

// const VideoCard = ({ videoLink, videoThumbnail }) => {
//   const [videoPlaying, setVideoPlaying] = useState(false);

//   const handlePlayClick = () => {
//     setVideoPlaying(true);
//   };

//   return (
//     <div className="VideoCard-os">
//       <div className="VideoTestimonial-col-os-1">
//         <div
//           className="videoThumbnail-os"
//           style={{ position: "relative", width: "100%", height: "auto" }}
//         >
//           {!videoPlaying && (
//             <div>
//               <img
//                 src={videoThumbnail}
//                 alt="Thumbnail Image"
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 onClick={handlePlayClick}
//               />
//               <div className="playIcon-os" onClick={handlePlayClick}>
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
//                   <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"></path>
//                 </svg>
//               </div>
//             </div>
//           )}
//           {videoPlaying && (
//             <iframe
//               width="100%"
//               height="100%"
//               src={videoLink}
//               allowFullScreen
//               frameBorder="0"
//               title="YouTube Video"
//             ></iframe>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;