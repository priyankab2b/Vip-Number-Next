import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import "./FAQs.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../Shared/MainSubHeading/MainSubHeading";
import FaqCard from "../../Shared/FaqCard/FaqCard";
import ViewMoreButton from "../ViewMoreButton/ViewMoreButton";

// Image
import crown from "../../Assets/heading-crown-icon.svg";
import faqsIcon from "../../Assets/faqs-icon-1.svg";

const FAQs = () => {
    const [faqs, setFaqs] = useState({ status: "", message: "", data: [] });
    const [count, setCount] = useState(6);
    const navigate = useRouter();

    useEffect(() => {
        fetch("https://admin.leafymango.com/web/faq")
            .then((response) => response.json())
            .then((data) => setFaqs(data))
            .catch((error) => console.log(error));
    }, []);

    const handleLoadMore = () => {
        setCount((prevCount) => prevCount + 6);
        navigate.push("/faq");
    };

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
                    {faqs.data.slice(0, count).map((faq, index) => {
                        const strippedAnswer = faq.answer
                            ? new DOMParser().parseFromString(faq.answer, "text/html").body
                                .innerText
                            : "";
                        return (
                            <FaqCard
                                key={index}
                                heading={faq.question}
                                paragraph={strippedAnswer}
                                image={faqsIcon}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="FAQs-BuyNow-Btn-os">
                <ViewMoreButton title={"Load more"} onClick={handleLoadMore} />
            </div>
        </section>
    );
};

export default FAQs;