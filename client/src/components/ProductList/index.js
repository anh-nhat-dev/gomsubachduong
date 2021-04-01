import React from "react";
import ProductItem from "components/ProductItem";
import { SkeletonTheme } from "react-loading-skeleton";
import { ProductListWrapper } from "./style";
import BannerCate from "components/BannerCate";

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
}) => {
  return (
    <SkeletonTheme color="##e6e4e4" highlightColor="#ddd">
      <ProductListWrapper>
        {showCateBanner ? <BannerCate cate={cate} /> : null}
        {loading
          ? Array(max)
              .fill(1)
              .map((item, index) => {
                return (
                  <ProductItem
                    mobile={mobile}
                    tablet={tablet}
                    laptop={laptop}
                    desktop={desktop}
                    span={span}
                    key={index}
                  />
                );
              })
          : data.map((product, index) => {
              return (
                <ProductItem
                  span={span}
                  mobile={mobile}
                  tablet={tablet}
                  laptop={laptop}
                  desktop={desktop}
                  key={product._id}
                  product={product}
                />
              );
            })}
      </ProductListWrapper>
    </SkeletonTheme>
  );
};

export default React.memo(ProductList);
