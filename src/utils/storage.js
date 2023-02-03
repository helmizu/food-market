export const setUser = (user) => {
  const userStringify = JSON.stringify(user);
  localStorage.setItem('USER_AUTH', userStringify);
}

export const getUser = () => {
  const user = localStorage.getItem('USER_AUTH');
  if (!user) return null;
  const userJSON = JSON.parse(user);
  return userJSON;
}

export const deleteUser = () => {
  localStorage.removeItem('USER_AUTH');
}

export const setUserLocation = (coords) => {
  const locationStringify = JSON.stringify(coords);
  localStorage.setItem('USER_LOCATION', locationStringify);
}

export const getUserLocation = () => {
  const location = localStorage.getItem('USER_LOCATION');
  if (!location) return null;
  const locationJSON = JSON.parse(location);
  return locationJSON;
}

export const deleteUserLocation = () => {
  localStorage.removeItem('USER_LOCATION');
}

export const setUserCart = (cart) => {
  const cartStringify = JSON.stringify(cart);
  localStorage.setItem('USER_CART', cartStringify);
}

export const getUserCart = () => {
  const cart = localStorage.getItem('USER_CART');
  if (!cart) return null;
  const cartJSON = JSON.parse(cart);
  return cartJSON;
}

export const deleteUserCart = () => {
  localStorage.removeItem('USER_CART');
}
