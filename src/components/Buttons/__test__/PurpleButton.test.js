import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import PurpleButton from '../BlackButton';

describe(PurpleButton, () => {
  it('Puple button is rendered correctly', () => {
    const { getByTestId } = render(<PurpleButton label="Click me" />);
    const buttonElement = getByTestId('Click me');
    expect(buttonElement).toBeTruthy();
  });

  it('handles onClick event', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(<PurpleButton label="Click me" onClick={onClickMock} />);
    const buttonElement = getByTestId('Click me');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
