import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';
import App from '../../src/App';
import { productsState } from '../../src/recoil/atoms';

describe('App 컴포넌트 통합 테스트', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
    delete global.fetch; 
  });

  const mockProducts = [
    { id: 1, title: '테스트 신발', price: '10,000원', description: '설명', imageUrl: 'url' }
  ];

  const renderApp = () => {
    return render(
      <RecoilRoot initializeState={({ set }) => {
        set(productsState, mockProducts);
      }}>
        <App />
      </RecoilRoot>
    );
  };

  test('초기 로드 시 상품 목록과 장바구니 배지가 정상 표시된다.', () => {
    renderApp();
    expect(screen.getByText(/현재 1개의 상품이 있습니다/i)).toBeInTheDocument();
  });

  test('"구매" 버튼 클릭 시 보유카드 목록 페이지로 이동한다.', () => {
    renderApp();
    const payButtons = screen.getAllByText('구매');
    fireEvent.click(payButtons[0]);
    expect(screen.getByText('보유카드')).toBeInTheDocument();
  });
});