import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import styled from "styled-components";

export const BreadcrumbWrapper = styled(Breadcrumb)`
  .breadcrumb {
    background-color: transparent;
  }
`;

export const BreadcrumbItemStyle = styled(BreadcrumbItem)`
  font-size: 14px;
  a {
    text-decoration: none;
    color: #483232;
  }
  &.active {
    color: #333;
    font-weight: 600;
  }
`;
