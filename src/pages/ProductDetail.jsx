import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cartQuantitiesState, cartTotalCountState } from '../recoil/atoms';
import './ProductDetail.css';

const BASE_URL = import.meta.env.BASE_URL;

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useRecoilValue(productsState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [cartQuantities, setCartQuantities] = useRecoilState(cartQuantitiesState);
  const totalCount = useRecoilValue(cartTotalCountState);
  const product = products.find(p => p.id === parseInt(productId));
  const [localQuantity, setLocalQuantity] = useState(1);
  const relatedProducts = products.filter(p => 
      p.title === product?.title && p.id !== product?.id
    );

  if (!product) {
    return (
      <div className="detail-container">
        <h2>상품을 찾을 수 없습니다.</h2>
        <Link to="/">메인으로 돌아가기</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!cartItems.includes(product.id)) {
      setCartItems(prev => [...prev, product.id]);
    }
    setCartQuantities(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + localQuantity
    }));
  };

  return (
    <div className="detail-container">
      <header className="header-bar detail-header-flex">
        <button onClick={() => navigate(-1)} className="back-arrow">←</button>
        
        <div className="header-content">
          <Link to="/cart">
            <img 
              src={`${BASE_URL}img/cart_icon.png`} 
              alt="장바구니" 
              className="cart_icon" 
            />
          </Link>
          {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
        </div>
      </header>

      <main className="detail-main">
        <div className="main-img-wrapper">
          <img src={`${BASE_URL}${product.imageUrl}`} alt={product.title} className="main-img" />
        </div>

        <div className="product-info-section">
          <div className="info-header">
            <div>
              <h1 className="detail-title">{product.title}</h1>
              <p className="detail-desc">{product.description}</p>
            </div>
            <div className="qty-picker">
              <button onClick={() => setLocalQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{localQuantity.toString().padStart(2, '0')}</span>
              <button onClick={() => setLocalQuantity(q => q + 1)}>+</button>
            </div>
          </div>
          <h2 className="detail-price">{product.price}</h2>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>장바구니 담기</button>

        <section className="related-section">
          <h3>관련 상품</h3>
          <p className="related-sub">{product.title}의 다른 신발은 어떠신가요?</p>
          <div className="related-list">
            {relatedProducts.map(rp => (
              <Link key={rp.id} to={`/product/${rp.id}`} className="related-item">
                <img src={`${BASE_URL}${rp.imageUrl}`} alt={rp.title} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;