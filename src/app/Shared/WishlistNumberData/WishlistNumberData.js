import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import "./WishlistNumberData.css";
import { NotificationManager } from "react-notifications";

const WishlistNumberData = (props) => {
  //  // State to track whether removeFromWishList has been called
  const [removedFromWishlist, setRemovedFromWishlist] = useState(false);
  const { addToCart, removeFromWishList, updateWishlist } =
    useContext(AppStateContext);
  const Router = useRouter();
  const { productname, total, sum, unit_price } = props;

  // console.log( props?.productname,"product")

  // useEffect to call removeFromWishList when component mounts
  useEffect(() => {
    if (!props.productname && !removedFromWishlist) {
      removeFromWishList(props.id);
      setRemovedFromWishlist(true);
    }
  }, [props.productname, props.id, removedFromWishlist, removeFromWishList]);

  // Check if productname exists, if not, render nothing
  if (!props.productname) {
    return null;
  }

  return (
    <div className="WishListNumber-list-row-os" key={props.id}>
      <div className="WishListNumber-premium-tag-os">{props?.seller_type}</div>
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
              <span>Total-{total}</span>
              <span>Sum-{sum}</span>
            </div>
            <div className="WishListNumber-col-1-list-number-os">
              {productname}
            </div>
          </div>
          <div className="WishListNumber-col-2-os">
            <button
              onClick={() => {
                updateWishlist();
                addToCart({ ...props, number: props?.number }, () => {
                  Router.push("/place-order");
                });
              }}
            >
              Buy Now
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
            <div className="WishListNumber-addToCart-delete-btn-os">
              <button
                type="button"
                onClick={() => {
                  addToCart(props);
                  removeFromWishList(props?.id);
                }}
                className="WishListNumber-addToCart-btn-os"
              >
                Add To Cart
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
              <button
                type="button"
                onClick={() => {
                  removeFromWishList(props?.id);
                  NotificationManager.info("Item deleted successfully");
                }}
                className="WishListNumber-addToCart-btn-os"
              >
                Delete
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistNumberData;
