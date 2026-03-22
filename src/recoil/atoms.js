import { atom, selector } from 'recoil';

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
};

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

export const cartTotalCountState = selector({
  key: 'cartTotalCountState',
  get: ({ get }) => {
    const cartItemIds = get(cartState);
    const quantities = get(cartQuantitiesState);
    return cartItemIds.reduce((acc, id) => acc + (quantities[id] || 1), 0);
  },
});

export const cartPriceSummaryState = selector({
  key: 'cartPriceSummaryState',
  get: ({ get }) => {
    const products = get(productsState);
    const cartItemIds = get(cartState);
    const quantities = get(cartQuantitiesState);

    const itemsPrice = products
      .filter(p => cartItemIds.includes(p.id))
      .reduce((sum, p) => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ''), 10) || 0;
        return sum + (price * (quantities[p.id] || 1));
      }, 0);

    const shippingFee = (itemsPrice >= 100000 || itemsPrice === 0) ? 0 : 3000;
    
    return {
      totalItemsPrice: itemsPrice,
      shippingFee: shippingFee,
      totalPrice: itemsPrice + shippingFee
    };
  },
});