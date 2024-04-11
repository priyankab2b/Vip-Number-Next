import React, { useContext } from "react";
import Link from "next/link";
import CartProductData from "../CartProductData/CartProductData";
import "../../wishlist/WishListNumber/WishListNumber";
import "./CartProductList.css";
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";

const CartProductList = (props) => {
    const { cartItems } = useContext(AppStateContext);
    return (
        <section className="CartProductList-section-os">
            <div className="container-os">
                <div className="WishListNumber-main-row-os">
                    <div className="CartProductList-heading-os">Checkout</div>
                    {cartItems?.map((item, index) => {
                        const formattedPrice = parseFloat(item.unit_price).toFixed(2);
                        return (
                            <CartProductData
                                key={index}
                                index={index}
                                unit_price={formattedPrice}
                                productname={item.productname}
                                sum={item.sum}
                                total={item.total}
                                {...item}
                            />
                        );
                    })}

                    <div className="WishListNumber-addtoCart-data-row-os">
                        <div className="WishListNumber-addtoCart-data-col-1-os">
                            <Link href="/">Continue shopping</Link>
                        </div>

                        {cartItems && cartItems.length > 0 && (
                            <div className="WishListNumber-addtoCart-data-col-2-os">
                                <Link href="/place-order" >
                                    Checkout
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartProductList;