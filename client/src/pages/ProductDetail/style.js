import styled from "styled-components";
import BgNav from "assets/img/bg-nav.jpg";
import discount_prodetail from "assets/img/discount_prodetail.png";
import sprite from "assets/img/sprite.png";
import { device } from "definitions/config";

export const PhotoGalleryWrapper = styled.div`
  .slick-arrow {
    display: none;
  }
  .slick-dots {
    /* position: unset; */
    margin-top: -5px;
    background-color: #ffffff57;
    bottom: 7px;

    ul {
      margin: 0;
      padding: 0;
    }

    .slick-thumb {
      li {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        overflow: hidden;
        /* padding: 5px; */
        &.slick-active {
          border: 1px solid red;
        }
        img {
          width: 20px;
          height: 20px;
          vertical-align: unset;
        }
      }
    }
  }
`;
export const ProductInfoWrapper = styled.div`
  h1.p-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 17px;
    font-weight: 700;
  }

  .info-top {
    & > span {
      display: inline-block;
      font-size: 13px;
      &::after {
        content: "|";
        margin-left: 5px;
        margin-right: 5px;
      }
      &:last-of-type {
        &::after {
          content: "";
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
  }

  @media ${device.mobile} {
    .info-top {
      & > span {
        display: block;
        &::after {
          content: "";
        }
      }
      border: none !important;
      margin: 0;
    }
  }

  .p-code,
  .p-warranty {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
  }

  .p-warranty {
    font-weight: 500;
    span {
      font-weight: 700;
      width: 100px;
      display: inline-block;
    }
  }

  .pro-price {
    font-size: 28px;
    color: #d00;
    font-weight: bold;
    letter-spacing: -2px;
  }
  .techni-p {
    table {
      border-collapse: collapse;
      border: transparent;
      font-size: 13px;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      td {
        padding: 5px 0px;
        &.att-name {
          padding-left: 0;
          font-weight: 700;
          width: 250px;
        }
      }
    }
  }

  .pro-offer {
    color: #e80c00;
    padding-top: 10px;
    border: 1px solid #e80c00;
    background: #fff;
    margin-bottom: 5px;

    img {
      margin-right: 15px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 5px;
      display: block;
      padding: 0 15px;
      border-bottom: 1px dotted #ee0000;
      padding-bottom: 10px;
      color: #ee0000;
      text-transform: uppercase;
    }

    .content {
      line-height: 21px;
      overflow: hidden;
      color: #056bad;
      padding: 0 15px;
      padding-bottom: 20px;
    }
  }

  .table-price {
    border-collapse: collapse;
    border: transparent;
    font-size: 13px;
    width: 100%;
    .pro-oldprice {
      color: #888;
      text-decoration: line-through;
    }
    .discount-prodetail {
      width: 65px;
      height: 65px;
      background: url(${discount_prodetail});
      position: absolute;
      text-align: center;
      line-height: 65px;
      font-size: 21px;
      color: yellow;
      right: 0;
      top: -37px;
    }
  }
`;

export const ProductDetailWrapper = styled.div`
  @media ${device.mobile} {
    .full-in-mobile {
      padding: 0 !important;
    }
  }

  .tag {
    margin-top: 30px;
    margin-bottom: 30px;
    b {
      font-size: 13px;
      font-weight: bold;
      color: #777;
      text-transform: uppercase;
      margin-right: 5px;
    }
    a {
      display: inline-block;
      background: #f6f6f6;
      padding: 4px 10px;
      text-decoration: none;
      margin-left: 5px;
      color: #333;
      font-size: 13px;

      &:hover {
        background: #ddd;
        color: #a33c3d;
      }
    }
  }

  .icons {
    display: inline-block;
    background-image: url(${sprite});
    background-repeat: no-repeat;

    &.icon-star {
      width: 92px;
      height: 17px;
      vertical-align: sub;
    }
  }

  .star5 {
    background-position: -354px -8px;
  }

  .call-order {
    text-align: center;
    background: #fff;
    padding: 10px;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const ProductTabWrapper = styled.div`
  .description {
    img {
      width: 100%;
    }
  }

  .title-tab {
    overflow: hidden;
    background-image: url(${BgNav});
    a {
      display: block;
      float: left;
      font-weight: 500;
      padding: 10px 14px;
      font-size: 14px;
      color: #fff;
      text-decoration: none;
      cursor: pointer;
      &.active {
        color: #212529;
        background: #ffc107;
      }
    }
  }

  .h-title {
    font-size: 17px;
    margin: 11px 0;
    border-bottom: solid 1px #ddd;
    padding-bottom: 6px;
    margin-top: 30px;
    text-transform: uppercase;
    font-weight: bold;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  .title-left {
    background-image: url(${BgNav});
    padding: 5px 15px;
    color: #fff;
  }
  .pro-left {
    .p-oldprice {
      color: #999;
      text-decoration: line-through;
      font-size: 13px;
    }

    .p-price {
      color: #9d393b;
      font-weight: 600;
    }

    li {
      overflow: hidden;
      padding: 5px 0;
      border: solid 1px #fff;
      border-top: solid 1px #eee;
      transition: all 0.5s ease;
      &:hover {
        border: solid 1px #a33c3d !important;
      }
    }

    .pright-img {
      float: left;
      width: 100px;
      img {
        width: 100%;
      }
    }

    .pright-right {
      margin-left: 110px;
      .pright-name {
        margin-top: 5px;
        height: auto;
        font-size: 14px;
        line-height: 19px;
        color: #9a701f;
        margin-bottom: 5px;
        text-decoration: none;
      }
    }
  }
`;

export const TabCommentWrapper = styled.div`
  margin-bottom: 15px;

  img {
    border: 0;
    max-width: 100%;
    height: auto;
  }

  .comment-form {
    form {
      margin-left: 50px;
    }
    textarea {
      width: 100%;
      height: 34px;
      border-radius: 3px;
      border: solid 1px #ccc;
      padding: 0 5px;
      outline: 0;
      max-width: 100%;
      height: 80px;
      padding: 5px 10px;
    }

    .img-avatar {
      float: left;
    }
  }

  .item_comment {
    padding: 15px 0;
    border-top: solid 1px #ddd;
    line-height: 1.45;

    p {
      margin: 5px 0;
    }

    .comment_left {
      float: left;
      width: 40px;
      img {
        width: 30px;
      }
    }
    .comment_right {
      margin-left: 50px;
    }

    .comment-name {
      font-weight: bold;
      font-size: 14px;
    }

    .item_reply {
      padding: 8px;
      background: #f5f5f5;
      margin-top: 5px;
      overflow: hidden;
    }
  }
  .relative {
    position: relative;
  }

  .form-input {
    border: solid 1px #ddd;
    position: absolute;
    background: #fff;
    width: 100%;
    z-index: 99;
    padding: 10px;
    top: 81px;
    box-shadow: 0 0 10px #555;
    .close {
      position: absolute;
      right: 10px;
      top: 5px;
      font-weight: bold;
      font-size: 18px;
      color: #888;
    }
  }
  .inputText {
    width: 100%;
    height: 34px;
    border-radius: 3px;
    border: solid 1px #ccc;
    padding: 0 5px;
    outline: 0;
    max-width: 100%;
  }
  .btn-red {
    background: #d00;
    color: #fff;
    padding: 7px 20px;
    font-size: 15px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    border: solid 1px #ce0101;
  }
`;
export const StickyScrollWrapper = styled.div`
  padding: 10px 20px;
  background: #f3f3f3;
  width: 350px !important;

  .pro-price {
    font-size: 28px;
    color: #d00;
    font-weight: bold;
    letter-spacing: -2px;
  }

  .call-oder {
    margin-top: 5px;
    text-align: center;
    background: #fff;
    padding: 10px;
    b {
      font-size: 15px;
      color: #ee0000;
    }
  }
  .pro-oldprice {
    color: #888;
    text-decoration: line-through;
    font-size: 14px;
  }

  @media ${device.mobile} {
    display: none;
  }

  @media ${device.tablet} {
    display: none;
  }
`;
