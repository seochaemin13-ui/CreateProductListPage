import React, { useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState, cartState, cartQuantitiesState } from '../recoil/atoms';
import './Cart.css';

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
};

const Cart = () => {
  const navigate = useNavigate();
  const products = useRecoilValue(productsState);
  const [cartItemIds/*, setCartItemIds*/] = useRecoilState(cartState);
  const [quantities, setQuantities] = useRecoilState(cartQuantitiesState);

  const handleCheckout=()=>{
    navigate('/payment');
  };

  const cartProducts = useMemo(() => {
    return products.filter(product => cartItemIds.includes(product.id));
  }, [products, cartItemIds]);

  const { totalItemsPrice, shippingFee, totalPrice } = useMemo(() => {
    const itemsPrice = cartProducts.reduce((sum, product) => {
      const price = parsePrice(product.price);
      const quantity = quantities[product.id] || 1;
      return sum + (price * quantity);
    }, 0);

    const fee = (itemsPrice >= 100000 || itemsPrice === 0) ? 0 : 3000;
    
    return {
      totalItemsPrice: itemsPrice,
      shippingFee: fee,
      totalPrice: itemsPrice + fee
    };
  }, [cartProducts, quantities]);

  const handleIncrease = useCallback((id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  }, [setQuantities]);

  const handleDecrease = useCallback((id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  }, [setQuantities]);

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

  return (
    <div className="cart-page-wrapper">
      <header className="cart-header">
        <Link to="/" className="cart-back-btn" style={{ textDecoration: 'none' }}>
          ←
        </Link>
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

            <button className="checkout-btn" onClick={handleCheckout}>
              결제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;