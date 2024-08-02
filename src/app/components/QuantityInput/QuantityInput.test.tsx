import QuantityInput from './QuantityInput';
import { render, fireEvent } from '@testing-library/react';

describe(QuantityInput, () => {
  it('should render with value = 1', () => {
    const { getByLabelText } = render(<QuantityInput id='test' />);
    const inputEl = getByLabelText('Quantity');

    expect(inputEl).toHaveValue(1);
  });

  it('should increment value', () => {
    const { getByRole, getByLabelText } = render(<QuantityInput id='test' />);
    const inputEl = getByLabelText('Quantity');
    const plusButton = getByRole('button', { name: '+' });

    fireEvent.click(plusButton);

    expect(inputEl).toHaveValue(2);
  });

  it('should not decrement value if value <= 1', () => {
    const { getByRole, getByLabelText } = render(<QuantityInput id='test' />);

    const inputEl = getByLabelText('Quantity');
    const minusButton = getByRole('button', { name: '-' });

    fireEvent.click(minusButton);

    expect(inputEl).toHaveValue(1);
  });

  it('should decrement value if value > 1', () => {
    const { getByRole, getByLabelText } = render(<QuantityInput id='test' />);

    const inputEl = getByLabelText('Quantity');
    const minusButton = getByRole('button', { name: '-' });
    const plusButton = getByRole('button', { name: '+' });

    fireEvent.click(plusButton);
    fireEvent.click(minusButton);

    expect(inputEl).toHaveValue(1);
  });

  it('should change current value to onChange value if typed in value is > 1 ', () => {
    const { getByLabelText } = render(<QuantityInput id='test' />);

    const inputEl = getByLabelText('Quantity');

    fireEvent.change(inputEl, { target: { value: '4' } });

    expect(inputEl).toHaveValue(4);
  });

  it('should change current value to 1 if typed in value is < 1 ', () => {
    const { getByLabelText } = render(<QuantityInput id='test' />);

    const inputEl = getByLabelText('Quantity');

    fireEvent.change(inputEl, { target: { value: '0' } });

    expect(inputEl).toHaveValue(1);
  });
});
