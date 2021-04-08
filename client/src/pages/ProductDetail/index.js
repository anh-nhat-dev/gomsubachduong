/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Breadcrumb from "components/Breadcrumb";
import SalePolicy from "components/SalePolicy";
import { getProduct } from "common/api";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import PhotoGallery from "./PhotoGallery";
import ProductInfo from "./ProductInfo";
import ProductTab from "./ProductTab";
import Scroll from "react-scroll";
import { sizesImage } from "definitions/config";
import { getImage } from "utils";
import { ProductDetailWrapper } from "./style";

const scroll = Scroll.animateScroll;
const ProductDetail = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const [product, setProduct] = React.useState({});

  const getBreadcrumbs = () => {
    const br = [];
    if (product?.cate_id?.tree && Array.isArray(product?.cate_id?.tree)) {
      for (let item of product?.cate_id?.tree) {
        br.push({ title: item.name, link: `/c-${item.slug}.${item._id}` });
      }
    }

    br.push({
      title: product?.cate_id?.name,
      link: `/c-${product?.cate_id?.slug}.${product?.cate_id?._id}`,
    });

    br.push({
      title: product?.title,
    });

    return br;
  };

  const getPhotos = () => {
    const photos = [];

    if (product?.thumbnail) {
      photos.push({
        srcSet: getImage(product.thumbnail, sizesImage.large),
        small: getImage(product.thumbnail, sizesImage.thumbnail),
        large: getImage(product.thumbnail, sizesImage.full),
      });
    }

    if (Array.isArray(product?.photos)) {
      for (const photo of product?.photos) {
        photos.push({
          srcSet: getImage(photo, sizesImage.large),
          small: getImage(photo, sizesImage.thumbnail),
          large: getImage(photo, sizesImage.full),
        });
      }
    }

    return photos;
  };

  function onAddToCart(e, type) {
    e.preventDefault();

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product._id,
        qty: 1,
        name: product.title,
        price: product.price,
        img: product.thumbnail,
      },
    });

    if (type === "addToCart") {
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    }

    if (type === "buy") {
      history.push("/cart");
    }
  }

  React.useEffect(() => {
    getProduct(id).then(({ data }) => {
      if (data?.item) {
        setProduct(data.item);
      }
    });
    scroll.scrollToTop({ duration: 0 });
  }, [id]);

  React.useEffect(() => {
    if (product) {
      dispatch({ type: "VIEW", payload: product });
    }
  }, [product]);

  return (
    <ProductDetailWrapper>
      <Helmet>
        <title>{product.title || "Chi tiết sản phẩm"}</title>
      </Helmet>
      <Breadcrumb data={getBreadcrumbs()} />
      <Container>
        <Row>
          <Col xs={12} md={12} lg={4} className="full-in-mobile">
            <PhotoGallery photos={getPhotos()} />
          </Col>
          <Col xs={12} md={6} lg={5}>
            <ProductInfo
              title={product?.title}
              price={product?.price}
              idDiscount={product?.is_discount}
              percentDiscount={product?.percent_discount}
              originalPrice={product?.price_original}
              code={product?.code}
              attributes={product?.attributes}
              warranty={product?.warranty}
              promotion={product?.promotion}
              stock={product?.stock}
              view={product?.view}
              priceNegotiable={product?.price_negotiable}
              note={product?.note}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <SalePolicy />
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
            <div className="call-order">
              <p>
                <i className="fa fa-phone" /> Gọi mua hàng
              </p>
              <b>0333 869 169 - 0857 857 843</b>
              <p>(từ 8h đến 21h hàng ngày)</p>
            </div>
          </Col>
          <Col sm={12} className="my-3">
            <div className="tag">
              <b
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#777",
                  textTransform: "uppercase",
                  marginRight: 5,
                }}
              >
                Từ khóa:
              </b>
              {product?.tags?.map((tag) => (
                <Link to={`/tags/${tag?.slug}?name=${tag?.name}`}>
                  {tag?.name}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <ProductTab
        description={product?.description}
        video={product?.video_id}
        cateId={product?.cate_id?._id}
        productId={product?._id}
        product={product}
        onAddToCart={onAddToCart}
      />
    </ProductDetailWrapper>
  );
};

export default React.memo(ProductDetail);
