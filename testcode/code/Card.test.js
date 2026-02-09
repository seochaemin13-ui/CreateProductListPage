import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

// 단위 1: 초기 렌더링 확인
test('상품 정보(제목, 가격)가 정상적으로 렌더링되어야 한다.', () => {
  render(
    <Card 
      title="테스트 신발" 
      price="10,000원" 
      description="설명" 
      buttonText="담기" 
    />
  );

  // Jest Matcher를 사용하여 텍스트가 있는지 확인 [cite: 147]
  expect(screen.getByText('테스트 신발')).toBeInTheDocument();
  expect(screen.getByText('10,000원')).toBeInTheDocument();
});

// 단위 2: 사용자 인터렉션(버튼 클릭) 확인
test('버튼 클릭 시 "담김!"으로 텍스트가 변경되어야 한다.', () => {
  render(<Card title="신발" buttonText="담기" />);
  
  const button = screen.getByRole('button');
  
  // 버튼 클릭 이벤트 발생
  fireEvent.click(button);
  
  // 상태 변화 확인 (사용자 수정 사항 반영: 담김!으로 유지)
  expect(button).toHaveTextContent('담김!');
  expect(button).toHaveClass('added');
});