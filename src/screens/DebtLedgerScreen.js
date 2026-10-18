import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { PartnerAvatar } from '../components/Mascot';
import { AnimatedPressable } from '../components/PlayfulComponents';
import { getDebts, saveDebts, addIncomeTransaction } from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const DebtLedgerScreen = ({ navigation }) => {
  const [debts, setDebts] = useState([
    {
      id: 'd1',
      canteenName: 'Kantin Fakultas Teknik',
      pic: 'Pak Joko Sutrisno',
      phone: '081298765432',
      amount: 45000,
      dueDate: 'Kemarin • Sesi Sore',
      items: '25 Risoles Rogout & 10 Pastel',
      daysLate: 1,
    },
    {
      id: 'd2',
      canteenName: 'Kantin SMP Negeri 1',
      pic: 'Bu Siti Khodijah',
      phone: '081322334455',
      amount: 60000,
      dueDate: '3 Hari Lalu',
      items: '30 Dadar Gulung & 30 Lemper',
      daysLate: 3,
    },
    {
      id: 'd3',
      canteenName: 'Koperasi Mahasiswa',
      pic: 'Mas Arif Hidayat',
      phone: '085711223344',
      amount: 25000,
      dueDate: 'Hari Ini • 16:00 WIB',
      items: '20 Risoles Rogout Mayo',
      daysLate: 0,
    },
  ]);

  useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = async () => {
    const saved = await getDebts();
    if (saved && saved.length > 0) {
      setDebts(saved);
    }
  };

  const totalPiutang = debts.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const handleMarkAsPaid = (debtItem) => {
    Alert.alert(
      'Terima Pelunasan Setoran',
      `Masukkan pelunasan ${formatRupiah(debtItem.amount)} dari ${debtItem.canteenName} ke dalam Uang Kas Dompet?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Terima Lunas',
          onPress: async () => {
            const next = debts.filter((d) => d.id !== debtItem.id);
            setDebts(next);
            await saveDebts(next);
            await addIncomeTransaction(
              debtItem.canteenName,
              `Pelunasan Piutang (${debtItem.items})`,
              debtItem.amount,
              'Pelunasan Piutang'
            );
            Alert.alert(
              'Setoran Lunas!',
              `Uang ${formatRupiah(debtItem.amount)} dari ${debtItem.canteenName} telah masuk ke saldo kas.`
            );
          },
        },
      ]
    );
  };

  const handleRemindWhatsApp = (d) => {
    const cleanPhone = (d.phone || '081298765432').replace(/^0/, '62');
    const text = `Halo ${d.pic} (${d.canteenName}), mohon info rekonsiliasi setoran titipan kue sebesar *${formatRupiah(d.amount)}* (${d.items}) periode ${d.dueDate}. Terima kasih banyak.`;
    Linking.openURL(`whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`).catch(
      () => Alert.alert('Pengingat WhatsApp', `Membuka ruang pesan ke ${d.pic}.`)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E0F2FE" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC HEADER BUKU PIUTANG */}
        <ScenicBanner
          scene="canteen_morning"
          badgeText="TAGIHAN KANTIN TERTUNDA"
          title="Buku Piutang Kantin"
          subtitle="Pantau & tagih uang setoran kue yang belum dibayar"
          onBackPress={() => navigation.goBack()}
          actionLabel="+ Catat Baru"
          onActionPress={() => navigation.navigate('Consignment')}
        />

        <View style={styles.bodyPadding}>
          {/* 2. KARTU HERO TOTAL PIUTANG */}
          <View style={styles.debtHeroCard}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroLabelText}>TOTAL UANG SETORAN TERTAHAN</Text>
                <Text style={styles.heroBigNum}>{formatRupiah(totalPiutang)}</Text>
              </View>
              <AssetVisual name="warning_badge" size={46} />
            </View>

            <View style={styles.debtSummaryStrip}>
              <Text style={styles.summaryTextCount}>
                {debts.length} Mitra Kantin Belum Lunas
              </Text>
              <Text style={styles.summaryTextHint}>Klik Lunas saat uang diterima</Text>
            </View>
          </View>

          {/* 3. DAFTAR TAGIHAN PER MITRA */}
          <Text style={styles.sectionTitle}>Rincian Tagihan Mitra</Text>

          {debts.length === 0 ? (
            <View style={styles.allPaidCard}>
              <AssetVisual name="check_badge" size={54} />
              <Text style={styles.allPaidTitle}>Semua Setoran Kantin Lunas!</Text>
              <Text style={styles.allPaidSub}>
                Tidak ada tunggakan setoran dari mitra kantin hari ini.
              </Text>
            </View>
          ) : (
            debts.map((d, idx) => (
              <View key={d.id} style={styles.debtCard}>
                <View style={styles.cardTopRow}>
                  <PartnerAvatar name={d.pic} variant={idx} size={48} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.canteenName}>{d.canteenName}</Text>
                    <Text style={styles.picText}>
                      PIC: {d.pic} • {d.dueDate}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.lateBadge,
                      d.daysLate > 0 ? styles.lateBadgeRed : styles.lateBadgeAmber,
                    ]}
                  >
                    <Text
                      style={[
                        styles.lateBadgeText,
                        d.daysLate > 0 ? { color: '#B91C1C' } : { color: '#92400E' },
                      ]}
                    >
                      {d.daysLate > 0 ? `Telat ${d.daysLate} hr` : 'Hari Ini'}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemsDetailBox}>
                  <Text style={styles.itemsDetailText}>{d.items}</Text>
                  <Text style={styles.debtAmountText}>{formatRupiah(d.amount)}</Text>
                </View>

                <View style={styles.actionRow}>
                  <AnimatedPressable
                    scaleTo={0.96}
                    style={styles.waRemindBtn}
                    onPress={() => handleRemindWhatsApp(d)}
                  >
                    <Text style={styles.waRemindText}>Tagih via WA</Text>
                  </AnimatedPressable>

                  <AnimatedPressable
                    scaleTo={0.96}
                    style={styles.markPaidBtn}
                    onPress={() => handleMarkAsPaid(d)}
                  >
                    <AssetVisual name="check_badge" size={18} />
                    <Text style={styles.markPaidText}>Tandai Lunas</Text>
                  </AnimatedPressable>
                </View>
              </View>
            ))
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <ModernBottomNav activeTab="Activity" navigation={navigation} />
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
  debtHeroCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FECACA',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F87171',
    marginBottom: 18,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabelText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#991B1B',
    letterSpacing: 0.4,
  },
  heroBigNum: {
    fontSize: 30,
    fontWeight: '900',
    color: '#DC2626',
    marginTop: 2,
  },
  debtSummaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FECACA',
  },
  summaryTextCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#991B1B',
  },
  summaryTextHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B91C1C',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    marginBottom: 10,
  },
  allPaidCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
  },
  allPaidTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 10,
  },
  allPaidSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
    marginTop: 4,
    textAlign: 'center',
  },
  debtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
    marginBottom: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  canteenName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#18181B',
  },
  picText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  lateBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 9,
  },
  lateBadgeRed: {
    backgroundColor: '#FEE2E2',
  },
  lateBadgeAmber: {
    backgroundColor: '#FEF3C7',
  },
  lateBadgeText: {
    fontSize: 10.5,
    fontWeight: '900',
  },
  itemsDetailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  itemsDetailText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78350F',
    flex: 1,
    marginRight: 8,
  },
  debtAmountText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#DC2626',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  waRemindBtn: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    borderRadius: 13,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
  },
  waRemindText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#EA580C',
  },
  markPaidBtn: {
    flex: 1.2,
    backgroundColor: '#10B981',
    borderRadius: 13,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderBottomWidth: 3,
    borderBottomColor: '#047857',
  },
  markPaidText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
