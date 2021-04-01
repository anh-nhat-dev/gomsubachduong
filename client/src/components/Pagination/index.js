import React from "react";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { PaginationWrapper, PaginationWrapperItem } from "./style";

const Pagination = ({ limit = 10, totalDocument = 0 }) => {
  const totalPage = Math.ceil(totalDocument / limit);

  const location = useLocation();

  const pathname = location.pathname;
  const search = queryString.parse(location.search);
  const page = parseInt(search.page) || 1;

  function makeUrl(page) {
    return `${pathname}?${queryString.stringify({ ...search, page: page })}`;
  }

  function renderPage() {
    const pages = [];
    const left = page - 2;
    const right = page + 2;

    for (let i = 1; i <= totalPage; i++) {
      if (i === 1 || i === totalPage || (i >= left && i <= right)) {
        if (i === left && i - pages[pages.length - 1] > 1) {
          pages.push("...");
        }
        pages.push(i);
        if (i === right && totalPage - i > 1) {
          pages.push("...");
        }
      }
    }

    return pages.map((i, index) => (
      <PaginationWrapperItem key={index} active={page === i}>
        <Link className="page-link" to={makeUrl(i)}>
          {i}
        </Link>
      </PaginationWrapperItem>
    ));
  }

  return (
    <PaginationWrapper>
      {page > 1 && (
        <PaginationWrapperItem>
          <Link className="page-link" to={makeUrl(page - 1)}>
            Trang trước
          </Link>
        </PaginationWrapperItem>
      )}
      {renderPage()}
      {page < totalPage && (
        <PaginationWrapperItem>
          <Link className="page-link" to={makeUrl(page + 1)}>
            Trang sau
          </Link>
        </PaginationWrapperItem>
      )}
    </PaginationWrapper>
  );
};

export default React.memo(Pagination);
