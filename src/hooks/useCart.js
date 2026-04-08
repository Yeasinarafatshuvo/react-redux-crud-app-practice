import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  
  // Directly select cart slice state
  const { items: cartItems } = useSelector((state) => state.cart);

  // use reduce to calculate total quantity of items in the cart
  const totalCartQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // use reduce to calculate total price of exactly what is in the cart
  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);
  }, [cartItems]);

  const addProductToCart = (product) => {
    dispatch(addToCart(product));
  };

  const removeProductFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return {
    cartItems,
    totalCartQuantity,
    totalCartPrice,
    addProductToCart,
    removeProductFromCart,
    emptyCart
  };
};
