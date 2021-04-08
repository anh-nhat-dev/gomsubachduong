export const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:3001/api";

const size = {
  mobile: "576px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet}) and (min-width: ${size.mobile})`,
  laptop: `(max-width: ${size.laptop}) and (min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const sizesImage = {
  small: "small",
  thumbnail: "thumbnail",
  large: "large",
  full: "full",
};
