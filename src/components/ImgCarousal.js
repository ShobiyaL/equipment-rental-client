import React from "react";

import { Carousel } from "react-responsive-carousel";

import LazyLoad from "react-lazyload";

import ProductSectionArray from "../helpers/Categories";
const ImgCarousal = () => {
  return (
    <>
      <LazyLoad>
        {/* <Carousel autoPlay infiniteLoop>
          {ProductSectionArray.map(({ title, img }) => (
            <div key={title}>
              <img alt={title} src={img} loading="lazy" />
              <p className="legend">{title}</p>
            </div>
          ))}
        </Carousel> */}
      </LazyLoad>
    </>
  );
};

export default ImgCarousal;