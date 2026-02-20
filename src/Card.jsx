import React, {useState} from 'react';
import './Card.css';

const Card = ({ title, price, description, imageUrl, buttonText, onButtonClick, onPaymentClick }) => {
 
  const[isAdded, setIsAdded]=useState(false);

  const handleButtonClick=()=>{
    if(!isAdded) {
      setIsAdded(true);
      if (onButtonClick){
        onButtonClick();
      }
    }
  }
 
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>

        {/* 버튼 그룹 추가 */}
        <div className="button-group">
          {buttonText && (
            <button
              className={`card-button ${isAdded ? "added" : ""}`}
              onClick={handleButtonClick}
            >
              {isAdded ? '담김!' : buttonText}
            </button>
          )}
          {/* 결제 버튼 추가 */}
          <button className="card-button payment" onClick={onPaymentClick}>
            구매
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;