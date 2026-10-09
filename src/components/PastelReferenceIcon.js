import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Polygon } from 'react-native-svg';

// Komponen Ikon 1:1 Persis Referensi 8-Icon Grid Pastel
// Karakteristik: Squircle polos tanpa border, Flat Vector Chubby, Dark Chocolate (#3D312A) + White (#FFFFFF)
export const PastelReferenceIcon = ({ type, size = 64 }) => {
  if (type === 'pos') {
    // 1. Kasir Lapak: Squircle Oranye Pastel (#FFC87C), Mesin/Struk Cokelat Tua (#3D312A) + Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#FFC87C', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48">
          {/* Struk Putih Muncul di Atas */}
          <Path d="M17 8 h14 v10 h-14 Z" fill="#FFFFFF" />
          <Path d="M20 12 h8 M20 15 h5" stroke="#3D312A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Badan Mesin Kasir Chubby Cokelat Tua */}
          <Rect x="10" y="16" width="28" height="22" rx="6" fill="#3D312A" />
          {/* Layar Kasir Putih Bersih */}
          <Rect x="14" y="20" width="20" height="8" rx="2.5" fill="#FFFFFF" />
          {/* Tombol Numpad Bulat Putih */}
          <Circle cx="17" cy="32" r="2" fill="#FFFFFF" />
          <Circle cx="24" cy="32" r="2" fill="#FFFFFF" />
          <Circle cx="31" cy="32" r="2" fill="#FFFFFF" />
          {/* Laci Bawah Krem */}
          <Rect x="12" y="38" width="24" height="4" rx="2" fill="#FFE8C2" />
        </Svg>
      </View>
    );
  }

  if (type === 'canteen') {
    // 2. Titip Kantin: Squircle Mint/Teal Pastel (#98D7C2), Etalase Gerai Cokelat Tua (#3D312A) + Tenda Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#98D7C2', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48">
          {/* Tenda Kanopi Putih Bersih */}
          <Path d="M8 18 L24 8 L40 18 L36 24 L12 24 Z" fill="#FFFFFF" />
          <Circle cx="16" cy="24" r="3" fill="#3D312A" />
          <Circle cx="24" cy="24" r="3" fill="#3D312A" />
          <Circle cx="32" cy="24" r="3" fill="#3D312A" />
          {/* Bodi Bangunan Toko Cokelat Tua */}
          <Rect x="11" y="24" width="26" height="18" rx="4" fill="#3D312A" />
          {/* Jendela Etalase Putih & Pintu */}
          <Rect x="15" y="28" width="10" height="9" rx="2" fill="#FFFFFF" />
          <Rect x="28" y="28" width="6" height="14" rx="1.5" fill="#C5ECE4" />
        </Svg>
      </View>
    );
  }

  if (type === 'stock') {
    // 3. Gudang Stok: Squircle Ungu Pastel (#C3B1E1), Karung Tepung Cokelat Tua (#3D312A) + Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#C3B1E1', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48">
          {/* Ikatan Tali Putih di Leher Karung */}
          <Path d="M21 13 C21 8 27 8 27 13 Z" fill="#FFFFFF" />
          <Circle cx="24" cy="14" r="4.5" fill="#FFFFFF" />
          {/* Bodi Karung Gemuk Chubby Cokelat Tua */}
          <Path d="M14 15 C13 10 35 10 34 15 L37 36 C37 42 11 42 11 36 Z" fill="#3D312A" />
          {/* Lingkaran Label Putih Bersih */}
          <Circle cx="24" cy="28" r="6.5" fill="#FFFFFF" />
          {/* Daun / Gandum Kecil Cokelat di Tengah Label */}
          <Circle cx="24" cy="28" r="3" fill="#C3B1E1" />
        </Svg>
      </View>
    );
  }

  if (type === 'market') {
    // 4. Belanja Pasar: Squircle Lime Pastel (#D6EC83), Troli Pasar Cokelat Tua (#3D312A) + Sayuran Putih/Oranye
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#D6EC83', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48">
          {/* Buah/Sayuran Putih & Oranye di Dalam Troli */}
          <Circle cx="21" cy="17" r="4.5" fill="#FFFFFF" />
          <Circle cx="29" cy="16" r="5" fill="#FFC87C" />
          {/* Keranjang Belanja Chubby Cokelat Tua */}
          <Path d="M9 13 h6 l4 16 h18 l4-12 h-23" fill="none" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Roda Putih Bersih Tebal */}
          <Circle cx="21" cy="35" r="3.5" fill="#3D312A" />
          <Circle cx="21" cy="35" r="1.5" fill="#FFFFFF" />
          <Circle cx="33" cy="35" r="3.5" fill="#3D312A" />
          <Circle cx="33" cy="35" r="1.5" fill="#FFFFFF" />
        </Svg>
      </View>
    );
  }

  return null;
};
