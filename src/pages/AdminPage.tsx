import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AdminProfile } from '../types';
import { ADMIN_TEAM, COMMUNITY_INFO } from '../data/communityData';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  X,
  User,
  Crown,
  Instagram,
  Disc as DiscordIcon,
  MessageCircle,
  Mail,
  Github,
  Globe,
  ArrowUpRight
} from 'lucide-react';

interface AdminPageProps {
  onOpenAdminPanel: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onOpenAdminPanel }) => {
  const { t } = useLanguage();
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
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

        {/* Quick Access to Admin Panel */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onOpenAdminPanel}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center gap-2 cursor-pointer font-heading"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('admin.openPanel')} (Email Login)</span>
          </button>
        </div>
      </div>

      {/* Admin Cards Grid */}
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
                {/* Avatar and Role */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      loading="lazy"
                      decoding="async"
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

                {/* Short Character bio preview */}
                <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed line-clamp-3 mb-5 font-normal">
                  {admin.characterBio}
                </p>

                {/* Personality Traits - Unboxed text metadata */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400 mb-5">
                  {admin.personality.slice(0, 3).map((trait, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span>✦ {trait}</span>
                      {idx < 2 && <span className="text-slate-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA to Expand Card */}
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

      {/* Expandable Admin Detail Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="w-full max-w-2xl executive-glass rounded-3xl p-6 sm:p-8 border border-cyan-400/30 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
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
                aria-label="Tutup Profil Admin"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="py-5 space-y-5 text-sm text-slate-300">
              {/* Detailed Character Explanation */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{t('admin.characterTrait')} & Profil Kepemimpinan</span>
                </h4>
                <p className="text-slate-200 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06] text-xs sm:text-sm font-normal">
                  {selectedAdmin.characterBio}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
                  {t('admin.responsibilities')}
                </h4>
                <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed font-normal">
                  {selectedAdmin.responsibilities}
                </p>
              </div>

              {/* Personality Badges */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xs font-mono text-slate-400 mb-2">Ciri Khas & Gaya Kepemimpinan:</div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300">
                  {selectedAdmin.personality.map((p, idx) => (
                    <span key={idx} className="flex items-center gap-2">
                      <span>✦ {p}</span>
                      {idx < selectedAdmin.personality.length - 1 && <span className="text-slate-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hyperlink buttons */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-3">
                  Tautan & Kontak Langsung Pengurus
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

            {/* Modal Footer */}
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
