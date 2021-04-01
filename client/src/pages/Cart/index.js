/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumb from "components/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "utils";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { order } from "common/api";
import { CartWrapper } from "./style";
import Scroll from "react-scroll";
const scroll = Scroll.animateScroll;

const CartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items } = useSelector(({ Cart }) => ({ items: Cart.items }));
  const [orderInput, setOrderInput] = React.useReducer(
    (o, n) => ({ ...o, ...n }),
    {}
  );

  const totalPrice = items.reduce((a, c) => a + c.qty * c.price, 0);
  const onChangeInput = (e, id) => {
    let value = parseInt(e.target.value);

    if (isNaN(value)) {
      value = 1;
    }

    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: {
        id: id,
        qty: value,
      },
    });
  };

  const onSubmitOrder = () => {
    const error = [];
    if (!orderInput.email) {
      error.push("Bạn chưa nhập email");
    }
    if (!orderInput.full_name) {
      error.push("Bạn chưa nhập tên");
    }
    if (!orderInput.phone) {
      error.push("Bạn chưa nhập số điện thoại");
    }
    if (!orderInput.address) {
      error.push("Bạn chưa nhập địa chỉ");
    }

    if (error.length) {
      return window.alert(error.join("\n"));
    }

    const products = items.map((item) => ({
      product: item.id,
      qty: item.qty,
    }));

    order({ ...orderInput, items: products }).then(() => {
      dispatch({
        type: "RESET_CART",
      });
      history.push("/order-success");
    });
  };

  const onChangeOrderInput = (e) => {
    const { name, value } = e.target;
    setOrderInput({ [name]: value });
  };

  const onDeleteItem = (e, id) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm(`Ban muon xoa san pham nay`);
    if (isDelete) {
      dispatch({
        type: "DELETE_CART_ITEM",
        payload: id,
      });
    }
  };

  React.useEffect(() => {
    scroll.scrollToTop({ duration: 0 });
  }, []);

  return (
    <CartWrapper>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <Breadcrumb data={[{ title: "Giỏ hàng" }]} />
      <Container>
        <Row>
          <Col sm={8}>
            <h1 style={{ fontSize: 18, display: "inline", fontWeight: 500 }}>
              Giỏ hàng của tôi
            </h1>
            <table className="tbl-cart mt-3">
              <tbody>
                <tr
                  style={{
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  <td>Tên sản phẩm</td>
                  <td>Số lượng</td>
                  <td>Đơn giá</td>
                  <td>Thành tiền</td>
                  <td></td>
                </tr>
                {items.map((item) => {
                  return (
                    <tr className="js-item-row" key={item.id}>
                      <td>
                        <img src={item?.img?.url} />
                        <b className="name">{item.name}</b>
                      </td>
                      <td>
                        <input
                          className="buy-quantity quantity-change"
                          value={item.qty}
                          size={5}
                          type="number"
                          min={1}
                          onChange={(e) => onChangeInput(e, item.id)}
                          style={{ width: 60, textAlign: "center" }}
                        />
                      </td>
                      <td>
                        <span className="js-show-buy-price">
                          {formatPrice(item.price)}
                        </span>
                      </td>
                      <td>
                        <span className="total-item-price">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </td>
                      <td>
                        <a
                          className="delete-from-cart"
                          href="#"
                          onClick={(e) => onDeleteItem(e, item.id)}
                        >
                          Xóa
                        </a>
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={5}>
                    <br />
                    <div className="total" align="right">
                      <b>Tổng tiền:</b>

                      <b style={{ color: "red", fontSize: 18 }}>
                        <span className="total-cart-price">
                          {formatPrice(totalPrice)}
                        </span>
                      </b>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col sm={4}>
            <div className="cart-right-input">
              <div className="title">2. Thông tin thanh toán</div>
              <p>
                <label>Họ và tên*</label>
                <input
                  name="full_name"
                  onChange={onChangeOrderInput}
                  value={orderInput?.full_name}
                  type="text"
                  placeholder="Họ tên người nhận hàng"
                />
              </p>
              <p>
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  name="phone"
                  onChange={onChangeOrderInput}
                  value={orderInput?.phone}
                  placeholder="Dùng để liên lạc khi giao hàng"
                />
              </p>
              <p>
                <label>Email *</label>
                <input
                  type="text"
                  name="email"
                  onChange={onChangeOrderInput}
                  value={orderInput?.email}
                  placeholder="Để nhận thông báo đơn hàng"
                />
              </p>
              <p>
                <label>Địa chỉ*</label>
                <input
                  type="text"
                  name="address"
                  onChange={onChangeOrderInput}
                  value={orderInput?.address}
                  placeholder="Địa chỉ nhận hàng"
                />
              </p>
              <p>
                <label>Ghi chú</label>
                <textarea
                  name="note"
                  onChange={onChangeOrderInput}
                  value={orderInput?.note}
                  placeholder="Ghi chú khách hàng"
                />
              </p>
            </div>
            {(items.length && (
              <div className="btn-buy-order">
                <button onClick={onSubmitOrder} className="submit">
                  Đặt hàng
                </button>
              </div>
            )) ||
              null}

            <span className="text-btn-cart">
              Tư vấn viên sẽ gọi điện thoại xác nhận,
              <br /> không mua không sao
            </span>
          </Col>
        </Row>
      </Container>
    </CartWrapper>
  );
};

export default CartPage;
