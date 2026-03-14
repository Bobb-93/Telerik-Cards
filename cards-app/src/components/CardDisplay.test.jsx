import { render, screen } from '@testing-library/react';
import CardDisplay from './CardDisplay';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('CardDisplay', () => {
  it('updates displayed card when card prop changes', () => {
    const { rerender } = render(
      <CardDisplay card={{ value: 'Ace', suit: 'Spades', image: 'ace-spades.png' }} label="Card Label" />
    );
    expect(screen.getByText('Ace of Spades')).toBeInTheDocument();
    rerender(
      <CardDisplay card={{ value: 'King', suit: 'Hearts', image: 'king-hearts.png' }} label="Card Label" />
    );
    expect(screen.getByText('King of Hearts')).toBeInTheDocument();
  });

  it('adds flipped class when shouldFlip is true', async () => {
    const card = { value: 'Ace', suit: 'Spades', image: 'ace-spades.png' };
    render(<CardDisplay card={card} label="Card Label" shouldFlip={true} />);
    // Wait for the flip effect (timeout 50ms in component)
    const cardDiv = screen.getByRole('img', { hidden: true })?.closest('.card') || document.querySelector('.card');
    // Wait for the class to be applied
    await new Promise((r) => setTimeout(r, 60));
    expect(cardDiv.classList.contains('flipped')).toBe(true);
  });
  
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
    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle.textContent).toBe('\u00A0');
  });
});
