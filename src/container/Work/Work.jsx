import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import "./Work.scss";

import { AppWrapper, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState([{ y: 0, opacity: 1 }]);
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);

  const workFilterHandler = (item) => {
    console.log(item);
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilteredWorks(works);
      } else {
        setFilteredWorks(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      // console.log(data);
      setWorks(data);
      setFilteredWorks(data);
    });
  }, []);

  useEffect(() => {
    const query = '*[_type == "misc"]';
    client.fetch(query).then((data) => {
      setProjectCategory(data[0]["category"]);
    });
  }, []);
  // console.log(projectCategory);
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio </span>
        Section
      </h2>
      <div className="app__work-filter">
        {projectCategory.map((item, index) => (
          <div
            key={index}
            onClick={() => workFilterHandler(item.toLowerCase())}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filteredWorks.map((item, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(item.imgUrl).url()} alt={item.name} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={item.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [0, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={item.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [0, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{item.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {item.description}
              </p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{item.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrapper(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
