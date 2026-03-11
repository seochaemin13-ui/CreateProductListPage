import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { productsState, cartState, cardsState, cartQuantitiesState } from './recoil/atoms';
import Card from './Card';
import AddCardForm from './AddCardForm';
import MyCardList from './MyCardList';
import Cart from './Cart';
import './App.css';

function App() {

  const [page, setPage] = useState('list');
  const [products, setProducts] = useRecoilState(productsState);
  const [cards, setCards] = useRecoilState(cardsState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [cartQuantities, setCartQuantities] = useRecoilState(cartQuantitiesState);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("데이터 로드 실패:", err));
  }, [setProducts]);

  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  const handleButtonClick = (id, isAdding) => {
    if (isAdding) {
      setCartItems(prev => [...prev, id]);
    } else {
      setCartItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleAddCardSubmit = (newCardInfo) => {
    const newCard = { ...newCardInfo, id: Date.now() };
    setCards([...cards, newCard]);
    setPage('payment');
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div className="App">
      {page === 'list' && (
        <>
        <header className="header-bar">
          <div className="header-content">
            <img src="img/cart_icon.png"
              alt="장바구니"
              className='cart_icon'
              onClick={()=> setPage('cart')} />
            {cartItems.length >0 && (
              <span className='cart-badge'>{cartItems.length}</span>
              )}
          </div>
        </header>

        <div className="title-area">
          <h1>신발 상품 목록</h1>
          <p>현재 {products.length}개의 상품이 있습니다.</p>
        </div>

        <div className="card_container">
          {products.map((card) => (
            <Card
              key={card.id}
              {...card}
              isAdded={cartItems.includes(card.id)}
              onButtonClick={(isAdding) => handleButtonClick(card.id, isAdding)}
              onPaymentClick={() => setPage('payment')}
            />
          ))}
        </div>
      </>
     )}

      {page === 'payment' && (
        <MyCardList 
          cards={cards} 
          onAddCard={() => setPage('addCard')}
          onBack={() => setPage('list')}
          onDeleteCard={handleDeleteCard}
        />
      )}

      {page === 'addCard' && (
        <AddCardForm 
          onSubmit={handleAddCardSubmit}
          onBack={() => setPage('payment')}
        />
      )}

      {page === 'cart' && (
        <Cart 
          onBack={() => setPage('list')} 
          onCheckout={() => setPage('payment')} 
        />
      )}
    </div>
  );
}

export default App;