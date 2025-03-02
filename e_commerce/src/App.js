import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

// Context for Cart
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Sample Products
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Headphones", price: 100 },
];

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <Container>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>
            {product.name} - ${product.price}
          </p>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      ))}
      <Link to="/cart">Go to Cart</Link>
    </Container>
  );
};

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Container>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - ${item.price}
            </p>
            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </div>
        ))
      )}
      <Link to="/checkout">Proceed to Checkout</Link>
    </Container>
  );
};

const Checkout = () => {
  return (
    <Container>
      <h2>Checkout</h2>
      <p>Thank you for your purchase!</p>
      <Link to="/">Back to Home</Link>
    </Container>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
