import React, { useState, useEffect, useContext } from "react";
import SearchFilterInput from "../SearchFilterInput/SearchFilterInput";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
// import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import { AppliedTags } from "../Search/Search";
import Image from "next/image";

// Images
import icon1 from "../../assets/mobile-search-icon-1.svg";
import icon2 from "../../assets/mobile-search-icon-2.svg";
import icon4 from "../../assets/mobile-search-icon-4.svg";
import miniIcon from "../../assets/seach-with-digits-heading-icon.svg";

const MobileSearch = ({ queryParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile } = useContext(AppStateContext);
  // register popup context
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [priceWarning, setPriceWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  const [searchBy, setSearchBy] = useState("digit");
  const [filters, setFilters] = useState({
    type: "global",
  });
  const [selectedOption, setSelectedOption] = useState("option1");
  const [firstDigitValidation, setFirstDigitValidation] = useState(false);
  const [errorMustContain, setErrorMustContain] = useState("");
  const [errorNotContain, setErrorNotContain] = useState("");
  const [showAdvancedWarning, setShowAdvancedWarning] = useState(false);
  const [mustContainedWarning, setmustContainedWarning] = useState(false);
  const [basicSearchSatrtWith, setbasicSearchSatrtWith] = useState(false);

  // Reset filters once when user switched between tabs.
  useEffect(() => {
    // setFilters({});
  }, [searchBy]);

  // Username
  const getName = () => {
    if (!user) {
      return false;
    }
    if (
      firstname ||
      lastname ||
      userProfile?.firstname ||
      userProfile?.lastname
    ) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else if (mobile || email) {
      return mobile || email;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (queryParams) {
      if (queryParams?.searchBy === "digit") {
        const currentfilters = { ...queryParams };
        const obj = {};
        if (queryParams?.type === "exactPlacement") {
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(0)
            )
          )
            obj[0] = queryParams?.search_string.charAt(0);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(1)
            )
          )
            obj[1] = queryParams?.search_string.charAt(1);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(2)
            )
          )
            obj[2] = queryParams?.search_string.charAt(2);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(3)
            )
          )
            obj[3] = queryParams?.search_string.charAt(3);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(4)
            )
          )
            obj[4] = queryParams?.search_string.charAt(4);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(5)
            )
          )
            obj[5] = queryParams?.search_string.charAt(5);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(6)
            )
          )
            obj[6] = queryParams?.search_string.charAt(6);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(7)
            )
          )
            obj[7] = queryParams?.search_string.charAt(7);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(8)
            )
          )
            obj[8] = queryParams?.search_string.charAt(8);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(9)
            )
          )
            obj[9] = queryParams?.search_string.charAt(9);
        }
        setFilters({ ...currentfilters, ...obj });
      } else {
        setFilters(queryParams);
      }
      setSearchBy(queryParams?.searchBy);
    }
  }, [queryParams]);

  const getSearchResultsData = (type = {}) => {
    pathname({
      pathname: "/search-results",
      search: `?${useSearchParams({
        searchBy,
        ...filters,
        ...type,
      })}`,
    });
  };

  const handleFiltersResults = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  //Advance search
  const hmobileAdvanceSearch = (e) => {
    e.preventDefault();
    getSearchResultsData({ type: "advanced" });
  };

  //exact digit placement
  const mobilePlacementDigit = (e) => {
    e.preventDefault();
    getSearchResultsData({ type: "exactPlacement" });
  };

  //Most Contain Search
  const mobileMostContainSearch = (e) => {
    e.preventDefault();
    if (
      filters?.search_string?.length !== 1 &&
      filters?.search_string?.length !== 2
    ) {
      setShowError(true);
    } else {
      getSearchResultsData({ type: "mostContained" });
      setShowError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[\d\*,]{0,10}$/.test(filters?.number)) {
      setPriceWarning(true);
    } else {
      getSearchResultsData({ type: "global" });
    }
  };

  //Price Search Min To Max
  const mobilePriceSunmit = (e) => {
    if (
      filters?.min_price >= 0 ||
      filters?.max_price >= 0 ||
      filters?.max_price > filters?.min_price
    ) {
      setPriceWarning(false);
      getSearchResultsData();
    } else {
      setPriceWarning(true);
    }
  };

  //Basic Search
  const mobileSearchBasic = () => {
    if (!filters?.basicSearchtype) {
      setShowCheckboxWarning(true);
    } else {
      setShowCheckboxWarning(false);
      getSearchResultsData({ type: "basic" });
    }
  };

  // Mobile tabs
  const handleMobileTab = (val) => {
    setSearchBy(val);
    setFilters({
      searchBy: val,
    });
  };

  const handleMobileFilter = (val) => {
    setFilters({
      ...filters,
      type: val,
    });
    setPriceWarning(false);
    setErrorMustContain(false);
    setErrorNotContain(false);
    setFirstDigitValidation(false);
    setShowAdvancedWarning(false);
    setmustContainedWarning(false);
  };
  // Radio buttons filter

  const handleOptionChange = (event) => {
    setSelectedOption(event);
  };
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

  const handleMobileSearch = () => {
    switch (filters?.type) {
      case "global":
        if (!/^[\d\*,]{0,10}$/.test(filters?.number)) {
          setPriceWarning(true);
        } else {
          setPriceWarning(false);
          getSearchResultsData({ type: "global" });
        }
        break;
      case "basic":
        if (filters?.basicSearchtype === "start_with") {
          if (
            !["9", "8", "7", "6"]?.includes(
              filters?.number?.toString()?.charAt(0)
            )
          ) {
            setbasicSearchSatrtWith(true);
            return;
          }
        }
        setbasicSearchSatrtWith(false);
        if (!filters?.basicSearchtype) {
          setShowCheckboxWarning(true);
        } else if (!filters?.number) {
          setPriceWarning(true);
        } else {
          setPriceWarning(false);
          setShowCheckboxWarning(false);
          getSearchResultsData({ type: "basic" });
        }
        break;
      case "advanced":
        if (
          filters?.contains &&
          filters?.not_contains &&
          filters?.not_contains === filters?.contains
        ) {
          setmustContainedWarning(true);
          return false;
        }
        if (
          filters?.start_with &&
          !["9", "8", "7", "6"]?.includes(filters?.start_with?.charAt(0))
        ) {
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
          getSearchResultsData({ type: "advanced" });
        }
        break;
      case "exactPlacement":
        const inputs = document.querySelectorAll(
          "#exact-digits-inputs-m input"
        );
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
        if (digitString?.split("")?.every((key) => key === "*")) {
          setPriceWarning(true);
          return false;
        }
        setPriceWarning(false);
        getSearchResultsData({
          type: "exactPlacement",
          search_string: digitString,
        });
        break;
      case "mostContained":
        if (
          filters?.search_string?.length !== 1 &&
          filters?.search_string?.length !== 2
        ) {
          setShowError(true);
        } else {
          getSearchResultsData({ type: "mostContained" });
          setShowError(false);
        }
        break;

      default:
        break;
    }
  };

  const handleExactChange = (e, iIndex) => {
    if (e.target.value.length === 1) {
      handleFiltersResults(iIndex, e.target.value);
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form[index + 1].focus();
      e.preventDefault();
    }
  };
  return (
    <div>
      <section id="mobile-search-id-os" className="MobileSearch-section-os">
        <div className="container-os">
          <div className="MobileSearch-filter-tabs-data-os">
            <div className="MobileSearch-filter-tabs-row-os">
              <div
                onClick={() => {
                  handleMobileTab("digit");
                  handleMobileFilter("global");
                }}
                className={
                  searchBy === "digit"
                    ? "MobileSearch-filter-tabs-col-1-os active"
                    : "MobileSearch-filter-tabs-col-1-os"
                }
              >
                <div className="MobileSearch-filter-tabs-image-os">
                  <Image src={icon1} alt="" />
                </div>
                <h4>Search by Digits</h4>
              </div>

              <div
                onClick={() => {
                  handleMobileTab("price");
                  setSearchBy("price");
                }}
                className={
                  searchBy === "price"
                    ? "MobileSearch-filter-tabs-col-1-os active"
                    : "MobileSearch-filter-tabs-col-1-os"
                }
              >
                <div className="MobileSearch-filter-tabs-image-os">
                  <Image src={icon2} alt="" />
                </div>
                <h4>Search by Price</h4>
              </div>
              {router?.pathname !== "/search-your-number" ? (
                <div
                  onClick={() => {
                    if (getName()) {
                        pathname("/suggestion-for-you");
                    } else {
                      setActiveSignInWithOtp(true);
                    }
                  }}
                  className={
                    searchBy === "mobile-tab-4"
                      ? "MobileSearch-filter-tabs-col-1-os active"
                      : "MobileSearch-filter-tabs-col-1-os"
                  }
                >
                  <div className="MobileSearch-filter-tabs-image-os">
                    <Image src={icon4} alt="" />
                  </div>
                  <h4>Suggestion</h4>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {searchBy === "digit" ? (
            <div
              className={
                searchBy === "digit"
                  ? "MobileSearch-filter-content-data-os active"
                  : "MobileSearch-filter-content-data-os"
              }
            >
              <div className="MobileSearch-filter-search-by-digits-row-os">
                <div className="MobileSearch-filter-search-by-digits-heading-os">
                  <div>
                    <Image src={miniIcon} alt="" />
                  </div>
                  Search by Digits
                </div>
                {router?.pathname !== "/search-your-number" ? (
                  <div className="MobileSearch-filter-search-by-digits-filters-row-os">
                    <button
                      onClick={() => handleMobileFilter("global")}
                      className={
                        filters?.type === "global"
                          ? "MobileSearch-filter-button-1-os active"
                          : "MobileSearch-filter-button-1-os"
                      }
                    >
                      Global Search
                    </button>
                    <button
                      onClick={() => {
                        setFilters({
                          ...filters,
                          type: "basic",
                          basicSearchtype: "any_where",
                        });
                      }}
                      className={
                        filters?.type === "basic"
                          ? "MobileSearch-filter-button-1-os active"
                          : "MobileSearch-filter-button-1-os"
                      }
                    >
                      Premium Search
                    </button>
                    <button
                      onClick={() => handleMobileFilter("advanced")}
                      className={
                        filters?.type === "advanced"
                          ? "MobileSearch-filter-button-1-os active"
                          : "MobileSearch-filter-button-1-os"
                      }
                    >
                      Advance Search
                    </button>
                    <button
                      onClick={() => handleMobileFilter("exactPlacement")}
                      className={
                        filters?.type === "exactPlacement"
                          ? "MobileSearch-filter-button-1-os active"
                          : "MobileSearch-filter-button-1-os"
                      }
                    >
                      Exact Digit Placement
                    </button>
                    <button
                      onClick={() => handleMobileFilter("mostContained")}
                      className={
                        filters?.type === "mostContained"
                          ? "MobileSearch-filter-button-1-os active"
                          : "MobileSearch-filter-button-1-os"
                      }
                    >
                      Most Contains
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div className="MobileSearch-filter-search-by-digits-filter-content-1-os">
                  {filters?.type === "global" ? (
                    <form
                      onSubmit={handleSubmit}
                      className={
                        filters?.type === "global"
                          ? "MobileSearch-filter-search-by-digits-filter-1-os active"
                          : "MobileSearch-filter-search-by-digits-filter-1-os"
                      }
                    >
                      <div className="MobileSearch-global-search-input-os">
                        <SearchFilterInput
                          inputLabel="Enter Digits Here"
                          inputType="text"
                          placeHolder="e.g: 0000"
                          inputValue={filters?.number}
                          inputOnChange={(e) => {
                            const regex = /^[0-9,\*]*$/;
                            if (regex.test(e.target.value)) {
                              handleFiltersResults("number", e.target.value);
                            }
                          }}
                        />
                        {priceWarning && (
                          <p
                            className="warning-message"
                            style={{ color: "red" }}
                          >
                            Please enter maximum 10 digit number.
                          </p>
                        )}
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}

                  {filters?.type === "basic" ? (
                    <form
                      onSubmit={mobileSearchBasic}
                      className={
                        filters?.type === "basic"
                          ? "MobileSearch-filter-search-by-digits-filter-1-os active"
                          : "MobileSearch-filter-search-by-digits-filter-1-os"
                      }
                    >
                      <div className="MobileSearch-basic-search-input-os">
                        {
                          <SearchFilterInput
                            inputLabel="Enter Digits Here"
                            inputType="text"
                            placeHolder="e.g: 0000"
                            inputValue={filters?.number}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              handleFiltersResults("number", filteredValue);
                            }}
                          />
                        }
                        {basicSearchSatrtWith && (
                          <p style={{ color: "red" }}>
                            Only 9,8,7 and 6 are allowed to start with.
                          </p>
                        )}
                      </div>
                      <div className="search-filter-checkboxes-row-os">
                        <label>
                          <input
                            type="radio"
                            name="option2"
                            value="start_with"
                            checked={filters?.basicSearchtype === "start_with"}
                            onChange={(e) => {
                              handleFiltersResults(
                                "basicSearchtype",
                                e.target.value
                              );
                            }}
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>
                            Start with
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="option2"
                            value="any_where"
                            checked={filters?.basicSearchtype === "any_where"}
                            onChange={(e) => {
                              handleFiltersResults(
                                "basicSearchtype",
                                e.target.value
                              );
                            }}
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Anywhere
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="option2"
                            value="end_with"
                            checked={filters?.basicSearchtype === "end_with"}
                            onChange={(e) => {
                              handleFiltersResults(
                                "basicSearchtype",
                                e.target.value
                              );
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
                      {priceWarning && (
                        <p className="warning-message" style={{ color: "red" }}>
                          Please enter digit number.
                        </p>
                      )}
                    </form>
                  ) : (
                    <></>
                  )}

                  {filters?.type === "advanced" ? (
                    <form
                      onSubmit={hmobileAdvanceSearch}
                      className={
                        filters?.type === "advanced"
                          ? "MobileSearch-filter-search-by-digits-filter-1-os active"
                          : "MobileSearch-filter-search-by-digits-filter-1-os"
                      }
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
                                handleFiltersResults(
                                  "start_with",
                                  e.target.value
                                );
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
                              handleFiltersResults("any_where", filteredValue);
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
                              handleFiltersResults("end_with", filteredValue);
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
                                handleFiltersResults("contains", filteredValue);
                                setErrorMustContain("");
                              } else {
                                setErrorMustContain(
                                  "Please do not enter the same number in both fields."
                                );
                              }
                            }}
                          />
                          {errorMustContain && (
                            <div className="error-message">
                              {errorMustContain}
                            </div>
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
                                checkForDuplicates(
                                  filters?.contains,
                                  filteredValue
                                )
                              ) {
                                handleFiltersResults(
                                  "not_contains",
                                  filteredValue
                                );
                                setErrorNotContain("");
                              } else {
                                setErrorNotContain(
                                  "Please do not enter the same number in both fields."
                                );
                              }
                            }}
                          />
                          {errorNotContain && (
                            <div className="error-message">
                              {errorNotContain}
                            </div>
                          )}
                        </div>
                        <div className="filter-advance-search-alert-message-os">
                          Others (For multiple values use comma (s) e.g 14,18)
                        </div>
                      </div>
                      <div className="search-filter-advance-search-heading-os">
                        Total/Sum
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
                              handleFiltersResults("total", filteredValue);
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
                              handleFiltersResults("sum", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-8-os">
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
                    </form>
                  ) : (
                    <></>
                  )}

                  {filters?.type === "exactPlacement" ? (
                    <form
                      onSubmit={mobilePlacementDigit}
                      className={
                        filters?.type === "exactPlacement"
                          ? "MobileSearch-filter-search-by-digits-filter-1-os active"
                          : "MobileSearch-filter-search-by-digits-filter-1-os"
                      }
                    >
                      <div className="search-by-exact-digits-heading-os">
                        Fil Digital at exact placement where you want that and
                        left others box empty SEARCH
                      </div>
                      <form
                        className="search-by-exact-digits-row-os"
                        id="exact-digits-inputs-m"
                      >
                        <div className="search-by-exact-digits-input-os">
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[0]}
                            inputtype="numeric"
                            id="otc-2"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFiltersResults("0", "");
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "0");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1]?.focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "1");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "2");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "3");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "4");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "5");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "6");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "7");
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
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleExactChange(e, "8");
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[9]}
                            inputtype="numeric"
                            id="otc-11"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                const form = e.target.form;
                                const index = [...form].indexOf(e.target);
                                form[index - 1].focus();
                                handleFiltersResults(index, "");

                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              handleFiltersResults("9", e.target.value);
                            }}
                          />
                        </div>
                      </form>
                      {priceWarning && (
                        <p className="warning-message" style={{ color: "red" }}>
                          Please at least one digit.
                        </p>
                      )}
                    </form>
                  ) : (
                    <></>
                  )}

                  {filters?.type === "mostContained" ? (
                    <form
                      onSubmit={mobileMostContainSearch}
                      className={
                        filters?.type === "mostContained"
                          ? "MobileSearch-filter-search-by-digits-filter-1-os active"
                          : "MobileSearch-filter-search-by-digits-filter-1-os"
                      }
                    >
                      <div className="search-by-most-contains-col-1-os">
                        <SearchFilterInput
                          inputLabel="Enter Single or two digits that you want in your VIP Mobile Number"
                          inputType="text"
                          placeHolder="e.g: 00"
                          inputValue={filters?.search_string}
                          inputOnChange={(e) => {
                            const filteredValue = e.target.value.replace(
                              /[^0-9,\*]/g,
                              ""
                            );
                            handleFiltersResults(
                              "search_string",
                              filteredValue
                            );
                            handleFiltersResults("search_string", filteredValue);
                          }}
                        />

                        {showError && (
                          <p style={{ color: "red" }}>
                            Please enter a one or two-digit number.
                          </p>
                        )}
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleMobileSearch();
                }}
                className="search-filter-search-number-btn-os"
              >
                Search Number
              </button>
              <AppliedTags queryParams={queryParams} />
            </div>
          ) : (
            <></>
          )}

          {searchBy === "price" ? (
            <form
              onSubmit={mobilePriceSunmit}
              className={
                searchBy === "price"
                  ? "MobileSearch-filter-content-data-os active"
                  : "MobileSearch-filter-content-data-os"
              }
            >
              {/* Search by Price */}
              <form
                className="search-filter-input-data-os"
                onSubmit={mobilePriceSunmit}
              >
                <div className="search-filter-input-data-row-os">
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
                          handleFiltersResults(
                            "min_price",
                            parseInt(inputValue)
                          );
                        } else {
                          setPriceWarning(true);
                        }
                      }}
                      inputValue={filters?.min_price}
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
                          handleFiltersResults(
                            "max_price",
                            parseInt(inputValue || 0)
                          );
                        } else {
                          setPriceWarning(true);
                        }
                      }}
                      inputValue={filters?.max_price}
                    />
                  </div>
                </div>
                {priceWarning && (
                  <p className="price-warning-message" style={{ color: "red" }}>
                    Please enter a valid range of minimum and maximum prices.
                  </p>
                )}
                <div className="search-by-price-filter-col-3-os">
                  <button
                    type="button"
                    onClick={() => mobilePriceSunmit({})}
                    className="search-filter-search-number-btn-os-1"
                  >
                    Search Number
                  </button>
                </div>
              </form>
            </form>
          ) : (
            <></>
          )}

          {searchBy === "mobile-tab-3" ? (
            <div
              className={
                searchBy === "mobile-tab-3"
                  ? "MobileSearch-filter-content-data-os active"
                  : "MobileSearch-filter-content-data-os"
              }
            >
              {/* Family Pack */}
              <div className="search-family-pack-heading-text-os">
                How much Similar Numbers do you want for your family or
                Business?
              </div>
              <div className="search-filter-input-data-os">
                <div className="search-by-familyPack-col-1-os">I Want</div>
                <div className="search-by-familyPack-col-2-os">
                  <select name="" id="">
                    <option value="0">Select</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="search-by-familyPack-col-3-os">
                  SIMILAR VIP MOBILE NUMBER
                </div>
                <div className="search-by-familyPack-col-4-os">
                  <button className="search-filter-search-number-btn-os-1">
                    Search Number
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default MobileSearch;
