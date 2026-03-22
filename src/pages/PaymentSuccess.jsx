import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { count, price } = location.state || { count: 0, price: 0 };

  return (
    <div className="success-container">
      <header className="header-bar"></header>
      
      <main className="success-content">
        <h1 className="success-title">결제 완료!</h1>
        <p className="success-sub">총 {count}개의 상품을 구매하셨습니다.</p>
        
        <div className="price-info">
          <span className="price-label">총 결제 금액</span>
          <strong className="price-value">{price.toLocaleString()}원</strong>
        </div>

        <button className="home-btn" onClick={() => navigate('/')}>
          상품 목록 보기
        </button>
      </main>
    </div>
  );
};

export default PaymentSuccess;