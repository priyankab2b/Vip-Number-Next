'use client'
import React, { useState } from "react";
import "./Cart.css";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import WishlistBanner from "../wishlist/WishlistBanner/WishlistBanner";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import Footer from "../Shared/Footer/Footer";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import CartProductList from "./CartProductList/CartProductList";

const Cart = () => {
    const [activeButton, setActiveButton] = useState("toggle-1-os");
    return (
        <div className="Cart-page-os">
            <Header />
            <MobileHeader />
            <WishlistBanner
                title="Your Shopping Cart"
                subHeading="Click the Buy Now Button to Place an Order"
                buttonTitle="Cart"
                buttonTitle1="Wishlist"
                buttonLink="/wishlist"
                buttonLink1="/wishlist"
                contactLink="/register"
                contactTitle="Contact Us"
                setActiveButton={activeButton}
            />
            <CartProductList />
            <QRVipApp />
            <MobileFooter />
            <Footer />
        </div>
    );
};

export default Cart;