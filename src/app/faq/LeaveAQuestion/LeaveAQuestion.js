import React, { useState, useContext } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Crown from "../../Assets/crown-icon.svg";
import "./LeaveAQuestion.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { NotificationManager } from "react-notifications";

const LeaveAQuestion = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { user } = useContext(AppStateContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate name and email fields
    let hasError = false;

    if (!name) {
      setNameError("Please enter your name");
      hasError = true;
    }
    if (comment.trim().split(/\s+/).length < 10) {
      setCommentError("Please enter at least 10 words");
      hasError = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }
    if (hasError) {
      return;
    }
    const data = { name, email, comment };
    try {
      const response = await fetch(
        "https://admin.leafymango.com/web/leave/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        NotificationManager.success("Message sent successfully");
        setName("");
        setEmail("");
        setComment("");
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse && errorResponse.message
            ? errorResponse.message
            : "Something went wrong";
        NotificationManager.error(errorMessage);
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setCommentError("");
  };

  return (
    <section className="LeaveAQuestion-form-section-os">
      <div className="container-os">
        <div className="LeaveAQuestion-all-form-data-os">
          <form onSubmit={handleSubmit} className="LeaveAQuestion-form-os">
            <div className="LeaveAQuestion-headings-os">
              <MainHeading MainHeading="Leave a Question" image={Crown} />
              <div className="LeaveAQuestion-subheading-os">
                Your email address will not be published.
              </div>
            </div>
            <div className="LeaveAQuestion-textarea-os">
              <textarea
                cols="30"
                rows="10"
                placeholder="Comment"
                value={comment}
                onChange={handleCommentChange}
              />
              {commentError && (
                <div className="error-message">{commentError}</div>
              )}
            </div>

            <div className="LeaveAQuestion-input-data-row-os">
              <div className="LeaveAQuestion-input-data-col-1">
                <input
                  type="text"
                  placeholder="Your Name*"
                  value={name}
                  onChange={handleNameChange}
                />
                {nameError && <div className="error-message">{nameError}</div>}
              </div>
              <div className="LeaveAQuestion-input-data-col-1">
                <input
                  type="email"
                  placeholder="Your Email*"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>
            </div>
            <div className="LeaveAQuestion-submit-question-btn-os">
              <button type="submit">SUBMIT QUESTION</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeaveAQuestion;