/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-scroll";
import { formatPrice } from "utils";
import IconKhuyenMai from "assets/img/icon-km.png";
import { ProductInfoWrapper } from "./style";

const ProductInfo = ({
  title = "",
  price = 0,
  idDiscount = false,
  percentDiscount = 0,
  originalPrice = 0,
  code = "",
  attributes = [],
  warranty,
  promotion,
  stock = "out_of_stock",
  view = 0,
  priceNegotiable = false,
  note,
}) => (
  <ProductInfoWrapper>
    <div
      id="portal"
      style={{ position: "absolute", zIndex: 999 }}
      className="portal"
    />

    <h1 className="p-title">{title}</h1>
    <p
      className="info-top"
      style={{
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 14,
        borderBottom: "1px solid #ddd",
      }}
    >
      <span style={{ cursor: "pointer" }} className="gotoReview ">
        <i className="icons icon-star star5" />
        <Link
          activeClass="active"
          to={`binh-luan-danh-gia-san-pham`}
          spy={true}
          smooth={true}
          duration={500}
        >
          (Viết đánh giá)
        </Link>
      </span>
      <span>
        Tình trạng: &nbsp;
        {stock === "stocking" ? (
          <span className="text-success">Sẵn hàng</span>
        ) : (
          <span className="text-danger">Hết hàng</span>
        )}
      </span>
      <span>
        Lượt xem:
        <span style={{ color: "#777" }}> {view}</span>
      </span>
    </p>
    <div>
      <p className="p-code">
        <span>Mã sản phẩm:</span> <b>{code}</b>
      </p>
      <div className="techni-p">
        <table
          id="tb-product-spec"
          cellPadding={3}
          cellSpacing={0}
          border={1}
          bordercolor="#CCCCCC"
        >
          <tbody>
            {attributes.map((attr) => {
              return (
                <tr key={attr._id}>
                  <td className="att-name">{attr.name}</td>
                  <td>{attr.value}</td>
                </tr>
              );
            })}
            {(note && (
              <tr>
                <td className="att-name">Ghi chú</td>
                <td dangerouslySetInnerHTML={{ __html: note }}></td>
              </tr>
            )) ||
              null}
          </tbody>
        </table>
      </div>
    </div>
    {warranty && (
      <p class="p-warranty">
        <span>Bảo hành:</span> {warranty}
      </p>
    )}

    <table className="table-price">
      <tbody>
        <tr>
          <td style={{ width: 100 }} className=" text-700">
            Giá bán:
          </td>
          <td>
            <span className="pro-price">
              {priceNegotiable ? "Liên hệ" : formatPrice(price)}
            </span>
          </td>
        </tr>
        {idDiscount && !priceNegotiable ? (
          <tr>
            <td>Giá chưa giảm:</td>
            <td style={{ position: "relative" }}>
              <span className="pro-oldprice">{formatPrice(originalPrice)}</span>
              <span className="discount-prodetail">-{percentDiscount}%</span>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
    {promotion && (
      <div className="pro-offer" id="offerTop">
        <b className="title">
          <img src={IconKhuyenMai} width={50} />
          Ưu đãi và quà tặng khuyến mãi:
        </b>
        <div className="content" style={{ color: "#000" }}>
          {promotion}
        </div>
      </div>
    )}
  </ProductInfoWrapper>
);

export default React.memo(ProductInfo);
