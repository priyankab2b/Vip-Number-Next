import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Card from "../../Shared/Card/Card";
import "../SuggestionFeaturedNumber/SuggestionFeaturedNumber.css";
import { getProfile } from "../../Services/Services";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";

// Image
import brandIcon from "../../assets/VIP-icon-2.svg";
import crown from "../../assets/heading-crown-icon.svg";

const ITEMS_PER_PAGE = 36;

const SuggestionUserHostory = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(AppStateContext);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactId, setContactId] = useState();

    useEffect(() => {
        setIsLoading(true);
        getProfile(user?.token)
            .then((res) => {
                setContactId(res?.contactid);
                return fetch(
                    `https://admin.leafymango.com/web/history/search?id=${res?.contactid}&paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
                );
            })
            .then((response) => response.json())
            .then((data) => {
                setData(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [currentPage, user]);

    const lastIndex = currentPage * ITEMS_PER_PAGE;
    const firstIndex = lastIndex - ITEMS_PER_PAGE;
    const currentData = data.slice(firstIndex, lastIndex);

    const handleViewMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const formatPriceWithCommas = (price) => {
        const options = {
            style: "decimal",
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        };
        return parseFloat(price).toLocaleString("en-IN", options);
    };

    return (
        <section className="FamilyPack-section-os SuggestionUserHostory-section-os">
            <div className="container-os">
                <div className="featured-number-heading-os">
                    <MainHeading MainHeading="Based on Your History " rightImage={crown} />
                </div>

                {isLoading ? (
                    <div className="loader-os">
                        <img src={brandIcon} alt="" />
                    </div>
                ) : (
                    <>
                        {currentData && currentData.length > 0 ? (
                            <div className="featured-number-row-os">
                                {currentData.map((product) => {
                                    const vipNumbers = product.productname?.split("-").join("");
                                    const total = vipNumbers
                                        ?.split("")
                                        .reduce((acc, num) => acc + parseInt(num), 0)
                                        .toString();
                                    const sum =
                                        total
                                            ?.split("")
                                            .reduce((acc, num) => acc + parseInt(num), 0)
                                            .toString().length > 0
                                            ? total
                                                ?.split("")
                                                .reduce((acc, num) => acc + parseInt(num), 0)
                                                .toString()
                                                ?.split("")
                                                .reduce((acc, num) => acc + parseInt(num), 0)
                                                .toString()
                                            : total;
                                    const showCod = product.cod === "yes";
                                    const show_coming_soon = product.coming_soon === "yes";
                                    const formattedPrice = formatPriceWithCommas(product.unit_price);

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
                        ) : (
                            <p style={{ textAlign: "center" }}>Oops! data not found.</p>
                        )}

                        {currentData && currentData.length >= ITEMS_PER_PAGE && (
                            <div className="default-viewMore-btn-os">
                                <BuyNowButton
                                    buttonUrl="#"
                                    buttonTitle="View More"
                                    onclickHandle={handleViewMore}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default SuggestionUserHostory;