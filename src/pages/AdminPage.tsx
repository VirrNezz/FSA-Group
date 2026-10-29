import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  LogOut, 
  Mail, 
  User as UserIcon, 
  Lock, 
  AlertCircle, 
  Database, 
  Plus, 
  Trash2, 
  Edit3,
  CheckCircle2
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading, error, loginWithGoogle, logout } = useAuth();
  
  // State untuk data tabel di bawah panel admin
  const [tableData, setTableData] = useState([
    { id: 1, name: 'FSA Sharknoxza Hub Alpha', category: 'Community Node', status: 'Active', updated: '2026-10-30' },
    { id: 2, name: 'Secure Gateway Firewall', category: 'Infrastructure', status: 'Protected', updated: '2026-10-29' },
    { id: 3, name: 'Database Firestore Sync', category: 'Database', status: 'Connected', updated: '2026-10-28' },
  ]);

  const [newItemName, setNewItemName] = useState('');

  // Fungsi tambah item ke tabel (simulasi manajemen data admin)
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newItemName,
      category: 'Custom Entry',
      status: 'Active',
      updated: new Date().toISOString().split('T')[0],
    };
    setTableData([newItem, ...tableData]);
    setNewItemName('');
  };

  // Fungsi hapus item dari tabel
  const handleDeleteItem = (id: number) => {
    setTableData(tableData.filter(item => item.id !== id));
  };

  // Tampilan saat loading status auth
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-cyan-400 font-mono animate-pulse text-sm">Memeriksa Kredensial Admin...</div>
      </div>
    );
  }

  // JIKA BELUM LOGIN / BUKAN ADMIN: Tampilkan Halaman Login Khusus
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="executive-glass rounded-3xl p-8 border border-cyan-400/30 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
            <Lock className="w-8 h-8" />
          </div>
          
          <div>
            <h1 className="text-2xl font-extrabold text-white font-heading">Admin Portal Restriced</h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Halaman ini bersifat privat dan hanya dapat diakses oleh Dewan Pengurus Resmi FSG.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={loginWithGoogle}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 cursor-pointer font-heading"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Login dengan Google Admin</span>
          </button>
        </div>
      </div>
    );
  }

  // JIKA SUDAH LOGIN SEBAGAI ADMIN: Tampilkan Panel Utama & Tabel di Bawahnya
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
      
      {/* 1. Header Profil Admin yang Sedang Login */}
      <div className="executive-glass rounded-3xl p-6 sm:p-8 border border-cyan-400/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user.displayName || 'Admin'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
              ✓
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Administrator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 font-heading">
              {user.displayName || 'Pengurus FSA'}
            </h1>
            <p className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer font-heading"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi</span>
        </button>
      </div>

      {/* 2. Tabel Tambahan di Bawah Nama Admin (Panel Utama Manajemen) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <Database className="w-5 h-5 text-cyan-400" />
              <span>Tabel Kontrol & Manajemen Data Sistem</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Data di bawah ini hanya dapat dikelola secara eksklusif oleh admin yang terautentikasi.
            </p>
          </div>

          {/* Form Tambah Data Cepat */}
          <form onSubmit={handleAddItem} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nama data baru..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer font-heading"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </form>
        </div>

        {/* Tabel Data */}
        <div className="executive-glass rounded-3xl border border-white/[0.08] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">ID & Nama Entri</th>
                  <th className="py-3.5 px-6">Kategori</th>
                  <th className="py-3.5 px-6">Status Keamanan</th>
                  <th className="py-3.5 px-6">Terakhir Diperbarui</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs font-mono text-slate-300">
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Belum ada data tercatat di dalam tabel sistem.
                    </td>
                  </tr>
                ) : (
                  tableData.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {item.category}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {item.updated}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="Hapus Entri"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
