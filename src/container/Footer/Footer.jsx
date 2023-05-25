import React, { useEffect, useState } from "react";

import "./Footer.scss";
import { client } from "../../client";
import { AppWrapper, MotionWrap } from "../../wrapper";
import { images } from "../../constants";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(false);

  const { name, message, email } = formData;

  useEffect((effect) => {
    client
      .fetch(`*[_type == "misc"]`)
      .then((data) => {
        setContactData(data[0]["contact"]);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  // console.log(contactData);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandler = () => {
    setIsLoading(true);
    setError(false);

    const contact = {
      _type: "contact",
      name,
      email,
      message,
    };

    try {
      client
        .create(contact)
        .then(() => {
          setIsLoading(false);
          setIsFormSubmitted(true);
        })
        .catch((err) => {
          // throw new Error("Something went wrong");
          setError(true);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError(error);
    }

    setTimeout(() => {
      setIsLoading(false);
      setError(false);
    }, 3000);
  };
  return (
    <>
      <h4 className="head-text">Take a coffee & chat with me</h4>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href={`mailto:${contactData["email"]}`} className="p-text">
            {contactData["email"]}
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile number" />
          <a href={`tel:${contactData["phone"]}`} className="p-text">
            {contactData["phone"]}
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              value={name}
              placeholder="Your Name"
              onChange={inputChangeHandler}
              name="name"
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              value={email}
              placeholder="Your Email"
              onChange={inputChangeHandler}
              name="email"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={message}
              className="p-text"
              onChange={inputChangeHandler}
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="button"
            className={`p-text ${error ? "error" : ""}`}
            onClick={submitHandler}
          >
            {isLoading && !error && "Sending..."}
            {!isLoading && !error && "Send Message"}
            {error ? "Something went wrong" : null}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrapper(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
