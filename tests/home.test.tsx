import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /PRIA Frontend Engineering/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Home />);
    const description = screen.getByText(/Professional frontend infrastructure/i);
    expect(description).toBeInTheDocument();
  });

  it('renders technology badges', () => {
    render(<Home />);
    const nextjsBadge = screen.getByText(/Next.js 14/i);
    const typescriptBadges = screen.getAllByText(/TypeScript/i);
    const tailwindBadge = screen.getByText(/Tailwind CSS v4/i);

    expect(nextjsBadge).toBeInTheDocument();
    expect(typescriptBadges.length).toBeGreaterThan(0);
    expect(tailwindBadge).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<Home />);
    const componentLibraryCard = screen.getByText(/Component Library/i);
    const developmentToolsCard = screen.getByText(/Development Tools/i);
    const productionReadyCard = screen.getByText(/Production Ready/i);

    expect(componentLibraryCard).toBeInTheDocument();
    expect(developmentToolsCard).toBeInTheDocument();
    expect(productionReadyCard).toBeInTheDocument();
  });
});
