import React, {useState} from 'react';
import './Card.css';

const Card = ({ title, price, description, imageUrl, buttonText, onButtonClick }) => {
 
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

        {buttonText && (
          <button className={`card-button ${isAdded ? "added":""}`}
          onClick={handleButtonClick}>
            {isAdded ? '담김!' : buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;