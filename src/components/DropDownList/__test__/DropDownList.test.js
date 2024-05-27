import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropDownList from '../DropDownList';

// Mock the onchange function
const mockOnchange = jest.fn();

const items = ['Option 1', 'Option 2', 'Option 3'];

test('renders Input Label component', () => {
  const { getByTestId } = render(
    <DropDownList label="Select an option" items={items} onchange={mockOnchange} />,
  );

  // Check if the label is rendered
  const labelElement = getByTestId('Select an option');
  expect(labelElement).toBeInTheDocument();

  //   // Check if each option is rendered
  //   items.forEach((item) => {
  //     const optionElement = getByText(item);
  //     expect(optionElement).toBeInTheDocument();
  //   });
});

test('Render the dropdown list component', () => {
  const { getByDisplayValue } = render(
    <DropDownList label="dropdown-test" items={items} onchange={mockOnchange} />,
  );

  // Check if the dropdown list is rendered
  items.forEach((item) => {
    const optionElement = getByDisplayValue(item);
    console.log(optionElement);
    expect(optionElement).toBeInTheDocument();
  });
});

test('handles select change', () => {
  const { getByTestId } = render(
    <DropDownList label="dropdown-test" items={items} onchange={mockOnchange} />,
  );

  // Select an option
  const selectElement = getByTestId('dropdown-test');

  // Use fireEvent.select to simulate the change
  fireEvent.click(selectElement, { target: { value: 'Option 2' } });

  // Check if the onchange function was called with the selected value
  expect(mockOnchange).toHaveBeenCalledWith('Option 2');
});
