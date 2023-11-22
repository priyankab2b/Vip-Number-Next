"use client"
import React from "react";
import Link from "next/link";
import "./Recommendations.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Recommendations = () => {
    const [sliderArrow, setSliderArrow] = useState();
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        const getRecommendations = async () => {
            try {
                const response = await axios.get(
                    "https://admin.leafymango.com/web/category/recommendation"
                );
                setRecommendations(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getRecommendations();
    }, []);

    const handleSlider = () => {
        if (sliderArrow === "sliderOpen") {
            setSliderArrow("");
        } else {
            setSliderArrow("sliderOpen");
        }
    };

    return (
        <section className="Recommendations-section-os">
            <div className="container-os">
                <div className="Recommendations-main-row-os">
                    <div className="Recommendations-heading-os">Recommendations</div>
                    <div className={`Recommendations-row-os ${sliderArrow}`}>
                        {recommendations?.map((recommendation, iIndex) => (
                            <div
                                className="Recommendations-col-1-os"
                                key={recommendation?.id}
                            >
                                <Link href={recommendation?.link} key={iIndex}>
                                    <div className="Recommendations-col-image-os">
                                        <img src={recommendation.icon} alt={recommendation.title} />
                                    </div>
                                    <h4>{recommendation?.stat_desc}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div
                        onClick={handleSlider}
                        className={
                            sliderArrow === "sliderOpen"
                                ? "recommendations-slide-arrow-os active"
                                : "recommendations-slide-arrow-os"
                        }
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#333333" />
                            <path
                                d="M6 15.5L12.5 9L19 15.5"
                                stroke="#333333"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
