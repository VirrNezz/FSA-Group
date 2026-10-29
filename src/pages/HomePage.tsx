import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { COMMUNITY_INFO, SOCIAL_LINKS, FAQ_LIST } from '../data/communityData';
import {
  ChevronDown,
  ExternalLink,
  Globe2,
  MessageCircle,
  Copy,
  Check,
  Shield,
  Layers,
  Radio,
  Users
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenClock: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenClock }) => {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedSocialId, setCopiedSocialId] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedSocialId(id);
    setTimeout(() => setCopiedSocialId(null), 2000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      default:
        return <Globe2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div 
      className="space-y-24 pb-20 relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: "linear-gradient(to bottom, rgba(3, 7, 18, 0.88), rgba(3, 7, 18, 0.95)), url('/backgrounds/Home.jpeg')" 
      }}
    >
      {/* Executive Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-5xl mx-auto text-center px-4">
          {/* Refined Eyebrow - Clean unboxed typography */}
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono tracking-[0.2em] uppercase text-cyan-300 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Portal Resmi Komunitas</span>
            <span className="text-slate-600">·</span>
            <span>Ekosistem Digital Apex</span>
          </div>

          {/* Community Name */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent font-heading break-words max-w-full">
            {COMMUNITY_INFO.name}
          </h1>

          {/* Motto - Closely positioned under community name */}
          <p className="mt-3.5 text-sm sm:text-lg md:text-xl font-medium tracking-wide text-cyan-300/90 italic font-heading px-2">
            "{language === 'id' ? COMMUNITY_INFO.motto : COMMUNITY_INFO.mottoEn}"
          </p>

          {/* Narrative overview */}
          <p className="mt-5 text-xs sm:text-sm md:text-base text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            {language === 'id' ? COMMUNITY_INFO.about.id : COMMUNITY_INFO.about.en}
          </p>

          {/* Interactive Fast Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-2">
            <button
              onClick={() => onNavigate('groups')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <Users className="w-4 h-4" />
              <span>Jelajahi 11 Grup Divisi</span>
            </button>
            <button
              onClick={() => onNavigate('broadcast')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-400/40 font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Buka Saluran Siaran</span>
            </button>
          </div>


        </div>
      </section>

      {/* Strategic Charter: Vision & Mission Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
            Pondasi Organisasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            {t('section.vision.title')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal">
            {t('section.about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Vision Card (Left 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 executive-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-cyan-500/25 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle corner specular sheen */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-400/5 rounded-full filter blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-400 mb-2 font-semibold">
                {t('section.vision.heading')}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight font-heading">
                Pilar Aspirasi FSA Sharknoxza
              </h3>
              <p className="text-sm text-slate-300/90 leading-relaxed font-normal">
                {language === 'id' ? COMMUNITY_INFO.vision.id : COMMUNITY_INFO.vision.en}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between font-mono">
              <span>Executive Charter</span>
              <span className="text-cyan-400 font-medium">Solidarity Principles</span>
            </div>
          </motion.div>

          {/* Missions List (Right 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 executive-card rounded-3xl p-7 sm:p-8 border border-white/[0.08] shadow-2xl"
          >
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-sky-400 mb-2 font-semibold">
              {t('section.mission.heading')}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight font-heading">
              Langkah Strategis Memajukan Komunitas
            </h3>

            <div className="space-y-3.5">
              {COMMUNITY_INFO.missions.map((mission, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all flex items-start gap-4 group"
                >
                  <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider pt-0.5 shrink-0">
                    0{idx + 1}.
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
                    {language === 'id' ? mission.id : mission.en}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Hyperlinks Table / Cards Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
            Saluran Komunikasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('section.social.title')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            {t('section.social.subtitle')}
          </p>
        </div>

        {/* Clean Luxury Communication Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SOCIAL_LINKS.map((item, idx) => {
            const isCopied = copiedSocialId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="executive-card rounded-3xl p-6 sm:p-7 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.1] flex items-center justify-center shadow-inner group-hover:border-cyan-400/30 transition-colors">
                        {getSocialIcon(item.platform)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors font-heading">
                          {item.name}
                        </h3>
                        <span className="text-xs font-mono text-cyan-300">{item.handle}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-200 border border-white/[0.08] hover:border-cyan-400/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer font-heading"
                  >
                    <span>Buka Tautan Resmi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopyLink(item.id, item.url)}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                    title="Salin Tautan"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive FAQ Section with Hairline Dividers */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" id="faq">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
            Pusat Informasi
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            {t('section.faq.title')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal">
            {t('section.faq.subtitle')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="divide-y divide-white/[0.08] executive-glass rounded-3xl border border-white/[0.08] p-4 sm:p-6 shadow-2xl"
        >
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div key={index} className="py-4 first:pt-2 last:pb-2">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-2 flex items-center justify-between gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-cyan-400/90 font-semibold">
                      0{index + 1}.
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-200 transition-colors font-heading">
                      {language === 'id' ? faq.question.id : faq.question.en}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-300' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 pl-7 pr-4 text-xs sm:text-sm text-slate-300/90 leading-relaxed animate-in fade-in duration-200 font-normal">
                    {language === 'id' ? faq.answer.id : faq.answer.en}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Watermark Footer */}
      <footer className="max-w-5xl mx-auto px-4 pt-12 border-t border-white/[0.08] text-center">
        <div className="flex items-center justify-center text-xs text-slate-400 font-mono">
          <span>{COMMUNITY_INFO.watermark.brand} © {COMMUNITY_INFO.watermark.year}</span>
          <span className="mx-2 text-slate-600">·</span>
          <span>{t('footer.watermark')}</span>
        </div>
      </footer>
    </div>
  );
};
