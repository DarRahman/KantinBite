import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Ellipse, G, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * AssetVisual Engine
 * Merender 28 Aset Visual Terverifikasi (Kue Nusantara & OpenMoji) secara native
 * Mendukung ukuran dinamis (default: 48) dengan Volumetric Depth & High Crispness
 */
export default function AssetVisual({ name, size = 48, style }) {
  const s = size;

  switch (name) {
    // ------------------------------------------------------------------
    // KUE TRADISIONAL NUSANTARA (VOLUMETRIC ENGINE)
    // ------------------------------------------------------------------
    case 'risoles_rogout':
    case 'risoles':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Ellipse cx="64" cy="112" rx="46" ry="10" fill="#000000" opacity="0.15" />
            <Defs>
              <LinearGradient id="gRisoles" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#FBBF24" />
                <Stop offset="30%" stopColor="#F59E0B" />
                <Stop offset="75%" stopColor="#D97706" />
                <Stop offset="100%" stopColor="#92400E" />
              </LinearGradient>
            </Defs>
            <Rect x="22" y="38" width="84" height="64" rx="32" fill="url(#gRisoles)" stroke="#78350F" strokeWidth="4" />
            <Path d="M36 50 Q64 42 92 50" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
            <Path d="M42 66 Q64 74 86 66" stroke="#92400E" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <Path d="M38 82 Q64 90 90 82" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
            <Circle cx="38" cy="58" r="2" fill="#78350F" />
            <Circle cx="50" cy="52" r="2.5" fill="#FEF3C7" opacity="0.8" />
            <Circle cx="64" cy="60" r="2" fill="#78350F" />
            <Circle cx="76" cy="54" r="2.2" fill="#FEF3C7" opacity="0.8" />
            <Circle cx="88" cy="62" r="2" fill="#78350F" />
            <Circle cx="56" cy="80" r="2" fill="#78350F" />
            <Circle cx="72" cy="76" r="2.5" fill="#78350F" />
          </Svg>
        </View>
      );

    case 'pastel_telur':
    case 'pastel':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Ellipse cx="64" cy="112" rx="44" ry="9" fill="#000000" opacity="0.14" />
            <Defs>
              <LinearGradient id="gPastel" x1="20" y1="24" x2="108" y2="104" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#FDE68A" />
                <Stop offset="35%" stopColor="#F59E0B" />
                <Stop offset="80%" stopColor="#D97706" />
                <Stop offset="100%" stopColor="#B45309" />
              </LinearGradient>
            </Defs>
            <Path d="M18 88 C20 40 108 40 110 88 Z" fill="url(#gPastel)" stroke="#78350F" strokeWidth="4" />
            <Path d="M14 88 Q20 98 26 88 Q32 98 38 88 Q44 98 50 88 Q56 98 62 88 Q68 98 74 88 Q80 98 86 88 Q92 98 98 88 Q104 98 110 88 Q114 96 118 88" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <Path d="M34 60 Q64 48 94 60" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <Circle cx="48" cy="70" r="3" fill="#D97706" opacity="0.6" />
            <Circle cx="78" cy="68" r="3" fill="#D97706" opacity="0.6" />
            <Circle cx="64" cy="76" r="3.5" fill="#B45309" opacity="0.5" />
          </Svg>
        </View>
      );

    case 'dadar_gulung':
    case 'dadar':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Ellipse cx="64" cy="112" rx="44" ry="10" fill="#000000" opacity="0.15" />
            <Defs>
              <LinearGradient id="gDadar" x1="24" y1="24" x2="104" y2="104" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#A7F3D0" />
                <Stop offset="25%" stopColor="#34D399" />
                <Stop offset="70%" stopColor="#10B981" />
                <Stop offset="100%" stopColor="#047857" />
              </LinearGradient>
            </Defs>
            <Rect x="26" y="44" width="76" height="54" rx="27" fill="url(#gDadar)" stroke="#065F46" strokeWidth="4" />
            <Path d="M38 52 Q64 46 90 52" stroke="#D1FAE5" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <Ellipse cx="90" cy="71" rx="8" ry="16" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <Ellipse cx="90" cy="71" rx="4" ry="10" fill="#92400E" />
            <Circle cx="42" cy="64" r="2.2" fill="#D1FAE5" opacity="0.8" />
            <Circle cx="54" cy="72" r="2.5" fill="#D1FAE5" opacity="0.8" />
            <Circle cx="68" cy="62" r="2.2" fill="#D1FAE5" opacity="0.8" />
            <Circle cx="78" cy="74" r="2.5" fill="#D1FAE5" opacity="0.8" />
          </Svg>
        </View>
      );

    case 'lemper_ayam':
    case 'lemper':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 128 128" fill="none">
            <Ellipse cx="64" cy="112" rx="42" ry="9" fill="#000000" opacity="0.14" />
            <Defs>
              <LinearGradient id="gLemper" x1="28" y1="28" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#6EE7B7" />
                <Stop offset="30%" stopColor="#059669" />
                <Stop offset="80%" stopColor="#047857" />
                <Stop offset="100%" stopColor="#064E3B" />
              </LinearGradient>
            </Defs>
            <Rect x="30" y="40" width="68" height="62" rx="14" fill="url(#gLemper)" stroke="#064E3B" strokeWidth="4" />
            <Path d="M42 40 L42 102" stroke="#065F46" strokeWidth="2.5" opacity="0.7" />
            <Path d="M54 40 L54 102" stroke="#065F46" strokeWidth="2.5" opacity="0.7" />
            <Path d="M66 40 L66 102" stroke="#A7F3D0" strokeWidth="3" opacity="0.75" />
            <Path d="M78 40 L78 102" stroke="#065F46" strokeWidth="2.5" opacity="0.7" />
            <Path d="M22 66 L106 66" stroke="#FDE68A" strokeWidth="4.5" strokeLinecap="round" />
            <Circle cx="64" cy="66" r="3.5" fill="#D97706" />
          </Svg>
        </View>
      );

    // ------------------------------------------------------------------
    // BAHAN BAKU & OPERASIONAL DAPUR
    // ------------------------------------------------------------------
    case 'wheat_flour':
    case 'flour':
    case 'terigu':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M36 12 C28 22 28 32 36 40 C44 32 44 22 36 12 Z" fill="#FBBF24" stroke="#000" strokeWidth="2.5" />
            <Path d="M24 24 C18 32 20 40 28 44 C32 36 30 28 24 24 Z" fill="#F59E0B" stroke="#000" strokeWidth="2.5" />
            <Path d="M48 24 C54 32 52 40 44 44 C40 36 42 28 48 24 Z" fill="#F59E0B" stroke="#000" strokeWidth="2.5" />
            <Path d="M36 40 L36 60" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'egg_raw':
    case 'egg':
    case 'telur':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Ellipse cx="36" cy="38" rx="18" ry="24" fill="#FDE68A" stroke="#000" strokeWidth="3" />
            <Ellipse cx="31" cy="28" rx="4" ry="8" fill="#FFF" opacity="0.7" />
          </Svg>
        </View>
      );

    case 'oil_butter':
    case 'oil':
    case 'minyak':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Rect x="22" y="24" width="28" height="36" rx="6" fill="#F59E0B" stroke="#000" strokeWidth="3" />
            <Rect x="30" y="14" width="12" height="10" rx="3" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
            <Path d="M26 40 Q36 46 46 40" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'carrot_veg':
    case 'carrot':
    case 'wortel':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M46 16 L56 12 M48 14 L54 22" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <Path d="M46 18 L20 54 Q18 58 22 56 L52 24 Z" fill="#EA580C" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
          </Svg>
        </View>
      );

    case 'meat_chicken':
    case 'ayam':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Ellipse cx="38" cy="32" rx="18" ry="14" fill="#F59E0B" stroke="#000" strokeWidth="3" />
            <Path d="M24 40 L16 52 M18 42 L12 48" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'package_box':
    case 'mika':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Rect x="16" y="22" width="40" height="34" rx="6" fill="#BAE6FD" stroke="#000" strokeWidth="3" opacity="0.9" />
            <Path d="M16 34 L56 34" stroke="#000" strokeWidth="2.5" />
          </Svg>
        </View>
      );

    case 'gas_cylinder':
    case 'gas':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Rect x="22" y="24" width="28" height="34" rx="8" fill="#10B981" stroke="#000" strokeWidth="3" />
            <Rect x="28" y="16" width="16" height="8" rx="3" fill="#047857" stroke="#000" strokeWidth="2" />
            <Circle cx="36" cy="40" r="4" fill="#064E3B" />
          </Svg>
        </View>
      );

    case 'cooking_pan':
    case 'masak':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Circle cx="32" cy="38" r="18" fill="#475569" stroke="#000" strokeWidth="3" />
            <Circle cx="32" cy="38" r="12" fill="#F59E0B" />
            <Circle cx="32" cy="38" r="5" fill="#EF4444" />
            <Path d="M45 48 L60 60" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
          </Svg>
        </View>
      );

    // ------------------------------------------------------------------
    // FINANSIAL, TRANSAKSI & LOGISTIK
    // ------------------------------------------------------------------
    case 'wallet_purse':
    case 'wallet':
    case 'dompet':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Rect x="14" y="20" width="44" height="34" rx="8" fill="#EA580C" stroke="#000" strokeWidth="3" />
            <Path d="M14 28 L58 28" stroke="#7C2D12" strokeWidth="2.5" />
            <Rect x="40" y="32" width="18" height="12" rx="4" fill="#FBBF24" stroke="#000" strokeWidth="2" />
            <Circle cx="46" cy="38" r="2" fill="#000" />
          </Svg>
        </View>
      );

    case 'money_cash':
    case 'omzet':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M22 26 C16 48 24 58 36 58 C48 58 56 48 50 26 Z" fill="#10B981" stroke="#000" strokeWidth="3" />
            <Path d="M26 26 Q36 30 46 26" stroke="#000" strokeWidth="2.5" />
            <Circle cx="36" cy="42" r="5" fill="#FEF3C7" stroke="#047857" strokeWidth="2" />
          </Svg>
        </View>
      );

    case 'coin_gold':
    case 'koin':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Circle cx="36" cy="36" r="20" fill="#FBBF24" stroke="#000" strokeWidth="3" />
            <Circle cx="36" cy="36" r="14" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <Path d="M36 26 L36 46" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'canteen_shop':
    case 'canteen':
    case 'kantin':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Rect x="18" y="34" width="36" height="24" rx="4" fill="#F1F5F9" stroke="#000" strokeWidth="3" />
            <Path d="M14 34 L36 16 L58 34 Z" fill="#EF4444" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
            <Rect x="28" y="42" width="16" height="16" rx="2" fill="#EA580C" />
          </Svg>
        </View>
      );

    case 'market_cart':
    case 'pasar':
    case 'belanja':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M14 18 L22 18 L28 42 L52 42 L56 24 L24 24" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <Circle cx="30" cy="52" r="4" fill="#EA580C" stroke="#000" strokeWidth="2.5" />
            <Circle cx="50" cy="52" r="4" fill="#EA580C" stroke="#000" strokeWidth="2.5" />
          </Svg>
        </View>
      );

    case 'receipt_bill':
    case 'struk':
    case 'nota':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M20 16 L52 16 L52 56 L46 52 L40 56 L34 52 L28 56 L20 52 Z" fill="#FFF" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
            <Path d="M26 26 L46 26 M26 34 L42 34 M26 42 L38 42" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'clock_time':
    case 'subuh':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Circle cx="36" cy="38" r="18" fill="#FFF" stroke="#000" strokeWidth="3" />
            <Path d="M36 28 L36 38 L44 38" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
            <Path d="M26 18 L20 24 M46 18 L52 24" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
      );

    // ------------------------------------------------------------------
    // STATUS, MASKOT & INTERAKSI MIKRO
    // ------------------------------------------------------------------
    case 'chef_mascot':
    case 'bitey':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Mascot size={s} />
        </View>
      );

    case 'check_badge':
    case 'lunas':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Circle cx="36" cy="36" r="20" fill="#10B981" stroke="#000" strokeWidth="3" />
            <Path d="M26 36 L33 43 L46 29" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      );

    case 'warning_badge':
    case 'warning':
    case 'kritis':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M36 16 L56 52 L16 52 Z" fill="#FBBF24" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
            <Path d="M36 28 L36 40 M36 46 L36 48" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'mascot_fire':
    case 'fire':
    case 'laris':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M36 14 C36 26 48 30 48 44 C48 54 42 60 36 60 C30 60 24 54 24 44 C24 32 32 24 36 14 Z" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
            <Path d="M36 34 C36 40 42 44 42 48 C42 52 39 54 36 54 C33 54 30 52 30 48 C30 42 34 38 36 34 Z" fill="#FBBF24" />
          </Svg>
        </View>
      );

    case 'mascot_star':
    case 'star':
    case 'favorit':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M36 14 L42 28 L56 29 L45 39 L49 54 L36 45 L23 54 L27 39 L16 29 L30 28 Z" fill="#FBBF24" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
          </Svg>
        </View>
      );

    case 'chart_up':
    case 'tren':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 72 72">
            <Path d="M16 52 L56 52 M16 44 L28 32 L40 40 L54 20" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M44 20 L54 20 L54 30" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      );

    case 'meat_chicken':
    case 'ayam':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="20" ry="4" fill="#E2E8F0" />
            {/* Tulang Paha Putih */}
            <Path d="M28 46 L28 54 M26 54 C24 54 24 57 26 57 C28 57 28 55 30 55 C32 55 32 57 34 57 C36 57 36 54 34 54 L34 46" stroke="#18181B" strokeWidth="2.5" fill="#FFFFFF" strokeLinejoin="round" />
            {/* Daging Paha Ayam Keemasan Bervolume */}
            <Path d="M20 32 C16 22 24 14 34 14 C44 14 48 22 46 32 C44 42 38 46 32 46 C24 46 22 40 20 32 Z" fill="#F59E0B" stroke="#18181B" strokeWidth="2.5" />
            <Path d="M24 24 Q32 18 40 24" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <Circle cx="30" cy="30" r="2.5" fill="#D97706" />
            <Circle cx="38" cy="34" r="2" fill="#D97706" />
          </Svg>
        </View>
      );

    case 'carrot_veg':
    case 'wortel':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="18" ry="4" fill="#E2E8F0" />
            {/* Daun Hijau Segar di Atas */}
            <Path d="M32 18 C30 10 24 10 26 18 M32 18 C32 8 36 8 34 18 M32 18 C36 10 42 12 38 18" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Badan Wortel Runcing Oranye */}
            <Path d="M24 20 C22 24 30 52 32 52 C34 52 42 24 40 20 C36 18 28 18 24 20 Z" fill="#F97316" stroke="#18181B" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Serat Garis Alami */}
            <Path d="M27 26 h6 M29 34 h7 M28 42 h5" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'egg_raw':
    case 'telur':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="18" ry="4" fill="#E2E8F0" />
            <Path d="M20 38 C20 22 25 14 32 14 C39 14 44 22 44 38 C44 48 39 52 32 52 C25 52 20 48 20 38 Z" fill="#FEF3C7" stroke="#18181B" strokeWidth="2.5" />
            <Path d="M25 30 Q30 20 36 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'oil_butter':
    case 'minyak':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="20" ry="4" fill="#E2E8F0" />
            <Rect x="28" y="12" width="8" height="6" rx="2" fill="#EF4444" stroke="#18181B" strokeWidth="2" />
            <Path d="M29 18 L29 24 L22 30 L22 50 C22 52 24 54 26 54 L38 54 C40 54 42 52 42 50 L42 30 L35 18 Z" fill="#FBBF24" stroke="#18181B" strokeWidth="2.5" strokeLinejoin="round" />
            <Circle cx="32" cy="40" r="4.5" fill="#F59E0B" />
            <Path d="M26 34 L26 48" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </Svg>
        </View>
      );

    case 'package_box':
    case 'mika':
    case 'plastik':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="22" ry="4" fill="#E2E8F0" />
            {/* Tutup Mika Transparan Buka Ke Atas */}
            <Path d="M14 26 L18 16 L46 16 L50 26 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" opacity="0.85" />
            <Path d="M22 18 L42 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* Wadah Bawah Mika Plastik Bergaris Bersekat */}
            <Rect x="12" y="26" width="40" height="24" rx="4" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2.5" />
            <Path d="M22 26 L22 48 M32 26 L32 48 M42 26 L42 48" stroke="#BAE6FD" strokeWidth="1.8" />
            {/* Kilau Plastik Halus */}
            <Path d="M16 30 L48 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    case 'sugar_cane':
    case 'gula':
    case 'daun':
      return (
        <View style={[{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
            <Ellipse cx="32" cy="54" rx="20" ry="4" fill="#E2E8F0" />
            {/* Daun Pisang Hijau Tua di Belakang */}
            <Path d="M38 16 C48 18 52 30 46 44 C42 50 36 52 32 50 C28 42 32 24 38 16 Z" fill="#15803D" stroke="#166534" strokeWidth="2" />
            <Path d="M38 18 L36 48" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
            {/* Karung Kantong Gula Pasir Putih Berikat Tali */}
            <Path d="M18 28 C16 22 36 22 34 28 L36 50 C36 54 16 54 16 50 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
            <Rect x="20" y="24" width="12" height="5" rx="2" fill="#FEF08A" stroke="#18181B" strokeWidth="1.5" />
            <Path d="M22 38 L30 38" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
            <Path d="M24 43 L28 43" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </View>
      );

    default:
      return (
        <View style={[{ width: s, height: s, backgroundColor: '#F1F5F9', borderRadius: s / 3, alignItems: 'center', justifyContent: 'center' }, style]}>
          <Circle cx={s / 2} cy={s / 2} r={s / 4} fill="#EA580C" />
        </View>
      );
  }
}
