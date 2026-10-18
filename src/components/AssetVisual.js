import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Polygon,
  Line,
} from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * AssetVisual Engine — High-Craft Plated Nusantara Snacks, Ingredients & Operational Icons
 * Seluruh jajanan disajikan di atas piring keramik / alas daun pisang dengan detail tekstur,
 * saus cabai/unti kelapa, dan pencahayaan volumetrik bebas emoji.
 */
export default function AssetVisual({ name, size = 48, style }) {
  const s = size;

  switch (name) {
    // =========================================================================
    // 1. JAJANAN PASAR & KUE NUSANTARA (PLATED VOLUMETRIC ILLUSTRATIONS)
    // =========================================================================
    case 'risoles_rogout':
    case 'risoles':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Defs>
              <LinearGradient id="gRisolesPlate" x1="16" y1="80" x2="112" y2="118" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#FFFBEB" />
                <Stop offset="100%" stopColor="#FDE68A" />
              </LinearGradient>
              <LinearGradient id="gRisolesBody" x1="20" y1="26" x2="104" y2="96" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#FDE047" />
                <Stop offset="35%" stopColor="#F59E0B" />
                <Stop offset="80%" stopColor="#D97706" />
                <Stop offset="100%" stopColor="#92400E" />
              </LinearGradient>
            </Defs>
            {/* Bayangan & Piring Keramik Krem */}
            <Ellipse cx="64" cy="112" rx="52" ry="12" fill="#78350F" opacity="0.18" />
            <Ellipse cx="64" cy="104" rx="50" ry="15" fill="url(#gRisolesPlate)" stroke="#D97706" strokeWidth="3" />
            <Ellipse cx="64" cy="104" rx="38" ry="9" fill="#FEF3C7" />
            {/* Alas Daun Pisang Segar */}
            <Path d="M22 100 Q64 88 106 100 Q64 114 22 100 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
            {/* Risoles Belakang (Tumpuk 2) */}
            <Rect
              x="28"
              y="36"
              width="74"
              height="38"
              rx="19"
              transform="rotate(-8 28 36)"
              fill="#D97706"
              stroke="#78350F"
              strokeWidth="3.2"
            />
            {/* Risoles Utama Depan */}
            <Rect
              x="22"
              y="52"
              width="82"
              height="44"
              rx="22"
              fill="url(#gRisolesBody)"
              stroke="#78350F"
              strokeWidth="3.5"
            />
            {/* Lelehan Saus Mayo & Cabai Rawit Hijau */}
            <Path
              d="M36 66 Q48 56 58 68 T78 66 T92 70"
              stroke="#FFFBEB"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <Path d="M84 96 Q102 92 110 82" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
            <Circle cx="36" cy="80" r="2.2" fill="#78350F" />
            <Circle cx="52" cy="84" r="2.5" fill="#FEF08A" />
            <Circle cx="68" cy="78" r="2.2" fill="#78350F" />
            <Circle cx="82" cy="84" r="2.5" fill="#FEF08A" />
            {/* Kepulan Uap Hangat */}
            <Path d="M48 26 Q44 18 50 12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <Path d="M68 22 Q64 14 70 8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          </Svg>
        </View>
      );

    case 'pastel_telur':
    case 'pastel':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Defs>
              <LinearGradient id="gPastelBody" x1="20" y1="28" x2="108" y2="104" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#FEF08A" />
                <Stop offset="40%" stopColor="#FBBF24" />
                <Stop offset="85%" stopColor="#D97706" />
                <Stop offset="100%" stopColor="#92400E" />
              </LinearGradient>
            </Defs>
            <Ellipse cx="64" cy="112" rx="50" ry="11" fill="#78350F" opacity="0.16" />
            <Ellipse cx="64" cy="104" rx="48" ry="14" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.8" />
            {/* Kubah Pastel Renyah */}
            <Path d="M18 90 C20 34 108 34 110 90 Z" fill="url(#gPastelBody)" stroke="#78350F" strokeWidth="3.5" />
            {/* Lipatan Pilin Pinggiran Khas Pastel */}
            <Path
              d="M14 90 Q20 100 26 90 Q32 100 38 90 Q44 100 50 90 Q56 100 62 90 Q68 100 74 90 Q80 100 86 90 Q92 100 98 90 Q104 100 110 90"
              stroke="#78350F"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="#FDE68A"
            />
            {/* Intipan Telur & Wortel Gurih */}
            <Circle cx="56" cy="68" r="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
            <Circle cx="56" cy="68" r="5" fill="#EA580C" />
            <Rect x="72" y="64" width="10" height="6" rx="2" fill="#EA580C" />
            <Rect x="40" y="74" width="8" height="5" rx="2" fill="#10B981" />
            <Path d="M34 54 Q64 42 92 54" stroke="#FEF9C3" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
          </Svg>
        </View>
      );

    case 'dadar_gulung':
    case 'dadar':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Defs>
              <LinearGradient id="gDadarBody" x1="20" y1="30" x2="104" y2="100" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#6EE7B7" />
                <Stop offset="35%" stopColor="#10B981" />
                <Stop offset="85%" stopColor="#059669" />
                <Stop offset="100%" stopColor="#064E3B" />
              </LinearGradient>
            </Defs>
            <Ellipse cx="64" cy="112" rx="48" ry="11" fill="#064E3B" opacity="0.16" />
            <Ellipse cx="64" cy="104" rx="46" ry="13" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.8" />
            {/* Gulungan Belakang */}
            <Rect
              x="28"
              y="36"
              width="70"
              height="36"
              rx="18"
              transform="rotate(-7 28 36)"
              fill="#059669"
              stroke="#064E3B"
              strokeWidth="3"
            />
            {/* Gulungan Pandan Utama */}
            <Rect
              x="22"
              y="52"
              width="80"
              height="44"
              rx="22"
              fill="url(#gDadarBody)"
              stroke="#064E3B"
              strokeWidth="3.5"
            />
            {/* Ujung Terbuka Menampilkan Unti Kelapa Gula Merah */}
            <Ellipse cx="92" cy="74" rx="9" ry="18" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <Ellipse cx="92" cy="74" rx="5" ry="11" fill="#B45309" />
            {/* Tekstur Bopeng Halus Kulit Dadar */}
            <Circle cx="38" cy="68" r="2.2" fill="#A7F3D0" />
            <Circle cx="50" cy="78" r="2.5" fill="#A7F3D0" />
            <Circle cx="64" cy="66" r="2.2" fill="#A7F3D0" />
            <Circle cx="74" cy="80" r="2.5" fill="#A7F3D0" />
            <Path d="M34 60 Q60 54 84 60" stroke="#D1FAE5" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
          </Svg>
        </View>
      );

    case 'lemper_ayam':
    case 'lemper':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Defs>
              <LinearGradient id="gLemperLeaf" x1="24" y1="30" x2="104" y2="102" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#34D399" />
                <Stop offset="45%" stopColor="#059669" />
                <Stop offset="100%" stopColor="#064E3B" />
              </LinearGradient>
            </Defs>
            <Ellipse cx="64" cy="112" rx="46" ry="10" fill="#064E3B" opacity="0.16" />
            <Ellipse cx="64" cy="104" rx="46" ry="13" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.8" />
            {/* Bungkus Daun Pisang Mengkilap */}
            <Rect x="26" y="42" width="76" height="54" rx="14" fill="url(#gLemperLeaf)" stroke="#064E3B" strokeWidth="3.5" />
            {/* Garis Serat Daun Pisang */}
            <Path d="M40 42 V96 M56 42 V96 M72 42 V96 M88 42 V96" stroke="#A7F3D0" strokeWidth="2" opacity="0.45" />
            {/* Sabuk Ketan Putih Terbuka Tengah */}
            <Rect x="48" y="42" width="32" height="54" fill="#FFFBEB" stroke="#064E3B" strokeWidth="2.5" />
            <Circle cx="64" cy="68" r="8" fill="#F59E0B" opacity="0.85" />
            {/* Sematan Lidi Bambu */}
            <Path d="M16 68 H112" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'kue_lumpur':
    case 'klepon_pandan':
    case 'onde_onde':
    case 'tahu_isi':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Ellipse cx="64" cy="110" rx="46" ry="11" fill="#78350F" opacity="0.16" />
            <Ellipse cx="64" cy="102" rx="46" ry="14" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.8" />
            <Circle cx="48" cy="74" r="22" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
            <Circle cx="80" cy="76" r="20" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
            <Circle cx="64" cy="56" r="22" fill="#FDE047" stroke="#78350F" strokeWidth="3" />
            {/* Topping Kismis / Wijen */}
            <Circle cx="64" cy="52" r="5" fill="#451A03" />
            <Circle cx="46" cy="70" r="4.5" fill="#451A03" />
            <Circle cx="80" cy="72" r="4.5" fill="#451A03" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 2. BAHAN BAKU DAPUR BER-ILUSTRASI PENUH
    // =========================================================================
    case 'wheat_flour':
    case 'flour':
    case 'terigu':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="70" rx="26" ry="6" fill="#78350F" opacity="0.15" />
            {/* Karung Terigu Goni Hangat */}
            <Path
              d="M22 24 C20 14, 60 14, 58 24 L64 62 C64 70, 16 70, 16 62 Z"
              fill="#FDE68A"
              stroke="#78350F"
              strokeWidth="2.8"
            />
            <Path d="M28 16 Q40 22 52 16" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
            <Circle cx="40" cy="44" r="13" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
            {/* Bulir Gandum Emas */}
            <Path d="M40 35 V53 M35 40 L40 44 L45 40 M35 46 L40 50 L45 46" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'egg_raw':
    case 'egg':
    case 'telur':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="68" rx="28" ry="6" fill="#78350F" opacity="0.15" />
            {/* Telur Utuh Belakang */}
            <Ellipse cx="28" cy="42" rx="15" ry="20" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.6" />
            <Ellipse cx="24" cy="34" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.7" />
            {/* Telur Ceplok Kuning Cerah di Depan */}
            <Ellipse cx="48" cy="50" rx="20" ry="15" fill="#FFFFFF" stroke="#78350F" strokeWidth="2.6" />
            <Circle cx="48" cy="49" r="8.5" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <Circle cx="45" cy="46" r="2.5" fill="#FEF08A" />
          </Svg>
        </View>
      );

    case 'oil_butter':
    case 'oil':
    case 'minyak':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="70" rx="24" ry="5" fill="#78350F" opacity="0.15" />
            {/* Botol Jerigen Minyak Goreng Emas */}
            <Rect x="33" y="10" width="14" height="7" rx="2" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.2" />
            <Path
              d="M28 24 L33 17 H47 L52 24 L56 64 C56 68, 24 68, 24 64 Z"
              fill="#FBBF24"
              stroke="#78350F"
              strokeWidth="2.8"
            />
            {/* Pegangan Botol */}
            <Path d="M52 28 H60 V44 H54" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <Rect x="30" y="36" width="20" height="16" rx="4" fill="#FFFBEB" />
            <Circle cx="40" cy="44" r="4.5" fill="#EA580C" />
          </Svg>
        </View>
      );

    case 'gas_cylinder':
    case 'gas':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="70" rx="24" ry="5" fill="#064E3B" opacity="0.16" />
            {/* Kerah Pelindung Tabung Melon */}
            <Path d="M28 14 H52 V26 H28 Z" fill="#10B981" stroke="#064E3B" strokeWidth="2.6" />
            <Rect x="36" y="10" width="8" height="5" rx="2" fill="#DC2626" />
            {/* Badan Tabung Gas Melon 3kg */}
            <Circle cx="40" cy="44" r="22" fill="#34D399" stroke="#064E3B" strokeWidth="2.8" />
            <Path d="M20 44 H60" stroke="#DC2626" strokeWidth="3.5" />
            <Rect x="28" y="62" width="24" height="6" rx="2" fill="#059669" stroke="#064E3B" strokeWidth="2.4" />
          </Svg>
        </View>
      );

    case 'meat_chicken':
    case 'chicken':
    case 'ayam':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="68" rx="26" ry="6" fill="#7C2D12" opacity="0.15" />
            {/* Tulang Paha Putih */}
            <Path d="M48 48 L64 62" stroke="#FFFBEB" strokeWidth="7" strokeLinecap="round" />
            <Circle cx="66" cy="60" r="5" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            <Circle cx="62" cy="65" r="5" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            {/* Paha Ayam Panggang Gurih */}
            <Path
              d="M20 26 C12 36, 22 56, 38 56 C50 56, 56 46, 52 34 C48 20, 28 16, 20 26 Z"
              fill="#EA580C"
              stroke="#7C2D12"
              strokeWidth="2.8"
            />
            <Path d="M26 28 Q36 24 44 32" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'carrot_veg':
    case 'carrot':
    case 'sayur':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            {/* Daun Wortel Hijau Rimbun */}
            <Path d="M52 24 C56 12, 66 14, 60 26" fill="#10B981" stroke="#064E3B" strokeWidth="2.4" />
            <Path d="M54 26 C64 18, 72 24, 58 30" fill="#059669" stroke="#064E3B" strokeWidth="2.4" />
            {/* Umbi Wortel Segar */}
            <Path
              d="M56 26 C62 32, 32 66, 18 64 C16 50, 48 20, 56 26 Z"
              fill="#FB923C"
              stroke="#9A3412"
              strokeWidth="2.8"
            />
            <Path d="M38 36 L44 42 M30 46 L36 52" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'sugar_cane':
    case 'sugar':
    case 'gula':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Ellipse cx="40" cy="68" rx="24" ry="5" fill="#78350F" opacity="0.15" />
            {/* Stoples Gula & Gula Aren */}
            <Rect x="22" y="22" width="36" height="44" rx="10" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.8" />
            <Rect x="26" y="14" width="28" height="8" rx="4" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" />
            <Rect x="28" y="34" width="24" height="16" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.8" />
            <Circle cx="40" cy="42" r="4" fill="#F59E0B" />
          </Svg>
        </View>
      );

    case 'package_box':
    case 'box':
    case 'mika':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Polygon points="40,14 66,26 40,38 14,26" fill="#FDE68A" stroke="#78350F" strokeWidth="2.6" />
            <Polygon points="14,26 40,38 40,66 14,54" fill="#F59E0B" stroke="#78350F" strokeWidth="2.6" />
            <Polygon points="66,26 40,38 40,66 66,54" fill="#D97706" stroke="#78350F" strokeWidth="2.6" />
            <Path d="M27 20 L53 32 V44" stroke="#FFFBEB" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    // =========================================================================
    // 3. IKON OPERASIONAL, KEUANGAN & MASKOT
    // =========================================================================
    case 'coin_gold':
    case 'coin':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72" fill="none">
            <Circle cx="36" cy="36" r="28" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
            <Circle cx="36" cy="36" r="21" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
            <Path d="M36 23 V49 M30 29 H40 C43 29 43 36 36 36 C29 36 29 43 32 43 H42" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'wallet_purse':
    case 'wallet':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            {/* Uang Kertas Hijau Menyembul dari Dompet */}
            <Rect x="22" y="14" width="38" height="20" rx="4" transform="rotate(-6 22 14)" fill="#10B981" stroke="#064E3B" strokeWidth="2.4" />
            <Circle cx="41" cy="22" r="4" fill="#A7F3D0" />
            {/* Bodi Dompet Kulit Hangat */}
            <Rect x="14" y="24" width="52" height="42" rx="10" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <Path d="M18 32 H54" stroke="#FDBA74" strokeWidth="2" strokeDasharray="3 3" />
            {/* Kancing Pengunci Dompet Emas */}
            <Rect x="48" y="38" width="22" height="14" rx="7" fill="#FDE047" stroke="#78350F" strokeWidth="2.6" />
            <Circle cx="55" cy="45" r="3" fill="#78350F" />
          </Svg>
        </View>
      );

    case 'canteen_shop':
    case 'canteen':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Rect x="16" y="32" width="48" height="36" rx="6" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.8" />
            <Path d="M10 32 L18 16 H62 L70 32 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.8" />
            <Circle cx="22" cy="32" r="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
            <Circle cx="34" cy="32" r="6" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            <Circle cx="46" cy="32" r="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
            <Circle cx="58" cy="32" r="6" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            <Rect x="24" y="42" width="18" height="14" rx="3" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
            <Rect x="46" y="42" width="12" height="26" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          </Svg>
        </View>
      );

    case 'market_cart':
    case 'cart':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            {/* Sayur & Telur di Dalam Keranjang */}
            <Circle cx="36" cy="26" r="8" fill="#10B981" stroke="#064E3B" strokeWidth="2" />
            <Circle cx="48" cy="28" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
            <Path
              d="M12 18 H22 L28 48 H58 L64 26 H24"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <Circle cx="32" cy="60" r="6" fill="#EA580C" stroke="#1E293B" strokeWidth="2.5" />
            <Circle cx="54" cy="60" r="6" fill="#EA580C" stroke="#1E293B" strokeWidth="2.5" />
          </Svg>
        </View>
      );

    case 'receipt_bill':
    case 'receipt':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Path
              d="M20 12 H60 V68 L54 62 L48 68 L40 62 L32 68 L26 62 L20 68 Z"
              fill="#FFFBEB"
              stroke="#78350F"
              strokeWidth="2.8"
            />
            <Path d="M28 26 H52 M28 36 H52 M28 46 H42" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
            <Circle cx="48" cy="48" r="6" fill="#10B981" />
          </Svg>
        </View>
      );

    case 'money_cash':
    case 'cash':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Rect x="12" y="22" width="56" height="36" rx="6" fill="#10B981" stroke="#064E3B" strokeWidth="2.8" />
            <Rect x="18" y="28" width="44" height="24" rx="4" fill="#A7F3D0" />
            <Circle cx="40" cy="40" r="8" fill="#059669" />
          </Svg>
        </View>
      );

    case 'chart_up':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 80 80" fill="none">
            <Rect x="16" y="44" width="12" height="22" rx="3" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
            <Rect x="34" y="32" width="12" height="34" rx="3" fill="#FB923C" stroke="#9A3412" strokeWidth="2" />
            <Rect x="52" y="18" width="12" height="48" rx="3" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
          </Svg>
        </View>
      );

    case 'check_badge':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72" fill="none">
            <Circle cx="36" cy="36" r="28" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
            <Path d="M24 36 L32 44 L48 28" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      );

    case 'warning_badge':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72" fill="none">
            <Polygon points="36,10 66,60 6,60" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
            <Path d="M36 28 V44" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
            <Circle cx="36" cy="52" r="2.8" fill="#78350F" />
          </Svg>
        </View>
      );

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

    default:
      return <Mascot size={s} animated={false} style={style} />;
  }
}
