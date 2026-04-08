import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

const Stats = () => {
  // Children directly accessing Redux state via hooks! NO PROPS NEEDED!
  const { products, totalValue } = useProducts();
  const { totalCartPrice, totalCartQuantity } = useCart();

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Products Available</h3>
        <p>{products.length}</p>
      </div>
      <div className="stat-card">
        <h3>Total Inventory Value</h3>
        <p>${totalValue.toFixed(2)}</p>
      </div>
      <div className="stat-card" style={{borderColor: 'var(--primary-color)'}}>
        <h3>Cart Value ({totalCartQuantity} items)</h3>
        <p style={{color: 'white'}}>${totalCartPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Stats;
