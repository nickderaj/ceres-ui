import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';

describe('DataTable', () => {
  const sampleData = {
    columns: ['Name', 'Age', 'City'],
    data: [
      ['Alice', '30', 'New York'],
      ['Bob', '25', 'London'],
    ],
  };

  it('renders columns as table headers', () => {
    render(<DataTable data={sampleData} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
  });

  it('renders rows of data', () => {
    render(<DataTable data={sampleData} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(<DataTable data={sampleData} className="my-table" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('ceres-data-table-wrapper');
    expect(wrapper).toHaveClass('my-table');
  });
});
