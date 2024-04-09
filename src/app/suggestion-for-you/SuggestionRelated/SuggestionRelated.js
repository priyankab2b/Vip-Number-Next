import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../SuggestionFeaturedNumber/SuggestionFeaturedNumber.css";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import Card from "../../Shared/Card/Card";
import axios from "axios";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";

// Images
import crownIcon from "../../Assets/crown-icon1.svg";
import brandIcon from "../../Assets/VIP-icon-2.svg";

const SuggestionRelatedNumber = () => {
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showViewMore, setShowViewMore] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const mobileNumber = localStorage.getItem("mobileNumber");

  const fetchRelatedNumbers = async () => {
    try {
      const response = await axios.get(
        `https://admin.leafymango.com/web/related/numbers?numbers=${mobileNumber}&page=${page}&paginate=15`
      );

      if (response.status === 200) {
        const data = response.data.data;
        setRelatedNumbers((prevNumbers) => [...prevNumbers, ...data]);
        setLoading(false);
        setShowViewMore(data.length === 15);
        setDataNotFound(data.length === 0);
      }
    } catch (error) {
      console.error("Failed to fetch related numbers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedNumbers();
  }, [page]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="loader-os">
        <img src={brandIcon} alt="" />
      </div>
    );
  }

  return (
    <>
      {relatedNumbers.length !== 0 && (
        <section className="SuggestionFeaturedNumber-section-os default-section-os">
          <div className="container-os">
            <div className="SuggestionRelatedNumber-heading-os">
              <MainHeading
                MainHeading="Related Number"
                rightImage={crownIcon}
              />
            </div>
            {dataNotFound ? (
              <p style={{ textAlign: "center" }}>Oops! data not found.</p>
            ) : (
              <>
                <div className="featured-number-row-os">
                  {relatedNumbers.map((product) => {
                    // Extracted code for simplicity
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
                        cod={product.cod === "yes" ? product.cod : "cod"}
                        coming_soon={
                          product.rtp_date === null ? null : "Coming Soon"
                        }
                        unit_price={formattedPrice}
                        total={product.total}
                        sum={product.sum}
                        card_btn_text={product.card_btn_text}
                        seller_type={product.seller_type}
                        rtp_date={product.rtp_date}
                        buttonTitle="Buy Now"
                        comingsoon={product.comingsoon}
                        comingsoon_date={product.comingsoon_date}
                      />
                    );
                  })}
                </div>
                {showViewMore && (
                  <BuyNowButton
                    buttonUrl="#"
                    buttonTitle="View More"
                    onclickHandle={handleViewMore}
                  />
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SuggestionRelatedNumber;
