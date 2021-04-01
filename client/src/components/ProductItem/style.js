import styled from "styled-components";
import Sprite from "assets/img/sprite.png";

import { device } from "definitions/config";

export const BannerCate = styled.div``;

export const ProductItemWrapper = styled.div`
  .img-res {
    max-height: 250px;
    display: block;
    overflow: hidden;
  }

  padding: 8px 8px 12px 8px;
  border: solid 1px #ddd;
  border-right: 0;
  border-top: 0;
  flex: 0 0 ${(props) => 100 / props.span}%;
  max-width: ${(props) => 100 / props.span}%;
  position: relative;

  @media ${device.mobile} {
    flex: 0 0 ${(props) => 100 / (props.mobile || props.span)}%;
    max-width: ${(props) => 100 / (props.mobile || props.span)}%;
  }

  @media ${device.tablet} {
    flex: 0 0 ${(props) => 100 / (props.tablet || props.span)}%;
    max-width: ${(props) => 100 / (props.tablet || props.span)}%;
  }

  @media ${device.laptop} {
    flex: 0 0 ${(props) => 100 / (props.laptop || props.span)}%;
    max-width: ${(props) => 100 / (props.laptop || props.span)}%;
  }

  @media ${device.desktop} {
    flex: 0 0 ${(props) => 100 / (props.desktop || props.span)}%;
    max-width: ${(props) => 100 / (props.desktop || props.span)}%;
  }

  .p-name {
    display: block;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
    margin-top: 5px;
    color: #9a701f;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 3px;
    a {
      color: #9a701f;
      text-decoration: none;
    }
  }

  .p-sku {
    padding: 5px 0px;
    margin: 0;
  }
  .p-price {
    font-weight: bold;
    color: #ec1d25;
    font-size: 14px;
    margin-right: 5px;
  }

  .p-oldprice {
    color: #999;
    text-decoration: line-through;
    font-size: 13px;
  }

  .p-icon_new {
    top: 20px;
    z-index: 9;
    right: 10px;
    position: absolute;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: #9a3839;
    color: #fff;
  }

  .p-act {
    height: 35px;
    overflow: hidden;
    margin-top: 10px;
    font-size: 14px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .discount {
    width: 45px;
    height: 45px;
    background: url(${Sprite}) -239px -62px no-repeat;
    display: block;
    position: absolute;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    line-height: 45px;
    text-align: center;
    left: 5px;
    top: 5px;
  }
`;
