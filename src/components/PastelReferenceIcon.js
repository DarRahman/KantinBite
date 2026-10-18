import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Ellipse, G } from 'react-native-svg';

/**
 * PastelReferenceIcon — 8 Ikon Operasional Dapur & Kantin Seragam
 * Menggunakan palet Warm Cream, Honey Gold & Roasted Terracotta yang 100% menyatu:
 * - Latar squircle hangat (#FFFBEB / #FFF7ED / #FEF3C7)
 * - Garis tepi & dimensi bawah terakota/madu (#FDBA74 / #EA580C / #D97706)
 * - Ilustrasi alat dapur & kantin ekspresif tanpa siluet hitam kaku atau warna ungu/stabilo nabrak
 */
export const PastelReferenceIcon = ({ type, size = 62 }) => {
  const s = size;
  const r = Math.round(s * 0.32);
  const iconSize = Math.round(s * 0.72);

  const wrapStyle = (bg, borderColor, shadowColor) => ({
    width: s,
    height: s,
    borderRadius: r,
    backgroundColor: bg,
    borderWidth: 1.8,
    borderColor: borderColor,
    borderBottomWidth: 4.5,
    borderBottomColor: shadowColor,
    alignItems: 'center',
    justifyContent: 'center',
  });

  // 1. KASIR LAPAK — Mesin Kasir Bakery Oranye Terakota & Struk Emas
  if (type === 'pos') {
    return (
      <View style={wrapStyle('#FFF7ED', '#FDBA74', '#EA580C')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          {/* Kertas Struk Keluar di Atas */}
          <Rect x="16" y="5" width="16" height="12" rx="3" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.2" />
          <Path d="M20 9 H28 M20 12.5 H25" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          {/* Bodi Mesin Kasir Terakota Hangat */}
          <Rect x="8" y="15" width="32" height="24" rx="7" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" />
          {/* Layar Nominal Krem */}
          <Rect x="13" y="19" width="22" height="9" rx="3" fill="#FEF3C7" stroke="#9A3412" strokeWidth="1.8" />
          <Path d="M17 23.5 H31" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" />
          {/* Tombol Kasir Empuk */}
          <Circle cx="16.5" cy="33" r="2.5" fill="#FDE047" />
          <Circle cx="24" cy="33" r="2.5" fill="#FFFFFF" />
          <Circle cx="31.5" cy="33" r="2.5" fill="#FDE047" />
          {/* Laci Uang Bawah */}
          <Rect x="6" y="38" width="36" height="5" rx="2.5" fill="#F59E0B" stroke="#7C2D12" strokeWidth="2" />
        </Svg>
      </View>
    );
  }

  // 2. TITIP KANTIN — Gerai Etalase Kantin Berkanopi Oranye-Krem
  if (type === 'canteen') {
    return (
      <View style={wrapStyle('#FFFBEB', '#FDE68A', '#D97706')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          {/* Bodi Etalase Kayu Hangat */}
          <Rect x="9" y="20" width="30" height="22" rx="5" fill="#F59E0B" stroke="#78350F" strokeWidth="2.4" />
          <Rect x="13" y="24" width="22" height="11" rx="3" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.8" />
          {/* Kue di Dalam Etalase */}
          <Circle cx="19" cy="30" r="3" fill="#EA580C" />
          <Circle cx="28" cy="30" r="3" fill="#10B981" />
          {/* Kanopi Garis-Garis Oranye & Krem */}
          <Path d="M6 19 L11 8 H37 L42 19 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.2" strokeLinejoin="round" />
          <Path d="M17 8 H24 L23 19 H15 Z" fill="#FFF7ED" />
          <Path d="M31 8 H37 L40 19 H32 Z" fill="#FFF7ED" />
          {/* Meja Depan */}
          <Rect x="7" y="40" width="34" height="4" rx="2" fill="#9A3412" />
        </Svg>
      </View>
    );
  }

  // 3. GUDANG STOK — Karung Tepung Terigu & Stoples Telur Dapur
  if (type === 'stock') {
    return (
      <View style={wrapStyle('#FFF7ED', '#FDBA74', '#C2410C')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          {/* Kuncup Ikatan Karung */}
          <Path d="M18 11 C17 6, 31 6, 30 11 L27 14 H21 Z" fill="#FDE68A" stroke="#78350F" strokeWidth="2.2" />
          {/* Bodi Karung Terigu Gandum Hangat */}
          <Path
            d="M14 14 C11 14, 9 36, 11 40 C13 43, 35 43, 37 40 C39 36, 37 14, 34 14 Z"
            fill="#FCD34D"
            stroke="#78350F"
            strokeWidth="2.4"
          />
          {/* Tali Pengikat Oranye */}
          <Rect x="16" y="13" width="16" height="3.5" rx="1.7" fill="#EA580C" />
          {/* Lencana Gandum di Tengah Karung */}
          <Circle cx="24" cy="28" r="8" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.8" />
          <Path d="M24 22 V34 M20 26 L24 29 L28 26 M20 30 L24 33 L28 30" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>
    );
  }

  // 4. BELANJA SUBUH — Keranjang Rotan Anyaman Penuh Bahan Segar
  if (type === 'market') {
    return (
      <View style={wrapStyle('#FFFBEB', '#FDE68A', '#D97706')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          {/* Gagang Keranjang */}
          <Path d="M15 21 C15 9, 33 9, 33 21" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          {/* Isi Belanjaan: Telur, Wortel & Sayur Segar */}
          <Circle cx="18" cy="19" r="5" fill="#FEF08A" stroke="#78350F" strokeWidth="1.8" />
          <Circle cx="25" cy="17" r="5.5" fill="#FB923C" stroke="#7C2D12" strokeWidth="1.8" />
          <Circle cx="31" cy="19" r="4.5" fill="#10B981" stroke="#065F46" strokeWidth="1.8" />
          {/* Bodi Keranjang Anyaman */}
          <Path d="M8 21 H40 L35 40 H13 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" strokeLinejoin="round" />
          <Rect x="6" y="19" width="36" height="5" rx="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          {/* Garis Anyaman */}
          <Path d="M16 27 V36 M24 27 V36 M32 27 V36" stroke="#FEF3C7" strokeWidth="2.2" strokeLinecap="round" />
        </Svg>
      </View>
    );
  }

  // 5. HITUNG HPP — Buku Resep & Kalkulator Margin Dapur
  if (type === 'hpp') {
    return (
      <View style={wrapStyle('#FFFBEB', '#FDE68A', '#D97706')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          <Rect x="10" y="7" width="28" height="34" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="2.4" />
          <Rect x="14" y="11" width="20" height="9" rx="3" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.8" />
          <Path d="M17 15.5 H29" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />
          <Circle cx="17" cy="26" r="2.6" fill="#FFFBEB" />
          <Circle cx="24" cy="26" r="2.6" fill="#FFFBEB" />
          <Circle cx="31" cy="26" r="2.6" fill="#EA580C" />
          <Circle cx="17" cy="33" r="2.6" fill="#FFFBEB" />
          <Circle cx="24" cy="33" r="2.6" fill="#FFFBEB" />
          <Circle cx="31" cy="33" r="2.6" fill="#10B981" />
        </Svg>
      </View>
    );
  }

  // 6. BUKU PIUTANG — Buku Catatan Setoran & Koin Emas
  if (type === 'debt') {
    return (
      <View style={wrapStyle('#FFF7ED', '#FDBA74', '#EA580C')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          <Rect x="9" y="7" width="26" height="33" rx="5" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" />
          <Rect x="13" y="11" width="18" height="25" rx="2.5" fill="#FFFBEB" />
          <Path d="M16 17 H28 M16 22 H26 M16 27 H22" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
          <Circle cx="34" cy="33" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2.2" />
          <Path d="M34 29 V37 M31 33 H37" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </Svg>
      </View>
    );
  }

  // 7. MITRA KANTIN — Pengurus Kantin & Lencana Kerja Sama
  if (type === 'partner') {
    return (
      <View style={wrapStyle('#FFFBEB', '#FDE68A', '#D97706')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
          <Circle cx="19" cy="17" r="6" fill="#FDE047" stroke="#78350F" strokeWidth="2.2" />
          <Circle cx="31" cy="18" r="5" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.2" />
          <Path d="M9 38 C9 28, 29 28, 29 38 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.2" />
          <Path d="M23 38 C23 30, 39 30, 39 38 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
        </Svg>
      </View>
    );
  }

  // 8. LABA BERSIH — Grafik Batang Emas & Koin Keuntungan
  return (
    <View style={wrapStyle('#FFF7ED', '#FDBA74', '#C2410C')}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
        <Rect x="9" y="25" width="7" height="15" rx="2.5" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
        <Rect x="20.5" y="18" width="7" height="22" rx="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
        <Rect x="32" y="10" width="7" height="30" rx="2.5" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
        <Circle cx="14" cy="14" r="5" fill="#FDE047" stroke="#B45309" strokeWidth="1.8" />
      </Svg>
    </View>
  );
};
