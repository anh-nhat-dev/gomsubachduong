import React from "react";
import { ProductViewedWrapper } from "./style";
import { useSelector } from "react-redux";
import ProductList from "components/ProductList";


const ProductViewed = () => {
  const { views } = useSelector(({ Cart }) => ({ views: Cart.views }));

  return (
    <ProductViewedWrapper>
      <div className="title-box-pro-home">
        <div className="h-title">Sản phẩm bạn vừa xem</div>
      </div>

      <ProductList data={views} span={5} tablet={3} mobile={2} />
    </ProductViewedWrapper>
  );
};

export default React.memo(ProductViewed);
