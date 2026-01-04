
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-book text-indigo-400"></i>
        </div>
      </div>
      <p className="mt-4 text-slate-500 font-bold tracking-wide animate-pulse">Librarian is searching...</p>
    </div>
  );
};

export default Loader;
