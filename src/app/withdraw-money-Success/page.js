import React from "react";
import Header from "../Shared/Header/Header";
import WithdrawalThankyouData from "./WithdrawalThankyouData/WithdrawalThankyouData";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";

const WithdrawalThankyou = () => {
  return (
    <div className="WithdrawalThankyou-page-os">
      <Header />
      <MobileHeader />
      <WithdrawalThankyouData />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default WithdrawalThankyou;