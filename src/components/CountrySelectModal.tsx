import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Search, Check, Sparkles, X, MapPin } from 'lucide-react';
import { COUNTRIES, CountryOption, useCountry } from '../context/CountryContext';
import { useLanguage } from '../context/LanguageContext';

export const CountrySelectModal: React.FC = () => {
  const { selectedCountry, setCountry, isCountryModalOpen, closeCountryModal } = useCountry();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [tempSelected, setTempSelected] = useState<CountryOption>(selectedCountry);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Only tick when modal is actually open to save CPU/battery
  React.useEffect(() => {
    if (!isCountryModalOpen) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isCountryModalOpen]);

  // Sync tempSelected with selectedCountry when opened
  React.useEffect(() => {
    if (isCountryModalOpen) {
      setTempSelected(selectedCountry);
    }
  }, [isCountryModalOpen, selectedCountry]);

  const formatCountryTime = (iana: string) => {
    try {
      return new Intl.DateTimeFormat('id-ID', {
        timeZone: iana || 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(currentTime);
    } catch {
      return currentTime.toLocaleTimeString('id-ID', { hour12: false });
    }
  };

  const filterCategories = [
    { id: 'all', label: language === 'id' ? 'Semua Wilayah' : 'All Regions' },
    { id: 'Asia Tenggara', label: 'Asia Tenggara' },
    { id: 'Asia Timur', label: 'Asia Timur' },
    { id: 'Eropa', label: 'Eropa' },
    { id: 'Amerika Utara', label: 'Amerika' },
  ];

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((country) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        country.nameId.toLowerCase().includes(query) ||
        country.nameEn.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dialCode.toLowerCase().includes(query);

      const matchesRegion =
        selectedFilter === 'all' || country.region === selectedFilter;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedFilter]);

  const handleCountryClick = (country: CountryOption) => {
    setTempSelected(country);
    setCountry(country);
    closeCountryModal();
  };

  const handleConfirm = () => {
    setCountry(tempSelected);
    closeCountryModal();
  };

  if (!isCountryModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeCountryModal}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md -z-10"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-slate-900/95 border border-white/10 rounded-3xl p-4 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Subtle glowing ambient lights */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button (top right) */}
          <button
            onClick={closeCountryModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] shrink-0">
              <Globe className="w-6 h-6 animate-spin-slow text-cyan-300" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest font-semibold">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>
                  {language === 'id' ? 'Konfirmasi Kunjungan Pertama' : 'First Visit Regional Setup'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-heading">
                {language === 'id' ? 'Dari Mana Asal Negara Anda?' : 'Where Are You Visiting From?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {language === 'id'
                  ? 'Pilih negara domisili atau wilayah Anda untuk menyesuaikan preferensi zona waktu, komunitas, dan koneksi regional.'
                  : 'Select your home country or territory to personalize timezone, community groups, and regional preferences.'}
              </p>
            </div>
          </div>

          {/* Search & Quick Filter Bar */}
          <div className="space-y-3 mb-5">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'id'
                    ? 'Cari nama negara (Indonesia, Malaysia, Japan, USA...)'
                    : 'Search country name or code...'
                }
                className="w-full bg-slate-950/70 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded-md bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3 py-1 rounded-xl transition-all whitespace-nowrap font-medium text-xs cursor-pointer ${
                    selectedFilter === cat.id
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.05]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Countries Selection Grid */}
          <div className="max-h-64 sm:max-h-72 overflow-y-auto pr-1 space-y-2 rounded-2xl p-1 border border-white/[0.05] bg-slate-950/40">
            {filteredCountries.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs sm:text-sm">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                <span>
                  {language === 'id'
                    ? 'Negara tidak ditemukan dalam pencarian.'
                    : 'No countries found matching your search.'}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCountries.map((country) => {
                  const isSelected = tempSelected.code === country.code;
                  const countryLiveTime = formatCountryTime(country.iana);
                  return (
                    <button
                      key={country.code}
                      onClick={() => handleCountryClick(country)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer group ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border-cyan-400/70 shadow-[0_0_16px_rgba(34,211,238,0.2)] text-white'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl leading-none shrink-0 drop-shadow-sm group-hover:scale-110 transition-transform">
                          {country.flag}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-xs sm:text-sm truncate">
                              {language === 'id' ? country.nameId : country.nameEn}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/20 shrink-0">
                              {country.code}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                            {country.timeZone} · {country.dialCode}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="font-mono text-xs font-bold text-cyan-200 tabular-nums px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-400/30 shadow-sm">
                          {countryLiveTime}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                              : 'border border-white/20'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Confirmation Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <span className="text-base">{tempSelected.flag}</span>
              <div>
                <span>
                  {language === 'id' ? 'Negara Terpilih:' : 'Selected:'}{' '}
                  <strong className="text-cyan-300 font-semibold">
                    {language === 'id' ? tempSelected.nameId : tempSelected.nameEn}
                  </strong>{' '}
                  <span className="text-slate-500">({tempSelected.timeZone})</span>
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-slate-400">
                    {language === 'id' ? 'Waktu Lokal:' : 'Local Time:'}
                  </span>
                  <span className="font-mono text-cyan-200 font-bold text-xs tabular-nums">
                    {formatCountryTime(tempSelected.iana)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={closeCountryModal}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                {language === 'id' ? 'Lewati' : 'Skip for now'}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-white hover:to-cyan-200 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {language === 'id' ? 'Simpan & Masuk' : 'Save & Continue'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
