/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import queryString from "query-string";
import { getProducts } from "common/api";
import { Helmet } from "react-helmet";
import ProductList from "components/ProductList";
import Breadcrumb from "components/Breadcrumb";
import Pagination from "components/Pagination";
import { Container, Row, Col } from "reactstrap";

import { CategoryWrapper } from "pages/Category/style";
import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;
const TagPage = ({ location, match }) => {
  const fillters = [
    {
      id: 1,
      name: "Mới nhất",
      sort: "new",
    },
    {
      id: 2,
      name: "Giá thấp -> cao",
      sort: "price-asc",
    },
    {
      id: 3,
      name: "Giá cao -> thấp",
      sort: "price-desc",
    },
    {
      id: 4,
      name: "Xem nhiều nhất",
      sort: "view",
    },
    {
      id: 5,
      name: "Tên A->Z",
      sort: "name",
    },
  ];
  const [products, setProducts] = React.useState([]);
  const [pages, setPages] = React.useReducer((o, n) => ({ ...o, ...n }), {
    limit: 30,
    totalDocument: 0,
    loading: false,
  });
  const [sort, setSort] = React.useState(fillters[0].sort);
  const search = queryString.parse(location.search);
  const tag = match?.params?.tag;
  const { page, q, name } = search;

  const searchProducts = () => {
    setPages({ loading: true });
    getProducts({
      page: page,
      limit: pages.limit,
      sort: sort,
      tag,
    })
      .then(({ data }) => {
        if (data?.docs && Array.isArray(data?.docs)) {
          setProducts(data?.docs);
        }

        if (data?.pages) {
          setPages({ totalDocument: data.pages.total });
        }
        setPages({ loading: false });
      })
      .catch(() => {
        setPages({ loading: false });
      });
  };
  const onChangeSort = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  React.useEffect(() => {
    searchProducts();
    scroll.scrollToTop({ duration: 0 });
  }, [tag, page, sort]);

  return (
    <CategoryWrapper>
      <Helmet>
        <title>Từ khóa: {name}</title>
      </Helmet>
      <Breadcrumb data={[{ title: name }]} />
      <Container>
        <div className="taskbar-top">
          <div className="sort-by">
            <select onChange={onChangeSort}>
              {fillters.map((item) => (
                <option
                  key={item.id}
                  selected={item.sort === sort}
                  value={item.sort}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="clear" />
        </div>
        <ProductList
          data={products}
          span={5}
          loading={pages.loading}
          max={20}
          mobile={2}
          tablet={3}
          laptop={4}
        />
        <Row className="mt-3">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
            className="justify-content-center"
          >
            <Pagination {...pages} />
          </Col>
        </Row>
      </Container>
    </CategoryWrapper>
  );
};

export default React.memo(TagPage);
