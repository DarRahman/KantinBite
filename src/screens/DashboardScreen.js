import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { PastelReferenceIcon } from '../components/PastelReferenceIcon';
import { WeeklyBarChart } from '../components/WeeklyBarChart';
import { DonutIncomeRatio } from '../components/DonutIncomeRatio';
import { AnimatedPressable, AnimatedProgressBar } from '../components/PlayfulComponents';
import { getCashflow, getProfile, getProducts, getDebts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const DashboardScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    businessName: 'Dapur Berkah Bunda',
    ownerName: 'Bunda Sumiati',
  });
  const [cashflow, setCashflow] = useState({
    walletBalance: 850000,
    totalIncomeToday: 320000,
    totalExpenseToday: 150000,
    weeklyTrend: [
      { day: 'Sen', amount: 280000 },
      { day: 'Sel', amount: 310000 },
      { day: 'Rab', amount: 290000 },
      { day: 'Kam', amount: 350000 },
      { day: 'Jum', amount: 320000 },
      { day: 'Sab', amount: 410000 },
      { day: 'Min', amount: 330000 },
    ],
    activities: [],
  });
  const [products, setProducts] = useState([]);
  const [totalDebt, setTotalDebt] = useState(50000);
  const [hideBalance, setHideBalance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadAll();
    const unsub = navigation.addListener('focus', loadAll);
    return unsub;
  }, [navigation]);

  const loadAll = async () => {
    const [p, c, prods, debts] = await Promise.all([
      getProfile(),
      getCashflow(),
      getProducts(),
      getDebts(),
    ]);
    if (p) setProfile(p);
    if (c) setCashflow(c);
    if (prods && prods.length > 0) setProducts(prods);
    if (debts) {
      const sumDebt = debts.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
      setTotalDebt(sumDebt);
    }
  };

  const featuredSnacks =
    products.length > 0
      ? products
      : [
          { id: 'p1', name: 'Risoles Rogout Ayam', price: 1200, stock: 50, icon: 'risoles_rogout', netProfit: 200 },
          { id: 'p2', name: 'Pastel Sayur Telur', price: 1500, stock: 35, icon: 'pastel_telur', netProfit: 250 },
          { id: 'p3', name: 'Dadar Gulung Pandan', price: 1000, stock: 40, icon: 'dadar_gulung', netProfit: 200 },
          { id: 'p4', name: 'Lemper Ayam Ketan', price: 1500, stock: 30, icon: 'lemper_ayam', netProfit: 300 },
        ];

  const filteredSnacks = featuredSnacks.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activitiesList =
    cashflow.activities && cashflow.activities.length > 0
      ? cashflow.activities
      : [
          {
            id: 'a1',
            title: 'Setoran Kantin Fak. Teknik',
            subtitle: '25 Risoles Rogout Lunas',
            time: '15:20 WIB',
            amount: 50000,
            type: 'income',
          },
          {
            id: 'a2',
            title: 'Belanja Pasar Subuh Kanoman',
            subtitle: 'Terigu, Telur & Minyak Goreng',
            time: '04:45 Subuh',
            amount: 150000,
            type: 'expense',
          },
          {
            id: 'a3',
            title: 'Penjualan Kasir Teras Pagi',
            subtitle: '20 pcs Aneka Jajanan',
            time: '07:15 Pagi',
            amount: 24000,
            type: 'income',
          },
        ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC MORNING KITCHEN BANNER (SOLID, TANPA TITIK INDIKATOR TECH) */}
        <ScenicBanner
          scene="kitchen_morning"
          title={profile.businessName || 'Dapur Berkah Bunda'}
          subtitle={`Halo ${profile.ownerName || 'Bunda Sumiati'}, adonan siap disajikan hari ini`}
          rightAvatarOnPress={() => navigation.navigate('Settings')}
        >
          <View style={styles.floatingSearchBox}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9A3412" strokeWidth={2.2}>
              <Circle cx="11" cy="11" r="8" />
              <Path d="M21 21l-4.35-4.35" />
            </Svg>
            <TextInput
              placeholder="Cari kue jajanan, resep HPP, atau kantin..."
              placeholderTextColor="#A1A1AA"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.searchShortcutBtn}
              onPress={() => navigation.navigate('Pos')}
              activeOpacity={0.8}
            >
              <Text style={styles.searchShortcutText}>Kasir</Text>
            </TouchableOpacity>
          </View>
        </ScenicBanner>

        <View style={styles.bodyPadding}>
          {/* 2. HERO DOMPET KAS HARIAN BERVOLUME DENGAN KARTU MASUK & BELANJA YANG MENYATU */}
          <View style={styles.heroWalletCard}>
            <View style={styles.walletHeaderRow}>
              <View style={styles.walletLabelBox}>
                <AssetVisual name="coin_gold" size={24} />
                <Text style={styles.walletLabelText}>Uang Kas Tunai di Laci</Text>
              </View>
              <TouchableOpacity
                onPress={() => setHideBalance(!hideBalance)}
                style={styles.eyeBtn}
                accessibilityLabel="Sembunyikan atau tampilkan saldo kas"
                accessibilityRole="button"
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#78350F" strokeWidth={2.2}>
                  <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <Circle cx="12" cy="12" r="3" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.walletBalanceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.walletAmountText}>
                  {hideBalance ? 'Rp ••••••••' : formatRupiah(cashflow.walletBalance)}
                </Text>
                <Text style={styles.walletSubHelper}>
                  Siap putar modal belanja & kembalian pelanggan
                </Text>
              </View>
              <AssetVisual name="wallet_purse" size={50} />
            </View>

            {/* DUA KARTU MINI HARMONIS (TANPA TITIK BULAT HIJAU/ORANYE, WARNA KREM-TERAKOTA MENYATU) */}
            <View style={styles.walletDualCardsRow}>
              <AnimatedPressable
                scaleTo={0.97}
                onPress={() => navigation.navigate('FinanceReport')}
                style={styles.walletSubCardWarm}
              >
                <View style={styles.walletSubIconWrap}>
                  <AssetVisual name="coin_gold" size={22} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statItemLbl}>Masuk Hari Ini</Text>
                  <Text style={styles.statItemValWarmIncome}>
                    +{formatRupiah(cashflow.totalIncomeToday)}
                  </Text>
                </View>
              </AnimatedPressable>

              <AnimatedPressable
                scaleTo={0.97}
                onPress={() => navigation.navigate('MarketShopping')}
                style={styles.walletSubCardPeach}
              >
                <View style={styles.walletSubIconWrap}>
                  <AssetVisual name="market_cart" size={22} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statItemLbl}>Belanja Subuh</Text>
                  <Text style={styles.statItemValWarmExpense}>
                    -{formatRupiah(cashflow.totalExpenseToday)}
                  </Text>
                </View>
              </AnimatedPressable>
            </View>

            {/* Tombol Tutup Kas Sore */}
            <AnimatedPressable
              scaleTo={0.98}
              style={styles.dailyClosingBtn}
              onPress={() =>
                Alert.alert(
                  'Pencocokan Kas Sore (Tutup Buku)',
                  `• Uang Masuk Hari Ini: +${formatRupiah(cashflow.totalIncomeToday)}\n• Belanja Pasar Subuh: -${formatRupiah(cashflow.totalExpenseToday)}\n--------------------------------\nUang Fisik Wajib di Laci: ${formatRupiah(cashflow.walletBalance)}\nStatus: Seimbang & Cocok`
                )
              }
            >
              <AssetVisual name="check_badge" size={18} />
              <Text style={styles.dailyClosingBtnText}>
                Cek Laci Sore: Uang Fisik {formatRupiah(cashflow.walletBalance)} (Cocok)
              </Text>
              <Text style={styles.closingArrow}>Rekap ›</Text>
            </AnimatedPressable>
          </View>

          {/* 3. MENU PINTASAN SQUIRCLE SERAGAM (WARM CREAM & TERRACOTTA) */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Operasional Dapur & Lapak</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FinanceReport')}>
              <Text style={styles.sectionSeeAll}>Laporan Laba ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickActionGrid}>
            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('Pos')}
            >
              <PastelReferenceIcon type="pos" size={64} />
              <Text style={styles.actionTileLabel}>Kasir Lapak</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('Consignment')}
            >
              <PastelReferenceIcon type="canteen" size={64} />
              <Text style={styles.actionTileLabel}>Titip Kantin</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('Stock')}
            >
              <PastelReferenceIcon type="stock" size={64} />
              <Text style={styles.actionTileLabel}>Gudang Stok</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('MarketShopping')}
            >
              <PastelReferenceIcon type="market" size={64} />
              <Text style={styles.actionTileLabel}>Belanja Subuh</Text>
            </AnimatedPressable>
          </View>

          <View style={[styles.quickActionGrid, { marginTop: 2, marginBottom: 18 }]}>
            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('Hpp')}
            >
              <PastelReferenceIcon type="hpp" size={64} />
              <Text style={styles.actionTileLabel}>Hitung HPP</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('DebtLedger')}
            >
              <PastelReferenceIcon type="debt" size={64} />
              <Text style={styles.actionTileLabel}>Buku Piutang</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('PartnerDirectory')}
            >
              <PastelReferenceIcon type="partner" size={64} />
              <Text style={styles.actionTileLabel}>Mitra Kantin</Text>
            </AnimatedPressable>

            <AnimatedPressable
              scaleTo={0.92}
              style={styles.quickActionTile}
              onPress={() => navigation.navigate('FinanceReport')}
            >
              <PastelReferenceIcon type="report" size={64} />
              <Text style={styles.actionTileLabel}>Laba Bersih</Text>
            </AnimatedPressable>
          </View>

          {/* 4. ETALASE JAJANAN HARI INI */}
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Etalase Jajanan Pagi Ini</Text>
              <Text style={styles.sectionSubHint}>Sentuh kue untuk cek resep & modal HPP</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Hpp')}>
              <Text style={styles.sectionSeeAll}>Semua Kue ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.foodCarouselScroll}
          >
            {filteredSnacks.map((item, index) => {
              const soldCount = [28, 22, 34, 19][index % 4];
              return (
                <AnimatedPressable
                  key={item.id}
                  scaleTo={0.95}
                  onPress={() => navigation.navigate('Hpp')}
                  style={styles.foodCardPlated}
                >
                  <View style={styles.foodCardTopTag}>
                    <Text style={styles.foodCardLakuBadge}>{soldCount} laku</Text>
                  </View>

                  <View style={styles.foodImageCenter}>
                    <AssetVisual name={item.icon || item.type || 'risoles_rogout'} size={78} />
                  </View>

                  <Text style={styles.foodCardName} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <View style={styles.foodPriceRow}>
                    <Text style={styles.foodPriceText}>{formatRupiah(item.price)}</Text>
                    <View style={styles.profitMiniTag}>
                      <Text style={styles.profitMiniText}>
                        +{formatRupiah(item.netProfit || 200)}
                      </Text>
                    </View>
                  </View>
                </AnimatedPressable>
              );
            })}
          </ScrollView>

          {/* 5. TARGET SERAPAN HARIAN */}
          <AnimatedPressable
            scaleTo={0.98}
            onPress={() => navigation.navigate('Consignment')}
            style={styles.targetBentoCard}
          >
            <View style={styles.targetTopRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.targetOverline}>TARGET SERAPAN KUE HARI INI</Text>
                <Text style={styles.targetHeadline}>103 dari 120 Kue Laku Terjual</Text>
              </View>
              <View style={styles.targetPctBadge}>
                <Text style={styles.targetPctText}>86%</Text>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <AnimatedProgressBar percent={86} color="#EA580C" trackColor="#FFEDD5" height={10} />
            </View>

            <View style={styles.targetMetricsRow}>
              <View style={styles.targetMetricChip}>
                <Text style={styles.metricLabel}>Titip 3 Kantin</Text>
                <Text style={styles.metricVal}>75 Pcs</Text>
              </View>
              <View style={styles.targetMetricChip}>
                <Text style={styles.metricLabel}>Sisa Retur</Text>
                <Text style={[styles.metricVal, { color: '#C2410C' }]}>5 Pcs</Text>
              </View>
              <View style={styles.targetMetricChip}>
                <Text style={styles.metricLabel}>Setoran Sore</Text>
                <Text style={[styles.metricVal, { color: '#9A3412' }]}>Rp 175.000</Text>
              </View>
            </View>
          </AnimatedPressable>

          {/* 6. GRAFIK ANALITIK INTERAKTIF */}
          <WeeklyBarChart data={cashflow.weeklyTrend} />
          <DonutIncomeRatio posAmount={145000} consignmentAmount={175000} />

          {/* 7. PINTASAN BUKU PIUTANG MITRA */}
          <AnimatedPressable
            scaleTo={0.97}
            style={styles.debtBannerCard}
            onPress={() => navigation.navigate('DebtLedger')}
          >
            <View style={styles.debtBannerLeft}>
              <AssetVisual name="warning_badge" size={34} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.debtBannerTitle}>
                  Tagihan Kantin Belum Setor: {formatRupiah(totalDebt)}
                </Text>
                <Text style={styles.debtBannerSub}>
                  Sentuh untuk kirim pengingat WhatsApp ke pengurus kantin
                </Text>
              </View>
            </View>
            <View style={styles.debtActionPill}>
              <Text style={styles.debtActionPillText}>Tagih ›</Text>
            </View>
          </AnimatedPressable>

          {/* 8. CATATAN ARUS KAS TERBARU */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Catatan Kas Hari Ini</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FinanceReport')}>
              <Text style={styles.sectionSeeAll}>Semua Riwayat ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityListWrap}>
            {activitiesList.slice(0, 4).map((act, idx) => {
              const isIncome = act.type === 'income' || act.isIncome;
              const iconName = isIncome ? 'canteen_shop' : 'market_cart';
              return (
                <View
                  key={act.id || idx}
                  style={[
                    styles.activityRow,
                    idx === Math.min(activitiesList.length, 4) - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <View
                    style={[
                      styles.actIconWrap,
                      { backgroundColor: isIncome ? '#FEF3C7' : '#FFEDD5' },
                    ]}
                  >
                    <AssetVisual name={iconName} size={26} />
                  </View>

                  <View style={styles.actInfoCol}>
                    <Text style={styles.actTitleText}>{act.title}</Text>
                    <Text style={styles.actTimeText}>
                      {act.subtitle ? `${act.subtitle} • ` : ''}
                      {act.time}
                    </Text>
                  </View>

                  <View style={styles.actAmountCol}>
                    <Text
                      style={[
                        styles.actAmountText,
                        { color: isIncome ? '#15803D' : '#C2410C' },
                      ]}
                    >
                      {isIncome ? '+' : '-'}
                      {formatRupiah(act.amount)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ height: 96 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bodyPadding: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  floatingSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderBottomWidth: 3.5,
    borderBottomColor: '#EA580C',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12.5,
    color: '#18181B',
    fontWeight: '700',
    paddingVertical: 2,
  },
  searchShortcutBtn: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  searchShortcutText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EA580C',
  },
  heroWalletCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
    marginBottom: 18,
  },
  walletHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  walletLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  walletLabelText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#92400E',
  },
  eyeBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletAmountText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#431407',
    letterSpacing: -0.8,
  },
  walletSubHelper: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#78350F',
    marginTop: 2,
  },
  walletDualCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  walletSubCardWarm: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
    gap: 8,
  },
  walletSubCardPeach: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 3,
    borderBottomColor: '#FDBA74',
    gap: 8,
  },
  walletSubIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItemLbl: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#78350F',
  },
  statItemValWarmIncome: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#431407',
    marginTop: 1,
  },
  statItemValWarmExpense: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#9A3412',
    marginTop: 1,
  },
  dailyClosingBtn: {
    marginTop: 10,
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 7,
  },
  dailyClosingBtnText: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: '800',
    color: '#78350F',
  },
  closingArrow: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#431407',
    letterSpacing: -0.3,
  },
  sectionSubHint: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 1,
  },
  sectionSeeAll: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C',
  },
  quickActionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickActionTile: {
    width: '23.5%',
    alignItems: 'center',
  },
  actionTileLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#431407',
    marginTop: 6,
    textAlign: 'center',
  },
  foodCarouselScroll: {
    paddingBottom: 14,
    gap: 12,
  },
  foodCardPlated: {
    width: 148,
    backgroundColor: '#FFFBEB',
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  foodCardTopTag: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  foodCardLakuBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  foodImageCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  foodCardName: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#431407',
    marginTop: 4,
  },
  foodPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  foodPriceText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#EA580C',
  },
  profitMiniTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 7,
  },
  profitMiniText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  targetBentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 4,
    borderBottomColor: '#FDBA74',
    marginBottom: 14,
  },
  targetTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetOverline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9A3412',
    letterSpacing: 0.4,
  },
  targetHeadline: {
    fontSize: 15,
    fontWeight: '900',
    color: '#431407',
    marginTop: 2,
  },
  targetPctBadge: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  targetPctText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  targetMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  targetMetricChip: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350F',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#431407',
    marginTop: 2,
  },
  debtBannerCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderBottomWidth: 4,
    borderBottomColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  debtBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  debtBannerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#7C2D12',
  },
  debtBannerSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9A3412',
    marginTop: 2,
  },
  debtActionPill: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  debtActionPillText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  activityListWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderBottomWidth: 3.5,
    borderBottomColor: '#FDBA74',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF7ED',
  },
  actIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actInfoCol: {
    flex: 1,
  },
  actTitleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#431407',
  },
  actTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 2,
  },
  actAmountCol: {
    alignItems: 'flex-end',
  },
  actAmountText: {
    fontSize: 13.5,
    fontWeight: '900',
  },
});
