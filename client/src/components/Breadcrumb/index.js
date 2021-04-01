import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbWrapper, BreadcrumbItemStyle } from "./style";

const Breadcrumb = ({ data = [] }) => (
  <BreadcrumbWrapper>
    <BreadcrumbItemStyle>
      <Link to="/">Trang chủ</Link>
    </BreadcrumbItemStyle>
    {data.map((item, index) => {
      return (
        <BreadcrumbItemStyle active={index + 1 === data.length}>
          {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
        </BreadcrumbItemStyle>
      );
    })}
  </BreadcrumbWrapper>
);

export default React.memo(Breadcrumb);
