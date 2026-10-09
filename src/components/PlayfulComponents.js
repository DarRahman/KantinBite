import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export function TactileButton({
  children,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'danger'
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
        return { bg: '#DCFCE7', border: '#BBF7D0', text: '#15803D', shadow: '#86EFAC' };
      default:
        return { bg: '#EA580C', border: '#C2410C', text: '#FFFFFF', shadow: '#9A3412' };
    }
  };

  const colors = getColors();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
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
    </TouchableOpacity>
  );
}

export function BentoCard({
  children,
  style,
  bg = '#FFFFFF',
  accentBorder,
  onPress,
}) {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.bento,
        {
          backgroundColor: bg,
          borderColor: accentBorder || '#F1F5F9',
        },
        style,
      ]}
    >
      {children}
    </CardContainer>
  );
}

export function TactilePill({ label, icon, active, onPress, count }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        active ? styles.pillActive : styles.pillInactive,
      ]}
    >
      {icon && <View style={styles.pillIcon}>{icon}</View>}
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {label}
      </Text>
      {count !== undefined && (
        <View style={[styles.pillBadge, active ? styles.pillBadgeActive : styles.pillBadgeInactive]}>
          <Text style={[styles.pillBadgeText, active && styles.pillBadgeTextActive]}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 18,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLg: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 22,
    minHeight: 56,
  },
  btnSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderBottomWidth: 3,
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
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  btnTextLg: {
    fontSize: 17,
  },
  btnTextSm: {
    fontSize: 13,
  },
  bento: {
    borderRadius: 22,
    borderWidth: 1.5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#EA580C',
    borderColor: '#C2410C',
    borderBottomWidth: 3,
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderBottomWidth: 2,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pillBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  pillBadgeActive: {
    backgroundColor: '#C2410C',
  },
  pillBadgeInactive: {
    backgroundColor: '#F1F5F9',
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  pillBadgeTextActive: {
    color: '#FFFFFF',
  },
});
