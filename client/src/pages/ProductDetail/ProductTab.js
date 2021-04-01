/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Element } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import TabComment from "./TabComment";
import { ProductTabWrapper, StickyScrollWrapper } from "./style";
import { getProducts } from "common/api";
import ProductList from "components/ProductList";
import { StickyContainer, Sticky } from "react-sticky";
import { formatPrice } from "utils";

const ProductTab = ({
  description = "",
  video = "",
  cateId = null,
  productId,
  product,
  onAddToCart,
}) => {
  const tabs = [
    { id: "dac-diem-noi-bat", name: "Đặc điểm nổi bật" },
    { id: "video", name: "Video" },
    { id: "san-pham-ban-chay-nhat", name: "Sản phẩm bán chạy nhất" },
    { id: "san-pham-lien-quan", name: "Sản phẩm cùng liên quan" },
    {
      id: "binh-luan-danh-gia-san-pham",
      name: "Bình luận / Đánh giá sản phẩm",
    },
  ];

  const [bestSellerProducts, setBestSellerProducts] = React.useState([]);

  const [tabActive, setTabActive] = React.useState(tabs[0].id);

  const [productsSameCategory, setProductsSameCategory] = React.useState([]);

  React.useEffect(() => {
    if (cateId) {
      getProducts({ cate_id: cateId, page: 1, limit: 5 }).then(({ data }) => {
        if (data?.docs && Array.isArray(data?.docs)) {
          setProductsSameCategory(data?.docs);
        }
      });
    }
  }, [cateId]);

  React.useEffect(() => {
    getProducts({
      is_selling: "true",
      limit: 5,
    }).then(({ data }) => {
      if (Array.isArray(data?.docs)) {
        setBestSellerProducts(data?.docs);
      }
    });
  }, []);

  return (
    <ProductTabWrapper>
      <div className="title-tab">
        {tabs.map((tab) => (
          <Link
            className={tabActive === tab.id ? "active" : ""}
            to={tab.id}
            spy={true}
            smooth={true}
            duration={500}
            key={tab.id}
            onClick={() => setTabActive(tab.id)}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <Container className="bg-white">
        <Row>
          <Col xs={12} md={6} lg={8}>
            <Element name="dac-diem-noi-bat" className="description">
              <div className="h-title">Đặc điểm nổi bật</div>
              <div
                className="nd"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Element>
            <Element name="video">
              <div className="h-title">Video</div>
              <div style={{ textAlign: "center" }}>
                {video && (
                  <iframe
                    width={560}
                    height={315}
                    src={`https://www.youtube.com/embed/${video}?rel=0&autoplay=0`}
                    frameBorder={0}
                    allowFullScreen
                  />
                )}
              </div>
            </Element>
            <Element name="san-pham-lien-quan">
              <div className="h-title">Sản phẩm liên quan</div>
              <ProductList
                data={productsSameCategory}
                span={4}
                mobile={2}
                tablet={2}
                laptop={3}
              />
            </Element>
            <Element name="binh-luan-danh-gia-san-pham">
              <TabComment productId={productId} />
            </Element>
          </Col>
          <Col xs={12} md={6} lg={4} style={{ overflow: "hidden" }}>
            <Element name="san-pham-ban-chay-nhat">
              <div className="box-left">
                <div className="title-left h-title">Sản phẩm bán chạy nhất</div>
              </div>
              <div className="pro-left">
                <ul className="ul" id="pro-bess-right">
                  {bestSellerProducts.map((product) => {
                    return (
                      <li>
                        <RouteLink
                          className="pright-img"
                          to={`/p-${product?.slug}.${product?._id}`}
                        >
                          <img
                            className="img-fluid"
                            src={product?.thumbnail?.url}
                          />
                        </RouteLink>
                        <div className="pright-right">
                          <RouteLink
                            className="pright-name"
                            to={`/p-${product?.slug}.${product?._id}`}
                          >
                            {product?.title}
                          </RouteLink>
                          <p className="pright-sku">
                            Mã : <b>{product?.code}</b>
                          </p>
                          <span class="p-price">
                            {product?.price_negotiable
                              ? "Liên hệ"
                              : formatPrice(product?.price)}
                          </span>
                          <span class="p-oldprice">
                            {product?.is_discount &&
                              !product?.price_negotiable &&
                              formatPrice(product?.price_original)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Element>
            <StickyContainer style={{ height: "100%" }}>
              <Sticky>
                {({ style }) => (
                  <StickyScrollWrapper style={style}>
                    <div
                      style={{ fontSize: 18, fontWeight: 500, marginTop: 0 }}
                    >
                      {product?.title}
                    </div>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: 110 }}>Giá bán:</td>
                          <td>
                            <span className="pro-price">
                              {product?.price_negotiable
                                ? "Liên hệ"
                                : formatPrice(product?.price)}
                            </span>
                          </td>
                        </tr>
                        {product?.is_discount && !product?.price_negotiable ? (
                          <tr>
                            <td>Giá chưa giảm:</td>
                            <td style={{ position: "relative" }}>
                              <span className="pro-oldprice">
                                {formatPrice(product?.price_original)}
                              </span>
                              <span className="discount-prodetail">
                                -{product?.percent_discount}%
                              </span>
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                    <div className="button-buy-bottom has-popup-2">
                      <Button
                        color="warning"
                        onClick={(e) => onAddToCart(e, "buy")}
                        block
                        className="py-2"
                      >
                        Mua hàng
                      </Button>
                      <Button
                        onClick={(e) => onAddToCart(e, "addToCart")}
                        color="primary"
                        block
                        className="py-2"
                      >
                        Cho vào giỏ
                      </Button>
                      <div className="call-oder">
                        <p>
                          <i className="fa fa-phone" /> Gọi mua hàng
                        </p>
                        <b>0333 869 169 - 0857 857 843</b>
                        <p>(từ 8h đến 21h hàng ngày)</p>
                      </div>
                    </div>
                  </StickyScrollWrapper>
                )}
              </Sticky>
            </StickyContainer>
          </Col>
        </Row>
      </Container>
    </ProductTabWrapper>
  );
};

export default React.memo(ProductTab);
