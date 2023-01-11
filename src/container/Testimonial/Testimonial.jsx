import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "./Testimonial.scss";
import { AppWrapper, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const testimonialsQuery = '*[_type == "testimonials"]';

    client.fetch(testimonialsQuery).then((data) => {
      setTestimonials(data);
    });

    const brandsQuery = '*[_type == "brands"]';

    client.fetch(brandsQuery).then((data) => {
      console.log(data);
      setBrands(data);
    });
  }, []);

  const curTestimonial = testimonials[currentIndex];
  const testLength = testimonials.length;

  const testClickHandler = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {!!testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(curTestimonial.imgurl).url()} alt="testimonials" />
            <div className="app__testimonial-content">
              <p className="p-text">{curTestimonial.feedback}</p>
              <div className="">
                <h4 className="bold-text">{curTestimonial.name}</h4>
                <h5 className="p-text">{curTestimonial.company}</h5>
              </div>
            </div>
          </div>
          {!(testLength - 1 === 0) && (
            <div className="app__testimonial-btns app__flex">
              <div
                className="app__flex"
                onClick={() =>
                  testClickHandler(
                    currentIndex === 0 ? testLength - 1 : currentIndex - 1
                  )
                }
              >
                <HiChevronLeft />
              </div>
              <div
                className="app__flex"
                onClick={() =>
                  testClickHandler(
                    currentIndex === testLength - 1 ? 0 : currentIndex + 1
                  )
                }
              >
                <HiChevronRight />
              </div>
            </div>
          )}
        </>
      )}
      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand.name}
          >
            <img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonials",
  "app__primarybg"
);
