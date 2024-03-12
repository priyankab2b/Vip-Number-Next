"use client";
import { useEffect } from "react";
import { createContext, useState } from "react";
import {
  deleteCartAndWishList,
  getCart,
  getProfile,
  getWishlist,
  postCart,
  useGetCategories,
} from "../../Services/Services";
import { NotificationManager } from "react-notifications";
import axios from "axios";
export const AppStateContext = createContext();

const AppStateContextProvider = ({ children }) => {
  // Handle global level settings. cart, login etc.
  const { data: categoriesData, categoriesById } = useGetCategories();
  const [isWishListed, setIsWishListed] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItem, setWishListItem] = useState([]);
  const [user, setUserDetails] = useState();
  const [selectedPropduct, setSelectedPropduct] = useState([]);
  const [userloggedIn, setUserLogginedIn] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [isUserDetailsLoaded, setIsUserDetailsLoaded] = useState(false);
  const [cartCache, setCartCache] = useState();
  const [userProfile, setUserProfile] = useState();
  const [cartAnimation, setCartAnimation] = useState("");
  const [routeScroll, setRouteScroll] = useState(true);
  const [Seo, setSeo] = useState({});
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const { token = null } = user || {};
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("vipcre")));
    setIsUserDetailsLoaded(true);
  }, []);

  useEffect(() => {
    axios
      .get("https://admin.leafymango.com/web/meta/tags", {
        // headers: {
        //   // authorization: `Bearer ${user.token}`,
        // },
      })
      .then((response) => {
        const obj = {};
        response?.data?.data?.map((dta) => {
          obj[dta.page] = dta;
          return obj;
        });

        setSeo(obj);
      })
      .catch((error) => {});
  }, []);

  const checkUser = () => {
    if (!user) {
      setViewLogin(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (user?.token) {
      updateCart(() => {});
      updateWishlist(() => {});

      getProfile(user?.token)?.then((res) => {
        localStorage?.setItem("vip_minprice", res?.contact_cf?.user_min_price);
        localStorage?.setItem("vip_maxprice", res?.contact_cf?.user_max_price);
        localStorage?.setItem(
          "vip_hidePopup",
          res?.contact_cf?.user_blocked_price || false
        );

        setUserProfile(res);
      });
    }
  }, [user]);

  const updateWishlist = (fn = () => {}) => {
    if (user?.token) {
      getWishlist(user?.token).then((res) => {
        setWishListItem(res?.data?.items || []);
        fn();
      });
    }
  };

  const updateCart = (fn = () => {}, token) => {
    if (user?.token || token) {
      getCart(user?.token || token).then((res) => {
        setCartItems(res);
        fn();
      });
    }
  };
  const addToCart = (dataSet, fn, token = "") => {
    postCart(
      {
        items: [
          {
            product_id: dataSet?.product_id,
            number: parseInt(dataSet?.number),
            item_loc: "cart",
          },
        ],
      },
      user?.token || token
    ).then((res) => {
      if (res?.status === "success") {
        updateCart(fn, token);
      }
    });
    NotificationManager.success("Item added cart successfully");
  };

  const logout = async () => {
    localStorage.removeItem("vipcre");
    localStorage?.removeItem("vip_minprice");
    localStorage?.removeItem("vip_maxprice");
    localStorage?.removeItem("vip_hidePopup");
    setUserDetails(null);
    setCartItems([]);
    setWishListItem([]);
    try {
      const token = user?.token;
      const response = await fetch("https://admin.leafymango.com/web/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        NotificationManager.success("Logged out successfully");
      } else {
        NotificationManager.info("Failed to log out");
      }
    } catch (error) {
      // Handle any error that occurred during the request
      console.error("An error occurred during logout:", error);
    }
  };

  const removeFromCart = (indexToRemove) => {
    deleteCartAndWishList(indexToRemove, user?.token).then((res) => {
      updateCart(() => {});
    });
    NotificationManager.info("Item deleted successfully");
  };

  const addToWishList = (dataSet, fn = () => {}) => {
    let text = "";
    if (
      wishListItem?.some((x) => {
        if (x.number === dataSet?.number) {
          text = x.id;
        }
        return x.number === dataSet?.number;
      })
    ) {
      removeFromWishList(text);
      return;
    }
    postCart(
      {
        items: [
          {
            product_id: dataSet?.product_id,
            number: parseInt(dataSet?.number),
            item_loc: "wishlist",
          },
        ],
      },
      user?.token
    ).then((res) => {
      if (res?.status === "success") {
        updateCart();
        updateWishlist();
      }
    });
    const { productname } = dataSet;
    const itemIndex = wishListItem.findIndex(
      (item) => item.productname === productname
    );

    if (itemIndex !== -1) {
      // Item is already in wishlist, so remove it
      const updatedCart = [...wishListItem];
      updatedCart.splice(itemIndex, 1);
      setWishListItem(updatedCart);
      setIsWishListed(false);
    } else {
      // Item is not in wishlist, so add it
      const updatedCart = [...wishListItem, dataSet];
      setWishListItem(updatedCart);
      setIsWishListed(true);
    }
    NotificationManager.success("Item added wishlist successfully");
  };

  const removeFromWishList = (indexToRemove) => {
    deleteCartAndWishList(indexToRemove, user?.token).then((res) => {
      NotificationManager.info("Item removed from wishlist successfully");
      updateWishlist(() => {});
    });
    const updatedWishListItems = wishListItem.filter(
      (_, index) => index !== indexToRemove
    );
    setWishListItem(updatedWishListItems);
  };

  if (!isUserDetailsLoaded) return <></>;
  return (
    <AppStateContext.Provider
      value={{
        isWishListed,
        viewLogin,
        setViewLogin,
        cartItems,
        setCartItems,
        addToCart,
        user,
        setUserDetails,
        removeFromCart,
        userloggedIn,
        setUserLogginedIn,
        checkUser,
        wishListItem,
        addToWishList,
        removeFromWishList,
        selectedPropduct,
        setSelectedPropduct,
        logout,
        categoriesData,
        redirectTo,
        setRedirectTo,
        cartCache,
        setCartCache,
        userProfile,
        updateWishlist,
        cartAnimation,
        setCartAnimation,
        routeScroll,
        setRouteScroll,
        setUserProfile,
        Seo,
        relatedNumbers,
        setRelatedNumbers,
        categoriesById,
        currentUrl,
        setCurrentUrl,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContextProvider;
