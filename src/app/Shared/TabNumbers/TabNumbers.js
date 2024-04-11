import axios from "axios";
import React, { useEffect, useState } from "react";
import TabNumberData from "./TabNumberData/TabNumberData";

const TabNumbers = () => {
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://admin.leafymango.com/web/numbers/stats`)
      .then((response) => {
        // setData((prevData) => [...prevData, ...response.data.data]);
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // if (data && Array.isArray(data)) {
    //   // Use map only if data is defined and is an array
    //   const newTitles = data.map((item) => {
    //     // console.log("item?.title", item?.title)
    //     return item?.title;
    //   });
    // }
  }, []);
  //   console.log("data ::", data);
  //   console.log("newTitles ::", newTitles);

  return (
    <div className="TabNumbers-os">
      {data &&
        data.map((item, index) => {
          return (
            <TabNumberData
              title={item?.title}
              data={item?.numbers}
              key={index}
              link={item?.link}
              description={item?.description}
            />
          );
        })}
    </div>
  );
};

export default TabNumbers;
