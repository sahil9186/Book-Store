
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 funky-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i className="fas fa-book-open text-xl"></i>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">
            Nova<span className="text-gradient">Library</span>
          </span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link 
            to="/" 
            className={`font-semibold transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
          >
            Home
          </Link>
          <Link 
            to="/add" 
            className="funky-gradient text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
