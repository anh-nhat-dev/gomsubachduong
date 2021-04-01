import styled from "styled-components";
import Slider from "react-slick";
import { Nav, NavItem, NavLink } from "reactstrap";
import BgTitle from "assets/img/bg-title.jpg";
import BgNav from "assets/img/bg-nav.jpg";

export const SliderSlick = styled(Slider)`
  /* margin-left: 26px; */

  .slick-slide {
    img {
      width: 100%;
      /* min-height: 456px; */
    }
  }

  .slick-dots {
    bottom: 25px;
  }
`;

export const NavTab = styled(Nav)`
  border-bottom: 2px solid #945425;
`;

export const ProductWithCategoryWrapper = styled.div`
  margin-top: 20px;
  .title {
    background: #f3f3f3;
    border-bottom: 2px solid #945425;
    border-top: 1px solid #ddd;
    overflow: hidden;
    height: 42px;
    .h-title {
      background: url(${BgTitle}) right no-repeat;
      border-radius: 0;
      font-size: 18px;
      line-height: 42px;
      padding: 0 15px;
      padding-right: 45px;
      position: relative;
      text-transform: uppercase;
      font-weight: 400;
      float: left;
      color: #fff;
    }
  }

  .list-sub {
    float: right;
    margin-top: 12px;
    margin-left: 30px;
    a {
      padding: 0 8px;
      color: #464646;
      font-size: 14px;
      float: left;
      text-decoration: none;
      line-height: 15px;
      &:last-child {
        color: #4caf50;
      }
      h3 {
        margin: 0;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
`;

export const NavItemTab = styled(NavItem)``;

export const NavLinkTab = styled(NavLink)`
  &.nav-link {
    color: #fff;
    text-transform: uppercase;
    color: #666666;
    &.active {
      color: #fff;
      font-size: 18px;
      background: url(${BgNav});
      line-height: 42px;
      padding: 0 15px;
      position: relative;
      text-transform: uppercase;
      font-weight: 400;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border: 0;
    }
  }
`;
