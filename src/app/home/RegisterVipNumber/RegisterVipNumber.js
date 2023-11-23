import React from "react";
import "./RegisterVipNumber.css";
import Image from "next/image";

const RegisterVipNumber = (props) => {
    return (
        <section className="vip-number-register-os default-section-os">
            <div className="container-os">
                <div className="vip-number-register-row-os">
                    <div className="vip-number-register-col-1-os">
                        <div className="vip-number-register-image-os">
                            <Image src={props.image} alt="" />
                        </div>
                        <div className="vip-number-register-content-os">
                            <h3>{props.heading}</h3>
                            <p>{props.subHeading}</p>
                        </div>
                    </div>
                    <div className="vip-number-register-col-2-os">
                        <button onClick={props.onClick}>{props.buttonText}</button>
                    </div>
                </div>
                <div className="vip-number-register-col-3-os">
                    <button onClick={props.onClick}>{props.buttonText1}</button>
                </div>
            </div>
        </section>
    );
};

export default RegisterVipNumber;