import React from 'react';
import { Product } from '../types';

interface ProductFormProps {
  formData: Product | Omit<Product, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  resetForm: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, handleChange, handleSubmit, isEditing, resetForm }) => {
  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name || ''} 
            onChange={handleChange} 
            placeholder="e.g. Headphones"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={formData.price || ''} 
            onChange={handleChange} 
            placeholder="e.g. 199"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={formData.category || ''} 
            onChange={handleChange} 
            placeholder="e.g. Electronics"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          {isEditing && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
