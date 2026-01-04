
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-20 px-4">
      <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
        <i className="fas fa-books-medical text-5xl"></i>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Shelf is Empty!</h2>
      <p className="text-slate-500 max-w-sm mx-auto mb-8">
        Your library catalog seems to be empty. Why don't you stock up some amazing books?
      </p>
      <Link 
        to="/add" 
        className="inline-flex items-center gap-2 funky-gradient text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        <i className="fas fa-plus"></i> Add Your First Book
      </Link>
    </div>
  );
};

export default EmptyState;
