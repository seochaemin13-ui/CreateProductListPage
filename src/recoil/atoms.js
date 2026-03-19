import { atom } from 'recoil';

export const productsState = atom({
  key: 'productsState',
  default: [{ 
      id: 1, 
      title: "브랜드A", 
      price: "35,000원", 
      description: "편안하고 착용감이 좋은 신발", 
      imageUrl: 'img/1.jpg', 
      buttonText: "담기" 
    },
    { 
      id: 2, 
      title: "브랜드A", 
      price: "25,000원", 
      description: "힙한 컬러가 매력적인 신발", 
      imageUrl: 'img/2.jpg', 
      buttonText: "담기" 
    },
    { 
      id: 3, 
      title: "브랜드B", 
      price: "35,000원", 
      description: "힙한 컬러가 매력적인 신발", 
      imageUrl: 'img/3.jpg', 
      buttonText: "담기" 
    }],
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