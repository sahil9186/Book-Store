
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import Loader from '../components/common/Loader';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const data = await bookService.getBookById(parseInt(id));
        setBook(data);
      } catch (error: any) {
        toast.error(error.message || 'Book not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (!book) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <span className="text-slate-400 font-bold tracking-widest uppercase text-xs">Catalog Item #{book.id}</span>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        <div className="md:w-2/5 funky-gradient p-12 flex items-center justify-center relative overflow-hidden">
          <i className="fas fa-book text-white text-[10rem] opacity-20 animate-float"></i>
          <div className="absolute top-6 left-6">
             <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${book.available ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-200'}`}>
              {book.available ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        <div className="md:w-3/5 p-10 md:p-14 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">{book.title}</h1>
            <p className="text-xl text-indigo-600 font-bold">{book.author}</p>
          </div>

          <div className="flex items-center gap-10">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
              <p className="text-3xl font-black text-slate-900">${book.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${book.available ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-red-500'}`}></div>
                <p className="font-bold text-slate-700">{book.available ? 'Ready for Pickup' : 'Currently Unavailable'}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-500 leading-relaxed mb-10 italic">
              "This title is part of our premium collection. Each page offers a unique journey into the world of literature, knowledge, and entertainment."
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to={`/edit/${book.id}`}
                className="flex-1 min-w-[150px] py-4 bg-indigo-600 text-white rounded-2xl font-black text-center shadow-lg hover:bg-indigo-700 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-edit"></i> Edit Information
              </Link>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 min-w-[150px] py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-center hover:bg-slate-200 transition-all"
              >
                Back to Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
