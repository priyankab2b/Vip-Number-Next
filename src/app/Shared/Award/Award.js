import React from "react";
import "./Award.css";
import Image from "next/image";

// Images
import AwardImg from "../../Assets/award-banner-for-mobile.jpg";

const Award = () => {
  return (
    <section className="Award-section-os">
      <div className="container-os">
        <Image src={AwardImg} alt="" />
      </div>
    </section>
  );
};

export default Award;
