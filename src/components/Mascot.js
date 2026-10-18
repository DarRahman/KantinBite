import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Path,
  Rect,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Polygon,
  Line,
  Text as SvgText,
} from 'react-native-svg';

/**
 * Mascot Chef Bitey — Multi-Pose & Living Animation Engine
 * Pose yang didukung:
 * - 'default'      : Chef Bitey melambai ramah dengan spatula emas
 * - 'baker_box'    : Gaya Jujuly Cafe — Bitey berlari riang membawa boks jajanan hangat
 * - 'cashier'      : Bitey di balik mesin kasir siap melayani pembeli
 * - 'stock_chef'   : Bitey memeriksa daftar stok & karung terigu
 * - 'celebrate'    : Bitey mengangkat trofi/koin emas saat target laku keras tercapai
 * - 'canteen_drop' : Bitey mengantar keranjang nampan kue ke mitra kantin
 * - 'notebook'     : Bitey memegang buku resep HPP & kaca pembesar
 */
export const Mascot = ({ size = 104, pose = 'default', animated = true, style }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated, floatAnim]);

  return (
    <Animated.View
      style={[
        { width: size, height: size, alignItems: 'center', justifyContent: 'center' },
        animated && { transform: [{ translateY: floatAnim }] },
        style,
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
        <Defs>
          <RadialGradient id="biteyBodyGrad" cx="45%" cy="38%" r="58%">
            <Stop offset="0%" stopColor="#FEF08A" />
            <Stop offset="55%" stopColor="#FDE047" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </RadialGradient>
          <LinearGradient id="chefHatGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#F1F5F9" />
          </LinearGradient>
          <LinearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FB923C" />
            <Stop offset="100%" stopColor="#EA580C" />
          </LinearGradient>
        </Defs>

        {/* Bayangan Dasar Lembut */}
        <Ellipse cx="70" cy="126" rx="40" ry="8" fill="#78350F" opacity="0.16" />

        {/* Syal / Celemek Oranye Khas Koki */}
        <Path
          d="M44 96 Q70 112 96 96 L90 118 Q70 124 50 118 Z"
          fill="#EA580C"
          stroke="#7C2D12"
          strokeWidth="2.8"
        />
        <Path d="M62 102 L78 102 L75 117 L65 117 Z" fill="#FFF7ED" />

        {/* Kaki Mungil */}
        <Ellipse cx="55" cy="120" rx="10" ry="6" fill="#D97706" stroke="#78350F" strokeWidth="2.8" />
        <Ellipse cx="85" cy="120" rx="10" ry="6" fill="#D97706" stroke="#78350F" strokeWidth="2.8" />

        {/* Tubuh Adonan Roti Bulat Mengembang */}
        <Circle
          cx="70"
          cy="78"
          r="40"
          fill="url(#biteyBodyGrad)"
          stroke="#9A3412"
          strokeWidth="3.2"
        />

        {/* Kilau Highlight Tubuh */}
        <Path
          d="M44 56 Q52 46 66 46"
          stroke="#FEF9C3"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Topi Koki Baker Bervolume */}
        <Path
          d="M44 42 C34 24, 54 12, 70 20 C86 12, 106 24, 96 42 Z"
          fill="url(#chefHatGrad)"
          stroke="#9A3412"
          strokeWidth="3"
        />
        <Path d="M58 22 Q60 30 58 38" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <Path d="M82 22 Q80 30 82 38" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <Rect
          x="45"
          y="38"
          width="50"
          height="10"
          rx="4"
          fill="#FFFFFF"
          stroke="#9A3412"
          strokeWidth="3"
        />
        {/* Pita Oranye di Topi */}
        <Rect x="47" y="42" width="46" height="4" rx="2" fill="#EA580C" />

        {/* Sepasang Mata Berbinar */}
        <Circle cx="55" cy="73" r="5" fill="#18181B" />
        <Circle cx="53.5" cy="71" r="1.8" fill="#FFFFFF" />
        <Circle cx="85" cy="73" r="5" fill="#18181B" />
        <Circle cx="83.5" cy="71" r="1.8" fill="#FFFFFF" />

        {/* Alis Ekspresif */}
        <Path d="M49 64 Q55 61 60 64" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
        <Path d="M80 64 Q85 61 91 64" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />

        {/* Pipi Merona Hangat */}
        <Ellipse cx="45" cy="81" rx="6" ry="3.8" fill="#FB7185" opacity="0.65" />
        <Ellipse cx="95" cy="81" rx="6" ry="3.8" fill="#FB7185" opacity="0.65" />

        {/* Mulut Senyum Gembira */}
        {pose === 'celebrate' || pose === 'baker_box' ? (
          <G>
            <Path
              d="M61 81 Q70 93 79 81 Z"
              fill="#9A3412"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <Path d="M65 86 Q70 90 75 86" fill="#FB7185" />
          </G>
        ) : (
          <Path
            d="M61 82 Q70 91 79 82"
            stroke="#9A3412"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        )}

        {/* ATRIBUT SPESIFIK PER POSE */}
        {pose === 'default' && (
          <G>
            {/* Tangan Kiri Melambai */}
            <Path
              d="M32 76 C20 68, 20 56, 30 54"
              stroke="#F59E0B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <Path
              d="M32 76 C20 68, 20 56, 30 54"
              stroke="#9A3412"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Tangan Kanan Memegang Spatula Kayu */}
            <Path d="M106 80 L122 62" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <Rect
              x="116"
              y="46"
              width="14"
              height="18"
              rx="4"
              transform="rotate(20 116 46)"
              fill="#FBBF24"
              stroke="#78350F"
              strokeWidth="2.5"
            />
          </G>
        )}

        {pose === 'baker_box' && (
          <G>
            {/* Boks Kue Hangat di Depan Dada (Terinspirasi Jujuly Cafe) */}
            <Rect
              x="38"
              y="88"
              width="64"
              height="30"
              rx="7"
              fill="url(#boxGrad)"
              stroke="#7C2D12"
              strokeWidth="2.8"
            />
            {/* Kue Risoles & Dadar Mengintip dari Boks */}
            <Rect x="45" y="80" width="22" height="12" rx="6" fill="#FBBF24" stroke="#78350F" strokeWidth="2.2" />
            <Rect x="70" y="80" width="22" height="12" rx="6" fill="#10B981" stroke="#065F46" strokeWidth="2.2" />
            {/* Label Putih Boks */}
            <Rect x="54" y="96" width="32" height="14" rx="4" fill="#FFF7ED" />
            <Path d="M60 103 H80" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            {/* Tangan Memeluk Boks */}
            <Circle cx="38" cy="102" r="7" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />
            <Circle cx="102" cy="102" r="7" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />
          </G>
        )}

        {pose === 'cashier' && (
          <G>
            {/* Mesin Kasir Mini & Struk di Samping */}
            <Rect x="94" y="76" width="34" height="32" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <Rect x="99" y="81" width="24" height="10" rx="2.5" fill="#ECFDF5" />
            <Path d="M103 86 H118" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
            <Circle cx="103" cy="98" r="2.2" fill="#FBBF24" />
            <Circle cx="111" cy="98" r="2.2" fill="#FFFFFF" />
            <Circle cx="119" cy="98" r="2.2" fill="#EA580C" />
            {/* Koin Emas Melayang */}
            <Circle cx="24" cy="58" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="2.2" />
            <Path d="M24 54 V62 M21 58 H27" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          </G>
        )}

        {pose === 'stock_chef' && (
          <G>
            {/* Papan Klip Inventaris Gudang */}
            <Rect x="96" y="68" width="28" height="36" rx="5" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
            <Rect x="103" y="64" width="14" height="7" rx="2.5" fill="#EA580C" />
            <Path d="M102 78 H118 M102 85 H118 M102 92 H112" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
            {/* Karung Terigu Kecil di Kiri */}
            <Path d="M14 88 Q24 80 34 88 L36 112 Q24 116 12 112 Z" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
          </G>
        )}

        {pose === 'celebrate' && (
          <G>
            {/* Bintang & Kilau Juara */}
            <Polygon
              points="24,34 27,42 35,42 29,47 31,55 24,50 17,55 19,47 13,42 21,42"
              fill="#FBBF24"
              stroke="#B45309"
              strokeWidth="1.8"
            />
            <Polygon
              points="118,30 120,36 127,36 121,40 123,47 118,43 113,47 115,40 109,36 116,36"
              fill="#FB923C"
              stroke="#C2410C"
              strokeWidth="1.8"
            />
            {/* Tangan Terangkat Gembira */}
            <Circle cx="26" cy="68" r="7" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />
            <Circle cx="114" cy="68" r="7" fill="#FDE047" stroke="#9A3412" strokeWidth="2.5" />
          </G>
        )}

        {pose === 'canteen_drop' && (
          <G>
            {/* Keranjang Rotan Anyaman Isi Kue Titipan */}
            <Path
              d="M34 92 H106 L98 118 H42 Z"
              fill="#D97706"
              stroke="#78350F"
              strokeWidth="2.8"
            />
            <Circle cx="52" cy="88" r="9" fill="#10B981" stroke="#065F46" strokeWidth="2.2" />
            <Circle cx="70" cy="86" r="10" fill="#FBBF24" stroke="#78350F" strokeWidth="2.2" />
            <Circle cx="88" cy="88" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
          </G>
        )}

        {pose === 'notebook' && (
          <G>
            {/* Buku Resep Oranye di Tangan */}
            <Rect x="94" y="72" width="30" height="36" rx="5" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <Rect x="98" y="76" width="22" height="28" rx="3" fill="#FFF7ED" />
            <Path d="M103 83 H115 M103 90 H115 M103 97 H110" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
          </G>
        )}
      </Svg>
    </Animated.View>
  );
};

/**
 * PartnerAvatar — Ilustrasi Avatar Karakter Pengurus Kantin (PIC)
 * Terinspirasi dari avatar karakter berwarna pada Referensi 1, 2, dan 5
 */
export const PartnerAvatar = ({ name = 'Pak Joko', variant = 0, size = 48 }) => {
  const palettes = [
    { bg: '#FED7AA', shirt: '#EA580C', hair: '#1E293B', skin: '#FDE68A', hat: '#0284C7' },
    { bg: '#A7F3D0', shirt: '#059669', hair: '#7C2D12', skin: '#FEF08A', hijack: '#10B981' },
    { bg: '#DDD6FE', shirt: '#7C3AED', hair: '#0F172A', skin: '#FDE68A', glasses: true },
    { bg: '#FDE68A', shirt: '#D97706', hair: '#451A03', skin: '#FEF3C7', mustache: true },
  ];
  const idx =
    variant ||
    Math.abs(
      (name || 'A').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    ) % palettes.length;
  const p = palettes[idx % palettes.length];
  const isHijab = name.toLowerCase().includes('bu') || name.toLowerCase().includes('siti') || idx === 1;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: p.bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <Circle cx="32" cy="32" r="30" fill={p.bg} />
        {/* Bahu / Baju */}
        <Path d="M12 62 C12 46, 52 46, 52 62 Z" fill={p.shirt} stroke="#1E293B" strokeWidth="2" />
        {/* Kerah Putih */}
        <Polygon points="26,48 32,55 38,48" fill="#FFFFFF" />
        {/* Kerudung / Rambut Belakang */}
        {isHijab ? (
          <Path
            d="M16 32 C16 14, 48 14, 48 32 L50 52 C38 56, 26 56, 14 52 Z"
            fill="#0D9488"
            stroke="#134E4A"
            strokeWidth="2"
          />
        ) : null}
        {/* Kepala */}
        <Circle cx="32" cy="29" r="13" fill={p.skin} stroke="#1E293B" strokeWidth="2" />
        {/* Rambut / Topi */}
        {!isHijab && (
          <Path
            d="M19 26 C19 14, 45 14, 45 26 C40 21, 24 21, 19 26 Z"
            fill={p.hair}
          />
        )}
        {/* Mata & Senyum */}
        <Circle cx="27" cy="29" r="1.8" fill="#1E293B" />
        <Circle cx="37" cy="29" r="1.8" fill="#1E293B" />
        <Ellipse cx="24" cy="33" rx="2.5" ry="1.5" fill="#FB7185" opacity="0.6" />
        <Ellipse cx="40" cy="33" rx="2.5" ry="1.5" fill="#FB7185" opacity="0.6" />
        <Path d="M28 34 Q32 38 36 34" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    </View>
  );
};

/**
 * CanteenPodiumScene — Ilustrasi Podium 3 Mitra Kantin Terlaris
 * Terinspirasi dari Podium Kayu & Medali pada Referensi 2 dan 5
 */
export const CanteenPodiumScene = ({ topThree = [] }) => {
  const first = topThree[0] || { name: 'Kantin Teknik', sold: '420 pcs', pic: 'Pak Joko' };
  const second = topThree[1] || { name: 'Kopma STIKOM', sold: '315 pcs', pic: 'Mas Arif' };
  const third = topThree[2] || { name: 'Kantin SMPN 1', sold: '280 pcs', pic: 'Bu Siti' };

  return (
    <View style={podiumStyles.wrap}>
      <Svg width="100%" height={186} viewBox="0 0 340 186" fill="none">
        <Defs>
          <LinearGradient id="skyPodium" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFBEB" />
            <Stop offset="100%" stopColor="#FEF3C7" />
          </LinearGradient>
          <LinearGradient id="wood1" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#B45309" />
            <Stop offset="50%" stopColor="#D97706" />
            <Stop offset="100%" stopColor="#92400E" />
          </LinearGradient>
        </Defs>

        {/* Background Langit Hangat & Rumput Taman */}
        <Rect x="0" y="0" width="340" height="186" rx="20" fill="url(#skyPodium)" />
        <Path d="M0 156 Q85 144 170 156 T340 152 L340 186 L0 186 Z" fill="#D9F99D" />
        <Circle cx="46" cy="36" r="14" fill="#FFFFFF" opacity="0.8" />
        <Circle cx="62" cy="34" r="18" fill="#FFFFFF" opacity="0.8" />
        <Circle cx="290" cy="32" r="15" fill="#FFFFFF" opacity="0.8" />

        {/* PODIUM 2 (KIRI) */}
        <Rect x="28" y="96" width="84" height="78" rx="8" fill="url(#wood1)" stroke="#78350F" strokeWidth="2.5" />
        <Ellipse cx="70" cy="96" rx="42" ry="7" fill="#FDE68A" stroke="#78350F" strokeWidth="2.2" />
        <Circle cx="70" cy="62" r="20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
        <Circle cx="70" cy="58" r="9" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.8" />
        <Path d="M56 76 C56 66, 84 66, 84 76" fill="#0284C7" />
        {/* Medali Perak #2 */}
        <Circle cx="70" cy="116" r="12" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
        <SvgText x="70" y="120" fontSize="11" fontWeight="900" fill="#1E293B" textAnchor="middle">
          2
        </SvgText>
        <SvgText x="70" y="144" fontSize="10" fontWeight="800" fill="#FFFFFF" textAnchor="middle">
          {second.name.slice(0, 12)}
        </SvgText>
        <SvgText x="70" y="158" fontSize="9.5" fontWeight="700" fill="#FEF08A" textAnchor="middle">
          {second.sold}
        </SvgText>

        {/* PODIUM 1 (TENGAH TERTINGGI) */}
        <Rect x="124" y="74" width="92" height="100" rx="8" fill="url(#wood1)" stroke="#78350F" strokeWidth="2.8" />
        <Ellipse cx="170" cy="74" rx="46" ry="8" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
        {/* Avatar Juara 1 + Mahkota Kue */}
        <Circle cx="170" cy="38" r="22" fill="#FEF3C7" stroke="#EA580C" strokeWidth="3" />
        <Polygon points="158,18 164,10 170,17 176,10 182,18" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <Circle cx="170" cy="35" r="10" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.8" />
        <Path d="M154 54 C154 44, 186 44, 186 54" fill="#EA580C" />
        {/* Medali Emas #1 */}
        <Circle cx="170" cy="98" r="14" fill="#FBBF24" stroke="#78350F" strokeWidth="2.2" />
        <SvgText x="170" y="103" fontSize="12" fontWeight="900" fill="#78350F" textAnchor="middle">
          1
        </SvgText>
        <SvgText x="170" y="130" fontSize="11" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
          {first.name.slice(0, 14)}
        </SvgText>
        <SvgText x="170" y="146" fontSize="10" fontWeight="800" fill="#FEF08A" textAnchor="middle">
          {first.sold}
        </SvgText>

        {/* PODIUM 3 (KANAN) */}
        <Rect x="228" y="106" width="84" height="68" rx="8" fill="url(#wood1)" stroke="#78350F" strokeWidth="2.5" />
        <Ellipse cx="270" cy="106" rx="42" ry="7" fill="#FDE68A" stroke="#78350F" strokeWidth="2.2" />
        <Circle cx="270" cy="72" r="20" fill="#D1FAE5" stroke="#059669" strokeWidth="2.5" />
        <Circle cx="270" cy="68" r="9" fill="#FDE68A" stroke="#1E293B" strokeWidth="1.8" />
        <Path d="M256 86 C256 76, 284 76, 284 86" fill="#059669" />
        {/* Medali Perunggu #3 */}
        <Circle cx="270" cy="124" r="11" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
        <SvgText x="270" y="128" fontSize="10.5" fontWeight="900" fill="#7C2D12" textAnchor="middle">
          3
        </SvgText>
        <SvgText x="270" y="148" fontSize="10" fontWeight="800" fill="#FFFFFF" textAnchor="middle">
          {third.name.slice(0, 12)}
        </SvgText>
        <SvgText x="270" y="162" fontSize="9.5" fontWeight="700" fill="#FEF08A" textAnchor="middle">
          {third.sold}
        </SvgText>
      </Svg>
    </View>
  );
};

const podiumStyles = StyleSheet.create({
  wrap: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: 16,
  },
});
