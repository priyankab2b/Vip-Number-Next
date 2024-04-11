import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import "./ContactForm.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

// Images
import WhatsApp from "../../Assets/whats-app-icon.svg";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // whats app redirect
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=916009160092");
  };

  const handleValidation = () => {
    if (message.trim().split(/\s+/).length < 5) {
      setMessageError("Please enter at least 5 words in the message field.");
    } else {
      setMessageError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || email === "" || mobile === "" || message === "") {
        NotificationManager.error("Please fill in all the fields.");
      } else if (message.trim().split(/\s+/).length < 5) {
        NotificationManager.error(
          "Please enter at least 5 words in the message field."
        );
      } else {
        const response = await axios.post(
          "https://admin.leafymango.com/web/contact/us",
          {
            name,
            email,
            mobile,
            message,
          }
        );

        if (response.data.status === "success") {
          NotificationManager.success(
            response?.data?.message ||
              "Your message has been sent successfully!"
          );
          setName("");
          setEmail("");
          setMobile("");
          setMessage("");
        } else if (response.data.status === "error") {
          if (response?.data?.status) {
            NotificationManager.error(
              response.data.message || "enter valid data "
            );
          } else {
            NotificationManager.error(response?.data?.message || "error");
          }
        }
      }
    } catch (response) {
      if (response?.data?.message) {
        NotificationManager.error(response.data.data.message);
      }
      console.error(response);
    }
  };

  return (
    <section className="ContactForm-section-os">
      <div className="container-os">
        <div className="ContactForm-row-os">
          <div className="ContactForm-col-1-os">
            <div className="ContactForm-col-11-os">
              <div className="ContactForm-phone-number-row-os">
                <p>Phone:</p>
                <div className="footer-getInTouch-phone-whats-app-os">
                  <Link href="tel:+916009160092" onClick={openWhatsApp}>
                    +91-60091-60092
                  </Link>
                  <Link href="" className="whats-app-icon-os" onClick={openWhatsApp}>
                    <Image src={WhatsApp} alt="" />
                  </Link>
                </div>
              </div>

              <div className="ContactForm-phone-number-row-os">
                <p>Email ID:</p>
                <Link href="mailto:info@vipnumbershop.com">
                  info@vipnumbershop.com
                </Link>
              </div>

              <div className="ContactForm-phone-number-row-os">
                <p>Address</p>
                <Link
                  href={"https://goo.gl/maps/L7n5FXuYXQyx9BdQ6"}
                  target="_blank"
                >
                  VIP NUMBER SHOP & 99AID CommunicationSCO. No. 62, Shivalik
                  Enclave Opp. Geeta Mandir, Nr. Post Office Garha Road, Urban
                  Estate 1Jalandhar 144022
                </Link>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="ContactForm-col-2-os">
            <div className="ContactForm-input-field-os">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="ContactForm-input-field-os">
              <label>Email Address:</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ContactForm-input-field-os">
              <label>Mobile no.:</label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="ContactForm-input-field-os">
              <label>Message:</label>
              <textarea
                cols="30"
                rows="5"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleValidation();
                }}
              ></textarea>
              {messageError && (
                <div className="error-message">{messageError}</div>
              )}
            </div>
            <button type="submit" className="ContactForm-submit-btn-os">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
