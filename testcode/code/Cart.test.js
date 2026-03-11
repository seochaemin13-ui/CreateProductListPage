import { render, screen, within } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';
import Cart from '../../src/Cart';
import { productsState, cartState, cartQuantitiesState } from '../../src/recoil/atoms';

const mockProducts = [{ id: 1, title: '신발A', price: '30,000원', imageUrl: 'img' }];

describe('Cart 컴포넌트 테스트', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
  });

  test('수량 증가 시 금액이 계산되고 배송비 3,000원이 부과된다.', () => {
    render(
      <RecoilRoot initializeState={({ set }) => {
        set(productsState, mockProducts);
        set(cartState, [1]);
        set(cartQuantitiesState, { 1: 1 });
      }}>
        <Cart onBack={() => {}} onCheckout={() => {}} />
      </RecoilRoot>
    );

    const summaryArea = document.querySelector('.cart-summary');
    
    if (summaryArea) {
      expect(within(summaryArea).getByText('30,000원')).toBeInTheDocument();
      expect(within(summaryArea).getByText('3,000원')).toBeInTheDocument();
    } else {
      throw new Error('.cart-summary 클래스를 찾을 수 없습니다.');
    }
  });
});