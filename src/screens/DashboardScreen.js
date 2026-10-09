import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, TextInput, Dimensions } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { PastelReferenceIcon } from '../components/PastelReferenceIcon';
import { WeeklyBarChart } from '../components/WeeklyBarChart';
import { DonutIncomeRatio } from '../components/DonutIncomeRatio';
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
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />

      {/* 1. TOP HEADER: BERSIH & BERNAFAS (ZERO PARASITE BADGES, ZERO DEV JARGON) */}
      <View style={styles.topHeader}>
        <View style={styles.greetingWrap}>
          <Text style={styles.businessTitle}>{profile.businessName || 'Dapur Berkah Bunda'}</Text>
          <Text style={styles.greetingSub}>{profile.ownerName || 'Bunda Sumiati'} • Sesi Pagi</Text>
        </View>

        <TouchableOpacity 
          style={styles.avatarBtn} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
        >
          <AssetVisual name="chef_mascot" size={38} />
        </TouchableOpacity>
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

        {/* 3. HERO CASH WALLET CARD BERBOBOT NYATA (CATATAN KAS BERSATU, ZERO AI-SLOP PILLS) */}
        <View style={styles.heroWalletCard}>
          <View style={styles.walletHeaderRow}>
            <View style={styles.walletLabelBox}>
              <AssetVisual name="wallet_purse" size={26} />
              <Text style={styles.walletLabelText}>Uang Kas di Dompet</Text>
            </View>
            <TouchableOpacity onPress={() => setHideBalance(!hideBalance)} style={styles.eyeBtn}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#78350F" strokeWidth={2}>
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
              <AssetVisual name="coin_gold" size={32} />
            </View>
          </View>

          {/* ARUS KAS MENYATU BERSIH (CATATAN KAS LAPANGAN, BUKAN PILLS AI SLOP) */}
          <View style={styles.cashFlowLedgerWrap}>
            <View style={styles.ledgerRow}>
              <View style={styles.ledgerDotGreen} />
              <Text style={styles.ledgerLabel}>Kas Masuk Hari Ini:</Text>
              <Text style={styles.ledgerValGreen}>+Rp 320.000</Text>
            </View>
            <View style={styles.ledgerRow}>
              <View style={styles.ledgerDotRed} />
              <Text style={styles.ledgerLabel}>Belanja Pasar Subuh:</Text>
              <Text style={styles.ledgerValRed}>-Rp 150.000</Text>
            </View>
          </View>
        </View>

        {/* 4. 4 TOMBOL AKSI OPERASIONAL 1:1 GAYA REFERENSI PASTEL 8-ICON (IKON BESAR 75%) */}
        <View style={styles.quickActionGrid}>
          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Pos')}
          >
            <PastelReferenceIcon type="pos" size={68} />
            <Text style={styles.actionTileLabel}>Kasir Lapak</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Consignment')}
          >
            <PastelReferenceIcon type="canteen" size={68} />
            <Text style={styles.actionTileLabel}>Titip Kantin</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Stock')}
          >
            <PastelReferenceIcon type="stock" size={68} />
            <Text style={styles.actionTileLabel}>Gudang Stok</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionTile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MarketShopping')}
          >
            <PastelReferenceIcon type="market" size={68} />
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

        {/* 6. POPULAR / FAVORITE FOOD CAROUSEL ASLI (GAYA KARTU KREM MENTEGA #FFF9D6 + '25 LAKU') */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Katalog Jajanan Unggulan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Hpp')}>
            <Text style={styles.sectionSeeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.foodCarouselScroll}>
          {[
            { id: '1', name: 'Risoles Rogout', price: 1200, laku: '25 laku', icon: 'risoles_rogout' },
            { id: '2', name: 'Pastel Sayur', price: 1500, laku: '18 laku', icon: 'pastel_telur' },
            { id: '3', name: 'Dadar Gulung', price: 1000, laku: '30 laku', icon: 'dadar_gulung' },
            { id: '4', name: 'Lemper Ayam', price: 1500, laku: '22 laku', icon: 'lemper_ayam' },
          ].map((item) => (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Hpp')}
              style={styles.foodCardButter}
            >
              {/* GAMBAR MAKANAN BERVOLUME DENGAN BAYANGAN MENGAMBANG */}
              <View style={styles.foodImageCenter}>
                <AssetVisual name={item.icon} size={64} />
              </View>

              {/* NAMA KUE TEBAL NAVY */}
              <Text style={styles.foodCardNameButter} numberOfLines={1}>{item.name}</Text>
              
              {/* BARIS HARGA ORANYE & METRIK LAKU ALAMI PEDAGANG */}
              <View style={styles.foodPriceLakuRow}>
                <Text style={styles.foodPriceTextButter}>{formatRupiah(item.price)}</Text>
                <Text style={styles.foodLakuTextButter}>{item.laku}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 7. DUA GRAFIK ANALITIK ASLI YANG DIKEMBALIKAN (TREN 7 HARI & DONUT RASIO) */}
        <View style={styles.analyticsSectionWrap}>
          <WeeklyBarChart 
            data={[
              { day: 'Sen', amount: 280000 },
              { day: 'Sel', amount: 310000 },
              { day: 'Rab', amount: 290000 },
              { day: 'Kam', amount: 350000 },
              { day: 'Jum', amount: 320000 },
              { day: 'Sab', amount: 410000 },
              { day: 'Min', amount: 330000 },
            ]}
          />
          <DonutIncomeRatio posAmount={145000} consignmentAmount={175000} />
        </View>

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
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingWrap: {
    flex: 1,
  },
  businessTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  greetingSub: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 2,
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
  // 3. HERO KARTU KAS ASLI (PUTIH SOLID BERGARIS TEGAS SEPERTI DI HP FISIK USER)
  heroWalletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    borderBottomWidth: 3.5,
    borderBottomColor: '#D4D4D8',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 16,
  },
  walletHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletLabelText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
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
    color: '#18181B',
    letterSpacing: -0.5,
  },
  coinBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // KARTU KAS CATATAN BERSATU (KONTRAS TINGGI, BUKAN PILLS AI SLOP)
  cashFlowLedgerWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 7,
    marginTop: 4,
  },
  ledgerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ledgerDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
    marginRight: 8,
  },
  ledgerDotRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 8,
  },
  ledgerLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  ledgerValGreen: {
    fontSize: 13,
    fontWeight: '900',
    color: '#059669',
  },
  ledgerValRed: {
    fontSize: 13,
    fontWeight: '900',
    color: '#DC2626',
  },

  // KARTU JAJANAN KREM MENTEGA (#FFF9D6) + 25 LAKU
  foodCardButter: {
    width: 154,
    backgroundColor: '#FFF9D6',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#FEF08A',
    borderBottomWidth: 3.5,
    borderBottomColor: '#FDE047',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    marginBottom: 6,
  },
  foodCardNameButter: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
    marginBottom: 6,
  },
  foodPriceLakuRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  foodPriceTextButter: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  foodLakuTextButter: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  foodCarouselScroll: {
    paddingRight: 22,
    paddingBottom: 8,
    gap: 12,
  },
  analyticsSectionWrap: {
    marginVertical: 10,
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
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
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
    width: 155,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  foodImageCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  foodCardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  foodPriceText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#EA580C',
    marginBottom: 6,
  },
  foodMetaBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  profitNaturalText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
  },
  titipCountText: {
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

