import React from "react";
import "./HowWeDeliverCard.css";
import bedge from "../../Assets/howwedeliver-card-bedge.svg";
import Image from 'next/image'

const HowWeDeliverCard = () => {
  return (
    <section className="HowWedeliverCard-section-os">
      <div className="container-os">
        <div className="HowWedeliverCard-row-os">
          <div className="HowWedeliverCard-col-1-os">
            <div className="HowWedeliverCard-image-os">
              <Image src={bedge} alt="" />
            </div>
            <h3>Customer will Pay</h3>
            <p>
              We have kept the delivery process as simple as possible to offer a
              hassle-free experience to our every customer. We deliver following
              the five simple and straightforward steps.
            </p>
          </div>

          <div className="HowWedeliverCard-col-2-os">
            <div className="HowWedeliverCard-image-os">
              <Image src={bedge} alt="" />
            </div>
            <h3>Customer will Pay</h3>
            <p>
              We have kept the delivery process as simple as possible to offer a
              hassle-free experience to our every customer. We deliver following
              the five simple and straightforward steps.
            </p>
          </div>

          <div className="HowWedeliverCard-col-3-os">
            <div className="HowWedeliverCard-image-os">
              <Image src={bedge} alt="" />
            </div>
            <h3>Customer will Pay</h3>
            <p>
              We have kept the delivery process as simple as possible to offer a
              hassle-free experience to our every customer. We deliver following
              the five simple and straightforward steps.
            </p>
          </div>

          <div className="HowWedeliverCard-col-4-os">
            <div className="HowWedeliverCard-image-os">
              <Image src={bedge} alt="" />
            </div>
            <h3>Customer will Pay</h3>
            <p>
              We have kept the delivery process as simple as possible to offer a
              hassle-free experience to our every customer. We deliver following
              the five simple and straightforward steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliverCard;
