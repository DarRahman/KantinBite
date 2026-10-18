import React from 'react';
import { View, Image } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  Stop,
  Polygon,
} from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * SNACK_GALLERY_CATALOG — Katalog 26+ Ilustrasi Jajanan Kantin & Gambar Universal Netral
 * Digunakan pada Modal Pop-Up Galeri di halaman Tambah/Edit Resep & HPP.
 */
export const SNACK_GALLERY_CATALOG = [
  // 1. GAMBAR UNIVERSAL NETRAL (Untuk Jajanan Unik Apa Saja)
  { key: 'universal_plate', label: 'Piring Saji Netral', category: 'Universal Netral' },
  { key: 'universal_box', label: 'Boks Mika Kue', category: 'Universal Netral' },
  { key: 'universal_leaf', label: 'Bungkus Daun Pisang', category: 'Universal Netral' },

  // 2. GORENGAN GURIH KANTIN
  { key: 'risoles_rogout', label: 'Risoles Rogout', category: 'Gorengan' },
  { key: 'pastel_telur', label: 'Pastel Telur Sayur', category: 'Gorengan' },
  { key: 'tahu_isi', label: 'Tahu Isi Pedas', category: 'Gorengan' },
  { key: 'bakwan_jagung', label: 'Bakwan Sayur / Jagung', category: 'Gorengan' },
  { key: 'tempe_mendoan', label: 'Tempe Mendoan', category: 'Gorengan' },
  { key: 'pisang_goreng', label: 'Pisang Goreng Crispy', category: 'Gorengan' },
  { key: 'martabak_telur', label: 'Martabak Mini Telur', category: 'Gorengan' },

  // 3. KUE BASAH & JAJANAN PASAR TRADISIONAL
  { key: 'dadar_gulung', label: 'Dadar Gulung Pandan', category: 'Kue Basah' },
  { key: 'lemper_ayam', label: 'Lemper Ayam Ketan', category: 'Kue Basah' },
  { key: 'kue_lumpur', label: 'Kue Lumpur Kentang', category: 'Kue Basah' },
  { key: 'klepon_pandan', label: 'Klepon Gula Aren', category: 'Kue Basah' },
  { key: 'onde_onde', label: 'Onde-Onde Wijen', category: 'Kue Basah' },
  { key: 'kue_lapis', label: 'Kue Lapis Beras', category: 'Kue Basah' },
  { key: 'putu_ayu', label: 'Putu Ayu Kelapa', category: 'Kue Basah' },
  { key: 'nagasari', label: 'Nagasari Pisang', category: 'Kue Basah' },

  // 4. ROTI, BOLU & PASTRY
  { key: 'bolu_kukus', label: 'Bolu Kukus Mekar', category: 'Roti & Bolu' },
  { key: 'donat_gula', label: 'Donat Gula / Meses', category: 'Roti & Bolu' },
  { key: 'brownies_coklat', label: 'Brownies Cokelat Keju', category: 'Roti & Bolu' },
  { key: 'sosis_solo', label: 'Sosis Solo Ayam', category: 'Roti & Bolu' },
  { key: 'pie_susu', label: 'Pie Susu Lumer', category: 'Roti & Bolu' },

  // 5. MINUMAN & PUDING KANTIN
  { key: 'puding_cup', label: 'Puding Cup Vla', category: 'Minuman & Puding' },
  { key: 'es_teh_cup', label: 'Es Teh / Jeruk Cup', category: 'Minuman & Puding' },
  { key: 'salad_buah', label: 'Salad Buah / Jelly', category: 'Minuman & Puding' },
];

const CeramicPlateBase = () => (
  <G>
    <Ellipse cx="64" cy="112" rx="50" ry="11" fill="#78350F" opacity="0.16" />
    <Ellipse cx="64" cy="104" rx="48" ry="14" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" />
    <Ellipse cx="64" cy="104" rx="36" ry="8.5" fill="#FEF3C7" />
  </G>
);

export default function AssetVisual({ name, size = 48, style }) {
  const s = size;

  // DUKUNGAN FOTO UNGGAHAN PENGGUNA SENDIRI (Data URI / File URI / HTTP)
  if (
    typeof name === 'string' &&
    (name.startsWith('data:image') ||
      name.startsWith('file://') ||
      name.startsWith('http://') ||
      name.startsWith('https://') ||
      name.startsWith('blob:'))
  ) {
    return (
      <View
        style={[
          {
            width: s,
            height: s,
            borderRadius: Math.round(s * 0.28),
            backgroundColor: '#FFFBEB',
            borderWidth: 2,
            borderColor: '#F59E0B',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <Image
          source={{ uri: name }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </View>
    );
  }

  const wrap = (svgContent) => (
    <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
        {svgContent}
      </Svg>
    </View>
  );

  switch (name) {
    // =========================================================================
    // 1. GAMBAR UNIVERSAL NETRAL (UNTUK JAJANAN UNIK APA SAJA)
    // =========================================================================
    case 'universal_plate':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M24 100 Q64 88 104 100 Q64 112 24 100 Z" fill="#10B981" stroke="#047857" strokeWidth="2.2" />
          {/* Kubah Kue Emas Netral */}
          <Path d="M32 94 C32 52, 96 52, 96 94 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="3.2" />
          <Path d="M40 90 C40 62, 88 62, 88 90" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
          <Circle cx="64" cy="54" r="7" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
          <Path d="M52 50 Q64 40 76 50" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
        </G>
      );

    case 'universal_box':
      return wrap(
        <G>
          <Ellipse cx="64" cy="112" rx="48" ry="10" fill="#78350F" opacity="0.16" />
          <Rect x="22" y="44" width="84" height="58" rx="12" fill="#FFFBEB" stroke="#D97706" strokeWidth="3.2" />
          <Path d="M22 62 H106" stroke="#F59E0B" strokeWidth="3" />
          {/* Pita Oranye */}
          <Rect x="56" y="44" width="16" height="58" fill="#EA580C" />
          <Path d="M46 44 C38 30, 58 28, 64 42 C70 28, 90 30, 82 44 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.8" />
          <Rect x="44" y="68" width="40" height="18" rx="5" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2" />
        </G>
      );

    case 'universal_leaf':
      return wrap(
        <G>
          <CeramicPlateBase />
          {/* Bungkusan Daun Pisang Segitiga / Tum */}
          <Path d="M28 98 L64 36 L100 98 Q64 106 28 98 Z" fill="#10B981" stroke="#064E3B" strokeWidth="3.2" strokeLinejoin="round" />
          <Path d="M44 96 L64 48 L84 96" stroke="#34D399" strokeWidth="3" />
          {/* Lidi Semat Bambu */}
          <Rect x="48" y="54" width="32" height="5" rx="2.5" fill="#FDE047" stroke="#78350F" strokeWidth="2" />
        </G>
      );

    // =========================================================================
    // 2. GORENGAN GURIH KANTIN
    // =========================================================================
    case 'risoles_rogout':
    case 'risoles':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M22 100 Q64 88 106 100 Q64 114 22 100 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <Rect x="28" y="38" width="72" height="36" rx="18" transform="rotate(-7 28 38)" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <Rect x="22" y="54" width="82" height="42" rx="21" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" />
          <Path d="M36 68 Q48 58 58 70 T78 68 T92 72" stroke="#FFFBEB" strokeWidth="4.5" strokeLinecap="round" />
          <Path d="M84 96 Q102 92 110 82" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
          <Circle cx="38" cy="82" r="2.4" fill="#FEF08A" />
          <Circle cx="56" cy="84" r="2.4" fill="#78350F" />
          <Circle cx="76" cy="82" r="2.4" fill="#FEF08A" />
        </G>
      );

    case 'pastel_telur':
    case 'pastel':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M22 92 C22 44, 106 44, 106 92 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="3.4" />
          <Path
            d="M18 92 Q24 81 30 92 Q36 81 42 92 Q48 81 54 92 Q60 81 66 92 Q72 81 78 92 Q84 81 90 92 Q96 81 102 92 Q106 84 110 92"
            fill="#FDE68A"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Circle cx="64" cy="72" r="13" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />
          <Circle cx="64" cy="72" r="6.5" fill="#EA580C" />
          <Circle cx="44" cy="76" r="3.5" fill="#10B981" />
          <Circle cx="84" cy="76" r="3.5" fill="#EA580C" />
        </G>
      );

    case 'tahu_isi':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Polygon points="28,88 48,44 86,52 98,92 42,98" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" strokeLinejoin="round" />
          <Path d="M46 60 Q64 48 82 62" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
          <Path d="M50 66 Q66 56 78 68" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
          <Path d="M84 96 Q102 90 108 78" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
        </G>
      );

    case 'bakwan_jagung':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Circle cx="64" cy="74" r="32" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" />
          <Circle cx="52" cy="66" r="5" fill="#FDE047" stroke="#92400E" strokeWidth="1.8" />
          <Circle cx="74" cy="64" r="5" fill="#FDE047" stroke="#92400E" strokeWidth="1.8" />
          <Circle cx="64" cy="82" r="5" fill="#FDE047" stroke="#92400E" strokeWidth="1.8" />
          <Path d="M44 78 L56 72 M70 76 L82 70 M54 54 L66 60" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <Path d="M48 86 L60 88 M72 86 L80 80" stroke="#EA580C" strokeWidth="3.2" strokeLinecap="round" />
        </G>
      );

    case 'tempe_mendoan':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="26" y="48" width="54" height="44" rx="8" transform="rotate(-10 26 48)" fill="#FDE047" stroke="#78350F" strokeWidth="3" />
          <Rect x="44" y="54" width="56" height="44" rx="8" transform="rotate(6 44 54)" fill="#FACC15" stroke="#78350F" strokeWidth="3.2" />
          {/* Irisan Daun Bawang Hijau */}
          <Circle cx="58" cy="68" r="3" fill="#15803D" />
          <Circle cx="74" cy="72" r="3" fill="#15803D" />
          <Circle cx="64" cy="84" r="3" fill="#15803D" />
          <Circle cx="82" cy="84" r="3" fill="#15803D" />
          {/* Sambal Kecap Rawit */}
          <Circle cx="36" cy="92" r="10" fill="#431407" stroke="#FDE68A" strokeWidth="2" />
          <Circle cx="36" cy="92" r="3" fill="#DC2626" />
        </G>
      );

    case 'pisang_goreng':
      return wrap(
        <G>
          <CeramicPlateBase />
          {/* Pisang Goreng Mekar Kipas */}
          <Path d="M30 94 C26 60, 46 44, 54 86" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <Path d="M48 94 C48 54, 72 40, 72 88" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
          <Path d="M66 94 C72 56, 98 48, 94 94" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <Rect x="34" y="84" width="56" height="14" rx="7" fill="#D97706" stroke="#78350F" strokeWidth="2.8" />
          {/* Taburan Keju / Cokelat */}
          <Path d="M42 72 H82 M46 64 H76" stroke="#FEF9C3" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
        </G>
      );

    case 'martabak_telur':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="28" y="52" width="72" height="44" rx="10" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" />
          <Path d="M28 74 H100 M64 52 V96" stroke="#92400E" strokeWidth="2.5" />
          <Circle cx="46" cy="63" r="3" fill="#15803D" />
          <Circle cx="82" cy="63" r="3" fill="#EA580C" />
          <Circle cx="46" cy="85" r="3" fill="#EA580C" />
          <Circle cx="82" cy="85" r="3" fill="#15803D" />
        </G>
      );

    // =========================================================================
    // 3. KUE BASAH & JAJANAN PASAR TRADISIONAL
    // =========================================================================
    case 'dadar_gulung':
    case 'dadar':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="28" y="42" width="68" height="32" rx="16" transform="rotate(-6 28 42)" fill="#059669" stroke="#064E3B" strokeWidth="3" />
          <Rect x="22" y="58" width="78" height="36" rx="18" fill="#10B981" stroke="#064E3B" strokeWidth="3.4" />
          <Ellipse cx="92" cy="76" rx="11" ry="16" fill="#047857" stroke="#064E3B" strokeWidth="2.8" />
          <Ellipse cx="92" cy="76" rx="6.5" ry="10" fill="#92400E" />
          <Circle cx="42" cy="72" r="2.2" fill="#A7F3D0" />
          <Circle cx="58" cy="78" r="2.2" fill="#A7F3D0" />
          <Circle cx="72" cy="70" r="2.2" fill="#A7F3D0" />
        </G>
      );

    case 'lemper_ayam':
    case 'lemper':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="26" y="54" width="76" height="40" rx="14" fill="#15803D" stroke="#052E16" strokeWidth="3.4" />
          <Rect x="44" y="54" width="40" height="40" fill="#F8FAFC" stroke="#052E16" strokeWidth="2.8" />
          <Path d="M52 68 H76 M52 78 H72" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <Rect x="20" y="71" width="88" height="5" rx="2.5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.8" />
        </G>
      );

    case 'kue_lumpur':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Ellipse cx="64" cy="78" rx="38" ry="22" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" />
          <Ellipse cx="64" cy="74" rx="31" ry="16" fill="#FDE047" />
          <Ellipse cx="64" cy="72" rx="9" ry="5.5" fill="#7C2D12" />
          <Path d="M46 66 Q54 62 62 66" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </G>
      );

    case 'klepon_pandan':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M24 98 Q64 84 104 98 Q64 110 24 98 Z" fill="#059669" />
          <Circle cx="46" cy="76" r="16" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
          <Circle cx="80" cy="76" r="16" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
          <Circle cx="64" cy="58" r="16" fill="#34D399" stroke="#064E3B" strokeWidth="3" />
          <Path d="M56 54 Q64 48 72 54 M38 74 Q46 68 54 74 M72 74 Q80 68 88 74" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 4" />
        </G>
      );

    case 'onde_onde':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Circle cx="48" cy="76" r="19" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <Circle cx="80" cy="74" r="20" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <Circle cx="44" cy="70" r="2" fill="#FEF3C7" />
          <Circle cx="52" cy="78" r="2" fill="#FEF3C7" />
          <Circle cx="76" cy="68" r="2" fill="#FEF3C7" />
          <Circle cx="86" cy="74" r="2" fill="#FEF3C7" />
          <Circle cx="78" cy="82" r="2" fill="#FEF3C7" />
        </G>
      );

    case 'kue_lapis':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="32" y="48" width="64" height="48" rx="8" fill="#FFFFFF" stroke="#78350F" strokeWidth="3.2" />
          <Rect x="34" y="50" width="60" height="11" rx="4" fill="#EA580C" />
          <Rect x="34" y="62" width="60" height="10" fill="#FFFBEB" />
          <Rect x="34" y="72" width="60" height="11" fill="#10B981" />
          <Rect x="34" y="83" width="60" height="11" rx="4" fill="#FDE047" />
        </G>
      );

    case 'putu_ayu':
      return wrap(
        <G>
          <CeramicPlateBase />
          {/* Dasar Hijau Pandan */}
          <Path d="M30 96 L36 66 H92 L98 96 Z" fill="#10B981" stroke="#064E3B" strokeWidth="3.2" strokeLinejoin="round" />
          {/* Toping Kelapa Putih Bergelombang */}
          <Path d="M34 68 C34 48, 94 48, 94 68 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <Circle cx="64" cy="64" r="6" fill="#059669" />
        </G>
      );

    case 'nagasari':
      return wrap(
        <G>
          <CeramicPlateBase />
          {/* Lipatan Daun Pisang */}
          <Rect x="28" y="54" width="72" height="42" rx="10" fill="#15803D" stroke="#052E16" strokeWidth="3.2" />
          {/* Bagian Terbuka Menampilkan Adonan Putih & Pisang Kuning */}
          <Rect x="42" y="58" width="44" height="34" rx="6" fill="#FFFBEB" />
          <Circle cx="64" cy="75" r="10" fill="#FACC15" stroke="#B45309" strokeWidth="2.2" />
          <Circle cx="64" cy="75" r="3" fill="#78350F" />
        </G>
      );

    // =========================================================================
    // 4. ROTI, BOLU & PASTRY
    // =========================================================================
    case 'bolu_kukus':
      return wrap(
        <G>
          <CeramicPlateBase />
          {/* Cup Kertas Bolu */}
          <Path d="M38 72 H90 L82 98 H46 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" />
          {/* Kelopak Mekar */}
          <Circle cx="48" cy="62" r="16" fill="#FB7185" stroke="#9F1239" strokeWidth="2.8" />
          <Circle cx="80" cy="62" r="16" fill="#FB7185" stroke="#9F1239" strokeWidth="2.8" />
          <Circle cx="64" cy="54" r="18" fill="#FFFBEB" stroke="#9A3412" strokeWidth="2.8" />
        </G>
      );

    case 'donat_gula':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Circle cx="64" cy="74" r="30" fill="#D97706" stroke="#78350F" strokeWidth="3.4" />
          <Circle cx="64" cy="72" r="26" fill="#7C2D12" />
          <Circle cx="64" cy="74" r="10" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.8" />
          {/* Taburan Meses Warna-warni Hangat */}
          <Path d="M46 62 L52 60 M76 60 L82 64 M46 82 L52 86 M76 84 L82 80 M60 52 L66 52" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        </G>
      );

    case 'brownies_coklat':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="28" y="54" width="72" height="42" rx="8" fill="#431407" stroke="#27272A" strokeWidth="3.2" />
          {/* Parutan Keju Melimpah di Atas */}
          <Path d="M34 62 Q48 56 64 62 T94 60" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />
          <Path d="M38 70 Q54 66 70 70 T90 68" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
          <Circle cx="64" cy="52" r="6" fill="#DC2626" />
        </G>
      );

    case 'sosis_solo':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Rect x="24" y="48" width="76" height="24" rx="12" fill="#FDE047" stroke="#92400E" strokeWidth="3" />
          <Rect x="28" y="68" width="76" height="26" rx="13" fill="#FACC15" stroke="#78350F" strokeWidth="3.2" />
          <Path d="M42 80 H88" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </G>
      );

    case 'pie_susu':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M24 72 L34 98 H94 L104 72 Z" fill="#D97706" stroke="#78350F" strokeWidth="3.2" strokeLinejoin="round" />
          <Ellipse cx="64" cy="72" rx="40" ry="14" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <Ellipse cx="64" cy="72" rx="30" ry="9" fill="#FEF08A" />
        </G>
      );

    // =========================================================================
    // 5. MINUMAN & PUDING KANTIN
    // =========================================================================
    case 'puding_cup':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M34 56 H94 L84 98 H44 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3.2" strokeLinejoin="round" />
          <Path d="M36 56 H92 L90 70 H38 Z" fill="#7C2D12" />
          <Ellipse cx="64" cy="56" rx="30" ry="8" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.8" />
          <Circle cx="64" cy="54" r="5" fill="#EA580C" />
        </G>
      );

    case 'es_teh_cup':
      return wrap(
        <G>
          <Ellipse cx="64" cy="112" rx="40" ry="9" fill="#78350F" opacity="0.16" />
          {/* Sedotan Oranye */}
          <Path d="M68 42 L78 16 L90 16" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Cup Minuman Segar */}
          <Path d="M36 42 H92 L84 106 H44 Z" fill="#D97706" stroke="#78350F" strokeWidth="3.2" strokeLinejoin="round" />
          <Rect x="32" y="38" width="64" height="8" rx="4" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.8" />
          {/* Es Batu */}
          <Rect x="48" y="54" width="12" height="12" rx="3" fill="#FEF3C7" />
          <Rect x="66" y="58" width="12" height="12" rx="3" fill="#FEF3C7" />
        </G>
      );

    case 'salad_buah':
      return wrap(
        <G>
          <CeramicPlateBase />
          <Path d="M30 64 H98 L88 98 H40 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="3.2" strokeLinejoin="round" />
          <Circle cx="48" cy="60" r="10" fill="#FB7185" stroke="#9F1239" strokeWidth="2.2" />
          <Circle cx="64" cy="56" r="11" fill="#FACC15" stroke="#92400E" strokeWidth="2.2" />
          <Circle cx="80" cy="60" r="10" fill="#10B981" stroke="#065F46" strokeWidth="2.2" />
          <Path d="M40 68 Q64 60 88 68" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        </G>
      );

    // =========================================================================
    // 6. BAHAN BAKU DAPUR (INGREDIENTS)
    // =========================================================================
    case 'wheat_flour':
      return wrap(
        <G>
          <Path d="M32 34 C32 24, 96 24, 96 34 L102 98 C102 108, 26 108, 26 98 Z" fill="#FDE68A" stroke="#92400E" strokeWidth="4" />
          <Rect x="38" y="24" width="52" height="12" rx="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
          <Circle cx="64" cy="68" r="20" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.5" />
          <Path d="M64 54 V82 M54 64 L64 72 L74 64" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
        </G>
      );

    case 'egg_raw':
      return wrap(
        <G>
          <Path d="M46 26 C30 26, 22 58, 22 78 C22 98, 36 108, 52 108 C68 108, 78 96, 78 78 C78 58, 62 26, 46 26 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="3.8" />
          <Ellipse cx="78" cy="84" rx="30" ry="20" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
          <Circle cx="78" cy="82" r="11" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
        </G>
      );

    case 'oil_butter':
      return wrap(
        <G>
          <Rect x="48" y="16" width="32" height="14" rx="4" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
          <Path d="M42 30 H86 L96 52 V102 C96 108, 88 112, 82 112 H46 C40 112, 32 108, 32 102 V52 Z" fill="#FACC15" stroke="#92400E" strokeWidth="3.8" />
          <Rect x="42" y="62" width="44" height="26" rx="6" fill="#FFFBEB" stroke="#B45309" strokeWidth="2.5" />
        </G>
      );

    case 'gas_cylinder':
      return wrap(
        <G>
          <Path d="M46 18 H82 V36 H46 Z" fill="#15803D" stroke="#052E16" strokeWidth="3.5" />
          <Rect x="30" y="34" width="68" height="68" rx="26" fill="#22C55E" stroke="#052E16" strokeWidth="4" />
          <Rect x="34" y="64" width="60" height="12" fill="#DC2626" />
          <Rect x="44" y="100" width="40" height="10" rx="4" fill="#15803D" stroke="#052E16" strokeWidth="3" />
        </G>
      );

    case 'meat_chicken':
      return wrap(
        <G>
          <Circle cx="88" cy="84" r="9" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
          <Circle cx="96" cy="74" r="9" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
          <Path d="M68 62 L90 80" stroke="#F8FAFC" strokeWidth="12" strokeLinecap="round" />
          <Path d="M26 48 C26 26, 62 24, 76 44 C88 60, 76 82, 56 80 C36 78, 26 66, 26 48 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.8" />
        </G>
      );

    case 'carrot_veg':
      return wrap(
        <G>
          <Path d="M76 28 C84 14, 98 18, 92 34 C104 28, 108 42, 92 46" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <Path d="M84 32 L34 102 C28 108, 22 102, 28 94 L68 26 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.8" strokeLinejoin="round" />
        </G>
      );

    case 'sugar_cane':
      return wrap(
        <G>
          <Rect x="28" y="54" width="46" height="44" rx="10" fill="#B45309" stroke="#451A03" strokeWidth="3.5" />
          <Rect x="56" y="42" width="46" height="56" rx="10" fill="#D97706" stroke="#451A03" strokeWidth="3.5" />
        </G>
      );

    case 'package_box':
      return wrap(
        <G>
          <Polygon points="64,20 106,40 106,88 64,108 22,88 22,40" fill="#F59E0B" stroke="#78350F" strokeWidth="3.8" strokeLinejoin="round" />
          <Path d="M22 40 L64 60 L106 40 M64 60 V108" stroke="#78350F" strokeWidth="3.5" />
        </G>
      );

    // =========================================================================
    // 7. IKON OPERASIONAL & STATUS
    // =========================================================================
    case 'chef_mascot':
    case 'mascot_celebrate':
    case 'mascot_fire':
    case 'mascot_star':
      return (
        <Mascot
          size={s}
          pose={name === 'mascot_celebrate' ? 'celebrate' : 'default'}
          animated={false}
          style={style}
        />
      );

    case 'coin_gold':
      return wrap(
        <G>
          <Circle cx="64" cy="64" r="46" fill="#FBBF24" stroke="#92400E" strokeWidth="4" />
          <Circle cx="64" cy="64" r="35" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
          <Path d="M64 42 V86 M52 54 H72 C78 54, 78 64, 72 64 H54 C48 64, 48 74, 54 74 H76" stroke="#92400E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );

    case 'wallet_purse':
    case 'money_cash':
      return wrap(
        <G>
          <Rect x="24" y="22" width="72" height="40" rx="8" transform="rotate(-8 24 22)" fill="#10B981" stroke="#064E3B" strokeWidth="3.2" />
          <Rect x="16" y="38" width="92" height="64" rx="16" fill="#D97706" stroke="#451A03" strokeWidth="4" />
          <Rect x="72" y="58" width="40" height="24" rx="10" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
          <Circle cx="86" cy="70" r="5" fill="#FDE047" />
        </G>
      );

    case 'canteen_shop':
      return wrap(
        <G>
          <Rect x="22" y="48" width="84" height="58" rx="8" fill="#FFFBEB" stroke="#78350F" strokeWidth="3.8" />
          <Rect x="34" y="64" width="34" height="26" rx="4" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
          <Rect x="76" y="64" width="18" height="42" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
          <Path d="M14 48 L26 24 H102 L114 48 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.8" strokeLinejoin="round" />
        </G>
      );

    case 'market_cart':
      return wrap(
        <G>
          <Circle cx="52" cy="40" r="14" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
          <Circle cx="78" cy="38" r="14" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
          <Path d="M16 26 H30 L42 78 H96 L108 42 H34" fill="#FED7AA" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="48" cy="96" r="10" fill="#431407" />
          <Circle cx="88" cy="96" r="10" fill="#431407" />
        </G>
      );

    case 'receipt_bill':
      return wrap(
        <G>
          <Path d="M28 16 H100 V110 L88 100 L76 110 L64 100 L52 110 L40 100 L28 110 Z" fill="#FFFBEB" stroke="#92400E" strokeWidth="3.8" strokeLinejoin="round" />
          <Path d="M44 40 H84 M44 56 H84 M44 72 H68" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" />
        </G>
      );

    case 'chart_up':
      return wrap(
        <G>
          <Rect x="22" y="68" width="18" height="36" rx="5" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" />
          <Rect x="54" y="48" width="18" height="56" rx="5" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />
          <Rect x="86" y="28" width="18" height="76" rx="5" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
        </G>
      );

    case 'cooking_pan':
      return wrap(
        <G>
          <Path d="M84 64 L118 48" stroke="#78350F" strokeWidth="9" strokeLinecap="round" />
          <Circle cx="54" cy="68" r="36" fill="#431407" stroke="#78350F" strokeWidth="4" />
          <Circle cx="54" cy="68" r="14" fill="#FACC15" />
        </G>
      );

    case 'check_badge':
      return wrap(
        <G>
          <Circle cx="64" cy="64" r="46" fill="#10B981" stroke="#064E3B" strokeWidth="4" />
          <Path d="M42 64 L58 80 L88 48" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );

    case 'warning_badge':
      return wrap(
        <G>
          <Polygon points="64,16 112,102 16,102" fill="#F59E0B" stroke="#78350F" strokeWidth="4" strokeLinejoin="round" />
          <Path d="M64 46 V74" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
          <Circle cx="64" cy="88" r="4.5" fill="#FFFFFF" />
        </G>
      );

    default:
      return wrap(
        <G>
          <CeramicPlateBase />
          <Circle cx="64" cy="68" r="28" fill="#F59E0B" stroke="#78350F" strokeWidth="3.4" />
          <Path d="M52 68 H76 M64 56 V80" stroke="#FFFBEB" strokeWidth="4" strokeLinecap="round" />
        </G>
      );
  }
}
