"use client";
import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../Shared/MainSubHeading/MainSubHeading";
import "../../Shared/Card/Card.css";
import "./FamilyPack.css";
import axios from "axios";
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
import Image from "next/image";

// Slider
import FamilyPackSlider from "react-slick";

// Images
import crown from "../../Assets/heading-crown-icon.svg";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import brandIcon from "../../Assets/VIP-icon-2.svg";

//Pagination data per page
const ITEMS_PER_PAGE = 4;
const FamilyPack = () => {
  const [count, setCount] = useState(3);
  const [apiData, setApiData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //Load data per page function
  const loadMoreData = () => {
    //setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //Api data structure
  useEffect(() => {
    // Reset API data when the count changes
    setApiData({});
  }, [count]);

  //Api data structure
  useEffect(() => {
    axios
      .get(
        `https://admin.leafymango.com/web/familypack?fp_total=${count}&paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        //setApiData(response.data);
        setApiData((prevData) => ({
          ...prevData,
          ...response.data,
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [count, currentPage]);

  // slider
  const FamilyPackSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // Convert apiData to an array of items
  const apiDataArray = Object.values(apiData);

  // Check if there are more items to load
  const hasMoreData = apiDataArray.length > currentPage * ITEMS_PER_PAGE;

  return (
    <section className="FamilyPack-section-os">
      <div className="container-os">
        <div className="FamilyPack-heading-os">
          <MainHeading
            MainHeading="Family & Business Pack"
            rightImage={crown}
          />
          <MainSubHeading MainSubHeadingText="VIP Numbers are available for Two to Nine family or Business members" />
        </div>
        <div className="FamilyPack-select-variants-row-os">
          <div className="FamilyPack-select-variants-col-os">
            Family pack of
            <div className="FamilyPack-variant-selector-os">
              <select
                value={count}
                onChange={(e) => {
                  setIsLoading(true);
                  setCount(Number(e?.target?.value));
                }}
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loader-os">
              <Image src={brandIcon} alt="" />
            </div>
          ) : (
            <>
              {/* <div className="FamilyPack-plan-row-os">
                {apiDataArray.length != 0 ? {} : ""}
                {apiDataArray
                  .slice(0, currentPage * ITEMS_PER_PAGE)
                  .map((groupItems, index) => (
                    <FamilyCard
                      key={index}
                      count={count}
                      apiData={groupItems} // Pass the group's data as a prop
                    />
                  ))}
              </div> */}

              <div className="FamilyPack-plan-row-os">
                {apiDataArray.length !== 0 ? (
                  apiDataArray
                    .slice(0, currentPage * ITEMS_PER_PAGE)
                    .map((groupItems, index) => (
                      <FamilyCard
                        key={index}
                        count={count}
                        apiData={groupItems} // Pass the group's data as a prop
                      />
                    ))
                ) : (
                  <p className="data-not-found-message-os">
                    No family pack found
                  </p>
                )}
              </div>

              {hasMoreData && (
                <div className="default-viewMore-btn-os">
                  <ViewMoreButton title={"Load more"} onClick={loadMoreData} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FamilyPack;
