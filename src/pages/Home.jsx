import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cartQuantitiesState, cartTotalCountState } from '../recoil/atoms';
import Card from '../Card'; 

const BASE_URL = import.meta.env.BASE_URL;

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useRecoilValue(productsState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [cartQuantities, setCartQuantities] = useRecoilState(cartQuantitiesState);
  const totalCount = useRecoilValue(cartTotalCountState);

  const handleButtonClick = (id, isAdding) => {
    if (isAdding) {
      setCartItems(prev => [...prev, id]);
      setCartQuantities(prev => ({ ...prev, [id]: 1 }));
    } else {
      setCartItems(prev => prev.filter(itemId => itemId !== id));
      setCartQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    }
  };

  useEffect(() => {
    if (location.state?.fromCart) {
      navigate('/payment', { replace: true });
    }
  }, [location, navigate]);

  return (
   <>
      <header className="header-bar">
        <div className="header-content">
          <Link to="/cart">
            <img src={`${BASE_URL}img/cart_icon.png`} alt="장바구니" className='cart_icon' />
          </Link>
          { totalCount > 0 && <span className='cart-badge'>{totalCount}</span>}
        </div>
      </header>

      <div className="title-area">
        <h1>신발 상품 목록</h1>
        <p>현재 {products.length}개의 상품이 있습니다.</p>
      </div>

      <div className="card_container">
        {products.map((card) => (
          <div key={card.id} style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => navigate(`/product/${card.id}`)}
          >
            <Card 
              {...card} 
              isAdded={cartItems.includes(card.id)}
              onButtonClick={(isAdding) => handleButtonClick(card.id, isAdding)}
              onPaymentClick={(e) => {
                navigate('/payment');
              }} 
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;