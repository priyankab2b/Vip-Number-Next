'use client'
import React, { useState } from "react";
import "./MobileFooter.css";
import { NotificationManager } from "react-notifications";
import Link from "next/link";
import Image from "next/image";

// Images
// import brandIcon from '../../../Assets/mobile-footer-brand.svg';
import brandIcon from "../../Assets/VIP-icon-2.svg";
import headphoneIcon from "../../Assets/mobile-footer-headphone-icon.svg";
import locationIcon from "../../Assets/mobile-footer-location-icon.svg";
import facebookIcon from "../../Assets/mobileFooter-Facebook.png";
import instagramIcon from "../../Assets/mobileFooter-Instagram.png";
import twitterIcon from "../../Assets/mobileFooter-Twitter.png";
import card from "../../Assets/mobile-footer-cards.png";
import card1 from "../../Assets/footer-cards-img-1.png";
import card2 from "../../Assets/footer-cards-img-2.png";
import card3 from "../../Assets/footer-cards-img-3.png";
import card4 from "../../Assets/footer-cards-img-4.png";
import card5 from "../../Assets/footer-cards-img-5.png";
import linkedInIcon from "../../Assets/footer-linkeId.png";
import pintrestIcon from "../../Assets/footer-pintrest.png";
import youtubeIcon from "../../Assets/footer-youtube.png";
import WhatsApp from "../../Assets/whats-app-icon.svg";

const MobileFooter = () => {
  const [activeAccordion, setActiveAccordion] = useState("");
  const [email, setEmail] = useState("");

  // whats app redirect
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=916009160092");
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    const url = "https://admin.leafymango.com/web/newsletter";
    const payload = { email: email };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          NotificationManager.success("Email is successfully send");
          setEmail("");
        } else {
          NotificationManager.error("please enter valid email");
        }
      })
      .catch((error) => {
        NotificationManager.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  const handleAccordion = (activeLink) => {
    if (activeAccordion === activeLink) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(activeLink);
    }
  };

  return (
    <footer className="MobileFooter-section-os">
      <div className="mobile-NewsLetter-os">
        <div className="container-os">
          <div className="NewsLetter-col-1-os">
            <h2>Subscribe to our exclusive newsletter</h2>
            <form className="NewsLetter-inputs-os" onSubmit={submitNewsletter}>
              <input
                type="email"
                placeholder="Email"
                className="NewsLetter-email-input-os"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <section className="MobileFooter-gotQuestions-section">
        <div className="container-os">
          <div className="MobileFooter-gotQuestions-row-os">
            <div className="MobileFooter-gotQuestions-col-1-os">
              <Image src={brandIcon} alt="" />
            </div>

            <div className="MobileFooter-gotQuestions-col-2-os">
              <h2>Got Questions ? Call us 24/7!</h2>
              <div className="MobileFooter-gotQuestions-addresses-data-os">
                <div className="MobileFooter-gotQuestions-image-os">
                  <Image src={headphoneIcon} alt="" />
                </div>
                <div className="MobileFooter-gotQuestions-addresses-os">
                  <div className="footer-getInTouch-phone-whats-app-os">
                    <Link href="tel:+916009160092">+91-60091-60092</Link>
                    <Link href="" className="whats-app-icon-os" onClick={openWhatsApp}>
                      <Image src={WhatsApp} alt="" />
                    </Link>
                  </div>
                  <Link href="mailto:info@vipnumbershop.com">
                    <span>info@vipnumbershop.com</span>
                  </Link>
                </div>
              </div>

              <div className="MobileFooter-gotQuestions-addresses-data-os">
                <div className="MobileFooter-gotQuestions-image-os">
                  <Image src={locationIcon} alt="" />
                </div>
                <div className="MobileFooter-gotQuestions-addresses-os">
                  <Link
                    href="https://goo.gl/maps/L7n5FXuYXQyx9BdQ6"
                    target="_blank"
                  >
                    <span>
                      VIP NUMBER SHOP & 99AID Communication SCO. No. 62,
                      Shivalik EnclaveOpp. Geeta Mandir, Nr. Post Office Garha
                      Road, Urban Estate 1 Jalandhar 144022
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="MobileFooter-links-accordion-section-os">
        <div className="container-os">
          <div className="MobileFooter-links-accordion-row-os">
            <div className="MobileFooter-links-accordion-col-1-os">
              <div
                onClick={() => handleAccordion("active-link-1")}
                className={
                  activeAccordion === "active-link-1"
                    ? "MobileFooter-links-accordion-head-os active"
                    : "MobileFooter-links-accordion-head-os"
                }
              >
                Quick Links
                <span></span>
              </div>
              <div
                className={
                  activeAccordion === "active-link-1"
                    ? "MobileFooter-links-accordion-body-os active"
                    : "MobileFooter-links-accordion-body-os"
                }
              >
                <Link href="/">Home</Link>
                <Link href="/about">About us</Link>
                <Link href="/why-choose-us">Why Choose Us</Link>
                <Link href="/faq">FAQs</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>

            <div className="MobileFooter-links-accordion-col-1-os">
              <div
                onClick={() => handleAccordion("active-link-2")}
                className={
                  activeAccordion === "active-link-2"
                    ? "MobileFooter-links-accordion-head-os active"
                    : "MobileFooter-links-accordion-head-os"
                }
              >
                Terms & Policies
                <span></span>
              </div>
              <div
                className={
                  activeAccordion === "active-link-2"
                    ? "MobileFooter-links-accordion-body-os active"
                    : "MobileFooter-links-accordion-body-os"
                }
              >
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>

            <div className="MobileFooter-links-accordion-col-1-os">
              <div
                onClick={() => handleAccordion("active-link-3")}
                className={
                  activeAccordion === "active-link-1"
                    ? "MobileFooter-links-accordion-head-os active"
                    : "MobileFooter-links-accordion-head-os"
                }
              >
                WORKING DAYS/HOURS
                <span></span>
              </div>
              <div
                className={
                  activeAccordion === "active-link-3"
                    ? "MobileFooter-links-accordion-body-os active"
                    : "MobileFooter-links-accordion-body-os"
                }
              >
                <ul className="MobileFooter-links-accordion-body-list-os">
                  <li>10:00 AM TO 6:00 PM</li>
                  <li>(MON-SAT)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="MobileFooter-socialMedia-section-os">
        <div className="container-os">
          <div className="MobileFooter-socialMedia-links-os">
            <div className="MobileFooter-socialMedia-link-row-os">
              <Link
                href="https://www.facebook.com/vipnumbershop"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={facebookIcon} alt="" />
              </Link>
              <Link
                href="https://www.instagram.com/vip_number_shop_official/"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={instagramIcon} alt="" />
              </Link>
              <Link
                href="https://twitter.com/vipnumbersshop"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={twitterIcon} alt="" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/vip-number-shop/"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={linkedInIcon} alt="" />
              </Link>
              <Link
                href="https://www.pinterest.com/VIP_NUMBER_SHOP/"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={pintrestIcon} alt="" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
                className="MobileFooter-socialMedia-link-col-1-os"
                target="_blank"
              >
                <Image src={youtubeIcon} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="MobileFooter-coptRight-section-os">
        <div className="container-os">
          <div className="MobileFooter-coptRight-row-os">
            <p>We accept</p>
            <div className="MobileFooter-coptRight-accept-cards-row-os">
              <div className="MobileFooter-coptRight-accept-cards-os">
                <Image src={card1} alt="" />
              </div>
              <div className="MobileFooter-coptRight-accept-cards-os">
                <Image src={card2} alt="" />
              </div>
              <div className="MobileFooter-coptRight-accept-cards-os">
                <Image src={card3} alt="" />
              </div>
              <div className="MobileFooter-coptRight-accept-cards-os">
                <Image src={card4} alt="" />
              </div>
              <div className="MobileFooter-coptRight-accept-cards-os">
                <Image src={card5} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="MobileFooter-coptRight-data-os">
          <div className="container-os">
            <div className="MobileFooter-coptRight-text-os">
              VIP Number Shop © 2023. All Rights Reserved
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default MobileFooter;
