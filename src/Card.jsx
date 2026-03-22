import React from 'react';
import './Card.css';

const Card = ({ title, price, description, imageUrl, buttonText, onButtonClick, onPaymentClick, isAdded }) => {

  const handleButtonClick = (e) =>{
    e.stopPropagation();
    
    const nextIsAdding = !isAdded; 
    onButtonClick(nextIsAdding); 
  };

  const handlePaymentClick = (e) => {
    e.stopPropagation();
    onPaymentClick(e);
  };
 
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>

        <div className="button-group">
          {buttonText && (
            <button
              className={`card-button ${isAdded ? "added" : ""}`}
              onClick={handleButtonClick}
              type="button"
            >
              {isAdded ? '담김!' : buttonText}
            </button>
          )}
          <button
            className="card-button payment"
            onClick={handlePaymentClick}
            type="button"
          >
            구매
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;