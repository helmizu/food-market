import { getUserCart, setUserCart } from "../storage"

export const addToCart = (data = {}) => {
  const initialCart = {
    id: '',
    items: [],
  }
  const cart = getUserCart() || initialCart;
  if (cart.id && cart.id === data.restaurantId) {
    const itemIndexOnExistingCart = cart.items.findIndex(item => item.id === data.id);
    if (itemIndexOnExistingCart >= 0) {
      if (!data.qty) {
        const copyOfCartItems = [...cart.items];
        copyOfCartItems.splice(itemIndexOnExistingCart, 1)
        cart.items = copyOfCartItems;
      } else {
        cart.items[itemIndexOnExistingCart] = data;
      }
    } else {
      cart.items = [...cart.items, data];
    }
  } else {
    cart.id = data.restaurantId;
    cart.items = [data];
  }
  setUserCart(cart);
}

export const getCart = () => {
  const initialCart = {
    id: '',
    items: [],
  }
  const cart = getUserCart();
  if (cart) return cart;
  return initialCart;
}