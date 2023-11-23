import React, { useState, useContext, useEffect, useRef } from "react";
import "./PdpProduct.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
// import { useNavigate, useLocation } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useGetQueryParams } from "../../utils";

function getStarIcons(rating) {
    const clampedRating = Math.max(1, Math.min(5, rating));
    const fullStars = Math.floor(clampedRating);
    const halfStar = clampedRating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
    }
    if (halfStar) {
        stars.push(<StarHalfIcon key="half" sx={{ color: "gold" }} />);
    }
    for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) {
        stars.push(<StarBorderIcon key={`border-${i}`} sx={{ color: "gold" }} />);
    }
    return stars;
}

const PdpProduct = (props) => {
    const [product, setProduct] = useState({});
    const [productNumber, setProductNumber] = useState(null);
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    // register popup context
    const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
    const { queryParams } = useGetQueryParams();
    const navigate = useRouter();
    const location = usePathname();
    const isFetching = useRef(false);
    const {
        addToCart,
        checkUser,
        addToWishList,
        wishListItem,
        cartItems,
        setRedirectTo,
        user,
        userProfile,
    } = useContext(AppStateContext);

    useEffect(() => {
        const fetchProductData = async () => {
            const productId = queryParams?.productid;
            const number = queryParams?.number;
            if ((productId || number) && !isFetching.current) {
                isFetching.current = true;
                try {
                    const url = productId
                        ? `https://admin.leafymango.com/web/product?productid=${productId}`
                        : `https://admin.leafymango.com/web/product?number=${number}`;
                    const response = await axios.get(url);
                    const newProductNumber = response?.data?.data?.number;
                    setProduct(response?.data?.data);
                    setProductNumber(newProductNumber);
                } catch (error) {
                } finally {
                    isFetching.current = false;
                }
            }
        };

        fetchProductData();
    }, [queryParams]);

    useEffect(() => {
        if (productNumber) {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("number", productNumber);
            searchParams.delete("productid");
            const updatedSearch = searchParams.toString();

            // Replace the current history entry instead of adding a new one
            window.history.replaceState(null, "", `?${updatedSearch}`);
        }
    }, [productNumber, location]);

    const { email, firstname, lastname, mobile } = user?.user || {};
    // Username
    const getName = () => {
        if (!user) {
            return false;
        }
        if (
            firstname ||
            lastname ||
            userProfile?.firstname ||
            userProfile?.lastname
        ) {
            return `${userProfile?.firstname || firstname} ${userProfile?.lastname || lastname
                }`;
        } else if (mobile || email) {
            return mobile || email;
        } else {
            return false;
        }
    };

    const handleAddToCart = () => {
        if (!checkUser()) {
            setActiveSignInWithOtp(true);
        } else {
            if (!cartItems?.some((obj) => obj.number === product?.number)) {
                addToCart({ ...product, product_id: product?.productid });
                setAlreadyInCart(true);
            } else {
                NotificationManager.info("Already moved to cart!", "Warning");
            }
        }
    };
    return (
        <section className="PDP-product-section-os">
            <div className="container-os">
                <div className="PDP-product-row-os">
                    <div className="PDP-product-col-1-os">
                        <div className="PDP-product-col-11-os">
                            <div className="PDP-product-category-data-os">
                                Category:
                                <span>{product?.category}</span>
                            </div>
                            <div className="PDP-product-featured-number-os">
                                <span>{product?.productname}</span>
                            </div>
                        </div>
                    </div>

                    <div className="PDP-product-col-2-os">
                        <div key={product.number}>
                            <div className="PDP-product-comingsoon-tag-os">
                                {product?.coming_soon === "Coming Soon" ? "Coming Soon" : ""}
                            </div>
                            <div className="PDP-product-number-wishlist-row-os">
                                <div className="PDP-product-number-os">
                                    {product?.productname}
                                </div>
                                {/* <button
                  onClick={() => {
                    if (getName()) {
                      addToWishList({
                        ...product,
                        product_id: product?.productid,
                      });
                    } else {
                      setActiveSignInWithOtp(true);
                    }
                  }}
                  className={
                    wishListItem?.some(
                      (item) => item.productname === product?.productname
                    )
                      ? "PDP-product-wishlist-button-os active"
                      : "PDP-product-wishlist-button-os"
                  }
                >
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7435 18.8793L9.33069 17.5932C4.31279 13.043 1 10.0322 1 6.35892C1 3.34818 3.35793 1 6.35892 1C8.05429 1 9.68145 1.78922 10.7435 3.02665C11.8055 1.78922 13.4327 1 15.1281 1C18.1291 1 20.487 3.34818 20.487 6.35892C20.487 10.0322 17.1742 13.043 12.1563 17.5932L10.7435 18.8793Z"
                      stroke="#6019EB"
                      stroke-width="2"
                    ></path>
                  </svg>
                </button>  */}
                                <button
                                    onClick={() => {
                                        if (getName()) {
                                            addToWishList({
                                                ...product,
                                                product_id: product?.productid,
                                            });
                                        } else {
                                            setActiveSignInWithOtp(true);
                                        }
                                    }}
                                    className={
                                        product?.product_status === "sold"
                                            ? "PDP-product-wishlist-button-os disabled"
                                            : wishListItem?.some(
                                                (item) => item.productname === product?.productname
                                            )
                                                ? "PDP-product-wishlist-button-os active"
                                                : "PDP-product-wishlist-button-os"
                                    }
                                    disabled={product?.product_status === "sold"}
                                >
                                    <svg
                                        width="22"
                                        height="21"
                                        viewBox="0 0 22 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.7435 18.8793L9.33069 17.5932C4.31279 13.043 1 10.0322 1 6.35892C1 3.34818 3.35793 1 6.35892 1C8.05429 1 9.68145 1.78922 10.7435 3.02665C11.8055 1.78922 13.4327 1 15.1281 1C18.1291 1 20.487 3.34818 20.487 6.35892C20.487 10.0322 17.1742 13.043 12.1563 17.5932L10.7435 18.8793Z"
                                            stroke="#6019EB"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="PDP-product-price-data-row-os">
                            <>
                                <div className="PDP-product-price-data-col-1-os">
                                    <span className="PDP-product-price-os">
                                        {`Rs.${parseFloat(product.unit_price).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2,
                                            }
                                        )}`}
                                    </span>
                                    <span className="PDP-product-compareAtPrice-os">
                                        Rs.560.00
                                    </span>
                                    <span className="PDP-product-discount-tag-os">Discount</span>
                                </div>
                                <div className="PDP-product-price-data-col-2-os">
                                    <span>{getStarIcons(product.rating)}</span>

                                    <div className="PDP-product-review-text-os">123 Reviews</div>
                                </div>
                            </>
                        </div>

                        <div className="PDP-product-features-tags-row-os-os">
                            <div className="PDP-product-features-tags-col-1-os">
                                <div className="PDP-product-features-heading-os">Features</div>
                                <div className="PDP-product-features-total-sum-cod-row-os">
                                    <div className="PDP-product-features-total-sum-cod-col-1-os">
                                        <span className="PDP-product-total-os">Total</span>
                                        <span className="PDP-product-total-figure-os">
                                            {product.total}
                                        </span>
                                    </div>
                                    <div className="PDP-product-features-total-sum-cod-col-2-os">
                                        <span className="PDP-product-sum-os">Sum</span>
                                        <span className="PDP-product-sum-figure-os">
                                            {product.sum}
                                        </span>
                                    </div>
                                    {/* <div className="PDP-product-features-total-sum-cod-col-3-os">
                    <span className="PDP-product-cod-os">Cod</span>
                    <span className="PDP-product-cod-figure-os">
                      {product.cod === "YES" ? "YES" : "NO"}
                    </span>
                  </div> */}
                                </div>
                            </div>

                            <div className="PDP-product-features-tags-col-2-os">
                                <div className="PDP-product-features-tags-heading-os">Tags</div>
                                <div className="PDP-product-features-tags-name-row-os">
                                    {product?.sub_category?.split(" ")?.map((ele) => (
                                        <div className="PDP-product-features-tags-name-col-1-os">
                                            <span>{ele}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="PDP-product-buyNow-wishlist-button-os">
                            {product?.product_status === "sold" ? (
                                <button
                                    className="PDP-product-buyNow-btn-os sold"
                                    disabled={product?.product_status === "sold"}
                                >
                                    Sold
                                </button>
                            ) : (
                                <button
                                    className="PDP-product-buyNow-btn-os"
                                    onClick={() => {
                                        if (!checkUser()) {
                                            setActiveSignInWithOtp(true);
                                            addToCart(
                                                {
                                                    ...product,
                                                    number: product?.number,
                                                    product_id: product?.productid,
                                                },
                                                () => {
                                                    navigate.push("/place-order");
                                                }
                                            );
                                            setRedirectTo("/place-order");
                                        } else {
                                            if (
                                                cartItems?.some((obj) => obj.number === props?.number)
                                            ) {
                                                navigate.push("/place-order");
                                            } else {
                                                addToCart(
                                                    {
                                                        ...product,
                                                        number: product?.number,
                                                        product_id: product?.productid,
                                                    },
                                                    () => {
                                                        navigate.push("/place-order");
                                                    }
                                                );
                                            }
                                        }
                                    }}
                                >
                                    Buy Now
                                    <span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 1H2.60964C3.60873 1 4.39505 1.86033 4.31179 2.85016L3.54398 12.064C3.514 12.4209 3.55849 12.7802 3.67463 13.1191C3.79077 13.4579 3.97603 13.769 4.21867 14.0325C4.46132 14.296 4.75605 14.5062 5.08419 14.6499C5.41234 14.7935 5.76674 14.8675 6.12495 14.867H15.9771C17.3092 14.867 18.4748 13.7754 18.5766 12.4525L19.0761 5.5144C19.1871 3.97876 18.0215 2.7299 16.4766 2.7299H4.53381M7.47557 6.55049H18.5766M14.1824 19.5016C14.4891 19.5016 14.7832 19.3798 15.0001 19.163C15.2169 18.9461 15.3388 18.652 15.3388 18.3453C15.3388 18.0386 15.2169 17.7445 15.0001 17.5276C14.7832 17.3108 14.4891 17.1889 14.1824 17.1889C13.8757 17.1889 13.5816 17.3108 13.3648 17.5276C13.1479 17.7445 13.0261 18.0386 13.0261 18.3453C13.0261 18.652 13.1479 18.9461 13.3648 19.163C13.5816 19.3798 13.8757 19.5016 14.1824 19.5016ZM6.78176 19.5016C7.08845 19.5016 7.38257 19.3798 7.59943 19.163C7.81628 18.9461 7.93811 18.652 7.93811 18.3453C7.93811 18.0386 7.81628 17.7445 7.59943 17.5276C7.38257 17.3108 7.08845 17.1889 6.78176 17.1889C6.47508 17.1889 6.18096 17.3108 5.9641 17.5276C5.74724 17.7445 5.62541 18.0386 5.62541 18.3453C5.62541 18.652 5.74724 18.9461 5.9641 19.163C6.18096 19.3798 6.47508 19.5016 6.78176 19.5016V19.5016Z"
                                                stroke="white"
                                                strokeWidth="0.884105"
                                                stroke-miterlimit="10"
                                                strokeLinecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            )}
                            {/* <button
                className="PDP-product-addTocart-btn-os"
                onClick={handleAddToCart}
              >
                {cartItems?.some((obj) => obj.number === product?.number)
                  ? "Moved to Cart"
                  : "Add to Cart"}
                <span> */}
                            <button
                                className={
                                    product?.product_status === "sold"
                                        ? "PDP-product-addTocart-btn-os disabled"
                                        : "PDP-product-addTocart-btn-os"
                                }
                                onClick={handleAddToCart}
                                disabled={product?.product_status === "sold"}
                            >
                                {product?.product_status === "sold"
                                    ? "Add to Cart"
                                    : cartItems?.some((obj) => obj.number === product?.number)
                                        ? "Moved to Cart"
                                        : "Add to Cart"}
                                <span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 1H2.60964C3.60873 1 4.39505 1.86033 4.31179 2.85016L3.54398 12.064C3.514 12.4209 3.55849 12.7802 3.67463 13.1191C3.79077 13.4579 3.97603 13.769 4.21867 14.0325C4.46132 14.296 4.75605 14.5062 5.08419 14.6499C5.41234 14.7935 5.76674 14.8675 6.12495 14.867H15.9771C17.3092 14.867 18.4748 13.7754 18.5766 12.4525L19.0761 5.5144C19.1871 3.97876 18.0215 2.7299 16.4766 2.7299H4.53381M7.47557 6.55049H18.5766M14.1824 19.5016C14.4891 19.5016 14.7832 19.3798 15.0001 19.163C15.2169 18.9461 15.3388 18.652 15.3388 18.3453C15.3388 18.0386 15.2169 17.7445 15.0001 17.5276C14.7832 17.3108 14.4891 17.1889 14.1824 17.1889C13.8757 17.1889 13.5816 17.3108 13.3648 17.5276C13.1479 17.7445 13.0261 18.0386 13.0261 18.3453C13.0261 18.652 13.1479 18.9461 13.3648 19.163C13.5816 19.3798 13.8757 19.5016 14.1824 19.5016ZM6.78176 19.5016C7.08845 19.5016 7.38257 19.3798 7.59943 19.163C7.81628 18.9461 7.93811 18.652 7.93811 18.3453C7.93811 18.0386 7.81628 17.7445 7.59943 17.5276C7.38257 17.3108 7.08845 17.1889 6.78176 17.1889C6.47508 17.1889 6.18096 17.3108 5.9641 17.5276C5.74724 17.7445 5.62541 18.0386 5.62541 18.3453C5.62541 18.652 5.74724 18.9461 5.9641 19.163C6.18096 19.3798 6.47508 19.5016 6.78176 19.5016V19.5016Z"
                                            stroke="white"
                                            strokeWidth="0.884105"
                                            stroke-miterlimit="10"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {product?.product_status === "sold" && (
                                <button
                                    className="PDP-product-sold-button"
                                    onClick={() => {
                                        navigate.push("/");
                                    }}
                                >
                                    continue shopping
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PdpProduct;