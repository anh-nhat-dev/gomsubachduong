export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price
  );

/**
 *
 * @param {*} image
 * @param {*} size
 * @returns
 */
export const getImage = (image, size) => {
  console.log(image);

  if (size) {
    return image[size]?.url;
  }

  return image.url;
};
