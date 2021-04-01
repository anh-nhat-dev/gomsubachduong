/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { getProducts, getCategory } from "common/api";
import { Helmet } from "react-helmet";
import ProductList from "components/ProductList";
import Breadcrumb from "components/Breadcrumb";
import Pagination from "components/Pagination";
import { Container, Row, Col } from "reactstrap";
import { groupBy } from "lodash";
import { CategoryWrapper } from "./style";

import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;

const CategoryPage = ({ match, location, ...props }) => {
  const [products, setProducts] = React.useState([]);
  const [attributes, setAttributes] = React.useState([]);
  const [attributesSelecteds, setAttributesSelecteds] = React.useReducer(
    (o, n) => ({ ...o, ...n }),
    {}
  );

  const [cate, setCate] = React.useState({});
  const { id } = match.params;
  const search = queryString.parse(location.search);

  const sorts = [
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

  const [sort, setSort] = React.useState(sorts[0].sort);

  const [pages, setPages] = React.useReducer((o, n) => ({ ...o, ...n }), {
    limit: 30,
    totalDocument: 0,
    loading: false,
  });

  const { page } = search;

  const getProductsCategories = () => {
    setPages({ loading: true });
    getProducts({
      cate_id: id,
      page: page,
      limit: pages.limit,
      sort: sort,
      attributes: JSON.stringify(attributesSelecteds),
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

  const groupValues = (values = []) => {
    const group = groupBy(values);

    const _values = Object.keys(group).map((key) => ({
      name: key,
      count: group[key].length,
    }));

    return _values;
  };

  const checkAttributes = (attr) => {
    const attrSelected = attributesSelecteds[attr._id];

    return attrSelected ? (
      <span>
        {attrSelected}{" "}
        <a
          className="delete"
          onClick={() => setAttributesSelecteds({ [attr._id]: undefined })}
        >
          Xóa
        </a>
      </span>
    ) : (
      attr.name
    );
  };

  React.useEffect(() => {
    setPages({ loading: true });
    scroll.scrollToTop({ duration: 0 });
    getCategory(id)
      .then(({ data }) => {
        if (data?.item) {
          setCate(data.item);
          getProductsCategories();
        }
        if (Array.isArray(data?.attributes)) {
          setAttributes(data?.attributes);
        }

        setPages({ loading: false });
      })
      .catch(() => {
        setPages({ loading: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    getProductsCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, attributesSelecteds]);

  const getBreadcrumbs = () => {
    const br = [];
    if (cate?.tree && Array.isArray(cate.tree)) {
      for (let item of cate.tree) {
        br.push({ title: item.name, link: `/c-${item.slug}.${item._id}` });
      }
    }

    br.push({
      title: cate.name,
    });
    return br;
  };

  return (
    <CategoryWrapper>
      <Helmet>
        <title>{cate.name || "Danh mục sản phẩm"}</title>
      </Helmet>
      <Breadcrumb data={getBreadcrumbs()} />
      <Container>
        {cate?.banner?.url ? (
          <img className="img-fluid img-banner" src={cate?.banner?.url} />
        ) : null}

        <div className="cate_summary" style={{ padding: "0 5px 15px 5px" }}>
          <span>{cate.description}</span>
        </div>

        <div className="taskbar-top">
          <div className="filter-pro">
            {(cate?.childrend?.length && (
              <div
                className="item-filter category-filter"
                style={{ marginLeft: 8 }}
              >
                <span className="title">Danh mục</span>
                <ul className="ul">
                  {cate?.childrend?.map((chil) => (
                    <li key={chil._id}>
                      <Link to={`/c-${chil.slug}.${chil._id}`}>
                        {chil.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )) ||
              null}

            {attributes.map((attr) => {
              return (
                <div
                  className="item-filter category-filter"
                  style={{ marginLeft: 8 }}
                  key={attr._id}
                >
                  <span className="title">{checkAttributes(attr)}</span>
                  <ul className="ul">
                    {groupValues(attr?.values)?.map((val) => (
                      <li key={val.name}>
                        <a
                          onClick={() =>
                            setAttributesSelecteds({
                              [attr._id]: val.name,
                            })
                          }
                        >
                          {val.name} ({val.count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          {/*filter-pro*/}
          <div className="sort-by">
            <select onChange={onChangeSort}>
              {sorts.map((item) => (
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

export default React.memo(CategoryPage);
