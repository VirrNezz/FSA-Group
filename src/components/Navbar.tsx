import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useBroadcast } from '../context/BroadcastContext';
import { useCountry } from '../context/CountryContext';
import { COMMUNITY_INFO } from '../data/communityData';
import {
  Bookmark,
  Clock,
  Languages,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Radio,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenClock: () => void;
  onOpenAdminPanel: () => void;
}

// Memoized isolated clock display: only re-renders the text digits every second, keeping Navbar 100% static & silky smooth
const LiveClockText: React.FC<{ iana: string; className?: string }> = React.memo(({ iana, className }) => {
  const [timeStr, setTimeStr] = useState(() => {
    try {
      return new Intl.DateTimeFormat('id-ID', {
        timeZone: iana || 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      return new Date().toLocaleTimeString('id-ID', { hour12: false });
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        setTimeStr(
          new Intl.DateTimeFormat('id-ID', {
            timeZone: iana || 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setTimeStr(new Date().toLocaleTimeString('id-ID', { hour12: false }));
      }
    };

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [iana]);

  return <span className={className}>{timeStr}</span>;
});

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenClock,
  onOpenAdminPanel
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { hasUnread, unreadCount } = useBroadcast();
  const { selectedCountry, openCountryModal } = useCountry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; labelKey: string }[] = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'groups', labelKey: 'nav.groups' },
    { id: 'broadcast', labelKey: 'nav.broadcast' },
    { id: 'partner', labelKey: 'nav.partner' },
    { id: 'admin', labelKey: 'nav.admin' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-slate-950/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-6 h-16 sm:h-20">
          
          {/* ========================================================================= */}
          {/* ZONE 1: BRAND IDENTITY (FSA SHARKNOXZA)                                    */}
          {/* Protected with shrink-0, clear typography hierarchy, and sleek cyber insignia */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3.5 text-left group cursor-pointer focus:outline-none shrink-0 transition-transform active:scale-95 duration-200"
              aria-label="Kembali ke Beranda FSA Sharknoxza"
            >
              {/* Official FSA Sharknoxza Community Photo / Crest */}
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl p-0.5 bg-gradient-to-br from-cyan-400/35 via-sky-500/15 to-transparent border border-cyan-400/50 shadow-[0_0_16px_rgba(34,211,238,0.25)] group-hover:border-cyan-300 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] transition-all shrink-0 overflow-hidden">
                <img
                  src={COMMUNITY_INFO.logoUrl || '/images/fsa_logo.jpg'}
                  alt={COMMUNITY_INFO.name}
                  decoding="async"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover object-center rounded-[9px] transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Micro Corner Accent */}
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] z-10" />
              </div>

              {/* Brand Typography Structure */}
              <div className="flex flex-col justify-center shrink-0">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-heading text-sm sm:text-base lg:text-lg font-black tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    FSA
                  </span>
                  <span className="font-heading text-sm sm:text-base lg:text-lg font-extrabold tracking-widest uppercase text-white group-hover:text-cyan-200 transition-colors">
                    SHARKNOXZA
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                  <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-cyan-300/80 font-medium whitespace-nowrap">
                    Official Community Hub
                  </p>
                </div>
              </div>
            </button>

            {/* Subtle Vertical Divider between Brand and Nav on Wide Screens */}
            <div className="hidden xl:block h-7 w-px bg-white/[0.12] mx-2" />
          </div>

          {/* ========================================================================= */}
          {/* ZONE 2: PRIMARY NAVIGATION BAR                                            */}
          {/* Clean, centered glass capsule with zero crowding & buttery smooth active  */}
          {/* ========================================================================= */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-inner shrink-0">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              const isBroadcast = link.id === 'broadcast';

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 tracking-wider whitespace-nowrap cursor-pointer text-xs font-heading font-bold uppercase select-none ${
                    isActive
                      ? 'text-cyan-200 font-extrabold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Smooth Sliding Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavActivePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-cyan-500/[0.16] to-sky-500/[0.06] border border-cyan-400/35 shadow-[0_0_16px_rgba(34,211,238,0.18)] -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32
                      }}
                    />
                  )}

                  <span className="relative z-10">{t(link.labelKey)}</span>

                  {/* Bookmark badge indicator when broadcast has unread */}
                  {isBroadcast && hasUnread && (
                    <span
                      title={`${unreadCount} ${t('broadcast.unreadBadge')}`}
                      className="relative z-10 inline-flex items-center justify-center text-cyan-400"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
                    </span>
                  )}

                  {/* Smooth Active Underline Glow */}
                  {isActive && (
                    <motion.span
                      layoutId="desktopNavActiveUnderline"
                      className="absolute -bottom-[2px] left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ========================================================================= */}
          {/* ZONE 3: EXECUTIVE QUICK ACTIONS & REGIONAL CLOCK (DESKTOP / TABLET)       */}
          {/* Streamlined, high-tech unified capsule to save space & look impeccable    */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2 xl:gap-2.5 shrink-0">
            
            {/* Unified Country & Live Regional Clock Capsule */}
            <div className="flex items-center rounded-xl bg-slate-900/80 border border-cyan-500/25 p-0.5 shadow-[0_0_16px_rgba(34,211,238,0.08)] hover:border-cyan-400/50 transition-colors">
              
              {/* Left Segment: Country Selector */}
              <button
                onClick={openCountryModal}
                className="px-2.5 py-1.5 rounded-lg hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap group"
                title={`Negara Terpilih: ${selectedCountry.nameId} (${selectedCountry.code}) · Klik untuk ganti negara`}
              >
                <span className="text-sm leading-none drop-shadow-sm group-hover:scale-110 transition-transform">
                  {selectedCountry.flag}
                </span>
                <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-cyan-300 group-hover:text-white">
                  {selectedCountry.code}
                </span>
                <Globe className="w-3 h-3 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
              </button>

              {/* Fine Segment Divider */}
              <div className="h-4 w-px bg-white/[0.12] mx-0.5" />

              {/* Right Segment: Live World/Regional Clock Trigger */}
              <button
                onClick={onOpenClock}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap group"
                title={`Waktu & Daerah ${selectedCountry.nameId} (${selectedCountry.code}). Klik untuk buka jam daerah lengkap`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <Clock className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                <LiveClockText
                  iana={selectedCountry.iana}
                  className="font-mono text-xs text-cyan-200 font-bold tabular-nums tracking-tight px-1.5 py-0.5 rounded bg-slate-950/80 border border-cyan-400/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                />
              </button>
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] hover:border-cyan-400/35 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              title={language === 'id' ? 'Switch language to English' : 'Ganti bahasa ke Bahasa Indonesia'}
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">{language}</span>
            </button>

            {/* Executive Admin Panel Launch Button (Langsung memicu popup login Google via onOpenAdminPanel) */}
            <button
              onClick={onOpenAdminPanel}
              className="px-3 xl:px-4 py-1.5 text-xs font-heading font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-white hover:to-cyan-200 rounded-xl transition-all shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-95 duration-150"
              title="Akses Portal Administrator & Manajemen Komunitas"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950 stroke-[2.2]" />
              <span className="tracking-wide uppercase text-[11px] font-black">{t('nav.adminPanel')}</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE CONTROLS (Flag + Live Time + Broadcast Alert + Hamburger)          */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Compact Mobile Country & Clock Pill */}
            <button
              onClick={onOpenClock}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/50 active:bg-cyan-900/80 border border-cyan-400/35 text-cyan-300 cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.15)]"
              title={`Waktu ${selectedCountry.code}. Ketuk untuk detail jam daerah`}
            >
              <span className="text-xs leading-none">{selectedCountry.flag}</span>
              <span className="font-heading text-[10px] text-cyan-300 font-extrabold uppercase">
                {selectedCountry.code}
              </span>
              <LiveClockText
                iana={selectedCountry.iana}
                className="font-mono text-[10px] text-cyan-100 font-bold tabular-nums"
              />
            </button>

            {/* Broadcast unread badge on mobile */}
            {hasUnread && (
              <button
                onClick={() => handleNavClick('broadcast')}
                className="p-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/40"
                aria-label="Lihat Siaran Baru"
              >
                <Bookmark className="w-4 h-4 fill-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
              </button>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.04] active:bg-white/[0.1] border border-white/[0.1] text-slate-300 hover:text-white transition-colors"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-300" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LUXURY GLASS DRAWER                                                */}
      {/* Clean expandable sheet with quick access to all links & controls           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden border-t border-white/[0.08] bg-slate-950/98 backdrop-blur-2xl px-4 py-5 space-y-4 max-w-full shadow-2xl"
          >
            {/* Brand Header inside Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-950/40 shrink-0">
                  <img
                    src={COMMUNITY_INFO.logoUrl || '/images/fsa_logo.jpg'}
                    alt={COMMUNITY_INFO.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-sm font-black text-cyan-400">FSA</span>
                  <span className="font-heading text-sm font-extrabold text-white tracking-wider">SHARKNOXZA</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-300/80 uppercase px-2 py-0.5 rounded-md bg-cyan-950/70 border border-cyan-500/30">
                Menu Navigasi
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                const isBroadcast = link.id === 'broadcast';

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative w-full text-left px-3.5 py-3 rounded-xl text-xs uppercase tracking-wider font-heading font-bold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-cyan-300 font-extrabold'
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileNavActivePill"
                        className="absolute inset-0 rounded-xl bg-cyan-500/15 border border-cyan-500/35 -z-10 shadow-[0_0_15px_rgba(34,211,238,0.18)]"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 32
                        }}
                      />
                    )}

                    <span className="flex items-center gap-2 relative z-10">
                      {t(link.labelKey)}
                    </span>

                    {isBroadcast && hasUnread ? (
                      <span className="relative z-10 flex items-center gap-1.5 text-[10px] text-cyan-300 font-semibold px-2 py-0.5 rounded-md bg-cyan-950/90 border border-cyan-500/40">
                        <Bookmark className="w-3 h-3 fill-cyan-400" />
                        <span>{unreadCount} baru</span>
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 relative z-10" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Responsive Executive Mobile Utility Cards */}
            <div className="pt-3 border-t border-white/[0.08] space-y-2.5">
              
              {/* Card 1: Regional Country Selector Trigger */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCountryModal();
                }}
                className="p-3 rounded-2xl bg-white/[0.03] active:bg-white/[0.07] border border-white/[0.08] flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl leading-none shrink-0 drop-shadow-sm group-hover:scale-110 transition-transform">
                    {selectedCountry.flag}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate font-heading">
                        {selectedCountry.nameId}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                        {selectedCountry.code}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Zona {selectedCountry.timeZone} · Ketuk untuk ganti negara
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-cyan-300 px-2.5 py-1 rounded-xl bg-cyan-950/70 border border-cyan-400/30 shrink-0 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pilih</span>
                </div>
              </div>

              {/* Row 2: World Clock with Live Time, Language, and Admin */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenClock();
                  }}
                  className="py-2.5 px-2 rounded-xl bg-cyan-950/45 active:bg-cyan-900/70 border border-cyan-400/35 text-slate-200 flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.12)]"
                >
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-heading font-extrabold text-cyan-300 uppercase">
                      {selectedCountry.code}
                    </span>
                  </div>
                  <LiveClockText
                    iana={selectedCountry.iana}
                    className="font-mono text-[10px] text-cyan-200 font-bold tabular-nums"
                  />
                </button>

                <button
                  onClick={toggleLanguage}
                  className="py-2.5 px-2 rounded-xl bg-white/[0.04] active:bg-white/[0.08] border border-white/[0.08] text-slate-200 flex flex-col items-center justify-center gap-1 font-mono uppercase transition-transform active:scale-95 cursor-pointer"
                >
                  <Languages className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-semibold">{language.toUpperCase()}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminPanel();
                  }}
                  className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold flex flex-col items-center justify-center gap-1 shadow-md shadow-cyan-500/25 transition-transform active:scale-95 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span className="text-[10px] font-heading font-black uppercase">Admin</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
