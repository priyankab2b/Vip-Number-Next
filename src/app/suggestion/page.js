'use client'
import React, { useState, useContext } from "react";
import "./Suggestion.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MobileFooter from "../components/MobileFooter/MobileFooter";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import SuggestionBanner from "./SuggestionBanner/SuggestionBanner";
import Search from "../components/Search/Search";
import Categories from "../home/Categories/Categories";
import SuggestionFeaturedNumber from "./SuggestionFeaturedNumber/SuggestionFeaturedNumber";
import FamilyPack from "../home/FamilyPack/FamilyPack";
import CarHomeBikeLucky from "./CarHomeBikeLucky/CarHomeBikeLucky";
import FAQs from "../components/FAQs/FAQs";
import OurCustomers from "../components/OurCustomers/OurCustomers";
import VideoTestimonial from "../components/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../components/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import FilterTabs from "../components/FilterTabs/FilterTabs";
import SuggestionUserHostory from "./SuggestionUserHostory/SuggestionUserHostory";
import SuggestionRelated from "./SuggestionRelated/SuggestionRelated";
import { Helmet } from "react-helmet";

// Images
import RegisterImg1 from "../assets/assurance-register-img.svg";

export const SearchContext = React.createContext(null);
const Suggestion = ({ Seo }) => {
    const { user } = useContext(AppStateContext);
    const [searchResults] = useState([]);
    const [seracPrice] = useState([]);
    const [besSeach] = useState([]);
    const [digit] = useState([]);
    const [suggestion, setSuggestion] = useState();
    const [data, setData] = useState([]);

    return (
        <div className="suggestion-page-os">
            <Helmet>
                <title>{Seo?.meta_title}</title>
                <meta name="description" content={Seo?.meta_description} />
            </Helmet>
            <Header />
            <MobileHeader />
            <SuggestionBanner
                headingText="Suggestion Page"
                subHeading="Get Instant Support from our team for VIP Number"
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
                        <FilterTabs />
                    </div>
                </div>
            </SearchContext.Provider>
            <CarHomeBikeLucky
                {...{ suggestion, setSuggestion, setData, data, user }}
            />
            <SuggestionUserHostory />
            <SuggestionRelated />
            <Categories />
            <SuggestionFeaturedNumber />
            <FamilyPack />
            <FAQs />
            <OurCustomers />
            <VideoTestimonial />
            <RegisterVipNumber
                image={RegisterImg1}
                heading="Assurance of a refund"
                subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
                buttonText={user?.token ? "Suggestions" : "Register"}
                buttonText1={user?.token ? "Suggestions" : "Register"}
            // buttonUrl='/register' buttonUrl1='/register'
            />
            <QRVipApp />
            <MobileFooter />
            <Footer />
        </div>
    );
};

export default Suggestion;