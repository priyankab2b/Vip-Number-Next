import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeaturedNumber.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import CardSlider from "react-slick";

// Images
import crown from "../../Assets/heading-crown-icon.svg";
import Card from "../../Shared/Card/Card";
import brandIcon from "../../Assets/VIP-icon-2.svg";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";

const ITEMS_PER_PAGE = 36;

const FeaturedNumber = () => {
  const cardSliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [platinumData, setPlatinumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://admin.leafymango.com/web/featured/numbers?paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        setPlatinumData((prevData) => [...prevData, ...response.data.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handleViewMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="featured-number-section-os">
      <div className="container-os">
        <div className="featured-number-heading-os">
          <MainHeading MainHeading="Featured Number" rightImage={crown} />
        </div>

        {platinumData && platinumData.length > 0 ? (
          <div className="featured-number-row-os">
            {/* <h3>PLATINUM</h3> */}
            {platinumData.map((product, index) => {
              const vipNumbers = product.productname.split("-").join("");
              const total = vipNumbers
                .split("")
                .reduce((acc, num) => acc + parseInt(num), 0)
                .toString();
              const sum =
                total
                  .split("")
                  .reduce((acc, num) => acc + parseInt(num), 0)
                  .toString().length > 0
                  ? total
                      .split("")
                      .reduce((acc, num) => acc + parseInt(num), 0)
                      .toString()
                      .split("")
                      .reduce((acc, num) => acc + parseInt(num), 0)
                      .toString()
                  : total;
              const showCod = product.cod === "yes";
              const showComingSoon = product.rtp_date === null;
              const formatPriceWithCommas = (price) => {
                const options = {
                  style: "decimal",
                  useGrouping: true,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                };
                return parseFloat(price).toLocaleString("en-IN", options);
              };
              const formattedPrice = formatPriceWithCommas(product.unit_price);
              return (
                <Card
                  key={product.index}
                  product_id={product.productid}
                  productname={product.productname}
                  number={product.number}
                  rating={Math.floor(product.rating)}
                  cod={showCod ? product.cod : "cod"}
                  coming_soon={showComingSoon ? null : "Coming Soon"}
                  unit_price={formattedPrice}
                  total={product.total}
                  sum={product.sum}
                  card_btn_text={product.card_btn_text}
                  seller_type={product.seller_type}
                  rtp_date={product.rtp_date}
                  buttonTitle="Buy Now"
                />
              );
            })}
          </div>
        ) : ("")}
        {/* Mobile slider */}
        <div className="featured-number-mobile-data-os">
          <CardSlider {...cardSliderSettings}>
            {platinumData && platinumData.length > 0 ? (
              platinumData.map((product) => {
                const vipNumbers = product.productname.split("-").join("");
                const total = vipNumbers
                  .split("")
                  .reduce((acc, num) => acc + parseInt(num), 0)
                  .toString();
                const sum =
                  total
                    .split("")
                    .reduce((acc, num) => acc + parseInt(num), 0)
                    .toString().length > 0
                    ? total
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString()
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString()
                    : total;
                const showCod = product.cod === "yes";
                const showComingSoon = product.rtp_date === null;
                const formatPriceWithCommas = (price) => {
                  const options = {
                    style: "decimal",
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  };
                  return parseFloat(price).toLocaleString("en-IN", options);
                };
                const formattedPrice = formatPriceWithCommas(
                  product.unit_price
                );
                return (
                  <Card
                    key={product.productid}
                    product_id={product.productid}
                    productname={product.productname}
                    number={product.number}
                    rating={Math.floor(product.rating)}
                    cod={showCod ? product.cod : "cod"}
                    coming_soon={showComingSoon ? null : "Coming Soon"}
                    unit_price={formattedPrice}
                    total={product.total}
                    sum={product.sum}
                    card_btn_text={product.card_btn_text}
                    seller_type={product.seller_type}
                    rtp_date={product.rtp_date}
                    buttonTitle="Buy Now"
                  />
                );
              })
            ) : (
              <div className="loader-os">
                <img src={brandIcon} alt="" />
              </div>
            )}
          </CardSlider>
        </div>
        {isLoading ? (
          <div className="loader-os">
            <img src={brandIcon} alt="" />
          </div>
        ) : (
          <>
            {platinumData &&
              platinumData.length >= currentPage * ITEMS_PER_PAGE && (
                <div className="default-viewMore-btn-os">
                  <ViewMoreButton
                    title={"Load more"}
                    onClick={handleViewMoreClick}
                  />
                </div>
              )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedNumber;
