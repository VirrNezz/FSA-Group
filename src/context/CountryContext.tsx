import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CountryOption {
  code: string;
  nameId: string;
  nameEn: string;
  flag: string;
  region: string;
  dialCode: string;
  timeZone: string;
  iana: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'ID', nameId: 'Indonesia', nameEn: 'Indonesia', flag: '🇮🇩', region: 'Asia Tenggara', dialCode: '+62', timeZone: 'WIB / GMT+7', iana: 'Asia/Jakarta' },
  { code: 'MY', nameId: 'Malaysia', nameEn: 'Malaysia', flag: '🇲🇾', region: 'Asia Tenggara', dialCode: '+60', timeZone: 'MYT / GMT+8', iana: 'Asia/Kuala_Lumpur' },
  { code: 'SG', nameId: 'Singapura', nameEn: 'Singapore', flag: '🇸🇬', region: 'Asia Tenggara', dialCode: '+65', timeZone: 'SGT / GMT+8', iana: 'Asia/Singapore' },
  { code: 'TH', nameId: 'Thailand', nameEn: 'Thailand', flag: '🇹🇭', region: 'Asia Tenggara', dialCode: '+66', timeZone: 'ICT / GMT+7', iana: 'Asia/Bangkok' },
  { code: 'PH', nameId: 'Filipina', nameEn: 'Philippines', flag: '🇵🇭', region: 'Asia Tenggara', dialCode: '+63', timeZone: 'PST / GMT+8', iana: 'Asia/Manila' },
  { code: 'VN', nameId: 'Vietnam', nameEn: 'Vietnam', flag: '🇻🇳', region: 'Asia Tenggara', dialCode: '+84', timeZone: 'ICT / GMT+7', iana: 'Asia/Ho_Chi_Minh' },
  { code: 'BN', nameId: 'Brunei', nameEn: 'Brunei Darussalam', flag: '🇧🇳', region: 'Asia Tenggara', dialCode: '+673', timeZone: 'BNT / GMT+8', iana: 'Asia/Brunei' },
  { code: 'JP', nameId: 'Jepang', nameEn: 'Japan', flag: '🇯🇵', region: 'Asia Timur', dialCode: '+81', timeZone: 'JST / GMT+9', iana: 'Asia/Tokyo' },
  { code: 'KR', nameId: 'Korea Selatan', nameEn: 'South Korea', flag: '🇰🇷', region: 'Asia Timur', dialCode: '+82', timeZone: 'KST / GMT+9', iana: 'Asia/Seoul' },
  { code: 'CN', nameId: 'Tiongkok', nameEn: 'China', flag: '🇨🇳', region: 'Asia Timur', dialCode: '+86', timeZone: 'CST / GMT+8', iana: 'Asia/Shanghai' },
  { code: 'AU', nameId: 'Australia', nameEn: 'Australia', flag: '🇦🇺', region: 'Oseania', dialCode: '+61', timeZone: 'AEST / GMT+10', iana: 'Australia/Sydney' },
  { code: 'US', nameId: 'Amerika Serikat', nameEn: 'United States', flag: '🇺🇸', region: 'Amerika Utara', dialCode: '+1', timeZone: 'EST / GMT-5', iana: 'America/New_York' },
  { code: 'GB', nameId: 'Inggris / Britania Raya', nameEn: 'United Kingdom', flag: '🇬🇧', region: 'Eropa', dialCode: '+44', timeZone: 'GMT / UTC+0', iana: 'Europe/London' },
  { code: 'DE', nameId: 'Jerman', nameEn: 'Germany', flag: '🇩🇪', region: 'Eropa', dialCode: '+49', timeZone: 'CET / GMT+1', iana: 'Europe/Berlin' },
  { code: 'FR', nameId: 'Prancis', nameEn: 'France', flag: '🇫🇷', region: 'Eropa', dialCode: '+33', timeZone: 'CET / GMT+1', iana: 'Europe/Paris' },
  { code: 'NL', nameId: 'Belanda', nameEn: 'Netherlands', flag: '🇳🇱', region: 'Eropa', dialCode: '+31', timeZone: 'CET / GMT+1', iana: 'Europe/Amsterdam' },
  { code: 'SA', nameId: 'Arab Saudi', nameEn: 'Saudi Arabia', flag: '🇸🇦', region: 'Timur Tengah', dialCode: '+966', timeZone: 'AST / GMT+3', iana: 'Asia/Riyadh' },
  { code: 'AE', nameId: 'Uni Emirat Arab', nameEn: 'United Arab Emirates', flag: '🇦🇪', region: 'Timur Tengah', dialCode: '+971', timeZone: 'GST / GMT+4', iana: 'Asia/Dubai' },
  { code: 'IN', nameId: 'India', nameEn: 'India', flag: '🇮🇳', region: 'Asia Selatan', dialCode: '+91', timeZone: 'IST / GMT+5:30', iana: 'Asia/Kolkata' },
  { code: 'BR', nameId: 'Brasil', nameEn: 'Brazil', flag: '🇧🇷', region: 'Amerika Selatan', dialCode: '+55', timeZone: 'BRT / GMT-3', iana: 'America/Sao_Paulo' },
  { code: 'CA', nameId: 'Kanada', nameEn: 'Canada', flag: '🇨🇦', region: 'Amerika Utara', dialCode: '+1', timeZone: 'EST / GMT-5', iana: 'America/Toronto' },
  { code: 'OTHER', nameId: 'Negara Lainnya', nameEn: 'Other Country', flag: '🌐', region: 'Internasional', dialCode: '-', timeZone: 'UTC', iana: 'UTC' },
];

const STORAGE_KEY = 'fsa_user_country_code';
const HAS_SEEN_MODAL_KEY = 'fsa_user_country_visited';

interface CountryContextType {
  selectedCountry: CountryOption;
  setCountry: (country: CountryOption) => void;
  isCountryModalOpen: boolean;
  openCountryModal: () => void;
  closeCountryModal: () => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(() => {
    try {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        const found = COUNTRIES.find((c) => c.code === savedCode);
        if (found) return found;
      }
    } catch {
      // ignore localStorage errors
    }
    // Default to Indonesia
    return COUNTRIES[0];
  });

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // Check first visit on mount
  useEffect(() => {
    try {
      const hasChosen = localStorage.getItem(HAS_SEEN_MODAL_KEY);
      if (!hasChosen) {
        // First time entering the website -> show the country selection alert modal!
        setIsCountryModalOpen(true);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSetCountry = (country: CountryOption) => {
    setSelectedCountry(country);
    try {
      localStorage.setItem(STORAGE_KEY, country.code);
      localStorage.setItem(HAS_SEEN_MODAL_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const openCountryModal = () => setIsCountryModalOpen(true);
  const closeCountryModal = () => {
    try {
      localStorage.setItem(HAS_SEEN_MODAL_KEY, 'true');
    } catch {
      // ignore
    }
    setIsCountryModalOpen(false);
  };

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        setCountry: handleSetCountry,
        isCountryModalOpen,
        openCountryModal,
        closeCountryModal,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
