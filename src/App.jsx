import React, {useState} from 'react';
import Card from './Card';
import './App.css';

function App() {
  const [cartCount, setCartCount] =useState(0);

  const handleButtonClick = (id) => {
    console.log(`장바구니에 ${id}이 담겼습니다.`);
    setCartCount(prevCount => prevCount +1);
  };

  const cardsData = [
    { id: 1, title: "브랜드A", price: "35,000원", description: "편안하고 착용감이 좋은 신발", imageUrl: 'img/1.jpg', buttonText: "담기" },
    { id: 2, title: "브랜드A", price: "25,000원", description: "힙한 컬러가 매력적인 신발", imageUrl: 'img/2.jpg', buttonText: "담기" },
    { id: 3, title: "브랜드B", price: "35,000원", description: "힙한 컬러가 매력적인 신발", imageUrl: 'img/3.jpg', buttonText: "담기" }
    ];

  return (
    <div className="App">{}

      <header className="header-bar">
        <div className="header-content">
          <img src="/img/cart_icon.png"
          alt="장바구니"
          className='cart_icon'></img>
          {cartCount>0 && (
            <span className='cart-badge'>{cartCount}</span>
            )}
        </div>
      </header>

      <div className="title-area">
        <h1>신발 상품 목록</h1>
        <p>현재 {cardsData.length}개의 상품이 있습니다.</p>
      </div>{}

      <div className="card_container">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            price={card.price}
            imageUrl={card.imageUrl}
            buttonText={card.buttonText}
            onButtonClick={() => handleButtonClick(card.id)}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;