import React from 'react';
import VirtualCard from './VirtualCard';
import './MyCardList.css'; 

const MyCardList = ({ cards, onAddCard, onBack }) => {

  const renderAddCardButton = () => (
    <button className="add-card-btn-large" onClick={onAddCard}>+</button>
  );

  return (
    <div className="card-list-wrapper">
      <div className="card-list-header">
        <h2>보유카드</h2>
        <button className="close-btn" onClick={onBack}>✕</button>
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
              const listDisplayNumber = card.cardNumber 
                ? `${card.cardNumber.slice(0, 4)} ${card.cardNumber.slice(4, 8)} •••• ••••` 
                : '0000 0000 •••• ••••';

              return (
                <div key={card.id} className="card-item">
                  <VirtualCard 
                    displayNumber={listDisplayNumber}
                    ownerName={card.ownerName || 'NAME'}
                    expiryDate={card.expiryDate || 'MM/YY'}
                  />
                  <button className="pay-btn">이 카드로 결제하기</button>
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