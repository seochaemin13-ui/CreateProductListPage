import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cartQuantitiesState } from './recoil/atoms';
import './Cart.css';

const Cart = ({ onBack, onCheckout }) => {
  const products = useRecoilValue(productsState);
  const [cartItemIds, setCartItemIds] = useRecoilState(cartState);
  const cartProducts = products.filter(product => cartItemIds.includes(product.id));
  const [quantities, setQuantities] = useRecoilState(cartQuantitiesState);

  useEffect(() => {
    let isChanged = false;
    const newQs = { ...quantities };

    cartItemIds.forEach(id => {
      if (newQs[id] === undefined) {
        newQs[id] = 1;
        isChanged = true;
      }
    });

    if (isChanged) setQuantities(newQs);
  }, [cartItemIds, setQuantities, quantities]);

  const handleIncrease = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const totalItemsPrice = cartProducts.reduce((sum, product) => {
    const price = parsePrice(product.price);
    const quantity = quantities[product.id] || 1;
    return sum + (price * quantity);
  }, 0);

  const shippingFee = (totalItemsPrice >= 100000 || totalItemsPrice === 0) ? 0 : 3000;
  const totalPrice = totalItemsPrice + shippingFee;

  return (
    <div className="cart-page-wrapper">
      <header className="cart-header">
        <button className="cart-back-btn" onClick={onBack}>←</button>
      </header>

      <div className="cart-content">
        <div className="cart-title-area">
          <h2>장바구니</h2>
          <p>현재 {cartProducts.length}개의 상품이 담겨있습니다.</p>
        </div>

        <div className="cart-item-list">
          {cartProducts.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.imageUrl} alt={product.title} className="cart-item-image" />
              
              <div className="cart-item-info">
                <span className="cart-item-brand">{product.title}</span>
                <span className="cart-item-price">
                  {parsePrice(product.price).toLocaleString()}원
                </span>
                
                <div className="quantity-control">
                  <button onClick={() => handleDecrease(product.id)}>−</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => handleIncrease(product.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartProducts.length > 0 && (
          <>
            <div className="cart-summary">
              <div className="summary-row">
                <span>상품 금액</span>
                <span className="summary-price">{totalItemsPrice.toLocaleString()}원</span>
              </div>
              <div className="summary-row">
                <span>배송비</span>
                <span className="summary-price">{shippingFee.toLocaleString()}원</span>
              </div>
            </div>

            <div className="cart-total">
              <span>총 금액</span>
              <span className="total-price">{totalPrice.toLocaleString()}원</span>
            </div>

            <button className="checkout-btn" onClick={onCheckout}>
              결제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;