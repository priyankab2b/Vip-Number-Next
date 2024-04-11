import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./RelatedNumber.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Card from "../../Shared/Card/Card";
import crown from "../../Assets/heading-crown-icon.svg";
import { useGetQueryParams } from "../../utils";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";

const RelatedNumber = () => {
  const [nexturl, setNexturl] = useState();
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [productNumber, setProductNumber] = useState(null);
  const { queryParams } = useGetQueryParams();
  const [currentPage, setCurrentPage] = useState(1);
  const isFetching = useRef(false);
  const perPage = 36;

  // useEffect(() => {
  //   const fetchProductData = async () => {
  //    const productId = queryParams?.productid;
  //    const number = queryParams?.number;
  //    if ((productId || number) && !isFetching.current) {
  //      isFetching.current = true;
  //      try {
  //        const url = productId
  //          ? `https://admin.leafymango.com/web/product?productid=${productId}`
  //          : `https://admin.leafymango.com/web/product?number=${number}`;
  //        const response = await axios.get(url);
  //        const newProductNumber = response?.data?.data?.number;
  //        setProduct(response?.data?.data);
  //        setProductNumber(newProductNumber);
  //      } catch (error) {
  //      } finally {
  //        isFetching.current = false;
  //      }
  //    }
  //  };

  //    fetchProductData();
  //  }, [queryParams]);

  useEffect(() => {
    const fetchRelatedNumbers = async () => {
      const productId = queryParams?.productid;
      const number = queryParams?.number;
      if ((productId || number) && !isFetching.current) {
        isFetching.current = true;

        try {
          const url = productId
            ? `https://admin.leafymango.com/web/related/numbers?ids=${queryParams?.productid}&page=${currentPage}&paginate=${perPage}`
            : `https://admin.leafymango.com/web/related/numbers?numbers=${number}&page=${currentPage}&paginate=${perPage}`;

          const response = await fetch(url); // Fetch the data using the correct syntax
          const data = await response.json(); // Extract JSON data

          const newProductNumber = data?.data?.number; // Use 'data' instead of 'response.data'

          setRelatedNumbers(data.data);
          setProductNumber(newProductNumber);
          setNexturl(data.nextURL);
        } catch (error) {
          console.error(error);
        } finally {
          isFetching.current = false;
        }
      }
    };
    fetchRelatedNumbers();
  }, [queryParams, currentPage]);

  const handleLoadMore = async () => {
    if (!nexturl) return;
    try {
      const response = await axios.get(nexturl);
      const data = response.data;
      setNexturl(data.nextURL);
      setRelatedNumbers((prevNumbers) => [...prevNumbers, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreButton = nexturl && (
    <div className="default-loadMore-button-os">
      <ViewMoreButton title="Load more" onClick={handleLoadMore} />
    </div>
  );

  return (
    <>
      {relatedNumbers.length !== 0 && (
        <section className="RelatedNumber-section-os">
          <div className="container-os">
            <div className="RelatedNumber-heading-os">
              <MainHeading MainHeading="Related Number" rightImage={crown} />
            </div>
            <div className="related-number-row-os">
              {relatedNumbers &&
                relatedNumbers?.map((items) => {
                  const formattedPrice = parseFloat(
                    items.unit_price
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <Card
                      product_id={items.productid}
                      discountValue={items.discount}
                      unit_price={formattedPrice}
                      capareAtprice={items.capareAtprice}
                      productname={items.productname}
                      number={items.number}
                      total={items.total}
                      sum={items.sum}
                      rating={items.rating}
                      cod={items.cod ? "Yes" : "N/A"}
                      comming_soon={
                        items.coming_soon === "Coming Soon"
                          ? "Coming Soon"
                          : "Other Name"
                      }
                      seller_type={items.seller_type}
                      rtp_date={items.rtp_date}
                      card_btn_text={items?.card_btn_text}
                      buttonTitle="Buy Now"
                      comingsoon={product.comingsoon}
                      comingsoon_date={product.comingsoon_date}
                    />
                  );
                })}
            </div>

            <div className="default-loadMore-button-os">{loadMoreButton}</div>
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedNumber;
