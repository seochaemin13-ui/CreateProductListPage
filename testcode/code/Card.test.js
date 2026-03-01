import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../src/Card';

describe('Card 컴포넌트 상세 테스트', () => {
  const mockProps = {
    title: "테스트 신발",
    price: "10,000원",
    description: "편안한 신발입니다.",
    buttonText: "담기",
    onButtonClick: jest.fn(),
    onPaymentClick: jest.fn()
  };

  test('상품의 제목, 가격, 설명이 화면에 올바르게 렌더링된다.', () => {
    render(<Card {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  test('"담기" 버튼 클릭 시 텍스트가 "담김!"으로 변하고 "added" 클래스가 적용된다.', () => {
    render(<Card {...mockProps} />);
    const addBtn = screen.getByText('담기');
    
    fireEvent.click(addBtn);
    
    expect(addBtn).toHaveTextContent('담김!');
    expect(addBtn).toHaveClass('added');
    expect(mockProps.onButtonClick).toHaveBeenCalledWith(true);
  });

  test('"구매" 버튼 클릭 시 결제 페이지 이동 함수(onPaymentClick)가 호출된다.', () => {
    render(<Card {...mockProps} />);
    const payBtn = screen.getByText('구매');
    
    fireEvent.click(payBtn);

    expect(mockProps.onPaymentClick).toHaveBeenCalled();
  });
});