import React, { useState, useEffect } from 'react';
import { useBroadcast } from '../context/BroadcastContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { CommunityGroup } from '../types';
import { COMMUNITY_INFO } from '../data/communityData';
import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import {
  ShieldCheck,
  X,
  Send,
  Radio,
  ExternalLink,
  Lock,
  Unlock,
  Calendar,
  Database,
  Trash2,
  Check,
  AlertCircle,
  Copy,
  Clock,
  Save,
  LogOut
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    broadcasts,
    groups,
    addBroadcast,
    deleteBroadcast,
    clearAllBroadcasts,
    updateGroupStatus,
    updateGroupUrl,
    triggerDemoBroadcast
  } = useBroadcast();
  const { t } = useLanguage();
  
  // Autentikasi Google Pop-up eksklusif yang aman dari XSS
  const { user, loading: authLoading, error: authError, loginWithGoogle, logout } = useAuth();
  const isAdmin = !!user;

  // Tab aktif admin untuk semua halaman/fitur yang bisa diubah
  const [adminTab, setAdminTab] = useState<'broadcast' | 'groups' | 'schedule' | 'firebase'>('broadcast');

  // Broadcast Form
  const [bcTitle, setBcTitle] = useState('');
  const [bcContent, setBcContent] = useState('');
  const [bcAuthor, setBcAuthor] = useState('Sharknoxza Leader');
  const [bcRole, setBcRole] = useState('Core Administrator');
  const [bcPriority, setBcPriority] = useState<'urgent' | 'important' | 'info'>('urgent');
  const [bcCategory, setBcCategory] = useState('Turnamen & Komunitas');
  const [bcActionUrl, setBcActionUrl] = useState('');
  const [bcActionText, setBcActionText] = useState('');
  const [broadcastSentSuccess, setBroadcastSentSuccess] = useState(false);

  // Group editing
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState('');
  const [copiedDbSchema, setCopiedDbSchema] = useState(false);

  // Firestore Selection Schedule State
  const [selectionIsOpen, setSelectionIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleFetching, setScheduleFetching] = useState(true);

  // Ambil data jadwal dari Firestore saat admin berhasil login & tab dibuka
  useEffect(() => {
    if (isAdmin) {
      fetchScheduleData();
    }
  }, [isAdmin]);

  const fetchScheduleData = async () => {
    setScheduleFetching(true);
    try {
      const docRef = doc(db, "settings", "selection_schedule");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectionIsOpen(data.isOpen || false);
        setAnnouncement(data.announcement || '');
        
        if (data.openTime instanceof Timestamp) {
          setOpenTime(data.openTime.toDate().toISOString().slice(0, 16));
        }
        if (data.closeTime instanceof Timestamp) {
          setCloseTime(data.closeTime.toDate().toISOString().slice(0, 16));
        }
      }
    } catch (error) {
      console.error("Gagal mengambil data jadwal:", error);
    } finally {
      setScheduleFetching(false);
    }
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleLoading(true);

    try {
      const docRef = doc(db, "settings", "selection_schedule");
      await setDoc(docRef, {
        isOpen: selectionIsOpen,
        openTime: openTime ? Timestamp.fromDate(new Date(openTime)) : null,
        closeTime: closeTime ? Timestamp.fromDate(new Date(closeTime)) : null,
        announcement: announcement
      }, { merge: true });

      alert('Jadwal seleksi berhasil diperbarui di database Firestore! 🚀');
    } catch (error: any) {
      alert('Gagal menyimpan jadwal: ' + error.message);
    } finally {
      setScheduleLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bcTitle.trim() || !bcContent.trim()) return;

    addBroadcast({
      title: bcTitle.trim(),
      content: bcContent.trim(),
      author: bcAuthor.trim() || 'FSA Admin',
      authorRole: bcRole.trim() || 'Administrator',
      priority: bcPriority,
      category: bcCategory.trim() || 'Informasi',
      actionUrl: bcActionUrl.trim() || undefined,
      actionText: bcActionText.trim() || undefined,
      isPinned: bcPriority === 'urgent'
    });

    setBcTitle('');
    setBcContent('');
    setBcActionUrl('');
    setBcActionText('');
    setBroadcastSentSuccess(true);
    setTimeout(() => setBroadcastSentSuccess(false), 4000);
  };

  const handleSaveGroupUrl = (group: CommunityGroup) => {
    if (editingUrl.trim()) {
      updateGroupUrl(group.id, editingUrl.trim());
    }
    setEditingGroupId(null);
  };

  const firebaseExportJson = JSON.stringify(
    {
      _comment: 'Schema siap diimpor ke Firebase Firestore / Realtime DB',
      exportedAt: new Date().toISOString(),
      community: 'FSA Sharknoxza',
      broadcasts: broadcasts,
      groups: groups.map((g) => ({
        id: g.id,
        number: g.number,
        name: g.name,
        targetUrl: g.targetUrl,
        status: g.status,
        members: g.members,
        maxMembers: g.maxMembers
      }))
    },
    null,
    2
  );

  const copyFirebaseSchema = () => {
    navigator.clipboard.writeText(firebaseExportJson);
    setCopiedDbSchema(true);
    setTimeout(() => setCopiedDbSchema(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl executive-glass rounded-3xl p-4 sm:p-7 border border-cyan-500/40 max-h-[92vh] flex flex-col shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-heading">
                <span>FSA Sharknoxza Admin Panel</span>
                {isAdmin && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    Authorized Admin
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Kontrol siaran realtime, jadwal akses grup, & sinkronisasi database komunitas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logout}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-heading"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAdmin ? (
          /* Login Screen via Google Pop-up (No Input Text / Secure from XSS)[cite: 3] */
          <div className="py-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Autentikasi Pengurus Resmi</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Gunakan akun Google resmi yang terdaftar untuk mengakses seluruh halaman kontrol panel eksklusif.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{authLoading ? 'Memproses Google Login...' : 'Login dengan Google Admin'}</span>
            </button>
          </div>
        ) : (
          /* Authenticated Dashboard: Seluruh halaman dan fitur perubahan data di bawah ini */
          <div className="flex-1 flex flex-col min-h-0 pt-4">
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 shrink-0 overflow-x-auto scrollbar-none flex-nowrap">
              <button
                type="button"
                onClick={() => setAdminTab('broadcast')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  adminTab === 'broadcast'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Rilis Siaran Realtime</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('groups')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  adminTab === 'groups'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Manajemen 11 Grup ({groups.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('schedule')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  adminTab === 'schedule'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Jadwal Seleksi DB</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('firebase')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  adminTab === 'firebase'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Database Firebase Ready</span>
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerDemoBroadcast}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-[11px] font-medium transition-colors cursor-pointer"
                  title="Simulasikan kedatangan pengumuman baru dari luar"
                >
                  Test Notif Pop-up
                </button>
              </div>
            </div>

            {/* Sub-Tab 1: Broadcast Release */}
            {adminTab === 'broadcast' && (
              <div className="overflow-y-auto pr-1 flex-1 py-4 space-y-6">
                {broadcastSentSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Siaran berhasil dikirim! Notifikasi pop-up telah meluncur di web dan disebarkan ke perangkat.
                    </span>
                  </div>
                )}

                <form onSubmit={handleCreateBroadcast} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Judul Pengumuman
                      </label>
                      <input
                        type="text"
                        value={bcTitle}
                        onChange={(e) => setBcTitle(e.target.value)}
                        placeholder="e.g. Scrim Akbar FSA Malam Ini"
                        required
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Kategori Siaran
                      </label>
                      <input
                        type="text"
                        value={bcCategory}
                        onChange={(e) => setBcCategory(e.target.value)}
                        placeholder="Turnamen / Kebijakan / Info"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Isi Pesan Siaran / Broadcast
                    </label>
                    <textarea
                      rows={3}
                      value={bcContent}
                      onChange={(e) => setBcContent(e.target.value)}
                      placeholder="Tuliskan detail pengumuman yang ingin disampaikan ke seluruh member..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Tingkat Prioritas
                      </label>
                      <select
                        value={bcPriority}
                        onChange={(e) => setBcPriority(e.target.value as 'urgent' | 'important' | 'info')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      >
                        <option value="urgent">Mendesak (Urgent)</option>
                        <option value="important">Penting (Important)</option>
                        <option value="info">Informasi Umum (Info)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Nama Pengirim
                      </label>
                      <input
                        type="text"
                        value={bcAuthor}
                        onChange={(e) => setBcAuthor(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Jabatan Pengirim
                      </label>
                      <input
                        type="text"
                        value={bcRole}
                        onChange={(e) => setBcRole(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Tautan Aksi (Opsional Hyperlink)
                      </label>
                      <input
                        type="text"
                        value={bcActionUrl}
                        onChange={(e) => setBcActionUrl(e.target.value)}
                        placeholder="https://fsa.my.id/group1 atau link eksternal"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Teks Tombol Aksi (Opsional)
                      </label>
                      <input
                        type="text"
                        value={bcActionText}
                        onChange={(e) => setBcActionText(e.target.value)}
                        placeholder="e.g. Buka Tautan Grup"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Broadcast Realtime Sekarang</span>
                  </button>
                </form>

                {/* Broadcasts History in Admin */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white">
                      Daftar Siaran Tersimpan ({broadcasts.length})
                    </h4>
                    {broadcasts.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllBroadcasts}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Hapus Seluruh Siaran"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus Semua Siaran</span>
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {broadcasts.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white truncate">{b.title}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                              {b.priority}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1">{b.content}</p>
                          <span className="text-[11px] text-slate-500 mt-1 block">
                            {b.author} ({b.authorRole}) · {b.timestamp}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteBroadcast(b.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                          title="Hapus Siaran Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {broadcasts.length === 0 && (
                      <div className="text-center py-6 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-400 text-xs font-mono">
                        Belum ada siaran aktif. Seluruh siaran bersih.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Groups Scheduling & Link Management */}
            {adminTab === 'groups' && (
              <div className="overflow-y-auto pr-1 flex-1 py-4 space-y-4">
                <p className="text-xs text-slate-300">
                  Atur status buka/tutup (open/closed/scheduled) dan tautan hyperlink untuk seluruh 11 grup FSA Sharknoxza:
                </p>

                <div className="space-y-3">
                  {groups.map((group) => {
                    const isEditing = editingGroupId === group.id;

                    return (
                      <div
                        key={group.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              #{String(group.number).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-bold text-white truncate">
                              {group.name}
                            </span>
                          </div>

                          {/* Editable URL */}
                          {isEditing ? (
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="text"
                                value={editingUrl}
                                onChange={(e) => setEditingUrl(e.target.value)}
                                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-400 text-xs text-cyan-200 flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveGroupUrl(group)}
                                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                              >
                                Simpan
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingGroupId(null)}
                                className="px-2 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs cursor-pointer"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span className="font-mono text-cyan-300">{group.targetUrl}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingGroupId(group.id);
                                  setEditingUrl(group.targetUrl);
                                }}
                                className="text-[11px] text-slate-400 hover:text-white underline ml-1 cursor-pointer"
                              >
                                Ubah Link
                              </button>
                            </div>
                          )}

                          {group.scheduleNote && (
                            <p className="text-[11px] text-amber-300/80 mt-1 italic">
                              Catatan Jadwal: {group.scheduleNote}
                            </p>
                          )}
                        </div>

                        {/* Status Toggle Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateGroupStatus(group.id, 'open')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              group.status === 'open'
                                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Buka (Open)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateGroupStatus(group.id, 'closed')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              group.status === 'closed'
                                ? 'bg-rose-500/25 text-rose-300 border border-rose-400/50'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Tutup</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const note = prompt('Masukkan catatan jadwal:', group.scheduleNote || 'Dibuka saat turnamen berjalan');
                              updateGroupStatus(group.id, 'scheduled', note || undefined);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              group.status === 'scheduled'
                                ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Jadwalkan</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Pengaturan Jadwal Seleksi Firestore */}
            {adminTab === 'schedule' && (
              <div className="overflow-y-auto pr-1 flex-1 py-4 space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Kontrol Jadwal & Waktu Seleksi Komunitas</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Pengaturan di sini langsung tersimpan ke Firestore database (`settings/selection_schedule`) dan mengontrol status halaman Our Group secara real-time.
                  </p>
                </div>

                {scheduleFetching ? (
                  <p className="text-xs font-mono text-cyan-400 animate-pulse py-6 text-center">Memuat konfigurasi dari database...</p>
                ) : (
                  <form onSubmit={handleSaveSchedule} className="space-y-4">
                    {/* Status Toggle Manual */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div>
                        <span className="block text-xs font-bold text-white">Override Status Seleksi (Manual)</span>
                        <span className="text-[11px] text-slate-400">Paksa buka atau tutup status pendaftaran.</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectionIsOpen}
                          onChange={(e) => setSelectionIsOpen(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    {/* Waktu Mulai & Selesai */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-400" /> Waktu Mulai Buka
                        </label>
                        <input
                          type="datetime-local"
                          value={openTime}
                          onChange={(e) => setOpenTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-rose-400" /> Waktu Batas Tutup
                        </label>
                        <input
                          type="datetime-local"
                          value={closeTime}
                          onChange={(e) => setCloseTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Pesan Pengumuman */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Pesan Pengumuman (Tampil saat seleksi ditutup)
                      </label>
                      <textarea
                        rows={3}
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="Contoh: Pendaftaran gelombang 1 sudah ditutup. Nantikan gelombang berikutnya!"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={scheduleLoading}
                      className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20"
                    >
                      <Save className="w-4 h-4" />
                      <span>{scheduleLoading ? 'Menyimpan ke Firestore...' : 'Simpan Perubahan Jadwal Seleksi'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Sub-Tab 4: Firebase Integration Readiness */}
            {adminTab === 'firebase' && (
              <div className="overflow-y-auto pr-1 flex-1 py-4 space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-1">
                    <Database className="w-4 h-4" />
                    <span>Integrasi Firebase Firestore / Cloud DB</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Struktur data di web ini telah disiapkan sepenuhnya untuk dihubungkan langsung ke database Firebase Firestore
                    maupun Realtime Database tanpa perlu merombak komponen.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Skema JSON Data Komunitas FSA Sharknoxza:
                  </span>
                  <button
                    type="button"
                    onClick={copyFirebaseSchema}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedDbSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDbSchema ? 'Tersalin ke Clipboard!' : 'Salin Skema JSON'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 font-mono text-[11px] text-cyan-200/90 overflow-x-auto max-h-72">
                  {firebaseExportJson}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>{COMMUNITY_INFO.watermark.brand}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
          >
            {t('partner.closeModal')}
          </button>
        </div>
      </div>
    </div>
  );
};
