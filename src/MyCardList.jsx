import React from 'react';

const MyCardList = ({ cards, onAddCard, onBack }) => {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '0 auto',
      background: 'white',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      
      {/* 헤더: 보유카드 (좌) / X (우) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        paddingTop: '10px'
      }}>
        <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 'normal' }}>보유카드</h2>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '0' }}
        >
          ✕
        </button>
      </div>

      {cards.length === 0 ? (
        /* 카드가 없을 때 (Empty State) */
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ marginBottom: '15px', fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
            새로운 카드를 등록해주세요.
          </p>
          <button 
            onClick={onAddCard}
            style={{ 
              width: '90%', 
              height: '200px', 
              background: '#e5e5e5', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '40px',
              color: '#666',
              margin: '0 auto'
            }}
          >
            +
          </button>
        </div>
      ) : (
        /* 카드가 있을 때 목록 표시 */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {cards.map((card) => (
            <div key={card.id}>
              {/* 카드 디자인 */}
              <div style={{ 
                width: '90%',
                height: '200px',
                margin: '0 auto 25px auto',
                background: '#333', 
                color: 'white', 
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.37)',
                position: 'relative',
              }}>
                <div style={{ 
                  width: '50px',
                  height: '35px',
                  background: '#cbba64',
                  borderRadius: '4px',
                  position: 'absolute',
                  top: '35%',
                  left: '13%',
                  transform: 'translateX(-50%)'
                }}></div>
                
                <div style={{ 
                  fontSize: '20px',
                  letterSpacing: '3px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'absolute',
                  top: '68%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%'
                  }}>
                  {card.cardNumber ? `${card.cardNumber.slice(0, 4)} ${card.cardNumber.slice(5, 9)} •••• ••••` : '0000 0000 •••• ••••'}
                </div>

                <div style={{
                  position: 'absolute', 
                  bottom: '20px', 
                  left: '0',
                  width: '100%', 
                  padding: '0 25px', 
                  boxSizing: 'border-box',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '18px'
                  }}>
                  <span>{card.ownerName || 'NAME'}</span>
                  <span>{card.expiryDate || 'MM/YY'}</span>
                </div>
              </div>

              <button style={{ 
                display: 'block',
                width: '90%',
                margin: '0 auto',
                padding: '10px',
                background: '#fcf576',
                color: 'black',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                이 카드로 결제하기
              </button>
            </div>
          ))}
          
          {/* 하단 추가 버튼 */}
          <button 
            onClick={onAddCard}
            style={{ 
              width: '90%',
              height: '200px', 
              background: '#e5e5e5', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '40px',
              color: '#666',
              margin: '30px auto 15px auto'
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCardList;