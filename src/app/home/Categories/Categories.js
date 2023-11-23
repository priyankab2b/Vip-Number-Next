import React, { useEffect, useState } from "react";
import "./Categories.css";
import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import MainHeading from "../../components/MainHeading/MainHeading";
import CategorySlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

// Image
import crown from "../../assets/heading-crown-icon.svg";
import brandIcon from "../../assets/VIP-icon-2.svg";

// slider
const categoriesSliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1028,
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
        dots: true,
        arrows: false,
      },
    },
  ],
};

const Categories = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get("https://admin.leafymango.com/web/category/stats")
      .then((response) => {
        setCategory(response?.data?.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <section className="Categories-section-os">
      <div className="container-os">
        <div className="Categories-heading-os">
          <MainHeading MainHeading="Categories" rightImage={crown} />
        </div>
        {category ? (
          <div className="Categories-row-os">
            <CategorySlider {...categoriesSliderSettings}>
              {category.map((items) => {
                return (
                  <Link
                    className="Categories-link-os"
                    // to={`/category?categoryId=${items.id}`}
                    href={items.link}
                    key={items.id}
                  >
                    <CategoriesCard
                      heading={items.stat_desc}
                      categoryNumber={items.category_name}
                      bgStyle={{
                        backgroundColor:
                          items.color === "purple"
                            ? "#1D5991"
                            : items.color === "blue"
                            ? "#ad2c0f"
                            : items.color === "red"
                            ? "#611AEC"
                            : "",
                      }}
                    />
                  </Link>
                );
              })}
            </CategorySlider>
          </div>
        ) : (
          <div className="loader-os">
            <Image src={brandIcon} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;