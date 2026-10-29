import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCountry, COUNTRIES } from '../context/CountryContext';
import { COUNTRY_REGIONS, CountryRegionItem } from '../data/countryRegions';
import { WORLD_CITIES } from '../data/communityData';
import { Clock, Globe, X, Search, Sparkles, MapPin, ChevronDown, Check } from 'lucide-react';

interface WorldClockProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorldClockModal: React.FC<WorldClockProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { selectedCountry, setCountry } = useCountry();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'country' | 'global'>('country');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Only tick when modal is actually open to save CPU/battery
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset tab and dropdown on country change
  useEffect(() => {
    setActiveTab('country');
    setIsCountryDropdownOpen(false);
  }, [selectedCountry.code]);

  const activeCountryRegions: CountryRegionItem[] = useMemo(() => {
    return COUNTRY_REGIONS[selectedCountry.code] || COUNTRY_REGIONS.OTHER || [];
  }, [selectedCountry.code]);

  const filteredRegions = useMemo(() => {
    if (!searchTerm.trim()) return activeCountryRegions;
    const term = searchTerm.toLowerCase();
    return activeCountryRegions.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.subdivision.toLowerCase().includes(term) ||
        r.offsetLabel.toLowerCase().includes(term)
    );
  }, [activeCountryRegions, searchTerm]);

  const filteredGlobalCities = useMemo(() => {
    if (!searchTerm.trim()) return WORLD_CITIES;
    const term = searchTerm.toLowerCase();
    return WORLD_CITIES.filter(
      (c) =>
        c.city.toLowerCase().includes(term) ||
        c.region.toLowerCase().includes(term) ||
        c.offset.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  // Active country main time
  let countryFormattedTime = '--:--:--';
  let countryFormattedDate = '';
  try {
    countryFormattedTime = new Intl.DateTimeFormat('id-ID', {
      timeZone: selectedCountry.iana || 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(currentTime);

    countryFormattedDate = new Intl.DateTimeFormat('id-ID', {
      timeZone: selectedCountry.iana || 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(currentTime);
  } catch {
    countryFormattedTime = currentTime.toLocaleTimeString('id-ID', { hour12: false });
    countryFormattedDate = currentTime.toLocaleDateString('id-ID');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl executive-glass rounded-3xl p-3.5 sm:p-6 border border-white/15 max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-500/15 filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-blue-600/10 filter blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 pb-3 sm:pb-4 border-b border-white/10 shrink-0 relative z-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xl sm:text-2xl leading-none drop-shadow-sm">{selectedCountry.flag}</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-heading truncate">
                {t('clock.title')} · Daerah {selectedCountry.nameId}
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400/30">
                {selectedCountry.code}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">
              Menampilkan daftar zona waktu & waktu daerah di {selectedCountry.nameId} secara akurat real-time.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Country Active Clock Spotlight Card */}
        <div className="my-3 sm:my-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/80 to-blue-950/70 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.12)] shrink-0 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-1 flex-wrap">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Waktu Utama {selectedCountry.nameId}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300 font-mono text-[11px]">{selectedCountry.timeZone}</span>
              </div>
              <div className="text-xs text-slate-300 capitalize flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                <span className="truncate">{countryFormattedDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-200 tracking-wider tabular-nums drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
                {countryFormattedTime}
              </div>

              {/* Quick Country Change Trigger */}
              <div className="relative">
                <button
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/15 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                  title="Ganti negara untuk melihat waktu daerahnya"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ganti Negara</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Country Quick Picker Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 max-h-60 overflow-y-auto rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl p-1.5 z-50 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10">
                      Pilih Negara Tujuan:
                    </div>
                    {COUNTRIES.map((c) => {
                      const isSelected = c.code === selectedCountry.code;
                      return (
                        <button
                          key={c.code}
                          onClick={() => {
                            setCountry(c);
                            setIsCountryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base leading-none">{c.flag}</span>
                            <span className="truncate">{c.nameId}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab & Search Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3 shrink-0 relative z-10">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('country')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'country'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/35 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{selectedCountry.flag}</span>
              <span>Daerah {selectedCountry.nameId} ({activeCountryRegions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('global')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'global'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/35 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Kota Dunia ({WORLD_CITIES.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeTab === 'country'
                  ? `Cari kota/daerah di ${selectedCountry.nameId}...`
                  : 'Cari kota dunia...'
              }
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Regions Grid List - Scrollable */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-2.5 min-h-[240px] relative z-10 custom-scrollbar">
          {activeTab === 'country' ? (
            /* Selected Country Regions List */
            filteredRegions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredRegions.map((item) => {
                  let timeString = '--:--:--';
                  let dateString = '';
                  try {
                    timeString = new Intl.DateTimeFormat('id-ID', {
                      timeZone: item.timeZone,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    }).format(currentTime);

                    dateString = new Intl.DateTimeFormat('id-ID', {
                      timeZone: item.timeZone,
                      day: 'numeric',
                      month: 'short'
                    }).format(currentTime);
                  } catch {
                    timeString = currentTime.toLocaleTimeString('id-ID', { hour12: false });
                    dateString = currentTime.toLocaleDateString('id-ID');
                  }

                  return (
                    <div
                      key={item.name}
                      className={`p-3 rounded-2xl liquid-glass border transition-all duration-200 hover:scale-[1.01] ${
                        item.isCapital
                          ? 'border-cyan-400/40 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-900/70 shadow-[0_0_15px_rgba(34,211,238,0.08)]'
                          : 'border-white/10 bg-slate-900/50 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base leading-none shrink-0">{selectedCountry.flag}</span>
                          <span className="text-sm font-extrabold text-white tracking-tight truncate font-heading">
                            {item.name}
                          </span>
                          {item.isCapital && (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold shrink-0">
                              Pusat
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 shrink-0">
                          {item.offsetLabel}
                        </span>
                      </div>

                      <div className="flex items-end justify-between pt-1 gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] text-slate-400 truncate">
                            {item.subdivision}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {dateString}
                          </span>
                        </div>
                        <span className="text-lg sm:text-xl font-bold font-mono tracking-wider tabular-nums text-cyan-200 shrink-0">
                          {timeString}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Tidak ada daerah yang cocok dengan kata kunci &quot;{searchTerm}&quot; di {selectedCountry.nameId}.
              </div>
            )
          ) : (
            /* Global Cities List */
            filteredGlobalCities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredGlobalCities.map((item) => {
                  let timeString = '--:--:--';
                  let dateString = '';
                  try {
                    timeString = new Intl.DateTimeFormat('id-ID', {
                      timeZone: item.timeZone,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    }).format(currentTime);

                    dateString = new Intl.DateTimeFormat('id-ID', {
                      timeZone: item.timeZone,
                      day: 'numeric',
                      month: 'short'
                    }).format(currentTime);
                  } catch {
                    timeString = currentTime.toLocaleTimeString('id-ID', { hour12: false });
                    dateString = currentTime.toLocaleDateString('id-ID');
                  }

                  return (
                    <div
                      key={item.city}
                      className="p-3 rounded-2xl liquid-glass border border-white/10 bg-slate-900/50 hover:bg-slate-900/70 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base leading-none shrink-0" role="img" aria-label={item.region}>
                            {item.flag}
                          </span>
                          <span className="text-sm font-extrabold text-white tracking-tight truncate font-heading">
                            {item.city}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 shrink-0">
                          {item.offset}
                        </span>
                      </div>

                      <div className="flex items-end justify-between pt-1 gap-2">
                        <span className="text-[11px] text-slate-400 truncate">
                          {item.region} · {dateString}
                        </span>
                        <span className="text-lg sm:text-xl font-bold font-mono tracking-wider tabular-nums text-cyan-200 shrink-0">
                          {timeString}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Tidak ada kota dunia yang cocok dengan kata kunci &quot;{searchTerm}&quot;.
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-mono text-slate-400">
              Sinkronisasi 1s · Zona {selectedCountry.nameId} ({selectedCountry.code})
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            {t('partner.closeModal')}
          </button>
        </div>
      </div>
    </div>
  );
};
