import React, { useState, useContext } from "react";
import "../../Shared/Header/Header.css";
import "./GoogleHeader.css";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import OutsideClickHandler from "react-outside-click-handler";
import Avatar from "react-avatar";
import LogoutModal from "../../Shared/LogoutModal/LogoutModal";

// Images
import BrandIcon from "../../Assets/googleRefference-brand-icon.png";
import MobileBrandIcon from "../../Assets/googleRefference-mobile-brand-icon.png";

const GoogleHeader = () => {
  // Logout popup show
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [activeUserAccount, setActiveUserAccount] = useState(false);
  const { user, logout, userProfile } = useContext(AppStateContext);
  const { email, firstname, lastname, mobile } = user?.user || {};
  const Router = useRouter();
  // register popup context
  const { setActiveRegisterForm, setActiveSignInWithOtp } = useContext(
    MyRegisterSignInContext
  );

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

  //Logout Pop up menu
  const handleLogout = () => {
    setShowConfirmationModal(true);
  };
  const handleConfirmLogout = () => {
    logout();
    setShowConfirmationModal(false);
  };
  const handleCancelLogout = () => {
    setShowConfirmationModal(false);
  };
  return (
    <header className="GoogleHeader-section-os">
      <div className="container-os">
        <div className="GoogleHeader-row-os">
          <div className="GoogleHeader-col-1-os">
            <Link className="GoogleHeader-desktop-brand-os" href={"/"}>
              <img src={BrandIcon} alt="" />
            </Link>
            <Link className="GoogleHeader-mobile-brand-os" href={"/"}>
              <img src={MobileBrandIcon} alt="" />
            </Link>
          </div>
          <div className="GoogleHeader-col-2-os">
            <div className="login-account-login-data-os">
              <div className="login-account-name-os">
                {getName() ? (
                  <div
                    className="loggedIn-data-os"
                    onClick={() => {
                      if (getName()) {
                        Router.push("/profile");
                      }
                    }}
                  >
                    <div className="loggedIn-name-os">
                      <span>My Account,</span>
                      <span>{getName()}</span>
                    </div>
                    {firstname && (
                      <div className="login-account-image-os">
                        {
                          <Avatar
                            name={firstname}
                            size="36"
                            round={true}
                            className="avatar-image"
                          />
                        }
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="loggedOut-name-os">
                    <span
                      onClick={() => {
                        setActiveSignInWithOtp(true);
                      }}
                    >
                      Login
                    </span>
                    /
                    <span
                      onClick={() => {
                        setActiveRegisterForm(true);
                      }}
                    >
                      Register
                    </span>
                  </div>
                )}
              </div>
              {getName() && (
                <div className="GoogleHeader-login-account-os">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setActiveUserAccount(false);
                    }}
                  >
                    <div
                      onClick={() => {
                        setActiveUserAccount(!activeUserAccount);
                      }}
                      className="header-login-logout-arrow-os"
                    ></div>

                    {activeUserAccount && (
                      <div className="header-login-logout-popup-section-os">
                        <div className="header-login-logout-popup-row-os">
                          <div
                            className="header-login-logout-popup-col-os"
                            onClick={() => {
                              if (getName()) {
                                Router.push("/profile");
                              }
                            }}
                          >
                            Your Account
                          </div>
                          <div
                            className="header-login-logout-popup-col-os"
                            onClick={handleLogout} // Modify the onClick event to show the confirmation modal.
                          >
                            Log Out
                          </div>
                        </div>
                      </div>
                    )}

                    {/* The confirmation modal */}
                    <LogoutModal
                      showConfirmationModal={showConfirmationModal}
                      handleCancelLogout={handleCancelLogout}
                      handleConfirmLogout={handleConfirmLogout}
                    />
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GoogleHeader;
