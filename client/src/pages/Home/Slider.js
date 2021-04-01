/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { SliderSlick } from "./style";

import ImgSlider1 from "assets/img/slider/8.jpg";
import ImgSlider2 from "assets/img/slider/9.jpg";

const sliders = [
  {
    img: ImgSlider1,
    link: "",
  },
  {
    img: ImgSlider2,
    link: "",
  },
];

const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    loop: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true
  };

  return (
    <SliderSlick {...settings}>
      {sliders.map((slider) => {
        return (
          <div>
            <img src={slider.img} />
          </div>
        );
      })}
    </SliderSlick>
  );
};

export default React.memo(Slider);
