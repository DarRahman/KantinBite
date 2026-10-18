import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Path,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
  Line,
} from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * ScenicBanner — Header Ilustrasi Kuliner Tajam (Zero Faded Opacity, Zero Tech Dots)
 * - Warna solid, tegas, dan menyatu dalam palet Warm Cream, Honey Gold & Terracotta
 * - Bebas kapsul bertitik (Zero Parasite Dots)
 * - Ilustrasi latar tertata di sisi kanan bawah maskot sehingga tidak pernah menabrak teks
 */
export const ScenicBanner = ({
  scene = 'kitchen_morning',
  title,
  subtitle,
  onBackPress,
  actionLabel,
  onActionPress,
  rightAvatarOnPress,
  children,
}) => {
  const getScenePalette = () => {
    switch (scene) {
      case 'canteen_morning':
      case 'canteen_afternoon':
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFBEB',
          mascotPose: scene === 'canteen_morning' ? 'canteen_drop' : 'celebrate',
        };
      case 'pos_bakery':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FFEDD5',
          hillBack: '#FDE68A',
          hillFront: '#FDBA74',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'cashier',
        };
      case 'hpp_kitchen':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#D97706',
          awningB: '#FFF7ED',
          mascotPose: 'notebook',
        };
      case 'stock_pantry':
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          hillBack: '#FED7AA',
          hillFront: '#FDBA74',
          awningA: '#C2410C',
          awningB: '#FFFBEB',
          mascotPose: 'stock_chef',
        };
      case 'market_dawn':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
        };
      default:
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          hillBack: '#FDE68A',
          hillFront: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
        };
    }
  };

  const theme = getScenePalette();

  return (
    <View style={styles.wrapper}>
      {/* LAPISAN ILUSTRASI PEMANDANGAN SOLID & TAJAM (TANPA EFEK PUDAR) */}
      <View style={styles.svgBackdrop}>
        <Svg width="100%" height="100%" viewBox="0 0 400 185" preserveAspectRatio="xMidYMid slice">
          <Defs>
            <LinearGradient id={`sky_${scene}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.skyTop} />
              <Stop offset="100%" stopColor={theme.skyBottom} />
            </LinearGradient>
          </Defs>

          {/* Langit Krem Hangat */}
          <Rect x="0" y="0" width="400" height="185" fill={`url(#sky_${scene})`} />

          {/* Kanopi Toko Roti / Kantin Solid di Puncak */}
          <G>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Path
                key={i}
                d={`M${i * 40} 0 H${i * 40 + 20} V10 Q${i * 40 + 10} 17 ${i * 40} 10 Z`}
                fill={i % 2 === 0 ? theme.awningA : theme.awningB}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Path
                key={`b_${i}`}
                d={`M${i * 40 + 20} 0 H${i * 40 + 40} V10 Q${i * 40 + 30} 17 ${i * 40 + 20} 10 Z`}
                fill={theme.awningB}
              />
            ))}
          </G>

          {/* Matahari Pagi Cerah di Sudut Kanan Atas Belakang Maskot */}
          <Circle cx="348" cy="54" r="28" fill="#FDE047" />
          <Circle cx="348" cy="54" r="19" fill="#FACC15" />

          {/* Awan Putih Bersih */}
          <G>
            <Circle cx="48" cy="36" r="11" fill="#FFFFFF" />
            <Circle cx="62" cy="33" r="14" fill="#FFFFFF" />
            <Circle cx="76" cy="37" r="10" fill="#FFFFFF" />
            <Rect x="46" y="36" width="32" height="11" rx="5.5" fill="#FFFFFF" />
          </G>

          {/* Gelombang Bukit Krem Emas di Dasar Header */}
          <Path
            d="M0 148 Q110 128 230 146 T400 136 L400 185 L0 185 Z"
            fill={theme.hillBack}
          />
          <Path
            d="M0 162 Q140 146 270 162 T400 154 L400 185 L0 185 Z"
            fill={theme.hillFront}
          />
        </Svg>
      </View>

      {/* KONTEN UTAMA HEADER */}
      <View style={styles.contentWrap}>
        {/* Baris Navigasi Atas (Hanya Muncul Jika Ada Tombol Back atau Aksi Kanan) */}
        {(onBackPress || actionLabel || rightAvatarOnPress) && (
          <View style={styles.topNavRow}>
            <View style={styles.leftRow}>
              {onBackPress ? (
                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.75}
                  onPress={onBackPress}
                >
                  <Svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#431407"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <Line x1="19" y1="12" x2="5" y2="12" />
                    <Path d="M12 19L5 12L12 5" />
                  </Svg>
                </TouchableOpacity>
              ) : (
                <View style={styles.warmTagPill}>
                  <Text style={styles.warmTagText}>Dapur & Konsinyasi Kantin</Text>
                </View>
              )}
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
                <Text style={styles.profilePillText}>Profil Toko ›</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {/* Baris Hero Judul + Maskot Chef Bitey (Bebas Tabrakan Teks) */}
        <View style={styles.heroRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.heroTitle}>{title}</Text>
            {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
          </View>

          <View style={styles.mascotBox}>
            <Mascot size={84} pose={theme.mascotPose} animated />
          </View>
        </View>

        {/* Slot Tambahan (Search Bar / Switcher Sesi) */}
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
    borderBottomWidth: 2,
    borderBottomColor: '#FDBA74',
  },
  svgBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrap: {
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderBottomWidth: 3,
    borderBottomColor: '#EA580C',
  },
  warmTagPill: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  warmTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9A3412',
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
    fontWeight: '900',
  },
  profilePillBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderBottomWidth: 3,
    borderBottomColor: '#EA580C',
  },
  profilePillText: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#9A3412',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  titleColumn: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#431407',
    letterSpacing: -0.5,
    lineHeight: 27,
  },
  heroSubtitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#78350F',
    marginTop: 4,
    lineHeight: 17,
  },
  mascotBox: {
    width: 86,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotWrap: {
    marginTop: 12,
  },
});
