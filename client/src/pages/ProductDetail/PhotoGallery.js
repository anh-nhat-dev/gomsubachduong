/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";

import { PhotoGalleryWrapper } from "./style";

const PhotoGallery = ({ photos = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>,
    customPaging: function (i) {
      return <img src={photos[i]?.small} />;
    },
    appendDots: (dots) => (
      <div
        style={{
          padding: "5px",
        }}
      >
        <ul className="slick-thumb"> {dots} </ul>
      </div>
    ),
  };

  const getConfigImageMagnify = (source) => {
    return {
      smallImage: {
        isFluidWidth: true,
        src: source.small,
        srcSet: source.srcSet,
      },
      largeImage: {
        src: source.large,
        width: 1200,
        height: 1800,
      },
      lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
      // isHintEnabled: true,
      shouldHideHintAfterFirstActivation: false,
      // enlargedImagePosition: "over",
      enlargedImagePortalId: "portal",
      enlargedImageContainerDimensions: {
        width: "100%",
        height: "100%",
      },
    };
  };

  return (
    <PhotoGalleryWrapper>
      <Slider {...settings}>
        {photos.map((src, index) => (
          <div key={index}>
            <ReactImageMagnify {...getConfigImageMagnify(src)} />
          </div>
        ))}
      </Slider>
    </PhotoGalleryWrapper>
  );
};

export default React.memo(PhotoGallery);
