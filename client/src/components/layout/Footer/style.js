import styled from "styled-components";
import BgTitle from "assets/img/BannerFooter.jpg";
import { device } from "definitions/config";

export const FooterBottom = styled.div`
  background: #945425;
  color: #fff;
  overflow: hidden;
  padding: 10px;
  margin-top: 15px;

  a {
    color: #fff;
  }

  .item {
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .fa {
    font-size: 40px;
    float: left;
    width: 50px;
    text-align: center;
  }
`;

export const BackToTop = styled.div`
  position: fixed;
  right: 0;
  bottom: 100px;
  margin-top: -90px;
  z-index: 99;
  width: 38px;
  cursor: pointer;

  a {
    background: #1a4388;
    color: #fff;
    text-align: center;
    padding: 0;
    border-radius: 5px;
    width: 33px;
    height: 33px;
    font-size: 25px;
  }

  i {
    color: #fff;
    display: inline-block;
    margin-top: 6px;
  }
`;

export const SocialButton = styled.div`
  display: inline-grid;
  position: fixed;
  bottom: 70px;
  left: 45px;
  min-width: 45px;
  text-align: center;
  z-index: 99999;
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
  }
  .zoomIn {
    animation-name: zoomIn;
  }
  @keyframes zoomInDown {
    from {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
  .zoomInDown {
    animation-name: zoomInDown;
  }
  @keyframes zoomInLeft {
    from {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
  .zoomInLeft {
    animation-name: zoomInLeft;
  }
  @keyframes zoomInRight {
    from {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
  .zoomInRight {
    animation-name: zoomInRight;
  }
  @keyframes zoomInUp {
    from {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    60% {
      opacity: 1;
      transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
  .zoomInUp {
    animation-name: zoomInUp;
  }

  .social-button-content {
    display: inline-grid;
  }
  @-webkit-keyframes headerAnimation {
    0% {
      margin-top: -70px;
    }
    100% {
      margin-top: 0;
    }
  }
  @keyframes headerAnimation {
    0% {
      margin-top: -70px;
    }
    100% {
      margin-top: 0;
    }
  }

  a {
    padding: 8px 0;
    cursor: pointer;
    position: relative;
    span {
      border-radius: 2px;
      text-align: center;
      background: rgb(103, 182, 52);
      padding: 9px;
      display: none;
      width: 180px;
      margin-left: 10px;
      position: absolute;
      color: #ffffff;
      z-index: 999;
      top: 9px;
      left: 40px;
      transition: all 0.2s ease-in-out 0s;
      -moz-animation: headerAnimation 0.7s 1;
      -webkit-animation: headerAnimation 0.7s 1;
      -o-animation: headerAnimation 0.7s 1;
      animation: headerAnimation 0.7s 1;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 10px 0;
        border-color: transparent rgb(103, 182, 52) transparent transparent;
        position: absolute;
        left: -10px;
        top: 10px;
      }
    }
  }
  i {
    width: 40px;
    height: 40px;
    background: #43a1f3;
    color: #fff;
    border-radius: 100%;
    font-size: 20px;
    text-align: center;
    line-height: 1.9;
    position: relative;
    z-index: 999;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .alo-circle {
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: zoomIn;
    width: 50px;
    height: 50px;
    top: 3px;
    right: -3px;
    position: absolute;
    background-color: transparent;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid rgba(30, 30, 30, 0.4);
    opacity: 0.1;
    border-color: #0089b9;
    opacity: 0.5;
  }
  .alo-circle-fill {
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: pulse;
    width: 60px;
    height: 60px;
    top: -2px;
    right: -8px;
    position: absolute;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid transparent;
    background-color: rgba(0, 175, 242, 0.5);
    opacity: 0.75;
  }
  .call-icon:hover > span,
  .mes:hover > span,
  .sms:hover > span,
  .zalo:hover > span {
    display: block;
  }
`;

export const NewFooter = styled.div`
  font-size: 13px;
  /* padding: 10px; */

  /* padding: 20px; */
  overflow: hidden;
  padding-top: 30px;
  background: #fff
    bottom no-repeat;
  position: relative;

  .map {
    .title {
      padding-left: 20px;
    }

    img {
      width: 100%;
    }
  }

  .company-info .logo img {
    width: 100%;
  }

  .company-info {
    font-weight: bold;
    line-height: 1.5;
    padding: 15px;
  }

  .link {
    padding: 0 40px;
  }

  @media ${device.mobile} {
    .link {
      padding: 0 20px;
    }
  }

  .title {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .link a {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
  }
  .link a:before {
    content: "";
    display: inline-block;
    width: 0;
    border: solid 5px transparent;
    border-left-color: #9d3d3e;
  }

  .company-info b {
    font-size: 16px;
    text-transform: uppercase;
    color: #9b3f40;
    display: block;
    margin: 10px 0 5px 0;
    margin-top: 10px;
    margin-right: 0px;
    margin-bottom: 5px;
    margin-left: 0px;
  }

  .clear {
    clear: both;
  }
  #footer-social {
    text-align: center;
    margin-top: 5px;
    padding: 15px;
  }

  #footer-social a {
    display: inline-block;
    width: 50px;
    margin: 0 10px;
  }

  #footer-social img {
    width: 100%;
  }
`;

export const FooterService = styled.div`
  background: #fff;
  border-top: 2px solid #9a3837;
  overflow: hidden;
  margin-bottom: 20px;
  .service-box {
    padding: 15px 0px 10px 30px;
    float: left;
    width: 33%;
    
    img {
      float: left;
      margin-right: 10px;
    }

    b {
      font-size: 15px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 4px;
    }

    span {
      font-size: 14px;
    }
  }
`;

export const ProductViewedWrapper = styled.div`
  margin-bottom: 15px;
  .title-box-pro-home {
    overflow: hidden;
    height: 42px;
    border-bottom: 2px solid #a7393c;
  }

  .h-title {
    background: url(${BgTitle});
    font-size: 18px;
    line-height: 42px;
    padding: 0 15px;
    position: relative;
    text-transform: uppercase;
    font-weight: 400;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    float: left;
    color: #fff;
  }
`;
