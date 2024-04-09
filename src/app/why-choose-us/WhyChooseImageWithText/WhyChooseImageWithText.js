import React from "react";
import WhyChooseImageWithTextImg from "../../Assets/QRVipApp-right-img.svg";
import "./WhyChooseImageWithText.css";
import Link from "next/link";
import Image from "next/image";

const WhyChooseImageWithText = () => {
  return (
    <section className="WhyChooseImageWithText-section-os">
      <div className="container-os">
        <div className="WhyChooseImageWithText-row-os">
          <div className="WhyChooseImageWithText-col-1-os">
            <h1>
              What Are You Waiting For? Select Your Favourite VIP Number Today
              And Place The Order.
            </h1>
            <p>
              If you have questions or queries, please feel free to reach our
              customer care executive on the below-given credentials;
            </p>
            <h2>
              Phone Call/Whatsapp:{" "}
              <Link
                href="https://api.whatsapp.com/send?phone=916009160092"
                target="_blank"
              >
                +91-60091 60092
              </Link>
            </h2>
            <h2>
              Email -{" "}
              <Link href={"mailto:info@vipnumbershop.com"}>
                {" "}
                info@vipnumbershop.com
              </Link>
            </h2>
          </div>
          <div className="WhyChooseImageWithText-col-2-os">
            <Image src={WhyChooseImageWithTextImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseImageWithText;
