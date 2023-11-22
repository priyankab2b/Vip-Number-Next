import React from "react";
import WhatsApp from "../../assets/whats-app-icon.svg";
import callIcon1 from "../../assets/call-icon.svg";
import Link from 'next/link'
import Image from 'next/image'
import '../MobileHeader/MobileHeader.css';

const CallUsPopup = ({ contactData }) => {


  const callPhone = (mobileNumber) => {
    const formattedNumber = mobileNumber.replace(/-/g, "");
    window.location.href = `tel:${formattedNumber}`;
  };

  const openWhatsApp = (mobileNumber) => {
    const formattedNumber = mobileNumber.replace(/-/g, "");
    window.open(`https://api.whatsapp.com/send?phone=${formattedNumber}`);
  };

  // For Robot whats app number
  const openWhatsApp1 = () => {
    window.open("https://api.whatsapp.com/send?phone=916009160092");
  };

  // For Robot call number
  const callPhone1 = () => {
    window.location.href = "tel:6009160092";
  };

  return (
    <section className={`MobileHeader-contact-us-section-os`}>
      <div className="MobileHeader-contact-us-content-os">
        <div className="MobileHeader-contact-us-content-heading-os">
          Contact Us
        </div>
        <ul className="MobileHeader-contact-us-content-list-os">
          {Array.isArray(contactData) &&
            contactData.map((contact, index) => (
              <li key={index}>
                <div className="MobileHeader-contact-us-content-col-1-os">
                  <div className="contact-us-profile-alphabet-os">D</div>
                  <div className="contact-us-profile-name-contact-num-os">
                    <span className="contact-us-profile-name-os">
                      {contact?.firstname}
                    </span>
                    <span className="contact-us-profile-contact-num-os">
                      {contact?.mobile}
                    </span>
                  </div>
                </div>
                <div className="MobileHeader-whatsapp-contact">
                  <button onClick={() => openWhatsApp(contact?.mobile)}>
                    <Image src={WhatsApp} alt="" />
                  </button>

                  <button onClick={() => callPhone(contact?.mobile)}>
                    <Image src={callIcon1} alt="" />
                  </button>
                </div>
              </li>
            ))}

          <li>
            <div className="MobileHeader-contact-us-content-col-1-os">
              <div className="contact-us-profile-alphabet-os">R</div>
              <div className="contact-us-profile-name-contact-num-os">
                <span className="contact-us-profile-name-os">Robot (24x7)</span>
                <span className="contact-us-profile-contact-num-os">
                  +9160091-60092
                </span>
              </div>
            </div>
            <div className="MobileHeader-whatsapp-contact">
              <button onClick={openWhatsApp1}>
                <Image src={WhatsApp} alt="" />
              </button>
              <button onClick={callPhone1}>
                <Image src={callIcon1} alt="" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CallUsPopup;