
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-8 h-8 funky-gradient rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-book-open"></i>
          </div>
          <span className="text-xl font-bold text-white">Nova Library</span>
        </div>
        <p className="text-sm max-w-md mx-auto mb-6">
          The ultimate management system for modern book stores. Track inventory, sales, and authors with ease and style.
        </p>
        <div className="flex justify-center gap-4 text-xl mb-6">
          <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-github"></i></a>
          <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-indigo-400 transition-colors"><i className="fab fa-linkedin"></i></a>
        </div>
        <div className="border-t border-slate-800 pt-8 text-xs uppercase tracking-widest font-semibold">
          &copy; {new Date().getFullYear()} Nova Library Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
