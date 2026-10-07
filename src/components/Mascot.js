import React from 'react';
import Svg, { Circle, Path, Rect, Ellipse } from 'react-native-svg';

export const Mascot = ({ size = 104 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Tubuh adonan bulat roti mengembang */}
      <Circle cx="60" cy="65" r="42" fill="#FDE68A" stroke="#C2410C" strokeWidth="3" />
      {/* Topi Baker Koki Putih */}
      <Path d="M40 34 C36 20, 52 14, 60 22 C68 14, 84 20, 80 34 Z" fill="#FFFFFF" stroke="#C2410C" strokeWidth="2.5" />
      <Rect x="42" y="32" width="36" height="8" rx="3" fill="#FFFFFF" stroke="#C2410C" strokeWidth="2.5" />
      {/* Sepasang Mata Wijen Bulat */}
      <Circle cx="48" cy="62" r="3.5" fill="#18181B" />
      <Circle cx="72" cy="62" r="3.5" fill="#18181B" />
      {/* Blush Pipi Merah Muda */}
      <Ellipse cx="44" cy="70" rx="4" ry="2.5" fill="#FCA5A5" />
      <Ellipse cx="76" cy="70" rx="4" ry="2.5" fill="#FCA5A5" />
      {/* Senyum Manis Melengkung */}
      <Path d="M54 72 Q60 80 66 72" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
};
