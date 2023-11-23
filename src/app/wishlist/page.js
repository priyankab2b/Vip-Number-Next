'use client'
import React, { useState } from "react";
import QRVipApp from "../components/QRVipApp/QRVipApp";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MobileFooter from "../components/MobileFooter/MobileFooter";
import MobileHeader from "../components/MobileHeader/MobileHeader";
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