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
       formattedValue = value.replace(/\D/g, ''); // 숫자만
    }

    setCardInfo({ ...cardInfo, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if(cardInfo.cardNumber.length < 19) return alert("카드 번호를 확인해주세요.");
    onSubmit(cardInfo);
  };

  return (
    <div className="form-container">
      <button className="back-btn" onClick={onBack}>← 뒤로가기</button>
      <h2>카드 정보를 입력해주세요</h2>

      {/* 가상 카드 뷰 */}
      <div className="virtual-card">
        <div className="card-chip"></div>
        <div className="card-number-display">
          {cardInfo.cardNumber || '0000-0000-0000-0000'}
        </div>
        <div className="card-details">
          <span>{cardInfo.ownerName || 'NAME'}</span>
          <span>{cardInfo.expiryDate || 'MM / YY'}</span>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="input-group">
        <label>카드 번호</label>
        <input name="cardNumber" value={cardInfo.cardNumber} onChange={handleChange} placeholder="0000-0000-0000-0000" />
      </div>
      <div className="input-group">
        <label>만료일</label>
        <input name="expiryDate" value={cardInfo.expiryDate} onChange={handleChange} placeholder="MM / YY" />
      </div>
      <div className="input-group">
        <label>이름</label>
        <input name="ownerName" value={cardInfo.ownerName} onChange={handleChange} placeholder="SOOJIN KIM" />
      </div>
      <div style={{display:'flex', gap:'10px'}}>
        <div className="input-group" style={{flex:1}}>
          <label>CVC</label>
          <input type="password" name="cvc" value={cardInfo.cvc} onChange={handleChange} maxLength={3} placeholder="***" />
        </div>
        <div className="input-group" style={{flex:1}}>
          <label>비번(앞2자리)</label>
          <input type="password" name="password" value={cardInfo.password} onChange={handleChange} maxLength={2} placeholder="●●" />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>카드 등록 완료</button>
    </div>
  );
};

export default AddCardForm;