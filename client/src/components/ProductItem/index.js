/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { formatPrice, getImage } from "utils";
import { sizesImage } from "definitions/config";

import IconPromotion from "assets/img/icon-km.png";
import { ProductItemWrapper } from "./style";

const ProductItem = ({
  span = 4,
  product = null,
  mobile,
  tablet,
  laptop,
  desktop,
}) => {
  const link = `/p-${product?.slug}.${product?._id}`;
  return (
    <ProductItemWrapper
      span={span}
      mobile={mobile}
      tablet={tablet}
      laptop={laptop}
      desktop={desktop}
      className="p-container"
    >
      {product ? (
        <Link className="img-res" to={link}>
          <img
            className="img-fluid"
            src={getImage(product.thumbnail, sizesImage.small)}
          />
        </Link>
      ) : (
        <Skeleton height={200} />
      )}
      <h4 class="p-name">
        {product ? (
          <Link to={link}>{product?.title}</Link>
        ) : (
          <Skeleton height={20} />
        )}
      </h4>
      <p class="p-sku">
        {product ? (
          <>
            Mã : <b>{product?.code}</b>
          </>
        ) : (
          <Skeleton height={15} />
        )}
      </p>
      {product ? (
        <span class="p-price">
          {product?.price_negotiable ? "Liên hệ" : formatPrice(product?.price)}
        </span>
      ) : (
        <Skeleton height={15} />
      )}

      {(product?.is_discount && !product?.price_negotiable && (
        <span class="discount">{product?.percent_discount}%</span>
      )) ||
        null}

      <span class="p-oldprice">
        {product?.is_discount &&
          !product?.price_negotiable &&
          formatPrice(product?.price_original)}
      </span>
      {product?.is_new ? <span class="p-icon_new">NEW</span> : null}
      {product ? (
        <div class="p-act">
          {product?.promotion ? (
            <div class="p-specialoff">
              <img src={IconPromotion} width="34" height="32" />
              <span>{product?.promotion}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <Skeleton height={30} />
      )}
    </ProductItemWrapper>
  );
};

export default React.memo(ProductItem);
