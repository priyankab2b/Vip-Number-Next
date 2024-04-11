import React from "react";
import "./Blogs.css";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import HowWeDeliverBanner from "./HowWeDeliverBanner/HowWeDeliverBanner";
import BlogList from "./BlogList/BlogList";

const Blogs = () => {
  return (
    <div className="">
      <Header />
      <MobileHeader />
      <HowWeDeliverBanner
        headingText="Our Blog"
        textPara="Lorem Ipsum is simply dummy text of the printing and typesetting"
      />
      <BlogList />
      <MobileFooter />
      <Footer />
    </div>
  );
};

export default Blogs;
