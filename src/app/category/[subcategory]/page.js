"use client";
import React, { useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MobileFooter from "../../components/MobileFooter/MobileFooter";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import SuggestionBanner from "../../suggestion/SuggestionBanner/SuggestionBanner";
import Search from "../../components/Search/Search";
import FAQs from "../../components/FAQs/FAQs";
import OurCustomers from "../../components/OurCustomers/OurCustomers";
import VideoTestimonial from "../../components/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../../components/QRVipApp/QRVipApp";
import RegisterVipNumber from "../../home/RegisterVipNumber/RegisterVipNumber";

import { useGetQueryParams } from "../../utils";
import CategoryWithSubCategories from "../CategoryWithSubCategories/CategoryWithSubCategories";
import { Helmet } from "react-helmet";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import FilterTabsCat from "../../components/FilterTabs/FilterTabsCat";
import CategoriesContent from "../../components/CategoriesContent/CategoriesContent";
import "../../home/Home.css";
// import axios from 'axios';

// Images
import RegisterImg1 from "../../assets/assurance-register-img.svg";

export const SearchContext = React.createContext(null);
const Category = ({ Seo }) => {
  const { queryParams, params } = useGetQueryParams();
  const { categoriesById, categoriesData } = useContext(AppStateContext);
  const [data, setData] = useState();
  const [searchResults] = useState([]);
  const [seracPrice] = useState([]);
  const [besSeach] = useState([]);
  const [digit] = useState([]);
  const [category, setCategoryId] = useState();



  useEffect(() => {
    if (params?.subcategory && Array.isArray(categoriesData) && categoriesData?.length > 0) {
      for (let index = 0; index < categoriesData.length; index++) {
        const element = categoriesData[index];
        if (element?.detail?.slug === params.subcategory) {
          setCategoryId(element);
          break;
        }
      }
    }
  }, [params, categoriesData]);






  return (
    <div className="Category-page-os">
      <Helmet>
        <title>{category?.detail?.title}</title>
        <meta name="description" content={category?.detail?.description} />
        {/* <title>{Seo?.meta_title}</title>
            <meta name="description" content={Seo?.meta_description} /> */}
      </Helmet>
      <Header />
      <MobileHeader />
      <SuggestionBanner
        headingText={`Category-${category?.name}`}
        subHeading={`Get the best ${category?.name} VIP mobile numbers for India to bring you luck and success`}
        buttonTitle="Contact Us"
        buttonLink="/contact"
      />
      <SearchContext.Provider
        className="ddd"
        value={{ searchResults, seracPrice, besSeach, digit }}
      >
        <div className="defaultPage-search-section-os">
          <Search />
        </div>
        <div className="container-os">
          <div className="default-page-filterTabs-os">
            <FilterTabsCat />
          </div>
        </div>
      </SearchContext.Provider>

      {category?.id &&
        categoriesById[category?.id]?.map((subCategory, index) => {
          return (
            <CategoryWithSubCategories
              categoryName={category?.name}
              categoryId={category?.id}
              subCategory={subCategory?.name}
              id={subCategory?.id}
              key={index}
            />
          );
        })}

      {/* Category details */}
      {category?.detail?.detail?.length > 0 && (
        <CategoriesContent
          id={category?.id}
          HTMLContent={category?.detail?.detail}
        />
      )}
      <FAQs />
      <OurCustomers />
      <VideoTestimonial />
      <RegisterVipNumber
        image={RegisterImg1}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText="Register"
        buttonText1="Register"
        buttonUrl="/register"
        buttonUrl1="/register"
      />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default Category;
