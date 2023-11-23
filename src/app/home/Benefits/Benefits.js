import React from "react";
import "./Benefits.css";
import BenefitCard from "../../components/BenefitCard/BenefitCard";

// Images
import no_fear from "../../assets/no-fear.svg";
import reason_to_trust from "../../assets/reason-to-trust.svg";
import fake_claims from "../../assets/fake-claims.svg";
import trust_satisfaction from "../../assets/trust-satisfaction.svg";
import no_risk from "../../assets/no-risk.svg";

const Benefits = () => {
  return (
    <section className="benefits-section-os">
      <div className="container-os">
        <div className="benefits-row-os">
          <BenefitCard
            benefit_image={no_fear}
            benefit_text="No More Fear And Risk!!"
          />
          <BenefitCard
            benefit_image={reason_to_trust}
            benefit_text="Low-Cost Challenge"
          />
          <BenefitCard
            benefit_image={fake_claims}
            benefit_text="No Fake Claims Or Promises"
          />
          <BenefitCard
            benefit_image={trust_satisfaction}
            benefit_text="Biggest platform for VIP Mobile Number"
          />
          <BenefitCard
            benefit_image={no_risk}
            benefit_text="Trusted Since 2007"
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;