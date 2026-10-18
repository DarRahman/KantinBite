import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Polygon } from 'react-native-svg';

/**
 * PastelReferenceIcon — 8-Icon Squircle Bervolume (Terinspirasi Referensi 1 Top-Left)
 * Mendukung 8 tipe modul operasional:
 * 'pos' | 'canteen' | 'stock' | 'market' | 'hpp' | 'debt' | 'partner' | 'report'
 */
export const PastelReferenceIcon = ({ type, size = 62 }) => {
  const s = size;
  const r = s * 0.32;
  const iconSize = s * 0.72;

  const wrapStyle = (bg, shadowColor) => ({
    width: s,
    height: s,
    borderRadius: r,
    backgroundColor: bg,
    borderWidth: 1.5,
    borderColor: shadowColor,
    borderBottomWidth: 4,
    borderBottomColor: shadowColor,
    alignItems: 'center',
    justifyContent: 'center',
  });

  if (type === 'pos') {
    return (
      <View style={wrapStyle('#FED7AA', '#EA580C')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Path d="M16 6 h16 v12 h-16 Z" fill="#FFFFFF" />
          <Path d="M20 11 h8 M20 14 h5" stroke="#3D312A" strokeWidth="2" strokeLinecap="round" />
          <Rect x="8" y="15" width="32" height="25" rx="7" fill="#3D312A" />
          <Rect x="13" y="19" width="22" height="10" rx="3" fill="#FFFBEB" />
          <Circle cx="16" cy="33" r="2.4" fill="#FBBF24" />
          <Circle cx="24" cy="33" r="2.4" fill="#FFFFFF" />
          <Circle cx="32" cy="33" r="2.4" fill="#EA580C" />
          <Rect x="11" y="40" width="26" height="4" rx="2" fill="#FDE68A" />
        </Svg>
      </View>
    );
  }

  if (type === 'canteen') {
    return (
      <View style={wrapStyle('#A7F3D0', '#059669')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Path d="M6 18 L24 6 L42 18 L38 25 L10 25 Z" fill="#FFFFFF" />
          <Circle cx="15" cy="25" r="3.2" fill="#3D312A" />
          <Circle cx="24" cy="25" r="3.2" fill="#EA580C" />
          <Circle cx="33" cy="25" r="3.2" fill="#3D312A" />
          <Rect x="9" y="25" width="30" height="20" rx="5" fill="#3D312A" />
          <Rect x="14" y="29" width="11" height="11" rx="2.5" fill="#FEF3C7" />
          <Rect x="29" y="29" width="7" height="16" rx="2" fill="#6EE7B7" />
        </Svg>
      </View>
    );
  }

  if (type === 'stock') {
    return (
      <View style={wrapStyle('#DDD6FE', '#7C3AED')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Path d="M21 11 C21 5 27 5 27 11 Z" fill="#FFFFFF" />
          <Circle cx="24" cy="12" r="5" fill="#FDE68A" />
          <Path d="M13 14 C12 8 36 8 35 14 L39 38 C39 45 9 45 9 38 Z" fill="#3D312A" />
          <Circle cx="24" cy="28" r="8" fill="#FFFFFF" />
          <Path d="M24 23 V33 M20 27 L24 30 L28 27" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" />
        </Svg>
      </View>
    );
  }

  if (type === 'market') {
    return (
      <View style={wrapStyle('#D9F99D', '#65A30D')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Circle cx="20" cy="14" r="5.5" fill="#FFFFFF" />
          <Circle cx="29" cy="13" r="6" fill="#FB923C" />
          <Path d="M7 11 h7 l4.5 18 h20 l4.5-14 h-26" fill="none" stroke="#3D312A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="20" cy="37" r="4" fill="#3D312A" />
          <Circle cx="20" cy="37" r="1.8" fill="#FFFFFF" />
          <Circle cx="34" cy="37" r="4" fill="#3D312A" />
          <Circle cx="34" cy="37" r="1.8" fill="#FFFFFF" />
        </Svg>
      </View>
    );
  }

  if (type === 'hpp') {
    return (
      <View style={wrapStyle('#FEF08A', '#CA8A04')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Rect x="10" y="8" width="28" height="34" rx="6" fill="#3D312A" />
          <Rect x="14" y="12" width="20" height="8" rx="2.5" fill="#FEF9C3" />
          <Circle cx="17" cy="26" r="2.5" fill="#FFFFFF" />
          <Circle cx="24" cy="26" r="2.5" fill="#FFFFFF" />
          <Circle cx="31" cy="26" r="2.5" fill="#FB923C" />
          <Circle cx="17" cy="34" r="2.5" fill="#FFFFFF" />
          <Circle cx="24" cy="34" r="2.5" fill="#FFFFFF" />
          <Circle cx="31" cy="34" r="2.5" fill="#10B981" />
        </Svg>
      </View>
    );
  }

  if (type === 'debt') {
    return (
      <View style={wrapStyle('#FECDD3', '#E11D48')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Rect x="10" y="8" width="28" height="32" rx="5" fill="#3D312A" />
          <Rect x="14" y="12" width="20" height="24" rx="3" fill="#FFFFFF" />
          <Path d="M18 19 H30 M18 25 H26" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
          <Circle cx="33" cy="33" r="7" fill="#FBBF24" stroke="#3D312A" strokeWidth="2" />
        </Svg>
      </View>
    );
  }

  if (type === 'partner') {
    return (
      <View style={wrapStyle('#BAE6FD', '#0284C7')}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
          <Circle cx="18" cy="18" r="6" fill="#FFFFFF" stroke="#3D312A" strokeWidth="2.2" />
          <Circle cx="31" cy="19" r="5" fill="#FDE68A" stroke="#3D312A" strokeWidth="2.2" />
          <Path d="M9 36 C9 27, 27 27, 27 36 Z" fill="#3D312A" />
          <Path d="M23 36 C23 29, 39 29, 39 36 Z" fill="#0284C7" />
        </Svg>
      </View>
    );
  }

  // 'report'
  return (
    <View style={wrapStyle('#FDE68A', '#D97706')}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48">
        <Rect x="10" y="26" width="7" height="14" rx="2.5" fill="#3D312A" />
        <Rect x="21" y="18" width="7" height="22" rx="2.5" fill="#EA580C" />
        <Rect x="32" y="10" width="7" height="30" rx="2.5" fill="#10B981" />
      </Svg>
    </View>
  );
};
