// Calculate order prices based on orderItems from database
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calculateOrderPrices = (orderItems) => {
  // Calculate items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (if order is more than $100, shipping is free else $10)
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);

  // Calculate tax price (5%)
  const taxPrice = addDecimals(Number((0.05 * Number(itemsPrice)).toFixed(2)));

  // Calculate total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice),
    shippingPrice: Number(shippingPrice),
    taxPrice: Number(taxPrice),
    totalPrice: Number(totalPrice)
  };
};

