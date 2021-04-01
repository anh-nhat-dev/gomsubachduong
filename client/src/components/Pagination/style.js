import styled from "styled-components";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationWrapper = styled(Pagination)`
  .pagination {
    justify-content: center;
  }
  .page-item {
    &.active {
      a.page-link {
        background-color: #a43a3e;
      }
    }
  }
`;

export const PaginationWrapperItem = styled(PaginationItem)`
  a.page-link {
    padding: 5px 15px;
    background-color: #ddd;
    color: #000;
    border: none;
    border-radius: 0;
    margin-right: 5px;
  }
`;

export const PaginationItemLink = styled(PaginationLink)``;
