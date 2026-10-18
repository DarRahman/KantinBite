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
  Ellipse,
} from 'react-native-svg';
import { Mascot } from './Mascot';

/**
 * ScenicBanner — Header Pemandangan Dapur & Kantin Hangat (100% Kompatibel Android SVG)
 * - Menghapus kapsul teks "Dapur & Konsinyasi Kantin" di sudut kiri atas
 * - Menggunakan viewBox="0 0 400 220" dengan preserveAspectRatio="none" untuk latar & kanopi
 *   sehingga kanopi bergelombang (scalloped awning) di puncak TIDAK PERNAH terpotong di HP Android
 * - Menampilkan suasana Dapur & Kantin Hangat: jendela dapur bercahaya, siluet stoples/etalase kue,
 *   meja saji hangat, dan kepulan uap kue di sekitar Chef Bitey.
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
          wallShade: '#FDE68A',
          counterTop: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFBEB',
          mascotPose: scene === 'canteen_morning' ? 'canteen_drop' : 'celebrate',
        };
      case 'pos_bakery':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FFEDD5',
          wallShade: '#FDE68A',
          counterTop: '#FDBA74',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'cashier',
        };
      case 'hpp_kitchen':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FEF3C7',
          wallShade: '#FDE68A',
          counterTop: '#FCD34D',
          awningA: '#D97706',
          awningB: '#FFF7ED',
          mascotPose: 'notebook',
        };
      case 'stock_pantry':
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          wallShade: '#FED7AA',
          counterTop: '#FDBA74',
          awningA: '#C2410C',
          awningB: '#FFFBEB',
          mascotPose: 'stock_chef',
        };
      case 'market_dawn':
        return {
          skyTop: '#FFFBEB',
          skyBottom: '#FEF3C7',
          wallShade: '#FDE68A',
          counterTop: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
        };
      default:
        return {
          skyTop: '#FFF7ED',
          skyBottom: '#FEF3C7',
          wallShade: '#FDE68A',
          counterTop: '#FCD34D',
          awningA: '#EA580C',
          awningB: '#FFFFFF',
          mascotPose: 'baker_box',
        };
    }
  };

  const theme = getScenePalette();
  const hasTopNav = Boolean(onBackPress || actionLabel || rightAvatarOnPress);

  return (
    <View style={styles.wrapper}>
      {/* LAPISAN 1: LATAR DINDING DAPUR & MEJA KANTIN HANGAT (ANDROID-SAFE SVG) */}
      <View style={styles.svgBackdrop}>
        <Svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="bgWallGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.skyTop} />
              <Stop offset="100%" stopColor={theme.skyBottom} />
            </LinearGradient>
          </Defs>

          {/* Dinding Krem Dapur Hangat */}
          <Rect x="0" y="0" width="400" height="220" fill="url(#bgWallGrad)" />

          {/* Gelombang Meja & Lantai Dapur Hangat di Dasar (Menggunakan Kurva Bezier C Eksplisit untuk Android) */}
          <Path
            d="M0 168 C110 148, 260 182, 400 156 L400 220 L0 220 Z"
            fill={theme.wallShade}
          />
          <Path
            d="M0 184 C140 168, 270 196, 400 174 L400 220 L0 220 Z"
            fill={theme.counterTop}
          />
        </Svg>
      </View>

      {/* LAPISAN 2: ILUSTRASI JENDELA DAPUR, RAK STOPLES & UAP KUE (PROPORSIONAL TANPA DISTORSI) */}
      <View style={styles.scenicDecorLayer} pointerEvents="none">
        <Svg width={220} height={150} viewBox="0 0 220 150">
          {/* Jendela Dapur Bercahaya Hangat di Sisi Kanan */}
          <Rect
            x="92"
            y="18"
            width="64"
            height="58"
            rx="10"
            fill="#FFFBEB"
            stroke="#F59E0B"
            strokeWidth="2.5"
          />
          {/* Kisi Jendela Dapur */}
          <Line x1="124" y1="18" x2="124" y2="76" stroke="#F59E0B" strokeWidth="2" />
          <Line x1="92" y1="47" x2="156" y2="47" stroke="#F59E0B" strokeWidth="2" />
          {/* Kusen Bawah Jendela */}
          <Rect x="87" y="74" width="74" height="6" rx="3" fill="#D97706" />

          {/* Cahaya Pagi Hangat di Sudut Kanan Atas */}
          <Circle cx="188" cy="40" r="26" fill="#FDE047" />
          <Circle cx="188" cy="40" r="17" fill="#FACC15" />

          {/* Rak Dapur & Stoples Kue di Kiri Jendela */}
          <Rect x="20" y="54" width="56" height="5" rx="2.5" fill="#D97706" />
          {/* Stoples Tepung & Toples Kue */}
          <Rect x="26" y="34" width="16" height="20" rx="4" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
          <Rect x="28" y="30" width="12" height="4" rx="2" fill="#EA580C" />
          <Rect x="48" y="38" width="18" height="16" rx="5" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.8" />
          <Rect x="50" y="34" width="14" height="4" rx="2" fill="#9A3412" />

          {/* Kepulan Uap Kue Hangat (Steam Swirls) */}
          <Path
            d="M150 112 C146 102, 156 96, 151 86"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M164 118 C160 108, 170 102, 165 92"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <Ellipse cx="64" cy="96" rx="18" ry="6" fill="#FDE68A" />
        </Svg>
      </View>

      {/* LAPISAN 3: KANOPI TOKO KUE / KANTIN DI PUNCAK ATAS (100% UTUH DARI KIRI KE KANAN DI ANDROID) */}
      <View style={styles.awningTopBar} pointerEvents="none">
        <Svg width="100%" height={18} viewBox="0 0 400 18" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const x1 = i * 40;
            const x2 = x1 + 20;
            const x3 = x1 + 40;
            return (
              <G key={i}>
                <Path
                  d={`M${x1} 0 L${x2} 0 L${x2} 10 C${x2} 16, ${x1} 16, ${x1} 10 Z`}
                  fill={theme.awningA}
                />
                <Path
                  d={`M${x2} 0 L${x3} 0 L${x3} 10 C${x3} 16, ${x2} 16, ${x2} 10 Z`}
                  fill={theme.awningB}
                />
              </G>
            );
          })}
        </Svg>
      </View>

      {/* LAPISAN 4: KONTEN UTAMA HEADER */}
      <View style={styles.contentWrap}>
        {/* Baris Navigasi Atas: HANYA tombol Back (jika sub-screen) dan tombol Aksi/Profil di kanan */}
        {hasTopNav && (
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
                <Text style={styles.profilePillText}>Profil Toko ›</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {/* Baris Hero Judul + Maskot Chef Bitey */}
        <View style={[styles.heroRow, !onBackPress && styles.heroRowHome]}>
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
    borderBottomWidth: 2.5,
    borderBottomColor: '#FDBA74',
  },
  svgBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  scenicDecorLayer: {
    position: 'absolute',
    top: 10,
    right: 6,
    width: 220,
    height: 150,
  },
  awningTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 18,
  },
  contentWrap: {
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 34,
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
    paddingHorizontal: 13,
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
  heroRowHome: {
    marginTop: -4,
  },
  titleColumn: {
    flex: 1,
    paddingRight: 10,
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
