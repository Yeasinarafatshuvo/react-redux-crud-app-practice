import React, { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import Header from './components/Header';
import Stats from './components/Stats';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import { Product } from './types';

function App() {
  const { products, status, error, createProduct, editProduct } = useProducts();

  const [formData, setFormData] = useState<Product | Omit<Product, 'id'>>({ id: '', name: '', price: '' as unknown as number, category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [filterPrice, setFilterPrice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }) as Product | Omit<Product, 'id'>);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        await editProduct(formData as Product);
      } else {
        await createProduct({ 
          name: formData.name, 
          price: Number(formData.price), 
          category: formData.category 
        });
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  const handleEditClick = (product: Product) => {
    setFormData({ ...product });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', price: '' as unknown as number, category: '' });
    setIsEditing(false);
  };

  const displayedProducts = products.filter(p => Number(p.price) >= filterPrice);

  return (
    <div className="dashboard">
      <Header />

      <Stats />

      <div className="main-content">
        <aside className="sidebar">
          <ProductForm 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            isEditing={isEditing} 
            resetForm={resetForm} 
          />
        </aside>

        <section className="product-section">
          <SearchBar filterPrice={filterPrice} setFilterPrice={setFilterPrice} />

          {status === 'loading' && <div className="loader">Loading products...</div>}
          {status === 'failed' && <div className="error-message">Error: {error}</div>}
          
          <div className="product-grid">
            {displayedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onEditClick={handleEditClick} 
              />
            ))}
            
            {displayedProducts.length === 0 && status === 'succeeded' && (
              <p className="empty-state">No products found matching criteria.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
