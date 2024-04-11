import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const AboutReviews = () => {
  const [counterOn, setcounterOn] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <section className="AboutReviews-section-os">
      <ScrollTrigger
        onEnter={() => setcounterOn(true)}
        onExit={() => setcounterOn(false)}
      >
        <div className="container-os">
          <div className="about-counter-main-ud">
            <div className="about-count-1">
              <h1>
                {counterOn && <CountUp start={0} end={currentYear}></CountUp>}
              </h1>
              <p>SINCE 2007</p>
            </div>

            <div className="about-count-1">
              <h1 className="count">
                {counterOn && <CountUp start={0} end={100000}></CountUp>}+
              </h1>
              <p> CUSTOMERS SERVED </p>
            </div>

            <div className="about-count-1">
              <h1 className="count">
                {counterOn && <CountUp start={0} end={150}></CountUp>}+
              </h1>
              <p> VENDORS </p>
            </div>
            <div className="about-count-1">
              <h1>24x7</h1>
              <p> SUPPORT AVAILABLE </p>
            </div>
          </div>
        </div>
      </ScrollTrigger>
    </section>
  );
};

export default AboutReviews;
