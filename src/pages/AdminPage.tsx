import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AdminProfile } from '../types';
import { ADMIN_TEAM } from '../data/communityData';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import {
  ShieldCheck,
  LogOut,
  Lock,
  AlertCircle,
  Database,
  Plus,
  Trash2,
  CheckCircle2,
  Instagram,
  Disc as DiscordIcon,
  MessageCircle,
  Mail,
  Github,
  Globe,
  ArrowUpRight,
  User,
  X,
  ChevronRight,
  ImageIcon
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading, error, loginWithGoogle, logout } = useAuth();
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);

  // State untuk background custom dari folder public di halaman Admin
  const [currentBg, setCurrentBg] = useState<string>('/backgrounds/Pages.jpeg');

  const backgroundOptions = [
    { label: 'Cyber HQ', path: '/backgrounds/fsa_cyber_headquarters.jpg' },
    { label: 'Digital Hub', path: '/backgrounds/community_digital_hub.jpg' },
    { label: 'Aquatic Lounge', path: '/backgrounds/furry_aquatic_lounge.jpg' }
  ];

  // State untuk data tabel manajemen admin di bagian bawah
  const [tableData, setTableData] = useState([
    { id: 1, name: 'FSA Sharknoxza Hub Alpha', category: 'Community Node', status: 'Active', updated: '2026-10-30' },
    { id: 2, name: 'Secure Gateway Firewall', category: 'Infrastructure', status: 'Protected', updated: '2026-10-29' },
    { id: 3, name: 'Database Firestore Sync', category: 'Database', status: 'Connected', updated: '2026-10-28' },
  ]);

  const [newItemName, setNewItemName] = useState('');

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

  const handleDeleteItem = (id: number) => {
    setTableData(tableData.filter(item => item.id !== id));
  };

  const getAdminIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'discord':
        return <DiscordIcon className="w-4 h-4 text-indigo-400" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      case 'github':
        return <Github className="w-4 h-4 text-slate-300" />;
      case 'email':
        return <Mail className="w-4 h-4 text-cyan-400" />;
      default:
        return <Globe className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getRoleTextColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'text-amber-300';
      case 'Co-Owner':
        return 'text-purple-300';
      case 'Web Developer':
        return 'text-cyan-300';
      case 'Head Admin':
        return 'text-rose-400';
      default:
        return 'text-sky-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-cyan-400 font-mono animate-pulse text-sm">Memeriksa Sesi Pengurus...</div>
      </div>
    );
  }

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20 rounded-3xl bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.92), rgba(3, 7, 18, 0.97)), url('${currentBg}')` 
      }}
    >
      
      {/* 1. Header Halaman */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
          Dewan Kepengurusan & Arsitek Portal
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t('admin.title')}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl mx-auto font-normal">
          {t('admin.subtitle')}
        </p>

        {/* Tombol Pemilih Background Custom dari Folder Public */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Tema BG Public:
          </span>
          {backgroundOptions.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(bg.path)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                currentBg === bg.path
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]'
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>

        {/* Status Login / Tombol Login Google */}
        <div className="mt-6 flex justify-center">
          {!user ? (
            <button
              onClick={loginWithGoogle}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center gap-2 cursor-pointer font-heading"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login Admin Google</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-300">Admin Aktif: {user.email}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 max-w-md mx-auto p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* 2. Grid Kartu Admin (Tampil seperti biasa untuk publik) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADMIN_TEAM.map((admin, idx) => {
          const isDeveloper = admin.role === 'Web Developer';

          return (
            <motion.div
              key={admin.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedAdmin(admin)}
              className={`executive-card rounded-3xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xl ${
                isDeveloper
                  ? 'border-cyan-400/40 bg-slate-900/70 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                  : 'border-white/[0.08] hover:border-cyan-400/40'
              }`}
            >
              <div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-white/[0.12] shadow-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                      <span className={getRoleTextColor(admin.role)}>{admin.role}</span>
                      <span className="text-slate-600 mx-1.5">·</span>
                      <span className="text-slate-400">{admin.levelBadge}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors truncate font-heading">
                      {admin.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 truncate">{admin.nickname}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed line-clamp-3 mb-5 font-normal">
                  {admin.characterBio}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400 mb-5">
                  {admin.personality.slice(0, 3).map((trait, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span>✦ {trait}</span>
                      {i < 2 && <span className="text-slate-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-heading">
                  <span>Lihat Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {admin.links.length} Tautan
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. PANEL ADMIN TAMBAHAN (Hanya muncul di bawah Admin Cards jika user sudah login sebagai Admin) */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 pt-12 border-t border-cyan-400/20 space-y-6"
        >
          {/* Bar Info Admin yang Sedang Login */}
          <div className="executive-glass rounded-3xl p-6 sm:p-8 border border-cyan-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-cyan-950/20">
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user.displayName || 'Admin'}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400 shadow-md"
              />
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Panel Kontrol Eksklusif Aktif</span>
                </div>
                <h2 className="text-xl font-extrabold text-white font-heading">
                  Selamat Datang, {user.displayName || 'Admin'}!
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  {user.email}
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

          {/* Tabel Manajemen Data di Bawahnya */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>Tabel Manajemen Data Sistem</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Data di bawah ini hanya dirender dan dapat dikelola langsung oleh admin terautentikasi.
                </p>
              </div>

              {/* Form Tambah Data */}
              <form onSubmit={handleAddItem} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Entri baru..."
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

            {/* Tabel HTML */}
            <div className="executive-glass rounded-3xl border border-white/[0.08] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                      <th className="py-3.5 px-6">Nama Entri</th>
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
                          Belum ada data tercatat.
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
        </motion.div>
      )}

      {/* Modal Detail Profil Admin (Tetap ada saat kartu admin diklik) */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="w-full max-w-2xl executive-glass rounded-3xl p-6 sm:p-8 border border-cyan-400/30 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-4">
                <img
                  src={selectedAdmin.avatar}
                  alt={selectedAdmin.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-2xl object-cover border border-cyan-400/40 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                    <span className={`uppercase font-bold ${getRoleTextColor(selectedAdmin.role)}`}>
                      {selectedAdmin.role}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-cyan-300">{selectedAdmin.levelBadge}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedAdmin.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{selectedAdmin.nickname}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAdmin(null)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-5 space-y-5 text-sm text-slate-300">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Profil Kepemimpinan</span>
                </h4>
                <p className="text-slate-200 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06] text-xs sm:text-sm font-normal">
                  {selectedAdmin.characterBio}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-3">
                  Tautan & Kontak Pengurus
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedAdmin.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-400/40 text-white font-semibold text-xs flex items-center justify-between transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        {getAdminIcon(link.icon)}
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Dewan Pengurus FSA Sharknoxza
              </span>
              <button
                onClick={() => setSelectedAdmin(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {t('partner.closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
