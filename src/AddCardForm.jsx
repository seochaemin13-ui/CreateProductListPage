import React, { useState } from 'react';
import './AddCardForm.css';

const AddCardForm = ({ onSubmit, onBack }) => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '', expiryDate: '', ownerName: '', cvc: '', password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const nums = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = nums.replace(/(\d{4})(?=\d)/g, '$1-');
    } else if (name === 'expiryDate') {
      const nums = value.replace(/\D/g, '').slice(0, 4);
      formattedValue = nums.length >= 2 ? `${nums.slice(0, 2)} / ${nums.slice(2)}` : nums;
    } else if (name === 'ownerName') {
      formattedValue = value.slice(0, 20).toUpperCase();
    } else if (name === 'cvc' || name === 'password') {
       formattedValue = value.replace(/\D/g, '');
    }

    setCardInfo({ ...cardInfo, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if(cardInfo.cardNumber.length < 19) return alert("카드 번호를 확인해주세요.");
    onSubmit(cardInfo);
  };

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: 0 }}
        >
          &lt; 카드 추가
        </button>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: 0 }}
        >
          ✕
        </button>
      </div>

      {/* 가상 카드 뷰 */}
      <div className="virtual-card">
        <div className="card-chip"></div>
        <div className="card-number-display">
          {cardInfo.cardNumber || ''}
        </div>
        <div className="card-details">
          <span>{cardInfo.ownerName || 'NAME'}</span>
          <span>{cardInfo.expiryDate || 'MM / YY'}</span>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="input-group">
        <label>카드 번호</label>
        <input name="cardNumber" value={cardInfo.cardNumber} onChange={handleChange} placeholder="" />
      </div>
      <div className="input-group">
        <label>만료일</label>
        <input name="expiryDate" value={cardInfo.expiryDate} onChange={handleChange} placeholder="MM / YY" />
      </div>
      <div className="input-group">
        <label>카드 소유자 이름</label>
        <input name="ownerName" value={cardInfo.ownerName} onChange={handleChange} placeholder="카드에 표시된 이름과 동일하게 입력하세요." />
      </div>
      <div style={{display:'flex', gap:'10px'}}>
        <div className="input-group" style={{flex:1}}>
          <label>보안 코드(CVC/CVV)</label>
          <input type="password" name="cvc" value={cardInfo.cvc} onChange={handleChange} maxLength={3} placeholder="" />
        </div>
        <div className="input-group" style={{flex:1}}>
          <label>카드 비밀번호</label>
          <input type="password" name="password" value={cardInfo.password} onChange={handleChange} maxLength={2} placeholder="" />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>작성 완료</button>
    </div>
  );
};

export default AddCardForm;