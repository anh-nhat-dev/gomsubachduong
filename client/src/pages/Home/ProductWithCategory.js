import React from "react";
import { Link } from "react-router-dom";
import ProductList from "components/ProductList";
import { getHomeCategories } from "common/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ProductWithCategoryWrapper } from "./style";

const ProductWithCategory = () => {
  const [cates, setCates] = React.useState(Array(10).fill(1));
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getHomeCategories()
      .then(({ data }) => {
        if (data?.docs && Array.isArray(data.docs)) {
          setCates(data.docs);
        } else {
          setCates([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setCates([]);
      });
  }, []);

  return (
    <>
      {cates.map((cate, index) => (
        <ProductWithCategoryWrapper key={cate.slug || index}>
          {loading ? (
            <SkeletonTheme color="##e6e4e4" highlightColor="#ddd">
              <Skeleton height={50} />
            </SkeletonTheme>
          ) : (
            <div className="title">
              <Link to={`/c-${cate?.slug}.${cate?.id}`}>
                <div className="h-title">{cate?.name}</div>
              </Link>
              <div className="list-sub">
                {cate?.childrend?.map((child) => (
                  <Link key={child?.slug} to={`/c-${child?.slug}.${child?.id}`}>
                    <h3>{child?.name}</h3>
                  </Link>
                ))}
                <Link to={`/c-${cate?.slug}.${cate?.id}`}>
                  Xem tất cả <i className="fa fa-angle-right" />
                </Link>
              </div>
            </div>
          )}

          <ProductList
            cate={{ img: cate?.bg?.url, link: `/c-${cate?.slug}.${cate?.id}` }}
            loading={loading}
            showCateBanner
            max={10}
            span={5}
            data={cate?.products}
            mobile={2}
            tablet={3}
            laptop={4}
          />
        </ProductWithCategoryWrapper>
      ))}
    </>
  );
};

export default React.memo(ProductWithCategory);
