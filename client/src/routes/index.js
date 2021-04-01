import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "pages/Home";
import CategoryPage from "pages/Category";
import ProductDetailPage from "pages/ProductDetail";
import CartPage from "pages/Cart";
import OrderSuccess from "pages/OrderSuccess";
import SearchPage from "pages/Search";
import TagPage from "pages/Tags";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/c-:slug.:id",
    component: CategoryPage,
  },
  {
    path: "/p-:slug.:id",
    component: ProductDetailPage,
  },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/order-success",
    component: OrderSuccess,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/tags/:tag",
    component: TagPage,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map((route) => {
        return <Route key={route.path} {...route} exact />;
      })}
    </Switch>
  );
};

export default Routes;
