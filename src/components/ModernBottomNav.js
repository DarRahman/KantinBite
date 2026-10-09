import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export const ModernBottomNav = ({ activeTab = 'Home', navigation }) => {
  return (
    <View style={styles.navContainer}>
      
      {/* 1. HOME / BERANDA */}
      <TouchableOpacity 
        style={styles.tabBtn} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'Home' ? '#EA580C' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabLabelActive]}>Beranda</Text>
      </TouchableOpacity>

      {/* 2. ACTIVITY / AKTIVITAS KONSINYASI (ETALASE GERAI KANTIN) */}
      <TouchableOpacity 
        style={styles.tabBtn} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Consignment')}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'Activity' ? '#EA580C' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l2-5h14l2 5" />
          <Path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
          <Path d="M9 22V12h6v10" />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'Activity' && styles.tabLabelActive]}>Titip Kantin</Text>
      </TouchableOpacity>

      {/* 3. CENTER ELEVATED ACTION BUTTON (PAY / KASIR SCAN) */}
      <View style={styles.centerFabAnchor}>
        <TouchableOpacity 
          style={[
            styles.centerFabBtn,
            activeTab === 'Kasir' && styles.centerFabBtnActive
          ]} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Pos')}
        >
          {/* ICON MESIN KASIR / STRUK TRANSAKSI */}
          <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="7" width="20" height="14" rx="2" />
            <Path d="M6 3h12v4H6z" />
            <Path d="M6 12h4" />
            <Path d="M14 12h4" />
            <Path d="M6 16h4" />
            <Path d="M14 16h4" />
          </Svg>
          <Text style={styles.fabLabel}>KASIR</Text>
        </TouchableOpacity>
      </View>

      {/* 4. WALLET / HPP & KEUANGAN */}
      <TouchableOpacity 
        style={styles.tabBtn} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Hpp')}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'Wallet' ? '#EA580C' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <Path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
          <Circle cx="16" cy="14" r="1.5" />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'Wallet' && styles.tabLabelActive]}>Katalog</Text>
      </TouchableOpacity>

      {/* 5. ME / AKUN & PROFIL */}
      <TouchableOpacity 
        style={styles.tabBtn} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Settings')}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'Me' ? '#EA580C' : '#64748B'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'Me' && styles.tabLabelActive]}>Saya</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#F1EFEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  tabLabelActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  centerFabAnchor: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  centerFabBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  centerFabBtnActive: {
    borderWidth: 4,
    borderColor: '#FED7AA',
    elevation: 8,
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
  fabLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginTop: 1,
  },
});
