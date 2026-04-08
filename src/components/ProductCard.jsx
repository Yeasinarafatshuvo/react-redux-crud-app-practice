import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product, onEditClick }) => {
  // Consume dispatch actions directly inside the child component!
  const { removeProduct } = useProducts();
  const { addProductToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-info">
        <h3>{product.name}</h3>
        <span className="category-badge">{product.category}</span>
        <p className="price">${product.price}</p>
      </div>
      <div className="card-actions">
        {/* Directly using Redux to Add to Cart */}
        <button 
          className="btn-primary" 
          onClick={() => addProductToCart(product)}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          Add to Cart
        </button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-edit" onClick={() => onEditClick(product)}>Edit</button>
          {/* Directly using Redux to Delete, bypassing parent App.jsx */}
          <button className="btn-delete" onClick={() => removeProduct(product.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
