import React from "react";
import { Row, Container, Col } from "reactstrap";
import SalePolicy from "components/SalePolicy";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import Slider from "./Slider";
import TabProduct from "./TabProduct";
import ProductWithCategory from "./ProductWithCategory";
import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;

const HomePage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    scroll.scrollToTop({ duration: 0 });
    dispatch({ type: "TOGGLE_MENU", payload: true });
    return () => {
      dispatch({ type: "TOGGLE_MENU", payload: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      {/* <Container> */}
      <Row>
        <Col xs={{ size: 12 }}>
          <Slider />
        </Col>
      </Row>
      {/* </Container> */}
      <Container>
        <Row>
          <Col md="9">
            <TabProduct />
          </Col>
          <Col md="3" className="d-none d-md-block d-xl-block d-lg-block">
            <SalePolicy />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <ProductWithCategory />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
