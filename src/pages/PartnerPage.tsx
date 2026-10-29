import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CommunityPartner } from '../types';
import { COMMUNITY_PARTNERS } from '../data/communityData';
import { useLanguage } from '../context/LanguageContext';
import {
  Handshake,
  ExternalLink,
  ChevronRight,
  X,
  Globe,
  ArrowUpRight,
  ImageIcon
} from 'lucide-react';

export const PartnerPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPartner, setSelectedPartner] = useState<CommunityPartner | null>(null);

  // State untuk background custom dari folder public di halaman Partner
  const [currentBg, setCurrentBg] = useState<string>('/backgrounds/Pages.jpeg');

  const backgroundOptions = [
    { label: 'Cyber HQ', path: '/backgrounds/fsa_cyber_headquarters.jpg' },
    { label: 'Digital Hub', path: '/backgrounds/community_digital_hub.jpg' },
    { label: 'Aquatic Lounge', path: '/backgrounds/furry_aquatic_lounge.jpg' }
  ];

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20 min-h-screen rounded-3xl bg-fixed bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.92), rgba(3, 7, 18, 0.97)), url('${currentBg}')` 
      }}
    >
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
          Konsorsium & Aliansi Strategis
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          {t('partner.title')}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl mx-auto font-normal">
          {t('partner.subtitle')}
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

      {/* Interactive Expandable Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMMUNITY_PARTNERS.map((partner, idx) => {
          const isSelected = selectedPartner?.id === partner.id;

          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedPartner(partner)}
              className={`executive-card rounded-3xl p-7 border transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-xl ${
                isSelected
                  ? 'border-cyan-400 ring-1 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
                  : 'border-white/[0.08] hover:border-cyan-400/40'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-extrabold text-lg shadow-sm font-heading">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors font-heading">
                      {partner.name}
                    </h3>
                    <div className="text-xs text-cyan-400 font-mono mt-0.5">
                      {partner.category}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500 shrink-0">
                  EST. {partner.established}
                </span>
              </div>

              {/* Collaboration Focus */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
                  Fokus Sinergi Kerjasama:
                </div>
                <div className="text-xs sm:text-sm font-semibold text-cyan-200">
                  {partner.collaboration}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-5 font-normal">
                {partner.shortDesc}
              </p>

              {/* Tags - Unboxed clean text metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-5 font-mono">
                {partner.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <span>#{tag}</span>
                    {idx < partner.tags.length - 1 && <span className="text-slate-600">·</span>}
                  </span>
                ))}
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-heading">
                  <span>Buka Berkas Kerjasama & Tautan</span>
                  <ChevronRight className="w-4 h-4" />
                </span>

                <span className="text-xs text-slate-500 font-mono">
                  {partner.links.length} Tautan Tersedia
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal / Drawer as Requested */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-cyan-400/30 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-extrabold text-2xl shadow-lg">
                  {selectedPartner.logo}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-0.5">
                    {selectedPartner.category} · Berdiri Sejak {selectedPartner.established}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Detail Mitra"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-5 text-sm text-slate-300">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
                  Detail Kolaborasi & Sinergi
                </h4>
                <p className="text-white font-semibold text-base mb-2">
                  {selectedPartner.collaboration}
                </p>
                <p className="leading-relaxed text-slate-300/90 font-normal">
                  {selectedPartner.fullDesc}
                </p>
              </div>

              {/* Tags */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xs font-mono text-slate-400 mb-2">Domain & Keahlian Mitra:</div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300">
                  {selectedPartner.tags.map((t, idx) => (
                    <span key={idx} className="flex items-center gap-2">
                      <span>#{t}</span>
                      {idx < selectedPartner.tags.length - 1 && <span className="text-slate-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Multiple Direct Hyperlink Buttons as strictly required */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-3">
                  {t('partner.directLinks')} ({selectedPartner.links.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPartner.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-400/40 text-white font-semibold text-xs flex items-center justify-between transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Kemitraan Resmi FSA Sharknoxza
              </span>
              <button
                onClick={() => setSelectedPartner(null)}
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
