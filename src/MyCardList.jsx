import React from 'react';

const MyCardList = ({ cards, onAddCard, onBack }) => {
  return (
    <div style={{ padding: '20px 4%', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', fontSize:'16px', cursor:'pointer', marginBottom:'20px' }}>
        ← 상품 목록으로
      </button>
      
      <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>보유 카드 목록</h2>

      {cards.length === 0 ? (
        <div style={{ 
          border: '2px dashed #ddd', borderRadius: '12px', padding: '40px', 
          textAlign: 'center', color: '#888', marginTop: '20px' 
        }}>
          <p style={{marginBottom: '10px'}}>등록된 카드가 없습니다.</p>
          <button 
            onClick={onAddCard}
            style={{ 
              padding: '10px 20px', background: 'black', color: 'white', 
              border: 'none', borderRadius: '8px', cursor: 'pointer' 
            }}
          >
            + 카드 추가하기
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cards.map((card) => (
            <div key={card.id} style={{ 
              background: '#333', color: 'white', padding: '20px', borderRadius: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{textAlign:'left'}}>
                <div style={{fontSize:'12px', opacity:0.7}}>{card.ownerName || 'NAME'}</div>
                <div style={{fontSize:'18px', letterSpacing:'1px', marginTop:'4px'}}>
                  {card.cardNumber.slice(0, 9)} ●●●● ●●●●
                </div>
              </div>
              <button style={{ 
                padding: '8px 16px', background: 'white', color: 'black', 
                border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor:'pointer' 
              }}>
                결제
              </button>
            </div>
          ))}
          
          <button 
            onClick={onAddCard}
            style={{ 
              width: '100%', padding: '15px', background: '#f1f1f1', 
              border: 'none', borderRadius: '12px', fontWeight: 'bold', 
              cursor: 'pointer', marginTop: '10px' 
            }}
          >
            + 새 카드 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCardList;