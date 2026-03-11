import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';
import Cart from '../../src/Cart';
import { productsState, cartState, cartQuantitiesState } from '../../src/recoil/atoms';

const mockProducts = [
  { id: 1, title: '브랜드A', price: '35,000원', imageUrl: 'test1.jpg' },
  { id: 2, title: '브랜드B', price: '25,000원', imageUrl: 'test2.jpg' },
];

const renderWithRecoil = (ui, { products = [], cartItems = [], quantities = {} } = {}) => {
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(productsState, products);
        set(cartState, cartItems);
        set(cartQuantitiesState, quantities);
      }}
    >
      {ui}
    </RecoilRoot>
  );
};

describe('Cart 컴포넌트 로직 및 UI 테스트', () => {
  const defaultProps = {
    onBack: jest.fn(),
    onCheckout: jest.fn(),
  };

  test('장바구니에 담긴 상품 목록과 개수가 정확히 표시된다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1, 2],
    });

    expect(screen.getByText('현재 2개의 상품이 담겨있습니다.')).toBeInTheDocument();
    expect(screen.getByText('브랜드A')).toBeInTheDocument();
    expect(screen.getByText('브랜드B')).toBeInTheDocument();
  });

  test('"+" 버튼 클릭 시 수량이 증가하고 총 금액이 업데이트된다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1],
      quantities: { 1: 1 },
    });

    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('70,000원')).toBeInTheDocument();
  });

  test('"-" 버튼을 눌러도 수량은 1 미만으로 내려가지 않는다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1],
      quantities: { 1: 1 },
    });

    const minusBtn = screen.getByText('−');
    fireEvent.click(minusBtn);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('총 금액이 100,000원 미만일 때 배송비 3,000원이 부과된다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1], // 35,000원
    });

    expect(screen.getByText('3,000원')).toBeInTheDocument();
    expect(screen.getByText('38,000원')).toBeInTheDocument();
  });

  test('총 금액이 100,000원 이상일 때 배송비는 0원(무료)이다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1],
      quantities: { 1: 3 }, // 35,000 * 3 = 105,000원
    });

    const shippingFees = screen.getAllByText('0원');
    expect(shippingFees.length).toBeGreaterThan(0);
    expect(screen.getByText('105,000원')).toBeInTheDocument();
  });

  test('뒤로가기 버튼과 결제하기 버튼 클릭 시 해당 함수가 호출된다.', () => {
    renderWithRecoil(<Cart {...defaultProps} />, {
      products: mockProducts,
      cartItems: [1],
    });

    fireEvent.click(screen.getByText('←'));
    expect(defaultProps.onBack).toHaveBeenCalled();

    fireEvent.click(screen.getByText('결제하기'));
    expect(defaultProps.onCheckout).toHaveBeenCalled();
  });
});