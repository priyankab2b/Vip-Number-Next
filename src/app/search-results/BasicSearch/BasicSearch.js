import React, { useContext } from "react";
import MainHeading from "@/app/components/MainHeading/MainHeading"
import crown from "@/app/assets/heading-crown-icon.svg";
import Card from "@/app/components/Card/Card";
import ViewMoreButton from "@/app/components/ViewMoreButton/ViewMoreButton"
import { SearchContext } from "@/app/search-results/page";


const BasicSearch = ({ nextPage }) => {
  const { besSeach } = useContext(SearchContext);

  return (
    <div className="BasicSearch-section-os">
      {besSeach.length !== 0 && (
        <section className="vipNumber-slider-section-os">
          <div className="container-os">
            <div className="vipNumber-slider-heading-os">
              <MainHeading MainHeading="Premium Search" rightImage={crown} />
            </div>
            {besSeach?.length === 0 ? (
              <p style={{ textAlign: "center" }}>Oops! No data found.</p>
            ) : (
              <div className="featured-number-row-os">
                {besSeach?.map((product) => {
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
                  const show_coming_soon = product.coming_soon === "yes";
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
                      coming_soon={
                        show_coming_soon ? product.coming_soon : "Coming Soon"
                      }
                      unit_price={formattedPrice}
                      total={product.total}
                      sum={product.sum}
                      seller_type={product.seller_type}
                      rtp_date={product.rtp_date}
                      card_btn_text={product.card_btn_text}
                    />
                  );
                })}
              </div>
            )}
            {besSeach.length > 0 && nextPage && (
              <div className="default-loadMore-button-os">
                <ViewMoreButton
                  title={"Load more"}
                  onClick={() => {
                    nextPage();
                  }}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default BasicSearch;
