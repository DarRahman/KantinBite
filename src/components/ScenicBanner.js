import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Path,
  Circle,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  Stop,
  Polygon,
  Line,
} from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * ScenicBanner — Komponen Ilustrasi Pemandangan Header (Scenic Header Engine)
 * Mengadaptasi estetika 5 referensi utama:
 * - Pemandangan penuh warna di bagian atas layar (seperti Camp Big Sky & Duolingo Park)
 * - Karakter maskot ekspresif & kanopi kafe/kantin (seperti Jujuly Cafe)
 * - Mendukung tombol Back, badge sesi waktu, dan tombol aksi kanan
 */
export const ScenicBanner = ({
  scene = 'kitchen_morning',
  title,
  subtitle,
  badgeText,
  onBackPress,
  actionLabel,
  onActionPress,
  rightAvatarOnPress,
  children,
}) => {
  const getScenePalette = () => {
    switch (scene) {
      case 'canteen_morning':
        return {
          skyTop: '#E0F2FE',
          skyBottom: '#FEF3C7',
          hillBack: '#A7F3D0',
          hillFront: '#6EE7B7',
          awningA: '#059669',
          awningB: '#FFFFFF',
          mascotPose: 'canteen_drop',
          accentTagBg: '#ECFDF5',
          accentTagText: '#047857',
        };
      case 'canteen_afternoon':
        return {
          skyTop: '#FFEDD5',
          skyBottom: '#FDE68A',
          hillBack: '#FDBA74',
          hillFront: '#FB923C',
          awningA: '#EA580C',
          awningB: '#FFF7ED',
          mascotPose: 'celebrate',
          accentTagBg: '#FFF7ED',
          accentTagText: '#C2410C',
        };
      case 'pos_bakery':
        return {
          skyTop: '#FEF3C7',
          skyBottom: '#FFEDD5',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'cashier',
          accentTagBg: '#FFF7ED',
          accentTagText: '#C2410C',
        };
      case 'hpp_kitchen':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#F59E0B',
          awningA: '#D97706',
          awningB: '#FFFBEB',
          mascotPose: 'notebook',
          accentTagBg: '#FEF3C7',
          accentTagText: '#92400E',
        };
      case 'stock_pantry':
        return {
          skyTop: '#F3E8FF',
          skyBottom: '#FEF3C7',
          hillBack: '#DDD6FE',
          hillFront: '#C4B5FD',
          awningA: '#7C3AED',
          awningB: '#FFFFFF',
          mascotPose: 'stock_chef',
          accentTagBg: '#F3E8FF',
          accentTagText: '#6D28D9',
        };
      case 'market_dawn':
        return {
          skyTop: '#ECFDF5',
          skyBottom: '#FEF9C3',
          hillBack: '#BBF7D0',
          hillFront: '#86EFAC',
          awningA: '#15803D',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
          accentTagBg: '#DCFCE7',
          accentTagText: '#15803D',
        };
      default:
        // 'kitchen_morning'
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
          accentTagBg: '#FFF7ED',
          accentTagText: '#C2410C',
        };
    }
  };

  const theme = getScenePalette();

  return (
    <View style={styles.wrapper}>
      {/* LAPISAN ILUSTRASI PEMANDANGAN SVG PENUH */}
      <View style={styles.svgBackdrop}>
        <Svg width="100%" height="100%" viewBox="0 0 400 185" preserveAspectRatio="xMidYMid slice">
          <Defs>
            <LinearGradient id={`sky_${scene}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.skyTop} />
              <Stop offset="100%" stopColor={theme.skyBottom} />
            </LinearGradient>
          </Defs>

          {/* Langit Hangat */}
          <Rect x="0" y="0" width="400" height="185" fill={`url(#sky_${scene})`} />

          {/* Matahari Pagi / Sore Bersinar */}
          <Circle cx="330" cy="48" r="34" fill="#FDE047" opacity="0.35" />
          <Circle cx="330" cy="48" r="22" fill="#FACC15" opacity="0.55" />

          {/* Awan Lembut Mengambang */}
          <G opacity="0.85">
            <Circle cx="55" cy="42" r="14" fill="#FFFFFF" />
            <Circle cx="72" cy="38" r="18" fill="#FFFFFF" />
            <Circle cx="90" cy="43" r="13" fill="#FFFFFF" />
            <Rect x="52" y="42" width="40" height="14" rx="7" fill="#FFFFFF" />
          </G>
          <G opacity="0.7">
            <Circle cx="215" cy="30" r="11" fill="#FFFFFF" />
            <Circle cx="229" cy="27" r="14" fill="#FFFFFF" />
            <Circle cx="243" cy="31" r="10" fill="#FFFFFF" />
          </G>

          {/* Bukit / Meja Dapur Latar Belakang */}
          <Path
            d="M0 138 Q95 110 210 135 T400 125 L400 185 L0 185 Z"
            fill={theme.hillBack}
            opacity="0.7"
          />
          <Path
            d="M0 154 Q130 132 260 152 T400 144 L400 185 L0 185 Z"
            fill={theme.hillFront}
            opacity="0.65"
          />

          {/* Elemen Dekoratif Spesifik Scene (Pohon / Tenda Kantin / Rak Kue) */}
          {(scene === 'canteen_morning' || scene === 'canteen_afternoon' || scene === 'market_dawn') && (
            <G>
              {/* Pepohonan Rindang Kampus / Pasar */}
              <Rect x="26" y="108" width="7" height="34" rx="3" fill="#78350F" />
              <Circle cx="29" cy="100" r="16" fill="#10B981" />
              <Circle cx="20" cy="108" r="12" fill="#059669" />
              <Circle cx="39" cy="108" r="12" fill="#34D399" />

              {/* Tenda Etalase Kantin Mini di Kejauhan */}
              <Rect x="242" y="108" width="56" height="36" rx="4" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
              <Path d="M236 108 L246 92 H294 L304 108 Z" fill={theme.awningA} stroke="#78350F" strokeWidth="2" />
              <Rect x="252" y="116" width="36" height="14" rx="2" fill="#BAE6FD" />
            </G>
          )}

          {(scene === 'kitchen_morning' || scene === 'pos_bakery' || scene === 'hpp_kitchen') && (
            <G>
              {/* Kanopi Garis-Garis Bakery di Atas */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <Path
                  key={i}
                  d={`M${i * 42} 0 H${i * 42 + 21} V14 Q${i * 42 + 10.5} 22 ${i * 42} 14 Z`}
                  fill={i % 2 === 0 ? theme.awningA : theme.awningB}
                  opacity="0.28"
                />
              ))}
              {/* Kubah Saji Kue & Stoples Dapur di Latar */}
              <Ellipse cx="264" cy="138" rx="26" ry="6" fill="#92400E" opacity="0.3" />
              <Path d="M242 136 C242 112, 286 112, 286 136 Z" fill="#FFFFFF" opacity="0.75" stroke="#D97706" strokeWidth="1.8" />
              <Circle cx="264" cy="112" r="4" fill="#EA580C" />
              <Circle cx="257" cy="131" r="6" fill="#F59E0B" />
              <Circle cx="271" cy="131" r="6" fill="#10B981" />
            </G>
          )}

          {scene === 'stock_pantry' && (
            <G>
              {/* Rak Kayu Gudang Tepung & Telur */}
              <Rect x="235" y="102" width="62" height="6" rx="3" fill="#92400E" />
              <Rect x="242" y="84" width="18" height="18" rx="4" fill="#FDE68A" stroke="#78350F" strokeWidth="1.8" />
              <Rect x="266" y="86" width="16" height="16" rx="4" fill="#FCA5A5" stroke="#991B1B" strokeWidth="1.8" />
            </G>
          )}
        </Svg>
      </View>

      {/* KONTEN UTAMA HEADER */}
      <View style={styles.contentWrap}>
        {/* Baris Navigasi Atas (Back Button / Status Badge / Action CTA) */}
        <View style={styles.topNavRow}>
          <View style={styles.leftRow}>
            {onBackPress ? (
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.75}
                onPress={onBackPress}
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                  <Line x1="19" y1="12" x2="5" y2="12" />
                  <Path d="M12 19L5 12L12 5" />
                </Svg>
              </TouchableOpacity>
            ) : null}

            {badgeText ? (
              <View style={[styles.sceneBadge, { backgroundColor: theme.accentTagBg }]}>
                <View style={[styles.sceneDot, { backgroundColor: theme.awningA }]} />
                <Text style={[styles.sceneBadgeText, { color: theme.accentTagText }]}>
                  {badgeText}
                </Text>
              </View>
            ) : null}
          </View>

          {actionLabel ? (
            <TouchableOpacity
              style={styles.actionCtaBtn}
              activeOpacity={0.85}
              onPress={onActionPress}
            >
              <Text style={styles.actionCtaText}>{actionLabel}</Text>
            </TouchableOpacity>
          ) : rightAvatarOnPress ? (
            <TouchableOpacity
              style={styles.profilePillBtn}
              activeOpacity={0.8}
              onPress={rightAvatarOnPress}
            >
              <Text style={styles.profilePillText}>Profil Toko</Text>
              <View style={styles.profileMiniDot} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Baris Hero Judul + Maskot Chef Bitey */}
        <View style={styles.heroRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.heroTitle}>{title}</Text>
            {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
          </View>

          <View style={styles.mascotBox}>
            <Mascot size={82} pose={theme.mascotPose} animated />
          </View>
        </View>

        {/* Slot Tambahan (Misal: Search Bar Mengambang / Segmented Switcher) */}
        {children ? <View style={styles.slotWrap}>{children}</View> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: '#FEF3C7',
    borderBottomWidth: 1.5,
    borderBottomColor: '#FDE68A',
  },
  svgBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrap: {
    paddingTop: 14,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  sceneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(234, 88, 12, 0.18)',
  },
  sceneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  sceneBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  actionCtaBtn: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#C2410C',
    borderBottomWidth: 3.5,
    borderBottomColor: '#9A3412',
  },
  actionCtaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  profilePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 3,
    borderBottomColor: '#FDBA74',
  },
  profilePillText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#9A3412',
    marginRight: 6,
  },
  profileMiniDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  titleColumn: {
    flex: 1,
    paddingRight: 8,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#18181B',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#52525B',
    marginTop: 3,
    lineHeight: 17,
  },
  mascotBox: {
    width: 84,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotWrap: {
    marginTop: 10,
  },
});
