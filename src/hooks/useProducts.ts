import { useEffect, useMemo } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Product } from '../types';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector((state) => state.products);

  // Fetch initial data if idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const totalValue = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price || 0), 0);
  }, [products]);

  const createProduct = async (productData: Omit<Product, 'id'>) => {
    return dispatch(addProduct(productData)).unwrap();
  };

  const editProduct = async (productData: Product) => {
    return dispatch(updateProduct(productData)).unwrap();
  };

  const removeProduct = async (id: string | number) => {
    return dispatch(deleteProduct(id)).unwrap();
  };

  const getProductById = (id: string | number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsAbovePrice = (price: number): Product[] => {
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
