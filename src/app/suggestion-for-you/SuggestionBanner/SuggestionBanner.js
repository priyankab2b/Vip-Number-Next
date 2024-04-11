import React from "react";
import Link from "next/link";
import "./SuggestionBanner.css";

const SuggestionBanner = (props) => {
    return (
        <section className="SuggestionBanner-section-os">
            <div className="container-os">
                <div className="SuggestionBanner-row-os">
                    <h1>{props.headingText}</h1>
                    <p>{props.subHeading}</p>
                    <Link href={props.buttonLink}>
                        {props.buttonTitle}
                        <span>
                            <svg
                                width="13"
                                height="11"
                                viewBox="0 0 13 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 1L6.9823 5.75513L1 10.5103" stroke="white" />
                                <path
                                    d="M6.06195 1L12.0443 5.75513L6.06195 10.5103"
                                    stroke="white"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SuggestionBanner;