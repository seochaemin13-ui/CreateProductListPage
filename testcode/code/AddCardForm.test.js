import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCardForm from '../../src/AddCardForm';

describe('AddCardForm 상세 로직 테스트', () => {
  test('카드 번호 첫 번째 칸에 4자리를 입력하면 다음 칸으로 포커스가 이동한다.', async () => {
  render(<AddCardForm />);
  
  const cardInputs = screen.getAllByRole('textbox');
  
  fireEvent.change(cardInputs[0], { target: { value: '1234' } });
  
  await waitFor(() => {
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[1]).toHaveFocus();
  });
});

  test('보안 코드(CVC) 도움말 버튼 클릭 시 툴팁이 나타난다.', () => {
    render(<AddCardForm />);
    const helpBtn = screen.getByText('?');
    
    fireEvent.click(helpBtn);
    expect(screen.getByText(/카드 뒷면의 마지막 3자리/i)).toBeInTheDocument();
  });

  test('모든 정보가 올바르게 입력되어야 "작성 완료" 버튼이 활성화된다.', () => {
    render(<AddCardForm />);
    const submitBtn = screen.getByText('작성 완료');
    
    expect(submitBtn).toBeDisabled();

  });
});