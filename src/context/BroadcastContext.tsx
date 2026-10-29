import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BroadcastItem, CommunityGroup } from '../types';
import { INITIAL_BROADCASTS, INITIAL_COMMUNITY_GROUPS } from '../data/communityData';

interface AdminUserSession {
  email: string;
  role: string;
}

interface BroadcastContextType {
  broadcasts: BroadcastItem[];
  groups: CommunityGroup[];
  hasUnread: boolean;
  unreadCount: number;
  latestToast: BroadcastItem | null;
  notificationPermission: NotificationPermission;
  isAdmin: boolean;
  adminUser: AdminUserSession | null;
  loginAsAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
  requestNotificationPermission: () => Promise<boolean>;
  addBroadcast: (newItem: Omit<BroadcastItem, 'id' | 'timestamp'>) => void;
  deleteBroadcast: (id: string) => void;
  clearAllBroadcasts: () => void;
  markAllAsRead: () => void;
  dismissToast: () => void;
  updateGroupStatus: (groupId: string, status: 'open' | 'closed' | 'scheduled', scheduleNote?: string) => void;
  updateGroupUrl: (groupId: string, newUrl: string) => void;
  triggerDemoBroadcast: () => void;
}

const BroadcastContext = createContext<BroadcastContextType | null>(null);

const STORAGE_BROADCAST_KEY = 'fsa_broadcasts_v2';
const STORAGE_GROUPS_KEY = 'fsa_groups_v1';
const STORAGE_READ_IDS_KEY = 'fsa_read_broadcast_ids_v2';
const STORAGE_ADMIN_SESSION_KEY = 'fsa_admin_session_v1';

export const BroadcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [broadcasts, setBroadcasts] = useState<BroadcastItem[]>(() => {
    try {
      // Purge legacy storage key containing old seed announcements
      localStorage.removeItem('fsa_broadcasts_v1');
      localStorage.removeItem('fsa_read_broadcast_ids_v1');
      const saved = localStorage.getItem(STORAGE_BROADCAST_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item: BroadcastItem) => !['bc-1', 'bc-2', 'bc-3'].includes(item.id));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved broadcasts:', e);
    }
    return INITIAL_BROADCASTS;
  });

  const [groups, setGroups] = useState<CommunityGroup[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GROUPS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved groups:', e);
    }
    return INITIAL_COMMUNITY_GROUPS;
  });

  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_READ_IDS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [latestToast, setLatestToast] = useState<BroadcastItem | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ADMIN_SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = adminUser !== null;

  const loginAsAdmin = useCallback((email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const authorizedEmails = [
      'ochalopha@gmail.com',
      'owner@fsa.my.id',
      'admin@fsa.my.id',
      'developer@fsa.my.id'
    ];

    if (authorizedEmails.includes(cleanEmail) || cleanEmail.includes('@fsa.my.id')) {
      const role = cleanEmail === 'ochalopha@gmail.com' ? 'Lead Architect (Ochalo)' : 'Founder / Supreme Owner';
      const session = { email: cleanEmail, role };
      setAdminUser(session);
      try {
        localStorage.setItem(STORAGE_ADMIN_SESSION_KEY, JSON.stringify(session));
      } catch (e) {
        console.warn('Failed saving admin session:', e);
      }
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminUser(null);
    try {
      localStorage.removeItem(STORAGE_ADMIN_SESSION_KEY);
    } catch (e) {
      console.warn('Failed removing admin session:', e);
    }
  }, []);

  // Calculate unread
  const unreadItems = broadcasts.filter((b) => !readIds.includes(b.id));
  const unreadCount = unreadItems.length;
  const hasUnread = unreadCount > 0;

  // Persist broadcasts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BROADCAST_KEY, JSON.stringify(broadcasts));
    } catch (e) {
      console.error('Failed to store broadcasts:', e);
    }
  }, [broadcasts]);

  // Persist groups
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GROUPS_KEY, JSON.stringify(groups));
    } catch (e) {
      console.error('Failed to store groups:', e);
    }
  }, [groups]);

  // Persist read IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_READ_IDS_KEY, JSON.stringify(readIds));
    } catch (e) {
      console.error('Failed to store read IDs:', e);
    }
  }, [readIds]);

  // Browser notification handler
  const sendDeviceNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: body.length > 100 ? `${body.substring(0, 97)}...` : body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'fsa-broadcast-tag'
          });
        } catch (e) {
          console.warn('Notification display failed:', e);
        }
      }
    }
  }, []);

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        return perm === 'granted';
      } catch (e) {
        console.warn('Failed requesting notification permission:', e);
        return false;
      }
    }
    return false;
  };

  const addBroadcast = useCallback((newItemData: Omit<BroadcastItem, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + `, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const newItem: BroadcastItem = {
      ...newItemData,
      id: `bc-${Date.now()}`,
      timestamp: timeFormatted
    };

    setBroadcasts((prev) => [newItem, ...prev]);

    // Trigger in-app top toast popup
    setLatestToast(newItem);

    // Trigger mobile/device native push notification
    sendDeviceNotification(`[FSA Sharknoxza] ${newItem.title}`, newItem.content);
  }, [sendDeviceNotification]);

  const deleteBroadcast = useCallback((id: string) => {
    setBroadcasts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const clearAllBroadcasts = useCallback(() => {
    setBroadcasts([]);
    setReadIds([]);
    setLatestToast(null);
    try {
      localStorage.removeItem(STORAGE_BROADCAST_KEY);
      localStorage.removeItem(STORAGE_READ_IDS_KEY);
    } catch (e) {
      console.warn('Failed clearing broadcasts from storage:', e);
    }
  }, []);

  const markAllAsRead = useCallback(() => {
    const allIds = broadcasts.map((b) => b.id);
    setReadIds(allIds);
  }, [broadcasts]);

  const dismissToast = useCallback(() => {
    setLatestToast(null);
  }, []);

  const updateGroupStatus = useCallback((groupId: string, status: 'open' | 'closed' | 'scheduled', scheduleNote?: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, status, scheduleNote: scheduleNote || g.scheduleNote } : g))
    );
  }, []);

  const updateGroupUrl = useCallback((groupId: string, newUrl: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, targetUrl: newUrl } : g))
    );
  }, []);

  const triggerDemoBroadcast = useCallback(() => {
    const titles = [
      'Pemberitahuan Scrim Akbar FSA Malam Ini Pukul 20:00 WIB',
      'Update Link Khusus Group #03 - Tech & Creative Telah Diperbarui',
      'Registrasi Anggota Baru FSA Sharknoxza Gelombang 4 Dibuka!',
      'Pengumuman Pemenang Giveaway Eksklusif Merchandise Sharknoxza'
    ];
    const contents = [
      'Seluruh kapten tim divisi Esports diwajibkan bergabung di Discord Room voice Scrim #01 tepat waktu.',
      'Akses link direktori telah disinkronkan ke server cloud baru. Silakan cek menu Our Group untuk informasi terbaru.',
      'Bagi calon member yang menunggu kuota grup dibuka, silakan langsung klik tombol gabung di grup terkait.',
      'Selamat kepada para pemenang jersey dan custom mousepad FSA Sharknoxza! Cek direct message dari admin.'
    ];
    const rand = Math.floor(Math.random() * titles.length);

    addBroadcast({
      title: titles[rand],
      content: contents[rand],
      author: 'Sharknoxza Admin',
      authorRole: 'Live Broadcast Server',
      priority: rand % 2 === 0 ? 'urgent' : 'important',
      category: 'Siaran Langsung',
      isPinned: false
    });
  }, [addBroadcast]);

  return (
    <BroadcastContext.Provider
      value={{
        broadcasts,
        groups,
        hasUnread,
        unreadCount,
        latestToast,
        notificationPermission,
        isAdmin,
        adminUser,
        loginAsAdmin,
        logoutAdmin,
        requestNotificationPermission,
        addBroadcast,
        deleteBroadcast,
        clearAllBroadcasts,
        markAllAsRead,
        dismissToast,
        updateGroupStatus,
        updateGroupUrl,
        triggerDemoBroadcast
      }}
    >
      {children}
    </BroadcastContext.Provider>
  );
};

export const useBroadcast = () => {
  const context = useContext(BroadcastContext);
  if (!context) {
    throw new Error('useBroadcast must be used within a BroadcastProvider');
  }
  return context;
};
