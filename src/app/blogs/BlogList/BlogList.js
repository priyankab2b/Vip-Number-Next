import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { BlogArrayData } from "../BlogArrayData/BlogArrayData";

const BlogList = () => {
  return (
    <div className="container-os">
      <div className="BlogList-row-os">
        {BlogArrayData.map((values, index) => (
          <div key={index} className="BlogList-col-os">
            <BlogCard
              key={index}
              image={values.image}
              profile={values.profile}
              date={values.date}
              heading={values.heading}
              paragraph={values.paragraph}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
