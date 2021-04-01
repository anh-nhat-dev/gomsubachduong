import styled from "styled-components";

export const CategoryWrapper = styled.div`
  .taskbar-top {
    background: #f5f5f5;
    box-sizing: border-box;
    position: relative;
    z-index: 9;
  }
  .filter-pro {
    float: left;
  }

  .item-filter,
  .item-filter-more {
    float: left;
    position: relative;
    height: 34px;
    line-height: 34px;
    margin-right: 8px;
  }

  .item-filter {
    font-size: 13px;
    &:hover {
      span.title {
        background: #983b36;
        color: #fff;
      }

      ul {
        display: block;
      }
    }
    span.title {
      display: block;
      padding: 0 3px 0 6px;
      color: #943839;

      .delete {
        color: red;
        text-decoration: none;
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
      }

      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: solid 4px transparent;
        border-top-color: #aa3d40;
        float: right;
        margin-top: 16px;
        margin-left: 2px;
      }
    }

    ul {
      position: absolute;
      background: #fff;
      width: 220px;
      z-index: 99;
      display: none;
      border: solid 1px #ddd;
      left: 0;
      top: 30px;
      max-height: 300px;
      overflow: auto;
      li {
        float: left;
        width: 100%;
        cursor: pointer;
        a {
          display: block;
          padding: 0 10px;
          border-bottom: solid 1px #eee;
          line-height: 30px;
          text-decoration: none;
          color: #333;
          &:hover {
            color: #943839;
          }
        }
      }
    }
  }
  .clear {
    clear: both;
  }

  .sort-by {
    font-size: 13px;
    float: right;
    margin-top: 3px;
    margin-right: 2px;
    select {
      border: solid 1px #ccc;
      width: 130px;
      height: 28px;
      outline: 0;
      border-radius: 0;
    }
  }

  .img-banner {
    min-width: 100%;
    max-height: 300px;
  }
`;
