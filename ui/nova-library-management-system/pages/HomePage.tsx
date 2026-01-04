
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import BookCard from '../components/common/BookCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ConfirmModal from '../components/common/ConfirmModal';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await bookService.deleteBook(deleteId);
      setBooks(prev => prev.filter(b => b.id !== deleteId));
      toast.success('Book removed from library successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete book');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            The <span className="text-gradient">Catalog</span>
          </h1>
          <p className="text-slate-500 font-medium">Explore and manage {books.length} curated books in your store.</p>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl shadow-sm border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
          />
        </div>
      </header>

      {loading ? (
        <Loader />
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onDelete={(id) => setDeleteId(id)} 
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <ConfirmModal 
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Are you sure?"
        message="This action will permanently remove this book from your library records. This cannot be undone."
      />
    </div>
  );
};

export default HomePage;
