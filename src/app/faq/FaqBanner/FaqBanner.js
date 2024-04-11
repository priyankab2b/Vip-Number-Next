import React, { useState, useEffect } from "react";
import FaqCard from "../../Shared/FaqCard/FaqCard";
import "./FaqBanner.css";
import "../../Shared/FAQs/FAQs.css";

// Images
import faqsIcon from "../../Assets/faqs-icon-1.svg";

const FaqBanner = () => {
  const [faqs, setFaqs] = useState({ status: "", message: "", data: [] });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://admin.leafymango.com/web/faq")
      .then((response) => response.json())
      .then((data) => {
        setFaqs({
          status: data.status,
          message: data.message,
          data: [...data.data],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFaqs = faqs.data.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="FaqBanner-section-os">
      <div className="container-os">
        <div className="FaqBanner-data-row-os">
          <div className="FaqBanner-data-heading-os">How Can We Help You?</div>
          <p>
            Get answers to your questions or doubts. Our support system is 24/7
            hours a day available to assist you.
          </p>
        </div>
        <div className="FaqBanner-search-input-filed-os">
          <input
            type="text"
            placeholder="Search for answers"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        <div className="FAQs-row-os">
          {filteredFaqs.map((faq, index) => {
            const strippedAnswer = faq.answer
              ? new DOMParser().parseFromString(faq.answer, "text/html").body
                  .innerText
              : "";
            return (
              <FaqCard
                key={index}
                image={faqsIcon}
                paragraph={strippedAnswer}
                heading={faq.question}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqBanner;
