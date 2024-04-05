import React from "react";
import MainHeading from "../MainHeading/MainHeading";
import AwardWinnerCard from "../AwardWinner/AwardWinnerCard/AwardWinnerCard";
import "./OrderPlacementOurCustomers.css";

// Images
import customerImg from "../../Assets/ourCustomers-img-1.png";
import customerImg1 from "../../Assets/ourCustomers-img-2.png";
import customerImg2 from "../../Assets/ourCustomers-img-3.png";
import customerImg3 from "../../Assets/ourCustomers-img-4.png";

const OrderPlacementOurCustomers = () => {
  const headingStyle = {
    color: "#6019EB",
  };

  return (
    <section className="OrderPlacementOurCustomers-section-os default-section-os">
      <div className="container-os">
        <div className="OrderPlacementOurCustomers-content-os">
          <div className="default-heading-os">
            <MainHeading MainHeading="Our Customers" style={headingStyle} />
          </div>
          <div className="OrderPlacementOurCustomers-row-os">
            <AwardWinnerCard image={customerImg} paragraph="Mustaq Khan" />
            <AwardWinnerCard image={customerImg1} paragraph="Upasana Singh" />
            <AwardWinnerCard image={customerImg2} paragraph="Rushad Rana" />
          </div>
          <div className="OrderPlacementOurCustomers-row-os-1">
            <MainHeading MainHeading="& Much More" style={headingStyle} />
          </div>
          <div className="OrderPlacementOurCustomers-row-os-2">
            <img src={customerImg3} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPlacementOurCustomers;
