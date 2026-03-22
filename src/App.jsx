import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cardsState, cartQuantitiesState } from './recoil/atoms';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import MyCardList from './MyCardList';
import AddCardForm from './AddCardForm';
import './App.css';
import PaymentSuccess from './pages/PaymentSuccess';

const BASE_URL= import.meta.env.BASE_URL;

function App() {

  const [, setProducts] = useRecoilState(productsState);
  const cartItems = useRecoilValue(cartState);
  const cards = useRecoilValue(cardsState);
  const cartQuantities = useRecoilValue(cartQuantitiesState);
  
  /* 상품데이터가 백엔드에 있을경우 활성화. 지금은 recoil에 직접적으로 값을 넣음
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("데이터 로드 실패:", err));
  }, [setProducts]);
  */

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
    localStorage.setItem('myCards', JSON.stringify(cards));
  }, [cartItems, cartQuantities, cards]);

  return (
    <Router basename={BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/payment" element={<MyCardList />} />
          <Route path="/add-card" element={<AddCardForm />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;