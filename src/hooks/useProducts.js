import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  // Fetch initial data if idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Derived state using professional approaches:
  // 1. apply array reduce method to count total inventory monetary value
  const totalValue = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price || 0), 0);
  }, [products]);

  // Handler functions encapsulating dispatches
  const createProduct = async (productData) => {
    // Explanation: Wrap in await/try-catch if you want the component to act on success,
    // otherwise the slice handles state automatically.
    return dispatch(addProduct(productData)).unwrap();
  };

  const editProduct = async (productData) => {
    return dispatch(updateProduct(productData)).unwrap();
  };

  const removeProduct = async (id) => {
    return dispatch(deleteProduct(id)).unwrap();
  };

  // Find a specific product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  // Filter products by a minimum price
  const getProductsAbovePrice = (price) => {
    return products.filter(product => Number(product.price) > price);
  };

  return {
    products,
    status,
    error,
    totalValue,
    createProduct,
    editProduct,
    removeProduct,
    getProductById,
    getProductsAbovePrice
  };
};
