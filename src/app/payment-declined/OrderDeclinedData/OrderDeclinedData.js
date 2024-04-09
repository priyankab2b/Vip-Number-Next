import React, { useContext, useState, useEffect } from "react";
import "../OrderDeclined.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import OrderDeclinedOrderCard from "../OrderDeclinedOrderCard/OrderDeclinedOrderCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetQueryParams } from "../../utils";

// Images
import declinedIcon from "../../Assets/payment-declined-icon.svg";

const OrderDeclineddData = () => {
  const { cartItems, user } = useContext(AppStateContext);
  const { firstname, lastname } = user?.user || {};
  const [total, setTotal] = useState(0);
  const { queryParams } = useGetQueryParams();
  const Router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("vipDeclined")) {
      setTimeout(() => {
        localStorage.removeItem("vipDeclined");
      }, 3000);
    } else {
      Router.push("/");
    }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    localStorage.setItem("vipDeclined", true);
  };

  useEffect(() => {
    let count = 0;
    cartItems?.forEach((res) => {
      count = count + parseInt(res?.unit_price);
    });

    setTotal(count);
  }, [cartItems]);

  const getName = () => {
    if (firstname || lastname) {
      return `${firstname || ""} ${lastname || ""}`;
    } else {
      return false;
    }
  };

  useEffect(() => {
    /// api
  }, [queryParams]);
  return (
    <section className="OrderDeclined-section-os">
      <div className="container-os">
        <div className="OrderDeclined-main-row-os">
          <div className="OrderDeclined-status-row-os">
            <div className="OrderDeclined-status-col-1-os">
              <img src={declinedIcon} alt="" />
            </div>
            <div className="OrderDeclined-status-col-2-os">
              <h5>Payment Declined</h5>
              <p>Oh snap! The credit card inforamtion was declined</p>
            </div>
          </div>
          <div className="OrderDeclined-payment-row-os">
            <div className="OrderDeclined-payment-col-1-os">
              <div className="OrderDeclined-payment-data-os">
                <span className="heading-os">Total</span>
                <span className="subHeading-os">Rs. {total}</span>
              </div>
              <div className="OrderDeclined-payment-data-os">
                <span className="heading-os">Ship to</span>
                <span className="subHeading-os">{getName()}</span>
              </div>
            </div>
            <div className="OrderDeclined-payment-col-2-os">
              Order Id {queryParams?.orderId}
            </div>
          </div>
          <div className="OrderDeclined-product-row-os">
            <h5>Payment Failed</h5>

            <div className="OrderDeclined-product-row-1-os">
              <OrderDeclinedOrderCard total={total} />
            </div>

            <div className="WishListNumber-addtoCart-data-row-os">
              <div className="WishListNumber-addtoCart-data-col-1-os">
                <Link href="/place-order">Continue shopping</Link>
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
      </div>
    </section>
  );
};

export default OrderDeclineddData;
