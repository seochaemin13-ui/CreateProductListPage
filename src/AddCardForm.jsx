import React, { useState, useRef, useEffect } from 'react';
import './AddCardForm.css';

const AddCardForm = ({ onSubmit, onBack }) => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '', expiryDate: '', ownerName: '', cvc: '', password: ''
  });

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const c1 = cardInfo.cardNumber.slice(0, 4);
  const c2 = cardInfo.cardNumber.slice(4, 8);
  const c3 = cardInfo.cardNumber.slice(8, 12);
  const c4 = cardInfo.cardNumber.slice(12, 16);

  const pwdRef1 = useRef(null);
  const pwdRef2 = useRef(null);

  const p1 = cardInfo.password[0] || '';
  const p2 = cardInfo.password[1] || '';

  useEffect(() => {
    if (c1.length === 4 && c2.length === 0) inputRef2.current?.focus();
    else if (c2.length === 4 && c3.length === 0) inputRef3.current?.focus();
    else if (c3.length === 4 && c4.length === 0) inputRef4.current?.focus();
  }, [c1.length, c2.length, c3.length, c4.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'expiryDate') {
      const nums = value.replace(/\D/g, '').slice(0, 4);
      formattedValue = nums.length >= 2 ? `${nums.slice(0, 2)} / ${nums.slice(2)}` : nums;
    } else if (name === 'ownerName') {
      formattedValue = value.slice(0, 30).toUpperCase();
    } else if (name === 'cvc' || name === 'password') {
       formattedValue = value.replace(/\D/g, '');
    }
    setCardInfo({ ...cardInfo, [name]: formattedValue });
  };

  const handleCardNumberChange = (e, chunkIndex) => {
    const val = e.target.value.replace(/\D/g, '');
    const chunks = [c1, c2, c3, c4];
    chunks[chunkIndex] = val;
    setCardInfo({ ...cardInfo, cardNumber: chunks.join('') });
  };

  const handleKeyDown = (e, chunkIndex) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      if (chunkIndex === 1) inputRef1.current?.focus();
      if (chunkIndex === 2) inputRef2.current?.focus();
      if (chunkIndex === 3) inputRef3.current?.focus();
    }
  };

  const handleContainerClick = () => {
    if (c1.length < 4) inputRef1.current?.focus();
    else if (c2.length < 4) inputRef2.current?.focus();
    else if (c3.length < 4) inputRef3.current?.focus();
    else inputRef4.current?.focus();
  };

  const handleSubmit = () => {
    onSubmit(cardInfo);
  };

  const showC2 = c1.length === 4 || c2.length > 0;
  const showC3 = c2.length === 4 || c3.length > 0;
  const showC4 = c3.length === 4 || c4.length > 0;

  const isFormValid = 
    cardInfo.cardNumber.length === 16 &&
    cardInfo.expiryDate.length === 7 && // "MM / YY" 형태면 총 7글자
    cardInfo.ownerName.trim().length > 0 &&
    cardInfo.cvc.length === 3 &&
    cardInfo.password.length === 2;

  const handlePasswordChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ''); // 숫자만 입력
    const chars = [p1, p2];
    chars[index] = val;
    setCardInfo({ ...cardInfo, password: chars.join('') });

    if (val !== '' && index === 0) pwdRef2.current?.focus();
  };

  const handlePasswordKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      if (index === 1) pwdRef1.current?.focus();
    }
  };


  return (
    <div className="form-container">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <button 
          onClick={onBack} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: 0
        }}>
          &lt; 카드 추가
        </button>

        <button 
          onClick={onBack} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: 0
        }}>
          ✕
        </button>
      </div>

      <div className="virtual-card">
        <div className="card-chip"></div>
        <div className="card-number-display">
          {[c1, c2, c3.replace(/./g, '•'), c4.replace(/./g, '•')].filter(Boolean).join(' ')}
        </div>
        <div className="card-details">
          <span className="card-details-name">{cardInfo.ownerName || 'NAME'}</span>
          <span className="card-details-date">{cardInfo.expiryDate || 'MM / YY'}</span>
        </div>
      </div>

      <div className="input-group">
        <label>카드 번호</label>
        <div className="card-input-container" onClick={handleContainerClick}>
          <input 
            ref={inputRef1}
            type="text"
            maxLength={4} 
            value={c1}
            onChange={(e) => handleCardNumberChange(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            className="card-input-chunk" 
          />
          
          {showC2 && (
            <>
              <span>-</span>
              <input 
                ref={inputRef2}
                type="text"
                maxLength={4} 
                value={c2}
                onChange={(e) => handleCardNumberChange(e, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className="card-input-chunk" 
              />
            </>
          )}

          {showC3 && (
            <>
              <span>-</span>
              <input 
                ref={inputRef3}
                type="password"
                maxLength={4} 
                value={c3}
                onChange={(e) => handleCardNumberChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className="card-input-chunk" 
              />
            </>
          )}

          {showC4 && (
            <>
              <span>-</span>
              <input 
                ref={inputRef4}
                type="password"
                maxLength={4} 
                value={c4}
                onChange={(e) => handleCardNumberChange(e, 3)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                className="card-input-chunk" 
              />
            </>
          )}
        </div>
      </div>
      <div className="input-group">
        <label>만료일</label>
        <input className="short-input" name="expiryDate" value={cardInfo.expiryDate} onChange={handleChange} placeholder="MM / YY" />
      </div>
      <div className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <label style={{ marginBottom: 0 }}>카드 소유자 이름</label>
          <span style={{ fontSize: '15px', color: '#000000' }}>
            {cardInfo.ownerName.length}/30
          </span>
        </div>
        <input 
          name="ownerName" 
          value={cardInfo.ownerName} 
          onChange={handleChange} 
          maxLength={30}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요." 
        />
      </div>

      <div className="input-group">
          <label>보안 코드(CVC/CVV)</label>
          <input className="shortest-input" type="password" name="cvc" value={cardInfo.cvc} onChange={handleChange} maxLength={3} placeholder="" />
      </div>
      <div className="input-group">
          <label>카드 비밀번호</label>
          <div className="password-input-container">
          <input 
            ref={pwdRef1}
            type="password"
            maxLength={1} 
            value={p1}
            onChange={(e) => handlePasswordChange(e, 0)}
            onKeyDown={(e) => handlePasswordKeyDown(e, 0)}
            className="password-box" 
          />
          <input 
            ref={pwdRef2}
            type="password"
            maxLength={1} 
            value={p2}
            onChange={(e) => handlePasswordChange(e, 1)}
            onKeyDown={(e) => handlePasswordKeyDown(e, 1)}
            className="password-box" 
          />
          <span className="password-dot">•</span>
          <span className="password-dot">•</span>
        </div>
      </div>

      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={!isFormValid}
      >
        작성 완료
      </button>
    </div>
  );
};

export default AddCardForm;