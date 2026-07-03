'use client';
import { useState } from 'react';

export default function MediaUpload() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('image');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus('error');
      setMessage('Please select a file');
      return;
    }

    setStatus('uploading');
    setMessage('');

    // Simulate upload (replace with real API call)
    setTimeout(() => {
      setStatus('success');
      setMessage('Media uploaded successfully!');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
      <h2 className="text-3xl font-serif text-[#0F2540] mb-10 text-center">Upload Media</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-[#0F2540] mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-[#0F2540] bg-white"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0F2540] mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-[#0F2540] bg-white"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0F2540] mb-2">File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl text-[#0F2540] bg-white file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-[#D4AF37] file:text-[#0F2540] file:font-medium"
          />
        </div>

        {message && (
          <p className={`text-center font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'uploading'}
          className="w-full bg-[#D4AF37] hover:bg-amber-400 disabled:bg-gray-400 text-[#0F2540] font-semibold py-5 rounded-2xl transition-all duration-300 text-lg"
        >
          {status === 'uploading' ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}