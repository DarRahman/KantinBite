import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ScreenHeader, PrimaryActionBadge } from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';
import { FoodVisual } from '../components/FoodVisual';
import { getConsignment, getCanteens, addCanteen, saveConsignment, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { calculateConsignmentSettlement } from '../utils/calculations';
import { colors } from '../theme/tokens';

export const ConsignmentScreen = ({ route, navigation }) => {
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteenId, setSelectedCanteenId] = useState('c1');
  const [activeMode, setActiveMode] = useState('sore'); // 'pagi' (nitip) atau 'sore' (rekap)
  
  const [sessionData, setSessionData] = useState({
    c1: { initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout' },
    c2: { initialQty: 25, returnQty: 0, unitPrice: 1500, isPaid: false, itemName: 'Pastel Telur' },
    c3: { initialQty: 20, returnQty: 3, unitPrice: 1000, isPaid: true, itemName: 'Dadar Gulung' }
  });

  const [returInput, setReturInput] = useState('5');
  const [titipInput, setTitipInput] = useState('30');

  // Modal Tambah Kantin Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCanteenName, setNewCanteenName] = useState('');
  const [newPic, setNewPic] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cList = await getCanteens();
    setCanteens(cList);
  };

  const currentCanteen = canteens.find(c => c.id === selectedCanteenId) || canteens[0] || {
    id: 'c1', name: 'Kantin Fakultas Teknik', pic: 'Pak Joko', phone: '081298765432', debt: 0
  };

  const currentSession = sessionData[selectedCanteenId] || {
    initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout'
  };

  const initialQty = Number(titipInput) || currentSession.initialQty;
  const returnQty = Number(returInput) || 0;
  const soldQty = Math.max(0, initialQty - returnQty);
  const totalDue = Math.round(soldQty * currentSession.unitPrice);

  const handleSelectCanteen = (cId) => {
    setSelectedCanteenId(cId);
    const sess = sessionData[cId] || { initialQty: 20, returnQty: 0, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout' };
    setTitipInput(sess.initialQty.toString());
    setReturInput(sess.returnQty.toString());
  };

  const handleSaveSession = () => {
    const updated = {
      ...sessionData,
      [selectedCanteenId]: {
        ...currentSession,
        initialQty,
        returnQty,
        soldQty,
        totalDue,
        isPaid: currentSession.isPaid
      }
    };
    setSessionData(updated);

    Alert.alert(
      'Sesi Rekap Tersimpan',
      `Setoran ${formatRupiah(totalDue)} dari ${currentCanteen.name} (${currentSession.isPaid ? 'LUNAS' : 'UTANG'}) tercatat di buku kas.`,
      [
        { text: 'Kirim Nota WA', onPress: () => navigation.navigate('Receipt') },
        { text: 'Selesai', onPress: () => navigation.navigate('Dashboard') }
      ]
    );
  };

  const handleAddNewCanteen = async () => {
    if (!newCanteenName.trim() || !newPic.trim()) {
      Alert.alert('Peringatan', 'Lengkapi nama kantin dan nama PIC.');
      return;
    }
    await addCanteen({
      name: newCanteenName.trim(),
      pic: newPic.trim(),
      phone: newPhone.trim() || '08123456789'
    });
    setNewCanteenName('');
    setNewPic('');
    setNewPhone('');
    setIsModalOpen(false);
    await loadData();
    Alert.alert('Sukses', 'Mitra kantin baru berhasil ditambahkan.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScreenHeader
        title="Titip Kantin"
        subtitle="Pagi Nitip, Sore Ambil Uang"
        rightElement={
          <PrimaryActionBadge label="+ Kantin Baru" onPress={() => setIsModalOpen(true)} />
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BANNER TANGGAL OPERASIONAL SEPERTI DAPUR-RN */}
        <View style={styles.dateBar}>
          <Text style={styles.dateBarText}>HARI INI (Kamis, 8 Okt 2026)</Text>
        </View>

        {/* DAFTAR KANTIN HORIZONTAL CARD COMPACT & PADAT */}
        <Text style={styles.sectionTitle}>Pilih Kantin Rekanan</Text>
        <View style={{ height: 85, marginBottom: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'flex-start' }}>
            {canteens.map((c) => {
              const isSelected = c.id === selectedCanteenId;
              return (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.canteenCard, isSelected && styles.canteenCardActive]}
                  activeOpacity={0.8}
                  onPress={() => handleSelectCanteen(c.id)}
                >
                  <View style={styles.canteenTopRow}>
                    <FoodVisual type="canteen_shop" size={26} />
                    <View style={[styles.canteenDebtChip, c.debt > 0 ? styles.debtChipRed : styles.debtChipGreen]}>
                      <Text style={[styles.canteenDebtText, c.debt > 0 ? styles.textRed : styles.textGreen]}>
                        {c.debt > 0 ? `Piutang ${formatRupiah(c.debt)}` : 'Lunas'}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.canteenCardName, isSelected && styles.textOrange]} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.canteenCardPic} numberOfLines={1}>
                    PIC: {c.pic}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* SESI LAPAK KANTIN TERPILIH */}
        <View style={styles.lapakCard}>
          <View style={styles.lapakHeader}>
            <View>
              <Text style={styles.lapakTitle}>{currentCanteen.name}</Text>
              <Text style={styles.lapakSubtitle}>PIC: {currentCanteen.pic} • {currentCanteen.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.waBtn}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`whatsapp://send?phone=62${currentCanteen.phone.slice(1)}&text=Halo%20${currentCanteen.pic}`)}
            >
              <Text style={styles.waBtnText}>Chat WA</Text>
            </TouchableOpacity>
          </View>

          {/* TOGGLE SESI PAGI / SORE */}
          <View style={styles.sessionToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'pagi' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('pagi')}
            >
              <Text style={[styles.toggleBtnText, activeMode === 'pagi' && styles.textOrange]}>Sesi Pagi (Nitip)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'sore' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('sore')}
            >
              <Text style={[styles.toggleBtnText, activeMode === 'sore' && styles.textOrange]}>Sesi Sore (Rekap)</Text>
            </TouchableOpacity>
          </View>

          {/* ITEM PENITIPAN KANTIN DENGAN ASET VEKTOR MAKANAN */}
          <View style={styles.itemPenitipanRow}>
            <FoodVisual type="risoles" size={48} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemPenitipanTitle}>{currentSession.itemName}</Text>
              <Text style={styles.itemPenitipanPrice}>Harga Titip: {formatRupiah(currentSession.unitPrice)} / pcs</Text>
            </View>
          </View>

          {/* FORM SESI PAGI / SORE */}
          {activeMode === 'pagi' ? (
            <View style={styles.lapakFormArea}>
              <Text style={styles.fLabel}>Jumlah Kue Dititipkan (Pagi):</Text>
              <TextInput
                style={styles.fInputLarge}
                value={titipInput}
                onChangeText={setTitipInput}
                keyboardType="number-pad"
              />
              <Text style={styles.helpText}>Kue dititipkan pagi ini dengan status aktif menunggu penarikan sore.</Text>
            </View>
          ) : (
            <View style={styles.lapakFormArea}>
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Titip Pagi:</Text>
                <Text style={styles.calcVal}>{initialQty} pcs</Text>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Sisa Retur Fisik:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={styles.returInput}
                    value={returInput}
                    onChangeText={setReturInput}
                    keyboardType="number-pad"
                  />
                  <Text style={{ fontSize: 13, color: '#71717A', marginLeft: 4 }}>pcs</Text>
                </View>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Kue Terjual Laku:</Text>
                <Text style={[styles.calcVal, { color: '#059669', fontWeight: '800' }]}>{soldQty} pcs</Text>
              </View>

              <View style={styles.totalSetoranRow}>
                <Text style={styles.totalSetoranLabel}>Wajib Setor (@{formatRupiah(currentSession.unitPrice)}):</Text>
                <Text style={styles.totalSetoranVal}>{formatRupiah(totalDue)}</Text>
              </View>
            </View>
          )}

          {/* TOMBOL AKSI SIMPAN */}
          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleSaveSession}>
            <Text style={styles.btnPrimaryText}>
              {activeMode === 'pagi' ? 'Terbitkan Nota Titip Pagi' : 'Simpan Rekap ke Buku Kas'}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* MODAL TAMBAH KANTIN BARU */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Mitra Kantin Baru</Text>

            <Text style={styles.formLabel}>Nama Kantin</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Kantin Gedung Kuliah B"
              value={newCanteenName}
              onChangeText={setNewCanteenName}
            />

            <Text style={styles.formLabel}>Nama PIC / Penjaga</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Bu Ratna"
              value={newPic}
              onChangeText={setNewPic}
            />

            <Text style={styles.formLabel}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: 08123456789"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={handleAddNewCanteen}>
                <Text style={styles.modalSaveText}>Simpan Kantin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav activeTab="Consignment" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1
  },
  dateBar: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  dateBarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 8
  },
  canteenScroll: {
    marginBottom: 16
  },
  canteenCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 140,
    height: 76,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#F4F4F5'
  },
  canteenCardActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C'
  },
  canteenTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  canteenCardName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 1
  },
  canteenCardPic: {
    fontSize: 10,
    color: '#71717A'
  },
  canteenDebtChip: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  debtChipRed: {
    backgroundColor: '#FEE2E2'
  },
  debtChipGreen: {
    backgroundColor: '#ECFDF5'
  },
  canteenDebtText: {
    fontSize: 9,
    fontWeight: '700'
  },
  lapakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  lapakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  lapakTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18181B'
  },
  lapakSubtitle: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 2
  },
  waBtn: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  waBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700'
  },
  sessionToggle: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    padding: 3,
    marginBottom: 14
  },
  toggleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A'
  },
  itemPenitipanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12
  },
  itemPenitipanTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B'
  },
  itemPenitipanPrice: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2
  },
  lapakFormArea: {
    marginBottom: 14
  },
  fLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 4
  },
  fInputLarge: {
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 6
  },
  helpText: {
    fontSize: 11,
    color: '#71717A',
    lineHeight: 16
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5'
  },
  calcLabel: {
    fontSize: 12,
    color: '#52525B'
  },
  calcVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B'
  },
  returInput: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    fontWeight: '800',
    fontSize: 13,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    minWidth: 36,
    textAlign: 'center'
  },
  totalSetoranRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 10,
    marginTop: 4
  },
  totalSetoranLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B'
  },
  totalSetoranVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#059669'
  },
  textOrange: {
    color: '#EA580C'
  },
  textGreen: {
    color: '#059669'
  },
  textRed: {
    color: '#DC2626'
  },
  btnPrimary: {
    backgroundColor: '#EA580C',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 14
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
    marginBottom: 4
  },
  formInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#18181B',
    marginBottom: 12
  },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    borderRadius: 12
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A'
  },
  modalBtnSave: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#EA580C',
    borderRadius: 12
  },
  modalSaveText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
