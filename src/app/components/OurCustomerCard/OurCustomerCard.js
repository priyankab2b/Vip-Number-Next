import React from "react";
import "./OurCustomerCard.css";
import Image from "next/image";

const OurCustomerCard = (props) => {
    return (
        <div className="OurCustomerCard-os">
            <div className="OurCustomerCard-col-os">
                <div className="OurCustomerCard-image-os">
                    <Image src={props.Image} alt="" />
                </div>
                <p>{props.text}</p>
                <h5>{props.name}</h5>
            </div>
        </div>
    );
};

export default OurCustomerCard;