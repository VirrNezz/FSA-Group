export interface CountryRegionItem {
  name: string;
  subdivision: string;
  timeZone: string;
  offsetLabel: string;
  isCapital?: boolean;
}

export interface CountryRegionsData {
  [countryCode: string]: CountryRegionItem[];
}

export const COUNTRY_REGIONS: CountryRegionsData = {
  ID: [
    { name: 'DKI Jakarta', subdivision: 'Ibukota & Pusat Finansial (WIB)', timeZone: 'Asia/Jakarta', offsetLabel: 'WIB · UTC+7', isCapital: true },
    { name: 'Surabaya', subdivision: 'Jawa Timur & Kota Pahlawan (WIB)', timeZone: 'Asia/Jakarta', offsetLabel: 'WIB · UTC+7' },
    { name: 'Bandung', subdivision: 'Jawa Barat & Kota Kreatif (WIB)', timeZone: 'Asia/Jakarta', offsetLabel: 'WIB · UTC+7' },
    { name: 'Medan', subdivision: 'Sumatera Utara & Hub Bisnis Barat (WIB)', timeZone: 'Asia/Jakarta', offsetLabel: 'WIB · UTC+7' },
    { name: 'Semarang', subdivision: 'Jawa Tengah (WIB)', timeZone: 'Asia/Jakarta', offsetLabel: 'WIB · UTC+7' },
    { name: 'Denpasar & Nusa Dua', subdivision: 'Bali & Pulau Dewata (WITA)', timeZone: 'Asia/Makassar', offsetLabel: 'WITA · UTC+8' },
    { name: 'Makassar', subdivision: 'Sulawesi Selatan & Gerbang Timur (WITA)', timeZone: 'Asia/Makassar', offsetLabel: 'WITA · UTC+8' },
    { name: 'Balikpapan & IKN', subdivision: 'Kalimantan Timur & Ibu Kota Nusantara (WITA)', timeZone: 'Asia/Makassar', offsetLabel: 'WITA · UTC+8' },
    { name: 'Manado', subdivision: 'Sulawesi Utara (WITA)', timeZone: 'Asia/Makassar', offsetLabel: 'WITA · UTC+8' },
    { name: 'Jayapura', subdivision: 'Papua & Bumi Cendrawasih (WIT)', timeZone: 'Asia/Jayapura', offsetLabel: 'WIT · UTC+9' },
    { name: 'Ambon', subdivision: 'Maluku & Kota Musik Dunia (WIT)', timeZone: 'Asia/Jayapura', offsetLabel: 'WIT · UTC+9' },
    { name: 'Sorong', subdivision: 'Papua Barat Daya & Raja Ampat (WIT)', timeZone: 'Asia/Jayapura', offsetLabel: 'WIT · UTC+9' }
  ],
  MY: [
    { name: 'Kuala Lumpur & Putrajaya', subdivision: 'Wilayah Persekutuan & Ibu Negara', timeZone: 'Asia/Kuala_Lumpur', offsetLabel: 'MYT · UTC+8', isCapital: true },
    { name: 'George Town', subdivision: 'Pulau Pinang & Silicon Island', timeZone: 'Asia/Kuala_Lumpur', offsetLabel: 'MYT · UTC+8' },
    { name: 'Johor Bahru', subdivision: 'Johor & Pintu Selatan', timeZone: 'Asia/Kuala_Lumpur', offsetLabel: 'MYT · UTC+8' },
    { name: 'Kuching', subdivision: 'Sarawak & Bandar Perpaduan Borneo', timeZone: 'Asia/Kuching', offsetLabel: 'MYT · UTC+8' },
    { name: 'Kota Kinabalu', subdivision: 'Sabah & Negeri di Bawah Bayu', timeZone: 'Asia/Kuching', offsetLabel: 'MYT · UTC+8' },
    { name: 'Ipoh', subdivision: 'Perak & Bandar Warisan', timeZone: 'Asia/Kuala_Lumpur', offsetLabel: 'MYT · UTC+8' },
    { name: 'Melaka', subdivision: 'Bandaraya Bersejarah UNESCO', timeZone: 'Asia/Kuala_Lumpur', offsetLabel: 'MYT · UTC+8' }
  ],
  SG: [
    { name: 'Singapore Central', subdivision: 'Downtown Core & Marina Bay', timeZone: 'Asia/Singapore', offsetLabel: 'SGT · UTC+8', isCapital: true },
    { name: 'Jurong West', subdivision: 'Jurong Innovation District & Tech Hub', timeZone: 'Asia/Singapore', offsetLabel: 'SGT · UTC+8' },
    { name: 'Changi & Tampines', subdivision: 'East Region & Aviation Gateway', timeZone: 'Asia/Singapore', offsetLabel: 'SGT · UTC+8' },
    { name: 'Woodlands', subdivision: 'North Regional Centre & Cross-Border', timeZone: 'Asia/Singapore', offsetLabel: 'SGT · UTC+8' },
    { name: 'Sentosa & Harbourfront', subdivision: 'Southern Islands & Tourism Port', timeZone: 'Asia/Singapore', offsetLabel: 'SGT · UTC+8' }
  ],
  TH: [
    { name: 'Bangkok (Krung Thep)', subdivision: 'Metropolitan & Pusat Kerajaan', timeZone: 'Asia/Bangkok', offsetLabel: 'ICT · UTC+7', isCapital: true },
    { name: 'Chiang Mai', subdivision: 'Thailand Utara & Pegunungan Lanna', timeZone: 'Asia/Bangkok', offsetLabel: 'ICT · UTC+7' },
    { name: 'Phuket', subdivision: 'Laut Andaman & Kepulauan Selatan', timeZone: 'Asia/Bangkok', offsetLabel: 'ICT · UTC+7' },
    { name: 'Pattaya & Chonburi', subdivision: 'Eastern Economic Corridor (EEC)', timeZone: 'Asia/Bangkok', offsetLabel: 'ICT · UTC+7' },
    { name: 'Hat Yai', subdivision: 'Songkhla & Pintu Perdagangan Selatan', timeZone: 'Asia/Bangkok', offsetLabel: 'ICT · UTC+7' }
  ],
  PH: [
    { name: 'Metro Manila', subdivision: 'National Capital Region (Luzon)', timeZone: 'Asia/Manila', offsetLabel: 'PST · UTC+8', isCapital: true },
    { name: 'Cebu City', subdivision: 'Central Visayas & Queen City of the South', timeZone: 'Asia/Manila', offsetLabel: 'PST · UTC+8' },
    { name: 'Davao City', subdivision: 'Mindanao & King City of the South', timeZone: 'Asia/Manila', offsetLabel: 'PST · UTC+8' },
    { name: 'Baguio City', subdivision: 'Benguet & Summer Capital of the Philippines', timeZone: 'Asia/Manila', offsetLabel: 'PST · UTC+8' },
    { name: 'Iloilo City', subdivision: 'Western Visayas & Heritage City', timeZone: 'Asia/Manila', offsetLabel: 'PST · UTC+8' }
  ],
  VN: [
    { name: 'Hanoi', subdivision: 'Ibukota Bersejarah & Politik Utara', timeZone: 'Asia/Ho_Chi_Minh', offsetLabel: 'ICT · UTC+7', isCapital: true },
    { name: 'Ho Chi Minh City', subdivision: 'Saigon & Pusat Finansial Selatan', timeZone: 'Asia/Ho_Chi_Minh', offsetLabel: 'ICT · UTC+7' },
    { name: 'Da Nang', subdivision: 'Vietnam Tengah & Kota Pesisir Modern', timeZone: 'Asia/Ho_Chi_Minh', offsetLabel: 'ICT · UTC+7' },
    { name: 'Hai Phong', subdivision: 'Pelabuhan Maritim Terbesar Utara', timeZone: 'Asia/Ho_Chi_Minh', offsetLabel: 'ICT · UTC+7' },
    { name: 'Can Tho', subdivision: 'Jantung Delta Sungai Mekong', timeZone: 'Asia/Ho_Chi_Minh', offsetLabel: 'ICT · UTC+7' }
  ],
  BN: [
    { name: 'Bandar Seri Begawan', subdivision: 'Daerah Brunei-Muara & Pusat Kerajaan', timeZone: 'Asia/Brunei', offsetLabel: 'BNT · UTC+8', isCapital: true },
    { name: 'Kuala Belait & Seria', subdivision: 'Daerah Belait & Pusat Minyak & Gas', timeZone: 'Asia/Brunei', offsetLabel: 'BNT · UTC+8' },
    { name: 'Pekan Tutong', subdivision: 'Daerah Tutong & Wisata Danau Merimbun', timeZone: 'Asia/Brunei', offsetLabel: 'BNT · UTC+8' },
    { name: 'Bangar Town', subdivision: 'Daerah Temburong & Hutan Tropika Ulu', timeZone: 'Asia/Brunei', offsetLabel: 'BNT · UTC+8' }
  ],
  JP: [
    { name: 'Tokyo', subdivision: 'Kanto & Ibukota Metropolitan', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9', isCapital: true },
    { name: 'Osaka & Kyoto', subdivision: 'Kansai & Jantung Budaya Bersejarah', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' },
    { name: 'Sapporo', subdivision: 'Hokkaido & Kawasan Salju Utara', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' },
    { name: 'Nagoya', subdivision: 'Chubu & Pusat Manufaktur Otomotif', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' },
    { name: 'Fukuoka', subdivision: 'Kyushu & Gerbang Startup Asia', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' },
    { name: 'Naha', subdivision: 'Okinawa & Kepulauan Tropis Ryukyu', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' }
  ],
  KR: [
    { name: 'Seoul', subdivision: 'Ibukota Metropolitan & Gangnam Tech District', timeZone: 'Asia/Seoul', offsetLabel: 'KST · UTC+9', isCapital: true },
    { name: 'Busan', subdivision: 'Gyeongsang & Kota Pelabuhan Terbesar', timeZone: 'Asia/Seoul', offsetLabel: 'KST · UTC+9' },
    { name: 'Incheon', subdivision: 'Gyeonggi & Gerbang Bandara Internasional', timeZone: 'Asia/Seoul', offsetLabel: 'KST · UTC+9' },
    { name: 'Daegu & Daejeon', subdivision: 'R&D City & Lembah Riset Sains', timeZone: 'Asia/Seoul', offsetLabel: 'KST · UTC+9' },
    { name: 'Jeju Special Province', subdivision: 'Pulau Vulkanik & Destinasi Wisata Dunia', timeZone: 'Asia/Seoul', offsetLabel: 'KST · UTC+9' }
  ],
  CN: [
    { name: 'Beijing', subdivision: 'Ibukota Negara & Pusat Kebudayaan', timeZone: 'Asia/Shanghai', offsetLabel: 'CST · UTC+8', isCapital: true },
    { name: 'Shanghai', subdivision: 'Pusat Keuangan Global & Bund', timeZone: 'Asia/Shanghai', offsetLabel: 'CST · UTC+8' },
    { name: 'Shenzhen & Guangzhou', subdivision: 'Guangdong & Greater Bay Area Tech Hub', timeZone: 'Asia/Shanghai', offsetLabel: 'CST · UTC+8' },
    { name: 'Chengdu & Chongqing', subdivision: 'Sichuan & Mega Megapolitan Barat Daya', timeZone: 'Asia/Shanghai', offsetLabel: 'CST · UTC+8' },
    { name: 'Hong Kong SAR', subdivision: 'Special Administrative Region (HKT)', timeZone: 'Asia/Hong_Kong', offsetLabel: 'HKT · UTC+8' }
  ],
  AU: [
    { name: 'Sydney', subdivision: 'New South Wales (AEST / AEDT)', timeZone: 'Australia/Sydney', offsetLabel: 'AEST/AEDT · UTC+10/+11' },
    { name: 'Melbourne', subdivision: 'Victoria & Ibukota Seni & Budaya', timeZone: 'Australia/Melbourne', offsetLabel: 'AEST/AEDT · UTC+10/+11' },
    { name: 'Canberra', subdivision: 'Australian Capital Territory (ACT)', timeZone: 'Australia/Sydney', offsetLabel: 'AEST/AEDT · UTC+10/+11', isCapital: true },
    { name: 'Brisbane & Gold Coast', subdivision: 'Queensland (AEST - Tanpa DST)', timeZone: 'Australia/Brisbane', offsetLabel: 'AEST · UTC+10' },
    { name: 'Adelaide', subdivision: 'South Australia (ACST / ACDT)', timeZone: 'Australia/Adelaide', offsetLabel: 'ACST/ACDT · UTC+9:30/+10:30' },
    { name: 'Perth', subdivision: 'Western Australia (AWST)', timeZone: 'Australia/Perth', offsetLabel: 'AWST · UTC+8' },
    { name: 'Darwin', subdivision: 'Northern Territory (ACST)', timeZone: 'Australia/Darwin', offsetLabel: 'ACST · UTC+9:30' },
    { name: 'Hobart', subdivision: 'Tasmania (AEST / AEDT)', timeZone: 'Australia/Hobart', offsetLabel: 'AEST/AEDT · UTC+10/+11' }
  ],
  US: [
    { name: 'New York City', subdivision: 'New York (Eastern Time - ET)', timeZone: 'America/New_York', offsetLabel: 'ET · UTC-5/-4' },
    { name: 'Washington, D.C.', subdivision: 'District of Columbia & Pusat Pemerintahan', timeZone: 'America/New_York', offsetLabel: 'ET · UTC-5/-4', isCapital: true },
    { name: 'Chicago', subdivision: 'Illinois (Central Time - CT)', timeZone: 'America/Chicago', offsetLabel: 'CT · UTC-6/-5' },
    { name: 'Houston & Dallas', subdivision: 'Texas (Central Time - CT)', timeZone: 'America/Chicago', offsetLabel: 'CT · UTC-6/-5' },
    { name: 'Denver', subdivision: 'Colorado (Mountain Time - MT)', timeZone: 'America/Denver', offsetLabel: 'MT · UTC-7/-6' },
    { name: 'Phoenix', subdivision: 'Arizona (Mountain Time - Tanpa DST)', timeZone: 'America/Phoenix', offsetLabel: 'MST · UTC-7' },
    { name: 'Los Angeles', subdivision: 'California (Pacific Time - PT)', timeZone: 'America/Los_Angeles', offsetLabel: 'PT · UTC-8/-7' },
    { name: 'San Francisco & Silicon Valley', subdivision: 'California (Pacific Time - PT)', timeZone: 'America/Los_Angeles', offsetLabel: 'PT · UTC-8/-7' },
    { name: 'Seattle', subdivision: 'Washington State (Pacific Time - PT)', timeZone: 'America/Los_Angeles', offsetLabel: 'PT · UTC-8/-7' },
    { name: 'Anchorage', subdivision: 'Alaska (Alaska Time - AKT)', timeZone: 'America/Anchorage', offsetLabel: 'AKT · UTC-9/-8' },
    { name: 'Honolulu', subdivision: 'Hawaii (Hawaii-Aleutian - HST)', timeZone: 'Pacific/Honolulu', offsetLabel: 'HST · UTC-10' }
  ],
  GB: [
    { name: 'London', subdivision: 'Greater London & City of London', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1', isCapital: true },
    { name: 'Manchester & Liverpool', subdivision: 'North West England', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' },
    { name: 'Birmingham', subdivision: 'West Midlands', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' },
    { name: 'Edinburgh & Glasgow', subdivision: 'Scotland (Skotlandia)', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' },
    { name: 'Cardiff & Swansea', subdivision: 'Wales (Selandia Wales)', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' },
    { name: 'Belfast', subdivision: 'Northern Ireland (Irlandia Utara)', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' }
  ],
  DE: [
    { name: 'Berlin', subdivision: 'Ibukota & Pusat Inovasi Startup', timeZone: 'Europe/Berlin', offsetLabel: 'CET/CEST · UTC+1/+2', isCapital: true },
    { name: 'Munich (München)', subdivision: 'Bavaria (Bayern) & Hub Teknologi', timeZone: 'Europe/Berlin', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Frankfurt am Main', subdivision: 'Hessen & Pusat Bank Sentral Eropa', timeZone: 'Europe/Berlin', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Hamburg', subdivision: 'Kota Pelabuhan Bebas & Elbe', timeZone: 'Europe/Berlin', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Cologne (Köln) & Düsseldorf', subdivision: 'Nordrhein-Westfalen', timeZone: 'Europe/Berlin', offsetLabel: 'CET/CEST · UTC+1/+2' }
  ],
  FR: [
    { name: 'Paris', subdivision: 'Île-de-France & Ibukota Dunia Mode', timeZone: 'Europe/Paris', offsetLabel: 'CET/CEST · UTC+1/+2', isCapital: true },
    { name: 'Marseille & Nice', subdivision: 'Provence & French Riviera Mediterania', timeZone: 'Europe/Paris', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Lyon', subdivision: 'Auvergne-Rhône-Alpes & Ibukota Gastronomi', timeZone: 'Europe/Paris', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Bordeaux & Toulouse', subdivision: 'Occitanie & Hub Dirgantara Aerospace', timeZone: 'Europe/Paris', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Strasbourg', subdivision: 'Alsace & Kursi Parlemen Eropa', timeZone: 'Europe/Paris', offsetLabel: 'CET/CEST · UTC+1/+2' }
  ],
  NL: [
    { name: 'Amsterdam', subdivision: 'Noord-Holland & Ibukota Kanal Bersejarah', timeZone: 'Europe/Amsterdam', offsetLabel: 'CET/CEST · UTC+1/+2', isCapital: true },
    { name: 'Rotterdam', subdivision: 'Zuid-Holland & Pelabuhan Terbesar di Eropa', timeZone: 'Europe/Amsterdam', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'The Hague (Den Haag)', subdivision: 'Pusat Pemerintahan & Mahkamah Dunia', timeZone: 'Europe/Amsterdam', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Utrecht', subdivision: 'Jantung Jaringan Rel Kereta & Universitas', timeZone: 'Europe/Amsterdam', offsetLabel: 'CET/CEST · UTC+1/+2' },
    { name: 'Eindhoven', subdivision: 'Noord-Brabant & Brainport Silicon City', timeZone: 'Europe/Amsterdam', offsetLabel: 'CET/CEST · UTC+1/+2' }
  ],
  SA: [
    { name: 'Riyadh', subdivision: 'Ibukota Kerajaan & Pusat Finansial Vision 2030', timeZone: 'Asia/Riyadh', offsetLabel: 'AST · UTC+3', isCapital: true },
    { name: 'Makkah al-Mukarramah', subdivision: 'Wilayah Hijaz & Masjidil Haram', timeZone: 'Asia/Riyadh', offsetLabel: 'AST · UTC+3' },
    { name: 'Madinah al-Munawwarah', subdivision: 'Wilayah Hijaz & Kota Nabi', timeZone: 'Asia/Riyadh', offsetLabel: 'AST · UTC+3' },
    { name: 'Jeddah', subdivision: 'Pesisir Laut Merah & Pintu Gerbang Haji', timeZone: 'Asia/Riyadh', offsetLabel: 'AST · UTC+3' },
    { name: 'Dammam & Al-Khobar', subdivision: 'Provinsi Timur & Pusat Energi Minyak', timeZone: 'Asia/Riyadh', offsetLabel: 'AST · UTC+3' }
  ],
  AE: [
    { name: 'Dubai', subdivision: 'Emirat Dubai & Megacity Bisnis Internasional', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4' },
    { name: 'Abu Dhabi', subdivision: 'Ibukota Uni Emirat Arab & Hub Kebudayaan', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4', isCapital: true },
    { name: 'Sharjah', subdivision: 'Emirat Sharjah & Pusat Warisan Islam', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4' },
    { name: 'Ras Al Khaimah', subdivision: 'Kawasan Pesisir & Pegunungan Jebel Jais', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4' },
    { name: 'Ajman & Fujairah', subdivision: 'Pesisir Teluk Oman & Pelabuhan Samudra', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4' }
  ],
  IN: [
    { name: 'New Delhi & NCR', subdivision: 'National Capital Region & Pusat Pemerintahan', timeZone: 'Asia/Kolkata', offsetLabel: 'IST · UTC+5:30', isCapital: true },
    { name: 'Mumbai', subdivision: 'Maharashtra & Pusat Bisnis Finansial Bollywood', timeZone: 'Asia/Kolkata', offsetLabel: 'IST · UTC+5:30' },
    { name: 'Bengaluru (Bangalore)', subdivision: 'Karnataka & Lembah Silikon India', timeZone: 'Asia/Kolkata', offsetLabel: 'IST · UTC+5:30' },
    { name: 'Kolkata', subdivision: 'West Bengal & Jantung Seni Intelektual', timeZone: 'Asia/Kolkata', offsetLabel: 'IST · UTC+5:30' },
    { name: 'Chennai & Hyderabad', subdivision: 'Tamil Nadu & Cyberabad IT Hub', timeZone: 'Asia/Kolkata', offsetLabel: 'IST · UTC+5:30' }
  ],
  BR: [
    { name: 'São Paulo', subdivision: 'Megapolitan Terbesar & Pusat Finansial', timeZone: 'America/Sao_Paulo', offsetLabel: 'BRT · UTC-3' },
    { name: 'Rio de Janeiro', subdivision: 'Pesisir Atlantik & Patung Kristus Penebus', timeZone: 'America/Sao_Paulo', offsetLabel: 'BRT · UTC-3' },
    { name: 'Brasília', subdivision: 'Distrito Federal & Ibukota Arsitektur Dunia', timeZone: 'America/Sao_Paulo', offsetLabel: 'BRT · UTC-3', isCapital: true },
    { name: 'Salvador da Bahia', subdivision: 'Nordeste & Warisan Sejarah Pelourinho', timeZone: 'America/Bahia', offsetLabel: 'BRT · UTC-3' },
    { name: 'Manaus', subdivision: 'Amazonas & Jantung Rimba Hutan Tropis', timeZone: 'America/Manaus', offsetLabel: 'AMT · UTC-4' },
    { name: 'Rio Branco', subdivision: 'Acre (Amazonian West Frontier)', timeZone: 'America/Rio_Branco', offsetLabel: 'ACT · UTC-5' }
  ],
  CA: [
    { name: 'Toronto', subdivision: 'Ontario (Eastern Time - ET)', timeZone: 'America/Toronto', offsetLabel: 'ET · UTC-5/-4' },
    { name: 'Ottawa', subdivision: 'Ibukota Federal Kanada (ET)', timeZone: 'America/Toronto', offsetLabel: 'ET · UTC-5/-4', isCapital: true },
    { name: 'Montreal', subdivision: 'Quebec & Metropolis Budaya Francophone (ET)', timeZone: 'America/Toronto', offsetLabel: 'ET · UTC-5/-4' },
    { name: 'Vancouver', subdivision: 'British Columbia (Pacific Time - PT)', timeZone: 'America/Vancouver', offsetLabel: 'PT · UTC-8/-7' },
    { name: 'Calgary & Edmonton', subdivision: 'Alberta (Mountain Time - MT)', timeZone: 'America/Edmonton', offsetLabel: 'MT · UTC-7/-6' },
    { name: 'Winnipeg', subdivision: 'Manitoba (Central Time - CT)', timeZone: 'America/Winnipeg', offsetLabel: 'CT · UTC-6/-5' },
    { name: 'Halifax', subdivision: 'Nova Scotia (Atlantic Time - AT)', timeZone: 'America/Halifax', offsetLabel: 'AT · UTC-4/-3' }
  ],
  OTHER: [
    { name: 'Greenwich Prime Meridian', subdivision: 'Pusat Standar Waktu Global Dunia', timeZone: 'UTC', offsetLabel: 'UTC · UTC+0', isCapital: true },
    { name: 'Tokyo Metropolis', subdivision: 'Jepang (Asia Timur)', timeZone: 'Asia/Tokyo', offsetLabel: 'JST · UTC+9' },
    { name: 'London City', subdivision: 'Britania Raya (Eropa Barat)', timeZone: 'Europe/London', offsetLabel: 'GMT/BST · UTC+0/+1' },
    { name: 'New York City', subdivision: 'Amerika Serikat (Pantai Timur)', timeZone: 'America/New_York', offsetLabel: 'ET · UTC-5/-4' },
    { name: 'Sydney Harbour', subdivision: 'Australia (Oseania)', timeZone: 'Australia/Sydney', offsetLabel: 'AEST/AEDT · UTC+10/+11' },
    { name: 'Dubai Downtown', subdivision: 'Uni Emirat Arab (Timur Tengah)', timeZone: 'Asia/Dubai', offsetLabel: 'GST · UTC+4' }
  ]
};
