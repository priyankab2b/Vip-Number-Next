import React, { useContext, useState } from "react";
import WishlistNumberData from "../../components/WishlistNumberData/WishlistNumberData";
import "./WishListNumber.css";
import Link from "next/link";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";

const WishListNumber = () => {
    const { wishListItem } = useContext(AppStateContext);
    const [filterOption, setFilterOption] = useState("");
    const sortedWishlistItems = [...wishListItem].sort((a, b) => {
        if (filterOption === "highToLow") {
            return b.unit_price - a.unit_price;
        } else if (filterOption === "lowToHigh") {
            return a.unit_price - b.unit_price;
        } else {
            return 0;
        }
    });
    return (
        <section className="WishListNumber-section-os">
            <div className="container-os">
                <div className="WishListNumber-main-row-os">
                    <div className="WishListNumber-heading-data-os">
                        <h1>Wishlist</h1>

                        <div className="FamilyPack-select-variants-col-os-1">
                            Apply Filters
                            <div className="FamilyPack-variant-selector-os-1">
                                <select
                                    value={filterOption}
                                    onChange={(e) => setFilterOption(e.target.value)}
                                >
                                    <option value="highToLow"> High to Low</option>
                                    <option value="lowToHigh"> Low to High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {sortedWishlistItems?.map((res, index) => (
                        <WishlistNumberData {...res} index={index} />
                    ))}

                    <div className="WishListNumber-addtoCart-data-row-os">
                        <div className="WishListNumber-addtoCart-data-col-1-os">
                            <Link href="/">Continue shopping</Link>
                        </div>
                        <div className="WishListNumber-addtoCart-data-col-2-os">
                            <Link href="/cart">
                                Go to Cart
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
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishListNumber;