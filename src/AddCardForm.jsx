import React, { useState, useRef } from 'react';
import VirtualCard from './VirtualCard';
import './AddCardForm.css';

const AddCardForm = ({ onSubmit, onBack }) => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: ['', '', '', ''], 
    expiryDate: '', 
    ownerName: '', 
    cvc: '', 
    password: ['', '']
  });

  const inputRefs = useRef([]);
  const pwdRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'expiryDate') {
      const nums = value.replace(/\D/g, '').slice(0, 4);
      formattedValue = nums.length >= 2 ? `${nums.slice(0, 2)} / ${nums.slice(2)}` : nums;
    } else if (name === 'ownerName') {
      formattedValue = value.slice(0, 30).toUpperCase();
    } else if (name === 'cvc') {
       formattedValue = value.replace(/\D/g, '');
    }
    setCardInfo({ ...cardInfo, [name]: formattedValue });
  };

  const handleCardNumberChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) return;
    
    const newChunks = [...cardInfo.cardNumber];
    newChunks[index] = val;
    setCardInfo({ ...cardInfo, cardNumber: newChunks });

    if (val.length === 4 && index < 3) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handlePasswordChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 1) return;

    const newPwd = [...cardInfo.password];
    newPwd[index] = val;
    setCardInfo({ ...cardInfo, password: newPwd });

    if (val !== '' && index === 0) {
      pwdRefs.current[1]?.focus();
    }
  };

  const handleKeyDown = (e, index, refs) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleFocusToEnd = (e) => {
    e.stopPropagation(); 
    
    const len = e.target.value.length;
    setTimeout(() => {
      e.target.setSelectionRange(len, len);
    }, 0);
  };

  const handleContainerClick = (e) => {
    if (e.target !== e.currentTarget) return;

    const firstEmptyIndex = cardInfo.cardNumber.findIndex(chunk => chunk.length < 4);
    const focusIndex = firstEmptyIndex === -1 ? 3 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = () => {
    onSubmit({
      ...cardInfo,
      cardNumber: cardInfo.cardNumber.join(''),
      password: cardInfo.password.join('')
    });
  };

  const formDisplayNumber = [
    cardInfo.cardNumber[0], 
    cardInfo.cardNumber[1], 
    cardInfo.cardNumber[2].replace(/./g, '•'), 
    cardInfo.cardNumber[3].replace(/./g, '•')
  ].filter(c => c.length > 0).join(' ');

  const isFormValid = 
    cardInfo.cardNumber.join('').length === 16 &&
    cardInfo.expiryDate.length === 7 && 
    cardInfo.ownerName.trim().length > 0 &&
    cardInfo.cvc.length === 3 &&
    cardInfo.password.join('').length === 2;

  return (
    <div className="page-wrapper">
      <header className="clean-header">
        <button className="clean-header-btn" style={{ fontSize: '18px' }} onClick={onBack}>
          &lt; 카드 추가
        </button>
        <button className="clean-header-btn" onClick={onBack}>
          ✕
        </button>
      </header>

      <div className="form-container">
        <VirtualCard 
          displayNumber={formDisplayNumber}
          ownerName={cardInfo.ownerName || 'NAME'}
          expiryDate={cardInfo.expiryDate || 'MM / YY'}
        />

        <div className="input-group">
          <label>카드 번호</label>
          <div className="card-input-container" onClick={handleContainerClick}>
            {cardInfo.cardNumber.map((chunk, index) => {
              const isVisible = index === 0 || cardInfo.cardNumber[index - 1].length === 4 || chunk.length > 0;
              if (!isVisible) return null;

              return (
                <React.Fragment key={`chunk-${index}`}>
                  {index > 0 && <span>-</span>}
                  <input
                    ref={el => inputRefs.current[index] = el}
                    type={index >= 2 ? "password" : "text"}
                    maxLength={4}
                    value={chunk}
                    onChange={(e) => handleCardNumberChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index, inputRefs)}
                    onFocus={handleFocusToEnd}
                    onClick={handleFocusToEnd}
                    className="card-input-chunk"
                  />
                </React.Fragment>
              );
            })}
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
          <input name="ownerName" value={cardInfo.ownerName} onChange={handleChange} maxLength={30} placeholder="카드에 표시된 이름과 동일하게 입력하세요." />
        </div>

        <div className="input-group">
            <label>보안 코드(CVC/CVV)</label>
            <input className="shortest-input" type="password" name="cvc" value={cardInfo.cvc} onChange={handleChange} maxLength={3} placeholder="" />
        </div>

        <div className="input-group">
            <label>카드 비밀번호</label>
            <div className="password-input-container">
              {cardInfo.password.map((pwd, index) => (
                <input
                  key={`pwd-${index}`}
                  ref={el => pwdRefs.current[index] = el}
                  type="password"
                  maxLength={1}
                  value={pwd}
                  onChange={(e) => handlePasswordChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index, pwdRefs)}
                  className="password-box"
                />
              ))}
              <span className="password-dot">•</span>
              <span className="password-dot">•</span>
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={!isFormValid}>
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;