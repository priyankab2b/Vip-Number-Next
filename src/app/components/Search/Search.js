"use client"


import React, { useState, useEffect, useRef, useContext } from "react";
import "./Search.css";
import SearchFilterInput from "../SearchFilterInput/SearchFilterInput";
import SearchFilterButton from "../SearchFilterButton/SearchFilterButton";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import MobileSearch from "../MobileSearch/MobileSearch";
import { updateProfile } from "../../Services/Services";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";

const Tag = ({ value, onClick }) => {
  return (
    <div>
      {value}
      <button onClick={() => onClick()}>
        <svg
          width="53"
          height="53"
          viewBox="0 0 53 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027"></circle>
          <path
            d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
            fill="#EFEFEF"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export const AppliedTags = ({ queryParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const curParams = { ...queryParams };
  delete curParams?.type;
  delete curParams?.number;
  delete curParams?.searchBy;
  delete curParams?.callCount;
  const call = (deleteKey) => {
    const newparams = { ...queryParams };
    if (deleteKey) {
      if (Array.isArray(deleteKey)) {
        deleteKey?.map((key) => {
          delete newparams?.[key];
        });
      } else {
        delete newparams?.[deleteKey];
      }
    }
    const route = {
      ...newparams,
    };


const queryString = createSearchParams(route).toString();
router.push(`${location?.pathname}?${queryString}`);


// router.push({
//   pathname: location?.pathname,
//   search: `?${createSearchParams(route)}`,
// });
   
  };
  if (!Object.keys(curParams || {})?.length) {
    return;
  }
  return (
    <div className="filter-tags-row-os">
      <div className="filter-tags-heading-os">Applied tags:</div>
      <div className="filter-tags-list-os">
        {/* {queryParams?.type === "basic" && <Tag value={"Premium"} />}
        {queryParams?.type === "global" && <Tag value={"Global"} />}
        {queryParams?.type === "advanced" && <Tag value={"Advanced"} />}
        {queryParams?.type === "exactPlacement" && <Tag value={"BExact Placement"} />}
        {queryParams?.type === "mostContained" && <Tag value={"Most Contained"} />} */}
        {queryParams?.basicSearchtype === "start_with" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`Start With: ${queryParams?.number}`}
          />
        )}
        {queryParams?.basicSearchtype === "end_with" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`End With: ${queryParams?.number}`}
          />
        )}
        {queryParams?.basicSearchtype === "any_where" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`Anywhere: ${queryParams?.number}`}
          />
        )}

        {queryParams?.start_with && (
          <Tag
            onClick={() => {
              call("start_with");
            }}
            value={`Start With: ${queryParams?.start_with}`}
          />
        )}
        {queryParams?.end_with && (
          <Tag
            onClick={() => {
              call("end_with");
            }}
            value={`End With: ${queryParams?.end_with}`}
          />
        )}
        {queryParams?.any_where && (
          <Tag
            onClick={() => {
              call("any_where");
            }}
            value={`Anywhere: ${queryParams?.any_where}`}
          />
        )}
        {queryParams?.contains && (
          <Tag
            onClick={() => {
              call("contains");
            }}
            value={`Contains: ${queryParams?.contains}`}
          />
        )}
        {queryParams?.not_contains && (
          <Tag
            onClick={() => {
              call("not_contains");
            }}
            value={`Not Contains: ${queryParams?.not_contains}`}
          />
        )}
        {queryParams?.total && (
          <Tag
            onClick={() => {
              call("total");
            }}
            value={`Total: ${queryParams?.total}`}
          />
        )}
        {queryParams?.sum && (
          <Tag
            onClick={() => {
              call("sum");
            }}
            value={`Sum: ${queryParams?.sum}`}
          />
        )}
        {queryParams?.min_price && (
          <Tag
            onClick={() => {
              call("min_price");
            }}
            value={`Minimum price: ${queryParams?.min_price}`}
          />
        )}
        {queryParams?.max_price && (
          <Tag
            onClick={() => {
              call("max_price");
            }}
            value={`maximum price: ${queryParams?.max_price}`}
          />
        )}

        {queryParams?.type !== "mostContained" &&
          queryParams?.search_string && (
            <>
              {queryParams?.search_string?.split("")?.map(
                (ch, i) =>
                  ch !== "*" && (
                    <Tag
                      onClick={() => {
                        call(i);
                      }}
                      value={`Exact ${ch} at ${i + 1}`}
                    />
                  )
              )}
            </>
          )}

        {queryParams?.type === "mostContained" &&
          queryParams?.search_string && (
            <Tag
              onClick={() => {
                call("search_string");
              }}
              value={`Search value: ${queryParams?.search_string}`}
            />
          )}
      </div>
    </div>
  );
};

const Search = ({ queryParams }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [callCount, setCallCount] = useState(0);
  const [priceWarning, setPriceWarning] = useState(false);
  const [exactPlacementError, setExactPlacementError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  // const [searchBy, setSearchBy] = useState(
  //   router.pathname === "/search-your-number" ? "digit" : "price"
  // );
  const [searchBy, setSearchBy] = useState("digit");
  const [filters, setFilters] = useState({});
  const [errorMustContain, setErrorMustContain] = useState("");
  const [errorNotContain, setErrorNotContain] = useState("");
  const [firstDigitValidation, setFirstDigitValidation] = useState(false);
  const [popUpEnabled, setPopUpEnabled] = useState(false);
  const [showAdvancedWarning, setShowAdvancedWarning] = useState(false);
  const [priceRangeWarning, setPriceRangeWarning] = useState(false);
  const [mustContainedWarning, setmustContainedWarning] = useState(false);
  // references
  const filtersRef = useRef(filters);
  const searchByRef = useRef(searchBy);
  const [priceRangePopup, setPriceRangePopupView] = useState(null);
  const { user } = useContext(AppStateContext);
  // auto-focus
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {}, [priceRangePopup]);
  //Must and not Must contain code
  const checkForDuplicates = (value1, value2) => {
    if (!value1 || !value2) {
      return true;
    }
    const value1Array = value1.split(",").filter(Boolean);
    const value2Array = value2.split(",").filter(Boolean);
    const duplicates = value1Array.filter((value) =>
      value2Array.includes(value)
    );
    if (duplicates.length > 0) {
      return false;
    }
    return true;
  };

  // on component mount
  useEffect(() => {
    // if (router.pathname === "/") {
    setSearchBy("digit");
    setFilters({
      type: "global",
      searchBy: "digit",
    });
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    // }
  }, []);

  // Reset filters once when user switched between tabs.
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    searchByRef.current = searchBy;
  }, [searchBy]);

  useEffect(() => {
    if (queryParams) {
      if (queryParams?.searchBy === "digit") {
        const currentfilters = { ...queryParams };
        const minPrice = localStorage?.getItem("vip_minprice");
        const maxPrice = localStorage?.getItem("vip_maxprice");
        const hidePopup = localStorage?.getItem("vip_hidePopup");
        if (
          currentfilters?.min_price ||
          minPrice ||
          currentfilters?.max_price ||
          maxPrice ||
          !hidePopup
        )
          setPopUpEnabled(true);
        const obj = {};
        if (queryParams?.type === "exactPlacement") {
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(0)
            )
          )
            obj[0] = queryParams?.search_string?.charAt(0);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(1)
            )
          )
            obj[1] = queryParams?.search_string?.charAt(1);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(2)
            )
          )
            obj[2] = queryParams?.search_string?.charAt(2);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(3)
            )
          )
            obj[3] = queryParams?.search_string?.charAt(3);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(4)
            )
          )
            obj[4] = queryParams?.search_string?.charAt(4);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(5)
            )
          )
            obj[5] = queryParams?.search_string?.charAt(5);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(6)
            )
          )
            obj[6] = queryParams?.search_string?.charAt(6);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(7)
            )
          )
            obj[7] = queryParams?.search_string?.charAt(7);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(8)
            )
          )
            obj[8] = queryParams?.search_string?.charAt(8);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(9)
            )
          )
            obj[9] = queryParams?.search_string?.charAt(9);
        }
        setFilters({ ...currentfilters, ...obj });
      } else {
        setFilters(queryParams);
      }
      setCallCount(callCount + 1);
      setSearchBy(queryParams?.searchBy);
    }
  }, [queryParams]);

  const getSearchResults = (type = {}, currentfilters = null) => {
    if (
      filtersRef.current?.max_price > 0 &&
      (filtersRef.current?.min_price < 0 ||
        filtersRef.current?.min_price === undefined)
    ) {
      filtersRef.current = {
        ...filtersRef.current,
        min_price: 0,
      };
    }
    const navObj = {
      ...(currentfilters || filtersRef.current),
      ...type,
      callCount,
      searchBy,
    };
    if (!navObj?.min_price) delete navObj.min_price;
    if (!navObj?.max_price) delete navObj.max_price;


const queryString = createSearchParams(navObj).toString();
router.push(`/search-results?${queryString}`);


    // router.push({
    //   pathname: "/search-results",
    //   search: `?${createSearchParams(navObj)}`,
    // });
  };

  const handleFilters = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleFiltersOnSwitching = (obj) => {
    setFirstDigitValidation(false);
    const { min_price = undefined, max_price = undefined } = filters;
    setFilters({
      ...obj,
      min_price,
      max_price,
    });
  };

  //exact digit placement
  const placementDigit = (e) => {
    const inputs = document.querySelectorAll("#exact-digits-inputs input");
    let digitString = "";
    inputs.forEach((input, index) => {
      if (input.value) {
        digitString += input.value;
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      } else {
        digitString += "*";
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
    getSearchResults(
      { type: "exactPlacement" },
      { search_string: digitString }
    );
  };

  //Most Contain Search
  const handleMostContainSearch = (currentfilters) => {
    if (
      filters?.search_string?.length !== 1 &&
      filters?.search_string?.length !== 2
    ) {
      setShowError(true);
    } else {
      getSearchResults({ type: "mostContained" }, currentfilters);
      setShowError(false);
    }
  };

  //Global Search
  const handleSubmit = (currentfilters) => {
    setPriceRangePopupView(false);
    if (filters?.type === "global") {
      getSearchResults({ type: "global" }, currentfilters);
    } else if (filters?.type === "basic") {
      getSearchResults({ type: "basic" }, currentfilters);
    } else if (filters?.type === "advanced") {
      if (
        filters?.contains &&
        filters?.not_contains &&
        filters?.not_contains === filters?.contains
      ) {
        setmustContainedWarning(true);
        return false;
      }
      if (
        (!filters?.start_with || filters?.start_with === "") &&
        (!filters?.any_where || filters?.any_where === "") &&
        (!filters?.end_with || !filters?.end_with === "") &&
        (!filters?.contains || filters?.contains === "") &&
        (!filters?.not_contains || filters?.not_contains === "") &&
        (!filters?.total || filters?.total === "") &&
        (!filters?.sum || filters?.sum === "")
      ) {
        setShowAdvancedWarning(true);
      } else {
        setShowAdvancedWarning(false);
        getSearchResults({ type: "advanced" }, currentfilters);
      }
    } else if (filters?.type === "exactPlacement") {
      placementDigit();
    } else if (filters?.type === "mostContained") {
      handleMostContainSearch(currentfilters);
    }
  };

  //Price Search Min To Max
  const priceSunmit = (e) => {
    e.preventDefault();
    if (
      filtersRef?.current?.min_price >= 0 &&
      filtersRef?.current?.max_price > filtersRef?.current?.min_price
    ) {
      setPriceWarning(false);
      getSearchResults();
    } else {
      setPriceWarning(true);
    }
  };

  //Basic Search
  const handleSearchBasic = (e) => {
    e.preventDefault();
    if (!filters?.basicSearchtype) {
      setShowCheckboxWarning(true);
    } else {
      setShowCheckboxWarning(false);
      getSearchResults({ type: "basic" });
    }
  };

  // Price range popup show

  const setPriceRangePopup = () => {
    const minPrice = localStorage?.getItem("vip_minprice");
    const maxPrice = localStorage?.getItem("vip_maxprice");
    const hidePopup = localStorage?.getItem("vip_hidePopup");
    if (!priceRangePopup && !popUpEnabled && !hidePopup) {
      setPriceRangePopupView(true);
    } else {
      handleSubmit();
    }
  };
  const handlePriceRange = (value) => {};
  const globalhit = () => {
    if (!filters?.number) {
      setPriceWarning(true);
      return;
    }
    setPriceWarning(false);
    setPriceRangePopup(true);
  };

  const basicHit = () => {
    if (firstDigitValidation && filters?.basicSearchtype === "start_with") {
      return false;
    }
    if (!filters?.basicSearchtype) {
      setShowCheckboxWarning(true);
      return;
    }
    if (!filters?.number) {
      setPriceWarning(true);
      return;
    }
    setPriceRangePopup(true);
  };

  const advancedHit = () => {
    if (
      !["9", "8", "7", "6"]?.includes(filters?.start_with?.charAt(0)) &&
      filters?.start_with?.length
    ) {
      return;
    }
    setPriceRangePopup(true);
  };

  const exacthit = () => {
    if (!["9", "8", "7", "6"]?.includes(filters?.[0]) && filters?.[0]?.length) {
      return;
    }
    if (
      filters?.["0"] ||
      filters?.["1"] ||
      filters?.["2"] ||
      filters?.["3"] ||
      filters?.["4"] ||
      filters?.["5"] ||
      filters?.["6"] ||
      filters?.["7"] ||
      filters?.["8"] ||
      filters?.["9"]
    ) {
      setPriceRangePopup(true);
    } else {
      setExactPlacementError(true);
    }
  };

  const mostHit = () => {
    setPriceRangePopup(true);
  };
  return (
    <div className="search-section-os-1">
      <section className="search-section-os">
        <div className="container-os">
          <div className="search-data-row-os">
            <div className="search-tabs-row-os">
              <button
                onClick={() => {
                  setFilters({});
                  setSearchBy("digit");
                  setFilters({
                    type: "global",
                    searchBy: "digit",
                  });
                }}
                className={`search-by-digits-button-os ${
                  searchBy === "digit"
                    ? "filter-tab-os active"
                    : "filter-tab-os"
                }`}
              >
                <span>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.2975 8.38436L5.35667 6.44353C5.08496 6.5988 4.79383 6.72819 4.4833 6.8317C4.17277 6.93521 3.84283 6.98697 3.49348 6.98697C2.52307 6.98697 1.69809 6.64745 1.01854 5.96842C0.339515 5.28887 0 4.4639 0 3.49348C0 2.52307 0.339515 1.69809 1.01854 1.01854C1.69809 0.339515 2.52307 0 3.49348 0C4.4639 0 5.28887 0.339515 5.96842 1.01854C6.64745 1.69809 6.98697 2.52307 6.98697 3.49348C6.98697 3.84283 6.93521 4.17277 6.8317 4.4833C6.72819 4.79383 6.5988 5.08496 6.44353 5.35667L8.38436 7.2975C8.52669 7.43982 8.59785 7.62097 8.59785 7.84093C8.59785 8.06089 8.52669 8.24203 8.38436 8.38436C8.24203 8.52669 8.06089 8.59785 7.84093 8.59785C7.62097 8.59785 7.43982 8.52669 7.2975 8.38436ZM3.49348 5.43431C4.03691 5.43431 4.49624 5.24669 4.87147 4.87147C5.24669 4.49624 5.43431 4.03691 5.43431 3.49348C5.43431 2.95005 5.24669 2.49072 4.87147 2.1155C4.49624 1.74027 4.03691 1.55266 3.49348 1.55266C2.95005 1.55266 2.49072 1.74027 2.1155 2.1155C1.74027 2.49072 1.55266 2.95005 1.55266 3.49348C1.55266 4.03691 1.74027 4.49624 2.1155 4.87147C2.49072 5.24669 2.95005 5.43431 3.49348 5.43431Z"
                      fill="#6019EB"
                    />
                  </svg>
                </span>
                Search by Digits
              </button>
              <button
                onClick={() => {
                  setSearchBy("price");
                  setFilters({
                    searchBy: "price",
                    min_price: 0,
                  });
                  inputRef.current.focus();
                }}
                className={`search-by-Price-button-os ${
                  searchBy === "price"
                    ? "filter-tab-os active"
                    : "filter-tab-os"
                }`}
              >
                <span>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.49846 9.28352V5.57011C6.49846 5.05952 6.0807 4.64176 5.57011 4.64176H1.8567V2.78506H6.49846V0.928352H4.17758V0H2.32088V0.928352H0.928352C0.417758 0.928352 0 1.34611 0 1.8567V5.57011C0 6.08071 0.417758 6.49846 0.928352 6.49846H4.64176V8.35517H0V10.2119H2.32088V11.1402H4.17758V10.2119H5.57011C6.0807 10.2119 6.49846 9.79411 6.49846 9.28352ZM14.473 8.83791L9.21853 14.0831L6.5913 11.4559L5.28232 12.7741L9.21853 16.7103L15.782 10.1469L14.473 8.83791Z"
                      fill="#333333"
                    />
                  </svg>
                </span>
                Search by Price
              </button>
            </div>
            <div
              className={`search-filter-data-os ${
                searchBy === "digit"
                  ? "filter-content-os active"
                  : "filter-content-os"
              }`}
            >
              <div className="search-filter-checkboxes-row-os">
                {router?.pathname !== "/search-your-number" ? (
                  <>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        checked={filters?.type === "global"}
                        onChange={() =>
                          handleFiltersOnSwitching({ type: "global" })
                        }
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>
                        Global Search
                      </span>
                      <div className="recommended-checkbox-os">
                        (Recommended)
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option2"
                        checked={filters?.type === "basic"}
                        onChange={() =>
                          handleFiltersOnSwitching({
                            type: "basic",
                            basicSearchtype: "any_where",
                          })
                        }
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>
                        Premium Search
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option3"
                        checked={filters?.type === "advanced"}
                        onChange={() =>
                          handleFiltersOnSwitching({ type: "advanced" })
                        }
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>Advance Search
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option4"
                        checked={filters?.type === "exactPlacement"}
                        onChange={() =>
                          handleFiltersOnSwitching({ type: "exactPlacement" })
                        }
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>Exact Digit Placement
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option5"
                        checked={filters?.type === "mostContained"}
                        onChange={() =>
                          handleFiltersOnSwitching({ type: "mostContained" })
                        }
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>Most Contains
                      </span>
                    </label>{" "}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (filters?.type === "global") {
                    globalhit();
                  } else if (filters?.type === "basic") {
                    basicHit();
                  } else if (filters?.type === "advanced") {
                    advancedHit();
                  } else if (filters?.type === "exactPlacement") {
                    exacthit();
                  } else if (filters?.type === "mostContained") {
                    mostHit();
                  }
                }}
              >
                <div
                  className={`search-filter-radio-button-data-row-1-os ${
                    filters?.type === "global"
                      ? "search-filter-radio-button-content-1 active"
                      : "search-filter-radio-button-content-1"
                  }`}
                >
                  <div className="search-filter-input-data-os">
                    <div className="search-filter-input-data-col-1-os">
                      <SearchFilterInput
                        inputLabel="Enter Digits Here"
                        inputType="text"
                        placeHolder="E.g. 987"
                        inputValue={filters?.number}
                        inputOnChange={(e) => {
                          const regex = /^[0-9,*]*$/;
                          if (regex.test(e.target.value)) {
                            handleFilters("number", e.target.value);
                          }
                        }}
                      />
                      {priceWarning && (
                        <p className="warning-message" style={{ color: "red" }}>
                          Please enter a 0 to 9 digit number.
                        </p>
                      )}
                    </div>

                    <div className="search-filter-input-data-col-3-os dsdsd">
                      <SearchFilterButton
                        onClick={() => {
                          globalhit();
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`search-filter-radio-button-data-row-2-os ${
                    filters?.type === "basic"
                      ? "search-filter-radio-button-content-1 active"
                      : "search-filter-radio-button-content-1"
                  }`}
                >
                  <div className="search-filter-input-data-os">
                    <div className="search-filter-basic-search-col-1-os">
                      <SearchFilterInput
                        inputLabel="Enter Digits Here"
                        inputType="text"
                        inputValue={filters?.number}
                        placeHolder="e.g: 0000"
                        inputOnChange={(e) => {
                          const regex = /^[0-9,\*]*$/; // regular expression to allow only numbers and commas
                          if (regex.test(e.target.value)) {
                            handleFilters("number", e.target.value);
                            if (
                              !["9", "8", "7", "6"]?.includes(
                                e.target.value?.charAt(0)
                              )
                            ) {
                              setFirstDigitValidation(true);
                            } else {
                              setFirstDigitValidation(false);
                            }
                          }
                        }}
                      />

                      {priceWarning && (
                        <p style={{ color: "red" }}>
                          Please enter a valid number.
                        </p>
                      )}
                      {firstDigitValidation &&
                        filters?.basicSearchtype === "start_with" && (
                          <p style={{ color: "red" }}>
                            Only 9,8,7 and 6 are allowed to start with.
                          </p>
                        )}
                    </div>
                    <div className="search-filter-basic-search-col-2-os">
                      <SearchFilterButton
                        onClick={() => {
                          basicHit();
                        }}
                      />
                    </div>
                  </div>

                  <div className="search-by-digits-filter-subFilter-os">
                    <label>
                      <input
                        type="radio"
                        name="option1"
                        value="start_with"
                        checked={filters?.basicSearchtype === "start_with"}
                        onChange={(e) => {
                          handleFilters("basicSearchtype", e.target.value);
                          if (
                            !["9", "8", "7", "6"]?.includes(
                              filters?.number?.charAt(0)
                            )
                          ) {
                            setFirstDigitValidation(true);
                          } else {
                            setFirstDigitValidation(false);
                          }
                        }}
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>Start with
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option1"
                        value="any_where"
                        checked={filters?.basicSearchtype === "any_where"}
                        onChange={(e) => {
                          handleFilters("basicSearchtype", e.target.value);
                        }}
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>Anywhere
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option1"
                        value="end_with"
                        checked={filters?.basicSearchtype === "end_with"}
                        onChange={(e) => {
                          handleFilters("basicSearchtype", e.target.value);
                        }}
                      />
                      <span className="custom-radio">
                        <span className="dot"></span>End with
                      </span>
                    </label>
                  </div>
                  {showCheckboxWarning && (
                    <p style={{ color: "red" }}>
                      Please select a checkbox option.
                    </p>
                  )}
                </div>

                <div
                  className={`search-filter-radio-button-data-row-3-os ${
                    filters?.type === "advanced"
                      ? "search-filter-radio-button-content-1 active"
                      : "search-filter-radio-button-content-1"
                  }`}
                >
                  <div className="search-filter-advance-search-heading-os">
                    Advance Search
                  </div>
                  <div className="search-filter-advance-search-row-1-os">
                    <div className="search-filter-advance-search-col-1-os">
                      <SearchFilterInput
                        inputLabel="Start With"
                        inputType="text"
                        placeHolder="e.g: +91 855"
                        inputValue={filters?.start_with}
                        inputOnChange={(e) => {
                          const regex = /^[0-9,\*]*$/; // regex to allow only numbers and commas
                          if (regex.test(e.target.value)) {
                            // check if the input matches the regex
                            if (
                              !["9", "8", "7", "6"]?.includes(
                                e.target.value?.charAt(0)
                              ) &&
                              e.target.value?.length
                            ) {
                              setFirstDigitValidation(true);
                            } else {
                              setFirstDigitValidation(false);
                            }
                            handleFilters("start_with", e.target.value);
                          }
                        }}
                      />

                      {firstDigitValidation && (
                        <p style={{ color: "red" }}>
                          Only 9,8,7 and 6 are allowed to start with.
                        </p>
                      )}
                    </div>
                    <div className="search-filter-advance-search-col-2-os">
                      <SearchFilterInput
                        inputLabel="Anywhere"
                        inputType="text"
                        placeHolder="e.g: 367"
                        inputValue={filters?.any_where}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,\*]/g,
                            ""
                          );
                          handleFilters("any_where", filteredValue);
                        }}
                      />
                    </div>
                    <div className="search-filter-advance-search-col-3-os">
                      <SearchFilterInput
                        inputLabel="End With"
                        inputType="text"
                        placeHolder="e.g: 000"
                        inputValue={filters?.end_with}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,\*]/g,
                            ""
                          );
                          handleFilters("end_with", filteredValue);
                        }}
                      />
                    </div>
                    <div className="search-filter-advance-search-col-4-os">
                      <SearchFilterInput
                        inputLabel="Must Contain"
                        inputType="text"
                        placeHolder="e.g:14,18"
                        inputValue={filters?.contains}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,\*]/g,
                            ""
                          );
                          if (
                            checkForDuplicates(
                              filteredValue,
                              filters?.not_contains
                            )
                          ) {
                            handleFilters("contains", filteredValue);
                            setErrorMustContain("");
                          } else {
                            setErrorMustContain(
                              "Please do not enter the same number in both fields."
                            );
                          }
                        }}
                      />
                      {errorMustContain && (
                        <div className="error-message">{errorMustContain}</div>
                      )}
                    </div>
                    <div className="search-filter-advance-search-col-5-os">
                      <SearchFilterInput
                        inputLabel="Not Contain"
                        inputType="text"
                        placeHolder=""
                        inputValue={filters?.not_contains}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,\*]/g,
                            ""
                          );
                          if (
                            checkForDuplicates(filters?.contains, filteredValue)
                          ) {
                            handleFilters("not_contains", filteredValue);
                            setErrorNotContain("");
                          } else {
                            setErrorNotContain(
                              "Please do not enter the same number in both fields."
                            );
                          }
                        }}
                      />
                      {errorNotContain && (
                        <div className="error-message">{errorNotContain}</div>
                      )}
                    </div>

                    <div className="filter-advance-search-alert-message-os">
                      For multiple values use comma (s) e.g14,18
                    </div>
                  </div>

                  <div className="search-filter-advance-search-row-1-os">
                    <div className="search-filter-advance-search-col-6-os">
                      <SearchFilterInput
                        inputLabel="Total"
                        inputType="text"
                        placeHolder="e.g:88"
                        inputValue={filters?.total}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,]/g,
                            ""
                          );
                          handleFilters("total", filteredValue);
                        }}
                      />
                    </div>
                    <div className="search-filter-advance-search-col-7-os">
                      <SearchFilterInput
                        inputLabel="Sum"
                        inputType="text"
                        placeHolder="e.g:9"
                        inputValue={filters?.sum}
                        inputOnChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9,]/g,
                            ""
                          );
                          handleFilters("sum", filteredValue);
                        }}
                      />
                    </div>
                    <div className="search-filter-advance-search-col-8-os">
                      <SearchFilterButton
                        searchOnSubmit={() => {}}
                        onClick={() => {
                          advancedHit();
                        }}
                      />
                    </div>
                    {showAdvancedWarning && (
                      <p style={{ color: "red" }}>
                        Please fill atleast one field.
                      </p>
                    )}
                    {mustContainedWarning && (
                      <p style={{ color: "red" }}>
                        Contains and not contains should no same
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={`search-filter-radio-button-data-row-3-os ${
                    filters?.type === "exactPlacement"
                      ? "search-filter-radio-button-content-1 active"
                      : "search-filter-radio-button-content-1"
                  }`}
                >
                  <div className="search-by-exact-digits-heading-os">
                    Fill Digits at exact placement where you want that and left
                    others box empty
                  </div>
                  <div
                    className="search-by-exact-digits-row-os"
                    id="exact-digits-inputs"
                  >
                    <div className="search-by-exact-digits-input-os">
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="6"
                        max="9"
                        maxLength="1"
                        value={filters?.[0]}
                        inputtype="numeric"
                        id="otc-2"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("0", "");
                          }
                        }}
                        onChange={(e) => {
                          if (
                            !["9", "8", "7", "6"]?.includes(e.target.value) &&
                            e.target.value?.length
                          ) {
                            setFirstDigitValidation(true);
                          } else {
                            setFirstDigitValidation(false);
                          }
                          if (e.target.value.length === e.target.maxLength) {
                            handleFilters("0", e.target.value);
                            setExactPlacementError(false);
                            document.getElementById("otc-3").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[1]}
                        inputtype="numeric"
                        id="otc-3"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("1", "");
                            document.getElementById("otc-2").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("1", e.target.value);
                            document.getElementById("otc-4").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[2]}
                        inputtype="numeric"
                        id="otc-4"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("2", "");
                            document.getElementById("otc-3").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("2", e.target.value);
                            document.getElementById("otc-5").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[3]}
                        inputtype="numeric"
                        id="otc-5"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("3", "");
                            document.getElementById("otc-4").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("3", e.target.value);
                            document.getElementById("otc-6").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[4]}
                        inputtype="numeric"
                        id="otc-6"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("4", "");
                            document.getElementById("otc-5").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("4", e.target.value);
                            document.getElementById("otc-7").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[5]}
                        inputtype="numeric"
                        id="otc-7"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("5", "");
                            document.getElementById("otc-6").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("5", e.target.value);
                            document.getElementById("otc-8").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[6]}
                        inputtype="numeric"
                        id="otc-8"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("6", "");
                            document.getElementById("otc-7").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("6", e.target.value);
                            document.getElementById("otc-9").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[7]}
                        inputtype="numeric"
                        id="otc-9"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("7", "");
                            document.getElementById("otc-8").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("7", e.target.value);
                            document.getElementById("otc-10").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        max="9"
                        maxLength="1"
                        value={filters?.[8]}
                        inputtype="numeric"
                        id="otc-10"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("8", "");
                            document.getElementById("otc-9").focus();
                          }
                        }}
                        onChange={(e) => {
                          let key = e.keyCode || e.charCode;
                          if (e.target.value.length === e.target.maxLength) {
                            setExactPlacementError(false);
                            handleFilters("8", e.target.value);
                            document.getElementById("otc-11").focus();
                          }
                        }}
                      />
                      <input
                        type="number"
                        pattern="[0-9]*"
                        min="0"
                        maxLength="1"
                        value={filters?.[9]}
                        inputtype="numeric"
                        id="otc-11"
                        onKeyDown={(e) => {
                          if (e?.code === "Backspace") {
                            handleFilters("9", "");
                            document.getElementById("otc-10").focus();
                          }
                        }}
                        onChange={(e) => {
                          if (filters?.[9] === "" || !e.target.value) {
                            handleFilters("9", e.target.value);
                          } else {
                            e.preventDefault();
                          }
                        }}
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength) {
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                          }
                        }}
                      />
                      {exactPlacementError && (
                        <p className="warning-message" style={{ color: "red" }}>
                          Please enter at least one digit.
                        </p>
                      )}
                    </div>
                    <div className="search-by-exact-digits-search-btn-os">
                      <SearchFilterButton
                        id="submitClick"
                        onClick={() => {
                          exacthit();
                        }}
                      />
                    </div>
                  </div>
                  {firstDigitValidation && (
                    <p style={{ color: "red" }}>
                      Only 9,8,7 and 6 are allowed to start with.
                    </p>
                  )}
                </div>

                <div
                  className={`search-filter-radio-button-data-row-3-os ${
                    filters?.type === "mostContained"
                      ? "search-filter-radio-button-content-1 active"
                      : "search-filter-radio-button-content-1"
                  }`}
                >
                  <div className="search-by-most-contains-row-os">
                    <div className="search-by-most-contains-col-1-os">
                      <SearchFilterInput
                        inputLabel="Enter Single or two digits that you want in your VIP Mobile Number"
                        inputType="text"
                        placeHolder="e.g: 00"
                        inputValue={filters?.search_string}
                        inputOnChange={(e) => {
                          // Remove any non-numeric and non-comma characters from the input value
                          const filteredValue = e.target.value.replace(
                            /[^0-9,\*]/g,
                            ""
                          );
                          handleFilters("search_string", filteredValue);
                        }}
                      />

                      {showError && (
                        <p style={{ color: "red", paddingTop: "4px" }}>
                          Can enter 1 or 2 digits only
                        </p>
                      )}
                    </div>
                    <div className="search-by-most-contains-col-2-os">
                      <SearchFilterButton
                        onClick={() => {
                          mostHit();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div
              className={`search-filter-data-os ${
                searchBy === "price"
                  ? "filter-content-os active"
                  : "filter-content-os"
              }`}
            >
              <form
                onSubmit={priceSunmit}
                className="search-filter-input-data-os"
              >
                <div className="search-by-price-filter-col-1-os">
                  <SearchFilterInput
                    inputLabel="Enter Min. Price"
                    inputType="text" // Change inputType to "text" to accept text input
                    placeHolder="e.g: Rs:5000"
                    inputOnChange={(e) => {
                      const inputValue = e.target.value;
                      const numericRegex = /^[0-9]*$/; // Regular expression to match only numeric values

                      if (numericRegex.test(inputValue)) {
                        setPriceWarning(false);
                        handleFilters("min_price", parseInt(inputValue));
                      } else {
                        setPriceWarning(true);
                      }
                    }}
                    inputValue={filters?.min_price}
                    ref={inputRef}
                  />
                </div>

                <div className="search-by-price-filter-col-2-os">
                  <SearchFilterInput
                    inputLabel="Enter Max. Price"
                    inputType="text" // Change inputType to "text" to accept text input
                    min={0}
                    placeHolder="e.g: Rs:10000"
                    inputOnChange={(e) => {
                      const inputValue = e.target.value;
                      const numericRegex = /^[0-9]*$/; // Regular expression to match only numeric values

                      if (numericRegex.test(inputValue)) {
                        setPriceWarning(false);
                        handleFilters("max_price", parseInt(inputValue));
                      } else {
                        setPriceWarning(true);
                      }
                    }}
                    inputValue={filters?.max_price}
                  />
                </div>

                <div className="search-by-price-filter-col-3-os">
                  <SearchFilterButton onClick={priceSunmit} />
                </div>

                {priceWarning && (
                  <p className="price-warning-message" style={{ color: "red" }}>
                    Please enter a valid range of minimum and maximum prices.
                  </p>
                )}
              </form>
            </div>

            <div
              className={`search-filter-data-os ${
                searchBy === "family"
                  ? "filter-content-os active"
                  : "filter-content-os"
              }`}
            >
              <div className="search-family-pack-heading-text-os">
                How much Similar Numbers do you want for your family or
                Business?
              </div>
              <div className="search-filter-input-data-os">
                <div className="search-by-familyPack-col-1-os">I Want</div>
                <div className="search-by-familyPack-col-2-os">
                  <SearchFilterInput
                    inputLabel="Quantity"
                    inputType="number"
                    placeHolder=""
                  />
                </div>
                <div className="search-by-familyPack-col-3-os">
                  SIMILAR VIP MOBILE NUMBER
                </div>
                <div className="search-by-familyPack-col-4-os">
                  <SearchFilterButton
                    onClick={() => handlePriceRange("search-digit-family-os")}
                  />
                </div>
              </div>
            </div>

            {/* Search Tags */}
            <AppliedTags queryParams={queryParams} />
          </div>
        </div>
      </section>

      {priceRangePopup && (
        <section className={"priceRange-popup-section-os"}>
          <div className="priceRange-popup-all-data-row-os">
            <div className="priceRange-popup-row-os">
              <button
                onClick={() => {
                  const currentfilters = { ...filters };
                  delete currentfilters?.min_price;
                  delete currentfilters?.max_price;
                  setFilters(currentfilters);
                  setPriceRangePopupView(null);
                  handleSubmit(currentfilters);
                  setPriceRangeWarning(false);
                  localStorage?.setItem("vip_hidePopup", true);
                  updateProfile(
                    {
                      user_blocked_price: true,
                    },
                    user?.token
                  )
                    .then((res) => {})
                    .catch((error) => {
                      console.error("Error Price Blocked:", error);
                    });
                }}
                className="priceRange-popup-cross-btn-os"
              >
                <svg
                  width="53"
                  height="53"
                  viewBox="0 0 53 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
                  <path
                    d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                    fill="#EFEFEF"
                  />
                </svg>
              </button>
              <div className="priceRange-popup-heading-os">
                Select your Price Range
              </div>
              <div className="priceRange-popup-heading-1-os">
                Please select your price range for suggestion number
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    filters?.min_price >= filters?.max_price ||
                    !filters?.max_price
                  ) {
                    setPriceRangeWarning(true);
                  } else {
                    setPriceRangeWarning(false);
                    setPriceRangePopup(false);

                    handleSubmit();
                  }
                }}
              >
                <div className="priceRange-form-os">
                  <div className="priceRange-form-row-os">
                    <div className="priceRange-input-os">
                      <input
                        onChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          handleFilters("min_price", parseInt(filteredValue));
                        }}
                        value={filters?.min_price || ""}
                        type="text"
                        placeholder="Min."
                      />
                    </div>
                    <span>To</span>
                    <div className="priceRange-input-os">
                      <input
                        onChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          handleFilters("max_price", parseInt(filteredValue));
                        }}
                        value={filters?.max_price || ""}
                        type="text"
                        placeholder="Max."
                      />
                    </div>
                    {priceWarning && (
                      <p
                        className="price-warning-message"
                        style={{ color: "red" }}
                      >
                        Please enter a valid range of minimum and maximum
                        prices.
                      </p>
                    )}
                  </div>
                  {priceRangeWarning && (
                    <>
                      <div style={{ color: "red" }}>
                        Max price should be more than min price
                      </div>
                    </>
                  )}
                  <button
                    className="priceRange-popup-submit-btn-os"
                    onClick={(e) => {
                      if (
                        filters?.min_price >= filters?.max_price ||
                        !filters?.max_price
                      ) {
                        setPriceRangeWarning(true);
                      } else {
                        setPriceRangeWarning(false);
                        setPriceRangePopup(false);
                        localStorage?.setItem(
                          "vip_minprice",
                          filters?.min_price
                        );
                        localStorage?.setItem(
                          "vip_maxprice",
                          filters?.max_price
                        );
                        localStorage?.setItem("vip_hidePopup", false);
                        updateProfile(
                          {
                            user_blocked_price: true,
                            user_min_price: filters?.min_price,
                            user_max_price: filters?.max_price,
                          },
                          user?.token
                        )
                          .then((res) => {})
                          .catch((error) => {
                            console.error("Error Price Blocked:", error);
                          });
                        handleSubmit();
                      }
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      <MobileSearch queryParams={queryParams} />
    </div>
  );
};

export default Search;