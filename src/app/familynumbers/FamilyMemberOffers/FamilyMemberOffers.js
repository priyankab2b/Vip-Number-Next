import React, { useState } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./FamilyMemberOffers.css";
//import FilterTabs from '../../Shared/FilterTabs/FilterTabs';
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
import { FamilyPackArrayDummyData } from "../../home/FamilyPack/FamlyDummyData";

// Images
import Crown from "../../Assets/crown-icon1.svg";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";

const FamilyMemberOffers = () => {
  const [selectFilter, setSelectFilter] = useState("filter-1-os");
  const handleSelectFilter = (activeFilter) => {
    setSelectFilter(activeFilter);
  };

  const [activeFilter, setActiveFilter] = useState();
  const handleFilterBtn = () => {
    if (activeFilter === "active") {
      setActiveFilter("");
    } else {
      setActiveFilter("active");
    }
  };

  const handleBuyNow = () => {
    alert("LoadMore is working");
  };

  return (
    <section className="FamilyMemberOffers-section-os">
      <div className="container-os">
        <div className="FamilyMemberOffers-heading-data-os">
          <div className="FamilyPack-select-variants-col-os">
            Family pack of
            <div className="FamilyPack-variant-selector-os">
              {/* <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select> */}
            </div>
          </div>
          <div className="FamilyMemberOffers-heading-os">
            <MainHeading MainHeading="Family Numbers" rightImage={Crown} />
          </div>
          {/* <FilterTabs /> */}
          <div className="FamilyPack-select-variants-col-os-1">
            Apply Filters
            <div className="FamilyPack-variant-selector-os-1">
              <select>
                <option value="0">Select</option>
                <option value="1">Hight to low</option>
                <option value="2">Low to high</option>
              </select>
            </div>
          </div>
        </div>
        <div className="FamilyMemberOffers-data-row-os">
          {FamilyPackArrayDummyData.map((items) => {
            return (
              <FamilyCard key={items.id} discountValue={items.discountValue} />
            );
          })}
        </div>
        <div className="default-loadMore-button-os">
          <BuyNowButton buttonTitle="Load More" onclickHandle={handleBuyNow} />
          <ViewMoreButton title={"Load more"} onClick={handleBuyNow} />
        </div>
      </div>
    </section>
  );
};

export default FamilyMemberOffers;
