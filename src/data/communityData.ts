import {
  SocialLink,
  CommunityGroup,
  BroadcastItem,
  CommunityPartner,
  AdminProfile,
  FAQItem
} from '../types';

export const COMMUNITY_INFO = {
  name: 'FSA Sharknoxza',
  shortName: 'FSA',
  logoUrl: '/images/fsa_logo.jpg',
  motto: 'Solidaritas Tanpa Batas, Menembus Arus Menuju Puncak',
  mottoEn: 'Boundless Solidarity, Piercing the Currents to the Pinnacle',
  foundedYear: '2022',
  tagline: 'The Apex Digital & Gaming Community Network',
  about: {
    id: `FSA Sharknoxza adalah komunitas pemuda, gamer, dan kreator digital yang berdiri atas asas persaudaraan yang kokoh dan solidaritas tinggi. Di sini kami merangkul setiap anggota untuk berkembang bersama dalam berbagai bidang, mulai dari gaming kompetitif, berbagi wawasan teknologi, kolaborasi kreatif, hingga menjalin silaturahmi yang hangat di seluruh 11 divisi grup kami. Komunitas ini didesain sebagai rumah kedua yang inklusif, aktif, dan saling mendukung dalam setiap langkah.`,
    en: `FSA Sharknoxza is a premier digital youth, gaming, and creator community built upon solid fraternity and high camaraderie. Here, we embrace every member to grow together across competitive gaming, tech insights, creative collaborations, and warm friendships across all 11 of our community groups. Our community is envisioned as an inclusive, active, and supportive digital second home.`
  },
  vision: {
    id: 'Menjadi komunitas besar furry yang ramah dan selalu solid',
    en: 'To become a large, welcoming, and consistently solid furry community'
  },
  missions: [
    {
      id: 'Membangun member solid yg support satu sama lain dengan melakukan hubungan baik dengan anggota',
      en: 'Building a solid group of members who support one another by fostering good relationships among them.'
    },
    {
      id: 'membagi ide satu sama lain dan membentuk dalam kepemimpinan dan musyawarah',
      en: 'sharing ideas with one another and shaping [outcomes] through leadership and deliberation'
    },
    {
      id: 'menyelesaikan masalah, dan berpartisipasi untuk rela membantu',
      en: 'solving problems, and participating by willingly offering help'
    },
    {
      id: 'enghindari pembullyan dan saling menghargai',
      en: 'Avoiding bullying and respecting one another'
    }
  ],
  watermark: {
    creator: 'Ochalo (FSA Core Team)',
    year: '2026',
    brand: 'FSA Sharknoxza Official Portal'
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'tiktok',
    name: 'TikTok Clips',
    handle: '@fsasharknoxza',
    url: 'https://tiktok.com/@fsasharknoxza',
    platform: 'tiktok',
    description: 'Klip komedi gaming santai, tips & trik, dan highlight kebersamaan member.'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Official Channel',
    handle: 'FSA Sharknoxza News',
    url: 'https://whatsapp.com/channel/fsasharknoxza',
    platform: 'whatsapp',
    description: 'Kanal resmi update siaran langsung pengumuman langsung di HP kamu.'
  }
];

// 11 Community Groups (easily configurable URLs and settings)
export const INITIAL_COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'group-1',
    number: 1,
    name: '『𝙁𝙎𝘼』🜲𝐒𝐇𝐀𝐑𝐊𝐧𝐨𝐱𝐳𝐚🜲',
    slug: 'group1',
    targetUrl: 'https://fsa.my.id/group1',
    platform: 'WhatsApp',
    status: 'open',
    members: 840,
    maxMembers: 1024,
    category: 'General Discussion',
    description: 'Grup induk utama untuk perkenalan, sapaan santai antar member baru dan senior.'
  },
  {
    id: 'group-2',
    number: 2,
    name: '〘𝗥𝗙𝗜​〙|𝙍𝘼𝙄𝙇𝙎𝙁𝙐𝙍𝙎 𝙄𝙉𝘿𝙊𝙉𝙀𝙎𝙄𝘼',
    slug: 'group2',
    targetUrl: 'https://fsa.my.id/group2',
    platform: 'WhatsApp',
    status: 'open',
    members: 620,
    maxMembers: 1024,
    category: 'Competitive Gaming',
    description: 'Wadah kompetitif MLBB, Valorant, PUBG, scrim harian dan strategi turnamen.'
  },
  {
    id: 'group-3',
    number: 3,
    name: '『𝙂𝙁𝙎』𝙂𝙍𝙐𝙋 𝙁𝙐𝙍𝙍𝙔 𝙎𝙀𝙅𝘼𝙍𝘼𝙃',
    slug: 'group3',
    targetUrl: 'https://fsa',
    platform: 'Telegram',
    status: 'open',
    members: 512,
    maxMembers: 2000,
    category: 'Tech & Design',
    description: 'Diskusi web development, graphic design, editing video, dan AI tools.'
  },
  {
    id: 'group-4',
    number: 4,
    name: 'FSA Sharknoxza #04 - Casual & Night Owls',
    slug: 'group4',
    targetUrl: 'https://fsa.my.id/group4',
    platform: 'WhatsApp',
    status: 'open',
    members: 790,
    maxMembers: 1024,
    category: 'Late Night Hangout',
    description: 'Ruang obrolan santai, no-filter curhat santun, dan nongkrong malam.'
  },
  {
    id: 'group-5',
    number: 5,
    name: 'FSA Sharknoxza #05 - Music & Soundwave',
    slug: 'group5',
    targetUrl: 'https://fsa.my.id/group5',
    platform: 'Discord',
    status: 'open',
    members: 950,
    maxMembers: 5000,
    category: 'Music & Audio',
    description: 'Rekomendasi playlist, sesi karaoke malam minggu, dan sharing produser musik.'
  },
  {
    id: 'group-6',
    number: 6,
    name: 'FSA Sharknoxza #06 - Regional Barat (WIB)',
    slug: 'group6',
    targetUrl: 'https://fsa.my.id/group6',
    platform: 'WhatsApp',
    status: 'open',
    members: 910,
    maxMembers: 1024,
    category: 'Regional Hub',
    description: 'Komunitas member zona Sumatra, Jawa, dan Kalimantan Barat (kopdar & meetup).'
  },
  {
    id: 'group-7',
    number: 7,
    name: 'FSA Sharknoxza #07 - Regional Tengah (WITA)',
    slug: 'group7',
    targetUrl: 'https://fsa.my.id/group7',
    platform: 'WhatsApp',
    status: 'open',
    members: 480,
    maxMembers: 1024,
    category: 'Regional Hub',
    description: 'Komunitas member wilayah Bali, NTB, NTT, Sulawesi, dan Kalimantan Timur.'
  },
  {
    id: 'group-8',
    number: 8,
    name: 'FSA Sharknoxza #08 - Regional Timur (WIT)',
    slug: 'group8',
    targetUrl: 'https://fsa.my.id/group8',
    platform: 'WhatsApp',
    status: 'open',
    members: 340,
    maxMembers: 1024,
    category: 'Regional Hub',
    description: 'Komunitas member Maluku & Papua, solid menjaga silaturahmi tanpa jarak.'
  },
  {
    id: 'group-9',
    number: 9,
    name: 'FSA Sharknoxza #09 - Global & Diaspora',
    slug: 'group9',
    targetUrl: 'https://fsa.my.id/group9',
    platform: 'Discord',
    status: 'open',
    members: 680,
    maxMembers: 5000,
    category: 'International',
    description: 'Wadah bagi anggota di luar negeri, pelajar diaspora, dan obrolan multi-bahasa.'
  },
  {
    id: 'group-10',
    number: 10,
    name: 'FSA Sharknoxza #10 - Event & Official Tourney',
    slug: 'group10',
    targetUrl: 'https://fsa.my.id/group10',
    platform: 'WhatsApp',
    status: 'scheduled',
    members: 1010,
    maxMembers: 1024,
    scheduleNote: 'Dibuka saat turnamen FSA Season 5 berlangsung',
    category: 'Events & Brackets',
    description: 'Papan pengumuman bagan turnamen, pengundian grup, dan sertifikat pemenang.'
  },
  {
    id: 'group-11',
    number: 11,
    name: 'FSA Sharknoxza #11 - VIP & Core Alumni',
    slug: 'group11',
    targetUrl: 'https://fsa.my.id/group11',
    platform: 'WhatsApp',
    status: 'closed',
    members: 120,
    maxMembers: 200,
    scheduleNote: 'Akses khusus undangan pengurus & kontributor senior',
    category: 'Advisory & Veteran',
    description: 'Grup tertutup penasihat komunitas, alumni panitia, dan perumusan arah visi masa depan.'
  }
];

export const INITIAL_BROADCASTS: BroadcastItem[] = [];

export const COMMUNITY_PARTNERS: CommunityPartner[] = [
  {
    id: 'partner-1',
    name: 'Vortex Cyber Esports',
    category: 'Organisasi Esports & Scrim',
    collaboration: 'Mitra Penyelenggara Turnamen & Liga Bersama',
    established: '2023',
    logo: 'V',
    shortDesc: 'Organisasi esports semi-profesional yang menaungi atlet muda berbakat di kancah game MOBA & FPS.',
    fullDesc: 'Vortex Cyber Esports adalah mitra kolaboratif strategis FSA Sharknoxza sejak 2023. Kolaborasi ini mencakup penyediaan wasit berlisensi, sistem bracket otomatis, fasilitasi hadiah turnamen, serta pertukaran pemain scrim mingguan.',
    tags: ['Esports', 'Competitive', 'Tournament Host', 'Livestream'],
    links: [
      { label: 'Website Vortex', url: 'https://vortex-cyber.example.com', type: 'website' },
      { label: 'Discord Server', url: 'https://discord.gg/vortex-cyber', type: 'discord' },
      { label: 'Instagram @vortexcyber', url: 'https://instagram.com/vortexcyber', type: 'instagram' }
    ]
  },
  {
    id: 'partner-2',
    name: 'Nexus Developer Guild',
    category: 'Komunitas Programmer & Tech',
    collaboration: 'Dukungan Infrastruktur Web, Bot & Workshop Coding',
    established: '2022',
    logo: 'N',
    shortDesc: 'Aliansi software engineer, desainer UI/UX, dan pegiat opensource nusantara.',
    fullDesc: 'Nexus Developer Guild mendukung FSA Sharknoxza dalam penyediaan teknologi automasi bot grup WhatsApp/Discord, pemeliharaan portal digital, serta rutin mengadakan workshop daring gratis bagi anggota FSA yang ingin belajar dunia programming.',
    tags: ['Tech Community', 'Coding Workshop', 'Discord Bots', 'Open Source'],
    links: [
      { label: 'Nexus Guild Portal', url: 'https://nexusguild.example.com', type: 'website' },
      { label: 'GitHub Repository', url: 'https://github.com/nexusguild', type: 'other' },
      { label: 'Instagram @nexusguild', url: 'https://instagram.com/nexusguild', type: 'instagram' }
    ]
  },
  {
    id: 'partner-3',
    name: 'Aurora Creative Media',
    category: 'Studio Desain & Broadcast',
    collaboration: 'Produksi Desain Banner, Video Aftermovie & Merchandise',
    established: '2024',
    logo: 'A',
    shortDesc: 'Creative agency yang berfokus pada visual branding komunitas, jersey esport, dan motion graphic.',
    fullDesc: 'Aurora Creative Media menjadi tim di balik visual spektakuler FSA Sharknoxza, mulai dari desain jersey resmi edisi terbatas, animasi intro video YouTube, hingga aset media sosial berkualitas tinggi.',
    tags: ['Graphic Design', 'Video Production', 'Branding', 'Merchandise'],
    links: [
      { label: 'Behance Portfolio', url: 'https://behance.net/auroracreative', type: 'website' },
      { label: 'Instagram @auroracreative', url: 'https://instagram.com/auroracreative', type: 'instagram' }
    ]
  },
  {
    id: 'partner-4',
    name: 'Hydra Community Network',
    category: 'Federasi Komunitas Multi-Game',
    collaboration: 'Pertukaran Member, Cross-Event & Gathering Nasional',
    established: '2021',
    logo: 'H',
    shortDesc: 'Jejaring persaudaraan lebih dari 20 komunitas pemuda di Indonesia dengan lebih dari 15.000 anggota aktif.',
    fullDesc: 'Hydra Community Network membuka akses bagi FSA Sharknoxza untuk berpartisipasi dalam gathering nasional tahunan, inisiatif bakti sosial digital bersama, dan turnamen akbar antar komunitas tingkat nasional.',
    tags: ['Federation', 'National Gathering', 'Charity Event', 'Community Alliance'],
    links: [
      { label: 'Hydra Official Hub', url: 'https://hydranetwork.example.com', type: 'website' },
      { label: 'Discord Alliance', url: 'https://discord.gg/hydranetwork', type: 'discord' },
      { label: 'Instagram @hydranetwork', url: 'https://instagram.com/hydranetwork', type: 'instagram' }
    ]
  }
];

export const ADMIN_TEAM: AdminProfile[] = [
  {
    id: 'adm-1',
    name: 'Sharknoxza Alpha',
    nickname: 'Sharknoxza (The Founder)',
    role: 'Owner',
    levelBadge: 'Supreme Founder',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Pemimpin visioner dan inisiator utama FSA Sharknoxza. Dikenal tegas, berwibawa, namun sangat peduli pada kesejahteraan dan keharmonisan seluruh member. Selalu siap mendengar saran dan menjadi tonggak kokoh arah perkembangan komunitas.',
    personality: ['Visioner', 'Tegas & Berkeadilan', 'Penuh Karisma', 'Protektif Terhadap Member'],
    responsibilities: 'Menentukan arah kebijakan strategis organisasi, pengambil keputusan tertinggi, dan penanggung jawab seluruh ekosistem FSA.',
    links: [
      { label: 'Instagram Owner', url: 'https://instagram.com/sharknoxza.official', icon: 'instagram' },
      { label: 'Discord Profile', url: 'https://discord.com/users/sharknoxza', icon: 'discord' },
      { label: 'Hubungi via WA', url: 'https://wa.me/6281234567890?text=Halo%20Owner%20FSA', icon: 'whatsapp' }
    ]
  },
  {
    id: 'adm-2',
    name: 'Rayhan "Noxza" Pratama',
    nickname: 'Ray (Co-Owner)',
    role: 'Co-Owner',
    levelBadge: 'Co-Founder & Strategist',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Pendamping setia sang Owner yang mengelola operasional harian. Bertipe analitis, tenang di bawah tekanan konflik, dan sangat mahir merancang event serta menjaga keaktifan member di ke-11 grup.',
    personality: ['Analitis', 'Ramah & Bersahabat', 'Manajemen Event Handal', 'Problem Solver'],
    responsibilities: 'Mengawasi kinerja operasional grup harian, mengoordinasikan jajaran admin divisi, dan mengelola alokasi hadiah event.',
    links: [
      { label: 'Instagram Rayhan', url: 'https://instagram.com/rayhan_noxza', icon: 'instagram' },
      { label: 'Discord Profile', url: 'https://discord.com/users/ray_noxza', icon: 'discord' },
      { label: 'Kirim Email', url: 'mailto:rayhan@fsa.my.id', icon: 'email' }
    ]
  },
  {
    id: 'adm-3',
    name: 'Ochalo',
    nickname: 'Ochalo (Architect & Dev)',
    role: 'Web Developer',
    levelBadge: 'Lead Architect & Core Admin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Pengembang utama di balik arsitektur portal web FSA Sharknoxza serta bot otomatisasi komunitas. Teliti, kreatif, dan berdedikasi tinggi menghadirkan antarmuka liquid glass masa depan yang responsif dan interaktif.',
    personality: ['Inovatif', 'Detail-Oriented', 'Tech Enthusiast', 'Responsif'],
    responsibilities: 'Pengembangan dan pemeliharaan website, manajemen database, integrasi sistem siaran pengumuman, dan keamanan portal.',
    links: [
      { label: 'Instagram Ochalo', url: 'https://instagram.com/ochalopha', icon: 'instagram' },
      { label: 'GitHub Profile', url: 'https://github.com/ochalo', icon: 'github' },
      { label: 'Email Ochalo', url: 'mailto:ochalopha@gmail.com', icon: 'email' }
    ]
  },
  {
    id: 'adm-4',
    name: 'Bima "Aegis" Dirgantara',
    nickname: 'Bima Aegis',
    role: 'Head Admin',
    levelBadge: 'Security & Enforcer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Kepala pengawas tata tertib grup. Bertanggung jawab memastikan ke-11 grup terbebas dari spam, ujaran kebencian, penipuan, atau perdebatan yang merusak kenyamanan. Berhati dingin terhadap perusuh namun hangat terhadap kawan.',
    personality: ['Disiplin Tinggi', 'Objektif', 'Cepat Bertindak', 'Penjaga Harmoni'],
    responsibilities: 'Memimpin tim moderator lapangan, menangani banding sanksi/banned, dan verifikasi anggota baru.',
    links: [
      { label: 'Instagram Aegis', url: 'https://instagram.com/bima_aegis', icon: 'instagram' },
      { label: 'WhatsApp Laporan', url: 'https://wa.me/6281298765432?text=Laporan%20Grup%20FSA', icon: 'whatsapp' }
    ]
  },
  {
    id: 'adm-5',
    name: 'Clarissa "Valkyrie" Natalia',
    nickname: 'Clara (Lead Mod)',
    role: 'Lead Moderator',
    levelBadge: 'Community Welcomer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Figur yang selalu menghidupkan suasana di Main Lounge dan Voice Chat Discord. Penuh empati, komunikatif, dan rajin menyambut setiap anggota baru dengan antusias.',
    personality: ['Ekstrovert Ceria', 'Empatik', 'Kreatif', 'Penenang Suasana'],
    responsibilities: 'Penyambutan member baru, fasilitasi ruang obrolan ramah perempuan & pemula, dan host acara podcast mingguan.',
    links: [
      { label: 'Instagram Clara', url: 'https://instagram.com/clarissa.valkyrie', icon: 'instagram' },
      { label: 'Discord Profile', url: 'https://discord.com/users/clarissa_v', icon: 'discord' }
    ]
  },
  {
    id: 'adm-6',
    name: 'Rifki "Kitsune" Maulana',
    nickname: 'Rifki (Creative)',
    role: 'Creative Lead',
    levelBadge: 'Visual Sorcerer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    characterBio: 'Desainer grafis jenius yang melahirkan logo sharknoxza, ilustrasi merchandise, dan template sertifikat event komunitas. Selalu berjiwa seni bebas dan menghasilkan karya memukau.',
    personality: ['Artistik', 'Eksploratif', 'Perfeksionis Visual', 'Santai'],
    responsibilities: 'Konseptor visual brand identity FSA, penyedia template konten Instagram, dan layout merchandise resmi.',
    links: [
      { label: 'Portfolio Seni', url: 'https://behance.net/rifkikitsune', icon: 'website' },
      { label: 'Instagram Rifki', url: 'https://instagram.com/rifki_kitsune', icon: 'instagram' }
    ]
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'Umum & Bergabung',
    question: {
      id: 'Apa itu komunitas FSA Sharknoxza dan bagaimana cara bergabung?',
      en: 'What is FSA Sharknoxza community and how do I join?'
    },
    answer: {
      id: 'FSA Sharknoxza adalah komunitas pemuda, gamer, dan kreator terpadu. Kamu bisa langsung memilih grup yang sesuai minat kamu di menu "Our Group" pada website ini (terdapat 11 grup dengan fokus masing-masing) lalu klik tombol "Gabung Grup".',
      en: 'FSA Sharknoxza is an integrated youth, gamer, and creator community. You can choose a group suited to your interests on the "Our Group" page (11 distinct groups available) and click "Join Group".'
    }
  },
  {
    category: 'Grup & Kapasitas',
    question: {
      id: 'Mengapa ada 11 grup di FSA Sharknoxza dan apa perbedaannya?',
      en: 'Why are there 11 groups in FSA Sharknoxza and how do they differ?'
    },
    answer: {
      id: 'Setiap grup memiliki fokus spesifik, seperti Grup #01 untuk obrolan santai umum, Grup #02 divisi esport kompetitif, Grup #03 IT & kreatif, Grup #06-#08 untuk regional waktu (WIB, WITA, WIT), hingga grup internasional dan event. Ini menjaga alur obrolan tetap rapi dan relevan.',
      en: 'Each group has a specialized focus, such as Group #01 for general lounge, Group #02 for competitive esports, Group #03 for IT & tech, Groups #06-#08 for regional hubs (WIB, WITA, WIT), up to international and tourney groups.'
    }
  },
  {
    category: 'Biaya & Syarat',
    question: {
      id: 'Apakah bergabung ke dalam FSA Sharknoxza dipungut biaya?',
      en: 'Is joining FSA Sharknoxza free of charge?'
    },
    answer: {
      id: '100% Gratis! Tidak ada biaya keanggotaan apa pun. Yang kami utamakan adalah keaktifan, rasa saling menghargai, menjaga sopan santun, serta mematuhi tata tertib komunitas yang berlaku.',
      en: '100% Free! There are no membership fees whatsoever. What we value most is your active presence, mutual respect, good manners, and adherence to our community code of conduct.'
    }
  },
  {
    category: 'Pengumuman & Notifikasi',
    question: {
      id: 'Bagaimana cara mendapatkan notifikasi pengumuman/broadcast terbaru?',
      en: 'How do I receive the latest broadcast and announcement notifications?'
    },
    answer: {
      id: 'Website ini memiliki sistem broadcast realtime. Saat admin merilis pengumuman, jendela notifikasi akan otomatis meluncur dari atas tanpa kamu perlu me-refresh halaman web, ditambah indikator ikon penanda di samping tab "Broadcast". Kamu juga bisa mengaktifkan izin notifikasi peramban.',
      en: 'This portal features a live realtime announcement engine. When admins publish a broadcast, an alert smoothly drops down from the top without any page refresh required, accompanied by an indicator icon next to the "Broadcast" page tab.'
    }
  },
  {
    category: 'Kemitraan & Kerjasama',
    question: {
      id: 'Bagaimana cara mengajukan kemitraan / partner dengan FSA Sharknoxza?',
      en: 'How can our organization or community partner with FSA Sharknoxza?'
    },
    answer: {
      id: 'Kami sangat terbuka untuk berkolaborasi! Silakan kunjungi menu "Partner" untuk melihat jejaring kami, atau langsung hubungi tim pengurus melalui menu "Admin" atau kontak media sosial kami.',
      en: 'We eagerly welcome partnerships! Check out our "Partner" section to explore existing collaborations, or contact our core administrators directly via the "Admin" page or our social channels.'
    }
  }
];

export const WORLD_CITIES = [
  { city: 'Jakarta (WIB)', region: 'Indonesia Barat', timeZone: 'Asia/Jakarta', flag: '🇮🇩', offset: 'UTC+7' },
  { city: 'Makassar / Bali (WITA)', region: 'Indonesia Tengah', timeZone: 'Asia/Makassar', flag: '🇮🇩', offset: 'UTC+8' },
  { city: 'Jayapura (WIT)', region: 'Indonesia Timur', timeZone: 'Asia/Jayapura', flag: '🇮🇩', offset: 'UTC+9' },
  { city: 'Tokyo', region: 'Japan', timeZone: 'Asia/Tokyo', flag: '🇯🇵', offset: 'UTC+9' },
  { city: 'London', region: 'United Kingdom', timeZone: 'Europe/London', flag: '🇬🇧', offset: 'UTC+0/+1' },
  { city: 'New York', region: 'United States', timeZone: 'America/New_York', flag: '🇺🇸', offset: 'UTC-5/-4' },
  { city: 'Riyadh / Mecca', region: 'Saudi Arabia', timeZone: 'Asia/Riyadh', flag: '🇸🇦', offset: 'UTC+3' },
  { city: 'Sydney', region: 'Australia', timeZone: 'Australia/Sydney', flag: '🇦🇺', offset: 'UTC+10/+11' }
];
