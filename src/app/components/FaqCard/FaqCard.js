import React from "react";
import "./FaqCard.css";
import Image from "next/image";

const FaqCard = (props) => {
    return (
        <div className="FAQs-col-os">
            <div className="FAQs-col-image-os">
                <Image src={props.image} alt="" />
            </div>
            <h3>{props.heading}</h3>
            <p>{props.paragraph}</p>
        </div>
    );
};

export default FaqCard;