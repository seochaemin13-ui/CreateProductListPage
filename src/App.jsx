import React, { useState, useEffect } from 'react';
import Card from './Card';
import AddCardForm from './AddCardForm';
import MyCardList from './MyCardList';
import './App.css';

function App() {

  const [page, setPage] = useState('list');

  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('myCards');
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleButtonClick = (id, isAdding) => {
      if (isAdding) {
        console.log(`장바구니에 ${id}이 담겼습니다.`);
        setCartItems(prev => [...prev, id]);
      } else {
        console.log(`장바구니에서 ${id}이 취소되었습니다.`);
        setCartItems(prev => prev.filter(itemId => itemId !== id));
      }
    };

  const handlePaymentClick = () => {
    setPage('payment');
  };

  const handleAddCardSubmit = (newCardInfo) => {
    const newCard = { ...newCardInfo, id: Date.now() };
    setCards([...cards, newCard]);
    setPage('payment');
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const cardsData = [
    { id: 1, title: "브랜드A", price: "35,000원", description: "편안하고 착용감이 좋은 신발", imageUrl: 'img/1.jpg', buttonText: "담기" },
    { id: 2, title: "브랜드A", price: "25,000원", description: "힙한 컬러가 매력적인 신발", imageUrl: 'img/2.jpg', buttonText: "담기" },
    { id: 3, title: "브랜드B", price: "35,000원", description: "힙한 컬러가 매력적인 신발", imageUrl: 'img/3.jpg', buttonText: "담기" }
    ];

  return (
    <div className="App">
      {page === 'list' && (
        <>
        <header className="header-bar">
          <div className="header-content">
            <img src="img/cart_icon.png"
            alt="장바구니"
            className='cart_icon' />
            {cartItems.length >0 && (
              <span className='cart-badge'>{cartItems.length}</span>
              )}
          </div>
        </header>

        <div className="title-area">
          <h1>신발 상품 목록</h1>
          <p>현재 {cardsData.length}개의 상품이 있습니다.</p>
        </div>

        <div className="card_container">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              price={card.price}
              imageUrl={card.imageUrl}
              buttonText={card.buttonText}
              isAdded={cartItems.includes(card.id)}
              onButtonClick={(isAdding) => handleButtonClick(card.id, isAdding)}
              onPaymentClick={handlePaymentClick}
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
    </div>
  );
}

export default App;