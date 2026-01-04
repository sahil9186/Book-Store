
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookService } from '../services/bookService';
import Loader from '../components/common/Loader';

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    available: true
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const book = await bookService.getBookById(parseInt(id));
        setFormData({
          title: book.title,
          author: book.author,
          price: book.price.toString(),
          available: book.available
        });
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch book details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      setSubmitting(true);
      await bookService.updateBook(parseInt(id), {
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        available: formData.available
      });
      toast.success('Book details updated successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error updating book');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Edit <span className="text-gradient">Details</span></h1>
          <p className="text-slate-500 font-medium">Modify existing book information.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Book Title</label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none transition-all font-medium text-slate-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Author Name</label>
            <input 
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none transition-all font-medium text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Price ($)</label>
              <input 
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none transition-all font-medium text-slate-800"
                required
              />
            </div>

            <div className="flex flex-col justify-end space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 select-none">
                <input 
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="w-5 h-5 rounded accent-indigo-600"
                />
                <span className="font-bold text-slate-700">Available Now</span>
              </label>
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-4 funky-gradient text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-save"></i>
            )}
            {submitting ? 'Saving Changes...' : 'Update Records'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
