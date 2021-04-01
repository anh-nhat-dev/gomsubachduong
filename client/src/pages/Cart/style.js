import styled from "styled-components";
import BgNav from "assets/img/bg-nav.jpg";

export const CartWrapper = styled.div`
  .tbl-cart {
    border-collapse: collapse;
    width: 100%;
    tr {
      background-color: #f9f9f9;
    }
    td {
      vertical-align: top;
      padding: 10px 5px;
    }

    img {
      width: 50px;
    }
  }

  .cart-right-input {
    border: solid 1px #a5383b;
    padding-bottom: 10px;
    .title {
      line-height: 40px;
      color: #fff;
      font-size: 20px;
      padding: 0 10px;
      background-image: url(${BgNav});
    }
  }
  p {
    margin: 5px;
    line-height: 18px;
    padding: 5px 10px;
  }

  label {
    display: block;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 4px;
  }
  input[type="text"] {
    width: 100%;
    height: 30px;
    padding: 0 5px;
  }

  textarea,
  input {
    width: 100%;
    height: 34px;
    border-radius: 3px;
    border: solid 1px #ccc;
    padding: 0 5px;
    outline: 0;
    max-width: 100%;
  }

  .submit {
    border: 0;
    background: #a33c3d;
    padding: 8px;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    cursor: pointer;
    outline: 0;
    text-align: center;

    line-height: 35px;
    font-size: 23px;
  }
  .text-btn-cart {
    display: block;
    text-align: center;
    margin-top: 15px;
    font-size: 13px;
  }
  a {
    color: #333;
    font-size: 13px;
    text-decoration: none;
  }
`;
