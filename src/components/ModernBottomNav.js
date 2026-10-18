import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { AnimatedPressable } from './PlayfulComponents';

/**
 * ModernBottomNav — Floating Pill & Tactile Bottom Navigation Dock
 * Terinspirasi dari floating navigation dock pada Referensi 2, 3, 4, dan 5
 * dengan efek tekan membal (Spring Scale) dan tombol tengah KASIR 3D.
 */
export const ModernBottomNav = ({ activeTab = 'Home', navigation }) => {
  const tabsLeft = [
    {
      key: 'Home',
      label: 'Beranda',
      route: 'Dashboard',
      renderIcon: (active) => (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill={active ? '#FED7AA' : 'none'} stroke={active ? '#EA580C' : '#64748B'} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
      ),
    },
    {
      key: 'Activity',
      label: 'Titip Kantin',
      route: 'Consignment',
      renderIcon: (active) => (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill={active ? '#FED7AA' : 'none'} stroke={active ? '#EA580C' : '#64748B'} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l2-5h14l2 5" />
          <Path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
          <Path d="M9 22V13h6v9" />
        </Svg>
      ),
    },
  ];

  const tabsRight = [
    {
      key: 'Wallet',
      label: 'Resep HPP',
      route: 'Hpp',
      renderIcon: (active) => (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill={active ? '#FED7AA' : 'none'} stroke={active ? '#EA580C' : '#64748B'} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <Rect x="3" y="6" width="18" height="14" rx="3" />
          <Path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          <Circle cx="16" cy="13" r="1.5" fill={active ? '#EA580C' : '#64748B'} />
        </Svg>
      ),
    },
    {
      key: 'Me',
      label: 'Akun Toko',
      route: 'Settings',
      renderIcon: (active) => (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill={active ? '#FED7AA' : 'none'} stroke={active ? '#EA580C' : '#64748B'} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      ),
    },
  ];

  return (
    <View style={styles.outerAnchor} pointerEvents="box-none">
      <View style={styles.navCapsule}>
        {tabsLeft.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <AnimatedPressable
              key={tab.key}
              scaleTo={0.9}
              onPress={() => navigation.navigate(tab.route)}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
            >
              {tab.renderIcon(isActive)}
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </AnimatedPressable>
          );
        })}

        {/* TOMBOL TENGAH ELEVATED KASIR 3D */}
        <View style={styles.centerFabAnchor}>
          <AnimatedPressable
            scaleTo={0.92}
            onPress={() => navigation.navigate('Pos')}
            style={[
              styles.centerFabBtn,
              activeTab === 'Kasir' && styles.centerFabBtnActive,
            ]}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
              <Rect x="2" y="7" width="20" height="14" rx="3" fill="#C2410C" />
              <Path d="M6 3h12v4H6z" fill="#FDE047" stroke="#FFFFFF" />
              <Path d="M6 12h4 M14 12h4 M6 16h4 M14 16h4" />
            </Svg>
            <Text style={styles.fabLabel}>KASIR</Text>
          </AnimatedPressable>
        </View>

        {tabsRight.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <AnimatedPressable
              key={tab.key}
              scaleTo={0.9}
              onPress={() => navigation.navigate(tab.route)}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
            >
              {tab.renderIcon(isActive)}
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerAnchor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  navCapsule: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#FDBA74',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    elevation: 10,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    marginHorizontal: 2,
    borderRadius: 16,
    minHeight: 48,
  },
  tabBtnActive: {
    backgroundColor: '#FFF7ED',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 3,
  },
  tabLabelActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  centerFabAnchor: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
  centerFabBtn: {
    width: 60,
    height: 60,
    borderRadius: 22,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderBottomWidth: 5,
    borderBottomColor: '#9A3412',
    elevation: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  centerFabBtnActive: {
    backgroundColor: '#C2410C',
    borderColor: '#FEF08A',
  },
  fabLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.6,
    marginTop: 1,
  },
});
