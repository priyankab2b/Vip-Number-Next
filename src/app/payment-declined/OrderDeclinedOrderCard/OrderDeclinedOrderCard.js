import React, { useContext } from "react";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";
import { useInitiatePaymentByRazorPay } from "../../Services/Wallat";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";

const OrderDeclinedOrderCard = ({ total }) => {
  const { initiate } = useInitiatePaymentByRazorPay();
  const { cartItems } = useContext(AppStateContext);

  return (
    <section className="OrderDeclinedOrderCard-section-os">
      {cartItems.map((item) => (
        <div key={item.productId} className="WishListNumber-list-row-os">
          <div className="WishListNumber-premium-tag-os">
            {item.seller_type}
          </div>
          <div className="WishListNumber-list-col-1-os">
            <div className="WishListNumber-price-os">
              {`Rs.${parseFloat(item.unit_price).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}`}
            </div>
            <div className="WishListNumber-row-1-os">
              <div className="WishListNumber-col-1-os">
                <div className="WishListNumber-col-1-total-sum-data-os">
                  <span>{item.total}</span>
                  <span>{item.sum}</span>
                </div>
                <div className="WishListNumber-col-1-list-number-os">
                  {item.productname}
                </div>
              </div>
              <div className="OrderDeclinedOrderCard-col-2-os">
                <BuyNowButton
                  buttonTitle="Retry Now"
                  onclickHandle={() => {}}
                  buttonUrl={"/place-order?isRetry=" + "ok"}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderDeclinedOrderCard;
