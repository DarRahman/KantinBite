import React from 'react';
import Svg, { Rect, Line, Path, Ellipse, Polygon } from 'react-native-svg';

export const FoodIcon = ({ type, size = 46 }) => {
  switch (type) {
    case 'risoles':
      return (
        <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
          <Rect x="6" y="14" width="38" height="22" rx="10" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <Line x1="14" y1="20" x2="18" y2="30" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <Line x1="24" y1="18" x2="28" y2="32" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <Line x1="33" y1="20" x2="36" y2="30" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </Svg>
      );
    case 'pastel':
      return (
        <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
          <Path d="M8 32 C8 16, 42 16, 42 32 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
          <Path d="M8 32 Q12 34 16 32 Q20 34 24 32 Q28 34 32 32 Q36 34 40 32" stroke="#B45309" strokeWidth="2" fill="none" />
        </Svg>
      );
    case 'dadar':
      return (
        <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
          <Rect x="8" y="15" width="34" height="20" rx="9" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <Ellipse cx="40" cy="25" rx="2" ry="7" fill="#047857" />
          <Path d="M12 25 Q20 22 28 25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
      );
    case 'lemper':
      return (
        <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
          <Polygon points="12,12 38,12 42,36 8,36" fill="#059669" stroke="#047857" strokeWidth="2" />
          <Line x1="25" y1="12" x2="25" y2="36" stroke="#047857" strokeWidth="1.5" />
          <Line x1="16" y1="14" x2="34" y2="14" stroke="#FDE68A" strokeWidth="2" />
        </Svg>
      );
    default:
      return null;
  }
};
