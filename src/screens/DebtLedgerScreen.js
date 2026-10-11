import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Rect, Circle, Polyline } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import AssetVisual from '../components/AssetVisual';
import { formatRupiah } from '../utils/formatters';

const { width } = Dimensions.get('window');

export const DebtLedgerScreen = ({ navigation }) => {
  const [debts, setDebts] = useState([
    {
      id: 'd1',
      canteenName: 'Kantin Fakultas Teknik',
      pic: 'Pak Joko',
      phone: '081298765432',
      amount: 45000,
      dueDate: 'Rabu, 7 Okt',
      items: '25 Risoles Rogout & 10 Pastel',
      daysLate: 1
    },
    {
      id: 'd2',
      canteenName: 'Kantin SMP Negeri 1',
      pic: 'Bu Siti Khodijah',
      phone: '081322334455',
      amount: 60000,
      dueDate: 'Senin, 5 Okt',
      items: '30 Dadar Gulung & 30 Lemper',
      daysLate: 3
    },
    {
      id: 'd3',
      canteenName: 'Koperasi Kampus',
      pic: 'Mas Arif',
      phone: '085711223344',
      amount: 25000,
      dueDate: 'Kamis, 8 Okt (Hari ini)',
      items: '20 Risoles Rogout Mayo',
      daysLate: 0
    }
  ]);

  const totalPiutang = debts.reduce((sum, d) => sum + d.amount, 0);

  const handleMarkAsPaid = (id, name, amount) => {
    Alert.alert(
      'Konfirmasi Pelunasan Setoran',
      `Tandai setoran ${formatRupiah(amount)} dari ${name} sudah LUNAS dan masukkan ke uang kas dompet?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Lunaskan!',
          onPress: () => {
            setDebts(prev => prev.filter(d => d.id !== id));
            Alert.alert('Sukses', `Setoran ${formatRupiah(amount)} dari ${name} telah masuk ke buku kas.`);
          }
        }
      ]
    );
  };

  const handleRemindWhatsApp = (d) => {
    const text = `Halo ${d.pic} (${d.canteenName}), mohon info rekonsiliasi setoran konsinyasi kue titipan sebesar *${formatRupiah(d.amount)}* (${d.items}) yang jatuh tempo ${d.dueDate}. Terima kasih banyak.`;
    Linking.openURL(`whatsapp://send?phone=${d.phone}&text=${encodeURIComponent(text)}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 1. TOP HEADER SUB-LAYAR DENGAN TOMBOL BACK */}
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
            <Text style={styles.pageTitle}>Buku Piutang Kantin</Text>
            <Text style={styles.pageSub}>Rekapitulasi Tagihan Tertunda</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addDebtBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Consignment')}
        >
          <Text style={styles.addDebtBtnText}>+ Catat Piutang</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. HERO TOTAL PIUTANG BERSIH (TANPA IKON MERAH MENEMPEL) */}
        <View style={styles.debtHeroCard}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabelText}>TOTAL SETORAN TERTAHAN DI KANTIN</Text>
            <Text style={styles.heroCountText}>{debts.length} Mitra Menunggak</Text>
          </View>

          <View style={styles.heroMainRow}>
            <Text style={styles.heroBigNum}>{formatRupiah(totalPiutang)}</Text>
          </View>

          <View style={styles.debtSummaryStrip}>
            <Text style={styles.summaryTextMuted}>Jatuh Tempo: 1 Hari Ini • 2 Telat</Text>
            <Text style={styles.summaryTextBold}>Arus Kas: Tertahan</Text>
          </View>
        </View>

        {/* 3. DAFTAR TAGIHAN PIUTANG KANTIN */}
        <Text style={styles.sectionLbl}>DAFTAR TAGIHAN PIUTANG ({debts.length} MITRA)</Text>

        {debts.map((d) => {
          const isLate = d.daysLate > 0;
          return (
            <View key={d.id} style={styles.debtCard}>
              <View style={styles.debtCardHeader}>
                <View style={styles.canteenIconBox}>
                  <AssetVisual name="canteen_shop" size={24} />
                </View>

                <View style={styles.debtInfoCol}>
                  <Text style={styles.debtCanteenTitle}>{d.canteenName}</Text>
                  <Text style={styles.debtPicContact}>PIC: {d.pic} • {d.phone}</Text>
                </View>

                <View style={styles.debtAmountCol}>
                  <Text style={styles.debtAmountNum}>{formatRupiah(d.amount)}</Text>
                  {isLate ? (
                    <Text style={styles.statusDirectLateText}>Jatuh tempo kemarin</Text>
                  ) : (
                    <Text style={styles.statusDirectDueText}>Setor hari ini</Text>
                  )}
                </View>
              </View>

              <View style={styles.debtItemsLine}>
                <Text style={styles.debtItemsText}>
                  Item Tertahan: <Text style={styles.debtItemsBold}>{d.items}</Text> ({d.dueDate})
                </Text>
              </View>

              <View style={styles.debtBtnRow}>
                <TouchableOpacity 
                  style={styles.btnTagihWa}
                  activeOpacity={0.8}
                  onPress={() => handleRemindWhatsApp(d)}
                >
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="#FFFFFF">
                    <Path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2" />
                  </Svg>
                  <Text style={styles.btnTagihWaText}>Tagih via WA</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.btnMarkPaid}
                  activeOpacity={0.8}
                  onPress={() => handleMarkAsPaid(d.id, d.canteenName, d.amount)}
                >
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                  <Text style={styles.btnMarkPaidText}>Tandai Lunas</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 5. MODERN BOTTOM DOCK */}
      <ModernBottomNav activeTab="Activity" navigation={navigation} />
    </SafeAreaView>
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
    paddingBottom: 14,
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
    gap: 10,
    flex: 1,
    minWidth: 0,
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
    flexShrink: 0,
  },
  headerTextCol: {
    gap: 1,
    flex: 1,
  },
  pageSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  pageTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  addDebtBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexShrink: 0,
  },
  addDebtBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    whiteSpace: 'nowrap',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 110,
  },
  debtHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
    gap: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabelText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  moneyBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  heroBigNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#DC2626',
    letterSpacing: -0.5,
  },
  heroCountText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#B91C1C',
  },
  debtSummaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  summaryTextMuted: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '600',
  },
  summaryTextBold: {
    fontSize: 11.5,
    color: '#0F172A',
    fontWeight: '800',
  },
  sectionLbl: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  debtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  debtCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  canteenIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  debtInfoCol: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  debtCanteenTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  debtPicContact: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  debtAmountCol: {
    alignItems: 'flex-end',
    gap: 2,
  },
  debtAmountNum: {
    fontSize: 15,
    fontWeight: '900',
    color: '#DC2626',
  },
  statusDirectLateText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#DC2626',
  },
  statusDirectDueText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D97706',
  },
  debtItemsLine: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#CBD5E1',
  },
  debtItemsText: {
    fontSize: 11,
    color: '#475569',
  },
  debtItemsBold: {
    color: '#1E293B',
    fontWeight: '800',
  },
  debtBtnRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 2,
  },
  btnTagihWa: {
    flex: 1,
    backgroundColor: '#22C55E',
    borderRadius: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    elevation: 2,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
  },
  btnTagihWaText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  btnMarkPaid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  btnMarkPaidText: {
    color: '#0F172A',
    fontSize: 11.5,
    fontWeight: '800',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FAF8F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  headerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  headerTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EA580C',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: -0.4,
  },
  headerRightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  headerRightText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
  },
  scrollContent: {
    padding: 18,
  },
  heroCard: {
    backgroundColor: '#FFF1F2',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#1E293B',
    padding: 18,
    marginBottom: 18,
    borderBottomWidth: 4.5,
    borderBottomColor: '#1E293B',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroSubLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#991B1B',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroBalanceText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#991B1B',
    letterSpacing: -0.8,
  },
  debtVisualBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FECACA',
  },
  heroAlertPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  heroAlertPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#991B1B',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  debtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 14,
    borderBottomWidth: 4.5,
    borderBottomColor: '#1E293B',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  canteenIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F1EFEA',
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  lateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  lateBadgeRed: {
    backgroundColor: '#FEE2E2',
  },
  lateBadgeYellow: {
    backgroundColor: '#FEF3C7',
  },
  lateBadgeText: {
    fontSize: 9,
    fontWeight: '900',
  },
  canteenNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  picText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#DC2626',
  },
  dueText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 2,
  },
  itemsSummaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  itemsSummaryLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  cardBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#15803D',
    marginTop: 14,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
