import React from "react";
import "../WhyChooseUs.css";

const WhyChooseBlueBgText = () => {
  const startYear = 2007;
  const startMonth = 3; // January is 0, so April is 3
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let yearsOfExperience;
  if (currentMonth >= startMonth) {
    yearsOfExperience = currentYear - startYear;
  } else {
    yearsOfExperience = currentYear - startYear - 1;
  }

  return (
    <section className="WhyChooseBlueBgText-section-os">
      <div className="main-choose-blue-bg-text-ud">
        <div className="container-os">
          <div className="text-blue-bg-ud">
            <h1>All India References Available To Build Trust With You</h1>
            <p>
              <b>
                Your Nearest Locality/Pincode Based Existing Customer Experience
              </b>
              And Service Verification As said, we have served VIP number
              services all over India in the last {yearsOfExperience} years.
              There is no single state or city we don't have our existing buyer
              located in. Furthermore, if you challenge us to provide you with
              one trusted factor that explains why we are the best, why you
              should trust, an why you should opt our Indian VIP phone number
              services, we are happy and proud to do so. Simply share your
              locality/are or Pincode, and we will share the contact details of
              our existing customer living within the same locality/area or
              Pincode as yours. You call them and confirm whether our services
              are genuine, they are satisfied with it, will they recommend us or
              whatever question you may want to ask them about us nd our
              services. Feel free to contact our customer support team and ask
              for the contact details of
              <b>our existing customers living in your area/Pincode.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBlueBgText;
