
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-herb-green-dark" />
              <span className="ml-2 text-xl font-playfair font-bold text-herb-green-dark">The Herbal Codex</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-herb-green-dark hover:text-herb-green font-medium">Home</Link>
            <Link to="/garden" className="text-herb-green-dark hover:text-herb-green font-medium">3D Garden</Link>
            <Link to="/library" className="text-herb-green-dark hover:text-herb-green font-medium">Plant Library</Link>
            <Link to="/about" className="text-herb-green-dark hover:text-herb-green font-medium">About</Link>
            <Link to="/contact" className="text-herb-green-dark hover:text-herb-green font-medium">Contact</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-herb-green-dark">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/garden" className="block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md" onClick={() => setIsOpen(false)}>3D Garden</Link>
            <Link to="/library" className="block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md" onClick={() => setIsOpen(false)}>Plant Library</Link>
            <Link to="/about" className="block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="block px-3 py-2 text-herb-green-dark font-medium hover:bg-herb-cream rounded-md" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
