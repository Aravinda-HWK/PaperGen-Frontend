import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter if you use Link
import CoverPage from '../CoverPage';

const mockData = {
  title: 'Sample Book',
  author: 'John Doe',
  photo: 'sample.jpg',
  price: 19.99,
  id: 1,
};

/* The code you provided is a test case written using the Jest testing framework for a React component
called `CoverPage`. */
describe(CoverPage, () => {
  it('should render correctly', () => {
    const { getByTestId, getByAltText } = render(
      <Router>
        <CoverPage {...mockData} />
      </Router>
    );
    const bookname=getByTestId('Sample Book').textContent;
    const authorname=getByTestId('John Doe').textContent;
    const price=getByTestId('LKR19.99').textContent;
    const img = getByAltText('img');
    expect(bookname).toBe('Sample Book');
    expect(authorname).toBe('John Doe');
    expect(price).toBe('LKR19.99');
    expect(img.src).toContain('sample.jpg');
  });
});

