import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link 임포트
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cardsState, cartQuantitiesState } from '../recoil/atoms'; // 경로 수정
import Card from '../Card'; 
import MyCardList from '../MyCardList';
import AddCardForm from '../AddCardForm';

function Home() {
  const location=useLocation();
  const [page, setPage] = useState('list');
  const products = useRecoilValue(productsState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [cards, setCards] = useRecoilState(cardsState);
  const [cartQuantities, setCartQuantities] = useRecoilState(cartQuantitiesState);

  useEffect(()=> {
    if (location.state?.fromCart){
        setPage('payment');
    }
  },[location]);
  
  const handleButtonClick = (id, isAdding) => {
    if (isAdding) {
      setCartItems(prev => [...prev, id]);
    } else {
      setCartItems(prev => prev.filter(itemId => itemId !== id));
      setCartQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
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
   <>
      {page === 'list' && (
        <>
          <header className="header-bar">
            <div className="header-content">
              <Link to="/cart">
                <img src="img/cart_icon.png" alt="장바구니" className='cart_icon' />
              </Link>
              {cartItems.length > 0 && <span className='cart-badge'>{cartItems.length}</span>}
            </div>
          </header>

          <div className="title-area">
            <h1>신발 상품 목록</h1>
            <p>현재 {products.length}개의 상품이 있습니다.</p>
          </div>

          <div className="card_container">
            {products.map((card) => (
              <div key={card.id} style={{position: 'relative'}}>
                <Link to={`/product/${card.id}`} style={{textDecoration: 'none', color:'inherit'}}>
                  <Card 
                    {...card} 
                    isAdded={cartItems.includes(card.id)}
                    onButtonClick={(isAdding) => handleButtonClick(card.id, isAdding)}
                    onPaymentClick={(e) => {
                      e.preventDefault();
                      setPage('payment');
                    }} 
                  />
                </Link>
              </div>
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
        <AddCardForm onSubmit={handleAddCardSubmit} onBack={() => setPage('payment')} />
      )}
    </>
  );
}

export default Home;