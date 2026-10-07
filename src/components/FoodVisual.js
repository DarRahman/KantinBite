import React from 'react';
import Svg, { Rect, Path, Circle, Ellipse, Polygon, Line } from 'react-native-svg';

export const FoodVisual = ({ type = 'risoles', size = 52 }) => {
  switch (type) {
    case 'canteen_shop':
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {/* Bayangan alas */}
          <Ellipse cx="32" cy="56" rx="22" ry="4" fill="#F4F4F5" />
          {/* Kanopi tenda kantin bergaris oranye-putih */}
          <Path d="M8 24 L14 12 L50 12 L56 24 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
          <Path d="M18 12 L16 24" stroke="#FFFFFF" strokeWidth="2.5" />
          <Path d="M28 12 L28 24" stroke="#FFFFFF" strokeWidth="2.5" />
          <Path d="M36 12 L36 24" stroke="#FFFFFF" strokeWidth="2.5" />
          <Path d="M46 12 L48 24" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Rumbai kanopi */}
          <Path d="M8 24 Q13 28 18 24 Q23 28 28 24 Q33 28 38 24 Q43 28 48 24 Q53 28 56 24" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
          {/* Dinding & etalase toko */}
          <Rect x="12" y="26" width="40" height="26" rx="4" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
          {/* Kaca etalase kue */}
          <Rect x="16" y="30" width="32" height="13" rx="3" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />
          {/* Kue di dalam etalase */}
          <Circle cx="22" cy="36" r="2.5" fill="#F59E0B" />
          <Circle cx="32" cy="36" r="2.5" fill="#F59E0B" />
          <Circle cx="42" cy="36" r="2.5" fill="#10B981" />
          {/* Meja kasir depan */}
          <Rect x="12" y="44" width="40" height="8" rx="2" fill="#F4F4F5" stroke="#18181B" strokeWidth="1.5" />
        </Svg>
      );
    case 'risoles':
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {/* Bayangan halus */}
          <Ellipse cx="32" cy="54" rx="24" ry="5" fill="#F4F4F5" />
          {/* Risol emas renyah */}
          <Rect x="8" y="18" width="48" height="28" rx="14" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          {/* Tekstur tepung roti / breadcrumb crust */}
          <Line x1="18" y1="26" x2="22" y2="38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <Line x1="30" y1="24" x2="34" y2="40" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <Line x1="42" y1="26" x2="46" y2="38" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          {/* Highlight kilau minyak keemasan */}
          <Path d="M16 22 Q32 18 48 22" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </Svg>
      );
    case 'pastel':
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <Ellipse cx="32" cy="54" rx="24" ry="5" fill="#F4F4F5" />
          {/* Bentuk setengah lingkaran pastel */}
          <Path d="M10 42 C10 20, 54 20, 54 42 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          {/* Lipatan gerigi pilin khas pastel */}
          <Path
            d="M10 42 Q15 45 20 42 Q25 45 30 42 Q35 45 40 42 Q45 45 50 42 Q53 44 54 42"
            stroke="#9A3412"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tekstur gelembung renyah */}
          <Circle cx="26" cy="30" r="2" fill="#D97706" />
          <Circle cx="36" cy="28" r="2.5" fill="#D97706" />
          <Circle cx="42" cy="34" r="1.5" fill="#D97706" />
        </Svg>
      );
    case 'dadar':
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <Ellipse cx="32" cy="54" rx="24" ry="5" fill="#F4F4F5" />
          {/* Gulungan dadar pandan hijau lembut */}
          <Rect x="10" y="20" width="44" height="25" rx="12" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          {/* Lipatan ujung kelapa */}
          <Ellipse cx="50" cy="32.5" rx="2.5" ry="9" fill="#065F46" />
          {/* Motif pori-pori kulit bintik putih manis */}
          <Path d="M16 32 Q26 28 36 32" stroke="#D1FAE5" strokeWidth="2" strokeLinecap="round" />
          <Circle cx="24" cy="25" r="1.5" fill="#ECFDF5" />
          <Circle cx="34" cy="38" r="1.5" fill="#ECFDF5" />
        </Svg>
      );
    case 'lemper':
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <Ellipse cx="32" cy="54" rx="24" ry="5" fill="#F4F4F5" />
          {/* Bungkus daun pisang hijau segar */}
          <Polygon points="16,14 48,14 54,46 10,46" fill="#059669" stroke="#065F46" strokeWidth="2.5" />
          {/* Garis serat daun pisang */}
          <Line x1="32" y1="14" x2="32" y2="46" stroke="#047857" strokeWidth="2" />
          <Line x1="22" y1="16" x2="20" y2="44" stroke="#047857" strokeWidth="1.5" strokeDasharray="3,3" />
          <Line x1="42" y1="16" x2="44" y2="44" stroke="#047857" strokeWidth="1.5" strokeDasharray="3,3" />
          {/* Sematan lidi / tusuk gigi kuning di atas daun */}
          <Line x1="18" y1="17" x2="46" y2="17" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      );
    default:
      return null;
  }
};
