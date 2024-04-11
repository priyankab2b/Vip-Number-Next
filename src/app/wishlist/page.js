'use client'
import React, { useState } from "react";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import WishlistBanner from "./WishlistBanner/WishlistBanner";
import WishListNumber from "./WishListNumber/WishListNumber";

const WishList = () => {
    const [activeButton, setActiveButton] = useState("toggle-2-os");

    return (
        <div className="WishList-page-os">
            <Header />
            <MobileHeader />
            <WishlistBanner
                title="Wishlist"
                subHeading="Your Saved Products. Add to Cart to Make a Purchase"
                buttonTitle="Buy Now"
                buttonTitle1="Wishlist"
                buttonLink="/cart"
                buttonLink1="/wishlist"
                contactLink="/register"
                contactTitle="Contact Us"
                setActiveButton={activeButton}
            />
            <WishListNumber />
            <QRVipApp />
            <MobileFooter />
            <Footer />
        </div>
    );
};

export default WishList;