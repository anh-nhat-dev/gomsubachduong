import styled from "styled-components";

export const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  &.slider {
    display: block !important;
    .slick-slide {
      .p-container {
        max-width: 100%;
        flex: unset;
      }
    }
    .slick-track {
      margin-left: 0;
    }
  }
`;
