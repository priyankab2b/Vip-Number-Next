'use client'
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import MainHeading from "../../components/MainHeading/MainHeading";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import axios from "axios";
import { useGetQueryParams } from "../../utils";
import '../../home/FeaturedNumber/FeaturedNumber.css'

// Images
import crownIcon from "../../assets/crown-icon1.svg";
import brandIcon from "../../assets/VIP-icon-2.svg"; // replace with your loader icon
import Header from "@/app/components/Header/Header";

const CategoryWithSubCategories = ({ subCategory, id }) => {
    // const {subCategory, id} = params
    const { queryParams } = useGetQueryParams();
    const [selectedFilter, setSelectedFilter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState();
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [url, setUrl] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if (id) {
            let str = "";
            if (queryParams?.start_with) {
                str = str + "&startWith=" + queryParams?.start_with;
            }
            if (queryParams?.sort) {
                str = str + "&sort=" + queryParams?.sort;
            }
            if (queryParams?.total) {
                str = str + "&total=" + queryParams?.total;
            }
            if (queryParams?.sum) {
                str = str + "&sum=" + queryParams?.sum;
            }
            if (queryParams?.seller) {
                str = str + "&seller=" + queryParams?.seller;
            }
            if (queryParams?.min_price) {
                str = str + "&min_price=" + queryParams?.min_price;
            }
            if (queryParams?.max_price) {
                str = str + "&max_price=" + queryParams?.max_price;
            }
            axios
                .get(
                    "https://admin.leafymango.com/web/subcategory/search?&id=" +
                    id +
                    str +
                    `&page=${currentPage}&paginate=36`
                )
                .then((res) => {
                    setUrl(res?.data?.nextURL);
                    setSubCategoryList([...res?.data?.data]);
                    setDataLoaded(true);
                });
        }
    }, [id, queryParams, currentPage]);

    useEffect(() => {
        if (dataLoaded) {
            setSelectedFilter(subCategoryList);
            setFilteredData(subCategoryList);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [subCategoryList, dataLoaded]);

    const lazyload = () => {
        let str = "";
        if (queryParams?.start_with) {
            str = str + "&startWith=" + queryParams?.start_with;
        }
        if (queryParams?.sort) {
            str = str + "&sort=" + queryParams?.sort;
        }
        if (queryParams?.total) {
            str = str + "&total=" + queryParams?.total;
        }
        if (queryParams?.sum) {
            str = str + "&sum=" + queryParams?.sum;
        }
        if (queryParams?.seller) {
            str = str + "&seller=" + queryParams?.seller;
        }
        if (queryParams?.min_price) {
            str = str + "&min_price=" + queryParams?.min_price;
        }
        if (queryParams?.max_price) {
            str = str + "&max_price=" + queryParams?.max_price;
        }
        axios
            .get(
                url +
                "&id=" +
                id +
                str +
                `&page=${currentPage + 1}&paginate=36`
            )
            .then((res) => {
                setUrl(res?.data?.nextURL);
                setSubCategoryList([...subCategoryList, ...res?.data?.data]);
                setCurrentPage(currentPage + 1);
            });
    };

    // if (isLoading || !id || !subCategory) {
    //     return (
    //         <div className="loader-os">
    //             <Image src={brandIcon} alt="Loading..." />
    //         </div>
    //     );
    // }

    if (!isLoading && filteredData?.length === 0) {
        return <p style={{ textAlign: "center" }}></p>;
    }

    return (
        <div>
            <section className="SuggestionFeaturedNumber-section-os">
                <div className="container-os">
                    <Header />
                    <div className="featured-number-heading-os">
                        <MainHeading MainHeading={subCategory} rightImage={crownIcon} />
                    </div>
                    <div className="featured-number-row-os">
                        {filteredData && filteredData.map((items, index) => {
                            const formatPriceWithCommas = (price) => {
                                const options = {
                                    style: "decimal",
                                    useGrouping: true,
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                };
                                return parseFloat(price).toLocaleString("en-IN", options);
                            };

                            const formattedPrice = formatPriceWithCommas(items.unit_price);
                            const showComingSoon = items.rtp_date === null;
                            return (
                                <Card
                                    key={`${items.productid} + ${subCategory}`}
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
                                    coming_soon={showComingSoon ? null : "Coming Soon"}
                                    seller_type={items.seller_type}
                                    rtp_date={items.rtp_date}
                                    card_btn_text={items?.card_btn_text}
                                    buttonTitle="Buy Now"
                                />
                            );
                        })}
                    </div>
                    {url && (
                        <div className="default-loadMore-button-os">
                            <ViewMoreButton
                                title={"Load more"}
                                onClick={() => {
                                    lazyload();
                                }}
                            />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryWithSubCategories;