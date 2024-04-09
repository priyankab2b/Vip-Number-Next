import React, { useState } from "react";
import Card from "../../Shared/Card/Card";
import FilterTabs from "../../Shared/FilterTabs/FilterTabs";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";

// Images
import crownIcon from "../../../Assets/crown-icon1.svg";

const Category00786 = () => {
  const [selectedFilter, setSelectedFilter] = useState([
    {
      id: 1,
      discountValue: "30",
      price: "200",
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
      VipNumber: "6333-444-555",
      total: "88",
      sum: "6",
      cod: "COD",
      card_btn_text: "Book Now",
    },
    {
      id: 11,
      discountValue: "300",
      price: "11000",
      capareAtprice: "0",
      VipNumber: "9222-333-111",
      total: "77",
      sum: "5",
      cod: "COD",
      card_btn_text: "Book Now",
    },
    {
      id: 12,
      discountValue: "400",
      price: "700",
      capareAtprice: "1000",
      VipNumber: "8222-333-222",
      total: "99",
      sum: "8",
      cod: "COD",
      card_btn_text: "Book Now",
    },
  ]);

  const handleLoadMore = () => {
    alert("LoadMore is working");
  };
  return (
    <div>
      <section className="SuggestionFeaturedNumber-section-os default-section-os">
        <div className="container-os">
          <div className="SuggestionFeaturedNumber-heading-os">
            <MainHeading MainHeading="00786" rightImage={crownIcon} />
            <div className="SuggestionFeaturedNumber-selector-row-os">
              <FilterTabs
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>
          </div>
          <div className="featured-number-row-os">
            {selectedFilter?.map((items) => {
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
                  comingsoon={items.comingsoon}
                  comingsoon_date={items.comingsoon_date}
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

export default Category00786;
