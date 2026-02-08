import React from 'react';
import Card from './Card';

function App() {
  const handleButtonClick = (title) => {
    alert(`장바구니에 상품이 담겼습니다.`);
  };

  const cardsData = [
    { id: 1, title: "브랜드A", price: "35,000원", description: "편안하고 착용감이 좋은 신발", imageUrl: 'img/1.jpg', buttonText: "담기" },
    ];

  return (
    <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        padding: '20px' 
    }}>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          price={card.price}
          imageUrl={card.imageUrl}
          buttonText={card.buttonText}
          onButtonClick={() => handleButtonClick(card.title)}
        />
      ))}
    </div>
  );
}

export default App;