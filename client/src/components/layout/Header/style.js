import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import BgHeader from "assets/img/banner-bg.jpg";
import BgNav from "assets/img/bg-nav.jpg";
import { device } from "definitions/config";

export const HeaderWrapper = styled.header`
  height: 120px;
  padding-right: 10px;
  padding-top: 33px;
  background-image: url(${BgHeader});
  background-repeat: no-repeat;

  .cart-header {
    float: right;
    display: block;
    font-weight: bold;
    color: #333;
    padding: 0 5px;
    margin-top: 25px;
    /* margin-right: 20px; */
    font-size: 12px;
    text-align: center;
    position: relative;
    img {
      width: 38px;
    }
    .count_shopping_cart_stores {
      color: #fff;
      position: absolute;
      right: 2px;
      top: 1px;
      background: red;
      padding: 0px 8px;
      display: block;
      border-radius: 4px;
    }

    span {
      display: block;
      margin-top: 3px;
    }
  }

  .hotline-header {
    float: right;
    font-size: 12px;
    color: #333;
    margin-top: 28px;
    /* margin-right: 25px; */
    img {
      width: 38px;
    }
  }

  /* @media ${device.mobile} {
    .cart-header {
      margin-right: 70px;
    }
  } */
`;

export const Logo = styled.a`
  float: left;
  height: 0px;
  margin-left: -30px;
  margin-top: -17px;
`;

export const NavBarWrapper = styled.div`
  height: 40px;
  background: url(${BgNav});
  color: #fff;
  display: flex;
  width: 100%;


  .search {
    width: 317px;
    border: solid 1px #eee;
    height: 33px;
    margin-top: 3px;
    position: relative;
    box-shadow: 0 0 10px rgb(51 51 51 / 52%);
    margin-left: 20px;
    input {
      float: left;
      height: 32px;
      width: 315px;
      border: 0;
      padding-left: 15px;
      outline: 0;
    }

    button {
      width: 100px;
      background-color: #ccc;
      font-size: 14px;
      color: #333;
      border: 0;
      height: 33px;
      cursor: pointer;
      position: absolute;
      right: -1px;
      top: -1px;
    }
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    color: #fff;
  }

  .rc-menu-horizontal {
    background-color: transparent;
    & > .rc-menu-item {
      padding: 8px 15px;
    }
  }

  .rc-menu-horizontal > .rc-menu-item,
  .rc-menu-horizontal > .rc-menu-submenu > .rc-menu-submenu-title {
    padding: 7px 15px;
  }

  .rc-menu-submenu-selected,
  .rc-menu-item-selected {
    background-color: transparent;
    border-bottom: 2px solid #fff;
    color: #fff;
  }

  .rc-menu-horizontal > .rc-menu-submenu-active,
  .rc-menu-horizontal > .rc-menu-item-active {
    border-bottom: 2px solid #ffffff;
    background-color: #a53a3e;
    color: #ffffff;
  }

  #main-menu {
    float: left;
    position: relative;
    /* padding-right: 20px; */
    /* width: 220px; */

    &:hover {
      .ul {
        display: block !important;
      }
    }

    .title {
      text-transform: uppercase;
      font-size: 16px;
      padding-left: 10px;
      font-weight: 600;
      padding-right: 10px;
      width: 220px;
      line-height: 40px;
      span {
        padding: 0 5px;
      }
    }

    .ul {
      position: absolute;
      top: 39px;
      border: solid 1px #ddd;
      border-top: none;
      width: 220px;
      background: #fff;
      /* min-height: 457px; */
      z-index: 9999;
      li:first-child {
        border: 0;
      }
      li {
        border-top: solid 1px #ddd;
        position: relative;
        &:hover {
          background-color: #a43b3f;
          .sub {
            display: block;
          }

          a.root {
            .name {
              color: #fff;
            }
          }
        }

        img {
          width: 34px;
          float: left;
          border: 0;
          max-width: 100%;
          height: 34px;
        }

        a.root {
          display: block;
          overflow: hidden;
          font-size: 13px;
          line-height: 20px;
          position: relative;
          padding: 0 10px 0 0;

          .fa {
            position: absolute;
            right: 5px;
            top: 10px;
            color: #a43b3f;
          }

          .name,
          .sub-name {
            display: block;
            font-weight: normal;
            margin: 0;
            padding: 5px 0;
            color: #a43b3f;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;

            &:hover {
              color: #fff;
            }
          }
        }
      }
    }

    .sub {
      position: absolute;
      top: 0;
      left: 100%;
      margin: 0;
      padding: 0;
      background: #fff;
      list-style: none;
      width: 100%;
      display: none;
    }

    @media ${device.mobile} {
      .title {
        width: 0;
        span {
          display: none;
        }
        .right {
          display: none;
        }
      }
    }
  }
`;
