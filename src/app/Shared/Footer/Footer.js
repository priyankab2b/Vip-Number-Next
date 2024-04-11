"use client";
import React, { useState, useEffect, useContext } from "react";
import "./Footer.css";
import NewsLetter from "../NewsLetter/NewsLetter";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { NotificationManager } from "react-notifications";
import Link from "next/link";
import Image from "next/image";

// Images
// import cardsImg from "../../../Assets/footer-cards-img.png";
import cardsImg1 from "../../Assets/footer-cards-img-1.png";
import cardsImg2 from "../../Assets/footer-cards-img-2.png";
import cardsImg3 from "../../Assets/footer-cards-img-3.png";
import cardsImg4 from "../../Assets/footer-cards-img-4.png";
import cardsImg5 from "../../Assets/footer-cards-img-5.png";
import facebookIcon from "../../Assets/footer-facebook.png";
import instagramIcon from "../../Assets/footer-instagram.png";
import twitterIcon from "../../Assets/footer-twitter.png";
import linkedInIcon from "../../Assets/footer-linkeId.png";
import pintrestIcon from "../../Assets/footer-pintrest.png";
import youtubeIcon from "../../Assets/footer-youtube.png";
import brandImg from "../../Assets/desktop-footer-logo.svg";
import WhatsApp from "../../Assets/whats-app-icon.svg";

// import { Link } from 'react-router-dom';

function getCurrentYear() {
  const year = new Date().getFullYear();
  return year;
}

const Footer = () => {
  const { categoriesData } = useContext(AppStateContext);
  const [email, setEmail] = useState("");

  const [category, setCategory] = useState();
  // console.log("category",category);
  const currentYear = getCurrentYear();
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const myDataString = localStorage.getItem("vipcre");
  let contactid = "";
  if (myDataString) {
    const myData = JSON.parse(myDataString);
    contactid = myData.user.contact_cf.contactid;
  }

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=916009160092");
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!contactid || contactid === "") {
      setActiveSignInWithOtp(true);
      return;
    }
    const url = "https://admin.leafymango.com/web/newsletter";
    const payload = { email: email, contactid: contactid };

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
          NotificationManager.success("Email is successfully sent");
          setEmail("");
        } else if (
          data.status === "error" &&
          data.message === "email already exist in list"
        ) {
          NotificationManager.error("Email already exists in the list");
        } else {
          NotificationManager.error("Please enter a valid email");
        }
      })
      .catch((error) => {
        NotificationManager.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData);
    }
  }, [categoriesData]);

  return (
    <footer className="desktopFooter-main-os">
      <NewsLetter />
      <section className="footer-section-os">
        <div className="container-os">
          <div className="footer-links-row-os">
            <div className="footer-col-1-os footer-brand-image-os">
              <Link href="/">
                <Image src={brandImg} alt="VIP Number Shop Logo" />
              </Link>
              <div className="NewsLetter-col-2-os">
                <div className="footer-links-heading-os">
                  Follow us on social media
                </div>
                {/* <h2>Follow us on social media</h2> */}
                <div className="NewsLetter-social-media-links-os">
                  <Link
                    href="https://www.facebook.com/vipnumbershop"
                    target="_blank"
                  >
                    <Image src={facebookIcon} alt="" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/vip_number_shop_official/"
                    target="_blank"
                  >
                    <Image src={instagramIcon} alt="" />
                  </Link>
                  <Link
                    href="https://twitter.com/vip_number_shop"
                    target="_blank"
                  >
                    <Image src={twitterIcon} alt="" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/vip-number-shop/"
                    target="_blank"
                  >
                    <Image src={linkedInIcon} alt="" />
                  </Link>
                  <Link
                    href="https://www.pinterest.com/VIP_NUMBER_SHOP/"
                    target="_blank"
                  >
                    <Image src={pintrestIcon} alt="" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
                    target="_blank"
                  >
                    <Image src={youtubeIcon} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="footer-col-2-os footer-quickLinks-os">
              <ul className="footer-quickLinks-list-os">
                <div className="footer-links-heading-os">Quick Links</div>
                <li>
                  <Link href="/">Home</Link>
                </li>
                {/* <li>
                  <Link href="/category">Categories</Link>
                </li> */}
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/why-choose-us">Why Choose Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                {/* <li>
                  <Link href="/blogs">Blogs</Link>
                </li> */}
              </ul>
            </div>

            <div className="footer-col-3-os footer-termsPolicies-Links-os">
              <ul className="footer-termsPolicies-links-list-os">
                <li>
                  <div className="footer-links-heading-os">
                    Terms & Policies
                  </div>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <div className="footer-links-heading-os footer-links-subHeading-os">
                    Working Days/Hours
                  </div>
                </li>
                <li>10:00 AM to 6:00 PM</li>
                <li>(Mon-Sat)</li>
              </ul>
            </div>

            <div className="footer-col-4-os footer-getInTouch-links-os">
              <ul className="footer-getInTouch-list-os">
                <li>
                  <div className="footer-links-heading-os">Get in touch</div>
                </li>
                <li className="footer-getInTouch-contact-data-os">
                  <div className="footer-getInTouch-phone-email-os">
                    <div className="footer-getInTouch-phone-whats-app-os">
                      <Link href="tel:+916009160092">+91-60091-60092</Link>
                      <Link
                        href={""}
                        className="whats-app-icon-os"
                        onClick={openWhatsApp}
                      >
                        <Image src={WhatsApp} alt="" />
                      </Link>
                    </div>
                    <Link href="mailto:info@vipnumbershop.com">
                      <span>info@vipnumbershop.com</span>
                    </Link>
                  </div>
                </li>
              </ul>

              <div className="NewsLetter-search-os">
                <div className="footer-links-heading-os">
                  Subscribe Newsletter
                </div>
                <form
                  className="NewsLetter-inputs-os"
                  onSubmit={submitNewsletter}
                >
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
        </div>
      </section>

      <section className="footer-categories-section-os">
        <div className="footer-categories-links-row-os">
          <div className="container-os">
            <div className="footer-links-heading-os">Categories</div>
            <ul className="footer-categories-links-list-os">
              {category &&
                category.map((e, i) => (
                  <React.Fragment key={e?.id}>
                    <Link
                      href={`/category/${
                        e?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
                      }`}
                    >
                      {e?.name}
                    </Link>
                    {i < category?.length - 1 && " | "}
                  </React.Fragment>
                ))}
            </ul>
          </div>
        </div>

        <div className="footer-categories-links-row-os">
          <div className="container-os">
            <div className="footer-links-heading-os">Cities & States</div>
            <div className="footer-cities-links-list-os">
              <Link href="/vip-mobile-number-in-punjab">Punjab |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-maharashtra">
                Maharashtra |
              </Link>
              &nbsp;
              <Link href="/fancy-mobile-numbers-in-karnataka">Karnataka |</Link>
              &nbsp;
              <Link href="/fancy-mobile-number-in-kerala">Kerala |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-gujarat">Gujarat |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-mumbai">Mumbai |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-haryana">Haryana |</Link>&nbsp;
              <Link href="/fancy-mobile-numbers-in-bangalore">Bangalore |</Link>
              &nbsp;
              <Link href="/fancy-mobile-numbers-in-chennai">Chennai |</Link>
              &nbsp;
              <Link href="/fancy-mobile-number-in-tamil-nadu">
                Tamil Nadu |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-himachal-pradesh">
                Himachal Pradesh |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-lucknow">Lucknow |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-ahmedabad">Ahmedabad |</Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-surat">Surat |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-delhi">Delhi |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-rajasthan">Rajasthan |</Link>
              &nbsp;
              <Link href="/fancy-mobile-number-in-hyderabad">Hyderabad |</Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-bihar">Bihar |</Link>&nbsp;
              <Link href="/fancy-mobile-number-in-odisha">Odisha |</Link>&nbsp;
              <Link href="/fancy-mobile-number-in-pune">Pune |</Link>&nbsp;
              <Link href="/vip-mobile-number-in-uttarakhand">
                Uttarakhand |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-uttar-pradesh">
                Uttar-Pradesh |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-madhya-pradesh">
                Madhya-Pradesh |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-number-in-chhattisgarh">
                Chhattisgarh |
              </Link>
              &nbsp;
              <Link href="/vip-mobile-numbers-in-chandigarh">Chandigarh</Link>
              &nbsp;
            </div>
          </div>
        </div>
        <div className="footer-categories-links-row-os">
          <div className="container-os">
            <div className="footer-links-heading-os">Telecom Operators</div>
            <div className="footer-cities-links-list-os">
              <Link href="/airtel-fancy-numbers">Airtel VIP Numbers |</Link>
              &nbsp;
              <Link href="/jio-fancy-numbers">Jio VIP Number |</Link>&nbsp;
              <Link href="/bsnl-fancy-numbers">BSNL Fancy Numbers |</Link>&nbsp;
              <Link href="/vi-fancy-number">VI Fancy Number |</Link>&nbsp;
              <Link href="/idea-fancy-numbers">IDEA Fancy Number</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-copyRight-section-os">
        <div className="container-os">
          <div className="footer-copyRight-row-os">
            <div className="footer-copyRight-col-1-os">
              VIP Number Shop © {currentYear}. All Rights Reserved
            </div>
            <div className="footer-copyRight-col-2-os">
              <span>We Accept</span>
              <div className="footer-copyRight-accept-cards-row-os">
                <div className="footer-copyRight-accept-cards-os">
                  <Image src={cardsImg1} alt="" />
                </div>
                <div className="footer-copyRight-accept-cards-os">
                  <Image src={cardsImg2} alt="" />
                </div>
                <div className="footer-copyRight-accept-cards-os">
                  <Image src={cardsImg3} alt="" />
                </div>
                <div className="footer-copyRight-accept-cards-os">
                  <Image src={cardsImg4} alt="" />
                </div>
                <div className="footer-copyRight-accept-cards-os">
                  <Image src={cardsImg5} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
