import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { productsState } from '../recoil/atoms';
import '../App.css';

function ProductDetail() {
  const { productId } = useParams();
  const products = useRecoilValue(productsState);

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="app">
        <h2>상품을 찾을 수 없습니다.</h2>
        <Link to="/">메인으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="app" style={{ textAlign: 'left', padding: '20px' }}>
      <header className="cart-header" style={{ marginBottom: '20px', background: 'black', padding: '10px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>←</Link>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }} 
        />
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>{product.title}</h1>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>{product.description}</p>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{product.price}</h2>
        
        <div style={{ marginTop: '40px' }}>
          <Link to="/" className="checkout-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;