import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/App';

describe('App 컴포넌트 통합 테스트', () => {
  test('초기 로드 시 상품 목록과 장바구니 배지가 정상 표시된다.', () => {
    render(<App />);
    expect(screen.getByText(/현재 3개의 상품이 있습니다/i)).toBeInTheDocument();
    expect(screen.queryByClassName('cart-badge')).not.toBeInTheDocument();
  });

  test('"구매" 버튼 클릭 시 보유카드 목록(Payment) 페이지로 이동한다.', () => {
    render(<App />);
    const payButtons = screen.getAllByText('구매');
    fireEvent.click(payButtons[0]);
    
    expect(screen.getByText('보유카드')).toBeInTheDocument();
  });

  test('보유카드 페이지에서 "+" 버튼 클릭 시 카드 추가 폼으로 이동한다.', () => {
    render(<App />);

    fireEvent.click(screen.getAllByText('구매')[0]);
    
    const addBtn = screen.getByText('+');
    fireEvent.click(addBtn);
    
    expect(screen.getByText(/카드 번호/i)).toBeInTheDocument();
  });
});