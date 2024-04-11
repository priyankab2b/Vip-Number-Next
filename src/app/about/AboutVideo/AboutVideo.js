import React from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../About.css";

//Images
import thumb from "../../Assets/QRVipApp-QR.png";

const AboutVideo = () => {
  return (
    <section className="AboutVideo-section-os">
      <div className="container-os">
        <MainHeading MainHeading="About VIP NUMBER SHOP" />

        <div className="AboutVideo-row-os">
          <iframe
            src="https://www.youtube.com/embed/e2Jjs5ICX_U"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          >
            <source src={thumb} type="image/png" />
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
