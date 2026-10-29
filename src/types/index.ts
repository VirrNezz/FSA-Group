export type PageTab = 'home' | 'groups' | 'broadcast' | 'partner' | 'admin';

export type Language = 'id' | 'en';

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  platform: 'instagram' | 'discord' | 'telegram' | 'youtube' | 'tiktok' | 'whatsapp' | 'web';
  description: string;
}

export interface CommunityGroup {
  id: string;
  number: number;
  name: string;
  slug: string;
  targetUrl: string;
  platform: 'WhatsApp' | 'Telegram' | 'Discord';
  status: 'open' | 'closed' | 'scheduled';
  members: number;
  maxMembers: number;
  description: string;
  category: string;
  scheduleNote?: string;
}

export interface BroadcastItem {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  timestamp: string;
  priority: 'urgent' | 'important' | 'info';
  category: string;
  isPinned?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface CommunityPartner {
  id: string;
  name: string;
  category: string;
  collaboration: string;
  established: string;
  logo: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  links: {
    label: string;
    url: string;
    type: 'website' | 'discord' | 'instagram' | 'other';
  }[];
}

export interface AdminProfile {
  id: string;
  name: string;
  nickname: string;
  role: 'Owner' | 'Co-Owner' | 'Head Admin' | 'Lead Moderator' | 'Web Developer' | 'Creative Lead';
  levelBadge: string;
  avatar: string;
  characterBio: string;
  personality: string[];
  responsibilities: string;
  links: {
    label: string;
    url: string;
    icon: string;
  }[];
}

export interface FAQItem {
  question: {
    id: string;
    en: string;
  };
  answer: {
    id: string;
    en: string;
  };
  category: string;
}
