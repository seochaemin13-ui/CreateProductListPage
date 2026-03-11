import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyCardList from '../../src/MyCardList';

jest.mock('../../src/cryptoUtils', () => ({
  decryptData: (data) => data 
}));

const mockCards = [
  { id: 1, cardNumber: '1111222233334444', ownerName: 'USER1', expiryDate: '11/25' }
];

describe('MyCardList 컴포넌트 테스트', () => {
  test('등록된 카드가 없을 때 안내 문구가 표시된다.', () => {
    render(<MyCardList cards={[]} />);
    expect(screen.getByText('새로운 카드를 등록해주세요.')).toBeInTheDocument();
  });

  test('등록된 카드가 있을 때 카드 정보와 결제 버튼이 표시된다.', () => {
    render(<MyCardList cards={mockCards} />);
    expect(screen.getByText('USER1')).toBeInTheDocument();
    expect(screen.getByText('이 카드로 결제하기')).toBeInTheDocument();
  });

  test('닫기(✕) 버튼 클릭 시 onBack 함수가 호출된다.', () => {
    const mockBack = jest.fn();
    render(<MyCardList cards={[]} onBack={mockBack} />);
    
    fireEvent.click(screen.getByText('✕'));
    expect(mockBack).toHaveBeenCalled();
  });
});