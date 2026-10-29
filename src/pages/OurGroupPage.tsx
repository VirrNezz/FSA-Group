import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CommunityGroup } from '../types';
import { useBroadcast } from '../context/BroadcastContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { doc, onSnapshot, getDoc, Timestamp } from 'firebase/firestore';
import {
  ExternalLink,
  Copy,
  Check,
  Lock,
  Unlock,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  X,
  Search,
  SlidersHorizontal,
  Clock,
  Phone,
  ShieldCheck,
  AlertCircle,
  ImageIcon
} from 'lucide-react';

export const OurGroupPage: React.FC = () => {
  const { groups } = useBroadcast();
  const { t } = useLanguage();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGroupModal, setSelectedGroupModal] = useState<CommunityGroup | null>(null);

  // State untuk background custom dari folder public di halaman OurGroup
  const [currentBg, setCurrentBg] = useState<string>('/backgrounds/Pages.jpeg');

  const backgroundOptions = [
    { label: 'Cyber HQ', path: '/backgrounds/fsa_cyber_headquarters.jpg' },
    { label: 'Digital Hub', path: '/backgrounds/community_digital_hub.jpg' },
    { label: 'Aquatic Lounge', path: '/backgrounds/furry_aquatic_lounge.jpg' }
  ];

  // State untuk Modal Verifikasi Nomor Telepon
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [targetGroupToJoin, setTargetGroupToJoin] = useState<CommunityGroup | null>(null);
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [isVerifiedLocally, setIsVerifiedLocally] = useState(false);

  // State untuk data jadwal & status seleksi dari Firestore
  const [selectionStatus, setSelectionStatus] = useState<{
    isCurrentlyOpen: boolean;
    openTime?: Date;
    closeTime?: Date;
    announcement: string;
  } | null>(null);
  const [selectionLoading, setSelectionLoading] = useState<boolean>(true);

  // Cek cache localStorage saat pertama kali load halaman
  useEffect(() => {
    const cachedPassed = localStorage.getItem('fsa_is_passed');
    if (cachedPassed === 'true') {
      setIsVerifiedLocally(true);
    }
  }, []);

  // Mengambil data real-time dari Firestore collection 'settings', document 'selection_schedule'
  useEffect(() => {
    const docRef = doc(db, "settings", "selection_schedule");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const now = new Date();
        
        const openTime: Date | undefined = data.openTime instanceof Timestamp ? data.openTime.toDate() : undefined;
        const closeTime: Date | undefined = data.closeTime instanceof Timestamp ? data.closeTime.toDate() : undefined;

        let isCurrentlyOpen = false;
        if (data.isOpen && openTime && closeTime) {
          isCurrentlyOpen = now >= openTime && now <= closeTime;
        }

        setSelectionStatus({
          isCurrentlyOpen,
          openTime,
          closeTime,
          announcement: data.announcement || "Pendaftaran belum dibuka."
        });
      } else {
        setSelectionStatus({ 
          isCurrentlyOpen: false, 
          announcement: "Konfigurasi jadwal belum dibuat di Firestore." 
        });
      }
      setSelectionLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCopyLink = (group: CommunityGroup) => {
    navigator.clipboard.writeText(group.targetUrl);
    setCopiedId(group.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJoinAction = (group: CommunityGroup) => {
    if (selectionStatus?.isCurrentlyOpen || isVerifiedLocally) {
      window.open(group.targetUrl, '_blank');
    } else {
      setTargetGroupToJoin(group);
      setPhoneNumberInput('');
      setVerifyError('');
      setShowVerifyModal(true);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumberInput.trim()) return;

    setVerifyLoading(true);
    setVerifyError('');

    try {
      const docRef = doc(db, "verified_members", phoneNumberInput.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().isPassed) {
        localStorage.setItem('fsa_verified_phone', phoneNumberInput.trim());
        localStorage.setItem('fsa_is_passed', 'true');
        setIsVerifiedLocally(true);

        alert('Verifikasi Berhasil! Akses grup dibuka.');
        setShowVerifyModal(false);

        if (targetGroupToJoin) {
          window.open(targetGroupToJoin.targetUrl, '_blank');
        }
      } else {
        setVerifyError('Nomor telepon belum terdaftar atau belum lulus seleksi.');
      }
    } catch (error: any) {
      setVerifyError('Terjadi kesalahan koneksi: ' + error.message);
    } finally {
      setVerifyLoading(false);
    }
  };

  const filteredGroups = groups.filter((g) => {
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'open'
        ? g.status === 'open'
        : g.status === 'closed' || g.status === 'scheduled';
    const matchesSearch =
      g.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      g.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div 
      className="min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat transition-all duration-500 pb-20"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.92), rgba(3, 7, 18, 0.97)), url('${currentBg}')` 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto pt-4">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
            Jejaring 11 Divisi Resmi
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            {t('groups.title')}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl mx-auto font-normal">
            {t('groups.subtitle')}
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
        </div>

        {/* --- SECTIONS STATUS SELEKSI DARI FIRESTORE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="executive-glass rounded-3xl p-6 border border-white/[0.08] shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-1">
                Live Database Status
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                Status Seleksi & Pendaftaran Komunitas
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {isVerifiedLocally && (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Terverifikasi Perangkat 📱</span>
                </span>
              )}

              {!selectionLoading && selectionStatus && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-mono border ${
                  selectionStatus.isCurrentlyOpen 
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${selectionStatus.isCurrentlyOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  <span>{selectionStatus.isCurrentlyOpen ? 'SELEKSI DIBUKA 🟢' : 'SELEKSI DITUTUP 🔴'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.08]">
            {selectionLoading ? (
              <p className="text-xs font-mono text-slate-400 animate-pulse">Memuat jadwal dari Firestore...</p>
            ) : selectionStatus?.isCurrentlyOpen ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Pendaftaran ditutup pada: <strong className="text-white">{selectionStatus.closeTime?.toLocaleString('id-ID')}</strong></span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-300">
                  📢 {selectionStatus?.announcement}
                </p>
                {selectionStatus?.openTime && (
                  <p className="text-[11px] text-slate-400 font-mono">
                    Dibuka kembali pada: <span className="text-cyan-300">{selectionStatus.openTime.toLocaleString('id-ID')}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Executive Control Bar: Search & Status Filters */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="executive-glass rounded-2xl p-4 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari divisi, kategori, atau nomor #01 - #11..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/60 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-heading ${
                filterStatus === 'all' ? 'bg-white/[0.1] text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('groups.filterAll')}
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-heading ${
                filterStatus === 'open' ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('groups.filterOpen')}
            </button>
          </div>
        </motion.div>

        {/* Horizontal Side-by-Side Strip */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span className="flex items-center gap-2 text-cyan-300">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t('groups.scrollHint')}</span>
            </span>
            <span className="text-slate-500">
              {filteredGroups.length} / {groups.length} Divisi Aktif
            </span>
          </div>

          <div className="overflow-x-auto pb-4 pt-1 flex gap-4 sm:gap-5 snap-x scrollbar-thin max-w-full">
            {filteredGroups.map((group, idx) => {
              const isCopied = copiedId === group.id;
              const isOpen = group.status === 'open' || selectionStatus?.isCurrentlyOpen || isVerifiedLocally;

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: (idx % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[84vw] max-w-[340px] sm:w-[360px] shrink-0 snap-start executive-card rounded-3xl p-5 sm:p-6 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                        DIVISI #{String(group.number).padStart(2, '0')}
                      </span>

                      <div className="flex items-center gap-1.5 text-[11px] font-medium">
                        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                        <span className={isOpen ? 'text-emerald-300' : 'text-rose-400'}>
                          {isOpen ? t('groups.status.open') : t('groups.status.closed')}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-200 transition-colors">
                      {group.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
                      <span className="text-cyan-400">{group.platform}</span>
                      <span>·</span>
                      <span>{group.category}</span>
                    </div>

                    <p className="text-xs text-slate-300/85 leading-relaxed line-clamp-3 mb-4 font-normal">
                      {group.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05] font-mono text-[11px] text-cyan-300/90 truncate mb-4">
                      {group.targetUrl}
                    </div>
                  </div>

                  {/* Card Actions dengan proteksi verifikasi telepon */}
                  <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleJoinAction(group)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isOpen || isVerifiedLocally
                            ? 'bg-cyan-300 hover:bg-white text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                      >
                        <span>{isOpen || isVerifiedLocally ? t('groups.joinBtn') : 'Verifikasi No. Telp 🔒'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleCopyLink(group)}
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                        title={t('groups.copyBtn')}
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedGroupModal(group)}
                      className="w-full py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1 cursor-pointer font-mono"
                    >
                      <Info className="w-3 h-3" />
                      <span>Detail & Panduan Masuk</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- MODAL VERIFIKASI NOMOR TELEPON --- */}
        {showVerifyModal && targetGroupToJoin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md executive-glass rounded-3xl p-6 sm:p-7 border border-cyan-400/40 shadow-2xl relative">
              <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">VERIFIKASI SELEKSI KELOMPOK</span>
                  <h3 className="text-lg font-bold text-white mt-1 font-heading">
                    {targetGroupToJoin.name}
                  </h3>
                </div>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Seleksi saat ini sedang ditutup. Masukkan nomor telepon (WhatsApp) yang terdaftar untuk membuka akses eksklusif ke grup ini. Perangkat Anda akan diingat otomatis.
              </p>

              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phoneNumberInput}
                    onChange={(e) => setPhoneNumberInput(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {verifyError && (
                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{verifyError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={verifyLoading}
                  className="w-full py-3 rounded-xl bg-cyan-300 hover:bg-white text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer font-heading shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{verifyLoading ? 'Memeriksa Database...' : 'Verifikasi & Buka Akses Grup 🚀'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Group Detail Modal */}
        {selectedGroupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-lg executive-glass rounded-3xl p-6 sm:p-7 border border-cyan-400/30 shadow-2xl relative">
              <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    DIVISI #{String(selectedGroupModal.number).padStart(2, '0')} · {selectedGroupModal.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 font-heading">
                    {selectedGroupModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedGroupModal(null)}
                  className="p-1.5 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed font-normal">{selectedGroupModal.description}</p>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platform:</span>
                    <span className="text-white font-semibold">{selectedGroupModal.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status Akses:</span>
                    <span className="text-cyan-300 font-semibold uppercase">{selectedGroupModal.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tautan Resmi:</span>
                    <span className="text-cyan-300 truncate max-w-[220px]">{selectedGroupModal.targetUrl}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedGroupModal(null);
                    handleJoinAction(selectedGroupModal);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-300 hover:bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-heading"
                >
                  <span>Akses Tautan Grup</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedGroupModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold cursor-pointer font-heading"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurGroupPage;
