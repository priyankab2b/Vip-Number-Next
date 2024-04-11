"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import SilverResult from "./SilverResult/SilverResult";
import GoldResult from "./GoldResult/GoldResult";
import BronzeResult from "./BronzeResult/BronzeResult";
import PlatinumResult from "./PlatinumResult/PlatinumResult";
import GlobalBasicResult from "./GlobalBasicResult/GlobalBasicResult";
import { SearchAPI, updateProfile } from "../Services/Services";
import Search from "../Shared/Search/Search";
import SearchByPrice from "./SearchByPrice/SearchByPrice";
import BasicSearch from "./BasicSearch/BasicSearch";
import AdvanceSearch from "./AdvanceSearch/AdvanceSearch";
import ExactDigitPlacementSearch from "./ExactDigitPlacementSearch/ExactDigitPlacementSearch";
import MustContainsSearch from "./MustContainsSearch/MustContainsSearch";
import SuggestionBanner from "../suggestion/SuggestionBanner/SuggestionBanner";
import { useGetQueryParams } from "../utils";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import FAQs from "../Shared/FAQs/FAQs";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import { NotificationManager } from "react-notifications";
import FamilyPackResult from "./FamilyPackResult/FamilyPackResult";
import FilterTabs from "../Shared/FilterTabs/FilterTabs";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import axios from "axios";
// Images
import RegisterImg1 from "../Assets/assurance-register-img.svg";
import {
  checkAscendingOrDescendingBy5,
  checkForSamePattern,
  count_repeating_digits,
} from "../utils/comman";
export const SearchContext = React.createContext(null);

const BannerText = {
  digit: {
    advanced: "Advanced Search",
    basic: "Premium Search",
    global: "Global Search",
    exactPlacement: "Exact Digit placement",
    mostContained: "Most Contained",
  },
  price: {
    price: "Search by Price",
  },
  family_pack: {
    family_pack: "Search for Family Pack",
  },
};

const SearchResults = () => {
  const { queryParams } = useGetQueryParams();
  const [searchResults, setSearchResults] = useState([]);
  const [seracPrice, setSearchprice] = useState([]);
  const [besSeach, setBesSearch] = useState([]);
  const [digit, setDigit] = useState([]);
  const [containSearch, setContainSearch] = useState([]);
  const [adSearch, SetAdSearch] = useState([]);
  const [familyPack, SetFamilyPack] = useState([]);
  const { user, setRedirectTo, userProfile } = useContext(AppStateContext);
  const Router = useRouter();
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const [nextPage, setNextPage] = useState();
  const [searchNextUrl, setsSearchNextUrl] = useState();
  const [lazy, setLazy] = useState();
  const [familyPackParamDigit, setFamilyPackParamDigit] = useState(null);

  useEffect(() => {
    setFamilyPackParamDigit(queryParams?.fp_total);
  }, [queryParams]);

  const resetAll = () => {
    setSearchResults();
    setSearchprice();
    setBesSearch();
    setDigit();
    setContainSearch();
    SetAdSearch();
    SetFamilyPack();
  };

  useEffect(() => {
    const storedResLength = localStorage.getItem("resLength");
    const initialBasicChecked =
      storedResLength && parseInt(storedResLength, 10) <= 2;
    if (queryParams) {
      let params = { ...queryParams };
      delete params.type;
      delete params.searchBy;
      delete params.callCount;
      delete params.page;
      if (queryParams?.type === "basic") {
        params.seller = queryParams?.seller || "PREMIUM";
        // params.seller = initialBasicChecked ? "BASIC,PREMIUM" : "PREMIUM";
        const { min_price, max_price, sort, seller, sum, total } = params;
        params = {
          [params?.basicSearchtype]: params.number,
          min_price,
          max_price,
          sort,
          seller,
          sum,
          total,
        };
      }
      if (
        queryParams?.type === "advanced" ||
        queryParams?.searchBy === "price" ||
        queryParams?.type === "global" ||
        queryParams?.type === "exactPlacement" ||
        queryParams?.type === "mostContained"
      ) {
        params.seller = queryParams?.seller || "PREMIUM";
        // params.seller = initialBasicChecked ? "BASIC,PREMIUM" : "PREMIUM";
      }

      resetAll();
      SearchAPI(
        queryParams?.type || queryParams?.searchBy,
        params,
        userProfile,
        queryParams?.page,
        setLazy
      )?.then((res) => {
        // Save the length of the res array in localStorage
        if (res?.data) {
          const resLength = res.data.length;
          localStorage.setItem("resLength", resLength);
        }

        setsSearchNextUrl(res?.nextURL);
        if (
          res?.bronze?.data?.length === 0 &&
          res?.globalBasic?.data?.length &&
          res?.gold?.data?.length === 0 &&
          res?.platinum?.data?.length === 0 &&
          res?.silver?.data?.length === 0
        ) {
          // If following the first pattern same pattern eg. 1234512345
          if (checkForSamePattern(params?.number)) {
            console.log("fisrt condition check :::");
            Router.push(
              `https://www.vipnumbershop.com/category/customer-care-numbers`
            );
          }
          // if following the second conditions repeating eg. 4242424242
          else if (count_repeating_digits(params?.number)) {
            Router.push(
              `https://www.vipnumbershop.com/category/xy-xy-fancy-mobile-number`
            );
          }
          // if following the third conditions eg. 7071727374
          else if (checkAscendingOrDescendingBy5(params?.number)) {
            Router.push(
              `https://www.vipnumbershop.com/category/ascending-descending-fancy-number`
            );
          }
        } else {
          updateProfile(
            {
              user_blocked_price: true,
              user_min_price: queryParams?.min_price,
              user_max_price: queryParams?.max_price,
            },
            user?.token
          )
            .then((res) => {})
            .catch((error) => {
              console.error("Error Price Blocked:", error);
            });
          if (!res && !queryParams?.searchBy === "family_pack") {
            NotificationManager.error(
              "Something went wrong. Please try again laterrrrrrrrr"
            );
          }

          setNextPage(res?.nextURL);
          if (queryParams?.type === "advanced") {
            SetAdSearch(res.data);
          } else if (queryParams?.type === "basic") {
            setBesSearch(res.data);
          } else if (queryParams?.type === "global") {
            setSearchResults(res);
          } else if (
            queryParams?.type === "price" ||
            queryParams?.searchBy === "price"
          ) {
            setSearchprice(res.data);
          } else if (queryParams?.type === "exactPlacement") {
            setDigit(res.data);
          } else if (queryParams?.type === "mostContained") {
            setContainSearch(res.data);
          }

          // // family pack search
          // else if (queryParams?.type === "family_pack") {
          //   const shouldShowNotification = false;

          //   if (shouldShowNotification) {
          //     NotificationManager.success("No message");
          //   }
          // }
        }
      });
    }
  }, [queryParams, userProfile]);
  // console.log("useEffect nextPage :", nextPage);
  // console.log("useEffect searchNextUrl :", searchNextUrl);
  // console.log("useEffect besSeach :", besSeach);

  const globalLazy = (key, url) => {
    let params = { ...queryParams };
    delete params.type;
    delete params.searchBy;
    delete params.callCount;
    delete params.page;
    axios
      .get(url, {
        params: {
          ...params,
          id: userProfile?.contactid,
        },
      })
      .then((res) => {
        const obj = {
          ...searchResults,
          [key]: {
            data: [...searchResults[key]?.data, ...res?.data?.data],
          },
        };
        setSearchResults(obj);
        setLazy({
          ...lazy,
          [key]: res?.data?.nextURL,
        });
      });
  };

  const lazyload = () => {
    let params = { ...queryParams };
    delete params.type;
    delete params.searchBy;
    delete params.callCount;
    delete params.page;
    if (queryParams?.type === "basic") {
      params.seller = queryParams?.seller || "PREMIUM";
      const { min_price, max_price, sort, seller, sum, total } = params;
      params = {
        [params?.basicSearchtype]: params.number,
        min_price,
        max_price,
        sort,
        seller,
        sum,
        total,
      };
    }

    if (
      queryParams?.type === "advanced" ||
      queryParams?.searchBy === "price" ||
      queryParams?.type === "global" ||
      queryParams?.type === "exactPlacement" ||
      queryParams?.type === "mostContained"
    ) {
      params.seller = queryParams?.seller || "PREMIUM";
    }
    SearchAPI(
      queryParams?.type || queryParams?.searchBy,
      params,
      userProfile,
      nextPage
    )?.then((res) => {
      if (!res) {
        NotificationManager.error(
          "Error message",
          "Something went wrong. Please try again later"
        );
      }

      setNextPage(res?.nextURL);

      if (queryParams?.type === "advanced") {
        SetAdSearch([...adSearch, ...res.data]);
      } else if (queryParams?.type === "basic") {
        setBesSearch([...besSeach, ...res.data]);
      } else if (queryParams?.type === "global") {
        setSearchResults(res.data);
      } else if (
        queryParams?.type === "price" ||
        queryParams?.searchBy === "price"
      ) {
        setSearchprice([...seracPrice, ...res.data]);
      } else if (queryParams?.type === "exactPlacement") {
        setDigit([...digit, ...res.data]);
      } else if (queryParams?.type === "mostContained") {
        setContainSearch([...containSearch, ...res.data]);
      } else if (queryParams?.type === "family_pack") {
        SetFamilyPack([...familyPack, ...res.data]);
      }
      console.log("nextPage :", nextPage);
      console.log("nextPage :", nextPage);
      console.log("Resssssssss :", res);
    });
  };

  // const filteredPlatinumData = searchResults?.platinum?.data?.filter((item) => {
  //   const startWithDigits = queryParams?.start_with?.split(',').map(digit => digit.trim());
  //   return startWithDigits?.some(digit => item?.number?.startsWith(digit));
  // });

  const filteredPlatinumData = searchResults?.platinum?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  const filteredGoldData = searchResults?.gold?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  const filteredSilverData = searchResults?.silver?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });
  const filteredBronzeData = searchResults?.bronze?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  return (
    <div className="SearchResult-page-os">
      <Header />
      <MobileHeader />

      <SuggestionBanner
        headingText={
          BannerText?.[queryParams?.searchBy]?.[
            queryParams?.type || queryParams?.searchBy
          ]
        }
        buttonTitle="Contact Us"
        buttonLink="/contact"
      />
      <div className="homepage-search-section-os"></div>
      <SearchContext.Provider
        className="ddd"
        value={{
          searchResults,
          seracPrice,
          besSeach,
          digit,
          containSearch,
          adSearch,
        }}
      >
        <div className="defaultPage-search-section-os">
          <Search queryParams={queryParams} />
        </div>
        {/* {queryParams?.type !== "global" && ( */}
        <div className="container-os">
          <div className="default-page-filterTabs-os">
            <FilterTabs />
          </div>
        </div>
        {/* )} */}

        {adSearch?.length >= 0 ? (
          <AdvanceSearch
            results={adSearch}
            nextPage={lazyload}
            page={"adSearch"}
            searchNextUrl={nextPage}
          />
        ) : null}
        {searchResults?.platinum?.data?.length >= 0 ? (
          <PlatinumResult
            results={filteredPlatinumData}
            nextPage={() => {
              globalLazy("platinum", lazy?.platinum);
            }}
            viewLoadMore={lazy?.platinum}
            page={"searchResults"}
          />
        ) : null}

        {searchResults?.gold?.data?.length >= 0 ? (
          <GoldResult
            results={filteredGoldData}
            nextPage={() => {
              globalLazy("gold", lazy?.gold);
            }}
            viewLoadMore={lazy?.gold}
            page={"searchResults"}
          />
        ) : null}

        {searchResults?.silver?.data?.length >= 0 ? (
          <SilverResult
            results={filteredSilverData}
            nextPage={() => {
              globalLazy("silver", lazy?.silver);
            }}
            viewLoadMore={lazy?.silver}
            page={"searchResults"}
          />
        ) : null}

        {searchResults?.bronze?.data?.length >= 0 ? (
          <BronzeResult
            results={filteredBronzeData}
            nextPage={() => {
              globalLazy("bronze", lazy?.bronze);
            }}
            viewLoadMore={lazy?.bronze}
            page={"searchResults"}
          />
        ) : null}
        {searchResults?.globalBasic?.data?.length >= 0 ? (
          <GlobalBasicResult
            results={searchResults.globalBasic.data}
            nextPage={() => {
              globalLazy("globalBasic", lazy?.globalBasic);
            }}
            viewLoadMore={lazy?.globalBasic}
            page={"searchResults"}
          />
        ) : null}

        {seracPrice?.length >= 0 ? (
          <SearchByPrice
            results={seracPrice}
            page={"seracPrice"}
            nextPage={lazyload}
            searchNextUrl={nextPage}
          />
        ) : null}
        {besSeach?.length >= 0 ? (
          // <BasicSearch nextPage={lazyload} searchNextUrl={searchNextUrl} />
          <BasicSearch nextPage={lazyload} searchNextUrl={nextPage} />
        ) : null}
        {digit?.length ? (
          <ExactDigitPlacementSearch
            results={digit}
            page={"digit"}
            nextPage={lazyload}
            searchNextUrl={nextPage}
          />
        ) : null}
        {containSearch?.length >= 0 ? (
          <MustContainsSearch
            results={containSearch}
            page={"containSearch"}
            nextPage={lazyload}
            searchNextUrl={nextPage}
          />
        ) : null}

        {familyPackParamDigit && (
          <FamilyPackResult familyPackParamDigit={familyPackParamDigit} />
        )}
      </SearchContext.Provider>
      <FAQs />
      <OurCustomers />
      <VideoTestimonial />
      <RegisterVipNumber
        image={RegisterImg1}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText={user?.token ? "Suggestions" : "Register"}
        buttonText1={user?.token ? "Suggestions" : "Register"}
        onClick={() => {
          !user?.token && setRedirectTo("/suggestion-for-you");
          !user?.token && setActiveSignInWithOtp(true);
          user?.token && Router.push("/suggestion-for-you");
        }}
      />
      <QRVipApp />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default SearchResults;
