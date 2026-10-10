import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import AssetVisual from '../components/AssetVisual';

const { width } = Dimensions.get('window');

export const StockScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Semua (8)');

  const stockItems = [
    { id: '1', name: 'Tepung Terigu', qty: '4.5 kg', min: '2 kg', cap: 75, status: 'safe', icon: 'wheat_flour', category: 'Bahan Kering' },
    { id: '2', name: 'Telur Ayam', qty: '38 Butir', min: '15 butir', cap: 65, status: 'safe', icon: 'egg_raw', category: 'Bahan Basah' },
    { id: '3', name: 'Minyak Goreng', qty: '0.8 Liter', min: '2 Liter', cap: 20, status: 'critical', icon: 'oil_butter', category: 'Bahan Basah' },
    { id: '4', name: 'Gas LPG 3kg', qty: '1 Tabung', min: '2 Tabung', cap: 25, status: 'critical', icon: 'gas_cylinder', category: 'Operasional' },
    { id: '5', name: 'Gula Pasir', qty: '3.0 kg', min: '1 kg', cap: 80, status: 'safe', icon: 'sugar_cane', category: 'Bahan Kering' },
    { id: '6', name: 'Daging Ayam', qty: '2.5 kg', min: '1 kg', cap: 70, status: 'safe', icon: 'meat_chicken', category: 'Bahan Basah' },
    { id: '7', name: 'Wortel & Sayur', qty: '1.8 kg', min: '1 kg', cap: 60, status: 'safe', icon: 'carrot_veg', category: 'Bahan Basah' },
    { id: '8', name: 'Mika Plastik', qty: '80 Pcs', min: '30 pcs', cap: 85, status: 'safe', icon: 'package_box', category: 'Operasional' },
  ];

  const filteredItems = activeFilter === 'Semua (8)' 
    ? stockItems 
    : activeFilter === 'Kritis (2)' 
      ? stockItems.filter(i => i.status === 'critical')
      : stockItems.filter(i => i.category === activeFilter);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. TOP HEADER SUB-LAYAR (DENGAN TOMBOL BACK) */}
      <View style={styles.subpageHeader}>
        <View style={styles.backBtnRow}>
          <TouchableOpacity 
            style={styles.backBtn} 
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Line x1="19" y1="12" x2="5" y2="12" />
              <Path d="M12 19L5 12L12 5" />
            </Svg>
          </TouchableOpacity>

          <View style={styles.headerTextCol}>
            <Text style={styles.pageTitle}>Gudang Bahan Baku</Text>
            <Text style={styles.pageSub}>Inventaris Dapur • 8 Komoditas</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addStockBtn} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MarketShopping')}
        >
          <Text style={styles.addStockBtnText}>+ Beli Bahan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* 2. KARTU NOTIFIKASI RESTOK HANGAT & MENARIK (KOTAK RAMPING ELEGAN) */}
        <View style={styles.toastRestockCard}>
          <View style={styles.toastLeft}>
            <View style={styles.toastIconWrap}>
              <AssetVisual name="market_cart" size={22} />
            </View>
            <View style={styles.toastTextCol}>
              <Text style={styles.toastHeadline}>2 Bahan Mendekati Batas Min</Text>
              <Text style={styles.toastDesc}>Minyak & Gas LPG butuh restok subuh.</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.toastCtaBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MarketShopping')}
          >
            <Text style={styles.toastCtaBtnText}>Belanja Subuh</Text>
          </TouchableOpacity>
        </View>

        {/* 3. SEGMENTED CONTROL TABS (1 BARIS RINGKAS DENGAN TEKS NOWRAP) */}
        <View style={styles.filterSegmentBar}>
          {['Semua (8)', 'Kritis (2)', 'Bahan Kering', 'Bahan Basah'].map((cat) => {
            const isAct = activeFilter === cat;
            const isCrit = cat === 'Kritis (2)';
            return (
              <TouchableOpacity 
                key={cat}
                style={[styles.filterSegmentItem, isAct && styles.filterSegmentItemActive]}
                onPress={() => setActiveFilter(cat)}
                activeOpacity={0.8}
              >
                <Text 
                  style={[
                    styles.filterSegmentText, 
                    isAct && styles.filterSegmentTextActive,
                    isCrit && !isAct && styles.criticalText
                  ]}
                  numberOfLines={1}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. STOCK GRID (ASET BAHAN BAKU ASLI + STATUS TEKS BERSIH) */}
        <Text style={styles.sectionLbl}>DAFTAR BAHAN BAKU DAPUR</Text>

        <View style={styles.stockGrid}>
          {filteredItems.map((item) => {
            const isCrit = item.status === 'critical';

            return (
              <View key={item.id} style={[styles.stockCard, isCrit && styles.stockCardCritical]}>
                <View style={styles.stockCardTop}>
                  <Text style={styles.stockUnitType}>{item.category}</Text>
                  
                  {isCrit ? (
                    <View style={styles.statusTextCritical}>
                      <View style={styles.dotCritical} />
                      <Text style={styles.statusTextCriticalVal}>Kritis</Text>
                    </View>
                  ) : (
                    <View style={styles.statusTextSafe}>
                      <View style={styles.dotSafe} />
                      <Text style={styles.statusTextSafeVal}>Aman</Text>
                    </View>
                  )}
                </View>

                <View style={styles.stockThumbWrap}>
                  <AssetVisual name={item.icon} size={44} />
                </View>

                <Text style={styles.stockItemName} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.stockItemQty, isCrit && styles.stockItemQtyCrit]}>{item.qty}</Text>

                {/* PROGRESS BAR KAPASITAS SISA */}
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, isCrit ? styles.progressFillCrit : { width: `${item.cap}%` }]} />
                </View>

                <View style={styles.stockFooterMeta}>
                  <Text style={styles.metaMinText}>Min: {item.min}</Text>
                  <Text style={[styles.metaCapText, isCrit && styles.metaCapTextCrit]}>
                    {item.cap}% {isCrit ? 'Sisa' : 'Aman'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subpageHeader: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  backBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    gap: 1,
  },
  pageSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  addStockBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    elevation: 2,
  },
  addStockBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 40,
  },
  toastRestockCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterSegmentBar: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  filterSegmentItem: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSegmentItemActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  filterSegmentText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  filterSegmentTextActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  criticalText: {
    color: '#DC2626',
  },
  sectionLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  stockCard: {
    width: (width - 36 - 12) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  stockCardCritical: {
    borderColor: '#FECACA',
    backgroundColor: '#FFFDFD',
  },
  stockCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockUnitType: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  statusTextSafe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dotSafe: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  statusTextSafeVal: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
  },
  statusTextCritical: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dotCritical: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  statusTextCriticalVal: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  stockThumbWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 2,
  },
  stockItemName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  stockItemQty: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  stockItemQtyCrit: {
    color: '#DC2626',
  },
  progressBg: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  progressFillCrit: {
    width: '20%',
    backgroundColor: '#EF4444',
  },
  stockFooterMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaMinText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  metaCapText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  metaCapTextCrit: {
    color: '#DC2626',
  },
});
