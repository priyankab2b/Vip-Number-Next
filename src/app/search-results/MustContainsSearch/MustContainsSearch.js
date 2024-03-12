import React, { useState } from "react";
import MainHeading from "../../components/MainHeading/MainHeading";
import crown from "../../assets/heading-crown-icon.svg";
import Card from "../../components/Card/Card";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";

const MustContainsSearch = ({ results, page, nextPage }) => {
  return (
    <>
      {results.length !== 0 && (
        <section className="FamilyPack-section-os MustContainsSearch-section-os">
          <div className="container-os">
            <div className="featured-number-heading-os">
              <MainHeading
                MainHeading="Most Contains  Number"
                rightImage={crown}
              />
            </div>

            <div className="">
              {results && results.length > 0 ? (
                <div>
                  <div className="featured-number-row-os">
                    {results.map((product) => {
                      const vipNumbers = product.productname
                        .split("-")
                        .join("");
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
                        return parseFloat(price).toLocaleString(
                          "en-IN",
                          options
                        );
                      };

                      // ...

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
                            show_coming_soon
                              ? product.coming_soon
                              : "Coming Soon"
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
                  <div className="default-loadMore-button-os">
                    <ViewMoreButton
                      title="View More"
                      onClick={() => {
                        nextPage();
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p style={{ textAlign: "center" }}>Oops! No data found.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MustContainsSearch;
