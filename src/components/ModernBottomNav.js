import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from './PlayfulComponents';

const NavSvgIcon = ({ name, active }) => {
  const color = active ? '#EA580C' : '#9A3412';
  const fillTint = active ? '#FFEDD5' : 'none';

  switch (name) {
    case 'Home':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill={fillTint} stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
          <Path d="M9 21V13h6v8" />
        </Svg>
      );
    case 'Consignment':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill={fillTint} stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l1.8-5h14.4L21 9" />
          <Path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" />
          <Path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
        </Svg>
      );
    case 'Pos':
      return (
        <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <Rect x="3" y="6" width="18" height="14" rx="3" fill="#EA580C" stroke="#FFFFFF" />
          <Path d="M7 10h10M7 14h4M15 14h2" stroke="#FFFFFF" />
          <Path d="M8 3h8v3H8z" />
        </Svg>
      );
    case 'Hpp':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill={fillTint} stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
          <Rect x="4" y="4" width="16" height="17" rx="3" />
          <Path d="M8 9h8M8 13h5M8 17h3" />
          <Circle cx="15.5" cy="16.5" r="1.5" fill={color} />
        </Svg>
      );
    case 'Settings':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill={fillTint} stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="8" r="4" />
          <Path d="M5 20c1.5-3.8 4.2-6 7-6s5.5 2.2 7 6" />
        </Svg>
      );
    default:
      return null;
  }
};

export const ModernBottomNav = ({ activeTab, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  const leftItems = [
    { key: 'Home', label: 'Beranda', route: 'Dashboard' },
    { key: 'Consignment', label: 'Titip Kantin', route: 'Consignment' },
  ];

  const rightItems = [
    { key: 'Hpp', label: 'Resep HPP', route: 'Hpp' },
    { key: 'Settings', label: 'Akun Toko', route: 'Settings' },
  ];

  return (
    <View style={[styles.outerWrap, { paddingBottom: bottomInset }]} pointerEvents="box-none">
      <View style={styles.navBar}>
        {/* 2 Tab Kiri */}
        {leftItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <AnimatedPressable
              key={item.key}
              scaleTo={0.9}
              onPress={() => navigation.navigate(item.route)}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <NavSvgIcon name={item.key} active={isActive} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
                {item.label}
              </Text>
            </AnimatedPressable>
          );
        })}

        {/* TOMBOL TENGAH KASIR POS MENONJOL */}
        <View style={styles.centerCashierWrap}>
          <AnimatedPressable
            scaleTo={0.92}
            onPress={() => navigation.navigate('Pos')}
            style={[
              styles.centerCashierBtn,
              activeTab === 'Pos' && styles.centerCashierBtnActive,
            ]}
          >
            <NavSvgIcon name="Pos" active />
            <Text style={styles.centerCashierLabel}>KASIR</Text>
          </AnimatedPressable>
        </View>

        {/* 2 Tab Kanan */}
        {rightItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <AnimatedPressable
              key={item.key}
              scaleTo={0.9}
              onPress={() => navigation.navigate(item.route)}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <NavSvgIcon name={item.key} active={isActive} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
                {item.label}
              </Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 7,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 15,
  },
  tabButtonActive: {
    backgroundColor: '#FFF7ED',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350F',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  centerCashierWrap: {
    marginTop: -22,
    paddingHorizontal: 4,
  },
  centerCashierBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFBEB',
    borderBottomWidth: 5,
    borderBottomColor: '#9A3412',
    elevation: 8,
  },
  centerCashierBtnActive: {
    backgroundColor: '#C2410C',
  },
  centerCashierLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 1,
    letterSpacing: 0.4,
  },
});
