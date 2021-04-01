/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import { getMenus } from "common/api";
import { useHistory } from "react-router-dom";

import { HeaderWrapper, Logo, NavBarWrapper } from "./style";

import CallHeader from "assets/img/Callheader.png";
import ImgLogo from "assets/img/Logo Bạch Dương 1.png";
import Catheader from "assets/img/Cartheader.png";

const Header = () => {
  const history = useHistory();
  const [menus, setMenus] = React.useState([]);
  const [keyWord, setKeyword] = React.useState("");
  const { total } = useSelector(({ Cart, App }) => ({
    total: Cart.items.length,
    menu: App.menu,
  }));

  const onSearch = () => {
    history.push(`/search?q=${keyWord}`);
  };

  React.useEffect(() => {
    getMenus().then(({ data }) => {
      if (Array.isArray(data.docs)) {
        setMenus(data.docs);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Element name="back-to-top" />
      <HeaderWrapper>
        <Logo>
          <Link to="/">
            <img src={ImgLogo} style={{ maxHeight: 104 }} />
          </Link>
        </Logo>
        <Link className="cart-header" to="/cart" rel="nofollow">
          <i className="icons">
            <img src={Catheader} />
          </i>
          <span>Giỏ hàng</span>
          <b className="count_shopping_cart_stores">{total}</b>
        </Link>
        <div className="hotline-header text-center">
          <i className="icons">
            <img src={CallHeader} />
          </i>
          <br /> <b>0333 869 169</b>
        </div>
      </HeaderWrapper>
      <NavBarWrapper>
        <div id="main-menu">
          <div className="title robot">
            <i className="fa fa-bars" /> <span>Tất cả danh mục</span>{" "}
            <i className="fa fa-caret-down right" />
          </div>
          <ul className="ul mn-home" style={{ display: "none" }}>
            {menus.map((menu) => (
              <li key={menu._id}>
                <a href={`/c-${menu?.slug}.${menu?.id}`} className="root">
                  <img src={menu.icon.url} alt={menu.name} title={menu.name} />
                  <h2 className="name">{menu.name}</h2>
                  <i className="fa fa-angle-right" />
                </a>
                <ul className="sub">
                  {menu.childrend?.map((child) => (
                    <li key={child._id}>
                      <a
                        href={`/c-${child?.slug}.${child?.id}`}
                        className="root"
                      >
                        <img
                          src={child.icon.url}
                          alt={child.name}
                          title={child.name}
                        />
                        <h2 className="sub-name ">{child.name}</h2>
                        <i className="fa fa-angle-right" />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="search">
          <input
            type="text"
            className="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            autoComplete="off"
            value={keyWord}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button onClick={onSearch}>Tìm kiếm</button>
        </div>
      </NavBarWrapper>
    </React.Fragment>
  );
};

export default React.memo(Header);
