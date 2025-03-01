// 'use client'
// import React, { useState, useEffect, useContext } from "react";
// import Footer from "../Shared/Footer/Footer";
// import Header from "../Shared/Header/Header";
// import MobileFooter from "../Shared/MobileFooter/MobileFooter";
// import MobileHeader from "../Shared/MobileHeader/MobileHeader";
// import SuggestionBanner from "../suggestion/SuggestionBanner/SuggestionBanner";
// import Search from "../Shared/Search/Search";
// import FAQs from "../Shared/FAQs/FAQs";
// import OurCustomers from "../Shared/OurCustomers/OurCustomers";
// import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
// import QRVipApp from "../Shared/QRVipApp/QRVipApp";
// import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";

// import { useGetQueryParams } from "../utils";
// import CategoryWithSubCategories from "./CategoryWithSubCategories/CategoryWithSubCategories";
// import { Helmet } from "react-helmet";
// import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
// import FilterTabsCat from "../Shared/FilterTabs/FilterTabsCat";
// import CategoriesContent from "../Shared/CategoriesContent/CategoriesContent";
// // import axios from 'axios';

// // Images
// import RegisterImg1 from "../Assets/assurance-register-img.svg";

// export const SearchContext = React.createContext(null);
// const Category = ({ Seo }) => {
//   const { queryParams, params } = useGetQueryParams();
//   const { categoriesById, categoriesData } = useContext(AppStateContext);
//   const [data, setData] = useState();
//   const [searchResults] = useState([]);
//   const [seracPrice] = useState([]);
//   const [besSeach] = useState([]);
//   const [digit] = useState([]);
//   const [category, setCategoryId] = useState();

//   // useEffect(() => {
//   //   if (queryParams?.categoryId) {
//   //     getSubCategories(queryParams?.categoryId, queryParams).then((res) => {
//   //       setData(res?.data);
//   //     });
//   //   }
//   // }, [queryParams]);

//   useEffect(() => {
//     if (params?.slug && categoriesData?.length) {
//       for (let index = 0; index < categoriesData.length; index++) {
//         const element = categoriesData[index];
//         if (element?.detail?.slug === params.slug) {
//           setCategoryId(element);
//           break;
//         }
//       }
//     }
//   }, [params, categoriesData]);

//   console.log("categoriesById[category?.id]categoriesById[category?.id]", categoriesById[category?.id])

//   return (
//     <div className="Category-page-os">
//       <Helmet>
//         <title>{category?.detail?.title}</title>
//         <meta name="description" content={category?.detail?.description} />
//         {/* <title>{Seo?.meta_title}</title>
//             <meta name="description" content={Seo?.meta_description} /> */}
//       </Helmet>
//       <Header />
//       <MobileHeader />
//       <SuggestionBanner
//         headingText={`Category-${category?.name}`}
//         subHeading={`Get the best ${category?.name} VIP mobile numbers for India to bring you luck and success`}
//         buttonTitle="Contact Us"
//         buttonLink="/contact"
//       />
//       <SearchContext.Provider
//         className="ddd"
//         value={{ searchResults, seracPrice, besSeach, digit }}
//       >
//         <div className="defaultPage-search-section-os">
//           <Search />
//         </div>
//         <div className="container-os">
//           <div className="default-page-filterTabs-os">
//             <FilterTabsCat />
//           </div>
//         </div>
//       </SearchContext.Provider>

//       {category?.id &&
//         categoriesById[category?.id]?.map((subCategory) => (
//           <CategoryWithSubCategories
//             subCategory={subCategory?.name}
//             id={subCategory?.id}
//           />
//         ))}

//       {/* Category details */}
//       {category?.detail?.detail.length > 0 && (
//         <CategoriesContent
//           id={category?.id}
//           HTMLContent={category?.detail?.detail}
//         />
//       )}
//       <FAQs />
//       <OurCustomers />
//       <VideoTestimonial />
//       <RegisterVipNumber
//         image={RegisterImg1}
//         heading="Assurance of a refund"
//         subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
//         buttonText="Register"
//         buttonText1="Register"
//         buttonUrl="/register"
//         buttonUrl1="/register"
//       />
//       <QRVipApp />
//       <MobileFooter />
//       <Footer />
//     </div>
//   );
// };

// export default Category;