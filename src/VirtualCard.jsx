import React from 'react';
import './AddCardForm.css';

const VirtualCard = ({ displayNumber, ownerName, expiryDate }) => {
  return (
    <div className="virtual-card">
      <div className="card-chip"></div>
      <div className="card-number-display">{displayNumber}</div>
      <div className="card-details">
        <span className="card-details-name">{ownerName}</span>
        <span className="card-details-date">{expiryDate}</span>
      </div>
    </div>
  );
};

export default VirtualCard;