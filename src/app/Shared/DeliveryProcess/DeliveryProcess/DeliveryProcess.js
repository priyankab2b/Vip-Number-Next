import React from "react";
import MainHeading from "../../MainHeading/MainHeading";
import MainSubHeading from "../../MainSubHeading/MainSubHeading";
import DeliveryProcessCard from "../DeliveryProcessCard/DeliveryProcessCard";
import "./DeliveryProcess.css";

// Images
import deliveryIcon from "../../../Assets/delivery-process-icon-1.svg";
import deliveryIcon1 from "../../../Assets/delivery-process-icon-2.svg";
import deliveryIcon2 from "../../../Assets/delivery-process-icon-3.svg";

const DeliveryProcess = ({ sectionStyle }) => {
  const headingStyle = {
    color: "#6019EB",
  };
  return (
    <section
      className={`Delivery-process-section-os default-section-os ${sectionStyle}`}
    >
      <div className="container-os">
        <div className="default-heading-os">
          <MainHeading MainHeading="No Boundation" style={headingStyle} />
          <MainSubHeading MainSubHeadingText="Prepaid or Postpaid, the choice is yours" />
        </div>
        <div className="Delivery-process-content-os">
          <div className="CityHowGetVipNumber-heading-os">
            <h3>
              Delivery Process
              <span>for VIP Number</span>
              <span>?</span>
            </h3>
          </div>

          <div className="Delivery-process-row-os">
            <DeliveryProcessCard
              image={deliveryIcon}
              heading="Pay"
              paragraph="to place an Order"
            />
            <DeliveryProcessCard
              image={deliveryIcon1}
              heading="Get UPC"
              paragraph="UPC will be delivered through SMS, Whatsapp & Email."
            />
            <DeliveryProcessCard
              image={deliveryIcon2}
              heading="Do MNP"
              paragraph="Start the MNP Process at the nearest retail shop to get the Sim"
            />
          </div>

          <div className="Delivery-process-row-os-1">
            {/* <h3>Money Back Assurity</h3>
            <p>100: Money Back if you face any problem with the UPC.</p> */}
            <DeliveryProcessCard
              heading="Money Back Assurity"
              paragraph="100: Money Back if you face any problem with the UPC."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
