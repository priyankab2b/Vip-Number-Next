import React from "react";
import "./BlogCard.css";
import blogProfile from "../../Assets/blog-profile-icon.svg";
import blogDate from "../../Assets/blog-date-icon.svg";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ image, profile, date, heading, paragraph }) => {
  return (
    <section className="BlogListCard-row-os">
      <div className="BlogListCard-col-os-1">
        <Image src={image} alt="" />
      </div>
      <div className="BlogListCard-col-os-2">
        <div className="BlogListCard-profile-date-row-os">
          <div className="BlogListCard-profile-os">
            <span>
              <Image src={blogProfile} alt="" />
            </span>
            {profile}
          </div>
          <div className="BlogListCard-date-os">
            <span>
              <Image src={blogDate} alt="" />
            </span>
            {date}
          </div>
        </div>
        <div className="BlogListCard-content-os">
          <h3>{heading}</h3>
          <p>{paragraph}</p>
          <Link href={"/"}>
            <div>
              Read More
              <span>
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.60657 4.66161L1 8.32321"
                    stroke="url(#paint0_linear_626_8561)"
                    strokeWidth="0.770033"
                  />
                  <path
                    d="M4.89844 1L9.50501 4.66161L4.89844 8.32321"
                    stroke="url(#paint1_linear_626_8561)"
                    strokeWidth="0.770033"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_626_8561"
                      x1="3.30329"
                      y1="1"
                      x2="3.30329"
                      y2="8.32321"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6019EB" />
                      <stop offset="1" stopColor="#FF6219" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_626_8561"
                      x1="7.20172"
                      y1="1"
                      x2="7.20172"
                      y2="8.32321"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6019EB" />
                      <stop offset="1" stopColor="#FF6219" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
