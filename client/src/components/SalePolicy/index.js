import React from "react";

import { SalePolicyWrapper } from "./style";

const SalePolicy = () => (
  <SalePolicyWrapper>
    <div className="csbh-hp">
      <div className="title">
        <div className="h-title">Chính sách bán hàng</div>
      </div>
      <ul className="ul">
        <li>
          <i className="icon-cs cs1" />
          <span>Giao hàng toàn quốc</span>
        </li>
        <li>
          <i className="icon-cs cs2" />
          <span>Kiểm tra khi nhận hàng</span>
        </li>
        <li>
          <i className="icon-cs cs3" />
          <span>Thanh toán khi nhận hàng</span>
        </li>
        <li>
          <i className="icon-cs cs4" />
          <span>Thời gian giao từ 3 đến 6 ngày</span>
        </li>
      </ul>
    </div>
  </SalePolicyWrapper>
);

export default React.memo(SalePolicy);
