export interface Product {
  id: string | number;
  name?: string;
  title?: string; // Sometimes APIs use title instead of name
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow generic fields dynamically because it's a practice CRUD
}

export interface CartItem {
  product: Product;
  quantity: number;
}
