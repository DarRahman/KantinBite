import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { ModernBottomNav } from '../components/ModernBottomNav';
import { ScenicBanner } from '../components/ScenicBanner';
import AssetVisual from '../components/AssetVisual';
import { PartnerAvatar } from '../components/Mascot';
import { AnimatedPressable } from '../components/PlayfulComponents';
import {
  getCanteens,
  addCanteen,
  getConsignment,
  saveConsignment,
  addIncomeTransaction,
} from '../db/storage';
import { formatRupiah } from '../utils/formatters';

export const ConsignmentScreen = ({ navigation }) => {
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteenId, setSelectedCanteenId] = useState('c1');
  const [activeMode, setActiveMode] = useState('sore'); // 'pagi' | 'sore'

  const [sessionData, setSessionData] = useState({
    c1: {
      initialQty: 30,
      returnQty: 5,
      unitPrice: 1000,
      isPaid: true,
      itemName: 'Risoles Rogout Ayam',
      itemType: 'risoles_rogout',
    },
    c2: {
      initialQty: 25,
      returnQty: 2,
      unitPrice: 1200,
      isPaid: false,
      itemName: 'Pastel Sayur Telur',
      itemType: 'pastel_telur',
    },
    c3: {
      initialQty: 20,
      returnQty: 3,
      unitPrice: 900,
      isPaid: true,
      itemName: 'Dadar Gulung Pandan',
      itemType: 'dadar_gulung',
    },
  });

  const [titipInput, setTitipInput] = useState('30');
  const [returInput, setReturInput] = useState('5');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCanteenName, setNewCanteenName] = useState('');
  const [newPic, setNewPic] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    loadData();
    const unsub = navigation.addListener('focus', loadData);
    return unsub;
  }, [navigation]);

  const loadData = async () => {
    const [cList, savedConsign] = await Promise.all([getCanteens(), getConsignment()]);
    if (cList && cList.length > 0) {
      setCanteens(cList);
    }
    if (savedConsign) {
      setSessionData((prev) => ({ ...prev, ...savedConsign }));
    }
  };

  const currentCanteen =
    canteens.find((c) => c.id === selectedCanteenId) ||
    canteens[0] || {
      id: 'c1',
      name: 'Kantin Fakultas Teknik',
      pic: 'Pak Joko Sutrisno',
      phone: '081298765432',
      debt: 0,
    };

  const currentSession = sessionData[selectedCanteenId] || {
    initialQty: 30,
    returnQty: 5,
    unitPrice: 1000,
    isPaid: true,
    itemName: 'Risoles Rogout Ayam',
    itemType: 'risoles_rogout',
  };

  const initialQty = Math.max(0, Math.round(Number(titipInput) || 0));
  const rawRetur = Math.max(0, Math.round(Number(returInput) || 0));
  const returnQty = Math.min(initialQty, rawRetur);
  const soldQty = Math.max(0, initialQty - returnQty);
  const totalDue = Math.round(soldQty * (currentSession.unitPrice || 1000));

  const handleSelectCanteen = (cId) => {
    setSelectedCanteenId(cId);
    const sess = sessionData[cId] || {
      initialQty: 25,
      returnQty: 2,
      unitPrice: 1000,
      isPaid: true,
      itemName: 'Risoles Rogout Ayam',
      itemType: 'risoles_rogout',
    };
    setTitipInput(String(sess.initialQty));
    setReturInput(String(sess.returnQty));
  };

  const adjustTitip = (delta) => {
    const next = Math.max(1, initialQty + delta);
    setTitipInput(String(next));
    if (returnQty > next) {
      setReturInput(String(next));
    }
  };

  const adjustRetur = (delta) => {
    const next = Math.max(0, Math.min(initialQty, returnQty + delta));
    setReturInput(String(next));
  };

  const togglePaidStatus = (paidVal) => {
    setSessionData((prev) => ({
      ...prev,
      [selectedCanteenId]: {
        ...currentSession,
        isPaid: paidVal,
      },
    }));
  };

  const handleChatWA = () => {
    const phone = currentCanteen.phone || '081298765432';
    const text = `Halo ${currentCanteen.pic}, dari Dapur Berkah Bunda ingin konfirmasi rekap titip kue di ${currentCanteen.name}: Titip ${initialQty} pcs, Sisa Retur ${returnQty} pcs, Laku ${soldQty} pcs. Total setoran ${formatRupiah(totalDue)}.`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`).catch(() => {
      Alert.alert('Info WhatsApp', 'Membuka pesan konfirmasi untuk pengurus kantin.');
    });
  };

  const handleSaveSession = async () => {
    const updated = {
      ...sessionData,
      [selectedCanteenId]: {
        ...currentSession,
        initialQty,
        returnQty,
        soldQty,
        totalDue,
      },
    };
    setSessionData(updated);
    await saveConsignment(updated);

    if (currentSession.isPaid && totalDue > 0) {
      await addIncomeTransaction(
        currentCanteen.name,
        `Setoran ${soldQty} pcs ${currentSession.itemName}`,
        totalDue,
        'Setoran Kantin'
      );
    }

    Alert.alert(
      'Rekap Kantin Tersimpan',
      `Setoran ${formatRupiah(totalDue)} dari ${currentCanteen.name} (${currentSession.isPaid ? 'LUNAS TUNAI' : 'MASUK BUKU PIUTANG'}) telah dicatat.`,
      [
        {
          text: 'Cetak Nota WA',
          onPress: () =>
            navigation.navigate('Receipt', {
              canteenName: currentCanteen.name,
              pic: currentCanteen.pic,
              total: totalDue,
              sold: soldQty,
              retur: returnQty,
              titip: initialQty,
              item: currentSession.itemName,
            }),
        },
        { text: 'Selesai' },
      ]
    );
  };

  const handleAddNewCanteen = async () => {
    if (!newCanteenName.trim() || !newPic.trim()) {
      Alert.alert('Data Belum Lengkap', 'Mohon isi nama kantin dan nama pengurus (PIC).');
      return;
    }
    await addCanteen({
      name: newCanteenName.trim(),
      pic: newPic.trim(),
      phone: newPhone.trim() || '08123456789',
    });
    setNewCanteenName('');
    setNewPic('');
    setNewPhone('');
    setIsModalOpen(false);
    await loadData();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={activeMode === 'pagi' ? '#E0F2FE' : '#FFEDD5'}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. SCENIC CANTEEN BANNER (BERUBAH SUASANA PAGI VS SORE) */}
        <ScenicBanner
          scene={activeMode === 'pagi' ? 'canteen_morning' : 'canteen_afternoon'}
          badgeText={
            activeMode === 'pagi' ? 'SESI PAGI • NITIP KUE' : 'SESI SORE • REKAP & SETORAN'
          }
          title="Titip Jual Kantin"
          subtitle="Kelola nampan titipan pagi & hitung sisa kue sore hari"
          actionLabel="+ Mitra Baru"
          onActionPress={() => setIsModalOpen(true)}
        >
          {/* Switcher Sesi Pagi vs Sore Mengambang */}
          <View style={styles.sessionSwitcher}>
            <TouchableOpacity
              style={[
                styles.sessionTab,
                activeMode === 'pagi' && styles.sessionTabMorningActive,
              ]}
              onPress={() => setActiveMode('pagi')}
              activeOpacity={0.85}
            >
              <AssetVisual name="canteen_shop" size={18} />
              <Text
                style={[
                  styles.sessionTabText,
                  activeMode === 'pagi' && styles.sessionTabTextActive,
                ]}
              >
                06:00 Nitip Pagi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sessionTab,
                activeMode === 'sore' && styles.sessionTabAfternoonActive,
              ]}
              onPress={() => setActiveMode('sore')}
              activeOpacity={0.85}
            >
              <AssetVisual name="coin_gold" size={18} />
              <Text
                style={[
                  styles.sessionTabText,
                  activeMode === 'sore' && styles.sessionTabTextActive,
                ]}
              >
                15:30 Rekap Sore
              </Text>
            </TouchableOpacity>
          </View>
        </ScenicBanner>

        <View style={styles.bodyPadding}>
          {/* 2. KARUSEL MITRA KANTIN DENGAN AVATAR KARAKTER PIC */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Pilih Gerai Kantin Mitra</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PartnerDirectory')}>
              <Text style={styles.sectionLink}>Direktori & Podium ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.canteenCarousel}
          >
            {canteens.map((c, idx) => {
              const isAct = c.id === selectedCanteenId;
              const hasDebt = (c.debt || 0) > 0;
              return (
                <AnimatedPressable
                  key={c.id}
                  scaleTo={0.95}
                  style={[styles.canteenCard, isAct && styles.canteenCardActive]}
                  onPress={() => handleSelectCanteen(c.id)}
                >
                  <View style={styles.canteenCardTop}>
                    <PartnerAvatar name={c.pic} variant={idx} size={42} />
                    {hasDebt ? (
                      <View style={styles.debtBadge}>
                        <Text style={styles.debtBadgeText}>
                          Piutang {formatRupiah(c.debt)}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.paidBadge}>
                        <Text style={styles.paidBadgeText}>Lancar</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.canteenName} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.canteenPic} numberOfLines={1}>
                    PIC: {c.pic}
                  </Text>
                </AnimatedPressable>
              );
            })}
          </ScrollView>

          {/* 3. KARTU DETAIL MITRA AKTIF & CHAT WA */}
          <View style={styles.activePartnerBar}>
            <PartnerAvatar name={currentCanteen.pic} size={46} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.activePartnerName}>{currentCanteen.name}</Text>
              <Text style={styles.activePartnerSub}>
                {currentCanteen.pic} • {currentCanteen.phone}
              </Text>
            </View>
            <AnimatedPressable
              scaleTo={0.94}
              style={styles.waChatBtn}
              onPress={handleChatWA}
            >
              <Text style={styles.waChatBtnText}>Hubungi WA</Text>
            </AnimatedPressable>
          </View>

          {/* 4. KARTU KALKULATOR REKONSILIASI TITIP & RETUR */}
          <View style={styles.reconcileCard}>
            <View style={styles.productBannerRow}>
              <AssetVisual name={currentSession.itemType || 'risoles_rogout'} size={64} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productTag}>JATAH KUE TITIPAN UTAMA</Text>
                <Text style={styles.productTitle}>{currentSession.itemName}</Text>
                <Text style={styles.productSubPrice}>
                  Harga Setor Bersih: {formatRupiah(currentSession.unitPrice)} / pcs
                </Text>
              </View>
            </View>

            {/* Stepper Jumlah Titip Pagi & Sisa Retur Sore */}
            <View style={styles.dualInputRow}>
              {/* Kolom Titip Pagi */}
              <View style={styles.qtyControlCard}>
                <Text style={styles.qtyControlLabel}>TITIP PAGI (PCS)</Text>
                <View style={styles.stepperControlRow}>
                  <TouchableOpacity
                    style={styles.stepMiniBtn}
                    onPress={() => adjustTitip(-5)}
                  >
                    <Text style={styles.stepMiniBtnText}>−5</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.qtyBigInput}
                    keyboardType="numeric"
                    value={titipInput}
                    onChangeText={setTitipInput}
                  />
                  <TouchableOpacity
                    style={[styles.stepMiniBtn, styles.stepMiniBtnPlus]}
                    onPress={() => adjustTitip(5)}
                  >
                    <Text style={styles.stepMiniBtnPlusText}>+5</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.qtyHintText}>Nampan diantar pagi</Text>
              </View>

              {/* Kolom Sisa Retur Sore */}
              <View style={[styles.qtyControlCard, styles.qtyControlCardRetur]}>
                <Text style={[styles.qtyControlLabel, { color: '#B91C1C' }]}>
                  SISA RETUR SORE
                </Text>
                <View style={styles.stepperControlRow}>
                  <TouchableOpacity
                    style={styles.stepMiniBtn}
                    onPress={() => adjustRetur(-1)}
                  >
                    <Text style={styles.stepMiniBtnText}>−</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.qtyBigInput, { color: '#DC2626' }]}
                    keyboardType="numeric"
                    value={String(returnQty)}
                    onChangeText={(v) => {
                      const num = Math.min(initialQty, Math.max(0, Number(v) || 0));
                      setReturInput(String(num));
                    }}
                  />
                  <TouchableOpacity
                    style={[styles.stepMiniBtn, styles.stepMiniBtnReturPlus]}
                    onPress={() => adjustRetur(1)}
                  >
                    <Text style={styles.stepMiniBtnPlusText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.qtyHintText}>Maksimal {initialQty} pcs</Text>
              </View>
            </View>

            {/* Hasil Perhitungan Otomatis: Kue Terjual & Uang Setoran */}
            <View style={styles.settlementHighlightBox}>
              <View style={styles.settlementLeft}>
                <Text style={styles.settlementOverline}>TERJUAL BERSIH HARI INI</Text>
                <Text style={styles.settlementSoldCount}>{soldQty} Kue Laku</Text>
                <Text style={styles.settlementFormula}>
                  ({initialQty} titip − {returnQty} retur) × {formatRupiah(currentSession.unitPrice)}
                </Text>
              </View>
              <View style={styles.settlementRight}>
                <Text style={styles.settlementTotalLabel}>Wajib Setor</Text>
                <Text style={styles.settlementTotalAmount}>{formatRupiah(totalDue)}</Text>
              </View>
            </View>

            {/* Pilihan Status Pembayaran: Lunas Tunai vs Masuk Buku Piutang */}
            <Text style={styles.paymentMethodLabel}>STATUS UANG SETORAN SORE:</Text>
            <View style={styles.paymentToggleRow}>
              <TouchableOpacity
                style={[
                  styles.paymentOptionBtn,
                  currentSession.isPaid && styles.paymentOptionPaidActive,
                ]}
                onPress={() => togglePaidStatus(true)}
                activeOpacity={0.85}
              >
                <AssetVisual name="check_badge" size={20} />
                <Text
                  style={[
                    styles.paymentOptionText,
                    currentSession.isPaid && { color: '#047857', fontWeight: '900' },
                  ]}
                >
                  Lunas Diterima Tunai
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOptionBtn,
                  !currentSession.isPaid && styles.paymentOptionDebtActive,
                ]}
                onPress={() => togglePaidStatus(false)}
                activeOpacity={0.85}
              >
                <AssetVisual name="warning_badge" size={20} />
                <Text
                  style={[
                    styles.paymentOptionText,
                    !currentSession.isPaid && { color: '#B91C1C', fontWeight: '900' },
                  ]}
                >
                  Tunda / Catat Piutang
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tombol Simpan Rekap & Kirim Nota */}
            <AnimatedPressable
              scaleTo={0.97}
              style={styles.saveSessionBtn}
              onPress={handleSaveSession}
            >
              <AssetVisual name="receipt_bill" size={22} />
              <Text style={styles.saveSessionBtnText}>
                Simpan Rekap & Buat Nota Setoran
              </Text>
            </AnimatedPressable>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* MODAL TAMBAH MITRA KANTIN BARU */}
      <Modal visible={isModalOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Tambah Mitra Kantin Baru</Text>
            <Text style={styles.modalSub}>
              Daftarkan gerai sekolah, kampus, atau warung titipan baru
            </Text>

            <Text style={styles.inputLbl}>Nama Kantin / Lapak</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contoh: Kantin SMAN 2"
              value={newCanteenName}
              onChangeText={setNewCanteenName}
            />

            <Text style={styles.inputLbl}>Nama Pengurus (PIC)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contoh: Bu Rahma"
              value={newPic}
              onChangeText={setNewPic}
            />

            <Text style={styles.inputLbl}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="0812xxxxxxxx"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleAddNewCanteen}
              >
                <Text style={styles.modalSaveText}>Simpan Mitra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  sessionSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
  },
  sessionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  sessionTabMorningActive: {
    backgroundColor: '#ECFDF5',
  },
  sessionTabAfternoonActive: {
    backgroundColor: '#FFF7ED',
  },
  sessionTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717A',
  },
  sessionTabTextActive: {
    color: '#18181B',
    fontWeight: '900',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#18181B',
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C',
  },
  canteenCarousel: {
    paddingBottom: 14,
    gap: 10,
  },
  canteenCard: {
    width: 168,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  canteenCardActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#EA580C',
    borderBottomColor: '#9A3412',
  },
  canteenCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  debtBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  debtBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  paidBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  paidBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#059669',
  },
  canteenName: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#18181B',
  },
  canteenPic: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  activePartnerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: 14,
  },
  activePartnerName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#18181B',
  },
  activePartnerSub: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#78350F',
    marginTop: 1,
  },
  waChatBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#065F46',
  },
  waChatBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  reconcileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.8,
    borderColor: '#FDE68A',
    borderBottomWidth: 4.5,
    borderBottomColor: '#F59E0B',
  },
  productBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },
  productTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18181B',
    marginTop: 1,
  },
  productSubPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginTop: 2,
  },
  dualInputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  qtyControlCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  qtyControlCardRetur: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  qtyControlLabel: {
    fontSize: 10.5,
    fontWeight: '900',
    color: '#475569',
    marginBottom: 8,
  },
  stepperControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepMiniBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepMiniBtnPlus: {
    backgroundColor: '#EA580C',
    borderColor: '#9A3412',
  },
  stepMiniBtnReturPlus: {
    backgroundColor: '#DC2626',
    borderColor: '#991B1B',
  },
  stepMiniBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18181B',
  },
  stepMiniBtnPlusText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  qtyBigInput: {
    fontSize: 22,
    fontWeight: '900',
    color: '#18181B',
    textAlign: 'center',
    minWidth: 46,
  },
  qtyHintText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 6,
  },
  settlementHighlightBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  settlementLeft: {
    flex: 1,
  },
  settlementOverline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
  },
  settlementSoldCount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 1,
  },
  settlementFormula: {
    fontSize: 11,
    fontWeight: '600',
    color: '#047857',
    marginTop: 2,
  },
  settlementRight: {
    alignItems: 'flex-end',
  },
  settlementTotalLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#047857',
  },
  settlementTotalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#059669',
  },
  paymentMethodLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#52525B',
    marginBottom: 8,
  },
  paymentToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  paymentOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 6,
  },
  paymentOptionPaidActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  paymentOptionDebtActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F87171',
  },
  paymentOptionText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#52525B',
  },
  saveSessionBtn: {
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
  saveSessionBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '900',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 24, 27, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18181B',
  },
  modalSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
    marginBottom: 14,
  },
  inputLbl: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3F3F46',
    marginBottom: 5,
    marginTop: 8,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#18181B',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },
  modalSaveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: '#EA580C',
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
