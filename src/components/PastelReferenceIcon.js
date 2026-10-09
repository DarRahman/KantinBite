import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Polygon } from 'react-native-svg';

// Komponen Ikon 1:1 Persis Referensi 8-Icon Grid Pastel
// Karakteristik: Squircle polos tanpa border, Flat Vector Chubby, Dark Chocolate (#3D312A) + White (#FFFFFF)
// Skala Ikon: Memenuhi 75% bidang squircle (size * 0.74) agar tidak kopong
export const PastelReferenceIcon = ({ type, size = 68 }) => {
  if (type === 'pos') {
    // 1. Kasir Lapak: Squircle Oranye Pastel (#FFC87C), Mesin Cokelat Tua (#3D312A) + Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#FFC87C', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.74} height={size * 0.74} viewBox="0 0 48 48">
          {/* Struk Putih Muncul di Atas */}
          <Path d="M16 6 h16 v12 h-16 Z" fill="#FFFFFF" />
          <Path d="M20 11 h8 M20 14 h5" stroke="#3D312A" strokeWidth="1.8" strokeLinecap="round" />
          {/* Badan Mesin Kasir Chubby Cokelat Tua */}
          <Rect x="8" y="15" width="32" height="25" rx="7" fill="#3D312A" />
          {/* Layar Kasir Putih Bersih */}
          <Rect x="13" y="19" width="22" height="10" rx="3" fill="#FFFFFF" />
          {/* Tombol Numpad Bulat Putih */}
          <Circle cx="16" cy="33" r="2.4" fill="#FFFFFF" />
          <Circle cx="24" cy="33" r="2.4" fill="#FFFFFF" />
          <Circle cx="32" cy="33" r="2.4" fill="#FFFFFF" />
          {/* Laci Bawah Krem */}
          <Rect x="11" y="40" width="26" height="4" rx="2" fill="#FFE8C2" />
        </Svg>
      </View>
    );
  }

  if (type === 'canteen') {
    // 2. Titip Kantin: Squircle Mint/Teal Pastel (#98D7C2), Etalase Cokelat Tua (#3D312A) + Tenda Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#98D7C2', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.74} height={size * 0.74} viewBox="0 0 48 48">
          {/* Tenda Kanopi Putih Bersih */}
          <Path d="M6 18 L24 6 L42 18 L38 25 L10 25 Z" fill="#FFFFFF" />
          <Circle cx="15" cy="25" r="3.2" fill="#3D312A" />
          <Circle cx="24" cy="25" r="3.2" fill="#3D312A" />
          <Circle cx="33" cy="25" r="3.2" fill="#3D312A" />
          {/* Bodi Bangunan Toko Cokelat Tua */}
          <Rect x="9" y="25" width="30" height="20" rx="5" fill="#3D312A" />
          {/* Jendela Etalase Putih & Pintu */}
          <Rect x="14" y="29" width="11" height="11" rx="2.5" fill="#FFFFFF" />
          <Rect x="29" y="29" width="7" height="16" rx="2" fill="#C5ECE4" />
        </Svg>
      </View>
    );
  }

  if (type === 'stock') {
    // 3. Gudang Stok: Squircle Ungu Pastel (#C3B1E1), Karung Tepung Cokelat Tua (#3D312A) + Putih
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#C3B1E1', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.74} height={size * 0.74} viewBox="0 0 48 48">
          {/* Ikatan Tali Putih di Leher Karung */}
          <Path d="M21 11 C21 5 27 5 27 11 Z" fill="#FFFFFF" />
          <Circle cx="24" cy="12" r="5" fill="#FFFFFF" />
          {/* Bodi Karung Gemuk Chubby Cokelat Tua */}
          <Path d="M13 14 C12 8 36 8 35 14 L39 38 C39 45 9 45 9 38 Z" fill="#3D312A" />
          {/* Lingkaran Label Putih Bersih */}
          <Circle cx="24" cy="28" r="7.5" fill="#FFFFFF" />
          <Circle cx="24" cy="28" r="3.5" fill="#C3B1E1" />
        </Svg>
      </View>
    );
  }

  if (type === 'market') {
    // 4. Belanja Pasar: Squircle Lime Pastel (#D6EC83), Troli Pasar Cokelat Tua (#3D312A) + Sayuran Putih/Oranye
    return (
      <View style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: '#D6EC83', alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size * 0.74} height={size * 0.74} viewBox="0 0 48 48">
          {/* Buah/Sayuran Putih & Oranye di Dalam Troli */}
          <Circle cx="20" cy="14" r="5.5" fill="#FFFFFF" />
          <Circle cx="29" cy="13" r="6" fill="#FFC87C" />
          {/* Keranjang Belanja Chubby Cokelat Tua */}
          <Path d="M7 11 h7 l4.5 18 h20 l4.5-14 h-26" fill="none" stroke="#3D312A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Roda Putih Bersih Tebal */}
          <Circle cx="20" cy="37" r="4" fill="#3D312A" />
          <Circle cx="20" cy="37" r="1.8" fill="#FFFFFF" />
          <Circle cx="34" cy="37" r="4" fill="#3D312A" />
          <Circle cx="34" cy="37" r="1.8" fill="#FFFFFF" />
        </Svg>
      </View>
    );
  }

  return null;
};
