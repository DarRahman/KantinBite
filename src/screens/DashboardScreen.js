import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, TextInput, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { getCashflow, getProfile } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const DashboardScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({ businessName: 'Dapur Berkah Bunda', ownerName: 'Bunda Sumiati' });
  const [hideBalance, setHideBalance] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Gorengan', 'Kue Basah', 'Titip Kantin', 'Bahan Dapur'];

  useEffect(() => {
    const load = async () => {
      const p = await getProfile();
      if (p) setProfile(p);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* 1. TOP HEADER: GREETING & PROFILE AVATAR (CLEAN ANTI-SLOP, ZERO EMOJI, ZERO DEV JARGON) */}
      <View style={styles.topHeader}>
        <View style={styles.greetingWrap}>
          <Text style={styles.greetingSub}>Selamat Pagi, Bunda</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.5}>
              <Circle cx="12" cy="12" r="10" />
              <Path d="M12 6v6l4 2" />
            </Svg>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748B' }}>Sesi Pagi: Drop Kantin & Lapak</Text>
          </View>
        </View>

        <View style={styles.headerRightActions}>
          <View style={styles.securityBadge}>
            <Text style={styles.securityBadgeText}>Luring Aktif</Text>
          </View>

          <TouchableOpacity 
            style={styles.avatarBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#EA580C' }}>DB</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* 2. SEARCH BAR MODERN BERBENTUK KAPSUL DENGAN FILTER ICON */}
        <View style={styles.searchBarContainer}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={2}>
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </Svg>
          <TextInput 
            placeholder="Cari jajanan, resep HPP, atau mitra kantin..." 
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterIconBtn}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2}>
              <Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* 3. HERO CASH WALLET CARD MELAYANG (Pola FinTech DANA + Claymorphism) */}
        <View style={styles.heroWalletCard}>
          <View style={styles.walletHeaderRow}>
            <View style={styles.walletLabelBox}>
              <AssetVisual name="wallet_purse" size={20} />
              <Text style={styles.walletLabelText}>Uang Kas di Dompet</Text>
            </View>
            <TouchableOpacity onPress={() => setHideBalance(!hideBalance)} style={styles.eyeBtn}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#78350F" strokeWidth={2}>
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <Circle cx="12" cy="12" r="3" />
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.walletBalanceRow}>
            <Text style={styles.walletAmountText}>
              {hideBalance ? 'Rp ••••••••' : 'Rp 850.000'}
            </Text>
            <View style={styles.coinBadge}>
              <AssetVisual name="coin_gold" size={28} />
            </View>
          </View>

          {/* DUA KAPSUL ARUS KAS MASUK & KELUAR */}
          <View style={styles.cashflowPillsRow}>
            <View style={styles.cashInPill}>
              <Text style={styles.cashInLabel}>Pemasukan Hari Ini</Text>
              <Text style={styles.cashInVal}>+Rp 320.000</Text>
            </View>
            <View style={styles.cashOutPill}>
              <Text style={styles.cashOutLabel}>Belanja Pasar Subuh</Text>
              <Text style={styles.cashOutVal}>-Rp 150.000</Text>
            </View>
          </View>
        </View>

        {/* 4. 4 TOMBOL AKSI CEPAT (PROPORSI IKON PENUH 60% SQUIRCLE, BERSIH) */}
        <View style={styles.quickActionGrid}>
          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Pos')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FFEDD5', borderColor: '#FED7AA' }]}>
              <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Rect x="2" y="3" width="20" height="14" rx="2" />
                <Path d="M8 21h8" />
                <Path d="M12 17v4" />
                <Path d="M7 8h10" />
              </Svg>
            </View>
            <Text style={styles.actionTileLabel}>Kasir Lapak</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Consignment')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FEF08A', borderColor: '#FDE047' }]}>
              <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <Path d="M9 22V12h6v10" />
              </Svg>
            </View>
            <Text style={styles.actionTileLabel}>Titip Kantin</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Stock')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#E0E7FF', borderColor: '#C7D2FE' }]}>
              <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <Path d="m3.3 7 8.7 5 8.7-5" />
                <Path d="M12 22V12" />
              </Svg>
            </View>
            <Text style={styles.actionTileLabel}>Gudang Stok</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MarketShopping')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' }]}>
              <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="9" cy="21" r="1" />
                <Circle cx="20" cy="21" r="1" />
                <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </Svg>
            </View>
            <Text style={styles.actionTileLabel}>Belanja Pasar</Text>
          </TouchableOpacity>
        </View>

        {/* 5. HORIZONTAL CATEGORY CHIPS */}
        <View style={styles.categoryChipsWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((cat, idx) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity 
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                >
                  <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 6. POPULAR / FAVORITE FOOD CAROUSEL BERNAFAS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Katalog Jajanan Unggulan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Hpp')}>
            <Text style={styles.sectionSeeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.foodCarouselScroll}>
          {[
            { id: '1', name: 'Risoles Rogout', price: 1200, profit: 500, sold: '25 laku', icon: 'risoles_rogout', bg: '#FFFBEB' },
            { id: '2', name: 'Pastel Telur Sayur', price: 1500, profit: 600, sold: '18 laku', icon: 'pastel_telur', bg: '#FEF3C7' },
            { id: '3', name: 'Dadar Gulung Unti', price: 1000, profit: 450, sold: '30 laku', icon: 'dadar_gulung', bg: '#DCFCE7' },
            { id: '4', name: 'Lemper Ayam Harum', price: 1500, profit: 550, sold: '20 laku', icon: 'lemper_ayam', bg: '#F1F5F9' },
          ].map((item) => (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Hpp')}
              style={[styles.foodCard, { backgroundColor: item.bg }]}
            >
              <View style={styles.foodCardBadge}>
                <Text style={styles.foodCardBadgeText}>+Untung {formatRupiah(item.profit)}</Text>
              </View>

              <View style={styles.foodImageCenter}>
                <AssetVisual name={item.icon} size={64} />
              </View>

              <Text style={styles.foodCardName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.foodPriceRow}>
                <Text style={styles.foodPriceText}>{formatRupiah(item.price)}</Text>
                <Text style={styles.foodSoldText}>{item.sold}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 7. TARGET OPERASIONAL & METRIK HARIAN */}
        <View style={styles.targetBanner}>
          <View style={styles.targetBannerTop}>
            <View>
              <Text style={styles.targetSubLabel}>TARGET OPERASIONAL HARIAN</Text>
              <Text style={styles.targetTitle}>Produksi & Serapan Lapak</Text>
            </View>
          </View>

          <View style={styles.targetMetricsGrid}>
            <View style={styles.targetMetricItem}>
              <Text style={styles.metricItemLabel}>Kue Terjual</Text>
              <Text style={styles.metricItemVal}>93 / 110</Text>
              <Text style={styles.metricItemSub}>84.5% Sukses</Text>
            </View>

            <View style={styles.targetMetricItem}>
              <Text style={styles.metricItemLabel}>Sisa Retur</Text>
              <Text style={[styles.metricItemVal, { color: '#DC2626' }]}>5 Pcs</Text>
              <Text style={styles.metricItemSub}>Terkendali</Text>
            </View>

            <View style={styles.targetMetricItem}>
              <Text style={styles.metricItemLabel}>Setoran Bersih</Text>
              <Text style={[styles.metricItemVal, { color: '#15803D' }]}>Rp 175k</Text>
              <Text style={styles.metricItemSub}>Lunas Sore</Text>
            </View>
          </View>
        </View>

        {/* 8. LOG TRANSAKSI & AKTIVITAS DAPUR */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Aktivitas & Riwayat Transaksi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Consignment')}>
            <Text style={styles.sectionSeeAll}>Riwayat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityListWrap}>
          {[
            { id: 'a1', title: 'Setoran Kantin Fak. Teknik', time: '15:20 WIB', amount: 50000, isIncome: true, icon: 'canteen_shop' },
            { id: 'a2', title: 'Belanja Pasar Subuh Kanoman', time: '04:45 Subuh', amount: 150000, isIncome: false, icon: 'market_cart' },
            { id: 'a3', title: 'Kasir Langsung Pelanggan Lapak', time: '07:15 Pagi', amount: 24000, isIncome: true, icon: 'receipt_bill' },
          ].map((act) => (
            <View key={act.id} style={styles.activityRow}>
              <View style={[styles.actIconWrap, { backgroundColor: act.isIncome ? '#DCFCE7' : '#FEE2E2' }]}>
                <AssetVisual name={act.icon} size={22} />
              </View>
              
              <View style={styles.actInfoCol}>
                <Text style={styles.actTitleText}>{act.title}</Text>
                <Text style={styles.actTimeText}>{act.time}</Text>
              </View>

              <View style={styles.actAmountCol}>
                <Text style={[styles.actAmountText, { color: act.isIncome ? '#15803D' : '#DC2626' }]}>
                  {act.isIncome ? '+' : '-'}{formatRupiah(act.amount)}
                </Text>
                {act.isIncome && (
                  <View style={styles.lunasStamp}>
                    <Text style={styles.lunasStampText}>LUNAS</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 9. BOTTOM NAVIGATION MODERN ELEVATED FAB (ICON-ONLY STANDARD) */}
      <ModernBottomNav activeTab="Home" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingWrap: {
    flex: 1,
  },
  greetingSub: {
    fontSize: 20,
    color: '#0F172A',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EA580C',
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
  },
  filterIconBtn: {
    padding: 4,
  },
  heroWalletCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
    marginBottom: 18,
  },
  walletHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walletLabelText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  eyeBtn: {
    padding: 4,
  },
  walletBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  walletAmountText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: -0.8,
  },
  coinBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  cashflowPillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cashInPill: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
  },
  cashInLabel: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '700',
  },
  cashInVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#166534',
    marginTop: 2,
  },
  cashOutPill: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#FECACA',
  },
  cashOutLabel: {
    fontSize: 10,
    color: '#B91C1C',
    fontWeight: '700',
  },
  cashOutVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#991B1B',
    marginTop: 2,
  },
  quickActionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionTile: {
    alignItems: 'center',
    gap: 6,
    width: (width - 44 - 36) / 4,
  },
  actionIconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionTileLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  categoryChipsWrap: {
    marginBottom: 16,
    marginHorizontal: -22,
  },
  categoryScroll: {
    paddingHorizontal: 22,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1E293B',
  },
  sectionSeeAll: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EA580C',
  },
  foodCarouselScroll: {
    gap: 14,
    paddingRight: 22,
    marginBottom: 22,
  },
  foodCard: {
    width: 145,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  foodCardBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    zIndex: 10,
    marginBottom: 4,
  },
  foodCardBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  foodImageCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  foodCardName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
  },
  foodPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 4,
  },
  foodPriceText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#EA580C',
  },
  foodSoldText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  targetBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    marginBottom: 22,
  },
  targetBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EA580C',
    letterSpacing: 0.5,
  },
  targetTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 2,
  },
  fireIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetMetricsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  targetMetricItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricItemLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  metricItemVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E293B',
    marginVertical: 2,
  },
  metricItemSub: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
  },
  activityListWrap: {
    gap: 10,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  actIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  actInfoCol: {
    flex: 1,
  },
  actTitleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  actTimeText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  actAmountCol: {
    alignItems: 'flex-end',
  },
  actAmountText: {
    fontSize: 13,
    fontWeight: '900',
  },
  lunasStamp: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  lunasStampText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#15803D',
  },
});

