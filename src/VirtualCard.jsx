import React from 'react';
import './AddCardForm.css';

const VirtualCard = ({ displayNumber, ownerName, expiryDate, showDelete, onDelete }) => {
  return (
    <div className="virtual-card" style={{ position: 'relative' }}>
      {showDelete && (
        <button 
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          ✕
        </button>
      )}
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