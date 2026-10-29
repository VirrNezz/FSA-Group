import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageTab } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { BroadcastProvider } from './context/BroadcastContext';
import { CountryProvider } from './context/CountryContext';
import { Navbar } from './components/Navbar';
import { BroadcastToast } from './components/BroadcastToast';
import { WorldClockModal } from './components/WorldClock';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CountrySelectModal } from './components/CountrySelectModal';
import { HomePage } from './pages/HomePage';
import { OurGroupPage } from './pages/OurGroupPage';
import { BroadcastPage } from './pages/BroadcastPage';
import { PartnerPage } from './pages/PartnerPage';
import { AdminPage } from './pages/AdminPage';

// Distinct, cinematic wallpaper for each individual page
const PAGE_BACKGROUNDS: Record<PageTab, { imagePath: string; name: string; mood: string }> = {
  home: {
    imagePath: '/backgrounds/fsa_cyber_headquarters.jpg',
    name: 'FSA Sharknoxza Cyber Citadel',
    mood: 'Oceanic Cyber Megapolis'
  },
  groups: {
    imagePath: '/backgrounds/furry_shark_cyber_city.jpg',
    name: 'Cyber Shark Apex Citadel',
    mood: 'Direktori 11 Grup'
  },
  broadcast: {
    imagePath: '/backgrounds/furry_shark_ocean_waves.jpg',
    name: 'Bioluminescent Shark Titan Waves',
    mood: 'Pusat Siaran Komunitas'
  },
  partner: {
    imagePath: '/backgrounds/furry_aquatic_lounge.jpg',
    name: 'Aquatic Observatory Lounge',
    mood: 'Kemitraan & Kolaborasi'
  },
  admin: {
    imagePath: '/backgrounds/community_digital_hub.jpg',
    name: 'Luminal Executive Hub',
    mood: 'Portal Manajemen & Pengurus'
  }
};

function AppContent() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const handleNavigate = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeBackground = PAGE_BACKGROUNDS[currentTab] || PAGE_BACKGROUNDS.home;

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ========================================================================= */}
      {/* DYNAMIC PER-PAGE CINEMATIC BACKGROUND LAYER                                */}
      {/* Automatically cross-fades to a unique high-res image for each page         */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-slate-950">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentTab}
            src={activeBackground.imagePath}
            alt={activeBackground.name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.88, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-105 contrast-105"
          />
        </AnimatePresence>

        {/* High-Tech Scrim Vignette: Balances high artwork clarity with crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/85 pointer-events-none" />

        {/* Bioluminescent Specular Glow Accents (GPU Radial Gradients without costly blur filters) */}
        <div className="absolute -top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.12)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(37,99,235,0.1)_0%,_transparent_70%)] pointer-events-none" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(34, 211, 238, 0.6) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Top Sliding Broadcast Popup Toast */}
      <BroadcastToast onNavigate={handleNavigate} />

      {/* Top Liquid Glass Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        onOpenClock={() => setIsClockOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Area with Smooth GPU-Accelerated Page Transitions */}
      <main className="flex-1 w-full pt-6 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full transform-gpu"
          >
            {currentTab === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenClock={() => setIsClockOpen(true)}
              />
            )}

            {currentTab === 'groups' && <OurGroupPage />}

            {currentTab === 'broadcast' && (
              <BroadcastPage
                onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
              />
            )}

            {currentTab === 'partner' && <PartnerPage />}

            {currentTab === 'admin' && (
              <AdminPage
                onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals & Dialogs */}
      <WorldClockModal
        isOpen={isClockOpen}
        onClose={() => setIsClockOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* First-visit Country Selection Alert Modal & Switcher */}
      <CountrySelectModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CountryProvider>
        <BroadcastProvider>
          <AppContent />
        </BroadcastProvider>
      </CountryProvider>
    </LanguageProvider>
  );
}
