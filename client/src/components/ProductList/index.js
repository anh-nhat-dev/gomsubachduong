import React from "react";
import ProductItem from "components/ProductItem";
import { SkeletonTheme } from "react-loading-skeleton";
import { isObject } from "lodash";
import classnames from "classnames";
import { ProductListWrapper } from "./style";
import Slider from "react-slick";
import BannerCate from "components/BannerCate";
import { isMobile } from "react-device-detect";

const ProductList = ({
  data = [],
  span = 4,
  max = 4,
  loading = false,
  showCateBanner = false,
  mobile,
  tablet,
  laptop,
  desktop,
  cate = { img: "", link: "" },
  slider = isMobile,
}) => {
  const sliderSettings = Object.assign(
    {},
    {
      infinite: false,
      // speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: false,
      centerMode: false,
      swipeToSlide: true,
      // vertical: true,
      slide: "li",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    },
    isObject(slider) ? slider : {}
  );

  const renderProductItem = () => {
    return loading
      ? Array(max)
          .fill(1)
          .map((item, index) => (
            <ProductItem
              mobile={mobile}
              tablet={tablet}
              laptop={laptop}
              desktop={desktop}
              span={span}
              key={index}
            />
          ))
      : Boolean(data?.length) &&
          data.map((item, index) => (
            <ProductItem
              span={span}
              mobile={mobile}
              tablet={tablet}
              laptop={laptop}
              desktop={desktop}
              key={item._id}
              product={item}
            />
          ));
  };

  return (
    <SkeletonTheme color="##e6e4e4" highlightColor="#ddd">
      <ProductListWrapper
        className={classnames({
          slider: Boolean(slider),
        })}
      >
        {showCateBanner ? <BannerCate cate={cate} /> : null}
        {slider ? (
          <div className="d-block">
            <Slider {...sliderSettings}>{renderProductItem()}</Slider>
          </div>
        ) : (
          renderProductItem()
        )}
      </ProductListWrapper>
    </SkeletonTheme>
  );
};

export default React.memo(ProductList);
