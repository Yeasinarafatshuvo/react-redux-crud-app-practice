import { useCart } from '../hooks/useCart';

const Header = () => {
  // Directly consuming the Redux state via custom hook instead of props!
  const { totalCartQuantity } = useCart();

  return (
    <header className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Inventory Dashboard</h1>
          <p>Manage your products seamlessly</p>
        </div>
        <div className="cart-badge" style={{ background: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          🛒 Cart Items: <span style={{ background: 'white', color: 'var(--primary-color)', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>{totalCartQuantity}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
