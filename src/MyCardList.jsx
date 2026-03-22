import React from 'react';
import VirtualCard from './VirtualCard';
import { decryptData } from './cryptoUtils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { productsState, cardsState, cartState, cartQuantitiesState, cartTotalCountState, cartPriceSummaryState } from './recoil/atoms';
import './MyCardList.css'; 

const MyCardList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const directItem = location.state?.directItem;
  const products = useRecoilValue(productsState);
  const [cards, setCards] = useRecoilState(cardsState);
  const totalCount = useRecoilValue(cartTotalCountState);
  const {totalPrice} = useRecoilValue(cartPriceSummaryState);
  const setCartItems = useSetRecoilState(cartState);
  const SetCartQuantities = useSetRecoilState(cartQuantitiesState);


  const calculateDirectPrice = () => {
    if (!directItem) return 0;
    const product = products.find(p => p.id === directItem.id);
    const price = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 0;
    const shippingFee = price >= 100000 ? 0 : 3000;
    return price + shippingFee;
  };

  const finalPayCount = directItem ? directItem.quantity : totalCount;
  const finalPayPrice = directItem ? calculateDirectPrice() : totalPrice;

  const handlePay = () => {
    if (window.confirm("결제를 진행하시겠습니까?")) {
      navigate('/payment-success', { 
        state: { count:finalPayCount, price: finalPayPrice } 
      });
      if (!directItem) {
        setCartItems([]);
        setCartQuantities({});
      }
    }
  };

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
                  <button className="pay-btn" onClick={handlePay}>
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