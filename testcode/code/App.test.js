import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('메인 페이지 로드 시 상품 목록 개수가 정확히 표시되어야 한다.', () => {
  render(<App />);
  
  // 초기 로드 시 3개의 상품이 있다고 표시되는지 확인
  const titleDescription = screen.getByText(/현재 3개의 상품이 있습니다/i);
  expect(titleDescription).toBeInTheDocument();
});

test('상품을 담으면 헤더의 장바구니 배지 숫자가 증가해야 한다.', () => {
  render(<App />);
  
  // 첫 번째 '담기' 버튼 찾기
  const addButtons = screen.getAllByText('담기');
  fireEvent.click(addButtons[0]);

  // 장바구니 배지에 '1'이 나타나는지 확인 (비동기 처리가 필요할 경우 async/await 활용 가능) [cite: 371]
  const badge = screen.getByText('1');
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveClass('cart-badge');
});