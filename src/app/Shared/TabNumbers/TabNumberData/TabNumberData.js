import React, { useEffect, useState } from "react";
import MainHeading from "../../MainHeading/MainHeading";
import ViewMoreButton from "../../../Shared/ViewMoreButton/ViewMoreButton";
import Card from "../../Card/Card";
import "./TabNumberData.css";
import "../../../home/FeaturedNumber/FeaturedNumber.css";
// import Image from "next/image";

// Images
import crown from "../../../Assets/heading-crown-icon.svg";
// import brandIcon from "../../../Assets/VIP-icon-2.svg";

const TabNumberData = ({ title, data, link, description }) => {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [platinumData, setPlatinumData] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  //   const Navigate = useNavigate();

  //   console.log("link ::", link)
  return (
    <section className="TabNumberData-section-os default-section-os">
      <div className="container-os">
        <div className="featured-number-heading-os">
          <MainHeading MainHeading={title} rightImage={crown} />
        </div>

        {data && data.length > 0 ? (
          <div className="featured-number-row-os">
            {data.slice(0, ITEMS_PER_PAGE).map((product, index) => {
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
                  key={index}
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
                  compare_at_price={product.compare_at_price}
                  comingsoon={product.comingsoon}
                  comingsoon_date={product.comingsoon_date}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}

        {/* {isLoading ? (
          <div className="loader-os">
            <Image src={brandIcon} alt="" />
          </div>
        ) : (
          <>
            {data && data.length >= ITEMS_PER_PAGE && (
              <div className="default-viewMore-btn-os">
                <ViewMoreButton
                  title={"View More"}
                  onClick={() => {
                    Navigate("/cart");
                  }}
                />
              </div>
            )}
          </>
        )} */}
        {/* {data.length > ITEMS_PER_PAGE && ( */}
        <div className="default-viewMore-btn-os">
          <ViewMoreButton
            title={"View More"}
            onClick={() => {
              // Navigate(`/${link}`);
              window.open(link, "_blank");
            }}
          />
        </div>
        {/* )} */}

        {description && (
          <div className="TabNumberData-description-os">{description}</div>
        )}
      </div>
    </section>
  );
};

export default TabNumberData;
