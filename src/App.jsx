import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import Header from './components/Header';
import Stats from './components/Stats';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';

function App() {
  // We no longer need totalValue or removeProduct here since children components get them directly!
  const { products, status, error, createProduct, editProduct } = useProducts();

  const [formData, setFormData] = useState({ id: '', name: '', price: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [filterPrice, setFilterPrice] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        await editProduct(formData);
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

  const handleEditClick = (product) => {
    setFormData({ ...product });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', price: '', category: '' });
    setIsEditing(false);
  };

  const displayedProducts = products.filter(p => Number(p.price) >= filterPrice);

  return (
    <div className="dashboard">
      <Header />

      {/* Stats NO LONGER takes props! It fetches data itself from Redux. */}
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
                // Notice: We NO LONGER pass onDelete prop down! The child calls removeProduct via Redux directly.
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
