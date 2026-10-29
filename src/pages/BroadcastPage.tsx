import React, { useEffect, useState, useRef } from 'react';
import { useBroadcast } from '../context/BroadcastContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Radio,
  Bell,
  Bookmark,
  CheckCheck,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Share2,
  Check,
  Pin,
  Send,
  MessageSquare,
  ArrowDown,
  Trash2,
  ImageIcon
} from 'lucide-react';

interface BroadcastPageProps {
  onOpenAdminPanel: () => void;
}

export const BroadcastPage: React.FC<BroadcastPageProps> = ({ onOpenAdminPanel }) => {
  const {
    broadcasts,
    hasUnread,
    unreadCount,
    isAdmin,
    markAllAsRead,
    clearAllBroadcasts,
    notificationPermission,
    requestNotificationPermission,
    triggerDemoBroadcast
  } = useBroadcast();
  const { t } = useLanguage();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // State untuk background custom dari folder public di halaman Broadcast
  const [currentBg, setCurrentBg] = useState<string>('/backgrounds/fsa_cyber_headquarters.jpg');

  const backgroundOptions = [
    { label: 'Cyber HQ', path: '/backgrounds/fsa_cyber_headquarters.jpg' },
    { label: 'Digital Hub', path: '/backgrounds/community_digital_hub.jpg' },
    { label: 'Aquatic Lounge', path: '/backgrounds/furry_aquatic_lounge.jpg' }
  ];

  // Automatically mark as read when user dwells on Broadcast page
  useEffect(() => {
    const timer = setTimeout(() => {
      markAllAsRead();
    }, 2500);
    return () => clearTimeout(timer);
  }, [markAllAsRead]);

  const handleShareBroadcast = (id: string, title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `[FSA Sharknoxza] ${title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title} - FSA Sharknoxza Portal`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const pinnedItem = broadcasts.find((b) => b.isPinned);

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-6 rounded-3xl bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.92), rgba(3, 7, 18, 0.97)), url('${currentBg}')` 
      }}
    >
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t('broadcast.liveIndicator')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3 font-heading">
          <span>{t('broadcast.title')}</span>
          {hasUnread && (
            <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.9)] animate-pulse" />
          )}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
          Papan saluran broadcast terpadu dengan alur log komunikasi realtime yang dapat di-scroll secara vertikal.
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

      {/* Main Single Broadcast Board / Chat Feed Table */}
      <div className="executive-glass rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col h-[560px] sm:h-[660px] lg:h-[720px] max-w-full relative">
        {/* Chat Board Channel Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-slate-950/85 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <MessageSquare className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" title="Online & Live Sync" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-heading">
                  FSA Sharknoxza Official Dispatch
                </h3>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 font-mono mt-0.5">
                <span>{broadcasts.length} Siaran Resmi</span>
                <span>·</span>
                <span className="text-emerald-400">Realtime Engine Aktif</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={requestNotificationPermission}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-mono ${
                notificationPermission === 'granted'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-cyan-300 border border-white/[0.08]'
              }`}
              title="Izin Notifikasi HP & Browser"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {notificationPermission === 'granted' ? 'Notif HP Aktif' : 'Izin Notifikasi'}
              </span>
            </button>

            {hasUnread && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Tandai Semua Sudah Dibaca"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Baca ({unreadCount})</span>
              </button>
            )}

            {/* Gated to Admin Only */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                {broadcasts.length > 0 && (
                  <button
                    onClick={clearAllBroadcasts}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-mono"
                    title="Hapus Semua Siaran"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hapus Semua</span>
                  </button>
                )}
                <button
                  onClick={onOpenAdminPanel}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-300 hover:bg-white text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Kirim Siaran</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pinned Sticky Banner (if any pinned item) */}
        {pinnedItem && (
          <div className="px-4 py-2.5 bg-amber-950/20 border-b border-amber-500/20 flex items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2 truncate text-slate-300">
              <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0 rotate-45" />
              <span className="font-semibold text-amber-300 shrink-0">Pesan Tersemat:</span>
              <span className="truncate text-white font-medium">{pinnedItem.title}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:inline">
              {pinnedItem.timestamp}
            </span>
          </div>
        )}

        {/* Channel Status Strip (All announcements uniform) */}
        <div className="px-4 py-2 bg-black/20 border-b border-white/[0.05] flex items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span className="text-cyan-300 font-semibold">Semua Pengumuman ({broadcasts.length})</span>
            <span className="hidden sm:inline">· Papan Informasi Resmi Komunitas</span>
          </div>

          <button
            onClick={triggerDemoBroadcast}
            className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Simulasi siaran baru meluncur"
          >
            <Sparkles className="w-3 h-3" />
            <span>Simulasi Notifikasi</span>
          </button>
        </div>

        {/* Scrollable Chat Message Feed (Vertical scroll in single table) */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
        >
          <div className="flex justify-center my-2">
            <div className="text-[11px] font-mono text-slate-500 tracking-wider uppercase">
              —— Saluran Siaran Terverifikasi FSA Sharknoxza ——
            </div>
          </div>

          {broadcasts.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3.5 group animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {/* Author Initial Monogram */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xs font-bold shrink-0 shadow-sm font-mono">
                {item.author.charAt(0)}
              </div>

              {/* Broadcast Message Card */}
              <div className="flex-1 max-w-2xl rounded-2xl p-4 sm:p-5 border border-white/[0.08] bg-slate-950/70 hover:border-cyan-500/30 transition-all shadow-md">
                {/* Header: Author & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {item.author}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[11px] font-mono text-cyan-300">
                      {item.authorRole}
                    </span>

                    {item.isPinned && (
                      <span className="text-[11px] text-amber-400 flex items-center gap-0.5" title="Disematkan">
                        <Pin className="w-3 h-3 rotate-45" />
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Message Title */}
                <h4 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug tracking-tight">
                  {item.title}
                </h4>

                {/* Message Content */}
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed whitespace-pre-line mb-4 font-normal">
                  {item.content}
                </p>

                {/* Hyperlink Button */}
                {item.actionUrl && (
                  <div className="mb-4">
                    <a
                      href={item.actionUrl}
                      target={item.actionUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-cyan-200 border border-white/[0.08] hover:border-cyan-400/40 text-xs font-semibold transition-all shadow-sm"
                    >
                      <span>{item.actionText || 'Buka Tautan Resmi'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Bubble Footer: Timestamp & Read Status */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.05] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.timestamp}</span>
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShareBroadcast(item.id, item.title)}
                      className="hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Salin / Bagikan"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3 h-3" />
                      )}
                      <span>{copiedId === item.id ? 'Tersalin' : 'Bagikan'}</span>
                    </button>

                    <span className="flex items-center gap-0.5 text-cyan-400" title="Terkirim & Terbaca">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {broadcasts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500 mb-4 shadow-inner">
                <MessageSquare className="w-6 h-6 text-cyan-400/60" />
              </div>
              <h3 className="text-white font-bold text-base mb-1 tracking-tight">
                Papan Siaran Belum Memiliki Pesan
              </h3>
              <p className="text-slate-400 max-w-md text-xs sm:text-sm font-normal leading-relaxed mb-5">
                Seluruh siaran sebelumnya telah dibersihkan. Pengumuman resmi terbaru dari Owner & Tim Administrator akan langsung ditampilkan di sini secara realtime.
              </p>
              {isAdmin && (
                <button
                  onClick={onOpenAdminPanel}
                  className="px-4 py-2 rounded-xl bg-cyan-300 hover:bg-white text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan Siaran Pertama</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Chat Board Footer Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950/80 border-t border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shrink-0 font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Saluran pengumuman resmi tersinkronisasi realtime</span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={scrollToBottom}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Gulir ke Bawah"
            >
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* Gated to Admin Only */}
            {isAdmin && (
              <button
                onClick={onOpenAdminPanel}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-300 hover:bg-white text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Tulis Pesan Siaran</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tambahkan default export untuk mencegah error Missing Export di Vite/Rolldown
export default BroadcastPage;
