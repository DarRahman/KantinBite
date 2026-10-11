import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { ScreenHeader } from '../components/ScreenHeader';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { getCashflow } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const FinanceReportScreen = ({ navigation }) => {
  const [period, setPeriod] = useState('7hari'); // 'hariIni', '7hari', 'bulanIni'
  const [cashflow, setCashflow] = useState({
    walletBalance: 850000,
    totalIncomeToday: 320000,
    totalExpenseToday: 150000,
    weeklyTrend: [
      { day: 'Sen', amount: 240000 },
      { day: 'Sel', amount: 310000 },
      { day: 'Rab', amount: 280000 },
      { day: 'Kam', amount: 350000 },
      { day: 'Jum', amount: 390000 },
      { day: 'Sab', amount: 420000 },
      { day: 'Min', amount: 320000 }
    ],
    activities: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getCashflow();
      if (data) {
        setCashflow(data);
      }
    } catch (e) {
      console.log('Error loading cashflow in FinanceReportScreen:', e);
    }
  };

  // Kalkulasi Agregat Finansial Berdasarkan Periode
  const reportMetrics = {
    grossRevenue: period === 'hariIni' ? 320000 : period === '7hari' ? 2310000 : 9450000,
    ingredientCost: period === 'hariIni' ? 150000 : period === '7hari' ? 1050000 : 4200000,
    canteenCommission: period === 'hariIni' ? 45000 : period === '7hari' ? 315000 : 1260000,
    netProfit: period === 'hariIni' ? 125000 : period === '7hari' ? 945000 : 3990000,
    salesBreakdown: [
      { name: 'Kasir Lapak Eceran', count: period === 'hariIni' ? 45 : 315, amount: period === 'hariIni' ? 90000 : 630000, color: '#EA580C' },
      { name: 'Kantin Fakultas Teknik', count: period === 'hariIni' ? 60 : 420, amount: period === 'hariIni' ? 120000 : 840000, color: '#3B82F6' },
      { name: 'Koperasi STIKOM', count: period === 'hariIni' ? 40 : 280, amount: period === 'hariIni' ? 70000 : 490000, color: '#10B981' },
      { name: 'Kantin SMPN 1', count: period === 'hariIni' ? 25 : 175, amount: period === 'hariIni' ? 40000 : 350000, color: '#8B5CF6' }
    ]
  };

  const handleShareReport = async () => {
    const textReport = `LAPORAN KEUANGAN KANTINBITE\n` +
      `Periode: ${period === 'hariIni' ? 'Hari Ini' : period === '7hari' ? '7 Hari Terakhir' : 'Bulan Ini'}\n` +
      `--------------------------------\n` +
      `Omzet Kotor: ${formatRupiah(reportMetrics.grossRevenue)}\n` +
      `Modal Bahan: ${formatRupiah(reportMetrics.ingredientCost)}\n` +
      `Komisi Kantin: ${formatRupiah(reportMetrics.canteenCommission)}\n` +
      `Laba Bersih Riil: ${formatRupiah(reportMetrics.netProfit)}\n` +
      `--------------------------------\n` +
      `Saldo Kas Aktif: ${formatRupiah(cashflow.walletBalance)}\n` +
      `KantinBite - Sistem Operasional Kuliner Mikro`;

    try {
      await Share.share({ message: textReport });
    } catch (e) {
      Alert.alert('Gagal Berbagi', 'Tidak dapat membagikan laporan.');
    }
  };

  const maxTrend = Math.max(...cashflow.weeklyTrend.map(t => t.amount), 500000);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. HEADER HALAMAN RESMI */}
      <ScreenHeader
        title="Laporan Keuangan"
        subtitle="Analisis Laba Bersih & Arus Kas"
        rightElement={
          <TouchableOpacity
            style={styles.exportBtn}
            activeOpacity={0.85}
            onPress={handleShareReport}
            accessibilityLabel="Ekspor dan bagikan laporan keuangan"
            accessibilityRole="button"
          >
            <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <Path d="M16 6l-4-4-4 4" />
              <Line x1="12" y1="2" x2="12" y2="15" />
            </Svg>
            <Text style={styles.exportBtnText}>Bagi</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. FILTER SEGMENTED PERIOD TABS */}
        <View style={styles.periodTabsWrap}>
          {[
            { id: 'hariIni', label: 'Hari Ini' },
            { id: '7hari', label: '7 Hari' },
            { id: 'bulanIni', label: 'Bulan Ini' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.periodTab, period === tab.id && styles.periodTabActive]}
              activeOpacity={0.8}
              onPress={() => setPeriod(tab.id)}
              accessibilityLabel={`Filter periode ${tab.label}`}
              accessibilityRole="button"
            >
              <Text style={[styles.periodTabText, period === tab.id && styles.periodTabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. HERO NET PROFIT SUMMARY CARD */}
        <View style={styles.heroProfitCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroCardSubtitle}>LABA BERSIH RIIL (SETELAH HPP & KOMISI)</Text>
              <Text style={styles.heroProfitAmount}>{formatRupiah(reportMetrics.netProfit)}</Text>
            </View>
            <View style={styles.heroIconBox}>
              <AssetVisual name="mascot_celebrate" size={36} />
            </View>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.metricsSummaryGrid}>
            <View style={styles.metricColumn}>
              <Text style={styles.metricLabel}>Omzet Kotor</Text>
              <Text style={styles.metricValueGross}>{formatRupiah(reportMetrics.grossRevenue)}</Text>
            </View>

            <View style={styles.metricColumn}>
              <Text style={styles.metricLabel}>Modal Bahan</Text>
              <Text style={styles.metricValueCost}>-{formatRupiah(reportMetrics.ingredientCost)}</Text>
            </View>

            <View style={styles.metricColumn}>
              <Text style={styles.metricLabel}>Jatah Kantin</Text>
              <Text style={styles.metricValueFee}>-{formatRupiah(reportMetrics.canteenCommission)}</Text>
            </View>
          </View>
        </View>

        {/* 4. VISUALISASI GRAFIK OMZET 7 HARI (SVG BAR CHART) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <AssetVisual name="chart_up" size={18} />
              <Text style={styles.sectionTitle}>Tren Penjualan Harian</Text>
            </View>
            <Text style={styles.sectionBadge}>7 Hari Terakhir</Text>
          </View>

          <View style={styles.barChartContainer}>
            {cashflow.weeklyTrend.map((item, idx) => {
              const barHeight = Math.round((item.amount / maxTrend) * 90);
              const isToday = idx === cashflow.weeklyTrend.length - 1;
              return (
                <View key={item.day + idx} style={styles.barColumn}>
                  <Text style={styles.barValueText}>
                    {Math.round(item.amount / 1000)}k
                  </Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { height: Math.max(12, barHeight) },
                        isToday && styles.barFillActive
                      ]}
                    />
                  </View>
                  <Text style={[styles.barDayText, isToday && styles.barDayTextActive]}>
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 5. DISTRIBUSI PINTU PENJUALAN (SALES CHANNELS) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pintu Pemasukan ({reportMetrics.salesBreakdown.length} Titik)</Text>
          <Text style={styles.sectionSubtitle}>Rincian omzet dan kuantitas jajanan per mitra distribusi</Text>

          <View style={styles.channelsListWrap}>
            {reportMetrics.salesBreakdown.map((ch, idx) => (
              <View key={idx} style={styles.channelRow}>
                <View style={styles.channelInfoCol}>
                  <View style={styles.channelDotTitle}>
                    <View style={[styles.channelColorDot, { backgroundColor: ch.color }]} />
                    <Text style={styles.channelName}>{ch.name}</Text>
                  </View>
                  <Text style={styles.channelSub}>Total {ch.count} pcs laku terjual</Text>
                </View>
                <Text style={styles.channelAmount}>{formatRupiah(ch.amount)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 6. STATUS DOMPET KAS SEKARANG */}
        <View style={styles.cashWalletBanner}>
          <View style={styles.walletIconWrap}>
            <AssetVisual name="wallet_purse" size={24} />
          </View>
          <View style={styles.walletTextCol}>
            <Text style={styles.walletTitle}>Saldo Dompet Fisik Aktif</Text>
            <Text style={styles.walletAmount}>{formatRupiah(cashflow.walletBalance)}</Text>
          </View>
          <TouchableOpacity
            style={styles.backHomeBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Dashboard')}
            accessibilityLabel="Kembali ke Dashboard"
            accessibilityRole="button"
          >
            <Text style={styles.backHomeBtnText}>Dasbor</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 7. DOCK NAVIGASI RESMI DANA-STYLE */}
      <ModernBottomNav activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.2,
    borderColor: '#FED7AA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 38,
  },
  exportBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#EA580C',
  },
  periodTabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 36,
    justifyContent: 'center',
  },
  periodTabActive: {
    backgroundColor: '#EA580C',
  },
  periodTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  periodTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroProfitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    marginBottom: 14,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroCardSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  heroProfitAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: '#059669',
    letterSpacing: -0.6,
  },
  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    borderWidth: 1.2,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#F1EFEA',
    marginVertical: 14,
  },
  metricsSummaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricColumn: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  metricValueGross: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  metricValueCost: {
    fontSize: 13,
    fontWeight: '800',
    color: '#DC2626',
  },
  metricValueFee: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 10,
  },
  sectionBadge: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#EA580C',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 125,
    paddingTop: 10,
    paddingBottom: 4,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barValueText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  barTrack: {
    width: 22,
    height: 90,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#94A3B8',
    borderRadius: 8,
  },
  barFillActive: {
    backgroundColor: '#EA580C',
  },
  barDayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 6,
  },
  barDayTextActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  channelsListWrap: {
    gap: 10,
    marginTop: 4,
  },
  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  channelInfoCol: {
    flex: 1,
  },
  channelDotTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  channelColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  channelName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  channelSub: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
    marginLeft: 16,
  },
  channelAmount: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  cashWalletBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletTextCol: {
    flex: 1,
  },
  walletTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#EA580C',
  },
  backHomeBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    minHeight: 36,
    justifyContent: 'center',
  },
  backHomeBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#334155',
  },
});
