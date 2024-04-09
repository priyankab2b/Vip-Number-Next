import React from "react";
import "../../../../Shared/FAQs/FAQs.css";
import MainHeading from "../../../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../../../Shared/MainSubHeading/MainSubHeading";
import FaqCard from "../../../../Shared/FaqCard/FaqCard";

// Image
import crown from "../../../../Assets/heading-crown-icon.svg";
import faqsIcon from "../../../../Assets/faqs-icon-1.svg";

const CityFaqs = ({cityPunjabFaqs}) => {
  return (
    <section className="FAQs-section-os">
      <div className="container-os">
        <div className="FAQs-headings">
          <div className="FAQs-heading-os">
            <MainHeading
              MainHeading="Frequently Asked Question"
              rightImage={crown}
            />
          </div>
          <div className="FAQs-subHeading-os">
            <MainSubHeading MainSubHeadingText="To get the best VIP numbers for a lifetime, you must first clear any doubts you may have, if any." />
          </div>
        </div>

        <div className="FAQs-row-os">
          {cityPunjabFaqs.map((faq, index) => {
            return (
              <FaqCard
                key={index}
                heading={faq.heading}
                paragraph={faq.paragraph}
                image={faqsIcon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CityFaqs;
