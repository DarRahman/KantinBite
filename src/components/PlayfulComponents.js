import React, { useRef, useEffect } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';

/**
 * AnimatedPressable — Pembungkus Sentuhan Membal (Spring Scale Micro-interaction)
 * Membuat setiap kartu, tombol, dan ikon squircle terasa responsif seperti aplikasi mobile native.
 */
export function AnimatedPressable({
  children,
  onPress,
  style,
  scaleTo = 0.96,
  disabled = false,
  accessibilityLabel,
  accessibilityRole = 'button',
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 28,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

/**
 * AnimatedProgressBar — Bar Kapasitas & Target Beranimasi Halus
 */
export function AnimatedProgressBar({
  percent = 50,
  color = '#10B981',
  trackColor = '#F1F5F9',
  height = 8,
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
    Animated.timing(widthAnim, {
      toValue: clamped,
      duration: 550,
      useNativeDriver: false,
    }).start();
  }, [percent, widthAnim]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.progressTrack, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
      <Animated.View
        style={{
          width: widthInterpolated,
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

export function TactileButton({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  disabled = false,
  icon,
}) {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: '#EA580C', border: '#C2410C', text: '#FFFFFF', shadow: '#9A3412' };
      case 'secondary':
        return { bg: '#FFFFFF', border: '#E2E8F0', text: '#1E293B', shadow: '#CBD5E1' };
      case 'accent':
        return { bg: '#FEF3C7', border: '#FDE68A', text: '#B45309', shadow: '#F59E0B' };
      case 'success':
        return { bg: '#10B981', border: '#059669', text: '#FFFFFF', shadow: '#047857' };
      case 'danger':
        return { bg: '#FEF2F2', border: '#FECACA', text: '#DC2626', shadow: '#FCA5A5' };
      default:
        return { bg: '#EA580C', border: '#C2410C', text: '#FFFFFF', shadow: '#9A3412' };
    }
  };

  const colors = getColors();

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      scaleTo={0.96}
      style={[
        styles.btn,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderBottomColor: colors.shadow,
          borderBottomWidth: 4,
          opacity: disabled ? 0.6 : 1,
        },
        size === 'lg' && styles.btnLg,
        size === 'sm' && styles.btnSm,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {icon && <View style={styles.iconBox}>{icon}</View>}
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.btnText,
              { color: colors.text },
              size === 'lg' && styles.btnTextLg,
              size === 'sm' && styles.btnTextSm,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </AnimatedPressable>
  );
}

export function BentoCard({
  children,
  style,
  bg = '#FFFFFF',
  accentBorder,
  onPress,
}) {
  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        scaleTo={0.98}
        style={[
          styles.bento,
          {
            backgroundColor: bg,
            borderColor: accentBorder || '#E2E8F0',
          },
          style,
        ]}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View
      style={[
        styles.bento,
        {
          backgroundColor: bg,
          borderColor: accentBorder || '#E2E8F0',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function TactilePill({ label, icon, active, onPress, count }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      scaleTo={0.95}
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
    >
      {icon && <View style={styles.pillIcon}>{icon}</View>}
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
      {count !== undefined && (
        <View style={[styles.pillBadge, active ? styles.pillBadgeActive : styles.pillBadgeInactive]}>
          <Text style={[styles.pillBadgeText, active && styles.pillBadgeTextActive]}>{count}</Text>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  progressTrack: {
    width: '100%',
    overflow: 'hidden',
  },
  btn: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  btnLg: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 18,
    minHeight: 54,
  },
  btnSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderBottomWidth: 3,
    minHeight: 38,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    marginRight: 8,
  },
  btnText: {
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  btnTextLg: {
    fontSize: 16,
  },
  btnTextSm: {
    fontSize: 12.5,
  },
  bento: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderBottomWidth: 3.5,
    padding: 16,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    borderWidth: 1.5,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#EA580C',
    borderColor: '#C2410C',
    borderBottomWidth: 3.5,
    borderBottomColor: '#9A3412',
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#52525B',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  pillBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pillBadgeActive: {
    backgroundColor: '#9A3412',
  },
  pillBadgeInactive: {
    backgroundColor: '#F1F5F9',
  },
  pillBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#52525B',
  },
  pillBadgeTextActive: {
    color: '#FFFFFF',
  },
});
