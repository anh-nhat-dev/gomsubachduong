import styled from "styled-components";
import IconCsbh from "assets/img/icon-csbh.png";

export const SalePolicyWrapper = styled.div`
  .csbh-hp {
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    font-size: 13px;
  }

  .h-title {
    background: #7f6851;
    color: #fff;
    line-height: 40px;
    padding: 0 10px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }

  ul {
    margin: 0;
    padding: 0;
    li {
      overflow: hidden;
      line-height: 35px;
      padding: 5px 10px;
      i {
        width: 60px;
        height: 35px;
        background: url(${IconCsbh});
        display: block;
        float: left;
        margin-right: 5px;
      }
    }
  }

  .icon-cs {
    &.cs1 {
      background-position: 12px 152px;
    }
    &.cs2 {
      background-position: 10px 114px;
    }
    &.cs3 {
      background-position: 10px 75px;
    }
    &.cs4 {
      background-position: 8px 33px;
    }
  }
`;
