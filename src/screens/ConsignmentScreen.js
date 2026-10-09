import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, StatusBar, Alert, Modal, Linking, Dimensions } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import AssetVisual from '../components/AssetVisual';
import { BentoCard, TactileButton, TactilePill } from '../components/PlayfulComponents';
import { getConsignment, getCanteens, addCanteen, saveConsignment, getProducts } from '../db/storage';
import { formatRupiah } from '../utils/formatters';
import { calculateConsignmentSettlement } from '../utils/calculations';

const { width } = Dimensions.get('window');

export const ConsignmentScreen = ({ route, navigation }) => {
  const [canteens, setCanteens] = useState([]);
  const [selectedCanteenId, setSelectedCanteenId] = useState('c1');
  const [activeMode, setActiveMode] = useState('sore'); // 'pagi' (nitip) atau 'sore' (rekap)
  
  const [sessionData, setSessionData] = useState({
    c1: { initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles' },
    c2: { initialQty: 25, returnQty: 0, unitPrice: 1500, isPaid: false, itemName: 'Pastel Telur', itemType: 'pastel' },
    c3: { initialQty: 20, returnQty: 3, unitPrice: 1000, isPaid: true, itemName: 'Dadar Gulung', itemType: 'dadar' }
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
    const unsub = navigation.addListener('focus', loadData);
    return unsub;
  }, [navigation]);

  const loadData = async () => {
    const cList = await getCanteens();
    setCanteens(cList);
  };

  const currentCanteen = canteens.find(c => c.id === selectedCanteenId) || canteens[0] || {
    id: 'c1', name: 'Kantin Fakultas Teknik', pic: 'Pak Joko', phone: '081298765432', debt: 0
  };

  const currentSession = sessionData[selectedCanteenId] || {
    initialQty: 30, returnQty: 5, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles'
  };

  const initialQty = Number(titipInput) || currentSession.initialQty;
  const returnQty = Number(returInput) || 0;
  const soldQty = Math.max(0, initialQty - returnQty);
  const totalDue = Math.round(soldQty * currentSession.unitPrice);

  const handleSelectCanteen = (cId) => {
    setSelectedCanteenId(cId);
    const sess = sessionData[cId] || { initialQty: 20, returnQty: 0, unitPrice: 1000, isPaid: true, itemName: 'Risoles Rogout', itemType: 'risoles' };
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
      'Sesi Rekap Berhasil Disimpan',
      `Setoran ${formatRupiah(totalDue)} dari ${currentCanteen.name} (${currentSession.isPaid ? 'LUNAS' : 'PIUTANG'}) tercatat di buku kas.`,
      [
        { text: 'Kirim Nota WhatsApp', onPress: () => navigation.navigate('Receipt', {
          canteenName: currentCanteen.name,
          pic: currentCanteen.pic,
          total: totalDue,
          sold: soldQty,
          retur: returnQty,
          titip: initialQty,
          item: currentSession.itemName
        })},
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
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      
      {/* HEADER AMAN PLAYFUL */}
      <View style={styles.header}>
        <View>
          <View style={styles.headerTag}>
            <AssetVisual name="canteen_shop" size={16} />
            <Text style={styles.headerTagText}>REKONSILIASI KONSINYASI</Text>
          </View>
          <Text style={styles.headerTitle}>Titip & Rekap Kantin</Text>
        </View>

        <TactileButton size="sm" variant="accent" onPress={() => setIsModalOpen(true)}>
          + Kantin Baru
        </TactileButton>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BANNER TANGGAL OPERASIONAL BER-JAM SUBUH */}
        <View style={styles.dateBar}>
          <AssetVisual name="clock_time" size={18} />
          <Text style={styles.dateBarText}>HARI INI (Kamis, 8 Okt 2026) • Drop 06:30 • Rekap 15:00</Text>
        </View>

        {/* DAFTAR KANTIN HORIZONTAL BENTO CARDS */}
        <Text style={styles.sectionTitle}>Pilih Mitra Kantin Rekanan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.canteenScroll}>
          {canteens.map((c) => {
            const isSelected = c.id === selectedCanteenId;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.canteenCard, isSelected && styles.canteenCardActive]}
                activeOpacity={0.85}
                onPress={() => handleSelectCanteen(c.id)}
              >
                <View style={styles.canteenTopRow}>
                  <AssetVisual name="canteen_shop" size={28} />
                  <View style={[styles.debtChip, c.debt > 0 ? styles.debtChipRed : styles.debtChipGreen]}>
                    <Text style={[styles.debtChipText, { color: c.debt > 0 ? '#B91C1C' : '#15803D' }]}>
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

        {/* SESI LAPAK KANTIN TERPILIH PLAYFUL BENTO */}
        <BentoCard bg="#FFFFFF" accentBorder="#E2E8F0" style={styles.lapakBento}>
          
          <View style={styles.lapakHeader}>
            <View style={{ flex: 1 }}>
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

          {/* TOGGLE SESI PAGI / SORE TACTILE */}
          <View style={styles.sessionToggleBar}>
            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'pagi' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('pagi')}
            >
              <AssetVisual name="clock_time" size={16} />
              <Text style={[styles.toggleBtnText, activeMode === 'pagi' && styles.toggleBtnTextActive]}>
                Sesi Pagi (Nitip)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, activeMode === 'sore' && styles.toggleBtnActive]}
              onPress={() => setActiveMode('sore')}
            >
              <AssetVisual name="check_badge" size={16} />
              <Text style={[styles.toggleBtnText, activeMode === 'sore' && styles.toggleBtnTextActive]}>
                Sesi Sore (Rekap)
              </Text>
            </TouchableOpacity>
          </View>

          {/* ITEM PENITIPAN KANTIN DENGAN THUMBNAIL BESAR */}
          <View style={styles.itemPenitipanRow}>
            <View style={styles.itemVisualBox}>
              <AssetVisual name={currentSession.itemType || 'risoles'} size={52} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemPenitipanTitle}>{currentSession.itemName}</Text>
              <Text style={styles.itemPenitipanPrice}>Harga Titip Bersih: <Text style={{ color: '#EA580C', fontWeight: '900' }}>{formatRupiah(currentSession.unitPrice)}/pcs</Text></Text>
            </View>
          </View>

          {/* FORM SESI PAGI / SORE */}
          {activeMode === 'pagi' ? (
            <View style={styles.lapakFormArea}>
              <Text style={styles.fLabel}>Jumlah Kue Dititipkan Pagi Ini:</Text>
              <TextInput
                style={styles.fInputLarge}
                value={titipInput}
                onChangeText={setTitipInput}
                keyboardType="number-pad"
              />
              <Text style={styles.helpText}>Kue didrop di etalase kantin jam 06:30. Rekonsiliasi fisik dilakukan sore nanti.</Text>
            </View>
          ) : (
            <View style={styles.lapakFormArea}>
              
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Titip Pagi:</Text>
                <Text style={styles.calcVal}>{initialQty} pcs</Text>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Sisa Retur Fisik (Tidak Laku):</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <TextInput
                    style={styles.returInput}
                    value={returInput}
                    onChangeText={setReturInput}
                    keyboardType="number-pad"
                  />
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#64748B' }}>pcs</Text>
                </View>
              </View>

              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Kue Terjual Bersih:</Text>
                <Text style={[styles.calcVal, { color: '#15803D', fontWeight: '900', fontSize: 16 }]}>{soldQty} pcs</Text>
              </View>

              {/* TOTAL WAJIB SETOR DENGAN STAMP LUNAS */}
              <View style={styles.totalSetoranBox}>
                <View>
                  <Text style={styles.totalSetoranLabel}>Uang Wajib Setor:</Text>
                  <Text style={styles.totalSetoranVal}>{formatRupiah(totalDue)}</Text>
                </View>
                <View style={styles.stampBadge}>
                  <AssetVisual name="check_badge" size={20} />
                  <Text style={styles.stampBadgeText}>SIAP SETOR</Text>
                </View>
              </View>

            </View>
          )}

          {/* TOMBOL AKSI SIMPAN EMPUK */}
          <TactileButton
            size="lg"
            variant="primary"
            onPress={handleSaveSession}
            icon={<AssetVisual name={activeMode === 'pagi' ? 'canteen_shop' : 'check_badge'} size={22} />}
          >
            {activeMode === 'pagi' ? 'Terbitkan Nota Titip Pagi' : 'Simpan Rekap ke Buku Kas'}
          </TactileButton>

        </BentoCard>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL TAMBAH KANTIN BARU */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Tambah Mitra Kantin Baru</Text>
              <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>Nama Kantin</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Kantin Gedung Kuliah B"
              placeholderTextColor="#94A3B8"
              value={newCanteenName}
              onChangeText={setNewCanteenName}
            />

            <Text style={styles.formLabel}>Nama PIC / Penjaga Lapak</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: Bu Ratna"
              placeholderTextColor="#94A3B8"
              value={newPic}
              onChangeText={setNewPic}
            />

            <Text style={styles.formLabel}>Nomor WhatsApp</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Contoh: 08123456789"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <TactileButton variant="secondary" style={{ flex: 1 }} onPress={() => setIsModalOpen(false)}>
                Batal
              </TactileButton>
              <TactileButton variant="primary" style={{ flex: 2 }} onPress={handleAddNewCanteen}>
                Simpan Kantin
              </TactileButton>
            </View>

          </View>
        </View>
      </Modal>

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
  scrollContent: {
    padding: 18,
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  dateBarText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  canteenScroll: {
    gap: 10,
    marginBottom: 18,
  },
  canteenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: 154,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  canteenCardActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
    borderBottomColor: '#D97706',
  },
  canteenTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  debtChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  debtChipRed: {
    backgroundColor: '#FEE2E2',
  },
  debtChipGreen: {
    backgroundColor: '#DCFCE7',
  },
  debtChipText: {
    fontSize: 9,
    fontWeight: '900',
  },
  canteenCardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  canteenCardPic: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  textOrange: {
    color: '#EA580C',
  },
  lapakBento: {
    padding: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#CBD5E1',
  },
  lapakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lapakTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E293B',
  },
  lapakSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  waBtn: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  waBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  sessionToggleBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    gap: 6,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  toggleBtnTextActive: {
    color: '#EA580C',
    fontWeight: '900',
  },
  itemPenitipanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  itemVisualBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  itemPenitipanTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemPenitipanPrice: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  lapakFormArea: {
    marginBottom: 16,
  },
  fLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  fInputLarge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  helpText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  calcLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  calcVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  returInput: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    fontWeight: '900',
    fontSize: 14,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 46,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  totalSetoranBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  totalSetoranLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 2,
  },
  totalSetoranVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#15803D',
  },
  stampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stampBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#15803D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 28,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1E293B',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});
