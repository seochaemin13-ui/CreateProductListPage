import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VirtualCard from '../../src/VirtualCard';

test('전달된 카드 정보(번호, 이름, 만료일)가 카드 UI에 표시되어야 한다.', () => {
  render(
    <VirtualCard 
      displayNumber="1234 5678 •••• ••••" 
      ownerName="GEMINI" 
      expiryDate="12 / 26" 
    />
  );

  expect(screen.getByText('1234 5678 •••• ••••')).toBeInTheDocument();
  expect(screen.getByText('GEMINI')).toBeInTheDocument();
  expect(screen.getByText('12 / 26')).toBeInTheDocument();
});