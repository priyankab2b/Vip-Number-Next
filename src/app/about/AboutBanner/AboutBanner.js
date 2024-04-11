import React from "react";
import "../About.css";
import Link from "next/link";

const AboutBanner = () => {
  return (
    <div className="AboutBanner-section-os">
      <div className="container-os">
        <div className="about-page-text-bg-ud">
          <h1>
            About Us and
            <br /> Our Values
          </h1>
          <div className="about-us-btn-ud">
            <Link href="/contact">
              <button>
                Contact Us
                <span>
                  <span>
                    <svg
                      width="13"
                      height="11"
                      viewBox="0 0 13 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 1L6.9823 5.75513L1 10.5103" stroke="white" />
                      <path
                        d="M6.06195 1L12.0443 5.75513L6.06195 10.5103"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
