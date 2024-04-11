import React from "react";
import "./WithdrawalThankyouData.css";
import "../../thank-you/ThankYouData/ThankYouData.css";
import Image from 'next/image'

// Images
import submitIcon from "../../Assets/withdrawal-thanks-img.png";

const WithdrawalThankyouData = () => {
  return (
    <section className="OrderSubmitData-section-os">
      <div className="container-os">
        <div className="OrderSubmitData-row-os">
          <div className="OrderSubmitData-heading-os">Withdrawan Money</div>
          <div className="OrderSubmitData-submitted-row-os">
            <div className="OrderSubmitData-submitted-col-1-os">Thanks</div>
            <div className="OrderSubmitData-submitted-col-2-os">
              <Image src={submitIcon} alt="" />
            </div>
          </div>
          <div className="WithdrawalThankyouData-submitted-message-row-os">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithdrawalThankyouData;
