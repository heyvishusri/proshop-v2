export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //Calculate shipping price(if order is more than Rs.1000, shipping is free else Rs.10)
  state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 10);
  //Calculate tax price (5%)
  state.taxPrice = addDecimals(Number((0.05 * state.itemsPrice).toFixed(2)));
  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  //Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
