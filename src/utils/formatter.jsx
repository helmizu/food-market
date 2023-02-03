export const formatToIdr = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

export const getArrayUnique = (array) => {
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  return array.filter(onlyUnique) || [];
}

const formatToK = (price = 0) => {
  return `${(price / 1000).toFixed(0)}k`
}

export const getPriceRange = (array) => {
  if (!array.length) return [formatToK(0), formatToK(0)];
  const lowestPrice = Math.min(...array) || 0;
  const highestPrice = Math.max(...array) || 0;

  return [formatToK(lowestPrice), formatToK(highestPrice)];
}
