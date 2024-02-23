























/**
 * Rest API call for Home page
 */

/**
 * API call to get active contact list from vTiger
 */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status) {
      localStorage.removeItem("vipcre");
    }
    return Promise.reject(error);
  }
);

const URL = {
  mostContained: "https://admin.leafymango.com/web/most/contain/digit",
  exactPlacement: "https://admin.leafymango.com/web/exact/digit",
  basic: "https://admin.leafymango.com/web/basic/search",
  price: "https://admin.leafymango.com/web/price/search",
  global: [
    "https://admin.leafymango.com/web/platinum/search",
    "https://admin.leafymango.com/web/gold/search",
    "https://admin.leafymango.com/web/silver/search",
    "https://admin.leafymango.com/web/bronze/search",
    "https://admin.leafymango.com/web/global/basic/search",
  ],
  advanced: "https://admin.leafymango.com/web/advance/search",
};

export const SearchAPI = async (
  key,
  params,
  userProfile = {},
  page,
  setLazy
) => {
  try {
    if (key === "global") {
      const results = await Promise.all(
        URL.global.map((endpoint) =>
          axios.get(endpoint, {
            params: {
              ...params,
              id: userProfile?.contactid,
            },
          })
        )
      );
      const combinedData = {
        platinum: results[0]?.data || [],
        gold: results[1]?.data || [],
        silver: results[2]?.data || [],
        bronze: results[3]?.data || [],
        globalBasic: results[4]?.data || [],
      };
      if (setLazy) {
        setLazy({
          platinum: results[0]?.data?.nextURL,
          gold: results[1]?.data?.nextURL,
          silver: results[2]?.data?.nextURL,
          bronze: results[3]?.data?.nextURL,
          globalBasic: results[4]?.data?.nextURL,
        });
      }

      return combinedData;
    } else {
      const endpoint = page ? page : URL[key];
      const response = await axios.get(endpoint, {
        params: {
          ...params,
          id: userProfile?.contactid,
        },
      });

      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (Token) => {
  try {
    const response = await axios.get("https://admin.leafymango.com/web/cart", {
      headers: {
        authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWishlist = async (Token) => {
  try {
    const response = await axios.get(
      "https://admin.leafymango.com/web/wishlist",
      {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postCart = async (payload, Token) => {
  try {
    const response = await axios.post(
      "https://admin.leafymango.com/web/cart",
      payload,
      {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubCategories = async (id, params) => {
  try {
    const response = await axios.get(
      "https://admin.leafymango.com/web/category/search?id=" + id,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartAndWishList = async (id, Token) => {
  try {
    const response = await axios.delete(
      " https://admin.leafymango.com/web/cart/" + id,
      {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderId = async (payload, Token) => {
  try {
    const response = await axios.post(
      "https://admin.leafymango.com/web/razorpay/order",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useGetCategories = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [categoriesById, setcategoriesById] = useState({});
  useEffect(() => {
    setloading(true);
    axios.get("https://admin.leafymango.com/web/categories").then((res) => {
      setdata(res?.data?.data);
      const obj = {};
      res?.data?.data.forEach((cat) => {
        if (!obj?.[cat?.id]) {
          obj[cat?.id] = cat?.sub_categories;
        }
        setcategoriesById(obj);
      });
      setloading(false);
    });
  }, []);
  return { data, loading, error, categoriesById };
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(
      "https://admin.leafymango.com/web/profile",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (payload, token) => {
  try {
    const response = await axios.post(
      "https://admin.leafymango.com/web/profile/update",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};