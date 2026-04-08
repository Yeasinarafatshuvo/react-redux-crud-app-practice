# Enterprise React Redux Architecture (CRUD & Shopping Cart)

This project is a modern, responsive React application built from scratch to demonstrate **Senior-Level Architecture**. It implements a fully functional CRUD system and a Shopping Cart using **Redux Toolkit (Multiple Slices)**, **Custom Hooks**, and **Direct Component State Connections** (eliminating prop-drilling).

---

## 📂 Project Structure

```text
my-crud-redux-app/
├── db.json                       # Mock Database for json-server
├── package.json                  # Dependencies & Scripts
└── src/
    ├── App.jsx                   # Main Layout Component
    ├── index.css                 # Vanilla UI Styling (Glassmorphism)
    ├── main.jsx                  # React App Entry & Redux Provider
    ├── app/
    │   └── store.js              # Centralized Redux Store Configuration
    ├── components/               # Isolated UI Components
    │   ├── Header.jsx            # Display Title & Cart Badge
    │   ├── ProductCard.jsx       # Renders single product & Action Buttons
    │   ├── ProductForm.jsx       # Create/Edit form
    │   ├── SearchBar.jsx         # Price filtering
    │   └── Stats.jsx             # Inventory & Cart Summary metrics
    ├── features/                 # Redux Domain Logic (Multiple Slices)
    │   ├── cart/
    │   │   └── cartSlice.js      # Cart Logic (Add, Remove, Quantity)
    │   └── products/
    │       └── productSlice.js   # CRUD Async Thunks & API Calls
    └── hooks/                    # Business Logic Abstraction
        ├── useCart.js            # Wrapper for Cart Redux logic
        └── useProducts.js        # Wrapper for Product Redux logic
```

---

## 🔄 Architectural Data Flow (From Scratch)

Here is a visual roadmap of how data flows through this application. 

Notice how **Components subscribe directly to the Custom Hooks**, bypassing the need to pass data down manually through `App.jsx` (Prop-Drilling).

```mermaid
flowchart TD
    %% Redux Store Connections
    subgraph Redux Reducers
        Store((app/store.js))
        P_Slice[productSlice (API API)]
        C_Slice[cartSlice (Local State)]
    end

    %% State Logic Hooks
    subgraph Custom Hooks (Business Logic)
        H_Products(useProducts.js)
        H_Cart(useCart.js)
    end

    %% UI Components
    subgraph React UI Components
        UI_Header[Header.jsx]
        UI_Stats[Stats.jsx]
        UI_Card[ProductCard.jsx]
        UI_App[App.jsx]
    end

    %% Flow Path
    P_Slice -->|Product Data| Store
    C_Slice -->|Cart Data| Store
    
    Store -->|Reads Redux State| H_Products
    Store -->|Reads Redux State| H_Cart
    
    H_Products -.->|Provides Data / Fetches| UI_App
    
    H_Products ==>|Products & totalValue| UI_Stats
    H_Cart ==>|totalCartPrice & totalQuantity| UI_Stats
    
    H_Cart ==>|totalCartQuantity| UI_Header
    
    H_Cart ==>|dispatch addToCart()| UI_Card
    H_Products ==>|dispatch removeProduct()| UI_Card
```

> **Why this matters?** As seen in the diagram, `UI_Stats` and `UI_Header` grab their data directly from hooks. `App.jsx` doesn't need to know anything about the Cart!

---

## 🚀 Step-by-Step Development Workflow 

Follow this guide to understand how this application architecture was developed from scratch.

### Step 1: Project Setup & Mock Database
First, we set up our React environment (Vite) and install essential packages:
```bash
npm install @reduxjs/toolkit react-redux
npm install json-server -D
```
*   **Database:** We created `db.json` and added `"server": "json-server --watch db.json --port 5000"` to `package.json` to simulate a REST API backend.

### Step 2: Configuring the Multi-Slice Redux Store (`store.js`)
We use Redux Toolkit (RTK) to configure a centralized store.
*   **Workflow:** We combined multiple slice reducers (`productReducer`, `cartReducer`) together. This creates a global state object shaped like: `{ products: [...], cart: [...] }`.

### Step 3: Domain Features & Slices (`features/`)
Instead of mixing logic, we split our state into specific domains:
*   **`productSlice.js`:** Handles all Asynchronous (API) behavior. Uses `createAsyncThunk` to fetch, post, put, and delete items from our `json-server`.
*   **`cartSlice.js`:** Handles Synchronous (Local) behavior. Manages an array of items, tracks quantities, and uses `.find()` to see if an item already exists in the cart before adding it.

### Step 4: Abstracting into Custom Hooks (`hooks/`)
To keep UI components pristine, we abstracted `useSelector` and `useDispatch` into custom hooks.
*   **`useCart.js` & `useProducts.js`:** 
    *   Internally wrap `useDispatch()` to hide action imports from components.
    *   Use `.reduce()` to calculate aggregate data cleanly (like `totalCartPrice`, `totalValue`).

### Step 5: Pure Component Integration (Eliminating Props)
We extracted our UI into `src/components/`.
*   **Senior Pattern:** Instead of having `App.jsx` fetch data and pass variables downwards (prop-drilling via `<Header totalCartQuantity={1} />`), the components themselves import the Redux Hooks directly.
*   **Example:** `ProductCard.jsx` invokes `removeProduct` and `addProductToCart` directly from the hook!

### Step 6: Beautiful UI Styling
Used pure, vanilla CSS (`index.css`) implementing modern web design aesthetics: Dark mode background grids, Glassmorphism (blur effects) on cards, CSS variables, and dynamic hover transformations without heavy libraries.

---

## 💡 Key JavaScript Concepts Applied

Throughout the code, you'll find real-world usage of advanced JS concepts:
1. **Spread Operator (`...`)**: Used inside forms for merging states `setFormData(prev => ({...prev, [name]: value}))`.
2. **`.map()`**: Iterating over the products array to output lists of `<ProductCard />`s dynamically.
3. **`.reduce()`**: Used in both hooks to loop over all product prices/quantities and accumulate them into a single integer.
4. **`.filter()`**: Used in Redux to delete items immutably, and in UI components to visually filter out products by price.
5. **`.find()`**: Used in `cartSlice` to detect duplicates so we can increment an item's `quantity` rather than duplicating the entire card entry!

## ⚙️ How to Run

1. **Install dependencies**: `npm install`
2. **Start the Mock API Backend:** `npm run server` *(Runs on localhost:5000)*
3. **Start the React Frontend:** `npm run dev` *(Runs normally alongside backend)*
