export const formatPrice = (price) => {
  return price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  // Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
