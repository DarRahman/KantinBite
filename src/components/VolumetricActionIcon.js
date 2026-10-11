import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Ellipse, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export const VolumetricActionIcon = ({ type, size = 46 }) => {
  if (type === 'pos') {
    // Mesin Kasir Oranye Tebal 3D Chubby Solid
    return (
      <Svg width={size} height={size} viewBox="0 0 80 80">
        <Defs>
          <LinearGradient id="posGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FB923C" />
            <Stop offset="100%" stopColor="#EA580C" />
          </LinearGradient>
          <LinearGradient id="posBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#EA580C" />
            <Stop offset="100%" stopColor="#C2410C" />
          </LinearGradient>
        </Defs>
        {/* Kertas Struk Muncul */}
        <Rect x="28" y="10" width="24" height="18" rx="4" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.2" />
        <Path d="M34 16 h12 M34 21 h8" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
        {/* Bodi Utama Mesin Kasir */}
        <Rect x="16" y="24" width="48" height="34" rx="10" fill="url(#posGrad)" stroke="#9A3412" strokeWidth="2.5" />
        {/* Layar Kasir Kaca */}
        <Rect x="22" y="30" width="36" height="12" rx="4" fill="#FEF3C7" stroke="#9A3412" strokeWidth="1.8" />
        <Path d="M26 36 h16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        {/* Tombol Numpad Bulat */}
        <Circle cx="28" cy="49" r="3.2" fill="#FFFFFF" />
        <Circle cx="40" cy="49" r="3.2" fill="#FFFFFF" />
        <Circle cx="52" cy="49" r="3.2" fill="#FFFFFF" />
        {/* Laci Uang Bawah Berdimensi */}
        <Rect x="12" y="58" width="56" height="10" rx="5" fill="url(#posBase)" stroke="#9A3412" strokeWidth="2.2" />
        <Rect x="34" y="61" width="12" height="4" rx="2" fill="#FED7AA" />
      </Svg>
    );
  }

  if (type === 'canteen') {
    // Gerai Etalase Kantin Kuning Emas Bervolume 3D
    return (
      <Svg width={size} height={size} viewBox="0 0 80 80">
        <Defs>
          <LinearGradient id="canteenRoof" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FBBF24" />
            <Stop offset="100%" stopColor="#D97706" />
          </LinearGradient>
          <LinearGradient id="canteenBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FEF3C7" />
            <Stop offset="100%" stopColor="#FDE68A" />
          </LinearGradient>
        </Defs>
        {/* Tenda Kanopi Belang */}
        <Path d="M12 28 L40 12 L68 28 L62 36 L18 36 Z" fill="url(#canteenRoof)" stroke="#78350F" strokeWidth="2.5" />
        <Path d="M24 22 L22 36 M34 16 L34 36 M46 16 L46 36 M56 22 L58 36" stroke="#92400E" strokeWidth="2" />
        {/* Bodi Bangunan Toko */}
        <Rect x="18" y="36" width="44" height="30" rx="6" fill="url(#canteenBody)" stroke="#78350F" strokeWidth="2.5" />
        {/* Etalase Kaca Depan */}
        <Rect x="24" y="42" width="20" height="16" rx="3" fill="#FFFFFF" stroke="#78350F" strokeWidth="2" />
        <Circle cx="30" cy="50" r="3" fill="#F59E0B" />
        <Circle cx="38" cy="50" r="3" fill="#EA580C" />
        {/* Pintu Gerai */}
        <Rect x="48" y="42" width="10" height="24" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      </Svg>
    );
  }

  if (type === 'stock') {
    // Karung Tepung / Stok Ungu-Indigo Bervolume 3D
    return (
      <Svg width={size} height={size} viewBox="0 0 80 80">
        <Defs>
          <LinearGradient id="sackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#818CF8" />
            <Stop offset="100%" stopColor="#4F46E5" />
          </LinearGradient>
        </Defs>
        {/* Ikatan Tali Karung di Atas */}
        <Ellipse cx="40" cy="22" rx="14" ry="6" fill="#C7D2FE" stroke="#312E81" strokeWidth="2.2" />
        <Path d="M34 22 C34 14 46 14 46 22 Z" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
        {/* Bodi Karung Gemuk Berisi */}
        <Path d="M22 24 C20 18 60 18 58 24 L62 56 C62 66 18 66 18 56 Z" fill="url(#sackGrad)" stroke="#312E81" strokeWidth="2.5" />
        {/* Label Cap Tepung / Gandum di Depan Karung */}
        <Circle cx="40" cy="44" r="11" fill="#EEF2FF" stroke="#312E81" strokeWidth="2" />
        <Path d="M36 44 Q40 37 44 44 M40 38 v12" stroke="#4338CA" strokeWidth="2.2" strokeLinecap="round" />
      </Svg>
    );
  }

  if (type === 'market') {
    // Troli Keranjang Pasar Hijau Segar Bervolume 3D
    return (
      <Svg width={size} height={size} viewBox="0 0 80 80">
        <Defs>
          <LinearGradient id="cartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#4ADE80" />
            <Stop offset="100%" stopColor="#16A34A" />
          </LinearGradient>
        </Defs>
        {/* Gagang Pegangan Keranjang */}
        <Path d="M14 18 h10 l4 10" fill="none" stroke="#14532D" strokeWidth="3" strokeLinecap="round" />
        {/* Keranjang Belanja Berisi Solid */}
        <Path d="M22 28 L28 50 h32 L66 28 Z" fill="url(#cartGrad)" stroke="#14532D" strokeWidth="2.5" />
        {/* Motif Garis Keranjang */}
        <Path d="M25 36 h38 M27 43 h34" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
        {/* Sayuran di Dalam Keranjang */}
        <Circle cx="36" cy="24" r="6" fill="#F97316" stroke="#9A3412" strokeWidth="1.8" />
        <Circle cx="48" cy="22" r="7" fill="#EAB308" stroke="#713F12" strokeWidth="1.8" />
        {/* Roda Troli Tebal */}
        <Circle cx="32" cy="58" r="5.5" fill="#14532D" />
        <Circle cx="32" cy="58" r="2.5" fill="#FFFFFF" />
        <Circle cx="54" cy="58" r="5.5" fill="#14532D" />
        <Circle cx="54" cy="58" r="2.5" fill="#FFFFFF" />
      </Svg>
    );
  }

  return null;
};
