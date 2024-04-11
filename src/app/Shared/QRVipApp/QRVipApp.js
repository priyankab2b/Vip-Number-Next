import React from "react";
import "./QRVipApp.css";
import Image from "next/image";

// Images
import rightImg from "../../Assets/QRVipApp-right-img.svg";
import QRCodeImg from "../../Assets/vipQrPrepaid.png";

const QRVipApp = () => {
  return (
    <section className="QRVipApp-section-os">
      <div className="container-os">
        <div className="QRVipApp-row-os">
          <div className="QRVipApp-col-1-os">
            <div className="QRVipApp-heading-os">
              <h3>VIP Number Shop App for Our Customers</h3>
              <p>
                Download our app now to get a VIP number and Enjoy the exclusive
                welcome offers.
              </p>
            </div>
            <div className="QRVipApp-image-os">
              <Image src={QRCodeImg} alt="" />
            </div>
            <p>Scan the QR Code to Download the App now!</p>
          </div>
          <div className="QRVipApp-col-2-os">
            <Image src={rightImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRVipApp;
