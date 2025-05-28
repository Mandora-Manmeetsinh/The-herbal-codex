import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/garden', label: '3D Garden' },
  { to: '/library', label: 'Plant Library' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (to: string) =>
    `text-herb-green-dark hover:text-herb-green font-medium ${
      pathname === to ? 'underline underline-offset-4' : ''
    }`;

  const mobileLinkClass = (to: string) =>
    `block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md ${
      pathname === to ? 'bg-herb-cream font-semibold' : ''
    }`;

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="Home">
              <Leaf className="h-8 w-8 text-herb-green-dark" />
              <span className="ml-2 text-xl font-playfair font-bold text-herb-green-dark">
                The Herbal Codex
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="text-herb-green-dark"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={mobileLinkClass(to)}
                onClick={handleLinkClick}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
