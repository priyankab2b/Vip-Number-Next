import React from "react";
import MainHeading from "../../../Shared/MainHeading/MainHeading";
import AwardWinnerCard from "../AwardWinnerCard/AwardWinnerCard";
import "./AwardWinner.css";

// Image
import awardImg from "../../../Assets/award-winner-img-1.png";
import awardImg1 from "../../../Assets/award-winner-img-2.png";

const AwardWinner = () => {
  const headingStyle = {
    color: "#6019EB",
  };
  return (
    <section className="Award-winner-section-os default-section-os">
      <div className="container-os">
        <div className="Award-winner-content-os">
          <div className="default-heading-os">
            <MainHeading MainHeading="Award Winner" style={headingStyle} />
          </div>
          <div className="Award-winner-row-os">
            <AwardWinnerCard
              image={awardImg}
              heading="International Business Award"
              paragraph="Chief Guest :- Sonu Sood"
            />
            <AwardWinnerCard
              image={awardImg1}
              heading="Global Icon Award"
              paragraph="Chief Guest :- Malaika Arora"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardWinner;
