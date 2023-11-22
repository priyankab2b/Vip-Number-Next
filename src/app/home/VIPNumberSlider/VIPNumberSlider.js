import { useEffect, useState } from "react";
import "./VipNumberSlider.css";
import '../FeaturedNumber/FeaturedNumber.css'
import "../../components/ViewMoreButton/ViewMoreButton.css";
import MainHeading from "../../components/MainHeading/MainHeading";
import crown from "../../assets/heading-crown-icon.svg";
import Card from "../../components/Card/Card";
import CardSlider from "react-slick";

// Images
import brandIcon from "../../assets/VIP-icon-2.svg";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";

const VIPNumberSlider = () => {
  const [vipNumbers, setVipNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [nexturl, setnexturl] = useState();

  useEffect(() => {
    fetchVIPNumbers(currentPage);
  }, [currentPage]);

  const fetchVIPNumbers = (page) => {
    fetch(
      `https://admin.leafymango.com/web/vip/numbers?paginate=36&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newNumbers = [...vipNumbers, ...data.data];
        setVipNumbers(newNumbers);
        setTotalPages(data.total_pages);
        setIsLoading(false);
        setnexturl(data.nextURL);
      })
      .catch((error) => console.error(error));
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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

  return (
    <section className="vipNumber-slider-section-os">
      <div className="container-os">
        <div className="vipNumber-slider-heading-os">
          {/* <MainHeading MainHeading="VIP Mobile Number" rightImage={crown} /> */}
          <h1>VIP Mobile Number</h1>
          <div className="vipNumber-slider-heading-image-os">
            <img src={crown} alt='' />
          </div>
        </div>

        <div className="vipNumber-slider-main-row-os">
          {isLoading ? (
            <div className="loader-os">
              <img src={brandIcon} alt="" />
            </div>
          ) : (
            <CardSlider
              className="vipNumber-slider-row-os"
              {...cardSliderSettings}
            >
              {vipNumbers && vipNumbers.length > 0 ? (
                vipNumbers
                  .map((product) => {
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
                        card_btn_text={product.card_btn_text}
                        seller_type={product.seller_type}
                        rtp_date={product.rtp_date}
                        buttonTitle="Buy Now"
                      />
                    );
                  })
                  .concat()
              ) : (
                <p style={{ textAlign: "center" }}>Oops! No data found.</p>
              )}
            </CardSlider>
          )}
        </div>

        {/* vip-number as 2 card */}
        <div className="vipNumber-slider-mobile-os">
          {vipNumbers && vipNumbers.length > 0 ? (
            <div className="featured-number-row-os">
              {/* <h3>PLATINUM</h3> */}
              {vipNumbers.map((product) => {
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
              })}
            </div>
          ) : (
            ""
          )}

          {nexturl !== null && (
            <div className="default-viewMore-btn-os">
              <ViewMoreButton title={"Load more"} onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VIPNumberSlider;