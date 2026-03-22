import React from 'react';
import VirtualCard from './VirtualCard';
import { decryptData } from './cryptoUtils';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cardsState } from './recoil/atoms';
import './MyCardList.css'; 

const MyCardList = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useRecoilState(cardsState);

  const handleDeleteCard = (cardId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const renderAddCardButton = () => (
    <button className="add-card-btn-large" onClick={() => navigate('/add-card')}>+</button>
  );

  return (
    <div className="card-list-wrapper">
      <div className="card-list-header">
        <h2>보유카드</h2>
        <button className="close-btn" onClick={() => navigate('/')}>✕</button>
      </div>

      <div className="card-list-content">
        {cards.length === 0 ? (
          <div className="empty-state">
            <p>새로운 카드를 등록해주세요.</p>
            {renderAddCardButton()}
          </div>
        ) : (
          <div className="card-list">
            {cards.map((card) => {
              const decryptedNumber = decryptData(card.cardNumber);
              const listDisplayNumber = decryptedNumber 
                ? `${decryptedNumber.slice(0, 4)} ${decryptedNumber.slice(4, 8)} •••• ••••` 
                : '0000 0000 •••• ••••';

              return (
                <div key={card.id} className="card-item">
                  <VirtualCard 
                    displayNumber={listDisplayNumber}
                    ownerName={card.ownerName || 'NAME'}
                    expiryDate={card.expiryDate || 'MM/YY'}
                    showDelete={true} 
                    onDelete={() => handleDeleteCard(card.id)}
                  />
                  <button className="pay-btn" onClick={() => alert('결제가 진행됩니다.')}>
                    이 카드로 결제하기
                  </button>
                </div>
              );
            })}
            {renderAddCardButton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCardList;