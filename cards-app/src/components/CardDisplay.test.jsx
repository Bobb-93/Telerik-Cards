import { render, screen } from '@testing-library/react';
import CardDisplay from './CardDisplay';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('CardDisplay', () => {
  it('renders without crashing and displays the label', () => {
    render(<CardDisplay label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders card props correctly', () => {
    const card = { value: 'Ace', suit: 'Spades', image: 'ace-spades.png' };
    render(<CardDisplay card={card} label="Card Label" />);
    expect(screen.getByAltText('Ace of Spades')).toHaveAttribute('src', 'ace-spades.png');
    expect(screen.getByText('Ace of Spades')).toBeInTheDocument();
  });

  it('renders blank card title if no card prop', () => {
    render(<CardDisplay label="No Card" />);
    // The card title should be a non-breaking space
    expect(screen.getByText('\u00A0')).toBeInTheDocument();
  });
});
