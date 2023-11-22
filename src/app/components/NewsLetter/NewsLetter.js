import React, { useState } from "react";
import "./NewsLetter.css";
import { NotificationManager } from "react-notifications";



const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const submitNewsletter = (e) => {
    e.preventDefault();
    const url = "https://admin.leafymango.com/web/newsletter";
    const payload = { email: email };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          NotificationManager.success("Email is successfully sent");
          setEmail("");
        } else if (
          data.status === "error" &&
          data.message === "email already exist in list"
        ) {
          NotificationManager.error("Email already exists in the list");
        } else {
          NotificationManager.error("Please enter a valid email");
        }
      })
      .catch((error) => {
        NotificationManager.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  return (
    <>
    </>
  );
};

export default NewsLetter;