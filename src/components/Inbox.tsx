import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
}

export const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil pesan dari database
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false }); // Pesan terbaru di atas

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  // Fungsi untuk menghapus pesan
  const deleteMessage = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;

    const { error } = await supabase.from('messages').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting message:', error);
      alert('Gagal menghapus pesan.');
    } else {
      // Hapus dari state lokal agar UI langsung update tanpa refresh
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Memuat pesan...</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mt-8">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kotak Masuk</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pesan dari form "Contact Me"</p>
        </div>
        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 py-1 px-3 rounded-full text-xs font-semibold">
          {messages.length} Pesan
        </span>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            Belum ada pesan masuk.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-md font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {msg.email}
                  </a>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                    {new Date(msg.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                  {/* Tombol Hapus (Muncul saat di-hover) */}
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Hapus
                  </button>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap mt-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};