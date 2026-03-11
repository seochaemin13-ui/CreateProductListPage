import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../src/Card';

describe('Card 컴포넌트 상세 테스트', () => {
  const mockProps = {
    title: "테스트 신발",
    price: "10,000원",
    description: "설명",
    buttonText: "담기",
    onButtonClick: jest.fn(),
    onPaymentClick: jest.fn()
  };

  test('"담기" 버튼 클릭 시 텍스트가 "담김!"으로 변하는지 확인(isAdded 반영)', () => {
    const { rerender } = render(<Card {...mockProps} isAdded={false} />);
    expect(screen.getByText('담기')).toBeInTheDocument();

    // 부모로부터 isAdded가 true로 내려왔을 때를 시뮬레이션
    rerender(<Card {...mockProps} isAdded={true} />);
    const addBtn = screen.getByText('담김!');
    expect(addBtn).toHaveClass('added');
  });
});