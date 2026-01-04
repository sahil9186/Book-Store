
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="h-48 funky-gradient relative flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute top-0 right-0 p-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${book.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {book.available ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <i className="fas fa-book text-white text-7xl opacity-30 group-hover:scale-110 transition-transform duration-500"></i>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-800 line-clamp-1 mb-1">{book.title}</h3>
        <p className="text-slate-500 font-medium mb-4 flex items-center gap-1.5">
          <i className="fas fa-user-pen text-sm opacity-60"></i>
          {book.author}
        </p>
        
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-2xl font-black text-slate-900">${book.price.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link 
            to={`/book/${book.id}`}
            className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            <i className="fas fa-eye"></i> View
          </Link>
          <Link 
            to={`/edit/${book.id}`}
            className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition-colors"
          >
            <i className="fas fa-edit"></i> Edit
          </Link>
        </div>
      </div>

      <button 
        onClick={() => book.id && onDelete(book.id)}
        className="w-full py-3 bg-red-50 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition-all border-t border-red-100 uppercase tracking-widest"
      >
        <i className="fas fa-trash-alt mr-2"></i> Remove From Catalog
      </button>
    </div>
  );
};

export default BookCard;
