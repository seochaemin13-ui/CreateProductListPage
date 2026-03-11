import { atom } from 'recoil';

export const productsState = atom({
  key: 'productsState',
  default: [],
});

export const cartState = atom({
  key: 'cartState',
  default: JSON.parse(localStorage.getItem('cartItems')) || [],
});

export const cardsState = atom({
  key: 'cardsState',
  default: JSON.parse(localStorage.getItem('myCards')) || [],
});

export const cartQuantitiesState = atom({
  key: 'cartQuantitiesState',
  default: JSON.parse(localStorage.getItem('cartQuantities')) || {}
});