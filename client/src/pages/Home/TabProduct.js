/* eslint-disable array-callback-return */
import React from "react";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import ProductList from "components/ProductList";
import { getProducts } from "common/api";
import { cloneDeep } from "lodash";
import { NavTab, NavItemTab, NavLinkTab } from "./style";

const TabProduct = () => {
  const [tabs, setTabs] = React.useState([
    {
      id: "san-pham-khuyen-mai",
      title: "Sản phẩm khuyến mãi",
      products: [],
      params: {
        is_promotion: "true",
        limit: 4,
      },
    },
    {
      id: "san-pham-ban-chay",
      title: "Sản phẩm bán chạy",
      products: [],
      params: {
        is_selling: "true",
        limit: 4,
      },
    },
    {
      id: "san-pham-moi",
      title: "Sản phẩm mới",
      products: [],
      params: {
        is_new: "true",
        limit: 4,
      },
    },
  ]);

  const [tabActive, setTabActive] = React.useState(tabs[0].id);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const tab = tabs.find((t) => t.id === tabActive);

    if (!tab?.products?.length) {
      setLoading(true);
      getProducts(tab.params)
        .then(({ data }) => {
          if (data?.docs) {
            const _tabs = cloneDeep(tabs);
            _tabs.map((tab) => {
              if (tab.id === tabActive) {
                tab.products = data.docs;
              }
            });

            setTabs(_tabs);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive]);

  return (
    <React.Fragment>
      <NavTab tabs>
        {tabs.map((tab) => (
          <NavItemTab key={tab.id}>
            <NavLinkTab
              className={classnames({ active: tabActive === tab.id })}
              onClick={() => setTabActive(tab.id)}
            >
              {tab.title}
            </NavLinkTab>
          </NavItemTab>
        ))}
      </NavTab>
      <TabContent activeTab={tabActive}>
        {tabs.map((tab) => (
          <TabPane tabId={tab.id} key={tab.id}>
            <ProductList
              max={4}
              mobile={1}
              tablet={2}
              laptop={3}
              loading={loading}
              data={tab.products}
            />
          </TabPane>
        ))}
      </TabContent>
    </React.Fragment>
  );
};

export default React.memo(TabProduct);
