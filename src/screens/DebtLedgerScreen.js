import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Alert, Dimensions, Linking } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton } from '../components/PlayfulComponents';
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
      dueDate: 'Kemarin (Rabu, 7 Okt)',
      items: '25 Risoles Rogout & 10 Pastel',
      status: 'Tertahan',
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
      status: 'Tertahan',
      daysLate: 3
    },
    {
      id: 'd3',
      canteenName: 'Koperasi STIKOM Poltek',
      pic: 'Mas Arif',
      phone: '085711223344',
      amount: 25000,
      dueDate: 'Kamis, 8 Okt (Hari ini)',
      items: '20 Risoles Rogout Mayo',
      status: 'Jatuh Tempo',
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
    Linking.openURL(`whatsapp://send?phone=62${d.phone.slice(1)}&text=${encodeURIComponent(text)}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="warning_badge" size={16} />
            <Text style={styles.headerTagText}>MANAJEMEN KONSINYASI TERTAHAN</Text>
          </View>
          <Text style={styles.headerTitle}>Buku Piutang Kantin</Text>
        </View>

        <TouchableOpacity 
          style={styles.headerRightBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Consignment')}
        >
          <AssetVisual name="canteen_shop" size={20} />
          <Text style={styles.headerRightText}>Titip Kantin</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO TOTAL PIUTANG BERVOLUME */}
        <BentoCard bg="#FEF2F2" accentBorder="#FECACA" style={styles.heroBento}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSubLabel}>TOTAL SETORAN TERTAHAN DI KANTIN</Text>
              <Text style={styles.heroBalanceText}>{formatRupiah(totalPiutang)}</Text>
            </View>
            <View style={styles.debtVisualBox}>
              <AssetVisual name="money_cash" size={54} />
            </View>
          </View>

          <View style={styles.heroAlertPill}>
            <AssetVisual name="clock_time" size={16} />
            <Text style={styles.heroAlertPillText}>
              {debts.length} Mitra Kantin Belum Menyetorkan Uang Hasil Penjualan
            </Text>
          </View>
        </BentoCard>

        {/* LIST PIUTANG KANTIN */}
        <Text style={styles.sectionTitle}>Daftar Tagihan Jatuh Tempo</Text>

        {debts.length === 0 ? (
          <View style={styles.emptyCard}>
            <AssetVisual name="check_badge" size={64} />
            <Text style={styles.emptyTitle}>Semua Setoran Kantin Lunas!</Text>
            <Text style={styles.emptySubtitle}>Tidak ada piutang tertahan. Arus kas gerai sehat 100%.</Text>
          </View>
        ) : (
          debts.map((d) => {
            const isLate = d.daysLate > 0;
            return (
              <BentoCard key={d.id} bg="#FFFFFF" accentBorder={isLate ? '#FECACA' : '#E2E8F0'} style={styles.debtCard}>
                
                <View style={styles.cardHeaderRow}>
                  <View style={styles.canteenIconBox}>
                    <AssetVisual name="canteen_shop" size={36} />
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.badgeRow}>
                      <View style={[styles.lateBadge, isLate ? styles.lateBadgeRed : styles.lateBadgeYellow]}>
                        <AssetVisual name={isLate ? 'warning_badge' : 'clock_time'} size={12} />
                        <Text style={[styles.lateBadgeText, { color: isLate ? '#B91C1C' : '#B45309' }]}>
                          {isLate ? `Telat ${d.daysLate} Hari` : 'Jatuh Tempo Hari Ini'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.canteenNameText}>{d.canteenName}</Text>
                    <Text style={styles.picText}>PIC: {d.pic} ({d.phone})</Text>
                  </View>

                  <View style={styles.amountBox}>
                    <Text style={styles.amountText}>{formatRupiah(d.amount)}</Text>
                    <Text style={styles.dueText}>{d.dueDate}</Text>
                  </View>
                </View>

                {/* DETAIL ITEM YANG DITITIPKAN */}
                <View style={styles.itemsSummaryBox}>
                  <Text style={styles.itemsSummaryLabel}>Item Dititipkan: <Text style={{ color: '#1E293B', fontWeight: '800' }}>{d.items}</Text></Text>
                </View>

                {/* DUA TOMBOL AKSI: TAGIH WA & LUNASKAN */}
                <View style={styles.cardBtnRow}>
                  <TactileButton
                    size="sm"
                    variant="secondary"
                    style={{ flex: 1 }}
                    icon={<AssetVisual name="receipt_bill" size={16} />}
                    onPress={() => handleRemindWhatsApp(d)}
                  >
                    Kirim Tagihan WA
                  </TactileButton>

                  <TactileButton
                    size="sm"
                    variant="success"
                    style={{ flex: 1 }}
                    icon={<AssetVisual name="check_badge" size={16} />}
                    onPress={() => handleMarkAsPaid(d.id, d.canteenName, d.amount)}
                  >
                    Tandai Lunas
                  </TactileButton>
                </View>

              </BentoCard>
            );
          })
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Consignment" navigation={navigation} />
    </View>
  );
};

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
  heroBento: {
    padding: 18,
    marginBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#F87171',
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
    padding: 16,
    marginBottom: 14,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
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
