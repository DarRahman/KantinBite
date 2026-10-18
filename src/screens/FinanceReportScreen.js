import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { CanteenPodiumScene } from '../components/Mascot';
import { WeeklyBarChart } from '../components/WeeklyBarChart';
import { AnimatedPressable, AnimatedProgressBar, TactilePill } from '../components/PlayfulComponents';
import { getCashflow } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const FinanceReportScreen = ({ navigation }) => {
  const [period, setPeriod] = useState('7hari'); // 'hariIni' | '7hari' | 'bulanIni'
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
      { day: 'Min', amount: 320000 },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getCashflow();
    if (data) setCashflow(data);
  };

  const reportMetrics = {
    grossRevenue: period === 'hariIni' ? 320000 : period === '7hari' ? 2310000 : 9450000,
    ingredientCost: period === 'hariIni' ? 150000 : period === '7hari' ? 1050000 : 4200000,
    canteenCommission: period === 'hariIni' ? 45000 : period === '7hari' ? 315000 : 1260000,
    netProfit: period === 'hariIni' ? 125000 : period === '7hari' ? 945000 : 3990000,
    salesBreakdown: [
      {
        name: 'Kantin Fakultas Teknik',
        count: period === 'hariIni' ? 60 : 420,
        amount: period === 'hariIni' ? 120000 : 840000,
        pct: 36,
        color: '#EA580C',
      },
      {
        name: 'Kasir Lapak Eceran',
        count: period === 'hariIni' ? 45 : 315,
        amount: period === 'hariIni' ? 90000 : 630000,
        pct: 28,
        color: '#10B981',
      },
      {
        name: 'Koperasi STIKOM',
        count: period === 'hariIni' ? 40 : 280,
        amount: period === 'hariIni' ? 70000 : 490000,
        pct: 21,
        color: '#0284C7',
      },
      {
        name: 'Kantin SMPN 1',
        count: period === 'hariIni' ? 25 : 175,
        amount: period === 'hariIni' ? 40000 : 350000,
        pct: 15,
        color: '#7C3AED',
      },
    ],
  };

  const handleShareReport = async () => {
    const periodLabel =
      period === 'hariIni' ? 'Hari Ini' : period === '7hari' ? '7 Hari Terakhir' : 'Bulan Ini';
    const textReport =
      `*LAPORAN LABA BERSIH DAPUR BERKAH BUNDA*\n` +
      `Periode: ${periodLabel}\n` +
      `--------------------------------\n` +
      `• Omzet Kotor: ${formatRupiah(reportMetrics.grossRevenue)}\n` +
      `• Belanja Bahan: -${formatRupiah(reportMetrics.ingredientCost)}\n` +
      `• Komisi Kantin: -${formatRupiah(reportMetrics.canteenCommission)}\n` +
      `*LABA BERSIH DAPUR: +${formatRupiah(reportMetrics.netProfit)}*\n` +
      `--------------------------------\n` +
      `Saldo Kas Tunai: ${formatRupiah(cashflow.walletBalance)}`;
    try {
      await Share.share({ message: textReport });
    } catch (e) {
      Alert.alert('Info', 'Gagal membagikan laporan.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDD5" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC REPORT HEADER DENGAN CHEF BITEY MERAYAKAN */}
        <ScenicBanner
          scene="canteen_afternoon"
          badgeText="PEMBUKUAN & LABA USAHA"
          title="Laporan Keuangan"
          subtitle="Rekap omzet kotor, biaya bahan baku & untung bersih riil"
          onBackPress={() => navigation.goBack()}
          actionLabel="Bagikan WA"
          onActionPress={handleShareReport}
        />

        <View style={styles.bodyPadding}>
          {/* 2. FILTER PERIODE WAKTU */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodRow}
          >
            {[
              { key: 'hariIni', label: 'Hari Ini' },
              { key: '7hari', label: '7 Hari Terakhir' },
              { key: 'bulanIni', label: 'Bulan Ini' },
            ].map((p) => (
              <TactilePill
                key={p.key}
                label={p.label}
                active={period === p.key}
                onPress={() => setPeriod(p.key)}
              />
            ))}
          </ScrollView>

          {/* 3. KARTU HERO LABA BERSIH DAPUR */}
          <View style={styles.netProfitCard}>
            <View style={styles.netTopRow}>
              <View>
                <Text style={styles.netOverline}>UNTUNG BERSIH MASUK KANTONG</Text>
                <Text style={styles.netBigAmount}>
                  +{formatRupiah(reportMetrics.netProfit)}
                </Text>
              </View>
              <AssetVisual name="coin_gold" size={48} />
            </View>

            <View style={styles.breakdownRow}>
              <View style={styles.miniStatBox}>
                <Text style={styles.miniStatLbl}>Omzet Kotor</Text>
                <Text style={styles.miniStatVal}>
                  {formatRupiah(reportMetrics.grossRevenue)}
                </Text>
              </View>
              <View style={styles.miniStatBox}>
                <Text style={styles.miniStatLbl}>Modal Bahan</Text>
                <Text style={[styles.miniStatVal, { color: '#DC2626' }]}>
                  -{formatRupiah(reportMetrics.ingredientCost)}
                </Text>
              </View>
              <View style={styles.miniStatBox}>
                <Text style={styles.miniStatLbl}>Jatah Kantin</Text>
                <Text style={[styles.miniStatVal, { color: '#D97706' }]}>
                  -{formatRupiah(reportMetrics.canteenCommission)}
                </Text>
              </View>
            </View>
          </View>

          {/* 4. GRAFIK TREN OMZET 7 HARI */}
          <WeeklyBarChart data={cashflow.weeklyTrend} />

          {/* 5. PODIUM 3 SUMBER PENJUALAN TERTINGGI */}
          <Text style={styles.sectionTitle}>Podium Kontribusi Penjualan</Text>
          <CanteenPodiumScene
            topThree={[
              { name: 'Kantin Teknik', sold: formatRupiah(reportMetrics.salesBreakdown[0].amount) },
              { name: 'Kasir Lapak', sold: formatRupiah(reportMetrics.salesBreakdown[1].amount) },
              { name: 'Kopma STIKOM', sold: formatRupiah(reportMetrics.salesBreakdown[2].amount) },
            ]}
          />

          {/* 6. RINCIAN KONTRIBUSI PER TITIK PENJUALAN */}
          <View style={styles.channelCard}>
            <Text style={styles.channelCardTitle}>Rincian Serapan Kue per Saluran</Text>
            {reportMetrics.salesBreakdown.map((ch, idx) => (
              <View key={idx} style={styles.channelRow}>
                <View style={styles.channelHead}>
                  <Text style={styles.channelName}>
                    {ch.name} ({ch.count} kue)
                  </Text>
                  <Text style={styles.channelAmount}>{formatRupiah(ch.amount)}</Text>
                </View>
                <AnimatedProgressBar
                  percent={ch.pct}
                  color={ch.color}
                  trackColor="#F1F5F9"
                  height={8}
                />
              </View>
            ))}
          </View>

          <AnimatedPressable
            scaleTo={0.97}
            style={styles.shareFullBtn}
            onPress={handleShareReport}
          >
            <AssetVisual name="receipt_bill" size={20} />
            <Text style={styles.shareFullBtnText}>
              Kirim Ringkasan Laba-Rugi ke WhatsApp
            </Text>
          </AnimatedPressable>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Me" navigation={navigation} />
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
  periodRow: {
    paddingBottom: 14,
  },
  netProfitCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#6EE7B7',
    borderBottomWidth: 4.5,
    borderBottomColor: '#10B981',
    marginBottom: 16,
  },
  netTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  netOverline: {
    fontSize: 10.5,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 0.4,
  },
  netBigAmount: {
    fontSize: 30,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniStatBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 9,
  },
  miniStatLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: '#71717A',
  },
  miniStatVal: {
    fontSize: 12,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 10,
  },
  channelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    marginBottom: 16,
  },
  channelCardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 12,
  },
  channelRow: {
    marginBottom: 12,
  },
  channelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  channelName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#3F3F46',
  },
  channelAmount: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#18181B',
  },
  shareFullBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 4,
    borderBottomColor: '#9A3412',
  },
  shareFullBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
