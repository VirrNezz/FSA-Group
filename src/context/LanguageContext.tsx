import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    'nav.home': 'Beranda',
    'nav.groups': 'Our Group',
    'nav.broadcast': 'Broadcast',
    'nav.partner': 'Partner',
    'nav.admin': 'Admin',
    'nav.clock': 'Jam Dunia',
    'nav.adminPanel': 'Admin Panel',
    
    'hero.motto': 'Solidaritas Tanpa Batas, Menembus Arus Menuju Puncak',
    'hero.badge': 'Portal Komunitas Digital Resmi',
    'hero.exploreGroups': 'Jelajahi 11 Grup',
    'hero.liveAnnounce': 'Pengumuman Live',
    'hero.membersCount': '8,500+ Anggota Aktif',
    'hero.groupsCount': '11 Divisi Grup',
    'hero.founded': 'Didirikan Sejak 2022',

    'section.about.title': 'Mengenal FSA Sharknoxza',
    'section.about.subtitle': 'Wadah silaturahmi, kompetisi esports, dan kreativitas teknologi digital.',
    'section.vision.title': 'Visi & Misi',
    'section.vision.heading': 'Visi Utama',
    'section.mission.heading': 'Misi Organisasi',
    'section.social.title': 'Media Sosial Resmi',
    'section.social.subtitle': 'Terhubung langsung dengan seluruh saluran publik dan jaringan resmi FSA Sharknoxza.',
    'section.faq.title': 'Pertanyaan Sering Diajukan (FAQ)',
    'section.faq.subtitle': 'Temukan jawaban cepat seputar keanggotaan, aturan grup, dan komunitas kami.',

    'groups.title': 'Direktori 11 Grup Komunitas',
    'groups.subtitle': 'Pilih dan bergabunglah dengan grup yang sesuai dengan minat dan wilayah kamu. Berjejer rapi dan dapat digeser.',
    'groups.scrollHint': 'Geser ke kanan / bawah untuk melihat seluruh 11 grup',
    'groups.filterAll': 'Semua Grup (11)',
    'groups.filterOpen': 'Bisa Gabung',
    'groups.filterClosed': 'Penuh / Khusus',
    'groups.joinBtn': 'Gabung ke Grup',
    'groups.copyBtn': 'Salin Tautan',
    'groups.copied': 'Tautan Tersalin!',
    'groups.members': 'Anggota',
    'groups.status.open': 'Terbuka',
    'groups.status.closed': 'Ditutup',
    'groups.status.scheduled': 'Terjadwal',

    'broadcast.title': 'Pengumuman & Siaran Resmi',
    'broadcast.subtitle': 'Pembaruan informasi terkini dari Owner & Admin FSA Sharknoxza secara langsung tanpa perlu refresh.',
    'broadcast.liveIndicator': 'Sistem Siaran Realtime Aktif',
    'broadcast.unreadBadge': 'Siaran Baru',
    'broadcast.markAllRead': 'Tandai Sudah Dibaca',
    'broadcast.testSimulate': 'Simulasikan Siaran Baru (Uji Coba)',
    'broadcast.allowNotif': 'Aktifkan Notifikasi Web/HP',
    'broadcast.notifEnabled': 'Notifikasi Aktif',
    'broadcast.empty': 'Belum ada pengumuman baru saat ini.',
    'broadcast.pinned': 'Disematkan oleh Admin',
    'broadcast.filterAll': 'Semua Siaran',
    'broadcast.filterUrgent': 'Penting & Mendesak',

    'partner.title': 'Mitra & Kolaborasi Komunitas',
    'partner.subtitle': 'Organisasi, aliansi esports, dan studio kreatif yang tumbuh bersama FSA Sharknoxza.',
    'partner.expandHint': 'Klik kartu mitra untuk melihat informasi lengkap & tautan kerja sama',
    'partner.viewDetail': 'Lihat Detail & Tautan',
    'partner.closeModal': 'Tutup Detail',
    'partner.directLinks': 'Tautan Resmi Mitra',

    'admin.title': 'Jajaran Tim Pengurus & Pengembang',
    'admin.subtitle': 'Mengenal sosok pendiri, pimpinan organisasi, moderator, serta arsitek pembuat website ini.',
    'admin.openPanel': 'Masuk ke Admin Panel',
    'admin.characterTrait': 'Karakter & Kepribadian',
    'admin.responsibilities': 'Tanggung Jawab Utama',
    'admin.viewProfile': 'Profil Lengkap & Kontak',
    'admin.creatorBadge': 'Pembuat Website',

    'clock.title': 'Jam Realtime Nusantara & Seluruh Dunia',
    'clock.subtitle': 'Waktu tersinkronisasi otomatis untuk seluruh anggota dari berbagai belahan dunia.',
    'clock.visitorTime': 'Waktu Lokal Perangkat Anda',

    'footer.watermark': 'Dikembangkan dengan bangga untuk Komunitas FSA Sharknoxza • Oleh Ochalo (FSA Core Team).',
    'footer.rights': 'Seluruh hak cipta dilindungi undang-undang.'
  },
  en: {
    'nav.home': 'Home',
    'nav.groups': 'Our Group',
    'nav.broadcast': 'Broadcast',
    'nav.partner': 'Partner',
    'nav.admin': 'Admin',
    'nav.clock': 'World Clock',
    'nav.adminPanel': 'Admin Panel',

    'hero.motto': 'Boundless Solidarity, Piercing the Currents to the Pinnacle',
    'hero.badge': 'Official Digital Community Portal',
    'hero.exploreGroups': 'Explore 11 Groups',
    'hero.liveAnnounce': 'Live Broadcasts',
    'hero.membersCount': '8,500+ Active Members',
    'hero.groupsCount': '11 Group Divisions',
    'hero.founded': 'Founded In 2022',

    'section.about.title': 'About FSA Sharknoxza',
    'section.about.subtitle': 'A hub for brotherhood, competitive esports, and digital tech creativity.',
    'section.vision.title': 'Vision & Mission',
    'section.vision.heading': 'Primary Vision',
    'section.mission.heading': 'Core Missions',
    'section.social.title': 'Official Social Channels',
    'section.social.subtitle': 'Connect directly with all verified public channels and networks of FSA Sharknoxza.',
    'section.faq.title': 'Frequently Asked Questions (FAQ)',
    'section.faq.subtitle': 'Find quick answers regarding membership, group rules, and our community.',

    'groups.title': '11 Community Groups Directory',
    'groups.subtitle': 'Discover and join the group matching your interests and region. Arranged side-by-side with scroll support.',
    'groups.scrollHint': 'Scroll right or down to explore all 11 groups',
    'groups.filterAll': 'All Groups (11)',
    'groups.filterOpen': 'Available to Join',
    'groups.filterClosed': 'Full / Restricted',
    'groups.joinBtn': 'Join Group',
    'groups.copyBtn': 'Copy Link',
    'groups.copied': 'Link Copied!',
    'groups.members': 'Members',
    'groups.status.open': 'Open',
    'groups.status.closed': 'Closed',
    'groups.status.scheduled': 'Scheduled',

    'broadcast.title': 'Official Broadcasts & Announcements',
    'broadcast.subtitle': 'Realtime updates from FSA Sharknoxza Owners & Admins delivered instantly without refreshing.',
    'broadcast.liveIndicator': 'Realtime Broadcast Engine Active',
    'broadcast.unreadBadge': 'New Broadcast',
    'broadcast.markAllRead': 'Mark All as Read',
    'broadcast.testSimulate': 'Simulate Live Broadcast (Demo)',
    'broadcast.allowNotif': 'Enable Web/Mobile Notifications',
    'broadcast.notifEnabled': 'Notifications Active',
    'broadcast.empty': 'No announcements at the moment.',
    'broadcast.pinned': 'Pinned by Admin',
    'broadcast.filterAll': 'All Broadcasts',
    'broadcast.filterUrgent': 'Urgent & Critical',

    'partner.title': 'Community Partners & Alliances',
    'partner.subtitle': 'Organizations, esports federations, and creative studios growing together with FSA Sharknoxza.',
    'partner.expandHint': 'Click any partner card to view full profile & collaboration hyperlinks',
    'partner.viewDetail': 'View Details & Links',
    'partner.closeModal': 'Close Details',
    'partner.directLinks': 'Official Partner Hyperlinks',

    'admin.title': 'Leadership Team & Web Architect',
    'admin.subtitle': 'Meet the founders, community moderators, leadership roster, and the web developer behind this portal.',
    'admin.openPanel': 'Open Admin Panel',
    'admin.characterTrait': 'Character & Personality',
    'admin.responsibilities': 'Key Responsibilities',
    'admin.viewProfile': 'Full Profile & Contact',
    'admin.creatorBadge': 'Website Developer',

    'clock.title': 'Realtime Nusantara & Worldwide Clocks',
    'clock.subtitle': 'Synchronized timekeeping for all community members across every time zone.',
    'clock.visitorTime': 'Your Device Local Time',

    'footer.watermark': 'Proudly engineered for FSA Sharknoxza Community • Built by Ochalo (FSA Core Team).',
    'footer.rights': 'All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: (key) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fsa_preferred_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id'; // Indonesian default as requested
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fsa_preferred_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['id']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
