/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

import { BannerCateWrapper } from "./style";

const BannerCate = ({ cate }) => {
  return (
    <BannerCateWrapper span={1.66666} mobile={1} tablet={1} laptop={1}>
      <Link to={cate.link}>
        <img src={cate.img} />
      </Link>
    </BannerCateWrapper>
  );
};

export default React.memo(BannerCate);
