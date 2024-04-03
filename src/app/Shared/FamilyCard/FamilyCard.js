// import React, { useState, useEffect, useContext } from "react";
// import "./FamilyCard.css";
// import { useRouter } from "next/navigation";
// // import { Link, useNavigate } from "react-router-dom";
// import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
// import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
// import moment from "moment";
// import { Modal } from "antd";

// const FamilyCard = ({ count, apiData }) => {
//     const navigate = useRouter();
//     // const { count, apiData } = props;
//     const [selectAll, setSelectAll] = useState(false);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//     const [showModal, setShowModal] = useState(false);
//     const {
//         addToCart,
//         checkUser,
//         addToWishList,
//         wishListItem,
//         setRedirectTo,
//         setCartCache,
//         cartItems,
//         user,
//         userProfile,
//     } = useContext(AppStateContext);
//     const { email, firstname, lastname, mobile } = user?.user || {};
//     const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);

//     //map all number of apiData
//     const mappedData = apiData.map((item) => item.number);
//     const mappedDataRtpDate = apiData.map((item) => item.rtp_date);

//     useEffect(() => {
//         if (selectAll) {
//             setSelectedItems(apiData.map((item) => item.productid));
//         } else {
//             setSelectedItems([]);
//         }
//     }, [apiData, selectAll]);

//     const handleCheckboxChange = (id) => {
//         const index = selectedItems.indexOf(id);
//         let newSelectedItems = [];
//         if (index === -1) {
//             newSelectedItems = [...selectedItems, id];
//         } else {
//             newSelectedItems = [
//                 ...selectedItems.slice(0, index),
//                 ...selectedItems.slice(index + 1),
//             ];
//         }

//         setSelectedItems(newSelectedItems);
//     };

//     const handleSelectAllChange = (event) => {
//         setSelectAll(event.target.checked);
//     };

//     const getTotalPrice = () => {
//         let totalPrice = 0;
//         apiData.forEach((item) => {
//             if (selectedItems.includes(item.productid)) {
//                 totalPrice += parseFloat(item.unit_price);
//             }
//         });
//         return totalPrice.toFixed(2); // rounds the total to 2 decimal places
//     };

//     const selectedCount = selectedItems.length;
//     const totalLength = apiData?.length;

//     //check if user logged in
//     const getName = () => {
//         if (!user) {
//             return false;
//         }
//         if (
//             firstname ||
//             lastname ||
//             userProfile?.firstname ||
//             userProfile?.lastname
//         ) {
//             return `${userProfile?.firstname || firstname} ${userProfile?.lastname || lastname
//                 }`;
//         } else if (mobile || email) {
//             return mobile || email;
//         } else {
//             return false;
//         }
//     };

//     //Timer function to buy now flow

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);
//         return () => clearTimeout(timer);
//     }, [timeLeft]);

//     function calculateTimeLeft(rtp_date) {
//         if (!rtp_date) return null;
//         const targetDate = moment(rtp_date, "YYYY-MM-DDTHH:mm:ss").toISOString(); // Parse and format to ISO format
//         const now = moment();
//         const diff = moment(targetDate).diff(now);

//         if (diff < 0) {
//             return {
//                 days: "00",
//                 hours: "00",
//                 minutes: "00",
//                 seconds: "00",
//             };
//         }
//         const duration = moment.duration(diff);
//         if (duration.asSeconds() <= 0) {
//             return null; // Return null to indicate that timer should not be displayed
//         }
//         const days = Math.floor(duration.asDays());
//         const hours = String(duration.hours()).padStart(2, "0");
//         const minutes = String(duration.minutes()).padStart(2, "0");
//         const seconds = String(duration.seconds()).padStart(2, "0");
//         return {
//             days: days,
//             hours: hours,
//             minutes: minutes,
//             seconds: seconds,
//         };
//     }
//     let timeLefts = calculateTimeLeft(apiData[0]?.rtp_date);
//     if (
//         timeLefts &&
//         timeLefts.days === "00" &&
//         timeLefts.hours === "00" &&
//         timeLefts.minutes === "00" &&
//         timeLefts.seconds === "00"
//     ) {
//         timeLefts = null; // Set timeLefts to null to indicate that timer should not be displayed
//     }
//     let timeString = "";
//     if (timeLefts) {
//         // Check if timeLefts is not null
//         if (timeLefts.days > 1) {
//             timeString += `${timeLefts.days} days `;
//         } else if (timeLefts.days === 1) {
//             timeString += `${timeLefts.days} day `;
//         }
//         timeString += `${timeLefts.hours}:${timeLefts.minutes}:${timeLefts.seconds}`;
//     }

//     const handleBookNowClick = () => {
//         const selectedProducts = apiData.filter((item) =>
//             selectedItems.includes(item.productid)
//         );
//         const items = selectedProducts.map((product) => ({
//             product_id: product.productid,
//             number: parseInt(product.number),
//             item_loc: "cart",
//         }));
//         if (timeString && apiData.rtp_date) {
//             setShowModal(true);
//         } else {
//             const items = apiData.map((item) => ({
//                 number: item.number,
//                 product_id: item.productid,
//                 item_loc: "cart",
//             }));

//             const updatedCartCache = {
//                 items,
//                 number: items.map((item) => item.number).join(),
//                 product_id: items.map((item) => item.product_id).join(),
//             };
//             if (!checkUser()) {
//                 setActiveSignInWithOtp(true);
//                 setCartCache(updatedCartCache);
//                 setRedirectTo("/place-order");
//             } else {
//                 if (cartItems?.some((obj) => obj.number === mappedData)) {
//                     navigate.push("/place-order");
//                 } else {
//                     addToCart({ items }, () => {
//                         navigate.push("/place-order");
//                     });
//                 }
//             }
//         }
//     };

//     const handleYesClick = () => {
//         setShowModal(false);
//         const items = apiData.map((item) => ({
//             number: item.number,
//             product_id: item.productid,
//             item_loc: "cart",
//         }));
//         const updatedCartCache = {
//             items,
//             number: items.map((item) => item.number).join(),
//             product_id: items.map((item) => item.product_id).join(),
//         };
//         if (!checkUser()) {
//             setActiveSignInWithOtp(true);
//             setCartCache(updatedCartCache);
//             setRedirectTo("/place-order");
//         } else {
//             if (cartItems?.some((obj) => obj.number === mappedData)) {
//                 navigate.push("/place-order");
//             } else {
//                 addToCart({ items }, () => {
//                     navigate.push("/place-order");
//                 });
//             }
//         }
//     };

//     const handleNoClick = () => {
//         setShowModal(false);
//     };

//     const groupedData = apiData.reduce((groups, item) => {
//         const key = item.seller_type;
//         if (!groups[key]) {
//             groups[key] = [];
//         }
//         groups[key].push(item);
//         return groups;
//     }, {});

//     const itemsNumber = apiData.map((item) => ({
//         number: item.number,
//     }));
//     const updatedCartCache = itemsNumber.map((item) => item.number).join();
//     // console.log(updatedCartCache)

//     return (
//         <div className="number-card-os family-card-os">
//             <div
//                 className="number-card-main-row-os"
//                 style={{ paddingTop: mappedDataRtpDate && timeLefts ? "3rem" : null }}
//             >
//                 {mappedDataRtpDate && timeLefts && (
//                     <div className="number-card-timer-data-os">
//                         <div className="number-card-timer">
//                             <span>{timeString} Left</span>
//                         </div>

//                         <div className="number-card-timer-discount-os">
//                             <span style={{ background: "red", color: "#fff" }}>
//                                 {mappedDataRtpDate && timeLefts ? "Coming Soon" : null}
//                             </span>
//                         </div>
//                     </div>
//                 )}
//                 <div className="number-card-price-data-os">
//                     <div className="number-card-crown-wishlist-data-os">
//                         {Object.keys(groupedData).map((sellerType) => {
//                             // Render the seller_type and wish list icon for each group
//                             const groupItems = groupedData[sellerType];
//                             return (
//                                 <div key={sellerType} className="item-buttons">
//                                     {sellerType === "PREMIUM" ? (
//                                         <button type="button" className="number-card-crown-os">
//                                             <span>
//                                                 <svg
//                                                     width="19"
//                                                     height="17"
//                                                     viewBox="0 0 19 17"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                     <path
//                                                         d="M1.8377 12.8639L0 1.8377L5.51309 5.51309L9.18848 0L12.8639 5.51309L18.377 1.8377L16.5393 12.8639H1.8377ZM2.86681 16.5393C2.24199 16.5393 1.8377 16.135 1.8377 15.5101V14.7016H16.5393V15.5101C16.5393 16.135 16.135 16.5393 15.5101 16.5393H2.86681Z"
//                                                         fill="#F16C19"
//                                                     />
//                                                 </svg>
//                                             </span>
//                                         </button>
//                                     ) : null}

//                                     <button
//                                         type="button"
//                                         className={`number-card-crown-os wishlist-heart-os ${wishListItem?.some((wishItem) =>
//                                             groupItems.some(
//                                                 (groupItem) =>
//                                                     groupItem.productname === wishItem.productname
//                                             )
//                                         )
//                                                 ? "active"
//                                                 : ""
//                                             }`}
//                                         onClick={() => {
//                                             if (getName()) {
//                                                 apiData.forEach((it) => {
//                                                     const newname = {
//                                                         product_id: it?.productid,
//                                                         number: parseInt(it?.number),
//                                                         item_loc: "wishlist",
//                                                     };
//                                                     addToWishList(newname);
//                                                 });
//                                             } else {
//                                                 setActiveSignInWithOtp(true);
//                                             }
//                                         }}
//                                     >
//                                         <span>
//                                             <svg
//                                                 width="22"
//                                                 height="21"
//                                                 viewBox="0 0 22 21"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M10.7435 18.8793L9.33069 17.5932C4.31279 13.043 1 10.0322 1 6.35892C1 3.34818 3.35793 1 6.35892 1C8.05429 1 9.68145 1.78922 10.7435 3.02665C11.8055 1.78922 13.4327 1 15.1281 1C18.1291 1 20.487 3.34818 20.487 6.35892C20.487 10.0322 17.1742 13.043 12.1563 17.5932L10.7435 18.8793Z"
//                                                     stroke="#6019EB"
//                                                     strokeWidth="2"
//                                                 />
//                                             </svg>
//                                         </span>
//                                     </button>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     <div className="familyPack-seclect-all-checkbox-os">
//                         <label className="container_checkbox-os">
//                             Select All
//                             <input
//                                 type="checkbox"
//                                 checked={selectAll}
//                                 onChange={handleSelectAllChange}
//                             />
//                             <span className="checkmark"></span>
//                         </label>
//                     </div>
//                 </div>
//                 <ul className="family-card-list-row-os">
//                     {apiData.map(
//                         (item, index) =>
//                             count >= index + 1 && (
//                                 <li key={item.productid}>
//                                     <label className="container_checkbox-os familyPack-selected-checkbox-os">
//                                         <div className="familyPack-selected-checkbox-col-os-1">
//                                             {item.productname}
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedItems.includes(item.productid)}
//                                                 onChange={() => handleCheckboxChange(item.productid)}
//                                             />
//                                             <span className="checkmark"></span>
//                                         </div>

//                                         <div className="familyPack-list-selected-price-os">
//                                             {`Rs.${parseFloat(item.unit_price).toLocaleString(
//                                                 "en-IN",
//                                                 {
//                                                     minimumFractionDigits: 0,
//                                                     maximumFractionDigits: 2,
//                                                 }
//                                             )}`}
//                                         </div>
//                                     </label>
//                                 </li>
//                             )
//                     )}
//                 </ul>

//                 <div className="family-card-plan-buyNow-btn-os">
//                     <div className="family-card-plan-price-os">
//                         Rs.
//                         {parseFloat(getTotalPrice()).toLocaleString("en-IN", {
//                             minimumFractionDigits: 0,
//                             maximumFractionDigits: 2,
//                         })}
//                         <div className="family-card-plan-by-selector-os">
//                             Selected
//                             <span>
//                                 {selectedCount}/{totalLength}
//                             </span>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleBookNowClick}
//                         type="button"
//                         className=""
//                         disabled={selectedItems.length === 0}
//                         style={{
//                             cursor: selectedItems.length === 0 ? "not-allowed" : "default",
//                         }}
//                     >
//                         {cartItems?.some((obj) => {
//                             const isNumberMatch = updatedCartCache.includes(obj.number);
//                             return isNumberMatch;
//                         })
//                             ? "Already in Cart"
//                             : timeString && mappedDataRtpDate
//                                 ? "Book Now"
//                                 : "Buy Now"}
//                         <span>
//                             <svg
//                                 width="18"
//                                 height="16"
//                                 viewBox="0 0 18 16"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
//                                     fill="white"
//                                 />
//                             </svg>
//                         </span>
//                     </button>
//                     <Modal
//                         className="bookNow-modal-os LogoutModal-data-os"
//                         open={showModal}
//                         onCancel={handleNoClick}
//                         footer={[
//                             <button key="no" className="yes-logout" onClick={handleNoClick}>
//                                 No
//                             </button>,
//                             <button key="yes" className="yes-logout" onClick={handleYesClick}>
//                                 Yes
//                             </button>,
//                         ]}
//                     >
//                         <div className="LogoutModal-content-os">
//                             <p>Are you sure you want to proceed with the purchase of</p>
//                             <h3>{apiData.productname}?</h3>
//                             <p>It will be available after</p>
//                             <div className="bookNow-modal-leftTime-os">{timeString}</div>
//                         </div>
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FamilyCard;




import React, { useState, useEffect, useContext } from "react";
import "./FamilyCard.css";
// import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import moment from "moment";
import { Modal } from "antd";

const FamilyCard = ({ count, apiData }) => {
  const navigate = useRouter();
  // const { count, apiData } = props;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([apiData[0]?.productid]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showModal, setShowModal] = useState(false);
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
  const { email, firstname, lastname, mobile } = user?.user || {};
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);

  //map all number of apiData
  const mappedData = apiData.map((item) => item.number);
  const mappedDataRtpDate = apiData.map((item) => item.rtp_date);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(apiData.map((item) => item.productid));
    } else {
      setSelectedItems([apiData[0]?.productid]);
    }
  }, [apiData, selectAll]);

  const handleCheckboxChange = (id) => {
    const index = selectedItems.indexOf(id);
    let newSelectedItems = [];
    if (index === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    apiData.forEach((item) => {
      if (selectedItems.includes(item.productid)) {
        totalPrice += parseFloat(item.unit_price);
      }
    });
    return totalPrice.toFixed(2); // rounds the total to 2 decimal places
  };

  const selectedCount = selectedItems.length;
  const totalLength = apiData?.length;

  //check if user logged in
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

  //Timer function to buy now flow

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  function calculateTimeLeft(rtp_date) {
    if (!rtp_date) return null;
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
  let timeLefts = calculateTimeLeft(apiData[0]?.rtp_date);
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

  // Book now button handle
  // const handleBookNowClick = () => {
  //   const selectedProducts = apiData.filter((item) =>
  //     selectedItems.includes(item.productid)
  //   );
  //   const items = selectedProducts.map((product) => ({
  //     product_id: product.productid,
  //     number: parseInt(product.number),
  //     item_loc: "cart",
  //   }));
  //   if (timeString && apiData.rtp_date) {
  //     setShowModal(true);
  //   } else {
  //     const items = apiData.map((item) => ({
  //       number: item.number,
  //       product_id: item.productid,
  //       item_loc: "cart",
  //     }));

  //     const updatedCartCache = {
  //       items,
  //       number: items.map((item) => item.number).join(),
  //       product_id: items.map((item) => item.product_id).join(),
  //     };
  //     if (!checkUser()) {
  //       // setActiveSignInWithOtp(true);
  //       setCartCache(updatedCartCache);
  //       // setRedirectTo("/place-order");
  //       navigate("/place-order");
  //     } else {
  //       if (cartItems?.some((obj) => obj.number === mappedData)) {
  //         navigate("/place-order");
  //       } else {
  //         addToCart({ items }, () => {
  //           navigate("/place-order");
  //         });
  //       }
  //     }
  //   }
  // };

  const handleBookNowClick = () => {
    const selectedProducts = apiData.filter((item) =>
      selectedItems.includes(item.productid)
    );

    const items = selectedProducts.map((product) => ({
      product_id: product.productid,
      number: parseInt(product.number),
      item_loc: "cart",
    }));
    // console.log("selectedProducts ::", selectedProducts);
    // console.log("items ::", items);
    // console.log("checkUser ::", checkUser);
    // console.log("apiData.rtp_date ::", apiData.rtp_date);
    // console.log("timeString ::", timeString);

    if (timeString && apiData.rtp_date) {
      setShowModal(true);
    } else {
      const updatedCartCache = {
        items,
        number: items.map((item) => item.number).join(),
        product_id: items.map((item) => item.product_id).join(),
      };

      if (!checkUser()) {
        setCartCache(updatedCartCache);
        navigate("/place-order");
        // console.log("if updatedCartCache");
        setRedirectTo("/place-order");
      } else {
        addToCart({ items }, () => {
          // navigate("/place-order");
        });
        // console.log("else updatedCartCache");
      }
    }
  };

  const handleYesClick = () => {
    setShowModal(false);
    const items = apiData.map((item) => ({
      number: item.number,
      product_id: item.productid,
      item_loc: "cart",
    }));
    const updatedCartCache = {
      items,
      number: items.map((item) => item.number).join(),
      product_id: items.map((item) => item.product_id).join(),
    };
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
      setCartCache(updatedCartCache);
      setRedirectTo("/place-order");
    } else {
      if (cartItems?.some((obj) => obj.number === mappedData)) {
        navigate("/place-order");
      } else {
        addToCart({ items }, () => {
          navigate("/place-order");
        });
      }
    }
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  const groupedData = apiData.reduce((groups, item) => {
    const key = item.seller_type;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  const itemsNumber = apiData.map((item) => ({
    number: item.number,
  }));
  const updatedCartCache = itemsNumber.map((item) => item.number).join();
  // console.log(updatedCartCache)

  return (
    <div className="number-card-os family-card-os">
      <div
        className="number-card-main-row-os"
        style={{ paddingTop: mappedDataRtpDate && timeLefts ? "3rem" : null }}
      >
        {mappedDataRtpDate && timeLefts && (
          <div className="number-card-timer-data-os">
            <div className="number-card-timer">
              <span>{timeString} Left</span>
            </div>

            <div className="number-card-timer-discount-os">
              <span style={{ background: "red", color: "#fff" }}>
                {mappedDataRtpDate && timeLefts ? "Coming Soon" : null}
              </span>
            </div>
          </div>
        )}
        <div className="number-card-price-data-os">
          <div className="number-card-crown-wishlist-data-os">
            {Object.keys(groupedData).map((sellerType) => {
              // Render the seller_type and wish list icon for each group
              const groupItems = groupedData[sellerType];
              return (
                <div
                  key={sellerType}
                  className="number-card-crown-wishlist-data-os"
                >
                  {sellerType === "PREMIUM" ? (
                    <>
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

                      <button
                        type="button"
                        className={`number-card-crown-os wishlist-heart-os ${
                          wishListItem?.some((wishItem) =>
                            groupItems.some(
                              (groupItem) =>
                                groupItem.productname === wishItem.productname
                            )
                          )
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          if (getName()) {
                            apiData.forEach((it) => {
                              const newname = {
                                product_id: it?.productid,
                                number: parseInt(it?.number),
                                item_loc: "wishlist",
                              };
                              addToWishList(newname);
                            });
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
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="familyPack-seclect-all-checkbox-os">
            <label className="container_checkbox-os">
              Select All
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <ul className="family-card-list-row-os">
          {/* {apiData.map(
            (item, index) =>
              count >= index + 1 && (
                <li key={item.productid}>
                  <label className="container_checkbox-os familyPack-selected-checkbox-os">
                    <div className="familyPack-selected-checkbox-col-os-1">
                      {item.productname}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.productid)}
                        onChange={() => handleCheckboxChange(item.productid)}
                      />
                      <span className="checkmark"></span>
                    </div>

                    <div className="familyPack-list-selected-price-os">
                      {`Rs.${parseFloat(item.unit_price).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }
                      )}`}
                    </div>
                  </label>
                </li>
              )
          )} */}

          {apiData
            .sort((a, b) => a.productname.localeCompare(b.productname))
            .map(
              (item, index) =>
                count >= index + 1 && (
                  <li key={item.productid}>
                    <label className="container_checkbox-os familyPack-selected-checkbox-os">
                      <div className="familyPack-selected-checkbox-col-os-1">
                        {item.productname}
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.productid)}
                          onChange={() => handleCheckboxChange(item.productid)}
                        />
                        <span className="checkmark"></span>
                      </div>

                      <div className="familyPack-list-selected-price-os">
                        {`Rs.${parseFloat(item.unit_price).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }
                        )}`}
                      </div>
                    </label>
                  </li>
                )
            )}
        </ul>

        <div className="family-card-plan-buyNow-btn-os">
          <div className="family-card-plan-price-os">
            Rs.
            {parseFloat(getTotalPrice()).toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            <div className="family-card-plan-by-selector-os">
              Selected
              <span>
                {selectedCount}/{totalLength}
              </span>
            </div>
          </div>
          <button
            onClick={handleBookNowClick}
            type="button"
            className=""
            disabled={selectedItems.length === 0}
            style={{
              cursor: selectedItems.length === 0 ? "not-allowed" : "default",
            }}
          >
            {cartItems?.some((obj) => {
              const isNumberMatch = updatedCartCache.includes(obj.number);
              return isNumberMatch;
            })
              ? "Already in Cart"
              : timeString && mappedDataRtpDate
              ? "Book Now"
              : "Buy Now"}
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
          </button>
          <Modal
            className="bookNow-modal-os LogoutModal-data-os"
            open={showModal}
            onCancel={handleNoClick}
            footer={[
              <button key="no" className="yes-logout" onClick={handleNoClick}>
                No
              </button>,
              <button key="yes" className="yes-logout" onClick={handleYesClick}>
                Yes
              </button>,
            ]}
          >
            <div className="LogoutModal-content-os">
              <p>Are you sure you want to proceed with the purchase of</p>
              <h3>{apiData.productname}?</h3>
              <p>It will be available after</p>
              <div className="bookNow-modal-leftTime-os">{timeString}</div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;