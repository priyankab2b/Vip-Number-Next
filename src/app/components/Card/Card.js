import React, { useState, useEffect, useContext } from "react";
import "./Card.css";
import '../../components/BuyNowButton/BuyNowButton.css'
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import moment from "moment";
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";
import { usePathname } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { Modal } from "antd";

function getStarIcons(rating) {
  const clampedRating = Math.max(1, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const halfStar = clampedRating % 1 !== 0;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
  }
  if (halfStar) {
    stars.push(<StarHalfIcon key="half" sx={{ color: "gold" }} />);
  }
  for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) {
    stars.push(<StarBorderIcon key={`border-${i}`} sx={{ color: "gold" }} />);
  }
  return stars;
}

const Card = (props) => {
  const { rating, productname } = props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const {
    addToCart,
    checkUser,
    addToWishList,
    wishListItem,
    setRedirectTo,
    setCartCache,
    cartItems,
    user,
    userProfile,
  } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const navigate = usePathname();
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [showModal, setShowModal] = useState(false);

  // Username
  const getName = () => {
    if (!user) {
      return false;
    }
    if (
      firstname ||
      lastname ||
      userProfile?.firstname ||
      userProfile?.lastname
    ) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else if (mobile || email) {
      return mobile || email;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(rtp_date) {
    const targetDate = moment(rtp_date, "YYYY-MM-DDTHH:mm:ss").toISOString(); // Parse and format to ISO format
    const now = moment();
    const diff = moment(targetDate).diff(now);

    if (diff < 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    const duration = moment.duration(diff);
    if (duration.asSeconds() <= 0) {
      return null; // Return null to indicate that timer should not be displayed
    }
    const days = Math.floor(duration.asDays());
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  let timeLefts = calculateTimeLeft(props.rtp_date);
  if (
    timeLefts &&
    timeLefts.days === "00" &&
    timeLefts.hours === "00" &&
    timeLefts.minutes === "00" &&
    timeLefts.seconds === "00"
  ) {
    timeLefts = null; // Set timeLefts to null to indicate that timer should not be displayed
  }
  let timeString = "";
  if (timeLefts) {
    // Check if timeLefts is not null
    if (timeLefts.days > 1) {
      timeString += `${timeLefts.days} days `;
    } else if (timeLefts.days === 1) {
      timeString += `${timeLefts.days} day `;
    }
    timeString += `${timeLefts.hours}:${timeLefts.minutes}:${timeLefts.seconds}`;
  }

  const handleBookNowClick = () => {
    if (timeString && props.rtp_date) {
      setShowModal(true);
    } else {
      // Perform the same logic as "Buy Now" flow
      if (!checkUser()) {
        setActiveSignInWithOtp(true);
        setCartCache({ ...props, number: props?.number });
        setRedirectTo("/place-order");
      } else {
        if (cartItems?.some((obj) => obj.number === props?.number)) {
          navigate("/place-order");
        } else {
          addToCart({ ...props, number: props?.number }, () => {
            navigate("/place-order");
          });
        }
      }
    }
  };

  const handleYesClick = () => {
    setShowModal(false);
    // Perform the same logic as "Buy Now" flow
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
      setCartCache({ ...props, number: props?.number });
      setRedirectTo("/place-order");
    } else {
      if (cartItems?.some((obj) => obj.number === props?.number)) {
        navigate("/place-order");
      } else {
        addToCart({ ...props, number: props?.number }, () => {
          navigate("/place-order");
        });
      }
    }
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{ paddingTop: props.rtp_date && timeLefts ? "3rem" : null }}
      className="number-card-os"
    >
      <div className="number-card-main-row-os">
        {props.rtp_date && timeLefts && (
          <div className="number-card-timer-data-os">
            <div className="number-card-timer">
              <span>{timeString} Left</span>
            </div>

            <div className="number-card-timer-discount-os">
              <span style={{ background: "red", color: "#fff" }}>
                {props.rtp_date && timeLefts ? "Coming Soon" : null}
              </span>
            </div>
          </div>
        )}
        <div className="number-card-price-data-os">
          <div className="number-card-price-review-stars-os">
            <div className="number-card-price-data-os11">
              <div className="number-card-price-review-stars-os">
                <div className="number-card-price-os">
                  {props.unit_price} /-
                </div>
              </div>
            </div>
            <div className="number-card-review-star-os">
              <span> {getStarIcons(Math.min(Math.max(rating, 1), 5))} </span>
            </div>
          </div>
          <div className="number-card-crown-wishlist-data-os">
            {props.seller_type === "PREMIUM" ? (
              <button type="button" className="number-card-crown-os">
                <span>
                  <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.8377 12.8639L0 1.8377L5.51309 5.51309L9.18848 0L12.8639 5.51309L18.377 1.8377L16.5393 12.8639H1.8377ZM2.86681 16.5393C2.24199 16.5393 1.8377 16.135 1.8377 15.5101V14.7016H16.5393V15.5101C16.5393 16.135 16.135 16.5393 15.5101 16.5393H2.86681Z"
                      fill="#F16C19"
                    />
                  </svg>
                </span>
              </button>
            ) : null}

            <button
              type="button"
              className={`number-card-crown-os wishlist-heart-os ${
                wishListItem?.some((item) => item.productname === productname)
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                if (getName()) {
                  addToWishList({ ...props });
                } else {
                  setActiveSignInWithOtp(true);
                }
              }}
            >
              <span>
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7435 18.8793L9.33069 17.5932C4.31279 13.043 1 10.0322 1 6.35892C1 3.34818 3.35793 1 6.35892 1C8.05429 1 9.68145 1.78922 10.7435 3.02665C11.8055 1.78922 13.4327 1 15.1281 1C18.1291 1 20.487 3.34818 20.487 6.35892C20.487 10.0322 17.1742 13.043 12.1563 17.5932L10.7435 18.8793Z"
                    stroke="#6019EB"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="number-card-vipNumber-data-os">
          <div
            className="number-card-vipNumber-os"
            onClick={() => {
              navigate("/pdp?productid=" + props?.product_id);
            }}
          >
            {props.productname}
          </div>
        </div>
        <div className="number-card-total-sum-cod-data-row-os">
          <div className="number-card-total-number-acknowledge-os">
            Total-{props.total}
          </div>
          <div className="number-card-total-sum-acknowledge-os">
            Sum-{props.sum}
          </div>
          <div
            className="number-card-total-cod-acknowledge-os"
            style={{ display: props.cod === "yes" ? "block" : "none" }}
          >
            <span>{props.cod}</span>
          </div>
        </div>
        <div className="number-card-buy-now-os">
          <div
            onClick={handleBookNowClick}
            className={`visit-store-button-os`}
            // onClick={() => {
            //   if (!checkUser()) {
            //     setActiveSignInWithOtp(true);
            //     setCartCache({ ...props, number: props?.number });
            //     setRedirectTo("/place-order");
            //   } else {
            //     if (cartItems?.some((obj) => obj.number === props?.number)) {
            //       navigate("/place-order");
            //     } else {
            //       addToCart({ ...props, number: props?.number }, () => {
            //         navigate("/place-order");
            //       });
            //     }
            //   }
            //   // addToCartButtonAnimation('buyNow-os');
            // }}
          >
            {/* {cartItems?.some((obj) => obj.number === props?.number)
              ? "Already in Cart"
              : "Buy Now"} */}
            {
              cartItems?.some((obj) => obj.number === props?.number)
                ? "Already in Cart"
                : timeString && props.rtp_date // Check if timeString and rtp_date are present
                ? "Book Now" // If both are present, display "Book Now" text
                : "Buy Now" // Otherwise, display "Buy Now" text
            }

            <span>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <Modal
            className="bookNow-modal-os LogoutModal-data-os"
            open={showModal}
            onCancel={handleNoClick}
            footer={[
              <button
                key="no"
                className="yes-logout"
                onClick={handleNoClick}
              >
                No
              </button>,
              <button
                key="yes"
                className="yes-logout"
                onClick={handleYesClick}
              >
                Yes
              </button>,
            ]}
          >
            <div className="LogoutModal-content-os">
              <p>Are you sure you want to proceed with the purchase of</p>
              <h3>{props.productname}?</h3>
              <p>It will be available after</p>
              <div className="bookNow-modal-leftTime-os">{timeString}</div>
            </div>
            {/* OLD */}

            {/* <p>
              Are you sure you want to proceed with the purchase of{" "}
              <strong className="color-of-product">{props.productname}</strong>?
            </p>
            {timeString && (
              <p>
                It will be available after:{" "}
                <strong className="color-of-product">{timeString}</strong>
              </p>
            )} */}
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Card;