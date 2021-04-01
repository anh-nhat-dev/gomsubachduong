import styled from "styled-components";
import { device } from "definitions/config";

export const BannerCateWrapper = styled.div`
  padding: 8px 8px 12px 8px;
  border: solid 1px #ddd;
  border-right: 0;
  border-top: 0;
  flex: 0 0 ${(props) => 100 / props.span}%;
  max-width: ${(props) => 100 / props.span}%;
  position: relative;

  @media ${device.mobile} {
    flex: 0 0 ${(props) => 100 / (props.mobile || props.span)}%;
    max-width: ${(props) => 100 / (props.mobile || props.span)}%;
  }

  @media ${device.tablet} {
    flex: 0 0 ${(props) => 100 / (props.tablet || props.span)}%;
    max-width: ${(props) => 100 / (props.tablet || props.span)}%;
  }

  @media ${device.laptop} {
    flex: 0 0 ${(props) => 100 / (props.laptop || props.span)}%;
    max-width: ${(props) => 100 / (props.laptop || props.span)}%;
  }

  @media ${device.desktop} {
    flex: 0 0 ${(props) => 100 / (props.desktop || props.span)}%;
    max-width: ${(props) => 100 / (props.desktop || props.span)}%;
  }

  img {
    width: 100%;
    max-height: 350px;
  }

  @media ${device.mobile} {
    img {
      max-height: 200px;
    }
  }

  @media ${device.tablet} {
    img {
      max-height: 250px;
    }
  }

  a {
    display: flex;
    height: 100%;
  }
`;
