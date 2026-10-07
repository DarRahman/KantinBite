import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Platform } from 'react-native';
import Svg, { Rect, Line, Path, Circle } from 'react-native-svg';
import { BottomNav } from '../components/BottomNav';
import { WeeklyBarChart } from '../components/WeeklyBarChart';
import { DonutIncomeRatio } from '../components/DonutIncomeRatio';
import { getCashflow, getProfile, addExpenseTransaction } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { colors } from '../theme/tokens';

export const DashboardScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({ businessName: 'Dapur Berkah' });
  const [cashflow, setCashflow] = useState({
    walletBalance: 850000,
    totalIncomeToday: 320000,
    totalExpenseToday: 150000,
    weeklyTrend: [],
    activities: []
  });

  useEffect(() => {
    const load = async () => {
      const p = await getProfile();
      const c = await getCashflow();
      setProfile(p);
      setCashflow(c);
    };
    load();
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* HEADER AMAN DARI STATUS BAR ANDROID */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>Selamat pagi,</Text>
            <Text style={styles.businessNameText}>{profile.businessName || 'Dapur Berkah'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.avatarCircle}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.avatarText}>BS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO METRIC TYPOGRAPHY */}
        <View style={styles.heroMetricSection}>
          <Text style={styles.heroMetricLabel}>Uang Kas di Dompet</Text>
          <Text style={styles.heroMetricValue}>{formatRupiah(cashflow.walletBalance)}</Text>
          <View style={styles.metricChips}>
            <View style={[styles.metricChip, styles.chipIn]}>
              <Text style={styles.chipInText}>+{formatRupiah(cashflow.totalIncomeToday)} Masuk</Text>
            </View>
            <View style={[styles.metricChip, styles.chipOut]}>
              <Text style={styles.chipOutText}>-{formatRupiah(cashflow.totalExpenseToday)} Belanja</Text>
            </View>
          </View>
        </View>

        {/* GRAFIK ANALITIK TREN 7 HARI (NATIVE SVG) */}
        <WeeklyBarChart data={cashflow.weeklyTrend} />

        {/* DONUT PROPORSI PENDAPATAN */}
        <DonutIncomeRatio posAmount={145000} consignmentAmount={175000} />

        {/* AKSI CEPAT NATIVE FLAT */}
        <View style={styles.quickBar}>
            <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7} onPress={() => navigation.navigate('Pos')}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" style={styles.quickIcon}>
                <Rect x="2" y="4" width="20" height="16" rx="2" />
                <Line x1="2" y1="10" x2="22" y2="10" />
              </Svg>
              <Text style={styles.quickLabel}>Kasir Cepat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7} onPress={() => navigation.navigate('Consignment', { mode: 'pagi' })}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" style={styles.quickIcon}>
                <Path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <Path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
              </Svg>
              <Text style={styles.quickLabel}>Titip Pagi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7} onPress={() => navigation.navigate('Consignment', { mode: 'sore' })}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" style={styles.quickIcon}>
                <Path d="M23 4v6h-6" />
                <Path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </Svg>
              <Text style={styles.quickLabel}>Rekap Sore</Text>
            </TouchableOpacity>
          </View>

          {/* NATIVE LIST DIVIDER TRANSAKSI */}
          <Text style={styles.listHeader}>Aktivitas Hari Ini</Text>
          <View style={styles.listWrap}>
            {cashflow.activities.map((act) => {
              const isIncome = act.type === 'income';
              return (
                <View key={act.id} style={styles.nativeListRow}>
                  <View style={[styles.iconCircle, isIncome ? styles.iconCircleGreen : styles.iconCircleRed]}>
                    {isIncome ? (
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                        <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <Circle cx="9" cy="7" r="4" />
                      </Svg>
                    ) : (
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                        <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <Line x1="3" y1="6" x2="21" y2="6" />
                      </Svg>
                    )}
                  </View>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemTitle}>{act.title}</Text>
                    <Text style={styles.itemSubtitle}>{act.subtitle}</Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={[styles.itemAmount, isIncome ? styles.textGreen : styles.textRed]}>
                      {isIncome ? '+' : '-'}{formatRupiah(act.amount)}
                    </Text>
                    <Text style={[styles.itemTag, isIncome ? styles.textGreen : styles.textMuted]}>
                      {act.tag}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

        </ScrollView>
        <BottomNav activeTab="Dashboard" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 16,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500'
  },
  businessNameText: {
    fontSize: 18,
    color: '#18181B',
    fontWeight: '800'
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA'
  },
  avatarText: {
    color: '#EA580C',
    fontWeight: '800',
    fontSize: 13
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24
  },
  heroMetricSection: {
    paddingVertical: 2,
    marginBottom: 8
  },
  heroMetricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  heroMetricValue: {
    fontSize: 34,
    fontWeight: '800',
    color: '#18181B',
    letterSpacing: -1,
    marginVertical: 4
  },
  metricChips: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2
  },
  metricChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  chipIn: {
    backgroundColor: '#ECFDF5'
  },
  chipInText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600'
  },
  chipOut: {
    backgroundColor: '#FEF2F2'
  },
  chipOutText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600'
  },
  quickBar: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12
  },
  quickActionItem: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center'
  },
  quickIcon: {
    marginBottom: 4
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#27272A'
  },
  listHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
    marginTop: 10,
    marginBottom: 6
  },
  listWrap: {
    marginTop: 4
  },
  nativeListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  iconCircleGreen: {
    backgroundColor: '#ECFDF5'
  },
  iconCircleRed: {
    backgroundColor: '#FEF2F2'
  },
  itemMeta: {
    flex: 1
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B'
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#71717A'
  },
  itemRight: {
    alignItems: 'flex-end'
  },
  itemAmount: {
    fontSize: 13,
    fontWeight: '800'
  },
  itemTag: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2
  },
  textGreen: {
    color: '#059669'
  },
  textRed: {
    color: '#DC2626'
  },
  textMuted: {
    color: '#71717A'
  }
});
