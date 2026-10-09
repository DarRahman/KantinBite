import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { BottomNav } from '../components/BottomNav';
import { WeeklyBarChart } from '../components/WeeklyBarChart';
import { DonutIncomeRatio } from '../components/DonutIncomeRatio';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';
import { getCashflow, getProfile } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const DashboardScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({ businessName: 'Dapur Berkah', ownerName: 'Ibu Sumiati' });
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
      if (p) setProfile(p);
      if (c) setCashflow(c);
    };
    load();
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER: PROFIL USAHA + MASKOT BITEY */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrap}>
            <AssetVisual name="chef_mascot" size={38} />
          </View>
          <View>
            <View style={styles.badgeUniversal}>
              <Text style={styles.badgeUniversalText}>UMKM KULINER</Text>
            </View>
            <Text style={styles.businessNameText}>{profile.businessName || 'Dapur Berkah'}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.settingsBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
        >
          <AssetVisual name="coin_gold" size={26} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO BENTO CARD: SALDO DOMPET + ASET DOMPET BERVOLUME */}
        <BentoCard bg="#FFFBEB" accentBorder="#FDE68A" style={styles.heroBento}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubLabel}>UANG KAS DI DOMPET</Text>
              <Text style={styles.heroBalanceText}>{formatRupiah(cashflow.walletBalance)}</Text>
            </View>
            <View style={styles.walletVisualBox}>
              <AssetVisual name="wallet_purse" size={56} />
            </View>
          </View>

          {/* DUA MINI BENTO: PEMASUKAN & BELANJA */}
          <View style={styles.heroMiniGrid}>
            <View style={[styles.miniCard, { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' }]}>
              <View style={styles.miniIconBox}>
                <AssetVisual name="money_cash" size={24} />
              </View>
              <View>
                <Text style={styles.miniLabel}>Pemasukan Hari Ini</Text>
                <Text style={[styles.miniVal, { color: '#15803D' }]}>+{formatRupiah(cashflow.totalIncomeToday)}</Text>
              </View>
            </View>

            <View style={[styles.miniCard, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
              <View style={styles.miniIconBox}>
                <AssetVisual name="market_cart" size={24} />
              </View>
              <View>
                <Text style={styles.miniLabel}>Belanja Pasar</Text>
                <Text style={[styles.miniVal, { color: '#B91C1C' }]}>-{formatRupiah(cashflow.totalExpenseToday)}</Text>
              </View>
            </View>
          </View>
        </BentoCard>

        {/* BENTO QUICK ACTIONS 2X2 PLAYFUL TACTILE */}
        <Text style={styles.sectionHeader}>Aksi Cepat Dapur</Text>
        <View style={styles.actionGrid}>
          
          <TouchableOpacity 
            style={[styles.actionTile, { backgroundColor: '#FFEDD5', borderColor: '#FED7AA' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Pos')}
          >
            <View style={styles.actionVisual}>
              <AssetVisual name="receipt_bill" size={36} />
            </View>
            <Text style={styles.actionTileTitle}>Kasir Kilat</Text>
            <Text style={styles.actionTileDesc}>Penjualan eceran</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionTile, { backgroundColor: '#FEF08A', borderColor: '#FDE047' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Stock')}
          >
            <View style={styles.actionVisual}>
              <AssetVisual name="wheat_flour" size={36} />
            </View>
            <Text style={styles.actionTileTitle}>Gudang Bahan</Text>
            <Text style={styles.actionTileDesc}>Sisa stok & alert</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionTile, { backgroundColor: '#E0E7FF', borderColor: '#C7D2FE' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Consignment', { mode: 'sore' })}
          >
            <View style={styles.actionVisual}>
              <AssetVisual name="check_badge" size={36} />
            </View>
            <Text style={styles.actionTileTitle}>Rekap Sore</Text>
            <Text style={styles.actionTileDesc}>Retur & setoran</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionTile, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('DebtLedger')}
          >
            <View style={styles.actionVisual}>
              <AssetVisual name="money_cash" size={36} />
            </View>
            <Text style={styles.actionTileTitle}>Buku Piutang</Text>
            <Text style={styles.actionTileDesc}>Tagihan kantin</Text>
          </TouchableOpacity>

        </View>

        {/* GRAFIK ANALITIK TREN 7 HARI (NATIVE SVG) */}
        <View style={styles.chartSection}>
          <View style={styles.chartTitleRow}>
            <AssetVisual name="chart_up" size={24} />
            <Text style={styles.chartTitleText}>Tren Penjualan 7 Hari</Text>
          </View>
          <WeeklyBarChart data={cashflow.weeklyTrend} />
        </View>

        {/* DONUT PROPORSI PENDAPATAN */}
        <DonutIncomeRatio posAmount={145000} consignmentAmount={175000} />

        {/* AKTIVITAS HARI INI: LIST DENGAN STAMP LUNAS & AVATAR */}
        <Text style={styles.sectionHeader}>Aktivitas & Log Dapur</Text>
        <View style={styles.activityWrap}>
          {cashflow.activities && cashflow.activities.length > 0 ? (
            cashflow.activities.map((act) => {
              const isIncome = act.type === 'income';
              return (
                <View key={act.id} style={styles.activityRow}>
                  <View style={[styles.actIconBox, { backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2' }]}>
                    <AssetVisual name={isIncome ? 'canteen_shop' : 'market_cart'} size={24} />
                  </View>
                  <View style={styles.actInfo}>
                    <Text style={styles.actTitle}>{act.title}</Text>
                    <Text style={styles.actTime}>{act.time}</Text>
                  </View>
                  <View style={styles.actAmountBox}>
                    <Text style={[styles.actAmount, { color: isIncome ? '#15803D' : '#B91C1C' }]}>
                      {isIncome ? '+' : '-'}{formatRupiah(act.amount)}
                    </Text>
                    {isIncome && (
                      <View style={styles.stampBox}>
                        <AssetVisual name="check_badge" size={14} />
                        <Text style={styles.stampText}>LUNAS</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyActivity}>
              <AssetVisual name="clock_time" size={36} />
              <Text style={styles.emptyText}>Belum ada transaksi hari ini</Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM NAVIGATION NATIVE DOCK */}
      <BottomNav activeTab="Dashboard" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FAF8F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeUniversal: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  badgeUniversalText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  businessNameText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.3,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  scrollContent: {
    padding: 18,
  },
  heroBento: {
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#F59E0B',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroSubLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroBalanceText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#78350F',
    letterSpacing: -1,
  },
  walletVisualBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  heroMiniGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  miniCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  miniIconBox: {
    marginRight: 8,
  },
  miniLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  miniVal: {
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 6,
    letterSpacing: -0.2,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },
  actionTile: {
    width: (width - 36 - 12) / 2,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderBottomWidth: 4,
  },
  actionVisual: {
    marginBottom: 8,
  },
  actionTileTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  actionTileDesc: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    padding: 16,
    marginBottom: 18,
    elevation: 1,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  chartTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  activityWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  actIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actInfo: {
    flex: 1,
  },
  actTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  actTime: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  actAmountBox: {
    alignItems: 'flex-end',
  },
  actAmount: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  stampBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    gap: 3,
  },
  stampText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#15803D',
  },
  emptyActivity: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
