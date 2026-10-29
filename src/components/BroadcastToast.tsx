import React, { useEffect } from 'react';
import { useBroadcast } from '../context/BroadcastContext';
import { useLanguage } from '../context/LanguageContext';
import { PageTab } from '../types';
import { Bell, Bookmark, ArrowRight, X } from 'lucide-react';

interface BroadcastToastProps {
  onNavigate: (tab: PageTab) => void;
}

export const BroadcastToast: React.FC<BroadcastToastProps> = ({ onNavigate }) => {
  const { latestToast, dismissToast } = useBroadcast();
  const { t } = useLanguage();

  useEffect(() => {
    if (latestToast) {
      // Play a soft pleasant audio chime using Web Audio API
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        }
      } catch {
        // Audio auto-play policies might silent, gracefully ignored
      }

      // Auto dismiss after 9 seconds if not clicked
      const timer = setTimeout(() => {
        dismissToast();
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [latestToast, dismissToast]);

  if (!latestToast) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl animate-in fade-in slide-in-from-top-6 duration-300">
      <div className="executive-glass rounded-2xl p-4 shadow-2xl border border-cyan-400/40 text-slate-100 flex items-start gap-3.5 glow-cyan">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
          <Bookmark className="w-5 h-5 fill-cyan-400/30" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              {t('broadcast.unreadBadge')}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">{latestToast.timestamp}</span>
          </div>

          <h4 className="text-sm font-bold text-white truncate mb-1">
            {latestToast.title}
          </h4>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {latestToast.content}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                dismissToast();
                onNavigate('broadcast');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/40 text-xs font-semibold transition-colors"
            >
              <span>{t('broadcast.title')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={dismissToast}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors"
            >
              {t('partner.closeModal')}
            </button>
          </div>
        </div>

        <button
          onClick={dismissToast}
          aria-label="Tutup Notifikasi"
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
