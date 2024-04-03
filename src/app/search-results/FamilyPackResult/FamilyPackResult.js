import React, { useState } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
// import './FamilyMemberOffers.css';
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
import { FamilyPackArrayDummyData } from "../../home/FamilyPack/FamlyDummyData";

// Images
import Crown from "../../Assets/crown-icon1.svg";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";

const FamilyPackResult = () => {
  const [numFamilyMembers, setNumFamilyMembers] = useState(1);

  const handleSelectChange = (event) => {
    setNumFamilyMembers(parseInt(event.target.value));
  };
  const handleBuyNow = () => {
    alert("LoadMore is working");
  };
  return (
    <>
      <div className="FamilyPackResult-section-os">
        <section className="FamilyMemberOffers-section-os">
          {/* <div className="container-os">
        <div className="FamilyMemberOffers-heading-data-os">
            <div className="FamilyPack-select-variants-col-os">Family pack of
                <div className="FamilyPack-variant-selector-os">
                    <select onChange={handleSelectChange} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
            </div>
            <div className="FamilyMemberOffers-heading-os">
                <MainHeading MainHeading='Family Numbers' rightImage={Crown} />
            </div>
           
                <div className="FamilyPack-select-variants-col-os-1">Apply Filters
                    <div className="FamilyPack-variant-selector-os-1">
                        <select>

                            <option value="1">Hight to low</option>
                            <option value="2">Low to high</option>
                        </select>
                    </div>
                </div>
            </></div><div className="FamilyMemberOffers-data-row-os">
                {FamilyPackArrayDummyData.slice(0, numFamilyMembers).map((item, index) => (
                    <FamilyCard key={index} {...item} />
                ))}
            </div><div className="default-loadMore-button-os">
                <BuyNowButton buttonTitle='Load More' onclickHandle={handleBuyNow} />
            </div></>
                </div> */}
        </section>
      </div>
    </>
  );
};

export default FamilyPackResult;
