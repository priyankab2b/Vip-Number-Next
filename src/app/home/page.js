"use client"
import React, { useState ,createContext, useContext } from 'react'
import './Home.css'
import Banner from './Banner/Banner';
import MobileHeader from '../components/MobileHeader/MobileHeader';
import Header from '../components/Header/Header';
import MobileFooter from '../components/MobileFooter/MobileFooter';
import Footer from '../components/Footer/Footer'
import { AppStateContext } from '../contexts/AppStateContext/AppStateContext';
import { usePathname } from 'next/navigation';
import Search from '../components/Search/Search';
import { MyRegisterSignInContext } from '../contexts/MyRegisterSignInContext/MyRegisterSignInContext';
import Recommendations from './Recommendations/Recommendations';
import Award from '../components/Award/Award';
import VipNumberShopSlider from './VipNumberShopSlider/VipNumberShopSlider';
import VIPNumberSlider from './VIPNumberSlider/VIPNumberSlider';

// search context
export const SearchContext = createContext(null);

const Homepage = () => {
    const { user, setRedirectTo } = useContext(AppStateContext);
    const navigate = usePathname();
    // register popup context
    const { activeSignInWithOtp, setActiveSignInWithOtp } = useContext(
        MyRegisterSignInContext
    );
    const [searchResults] = useState([]);
    const [seracPrice] = useState([]);
    const [besSeach] = useState([]);
    const [digit] = useState([]);
    const [most] = useState([]);
    const [getAdvance] = useState([]);

    const handleShowRegister = () => {
        if (activeSignInWithOtp === "") {
            setActiveSignInWithOtp("active");
        }
    };


    return (
        <div className="homepage-os">
            <Header />
            <MobileHeader />
            <Banner />
            <SearchContext.Provider
                value={{ searchResults, seracPrice, besSeach, digit, most, getAdvance }}
            >
            <div className="defaultPage-search-section-os">
                <Search />
                <Recommendations />
            </div>
            <Award />
            <VipNumberShopSlider />
            <VIPNumberSlider />
            </SearchContext.Provider>
            <MobileFooter />
            <Footer />
        </div>
    )
}

export default Homepage;
