'use client'
import React from "react";
import "./OrderPlacement.css";
import Header from "../components/Header/Header";
import MobileFooter from "../components/MobileFooter/MobileFooter";
import OrderPlacementTabs from "./OrderPlacementTabs/OrderPlacementTabs";

const OrderPlacement = () => {
    return (
        <div className="OrderPlacement-page-os">
            <Header />
            <MobileFooter />
            <OrderPlacementTabs />
        </div>
    );
};

export default OrderPlacement;