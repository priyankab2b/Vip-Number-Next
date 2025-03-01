import React, { useContext } from "react";
import "../../Shared/WishlistNumberData/WishlistNumberData.css";
import "./CartProductData.css";
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";

const CartProductData = (props) => {
    const { addToWishList, removeFromCart } = useContext(AppStateContext);
    // Calculate the total sum of the digits in props.number
    const numberString = props.number?.toString();
    const totalSum = numberString?.split("")?.reduce((partialSum, a) => partialSum + parseInt(a), 0);
    return (
        <div className="WishListNumber-list-row-os">
            <div className="WishListNumber-list-col-1-os">
                <div className="WishListNumber-price-os">
                    {`Rs.${parseFloat(props.unit_price).toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    })}`}
                </div>

                <div className="WishListNumber-row-1-os">
                    <div className="WishListNumber-col-1-os">
                        <div className="WishListNumber-col-1-total-sum-data-os">
                            <span>{`Total ${Number.isNaN(props.total) ? "NA" : props.total}`}</span>
                            <span>{`sum ${props.sum || "NA"}`}</span>
                        </div>
                        <div className="WishListNumber-col-1-list-number-os">
                            {props.productname}
                        </div>
                    </div>
                    <div className="WishListNumber-col-2-os">
                        <div className="WishListNumber-addToCart-delete-btn-os">
                            <button
                                type="button"
                                onClick={() => {
                                    addToWishList({ ...props });
                                }}
                                className="WishListNumber-addToCart-btn-os"
                            >
                                Move in
                                <span>
                                    <svg
                                        width="8"
                                        height="8"
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.77217 7.06959L3.77147 7.0689C2.73234 6.04189 1.90793 5.22467 1.33751 4.46405C0.773554 3.71204 0.5 3.06879 0.5 2.39782C0.5 1.28604 1.28323 0.5 2.2 0.5C2.72814 0.5 3.25655 0.770889 3.60717 1.21615L4 1.715L4.39283 1.21615C4.74345 0.770889 5.27186 0.5 5.8 0.5C6.71677 0.5 7.5 1.28604 7.5 2.39782C7.5 3.06879 7.22645 3.71204 6.66249 4.46405C6.09207 5.22467 5.26766 6.04189 4.22853 7.0689L4.22783 7.06959L4 7.29565L3.77217 7.06959Z"
                                            stroke="#8A8A8A"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <button
                                className="WishListNumber-addToCart-btn-os"
                                onClick={() => {
                                    removeFromCart(props?.id);
                                }}
                            >
                                Delete
                                <span>
                                    <svg
                                        width="9"
                                        height="12"
                                        viewBox="0 0 9 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.467386 3.05503L3.03454 2.72068C3.71578 2.63177 4.39701 2.54265 5.07825 2.45332C5.15939 2.44206 5.24115 2.43578 5.32307 2.43453C6.17461 2.43328 7.02626 2.43328 7.87801 2.43453C8.08777 2.43453 8.14162 2.49433 8.12847 2.70127C8.05876 3.82351 7.98957 4.94596 7.9209 6.06862C7.84639 7.27289 7.77147 8.47726 7.69612 9.68174C7.6789 9.95849 7.66043 10.2352 7.6454 10.512C7.6213 10.9522 7.34768 11.2136 6.90468 11.2136C5.61547 11.2136 4.32626 11.2136 3.03705 11.2136C2.57579 11.2136 2.11475 11.2136 1.65391 11.2136C1.2103 11.2136 0.936988 10.9553 0.910377 10.5148C0.816456 8.94759 0.722536 7.38059 0.628616 5.81379C0.575812 4.9372 0.522695 4.06008 0.469264 3.18245C0.465195 3.13987 0.467386 3.09698 0.467386 3.05503ZM4.43114 6.80871V4.1395C4.43255 4.10443 4.43192 4.06931 4.42926 4.03431C4.41893 3.94446 4.36664 3.89155 4.27679 3.88654C4.18694 3.88153 4.12903 3.93162 4.10868 4.01772C4.10275 4.05634 4.10107 4.0955 4.10367 4.13449C4.10367 5.91772 4.10367 7.70117 4.10367 9.48482C4.10085 9.52371 4.10264 9.5628 4.10899 9.60128C4.13059 9.68643 4.18538 9.73746 4.27773 9.73183C4.37009 9.72619 4.41861 9.67266 4.42926 9.58343C4.43192 9.54844 4.43255 9.51331 4.43114 9.47824V6.80871ZM2.83011 9.56903C2.83011 9.55401 2.82854 9.54618 2.8276 9.53773L2.61253 7.70002C2.51485 6.86267 2.41728 6.02521 2.31981 5.18765C2.27504 4.80383 2.2309 4.42001 2.183 4.0365C2.16922 3.92693 2.09471 3.86776 2.00236 3.87997C1.91 3.89218 1.84864 3.97044 1.86085 4.07469C1.94621 4.80769 2.03272 5.54037 2.12038 6.27274C2.21806 7.0982 2.31563 7.92386 2.4131 8.74973C2.44441 9.02116 2.47572 9.29259 2.5089 9.56371C2.52205 9.67297 2.59218 9.73903 2.68359 9.72932C2.7819 9.71931 2.82166 9.65356 2.83011 9.56903ZM6.70495 4.10851C6.71184 3.96543 6.66331 3.89531 6.56469 3.88529C6.46608 3.87527 6.39626 3.93444 6.38124 4.05403C6.34617 4.33579 6.31487 4.61975 6.28137 4.90245C6.1839 5.72811 6.08622 6.55315 5.98834 7.37756C5.9036 8.09448 5.81938 8.81141 5.73569 9.52834C5.72223 9.64448 5.77294 9.71993 5.86248 9.7312C5.95828 9.74341 6.0306 9.67829 6.04469 9.56121C6.10897 9.03463 6.17252 8.50784 6.23535 7.98084C6.33261 7.17521 6.43049 6.36959 6.529 5.56396C6.5888 5.07307 6.64766 4.58093 6.70495 4.10851Z"
                                            fill="#8A8A8A"
                                        />
                                        <path
                                            d="M2.5833e-07 2.04517C0.0103315 1.83103 0.0770149 1.5837 0.313068 1.44721C0.448 1.36863 0.620814 1.34358 0.780165 1.32198C1.46891 1.22806 2.15766 1.14103 2.84641 1.05086C3.77518 0.929392 4.70395 0.807504 5.63272 0.685199C6.36028 0.591279 7.08723 0.491097 7.81542 0.403438C8.18829 0.35773 8.53548 0.630725 8.60248 1.00296C8.62909 1.15386 8.6485 1.30539 8.57618 1.45065C8.48883 1.62659 8.35265 1.7393 8.15448 1.76372C6.78073 1.94425 5.4071 2.12448 4.03357 2.30439C2.92739 2.45048 1.82122 2.59658 0.715047 2.74268C0.283953 2.79778 -0.000312809 2.54075 2.5833e-07 2.04517Z"
                                            fill="#8A8A8A"
                                        />
                                        <path
                                            d="M5.62354 0.381772L2.84131 0.74587C2.88169 0.48665 3.14592 0.235569 3.43457 0.193618C3.90897 0.124743 4.38421 0.0621298 4.86028 0.00577758C5.18431 -0.0314775 5.4739 0.113473 5.62354 0.381772Z"
                                            fill="#8A8A8A"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductData;