import React from "react";
import { Row, Col, Container } from "reactstrap";

const OrderSuccess = () => {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <b>Đặt hàng thành thành công</b>
          <p>
            Bộ bận chăm sóc khách hàng sẽ liên hệ với bạn để xác nhận đơn hàng.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(OrderSuccess);
