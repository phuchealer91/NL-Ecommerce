export const formatPrice = (price) => {
  return Number(price)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
