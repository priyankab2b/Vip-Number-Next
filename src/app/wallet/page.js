// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./Wallet.css";
// import Header from "../Shared/Header/Header";
// import MobileHeader from "../Shared/MobileHeader/MobileHeader";
// import { Link } from "react-router-dom";

// // Images
// import walletIcon from "../../Assets/wallet-icon.svg";
// import withrawalIcon from "../../Assets/withrawal-icon.svg";
// // import Payment1 from "../../Assets/payment1.svg";
// import Payment2 from "../../Assets/payment2.svg";
// import Payment3 from "../../Assets/payment3.svg";
// import Payment4 from "../../Assets/payment4.svg";
// import Payment5 from "../../Assets/payment5.svg";
// import Payment6 from "../../Assets/payment6.svg";
// import {
//   WithDrawMoney,
//   useInitiatePaymentByRazorPay,
// } from "../../Services/Wallat";
// import { AppStateContext } from "../../AppStateContext";
// import MobileFooter from "../Shared/MobileFooter/MobileFooter";
// import Footer from "../Shared/Footer/Footer";
// import { getProfile } from "../../Services/Services";
// import { Button, CircularProgress } from "@mui/material";

// const Wallet = () => {
//   const { initiate } = useInitiatePaymentByRazorPay();
//   const { user = {} } = useContext(AppStateContext);
//   const tabChange = localStorage.getItem("wallet");
//   const [walletActive, setWalletActive] = useState(tabChange);
//   const [amountToAdd, setAmountToAdd] = useState(0);
//   const [amountTowithDraw, setAmountTowithDraw] = useState(0);
//   const [data, setData] = useState();
//   const [addData, setAddData] = useState();
//   const [selectedPaymentType, setSelectedPaymentType] = useState();
//   const [nameOnCard, setNameOnCard] = useState();
//   const [account, setAccount] = useState();
//   const [bankname, setbankname] = useState();
//   const [ifsc, setIfsc] = useState();
//   const [upi, setUpi] = useState();
//   const [wBalance, setWBalance] = useState(0);
//   const [nwBalance, setNwBalance] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [priceWarning, setPriceWarning] = useState(false);
//   const [validUpi, setValidUpi] = useState(false);
//   const [validationSubmit, setValidationSubmit] = useState(false);
//   const [upiError, setUpiError] = useState(true);
//   const [nameOnCardError, setNameOnCardError] = useState(false);
//   const [selectOption, setSelectOption] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // Bank details inputs show
//   const [activeBankDetails, setActiveBankDetails] = useState(false);
//   // Upi popup show
//   const [activeUpiPopup, setActiveUpiPopup] = useState(false);
//   const handleWallet = (walletTab) => {
//     setWalletActive(walletTab);
//     setPriceWarning(false)
//   };

//   const handleSubmit = () => {
//     if (/^0+$/.test(amountTowithDraw) || amountTowithDraw === "" || wBalance < amountTowithDraw) {
//       setPriceWarning(true);
//     } else {
//       setActiveBankDetails(true);
//       setPriceWarning(false);
//       setNameOnCardError(true);
//     }
//   }

//   useEffect(() => {
//     getProfile(user?.token)?.then((res) => {
//       setTotal(parseInt(res?.contact_cf?.wallet_balance));
//       setWBalance(parseInt(res?.contact_cf?.with_drawn_balance));
//       setNwBalance(parseInt(res?.contact_cf?.non_with_drawn_balance));
//     });
//     axios
//       .get(
//         "https://upc.vipnumbershop.com/contact_update.php?mobile=" +
//         user?.user?.mobile
//       )
//       .then((response) => {
//         setData(response.data, "---pp-vvv---");

//         const sum =
//           Math.floor(response.data?.cf_2038) +
//           Math.floor(response.data?.cf_2177);
//         setAddData(sum);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const sum = data?.cf_2038 + wBalance;

//   const totalBalance = parseInt(nwBalance) + parseInt(wBalance);

//   return (
//     <>
//       <Header setWalletActive={setWalletActive} />
//       <MobileHeader />
//       <section className="wallet-page-os">
//         <div className="wallet-heading">
//           <div className="container-os">
//             <div className="wallet-profile-text-os">VIP NUMBER WALLET</div>
//           </div>
//         </div>
//         <div className="container-os">
//           <div className="wallet-page-row-os">
//             <div className="wallet-balance-deatils-row-os">
//               <div className="wallet-balance-deatils-col-1-os">
//                 <div
//                   onClick={() => handleWallet("wallet-tab-1")}
//                   className={`${walletActive === "wallet-tab-1"
//                     ? "wallet-balance-deatils-col-11-os active"
//                     : "wallet-balance-deatils-col-11-os"
//                     }`}
//                 >
//                   <div className="wallet-image-os">
//                     <Image src={withrawalIcon} alt="" />
//                   </div>
//                   <div className="wallet-balance-data-os">
//                     <span>Add Money</span>
//                     {/* <span>{nwBalance || 0}</span> */}
//                   </div>
//                 </div>
//                 <div
//                   onClick={() => handleWallet("wallet-tab-2")}
//                   className={`${walletActive === "wallet-tab-2"
//                     ? "wallet-balance-deatils-col-12-os active"
//                     : "wallet-balance-deatils-col-12-os"
//                     }`}
//                 >
//                   <div className="withdrawal-image-os">
//                     <Image src={walletIcon} alt="" />
//                   </div>
//                   <div className="wallet-withdrawal-data-os">
//                     <span>Withdraw money to your Bank</span>
//                     <span>{wBalance || 0}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="wallet-balance-deatils-col-2-os">
//                 <span>TOTAL BALANCE</span>
//                 <span>{total || 0} </span>
//               </div>
//             </div>
//             <div
//               className={
//                 walletActive === "wallet-tab-1"
//                   ? "wallet-page-withdrawal-money-data-row-os active"
//                   : "wallet-page-withdrawal-money-data-row-os"
//               }
//             >
//               <div className="wallet-page-withdrawal-money-heading-os">
//                 Add money to VIP Wallet
//               </div>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   const orderData = {
//                     amount: amountToAdd,
//                     currency: "INR",
//                   };
//                   if (/^0+$/.test(amountToAdd) || amountToAdd === "") {
//                     setPriceWarning(true);
//                   } else {
//                     initiate(user?.token, orderData, setWBalance);
//                     setPriceWarning(false);
//                   }
//                 }}
//               >
//                 <div className="wallet-page-withdrawal-money-input-data-os">
//                   <div className="wallet-page-withdrawal-money-input-os">
//                     <span>Rs.</span>
//                     <input
//                       type="number"
//                       name="amount"
//                       // value={amountToAdd}
//                       onChange={(e) => {
//                         setAmountToAdd(e.target.value);
//                         setPriceWarning(false);
//                       }}
//                       placeholder="0"
//                     />
//                   </div>
//                   <div className="wallet-page-withdrawal-button-os">
//                     <button type="submit">Add Money</button>
//                   </div>
//                   {priceWarning && (
//                     <p className="warning-message" style={{ color: "red" }}>
//                       Please enter amount.
//                     </p>
//                   )}
//                 </div>
//               </form>
//             </div>

//             <div
//               className={
//                 walletActive === "wallet-tab-2"
//                   ? "wallet-page-withdrawal-money-data-row-os active"
//                   : "wallet-page-withdrawal-money-data-row-os"
//               }
//             >
//               {
//                 <div className="withdrawal-entered-amount-data-os">
//                   <div className="wallet-page-withdrawal-money-heading-os">
//                     WITHDRAWN MONEY
//                   </div>
//                   <div className="wallet-page-withdrawal-money-input-data-os">
//                     <div className="wallet-page-withdrawal-money-input-os">
//                       <span>Rs.</span>
//                       <input
//                         type="number"
//                         placeholder="0"
//                         // value={amountTowithDraw}
//                         onChange={(e) => {
//                           setAmountTowithDraw(e.target.value);
//                           if (e.target.value > wBalance) {
//                             setPriceWarning(true);
//                           } else {
//                             setPriceWarning(false);
//                           }
//                         }}
//                       />
//                     </div>
//                     <div className="wallet-page-withdrawal-button-os">
//                       <button
//                         className={!wBalance ? "disabled" : ""}
//                         type="submit"
//                         onClick={() => {
//                           handleSubmit()
//                         }}
//                       >
//                         Withdrawn Money
//                       </button>
//                     </div>
//                     {priceWarning && (
//                       <p className="warning-message" style={{ color: "red" }}>
//                         {wBalance < amountTowithDraw
//                           ? "Please enter amount according to your balance."
//                           : "Please enter amount."}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               }

//               {activeBankDetails && (
//                 <div className="payment-radio-buttons-os withdrawal-paymentInfo-all-data-os">
//                   <div className="withdrawal-paymentInfo-heading-os">
//                     Please Input the amount need to withdraw
//                   </div>
//                   <div className="withdrawal-paymentInfo-method-row-os">
//                     <div className="OrderPlacement-paymentInfo-method-col-1-os">
//                       <label>
//                         <input
//                           type="radio"
//                           name="payment"
//                           checked={selectedPaymentType === "airtelPayment"}
//                           onChange={() => {
//                             setSelectedPaymentType("airtelPayment");
//                             setActiveUpiPopup(true);
//                             setSelectOption(false);
//                           }}
//                         />
//                         <span className="custom-radio">
//                           <span className="dot"></span>
//                           <div className="credit-debit-os">
//                             <span className="upi-payment-img-os">
//                               <Image src={Payment6} alt="" />
//                             </span>
//                           </div>
//                         </span>
//                       </label>
//                     </div>

//                     <div className="OrderPlacement-paymentInfo-method-col-1-os">
//                       <label>
//                         <input
//                           type="radio"
//                           name="payment"
//                           checked={selectedPaymentType === "paytm"}
//                           onChange={() => {
//                             setSelectedPaymentType("paytm");
//                             setActiveUpiPopup(true);
//                             setSelectOption(false);
//                           }}
//                         />
//                         <span className="custom-radio">
//                           <span className="dot"></span>
//                           <div className="credit-debit-os">
//                             <span className="upi-payment-img-os">
//                               <Image src={Payment2} alt="" />
//                             </span>
//                           </div>
//                         </span>
//                       </label>
//                     </div>

//                     <div className="OrderPlacement-paymentInfo-method-col-1-os">
//                       <label>
//                         <input
//                           type="radio"
//                           name="payment"
//                           checked={selectedPaymentType === "phone_pay"}
//                           onChange={() => {
//                             setSelectedPaymentType("phone_pay");
//                             setActiveUpiPopup(true);
//                             setSelectOption(false);
//                           }}
//                         />
//                         <span className="custom-radio">
//                           <span className="dot"></span>
//                           <div className="credit-debit-os">
//                             <span className="upi-payment-img-os">
//                               <Image src={Payment3} alt="" />
//                             </span>
//                           </div>
//                         </span>
//                       </label>
//                     </div>

//                     <div className="OrderPlacement-paymentInfo-method-col-1-os">
//                       <label>
//                         <input
//                           type="radio"
//                           name="payment"
//                           checked={selectedPaymentType === "bhim"}
//                           onChange={() => {
//                             setSelectedPaymentType("bhim");
//                             setActiveUpiPopup(true);
//                             setSelectOption(false);
//                           }}
//                         />
//                         <span className="custom-radio">
//                           <span className="dot"></span>
//                           <div className="credit-debit-os">
//                             <span className="upi-payment-img-os">
//                               <Image src={Payment4} alt="" />
//                             </span>
//                           </div>
//                         </span>
//                       </label>
//                     </div>

//                     <div className="OrderPlacement-paymentInfo-method-col-1-os">
//                       <label>
//                         <input
//                           type="radio"
//                           name="payment"
//                           checked={selectedPaymentType === "gpay"}
//                           onChange={() => {
//                             setSelectedPaymentType("gpay");
//                             setActiveUpiPopup(true);
//                             setSelectOption(false);
//                           }}
//                         />
//                         <span className="custom-radio">
//                           <span className="dot"></span>
//                           <div className="credit-debit-os">
//                             <span className="upi-payment-img-os">
//                               <Image src={Payment5} alt="" />
//                             </span>
//                           </div>
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="OrderPlacement-paymentInfo-method-col-2-os">
//                     <label>
//                       <input
//                         type="radio"
//                         name="payment"
//                         checked={selectedPaymentType === "bank"}
//                         onChange={() => {
//                           setSelectedPaymentType("bank");
//                           setSelectOption(false);
//                           setValidationSubmit(false);
//                         }}
//                       />
//                       <span className="custom-radio">
//                         <span className="dot"></span>
//                         <div className="credit-debit-text-os-1">
//                           Bank Account Details
//                         </div>
//                       </span>
//                     </label>

//                     <div className="withdrawal-account-details-input-row-os">
//                       <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-1-os">
//                         <input
//                           type="text"
//                           className={`${selectedPaymentType === "bank" && validationSubmit && !nameOnCard ? 'validation-error' : ''}`}
//                           value={nameOnCard}
//                           onChange={(e) => {
//                             setNameOnCard(e.target.value);
//                             setNameOnCardError(e.target.value.trim() === '');
//                             setSelectedPaymentType("bank");
//                             setSelectOption(false);
//                           }}
//                           placeholder="Name on Card"
//                         />
//                       </div>
//                       <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-2-os">
//                         <input
//                           type="text"
//                           className={`${selectedPaymentType === "bank" && validationSubmit && !bankname ? 'validation-error' : ''}`}
//                           value={bankname}
//                           onChange={(e) => {
//                             setbankname(e.target.value);
//                             setNameOnCardError(e.target.value.trim() === '');
//                             setSelectedPaymentType("bank");
//                             setSelectOption(false);
//                           }}
//                           placeholder="Bank Name"
//                         />
//                       </div>
//                       <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-3-os">
//                         <input
//                           type="text"
//                           className={`${selectedPaymentType === "bank" && validationSubmit && !account ? 'validation-error' : ''}`}
//                           value={account}
//                           onChange={(e) => {
//                             setAccount(e.target.value);
//                             setNameOnCardError(e.target.value.trim() === '');
//                             setSelectedPaymentType("bank");
//                             setSelectOption(false);
//                           }}
//                           placeholder="Enter Account Number"
//                         />
//                       </div>
//                       <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-4-os">
//                         <input
//                           type="text"
//                           className={`${selectedPaymentType === "bank" && validationSubmit && !ifsc ? 'validation-error' : ''}`}
//                           value={ifsc}
//                           onChange={(e) => {
//                             setIfsc(e.target.value);
//                             setNameOnCardError(e.target.value.trim() === '');
//                             setSelectedPaymentType("bank");
//                             setSelectOption(false);
//                           }}
//                           placeholder="Enter IFSC Code"
//                         />
//                       </div>
//                     </div>
//                     {selectedPaymentType === "bank" && validationSubmit && (!nameOnCard || !bankname || !account || !ifsc) && (
//                       <p
//                         className="price-warning-message"
//                         style={{ color: "red" }}
//                       >
//                         Please Enter Bank Details
//                       </p>
//                     )}
//                     <div className="withdrawal-alert-message-os">
//                       1-3 Business days
//                     </div>

//                     <button
//                       onClick={() => {
//                         setValidationSubmit(true);
//                         const paymentTypeSpecificFields = {
//                           bank: { airtel_number: "", paytm_number: "", g_pay_number: "", phone_pay_number: "", bhim_number: "" },
//                         };
//                         const specificFields = paymentTypeSpecificFields[selectedPaymentType] || {};
//                         if (nameOnCardError === false && validationSubmit && (nameOnCard && bankname && account && ifsc)) {
//                           setLoading(true);
//                           WithDrawMoney(
//                             {
//                               upi_id: upi || "",
//                               ...specificFields,
//                               mobile_number: user?.user?.mobile,
//                               bank_account_name: nameOnCard || "",
//                               bank_name: bankname || "",
//                               bank_ifsc_code: ifsc || "",
//                               bank_account_number: account || "",
//                               amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via bank account detail method`,
//                               amount_requested: amountTowithDraw,
//                             },
//                             user?.token
//                           ).then((res) => {
//                             setNameOnCardError(true);
//                             setValidationSubmit(false);
//                             setNameOnCard("");
//                             setbankname("");
//                             setAccount("");
//                             setIfsc("");
//                             setLoading(false);
//                             setSelectedPaymentType(null);
//                           });
//                         } else {
//                           if (selectedPaymentType === "bank") {
//                             setSelectOption(false);
//                           } else {
//                             setSelectOption(true);
//                           }
//                         }
//                       }}
//                       className="withdrawal-account-details-submit-btn-os"
//                       disabled={loading}
//                     >
//                       {loading ? "Submitting..." : "Submit"}
//                     </button>
//                     {selectOption && (
//                       <p className="warning-message" style={{ color: "red" }}>
//                         Please select any option..
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeUpiPopup && (
//                 <section className="upi-id-popup-section-os">
//                   <div className="upi-id-popup-all-data-row-os">
//                     <div className="upi-id-popup-row-os">
//                       <button
//                         onClick={() => {
//                           setActiveUpiPopup(false);
//                           setSelectedPaymentType(null);
//                           setUpi("")
//                           setUpiError(true);
//                           setValidUpi(false);
//                           setSelectOption(true);
//                         }}
//                         className="upi-id-popup-cross-btn-os"
//                       >
//                         <svg
//                           width="53"
//                           height="53"
//                           viewBox="0 0 53 53"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
//                           <path
//                             d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
//                             fill="#EFEFEF"
//                           />
//                         </svg>
//                       </button>
//                       <div className="upi-id-popup-heading-os">
//                         Enter  {selectedPaymentType ? `${selectedPaymentType} UPI ID` : 'ID'}
//                       </div>
//                       <form
//                         onSubmit={(e) => {
//                           e.preventDefault();
//                           const paymentTypeSpecificFields = {
//                             airtelPayment: { airtel_number: upi, paytm_number: "", g_pay_number: "", phone_pay_number: "", bhim_number: "" },
//                             paytm: { airtel_number: "", paytm_number: upi, g_pay_number: "", phone_pay_number: "", bhim_number: "" },
//                             gpay: { airtel_number: "", paytm_number: "", g_pay_number: upi, phone_pay_number: "", bhim_number: "" },
//                             phone_pay: { airtel_number: "", paytm_number: "", g_pay_number: "", phone_pay_number: upi, bhim_number: "" },
//                             bhim: { airtel_number: "", paytm_number: "", g_pay_number: "", phone_pay_number: "", bhim_number: upi },
//                             bank: { bank_account_detail: "" },
//                           };
//                           const specificFields = paymentTypeSpecificFields[selectedPaymentType] || {};
//                           const payload = {
//                             mobile_number: user?.user?.mobile,
//                             amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via UPI method`,
//                             upi_id: upi || "",
//                             ...specificFields,
//                             amount_requested: amountTowithDraw,
//                             bank_account_name: nameOnCard || "",
//                             bank_name: bankname || "",
//                             bank_ifsc_code: ifsc || "",
//                             bank_account_number: account || "",
//                           };
//                           if (validUpi === true) {
//                             setLoading(true);
//                             WithDrawMoney(payload, user?.token).then((res) => {
//                               setUpi("")
//                               setValidUpi(false);
//                               setActiveUpiPopup(false);
//                               setUpiError(true);
//                               setLoading(false);
//                             });
//                           }
//                           if (upi === undefined || upi === "") {
//                             setUpiError(false)
//                           }
//                         }}

//                       >
//                         <div className="upi-id-form-os">
//                           <div className="upi-id-input-os">
//                             <input
//                               type="text"
//                               placeholder="e.g @paytm, @ybl, @upi"
//                               value={upi}
//                               onChange={(e) => {
//                                 setUpi(e.target.value);
//                                 setValidUpi(true);
//                                 setUpiError(true);
//                               }}
//                             />
//                           </div>
//                           {/* <button type="submit">Withdrawn Money</button> */}
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             type="submit"
//                             disabled={loading}
//                             endIcon={loading && <CircularProgress size={20} color="inherit" />}
//                           >
//                             Withdraw Money
//                           </Button>
//                         </div>
//                       </form>
//                       {upiError === false && (
//                         <p
//                           className="price-warning-message"
//                           style={{ color: "red" }}
//                         >
//                           Please enter a valid upi.
//                         </p>
//                       )}
//                       <div className="withdrawal-alert-message-os">
//                         Instant Transfer
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//       <MobileFooter />
//       <Footer />
//     </>
//   );
// };

// export default Wallet;

// Withdrawal radio buttons changed to input code
"use client"
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Wallet.css";
import Header from "../Shared/Header/Header";
import MobileHeader from "../Shared/MobileHeader/MobileHeader";
import Image from 'next/image'

// Images
import walletIcon from "../Assets/wallet-icon.svg";
import withrawalIcon from "../Assets/withrawal-icon.svg";
import {
  WithDrawMoney,
  useInitiatePaymentByRazorPay,
} from "../Services/Wallat";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import MobileFooter from "../Shared/MobileFooter/MobileFooter";
import Footer from "../Shared/Footer/Footer";
import { getProfile } from "../Services/Services";
import { Button, CircularProgress } from "@mui/material";

const Wallet = () => {
  const { initiate } = useInitiatePaymentByRazorPay();
  const { user = {}, userProfile } = useContext(AppStateContext);
  const tabChange = localStorage.getItem("wallet");
  const [walletActive, setWalletActive] = useState(tabChange);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [amountTowithDraw, setAmountTowithDraw] = useState(0);
  const [data, setData] = useState();
  const [addData, setAddData] = useState();
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [account, setAccount] = useState();
  const [bankname, setbankname] = useState();
  const [ifsc, setIfsc] = useState();
  const [upi, setUpi] = useState();
  const [wBalance, setWBalance] = useState(0);
  const [nwBalance, setNwBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [priceWarning, setPriceWarning] = useState(false);
  const [validUpi, setValidUpi] = useState(false);
  const [validationSubmit, setValidationSubmit] = useState(false);
  const [upiError, setUpiError] = useState(true);
  const [nameOnCardError, setNameOnCardError] = useState(false);
  const [selectOption, setSelectOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    cardName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  // Bank details inputs show
  const [activeBankDetails, setActiveBankDetails] = useState(false);
  // Upi popup show
  const [activeUpiPopup, setActiveUpiPopup] = useState(false);
  const [withdrawal, setWithdrawal] = useState({
    airtel: "",
    paytm: "",
    phonePay: "",
    bhim: "",
    googlePay: "",
    cardName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  useEffect(() => {
    setWithdrawal({
      ...withdrawal,
      airtel: userProfile?.contact_cf?.airtel_number || "",
      paytm: userProfile?.contact_cf?.paytm_number || "",
      phonePay: userProfile?.contact_cf?.phone_pe_number || "",
      bhim: userProfile?.contact_cf?.upi_id || "",
      googlePay: userProfile?.contact_cf?.g_pay_number || "",
      cardName: userProfile?.contact_cf?.bank_account_name || "",
      bankName: userProfile?.contact_cf?.bank_name || "",
      accountNumber: userProfile?.contact_cf?.bank_account_number || "",
      ifscCode: userProfile?.contact_cf?.bank_ifsc_code || "",
    });
  }, [userProfile]);

  useEffect(() => {
    const isBankDetailsFilled =
      withdrawal.cardName.trim().length > 0 ||
      withdrawal.bankName.trim().length > 0 ||
      withdrawal.accountNumber.trim().length > 0 ||
      withdrawal.ifscCode.trim().length > 0;

    const isOtherDetailsFilled =
      withdrawal.airtel.trim().length > 0 ||
      withdrawal.paytm.trim().length > 0 ||
      withdrawal.phonePay.trim().length > 0 ||
      withdrawal.bhim.trim().length > 0 ||
      withdrawal.googlePay.trim().length > 0;

    // Check if all fields are empty
    const areAllFieldsEmpty = !isBankDetailsFilled && !isOtherDetailsFilled;

    if (areAllFieldsEmpty) {
      // If all bank fields are empty, disable submit and show error message
      console.log("All fields are empty");
      setValidationSubmit(false);
    } else {
      setValidationSubmit(true);
      setError({
        cardName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
      });
    }
  }, [withdrawal]);

  const handleWallet = (walletTab) => {
    setWalletActive(walletTab);
    setPriceWarning(false);
  };

  const handleSubmit = () => {
    if (
      /^0+$/.test(amountTowithDraw) ||
      amountTowithDraw === "" ||
      wBalance < amountTowithDraw
    ) {
      setPriceWarning(true);
    } else {
      setActiveBankDetails(true);
      setPriceWarning(false);
      setNameOnCardError(true);
    }
  };

  useEffect(() => {
    getProfile(user?.token)?.then((res) => {
      setTotal(parseInt(res?.contact_cf?.wallet_balance));
      setWBalance(parseInt(res?.contact_cf?.with_drawn_balance));
      setNwBalance(parseInt(res?.contact_cf?.non_with_drawn_balance));
    });
    axios
      .get(
        "https://upc.vipnumbershop.com/contact_update.php?mobile=" +
          user?.user?.mobile
      )
      .then((response) => {
        setData(response.data, "---pp-vvv---");

        const sum =
          Math.floor(response.data?.cf_2038) +
          Math.floor(response.data?.cf_2177);
        setAddData(sum);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sum = data?.cf_2038 + wBalance;

  const totalBalance = parseInt(nwBalance) + parseInt(wBalance);

  const handleWithdrawaInput = (e) => {
    const { value, name } = e.target;
    setWithdrawal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleWithdrawSubmit = () => {
    let isValid = true;
    const isBankDetailsFilled =
      withdrawal.cardName.trim().length > 0 ||
      withdrawal.bankName.trim().length > 0 ||
      withdrawal.accountNumber.trim().length > 0 ||
      withdrawal.ifscCode.trim().length > 0;

    const isOtherDetailsFilled =
      withdrawal.airtel.trim().length > 0 ||
      withdrawal.paytm.trim().length > 0 ||
      withdrawal.phonePay.trim().length > 0 ||
      withdrawal.bhim.trim().length > 0 ||
      withdrawal.googlePay.trim().length > 0;

    if (isBankDetailsFilled) {
      // If any bank details field is filled, ensure all bank details fields are filled
      if (
        withdrawal.cardName.trim().length === 0 ||
        withdrawal.bankName.trim().length === 0 ||
        withdrawal.accountNumber.trim().length === 0 ||
        withdrawal.ifscCode.trim().length === 0
      ) {
        // If any bank details field is missing, set error messages and disable submit
        setError({
          cardName:
            withdrawal.cardName.trim().length === 0
              ? "Card name is required"
              : "",
          bankName:
            withdrawal.bankName.trim().length === 0
              ? "Bank name is required"
              : "",
          accountNumber:
            withdrawal.accountNumber.trim().length === 0
              ? "Account number is required"
              : "",
          ifscCode:
            withdrawal.ifscCode.trim().length === 0
              ? "Ifsc code is required"
              : "",
        });
        isValid = false;
      }
    }

    if (!isBankDetailsFilled && isOtherDetailsFilled) {
      // If non-bank details are filled, call API function
      setLoading(true);
      WithDrawMoney(
        {
          airtel_number: withdrawal.airtel,
          paytm_number: withdrawal.paytm,
          bhim_number: withdrawal.bhim,
          phone_pe_number: withdrawal.phonePay,
          g_pay_number: withdrawal.googlePay,
          mobile_number: user?.user?.mobile,
          bank_account_name: withdrawal.cardName,
          bank_name: withdrawal.bankName,
          bank_ifsc_code: withdrawal.ifscCode,
          bank_account_number: withdrawal.accountNumber,
          amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via bank account detail method`,
          amount_requested: amountTowithDraw,
        },
        user?.token
      ).then((res) => {
        setNameOnCardError(true);
        setLoading(false);
        setValidationSubmit(false);
        setNameOnCard("");
        setbankname("");
        setAccount("");
        setIfsc("");
        setSelectedPaymentType(null);
      });
    }

    // If bank details are filled correctly, call API function
    if (isValid && isBankDetailsFilled) {
      setLoading(true);
      WithDrawMoney(
        {
          airtel_number: withdrawal.airtel,
          paytm_number: withdrawal.paytm,
          bhim_number: withdrawal.bhim,
          phone_pe_number: withdrawal.phonePay,
          g_pay_number: withdrawal.googlePay,
          mobile_number: user?.user?.mobile,
          bank_account_name: withdrawal.cardName,
          bank_name: withdrawal.bankName,
          bank_ifsc_code: withdrawal.ifscCode,
          bank_account_number: withdrawal.accountNumber,
          amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via bank account detail method`,
          amount_requested: amountTowithDraw,
        },
        user?.token
      ).then((res) => {
        setNameOnCardError(true);
        setLoading(false);
        setValidationSubmit(false);
        setNameOnCard("");
        setbankname("");
        setAccount("");
        setIfsc("");
        setSelectedPaymentType(null);
      });
    }
  };

  // Hanlde withdrawal submit
  // const handleWithdrawSubmit = () => {
  //   setValidationSubmit(true);
  //   setLoading(true);
  //   WithDrawMoney(
  //     {
  //       airtel_number: withdrawal.airtel,
  //       paytm_number: withdrawal.paytm,
  //       bhim_number: withdrawal.bhim,
  //       phone_pe_number: withdrawal.phonePay,
  //       g_pay_number: withdrawal.googlePay,
  //       mobile_number: user?.user?.mobile,
  //       bank_account_name: withdrawal.cardName,
  //       bank_name: withdrawal.bankName,
  //       bank_ifsc_code: withdrawal.ifscCode,
  //       bank_account_number: withdrawal.accountNumber,
  //       amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via bank account detail method`,
  //       amount_requested: amountTowithDraw,
  //     },
  //     user?.token
  //   ).then((res) => {
  //     setNameOnCardError(true);
  //     setValidationSubmit(false);
  //     setNameOnCard("");
  //     setbankname("");
  //     setAccount("");
  //     setIfsc("");
  //     setLoading(false);
  //     setSelectedPaymentType(null);
  //   });
  // };

  return (
    <>
      <Header setWalletActive={setWalletActive} />
      <MobileHeader />
      <section className="wallet-page-os">
        <div className="wallet-heading">
          <div className="container-os">
            <div className="wallet-profile-text-os">VIP NUMBER WALLET</div>
          </div>
        </div>
        <div className="container-os">
          <div className="wallet-page-row-os">
            <div className="wallet-balance-deatils-row-os">
              <div className="wallet-balance-deatils-col-1-os">
                <div
                  onClick={() => handleWallet("wallet-tab-1")}
                  className={`${
                    walletActive === "wallet-tab-1"
                      ? "wallet-balance-deatils-col-11-os active"
                      : "wallet-balance-deatils-col-11-os"
                  }`}
                >
                  <div className="wallet-image-os">
                    <Image src={withrawalIcon} alt="" />
                  </div>
                  <div className="wallet-balance-data-os">
                    <span>Add Money</span>
                    {/* <span>{nwBalance || 0}</span> */}
                  </div>
                </div>
                <div
                  onClick={() => handleWallet("wallet-tab-2")}
                  className={`${
                    walletActive === "wallet-tab-2"
                      ? "wallet-balance-deatils-col-12-os active"
                      : "wallet-balance-deatils-col-12-os"
                  }`}
                >
                  <div className="withdrawal-image-os">
                    <Image src={walletIcon} alt="" />
                  </div>
                  <div className="wallet-withdrawal-data-os">
                    <span>Withdraw money to your Bank</span>
                    <span>{wBalance || 0}</span>
                  </div>
                </div>
              </div>
              <div className="wallet-balance-deatils-col-2-os">
                <span>TOTAL BALANCE</span>
                <span>{total || 0} </span>
              </div>
            </div>
            <div
              className={
                walletActive === "wallet-tab-1"
                  ? "wallet-page-withdrawal-money-data-row-os active"
                  : "wallet-page-withdrawal-money-data-row-os"
              }
            >
              <div className="wallet-page-withdrawal-money-heading-os">
                Add money to VIP Wallet
              </div>
              <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   const orderData = {
              //     amount: amountToAdd,
              //     currency: "INR",
              //   };
              //   if (/^0+$/.test(amountToAdd) || amountToAdd === "") {
              //     setPriceWarning(true);
              //   } else {
              //     initiate(user?.token, orderData, setWBalance);
              //     setPriceWarning(false);
              //   }
              // }}
              >
                <div className="wallet-page-withdrawal-money-input-data-os">
                  <div className="wallet-page-withdrawal-money-input-os">
                    <span>Rs.</span>
                    <input
                      type="number"
                      name="amount"
                      // value={amountToAdd}
                      onChange={(e) => {
                        setAmountToAdd(e.target.value);
                        setPriceWarning(false);
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div className="wallet-page-withdrawal-button-os">
                    <button type="submit">Add Money</button>
                  </div>
                  {priceWarning && (
                    <p className="warning-message" style={{ color: "red" }}>
                      Please enter amount.
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div
              className={
                walletActive === "wallet-tab-2"
                  ? "wallet-page-withdrawal-money-data-row-os active"
                  : "wallet-page-withdrawal-money-data-row-os"
              }
            >
              {
                <div className="withdrawal-entered-amount-data-os">
                  <div className="wallet-page-withdrawal-money-heading-os">
                    WITHDRAWN MONEY
                  </div>
                  <div className="wallet-page-withdrawal-money-input-data-os">
                    <div className="wallet-page-withdrawal-money-input-os">
                      <span>Rs.</span>
                      <input
                        type="number"
                        placeholder="0"
                        // value={amountTowithDraw}
                        onChange={(e) => {
                          setAmountTowithDraw(e.target.value);
                          if (e.target.value > wBalance) {
                            setPriceWarning(true);
                          } else {
                            setPriceWarning(false);
                          }
                        }}
                      />
                    </div>
                    <div className="wallet-page-withdrawal-button-os">
                      <button
                        className={!wBalance ? "disabled" : ""}
                        type="submit"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Withdrawn Money
                      </button>
                    </div>
                    {priceWarning && (
                      <p className="warning-message" style={{ color: "red" }}>
                        {wBalance < amountTowithDraw
                          ? "Please enter amount according to your balance."
                          : "Please enter amount."}
                      </p>
                    )}
                  </div>
                </div>
              }

              {activeBankDetails && (
                <div className="payment-radio-buttons-os withdrawal-paymentInfo-all-data-os">
                  <div className="withdrawal-paymentInfo-heading-os">
                    Please Input the amount need to withdraw
                  </div>

                  <div className="withdrawal-account-details-input-row-os">
                    <div className="withdrawal-account-details-input-col-os">
                      <input
                        type="input"
                        name="airtel"
                        placeholder="Airtel money"
                        value={withdrawal.airtel}
                        onChange={handleWithdrawaInput}
                      />
                    </div>
                    <div className="withdrawal-account-details-input-col-os">
                      <input
                        type="input"
                        name="paytm"
                        placeholder="Paytm"
                        value={withdrawal.paytm}
                        onChange={handleWithdrawaInput}
                      />
                    </div>
                    <div className="withdrawal-account-details-input-col-os">
                      <input
                        type="input"
                        name="phonePay"
                        placeholder="Phone pay"
                        value={withdrawal.phonePay}
                        onChange={handleWithdrawaInput}
                      />
                    </div>
                    <div className="withdrawal-account-details-input-col-os">
                      <input
                        type="input"
                        name="bhim"
                        placeholder="Bhim"
                        value={withdrawal.bhim}
                        onChange={handleWithdrawaInput}
                      />
                    </div>
                    <div className="withdrawal-account-details-input-col-os">
                      <input
                        type="input"
                        name="googlePay"
                        placeholder="Google pay"
                        value={withdrawal.googlePay}
                        onChange={handleWithdrawaInput}
                      />
                    </div>
                  </div>

                  <div className="OrderPlacement-paymentInfo-method-col-2-os">
                    <label className="pt-4">Bank Account Details</label>

                    <div className="withdrawal-account-details-input-row-os">
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-1-os">
                        <input
                          type="text"
                          name="cardName"
                          value={withdrawal.cardName}
                          onChange={handleWithdrawaInput}
                          placeholder="Name on Card"
                        />
                        {error.cardName && (
                          <div className="error-message">{error.cardName}</div>
                        )}
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-2-os">
                        <input
                          type="text"
                          name="bankName"
                          value={withdrawal.bankName}
                          onChange={handleWithdrawaInput}
                          placeholder="Bank Name"
                        />
                        {error.bankName && (
                          <div className="error-message">{error.bankName}</div>
                        )}
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-3-os">
                        <input
                          type="text"
                          name="accountNumber"
                          value={withdrawal.accountNumber}
                          onChange={handleWithdrawaInput}
                          placeholder="Enter Account Number"
                        />
                        {error.accountNumber && (
                          <div className="error-message">
                            {error.accountNumber}
                          </div>
                        )}
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-4-os">
                        <input
                          type="text"
                          name="ifscCode"
                          value={withdrawal.ifscCode}
                          onChange={handleWithdrawaInput}
                          placeholder="Enter IFSC Code"
                        />
                        {error.ifscCode && (
                          <div className="error-message">{error.ifscCode}</div>
                        )}
                      </div>
                    </div>
                    {selectedPaymentType === "bank" &&
                      validationSubmit &&
                      (!nameOnCard || !bankname || !account || !ifsc) && (
                        <p
                          className="price-warning-message"
                          style={{ color: "red" }}
                        >
                          Please Enter Bank Details
                        </p>
                      )}
                    <div className="withdrawal-alert-message-os">
                      1-3 Business days
                    </div>
                    {/* {error && (
                      <div className="withdrawal-alert-message-os">{error}</div>
                    )} */}

                    <button
                      onClick={handleWithdrawSubmit}
                      className="withdrawal-account-details-submit-btn-os"
                      disabled={!validationSubmit}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              )}

              {activeUpiPopup && (
                <section className="upi-id-popup-section-os">
                  <div className="upi-id-popup-all-data-row-os">
                    <div className="upi-id-popup-row-os">
                      <button
                        onClick={() => {
                          setActiveUpiPopup(false);
                          setSelectedPaymentType(null);
                          setUpi("");
                          setUpiError(true);
                          setValidUpi(false);
                          setSelectOption(true);
                        }}
                        className="upi-id-popup-cross-btn-os"
                      >
                        <svg
                          width="53"
                          height="53"
                          viewBox="0 0 53 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
                          <path
                            d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                            fill="#EFEFEF"
                          />
                        </svg>
                      </button>
                      <div className="upi-id-popup-heading-os">
                        Enter{" "}
                        {selectedPaymentType
                          ? `${selectedPaymentType} UPI ID`
                          : "ID"}
                      </div>
                      <form
                      // onSubmit={(e) => {
                      //   e.preventDefault();
                      //   const paymentTypeSpecificFields = {
                      //     airtelPayment: {
                      //       airtel_number: upi,
                      //       paytm_number: "",
                      //       g_pay_number: "",
                      //       phone_pay_number: "",
                      //       bhim_number: "",
                      //     },
                      //     paytm: {
                      //       airtel_number: "",
                      //       paytm_number: upi,
                      //       g_pay_number: "",
                      //       phone_pay_number: "",
                      //       bhim_number: "",
                      //     },
                      //     gpay: {
                      //       airtel_number: "",
                      //       paytm_number: "",
                      //       g_pay_number: upi,
                      //       phone_pay_number: "",
                      //       bhim_number: "",
                      //     },
                      //     phone_pay: {
                      //       airtel_number: "",
                      //       paytm_number: "",
                      //       g_pay_number: "",
                      //       phone_pay_number: upi,
                      //       bhim_number: "",
                      //     },
                      //     bhim: {
                      //       airtel_number: "",
                      //       paytm_number: "",
                      //       g_pay_number: "",
                      //       phone_pay_number: "",
                      //       bhim_number: upi,
                      //     },
                      //     bank: { bank_account_detail: "" },
                      //   };
                      //   const specificFields =
                      //     paymentTypeSpecificFields[selectedPaymentType] ||
                      //     {};
                      //   const payload = {
                      //     mobile_number: user?.user?.mobile,
                      //     amount_requested_remarks: `${user?.user?.mobile} has requested RS.${amountTowithDraw} amount via UPI method`,
                      //     upi_id: upi || "",
                      //     ...specificFields,
                      //     amount_requested: amountTowithDraw,
                      //     bank_account_name: nameOnCard || "",
                      //     bank_name: bankname || "",
                      //     bank_ifsc_code: ifsc || "",
                      //     bank_account_number: account || "",
                      //   };
                      //   if (validUpi === true) {
                      //     setLoading(true);
                      //     WithDrawMoney(payload, user?.token).then((res) => {
                      //       setUpi("");
                      //       setValidUpi(false);
                      //       setActiveUpiPopup(false);
                      //       setUpiError(true);
                      //       setLoading(false);
                      //     });
                      //   }
                      //   if (upi === undefined || upi === "") {
                      //     setUpiError(false);
                      //   }
                      // }}
                      >
                        <div className="upi-id-form-os">
                          <div className="upi-id-input-os">
                            <input
                              type="text"
                              placeholder="e.g @paytm, @ybl, @upi"
                              value={upi}
                              onChange={(e) => {
                                setUpi(e.target.value);
                                setValidUpi(true);
                                setUpiError(true);
                              }}
                            />
                          </div>
                          {/* <button type="submit">Withdrawn Money</button> */}
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                            endIcon={
                              loading && (
                                <CircularProgress size={20} color="inherit" />
                              )
                            }
                          >
                            Withdraw Money
                          </Button>
                        </div>
                      </form>
                      {upiError === false && (
                        <p
                          className="price-warning-message"
                          style={{ color: "red" }}
                        >
                          Please enter a valid upi.
                        </p>
                      )}
                      <div className="withdrawal-alert-message-os">
                        Instant Transfer
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
      <MobileFooter />
      <Footer />
    </>
  );
};

export default Wallet;
