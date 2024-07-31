import { render } from '@testing-library/react';
import Input from './Input';

describe(Input, () => {
  it('should correctly display props', () => {
    const labelProp = 'test';
    const idProp = '123';

    const { getByLabelText, getByTestId } = render(
      <Input
        id={idProp}
        label={labelProp}
        classNameInput='bg-red-400'
        classNameLabel='bg-blue-400'
      />
    );

    const inputEl = getByLabelText(labelProp);
    const labelEl = getByTestId('input-label');

    expect(inputEl).toBeInTheDocument();
    expect(labelEl.classList).toContain('bg-blue-400');
    expect(inputEl.classList).toContain('bg-red-400');
  });
});
