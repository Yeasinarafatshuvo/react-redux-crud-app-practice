import { useMemo } from 'react';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { Product } from '../types';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const totalCartQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (Number(item.product.price || 0) * item.quantity), 0);
  }, [cartItems]);

  const addProductToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const removeProductFromCart = (productId: string | number) => {
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
