import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./About.scss";
import { images } from "../../constants";
import { client, urlFor } from "../../client";
import { AppWrapper, MotionWrap } from "../../wrapper";

// const abouts = [
//   {
//     title: "Full Stack Developer",
//     description: "I am a good web developer",
//     imageURL: images.about01,
//   },
//   {
//     title: "Python Developer",
//     description: "I am a good python developer",
//     imageURL: images.about02,
//   },
//   {
//     title: "React Developer",
//     description: "I am a good react developer",
//     imageURL: images.about03,
//   },
//   {
//     title: "C++ Developer",
//     description: "I am a good C++ developer",
//     imageURL: images.about04,
//   },
// ];

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => {
      // console.log(data);
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        I know that <span>Good Apps</span>
        <br />
        means
        <span> Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl).url()} alt="about.title" />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
