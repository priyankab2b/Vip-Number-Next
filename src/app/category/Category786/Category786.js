import React from "react";
import Card from "../../Shared/Card/Card";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";

// Images
import crownIcon from "../../assets/crown-icon1.svg";

const Category786 = () => {
    const Category00786Array = [
        {
            id: 1,
            discountValue: "30",
            price: "401",
            capareAtprice: "2345",
            VipNumber: "7501-143-143",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 2,
            discountValue: "50",
            price: "402",
            capareAtprice: "23455",
            VipNumber: "3333-444-555",
            total: "88",
            sum: "6",
            cod: "COD",
            card_btn_text: "Book Now",
        },
        {
            id: 3,
            discountValue: "300",
            price: "405",
            capareAtprice: "0",
            VipNumber: "2222-333-111",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Book Now",
        },
        {
            id: 4,
            discountValue: "400",
            price: "406",
            capareAtprice: "1000",
            VipNumber: "2222-333-222",
            total: "99",
            sum: "8",
            cod: "COD",
            card_btn_text: "Book Now",
        },
        {
            id: 5,
            discountValue: "30",
            price: "401",
            capareAtprice: "2345",
            VipNumber: "7501-143-143",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 6,
            discountValue: "50",
            price: "402",
            capareAtprice: "23455",
            VipNumber: "3333-444-555",
            total: "88",
            sum: "6",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 7,
            discountValue: "300",
            price: "405",
            capareAtprice: "0",
            VipNumber: "2222-333-111",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 8,
            discountValue: "300",
            price: "405",
            capareAtprice: "0",
            VipNumber: "2222-333-111",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 9,
            discountValue: "30",
            price: "401",
            capareAtprice: "2345",
            VipNumber: "7501-143-143",
            total: "77",
            sum: "5",
            cod: "COD",
            card_btn_text: "Buy Now",
        },
        {
            id: 10,
            discountValue: "50",
            price: "402",
            capareAtprice: "23455",
            VipNumber: "3333-444-555",
            total: "88",
            sum: "6",
            cod: "COD",
            card_btn_text: "Book Now",
        },
    ];
    const handleLoadMore = () => {
        alert("LoadMore is working");
    };
    return (
        <div>
            <section className="SuggestionFeaturedNumber-section-os">
                <div className="container-os">
                    <MainHeading MainHeading="786" rightImage={crownIcon} />
                    <div className="featured-number-row-os">
                        {Category00786Array.map((items) => {
                            return (
                                <Card
                                    key={items.id}
                                    discountValue={items.discountValue}
                                    price={items.price}
                                    capareAtprice={items.capareAtprice}
                                    productname={items.VipNumber}
                                    total={items.total}
                                    sum={items.sum}
                                    cod={items.cod}
                                    card_btn_text={items.card_btn_text}
                                    buttonTitle="Buy Now"
                                />
                            );
                        })}
                    </div>
                    <div className="default-loadMore-button-os">
                        <ViewMoreButton title={"Load more"} onClick={handleLoadMore} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Category786;