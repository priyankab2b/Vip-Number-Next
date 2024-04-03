import { useState, useEffect } from "react";
import "./FilterTabs.css";
import OutsideClickHandler from "react-outside-click-handler";
import { useGetQueryParams } from "../../utils";
// import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterTabsCat = ({
    selectedFilter,
    setSelectedFilter,
    setFilteredData,
}) => {
    const { queryParams } = useGetQueryParams();
    const location = usePathname();
    const navigate = useRouter();
    const [selectFilter, setSelectFilter] = useState("filter-1-os");
    const [activeFilter, setActiveFilter] = useState(false);
    const [total, setTotal] = useState("");
    const [sum, setSum] = useState("");
    const [sortingOrder, setSortingOrder] = useState("low-to-high");
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [appliedFiltersCounts, setAppliedFiltersCounts] = useState(0);
    const [data, setData] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        premium: true,
        basic: false,
    });

    const [priceRange, setPriceRange] = useState({
        under1500: false,
        under2500: false,
        between1500and4000: false,
        between3000and7500: false,
        between5000and12500: false,
        between8000and25000: false,
        between18000and50000: false,
        over35000: false,
    });

    const updateAppliedFiltersCount = () => {
        let count = 0;
        if (selectedNumbers?.length) count++;
        if (checkedItems.basic) count++;
        if (checkedItems.premium) count++;
        if (total) count++;
        if (sum) count++;
        if (sortingOrder === "low-to-high" || sortingOrder === "high-to-low") {
            count++;
        }
        if (Object.values(priceRange).some((value) => value === true)) count++;
        setAppliedFiltersCounts(count);
    };

    useEffect(() => {
        selectedFilter && selectedFilter?.length && setData(selectedFilter);
    }, [selectedFilter]);


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: checked,
        }));
        updateAppliedFiltersCount();
    };

    const handleSelectFilter = (activeFilter) => {
        setSelectFilter(activeFilter);
        updateAppliedFiltersCount();
    };

    const handleFilterShow = () => {
        setActiveFilter(true);
    };

    const handleFilterHide = () => {
        setActiveFilter(false);
        setTotal("");
        setSum("");
    };

    const handleUncheckedAll = () => {
        setCheckedAll(false);
        setSelectedNumbers([]);
        const route = {
            ...queryParams,
            callCount: 1,
        };
        delete route?.start_with;
        delete route?.min_price;
        delete route?.max_price;
        delete route?.sum;
        delete route?.total;
        delete route?.number;
        navigate.push({
            pathname: location?.pathname,
            search: `?${useSearchParams(route)}`,
        });
    };

    const handleSortingOrderChange = (event) => {
        setSortingOrder(event.target.value);
        updateAppliedFiltersCount();
    };

    const handleSelect = (e) => {
        const selectedNumber = e.target.value;
        let newSelectedNumbers = [...selectedNumbers];
        if (e.target.checked) {
            newSelectedNumbers.push(selectedNumber);
        } else {
            newSelectedNumbers = newSelectedNumbers.filter(
                (num) => num !== selectedNumber
            );
        }
        setSelectedNumbers(newSelectedNumbers);
        updateAppliedFiltersCount();
    };

    const applyFilters = () => {
        const filterObj = {};
        if (selectedNumbers?.length) {
            if (queryParams?.type === "basic") {
                filterObj["number"] = selectedNumbers?.join();
                filterObj["basicSearchtype"] = "start_with";
            } else {
                filterObj["start_with"] = selectedNumbers?.join();
            }
        }
        if (checkedItems.basic) filterObj["seller"] = "BASIC";
        if (checkedItems.premium)
            filterObj["seller"] = filterObj["seller"]
                ? filterObj["seller"] + "," + "PREMIUM"
                : "PREMIUM";
        if (total) filterObj["total"] = total.split(",").map(value => parseFloat(value.trim())).join(",");
        if (sum) filterObj["sum"] = sum.split(",").map(value => parseFloat(value.trim())).join(",");
        if (sortingOrder)
            filterObj["sort"] = sortingOrder === "low-to-high" ? "asc" : "desc";




        if (priceRange.under1500) {
            filterObj["min_price"] = "0";
            filterObj["max_price"] = "1500";
        }
        if (priceRange.under2500) {
            filterObj["min_price"] = "0";
            filterObj["max_price"] = "2500";
        }
        if (priceRange.between1500and4000) {
            filterObj["min_price"] = "1500";
            filterObj["max_price"] = "4000";
        }
        if (priceRange.between3000and7500) {
            filterObj["min_price"] = "3000";
            filterObj["max_price"] = "7500";
        }
        if (priceRange.between5000and12500) {
            filterObj["min_price"] = "5000";
            filterObj["max_price"] = "12500";
        }
        if (priceRange.between8000and25000) {
            filterObj["min_price"] = "8000";
            filterObj["max_price"] = "25000";
        }
        if (priceRange.between18000and50000) {
            filterObj["min_price"] = "18000";
            filterObj["max_price"] = "50000";
        }
        if (priceRange.over35000) {
            filterObj["min_price"] = "35000";
        }

        const selectedPriceRanges = [];

        if (priceRange.under1500) selectedPriceRanges.push({ min: 0, max: 1500 });
        if (priceRange.under2500) selectedPriceRanges.push({ min: 0, max: 2500 });
        if (priceRange.between1500and4000) selectedPriceRanges.push({ min: 1500, max: 4000 });
        if (priceRange.between3000and7500) selectedPriceRanges.push({ min: 3000, max: 7500 });
        if (priceRange.between5000and12500) selectedPriceRanges.push({ min: 5000, max: 12500 });
        if (priceRange.between8000and25000) selectedPriceRanges.push({ min: 8000, max: 25000 });
        if (priceRange.between18000and50000) selectedPriceRanges.push({ min: 18000, max: 50000 });
        if (priceRange.over35000) selectedPriceRanges.push({ min: 35000, max: 100000000 });

        let overallMinPrice = Number.MAX_SAFE_INTEGER;
        let overallMaxPrice = Number.MIN_SAFE_INTEGER;

        for (const priceRange of selectedPriceRanges) {
            overallMinPrice = Math.min(overallMinPrice, priceRange.min);
            overallMaxPrice = Math.max(overallMaxPrice, priceRange.max);
        }

        if (overallMinPrice !== Number.MAX_SAFE_INTEGER) {
            filterObj["min_price"] = overallMinPrice.toString();
        }
        if (overallMaxPrice !== Number.MIN_SAFE_INTEGER) {
            filterObj["max_price"] = overallMaxPrice.toString();
        }


        const route = {
            categoryId: queryParams?.categoryId,
            ...filterObj,
        };
        navigate.push({
            pathname: location?.pathname,
            search: `?${useSearchParams(route)}`,
        });

        //Calculate the count of applied filters
        updateAppliedFiltersCount();
    };

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setActiveFilter(false);
            }}
        >
            <div className="multiple-filters-row-os">
                <div className="multiple-filters-col-os" onClick={handleFilterShow}>
                    <div className="multiple-filters-count-os">
                        {appliedFiltersCounts}
                    </div>
                    Apply Filters
                    <button className="multiple-filters-selector-arrow-os">
                        <svg
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 0H2.71713H0L8 8L16 0Z" fill="#6019EB" />
                        </svg>
                    </button>
                </div>
                {activeFilter && (
                    <div className={`multiple-filters-tabs-main-row-os ${activeFilter}`}>
                        <div className="multiple-filters-tabs-heading-row-os">
                            <div className="multiple-filters-tabs-heading-col-1-os">
                                Filter
                            </div>
                            <div
                                onClick={handleUncheckedAll}
                                className="multiple-filters-tabs-heading-col-2-os"
                            >
                                Clear all
                            </div>
                        </div>
                        <div className="multiple-filters-tabs-data-row-os">
                            <div className="multiple-filters-tabs-data-col-1-os">
                                <ul>
                                    <li
                                        onClick={() => handleSelectFilter("filter-1-os")}
                                        className={
                                            selectFilter === "filter-1-os"
                                                ? "filter-tab-os active"
                                                : "filter-tab-os"
                                        }
                                    >
                                        Start with
                                    </li>
                                    <li
                                        onClick={() => handleSelectFilter("filter-2-os")}
                                        className={
                                            selectFilter === "filter-2-os"
                                                ? "filter-tab-os active"
                                                : "filter-tab-os"
                                        }
                                    >
                                        Price Range
                                    </li>
                                    <li
                                        onClick={() => handleSelectFilter("filter-3-os")}
                                        className={
                                            selectFilter === "filter-3-os"
                                                ? "filter-tab-os active"
                                                : "filter-tab-os"
                                        }
                                    >
                                        Seller
                                    </li>
                                    <li
                                        onClick={() => handleSelectFilter("filter-4-os")}
                                        className={
                                            selectFilter === "filter-4-os"
                                                ? "filter-tab-os active"
                                                : "filter-tab-os"
                                        }
                                    >
                                        Numerology
                                    </li>
                                    <li
                                        onClick={() => handleSelectFilter("filter-5-os")}
                                        className={
                                            selectFilter === "filter-5-os"
                                                ? "filter-tab-os active"
                                                : "filter-tab-os"
                                        }
                                    >
                                        Sorting
                                    </li>
                                </ul>
                            </div>
                            <div className="multiple-filters-tabs-data-col-2-os">
                                <div
                                    className={
                                        selectFilter === "filter-1-os"
                                            ? "multiple-filters-tabs-content-data-os active"
                                            : "multiple-filters-tabs-content-data-os"
                                    }
                                >
                                    <div className="multiple-filters-checkbox-col-os">
                                        <label className="multiple-filters-checkbox-os">
                                            6
                                            <input
                                                type="checkbox"
                                                value="6"
                                                onChange={handleSelect}
                                                checked={selectedNumbers.includes("6")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-os">
                                        <label className="multiple-filters-checkbox-os">
                                            7
                                            <input
                                                type="checkbox"
                                                value="7"
                                                onChange={handleSelect}
                                                checked={selectedNumbers.includes("7")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-os">
                                        <label className="multiple-filters-checkbox-os">
                                            8
                                            <input
                                                type="checkbox"
                                                value="8"
                                                onChange={handleSelect}
                                                checked={selectedNumbers.includes("8")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-os">
                                        <label className="multiple-filters-checkbox-os">
                                            9
                                            <input
                                                type="checkbox"
                                                value="9"
                                                onChange={handleSelect}
                                                checked={selectedNumbers.includes("9")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <div
                                    className={
                                        selectFilter === "filter-2-os"
                                            ? "multiple-filters-tabs-content-data-os active"
                                            : "multiple-filters-tabs-content-data-os"
                                    }
                                >
                                    <div className="multiple-filters-tabs-content-heading-os">
                                        Price
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            Under ₹1,500
                                            <input
                                                type="checkbox"
                                                checked={priceRange.under1500}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        under1500: !priceRange.under1500,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            under ₹2,500
                                            <input
                                                type="checkbox"
                                                checked={priceRange.under2500}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        under2500: !priceRange.under2500,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            ₹1,500 - ₹4,000
                                            <input
                                                type="checkbox"
                                                checked={priceRange.between1500and4000}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        between1500and4000: !priceRange.between1500and4000,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            ₹3,000 - ₹7,500
                                            <input
                                                type="checkbox"
                                                checked={priceRange.between3000and7500}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        between3000and7500: !priceRange.between3000and7500,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            ₹5,000 - ₹12,500
                                            <input
                                                type="checkbox"
                                                checked={priceRange.between5000and12500}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        between5000and12500:
                                                            !priceRange.between5000and12500,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            ₹8,000 - ₹25,000
                                            <input
                                                type="checkbox"
                                                checked={priceRange.between8000and25000}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        between8000and25000:
                                                            !priceRange.between8000and25000,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            ₹18,000 - ₹50,000
                                            <input
                                                type="checkbox"
                                                checked={priceRange.between18000and50000}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        between18000and50000:
                                                            !priceRange.between18000and50000,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            Over ₹35,000
                                            <input
                                                type="checkbox"
                                                checked={priceRange.over35000}
                                                onChange={() =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        over35000: !priceRange.over35000,
                                                    })
                                                }
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <div
                                    className={
                                        selectFilter === "filter-3-os"
                                            ? "multiple-filters-tabs-content-data-os active"
                                            : "multiple-filters-tabs-content-data-os"
                                    }
                                >
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label
                                            className={`multiple-filters-checkbox-os `}
                                        >
                                            Premium
                                            <input
                                                type="checkbox"
                                                name="premium"
                                                checked={checkedItems.premium}
                                                onChange={handleCheckboxChange}

                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label
                                            className={`multiple-filters-checkbox-os
                       `}
                                        >
                                            Basic
                                            <input
                                                type="checkbox"
                                                name="basic"
                                                checked={checkedItems.basic}
                                                onChange={handleCheckboxChange}

                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <div
                                    className={
                                        selectFilter === "filter-4-os"
                                            ? "multiple-filters-tabs-content-data-os active"
                                            : "multiple-filters-tabs-content-data-os"
                                    }
                                >
                                    <div className="multiple-filters-numerology-input-data-os">
                                        <span>Total</span>
                                        <input
                                            type="text"
                                            placeholder="e.g 23"
                                            value={total}
                                            onChange={(e) => setTotal(e.target.value)}
                                        />
                                    </div>
                                    <div className="multiple-filters-numerology-input-data-os">
                                        <span>Sum</span>
                                        <input
                                            type="text"
                                            placeholder="e.g 56"
                                            value={sum}
                                            onChange={(e) => setSum(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={
                                        selectFilter === "filter-5-os"
                                            ? "multiple-filters-tabs-content-data-os active"
                                            : "multiple-filters-tabs-content-data-os"
                                    }
                                >
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            Price high to low
                                            <input
                                                type="radio"
                                                name="price-sort"
                                                value="high-to-low"
                                                checked={sortingOrder === "high-to-low"}
                                                onClick={handleSortingOrderChange}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="multiple-filters-checkbox-col-1-os">
                                        <label className="multiple-filters-checkbox-os">
                                            Price low to high
                                            <input
                                                type="radio"
                                                name="price-sort"
                                                value="low-to-high"
                                                checked={sortingOrder === "low-to-high"}
                                                onClick={handleSortingOrderChange}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="multiple-filters-footer-buttons-row-os">
                            <button
                                onClick={handleFilterHide}
                                className="multiple-filters-footer-closeBtn-os"
                            >
                                Close
                            </button>
                            <button
                                className="multiple-filters-footer-applyBtn-os"
                                onClick={() => {
                                    applyFilters();
                                    setActiveFilter(false);
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </OutsideClickHandler>
    );
};

export default FilterTabsCat;